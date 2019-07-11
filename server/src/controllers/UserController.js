import rand from 'randexp'
import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'
import dateFormat from 'date-fns/format'
import dateAddMonths from 'date-fns/add_months'
import dateCompareAsc from 'date-fns/compare_asc'

// FIXME: needed for the forgot password process
//import dateAddMinutes from 'date-fns/add_minutes'

//FIXME: Email inactive yet
//import fse from 'fs-extra'
//import sgMail from '@sendgrid/mail'
//sgMail.setApiKey(process.env.SENDGRID_API_KEY)

import { User } from '../models/User'
import { Company } from '../models/Company'
import { UserCompany } from '../models/UserCompany'
import { RefreshToken } from '../models/RefreshToken'

class UserController {
  constructor() {}

  async signup(ctx) {
    //First let's save off the ctx.request.body. Throughout this project
    //we're going to try and avoid using the ctx.request.body and instead use
    //our own object that is seeded by the ctx.request.body initially
    const request = ctx.request.body

    //Now let's check for a duplicate company
    let companyByName = await Company.findOne({ where: {name: request.companyname} }).then( company => { return company })
    if (companyByName !== null) {
      return ctx.throw(400, 'DUPLICATE_COMPANY')
    }

    //Now let's check for a duplicate email
    let userbyemail = await User.findOne({ where: {email: request.email} }).then( user => { return user })
    if (userbyemail !== null) {
      ctx.throw(400, 'DUPLICATE_EMAIL')
    }

    //Now let's generate a token for this user
    request.token = await this.generateUniqueToken()

    //Ok now let's hash their password.
    try {
      request.password = await bcrypt.hash(request.password, 12)
    } catch (error) {
      ctx.throw(400, 'INVALID_DATA')
    }

    //Ok, at this point we can sign them up.
    try {
      // Create the new company
      var company = await Company.create({name: request.companyname, subdomain: request.subdomain}) //.then( company => {return company})
      // retrieve the company id to set it to the user
      request.company_id = await company.id
      // create the user who belongs to the company
      var user = await User.create(request)
      // create the link between user and company with client_admin role
      var userCompany = await UserCompany.create({user_id: user.id, company_id: company.id, role: 'client_admin'})

      //Let's send a welcome email.
      if (process.env.NODE_ENV !== 'testing') {
      //Let's turn off welcome emails for the moment
      // let email = await fse.readFile(
      //     './src/email/welcome.html',
      //     'utf8'
      // )
      // const emailData = {
      //     to: request.email,
      //     from: process.env.APP_EMAIL,
      //     subject: 'Welcome To Koa-Vue-Notes-Api',
      //     html: email,
      //     categories: ['koa-vue-notes-api-new-user'],
      //     substitutions: {
      //         appName: process.env.APP_NAME,
      //         appEmail: process.env.APP_EMAIL,
      //     },
      // }
      // await sgMail.send(emailData)
      }

      //Generate the refreshToken data
      let refreshTokenData = await this.generateRefreshToken(ctx,user)

      //increment the login count of the user
      User.incrementLoginCount(user.id );

      //Ok, they've made it, send them their jsonwebtoken with their data, accessToken and refreshToken
      const token = jsonwebtoken.sign(
        { data: { user: user, userCompany: userCompany, company: company } },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME }
      )

      // return the accessToken and the refreshToken
      ctx.body = {
        accessToken: token,
        refreshToken: refreshTokenData.refreshToken
      }

    } catch (error) {
      console.log(error)
      ctx.throw(400, 'INVALID_DATA: '. error)
    }
  }

  async signin(ctx) {
    const request = ctx.request.body

    if (!request.email || !request.password) {
      ctx.throw(404, 'INVALID_DATA')
    }

    //Let's find that user
    // FIXME: make the association works, it doesn't yet
    let userbyemail = await User.findOne({ where: {email: request.email} })
    let company = await Company.findOne({ where: {id: userbyemail.company_id} })
    let userCompany = await UserCompany.findOne({ where: {user_id: userbyemail.id} })

    if (userbyemail === null) {
      ctx.throw(401, 'INVALID_CREDENTIALS')
    }

    //Now let's check the password
    try {
      let correct = await bcrypt.compare(
        request.password,
        userbyemail.password
      )
      if (!correct) {
        ctx.throw(400, 'INVALID_CREDENTIALS')
      }
    } catch (error) {
      ctx.throw(400, 'INVALID_DATA')
    }

    //Let's get rid of that password now for security reasons
    delete userbyemail.password

    //Generate the refreshToken data
    let refreshTokenData = await this.generateRefreshToken(ctx,userbyemail)

    //increment the login count of the user
    try {
      User.incrementLoginCount(userbyemail.id );
    } catch (error) {
      ctx.throw(400, 'INVALID_DATA')
    }

    //Ok, they've made it, send them their jsonwebtoken with their data, accessToken and refreshToken
    const token = jsonwebtoken.sign(
      { data: { user: userbyemail, userCompany: userCompany, company: company } },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME }
    )

    // return the accessToken and the refreshToken
    ctx.body = {
      accessToken: token,
      refreshToken: refreshTokenData.refreshToken
    }
  }

  //Return the current user
  async me(ctx) {
    ctx.body = {
      user: ctx.state.user,
      company: ctx.state.company,
      userCompany: ctx.state.userCompany
    }
  }

  //FIXME: manage refreshtoken
  async refreshAccessToken(ctx) {
    const request = ctx.request.body
    if (!request.refreshToken) {
      ctx.throw(401, 'NO_REFRESH_TOKEN')
    }
    //Let's find that user
    let refreshTokenDatabaseData = await RefreshToken
    .findOne({ where: {
      refreshToken: request.refreshToken,
      isValid: true,} })
    .then( refreshtoken => { return refreshtoken })

    if (refreshTokenDatabaseData === null) {
      ctx.throw(400, 'INVALID_REFRESH_TOKEN')
    }

    //Let's make sure the refreshToken is not expired
    const refreshTokenIsValid = dateCompareAsc(
      dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss'),
      refreshTokenDatabaseData.expiration
    )
    if (refreshTokenIsValid !== -1) {
      ctx.throw(400, 'REFRESH_TOKEN_EXPIRED')
    }

    let email = refreshTokenDatabaseData.email

    //Ok, everthing checked out. So let's invalidate the refresh token they just confirmed, and get them hooked up with a new one.
    try {
      refreshTokenDatabaseData.update({ isValid: false, updatedAt: dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss') });
    } catch (error) {
      ctx.throw(400, 'INVALID_DATA1')
    }

    //Let's find that user
    let userbyemail = await User.findOne({ where: {email: email} }).then( user => { return user })

    if (userbyemail === null) {
      ctx.throw(401, 'INVALID_REFRESH_TOKEN')
    }

    //Generate the refreshToken data
    let refreshTokenData = await this.generateRefreshToken(ctx,userbyemail)

    //Ok, they've made it, send them their jsonwebtoken with their data, accessToken and refreshToken
    const token = jsonwebtoken.sign(
      { data: userbyemail },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME }
    )

    // return the accessToken and the refreshToken
    ctx.body = {
      accessToken: token,
      refreshToken: refreshTokenData.refreshToken
    }
  }

/*

    async invalidateAllRefreshTokens(ctx) {
        const request = ctx.request.body
        try {
            await db('refresh_tokens')
                .update({
                    isValid: false,
                    updatedAt: dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss'),
                })
                .where({ username: request.username })
            ctx.body = { message: 'SUCCESS' }
        } catch (error) {
            ctx.throw(400, 'INVALID_DATA')
        }
    }

    async invalidateRefreshToken(ctx) {
        const request = ctx.request.body
        if (!request.refreshToken) {
            ctx.throw(404, 'INVALID_DATA')
        }
        try {
            await db('refresh_tokens')
                .update({
                    isValid: false,
                    updatedAt: dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss'),
                })
                .where({
                    username: ctx.state.user.username,
                    refreshToken: request.refreshToken,
                })
            ctx.body = { message: 'SUCCESS' }
        } catch (error) {
            ctx.throw(400, 'INVALID_DATA')
        }
    }

    async forgot(ctx) {
        const request = ctx.request.body

        if (!request.email || !request.url || !request.type) {
            ctx.throw(404, 'INVALID_DATA')
        }

        let resetData = {
            passwordResetToken: new rand(/[a-zA-Z0-9_-]{64,64}/).gen(),
            passwordResetExpiration: dateAddMinutes(new Date(), 30),
        }

        try {
            var result = await db('users')
                .update(resetData)
                .where({ email: request.email })
                .returning('id')
            if (!result) {
                ctx.throw(400, 'INVALID_DATA')
            }
        } catch (error) {
            ctx.throw(400, 'INVALID_DATA')
        }

        //Now for the email if they've chosen the web type of forgot password
        if (request.type === 'web') {
            let email = await fse.readFile('./src/email/forgot.html', 'utf8')
            let resetUrlCustom =
                request.url +
                '?passwordResetToken=' +
                resetData.passwordResetToken +
                '&email=' +
                request.email

            const emailData = {
                to: request.email,
                from: process.env.APP_EMAIL,
                subject: 'Password Reset For ' + process.env.APP_NAME,
                html: email,
                categories: ['koa-vue-notes-api-forgot'],
                substitutions: {
                    appName: process.env.APP_NAME,
                    email: request.email,
                    resetUrl: resetUrlCustom,
                },
            }

            // Let's only send the email if we're not testing
            if (process.env.NODE_ENV !== 'testing') {
                await sgMail.send(emailData)
            }
        }

        ctx.body = { passwordResetToken: resetData.passwordResetToken }
    }

    async checkPasswordResetToken(ctx) {
        const request = ctx.request.body

        if (!request.passwordResetToken || !request.email) {
            ctx.throw(404, 'INVALID_DATA')
        }

        let [passwordResetData] = await db('users')
            .select('passwordResetExpiration')
            .where({
                email: request.email,
                passwordResetToken: request.passwordResetToken,
            })
        if (!passwordResetData.passwordResetExpiration) {
            ctx.throw(404, 'INVALID_TOKEN')
        }

        //Let's make sure the refreshToken is not expired
        var tokenIsValid = dateCompareAsc(
            dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss'),
            passwordResetData.passwordResetExpiration
        )
        if (tokenIsValid !== -1) {
            ctx.throw(400, 'RESET_TOKEN_EXPIRED')
        }

        ctx.body = { message: 'SUCCESS' }
    }

    async resetPassword(ctx) {
        const request = ctx.request.body

        //First do validation on the input
        const validator = joi.validate(request, userSchemaResetPassword)
        if (validator.error) {
            ctx.throw(400, validator.error.details[0].message)
        }

        //Ok, let's make sure their token is correct again, just to be sure since it could have
        //been some time between page entrance and form submission
        let [passwordResetData] = await db('users')
            .select('passwordResetExpiration')
            .where({
                email: request.email,
                passwordResetToken: request.passwordResetToken,
            })
        if (!passwordResetData.passwordResetExpiration) {
            ctx.throw(404, 'INVALID_TOKEN')
        }

        var tokenIsValid = dateCompareAsc(
            dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss'),
            passwordResetData.passwordResetExpiration
        )
        if (tokenIsValid !== -1) {
            ctx.throw(400, 'RESET_TOKEN_EXPIRED')
        }

        //Ok, so we're good. Let's reset their password with the new one they submitted.

        //Hash it
        try {
            request.password = await bcrypt.hash(request.password, 12)
        } catch (error) {
            ctx.throw(400, 'INVALID_DATA')
        }

        //Make sure to null out the password reset token and expiration on insertion
        request.passwordResetToken = null
        request.passwordResetExpiration = null
        try {
            await db('users')
                .update({
                    password: request.password,
                    passwordResetToken: request.passwordResetToken,
                    passwordResetExpiration: request.passwordResetExpiration,
                })
                .where({ email: request.email })
        } catch (error) {
            ctx.throw(400, 'INVALID_DATA')
        }
        ctx.body = { message: 'SUCCESS' }
    }
    */

////////////////////////////////////////////////////////////////////////////////
// Helpers
////////////////////////////////////////////////////////////////////////////////

  // Function to factorise the Refresh token generation
  //   Input: ctx => http request context
  //          user => user to who we need to generate a refresh token
  //   Output: refreshToken
  async generateRefreshToken(ctx,user) {
    //Generate the refreshToken data
    let refreshTokenData = {
      email: user.email,
      refreshToken: new rand(/[a-zA-Z0-9_-]{64,64}/).gen(),
      info:
        ctx.userAgent.os +
        ' ' +
        ctx.userAgent.platform +
        ' ' +
        ctx.userAgent.browser,
      ipAddress: ctx.request.ip,
      // does it means that refresh token is valid during 1 month
      expiration: dateAddMonths(new Date(), 1),
      isValid: true,
    }

    //Insert the refresh data into the db
    try {
      await RefreshToken.create(refreshTokenData).then( rt => {return rt})
    } catch (error) {
      ctx.throw(400, 'INVALID_DATA')
    }

    return refreshTokenData
  }

  // generateUniqueToken and checkUniqueToken are helper to handle token generation
  // generateUniqueToken generate a 7 char random token usong a base 64
  async generateUniqueToken() {
    let token = new rand(/[a-zA-Z0-9_-]{7,7}/).gen()
    if (await this.checkUniqueToken(token)) {
      await this.generateUniqueToken()
    } else {
      return token
    }
  }

  // generateUniqueToken and checkUniqueToken are helper to handle token generation
  // checkUniqueToken check if a user doesn't already use this token
  async checkUniqueToken(token) {
    let userbytoken = await User.findOne({ where: {token: token} }).then( user => { return user })
    if (userbytoken !== null) {
      return true
    }
    return false
  }
}

export default UserController
