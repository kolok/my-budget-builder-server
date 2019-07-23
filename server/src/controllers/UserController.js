import rand from 'randexp'
import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'
import dateFormat from 'date-fns/format'
import dateAddMonths from 'date-fns/add_months'
import dateCompareAsc from 'date-fns/compare_asc'

/*
 * FIXME: needed for the forgot password process
 *import dateAddMinutes from 'date-fns/add_minutes'
 */

/*
 *FIXME: Email inactive yet
 *import fse from 'fs-extra'
 *import sgMail from '@sendgrid/mail'
 *sgMail.setApiKey(process.env.SENDGRID_API_KEY)
 */

import db from '../models'
const User = db.User
const Company = db.Company
const UserCompany = db.UserCompany
const RefreshToken = db.RefreshToken

class UserController {
  constructor() {}

  async signup(ctx) {
    /*
     *First let's save off the ctx.request.body. Throughout this project
     *we're going to try and avoid using the ctx.request.body and instead use
     *our own object that is seeded by the ctx.request.body initially
     */
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

    //Ok now let's hash their password.
    try {
      request.password = await bcrypt.hash(request.password, 12)
    } catch (error) {
      ctx.throw(400, 'INVALID_DATA')
    }

    //Ok, at this point we can sign them up.
    try {
      /*
       *FIXME: make the 3 following creations in a transaction
       * Create the new company
       */
      var company = await Company.create({name: request.companyname, subdomain: request.subdomain}) //.then( company => {return company})
      // create the user
      console.log(request)
      var user = await User.create(request)
      // create the link between user and company with client_admin role
      var userCompany = await UserCompany.create({user_id: user.id, company_id: company.id, role: 'client_admin'})

      //Let's send a welcome email.
      if (process.env.NODE_ENV !== 'testing') {
      /*
       *Let's turn off welcome emails for the moment
       * let email = await fse.readFile(
       *     './src/email/welcome.html',
       *     'utf8'
       * )
       * const emailData = {
       *     to: request.email,
       *     from: process.env.APP_EMAIL,
       *     subject: 'Welcome To Koa-Vue-Notes-Api',
       *     html: email,
       *     categories: ['koa-vue-notes-api-new-user'],
       *     substitutions: {
       *         appName: process.env.APP_NAME,
       *         appEmail: process.env.APP_EMAIL,
       *     },
       * }
       * await sgMail.send(emailData)
       */
      }

      //Generate the refreshToken data
      let refreshTokenData = await this.generateRefreshToken(ctx,user)

      //increment the login count of the user
      User.incrementLoginCount(user.id )

      //Ok, they've made it, send them their jsonwebtoken with their data, accessToken and refreshToken
      const accessToken = jsonwebtoken.sign(
        { data: { user: user, userCompany: userCompany, company: company } },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME }
      )

      // return the accessToken and the refreshToken
      ctx.body = {
        accessToken: accessToken,
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
      console.log('error1')
      ctx.throw(404, 'INVALID_DATA')
    }
    console.log('signin')

    //Let's find that user and its company associated to him
    let userbyemail = await User.findOne({ where: {email: request.email}, include: ['userCompanies', 'companies'] })
    if (userbyemail === null) {
      console.log('INVALID_CREDENTIALS')
      ctx.throw(401, 'INVALID_CREDENTIALS')
    }

    if (userbyemail.userCompanies === undefined || userbyemail.userCompanies.length != 1) {
      console.log('WRONG_ASSOCIATION 1')
      ctx.throw(401, 'WRONG_ASSOCIATION')
    }
    if (userbyemail.companies === undefined || userbyemail.companies.length != 1) {
      console.log('WRONG_ASSOCIATION 2')
      ctx.throw(401, 'WRONG_ASSOCIATION')
    }

    let company = await userbyemail.companies[0]
    await delete userbyemail['companies']
    let userCompany = await userbyemail.userCompanies[0]
    await delete userbyemail['userCompanies']

    //Now let's check the password
    try {
      let correct = await bcrypt.compare(
        request.password,
        userbyemail.password
      )
      if (!correct) {
        console.log('error3')

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
      User.incrementLoginCount(userbyemail.id )
    } catch (error) {
      console.log(error)
      ctx.throw(400, 'INVALID_DATA')
    }

    //Ok, they've made it, send them their jsonwebtoken with their data, accessToken and refreshToken
    const accessToken = jsonwebtoken.sign(
      { data: { user: userbyemail, userCompany: userCompany, company: company } },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME }
    )

    // return the accessToken and the refreshToken
    ctx.body = {
      accessToken: accessToken,
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
      refreshTokenDatabaseData.update({ isValid: false, updatedAt: dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss') })
    } catch (error) {
      ctx.throw(400, 'INVALID_DATA1')
    }

    //Let's find that user
    let userbyemail = await User.findOne({ where: {email: email}, include: ['userCompanies', 'companies'] })

    if (userbyemail === null) {
      ctx.throw(401, 'INVALID_REFRESH_TOKEN')
    }

    if (userbyemail.userCompanies === undefined || userbyemail.userCompanies.length != 1) {
      console.log('WRONG_ASSOCIATION 1')
      ctx.throw(401, 'WRONG_ASSOCIATION')
    }
    if (userbyemail.companies === undefined || userbyemail.companies.length != 1) {
      console.log('WRONG_ASSOCIATION 2')
      ctx.throw(401, 'WRONG_ASSOCIATION')
    }

    let company = await userbyemail.companies[0]
    await delete userbyemail['companies']
    let userCompany = await userbyemail.userCompanies[0]
    await delete userbyemail['userCompanies']

    //Generate the refreshToken data
    let refreshTokenData = await this.generateRefreshToken(ctx,userbyemail)

    //Ok, they've made it, send them their jsonwebtoken with their data, accessToken and refreshToken
    const accessToken = jsonwebtoken.sign(
      { data: { user: userbyemail, userCompany: userCompany, company: company } },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME }
    )

    // return the accessToken and the refreshToken
    ctx.body = {
      accessToken: accessToken,
      refreshToken: refreshTokenData.refreshToken
    }
  }

  /*
   *
   * async invalidateAllRefreshTokens(ctx) {
   * const request = ctx.request.body
   * try {
   * await db('refresh_tokens')
   * .update({
   * isValid: false,
   * updatedAt: dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss'),
   * })
   * .where({ username: request.username })
   * ctx.body = { message: 'SUCCESS' }
   * } catch (error) {
   * ctx.throw(400, 'INVALID_DATA')
   * }
   * }
   *
   * async invalidateRefreshToken(ctx) {
   * const request = ctx.request.body
   * if (!request.refreshToken) {
   * ctx.throw(404, 'INVALID_DATA')
   * }
   * try {
   * await db('refresh_tokens')
   * .update({
   * isValid: false,
   * updatedAt: dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss'),
   * })
   * .where({
   * username: ctx.state.user.username,
   * refreshToken: request.refreshToken,
   * })
   * ctx.body = { message: 'SUCCESS' }
   * } catch (error) {
   * ctx.throw(400, 'INVALID_DATA')
   * }
   * }
   *
   * async forgot(ctx) {
   * const request = ctx.request.body
   *
   * if (!request.email || !request.url || !request.type) {
   * ctx.throw(404, 'INVALID_DATA')
   * }
   *
   * let resetData = {
   * passwordResetToken: new rand(/[a-zA-Z0-9_-]{64,64}/).gen(),
   * passwordResetExpiration: dateAddMinutes(new Date(), 30),
   * }
   *
   * try {
   * var result = await db('users')
   * .update(resetData)
   * .where({ email: request.email })
   * .returning('id')
   * if (!result) {
   * ctx.throw(400, 'INVALID_DATA')
   * }
   * } catch (error) {
   * ctx.throw(400, 'INVALID_DATA')
   * }
   *
   * //Now for the email if they've chosen the web type of forgot password
   * if (request.type === 'web') {
   * let email = await fse.readFile('./src/email/forgot.html', 'utf8')
   * let resetUrlCustom =
   * request.url +
   * '?passwordResetToken=' +
   * resetData.passwordResetToken +
   * '&email=' +
   * request.email
   *
   * const emailData = {
   * to: request.email,
   * from: process.env.APP_EMAIL,
   * subject: 'Password Reset For ' + process.env.APP_NAME,
   * html: email,
   * categories: ['koa-vue-notes-api-forgot'],
   * substitutions: {
   * appName: process.env.APP_NAME,
   * email: request.email,
   * resetUrl: resetUrlCustom,
   * },
   * }
   *
   * // Let's only send the email if we're not testing
   * if (process.env.NODE_ENV !== 'testing') {
   * await sgMail.send(emailData)
   * }
   * }
   *
   * ctx.body = { passwordResetToken: resetData.passwordResetToken }
   * }
   *
   * async checkPasswordResetToken(ctx) {
   * const request = ctx.request.body
   *
   * if (!request.passwordResetToken || !request.email) {
   * ctx.throw(404, 'INVALID_DATA')
   * }
   *
   * let [passwordResetData] = await db('users')
   * .select('passwordResetExpiration')
   * .where({
   * email: request.email,
   * passwordResetToken: request.passwordResetToken,
   * })
   * if (!passwordResetData.passwordResetExpiration) {
   * ctx.throw(404, 'INVALID_TOKEN')
   * }
   *
   * //Let's make sure the refreshToken is not expired
   * var tokenIsValid = dateCompareAsc(
   * dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss'),
   * passwordResetData.passwordResetExpiration
   * )
   * if (tokenIsValid !== -1) {
   * ctx.throw(400, 'RESET_TOKEN_EXPIRED')
   * }
   *
   * ctx.body = { message: 'SUCCESS' }
   * }
   *
   * async resetPassword(ctx) {
   * const request = ctx.request.body
   *
   * //First do validation on the input
   * const validator = joi.validate(request, userSchemaResetPassword)
   * if (validator.error) {
   * ctx.throw(400, validator.error.details[0].message)
   * }
   *
   * //Ok, let's make sure their token is correct again, just to be sure since it could have
   * //been some time between page entrance and form submission
   * let [passwordResetData] = await db('users')
   * .select('passwordResetExpiration')
   * .where({
   * email: request.email,
   * passwordResetToken: request.passwordResetToken,
   * })
   * if (!passwordResetData.passwordResetExpiration) {
   * ctx.throw(404, 'INVALID_TOKEN')
   * }
   *
   * var tokenIsValid = dateCompareAsc(
   * dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss'),
   * passwordResetData.passwordResetExpiration
   * )
   * if (tokenIsValid !== -1) {
   * ctx.throw(400, 'RESET_TOKEN_EXPIRED')
   * }
   *
   * //Ok, so we're good. Let's reset their password with the new one they submitted.
   *
   * //Hash it
   * try {
   * request.password = await bcrypt.hash(request.password, 12)
   * } catch (error) {
   * ctx.throw(400, 'INVALID_DATA')
   * }
   *
   * //Make sure to null out the password reset token and expiration on insertion
   * request.passwordResetToken = null
   * request.passwordResetExpiration = null
   * try {
   * await db('users')
   * .update({
   * password: request.password,
   * passwordResetToken: request.passwordResetToken,
   * passwordResetExpiration: request.passwordResetExpiration,
   * })
   * .where({ email: request.email })
   * } catch (error) {
   * ctx.throw(400, 'INVALID_DATA')
   * }
   * ctx.body = { message: 'SUCCESS' }
   * }
   */

  ////////////////////////////////////////////////////////////////////////////////
  // Helpers
  ////////////////////////////////////////////////////////////////////////////////

  /*
   * Function to factorise the Refresh token generation
   *   Input: ctx => http request context
   *          user => user to who we need to generate a refresh token
   *   Output: refreshToken
   */
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
      await RefreshToken.create(refreshTokenData)
    } catch (error) {
      console.log(error)
      ctx.throw(400, 'INVALID_DATA')
    }

    return refreshTokenData
  }

}

export default UserController
