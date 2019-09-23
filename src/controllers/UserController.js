import rand from 'randexp'
import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'
import dateFormat from 'date-fns/format'
import dateAddMonths from 'date-fns/add_months'
import dateCompareAsc from 'date-fns/compare_asc'

// Mailer instance to proxify the mail sending
import Mailer from '../utils/Mailer'
const mailer = new Mailer()

/*
 * FIXME: needed for the forgot password process
 *import dateAddMinutes from 'date-fns/add_minutes'
 */

/*
 *FIXME: Email inactive yet
 *import sgMail from '@sendgrid/mail'
 *sgMail.setApiKey(process.env.SENDGRID_API_KEY)
 */

import db from '../models'
const User = db.User
const Company = db.Company
const UserCompany = db.UserCompany
const RefreshToken = db.RefreshToken
const Op = db.Sequelize.Op

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
    let companyByName = await Company.findOne(
      { where: {name: request.companyname} }).then( company => { return company }
    )
    if (companyByName !== null) {
      return ctx.throw(400, 'DUPLICATE_COMPANY')
    }

    //Now let's check for a duplicate email
    let userbyemail = await User.findOne({ where: {email: request.email} })
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
      var company = await Company.create({name: request.companyname, subdomain: request.subdomain})
      // create the user
      console.log(request)
      var user = await User.create(request)
      // create the link between user and company with client_admin role
      var userCompany = await UserCompany.create({user_id: user.id, company_id: company.id, role: 'client_admin'})

      //Let's send a welcome email.
      if (process.env.NODE_ENV !== 'testing') {
        await mailer.signUpMail(request.email, request.name)
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

    /*
     * Ok, everthing checked out.
     * So let's invalidate the refresh token they just confirmed, and get them hooked up with a new one.
     */
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

  ////////////////////
  // CRUD for users //
  ////////////////////

  // List users
  async list(ctx) {
    try {
      let result = await User.findAll(
        { where: { status: {[Op.ne]: 'deleted'} },
          include: [ {
            association: 'userCompanies',
            where:  { company_id: ctx.state.company.id}
          } ]
        }
      )
      ctx.body = result
    } catch (error) {
      console.log(error)
      ctx.throw(400, 'INVALID_DATA')
    }
  }

  // get user
  async get(ctx) {
    //Make sure they've specified a user id
    const params = ctx.params
    if (!params.id) ctx.throw(400, 'INVALID_DATA')

    //Find and set that company
    let user = await User
      .findOne(
        { where: { id: params.id, status : {[Op.ne]: 'deleted'} },
          include: [ {
            association: 'userCompanies',
            where:  { company_id: ctx.state.company.id}
          } ]
        }
      )
    if (!user) ctx.throw(400, 'INVALID_DATA')

    ctx.body = user
  }

  // create user
  async create(ctx) {
    const request = ctx.request.body
    request.company_id = ctx.state.company.id

    try {
      let user = await User.create( request )
      ctx.body = user
    } catch (error) {
      ctx.throw(400, 'INVALID_DATA')
    }
  }

  // update user
  async update(ctx) {
    const request = ctx.request.body
    //Make sure they've specified a user id
    const params = ctx.params
    if (!params.id) ctx.throw(400, 'INVALID_DATA')

    //Find and set that company
    let user = await User.findOne(
      { where: { id: params.id, company_id: ctx.state.company.id, status : {[Op.ne]: 'deleted'} } }
    )
    if (!user) ctx.throw(400, 'INVALID_DATA')

    //Add the updated date value
    user.updatedAt = dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss')

    //Replace the note data with the new updated note data
    Object.keys(request).forEach(function(parameter) {
      user[parameter] = request[parameter]
    })

    try {
      await user.save()
      ctx.body = user //await User.findOne( { where: { id: user.id} } )
    } catch (error) {
      ctx.throw(400, 'INVALID_DATA')
    }
  }

  // soft delete user
  async delete(ctx) {
    //Make sure they've specified a user id
    const params = ctx.params
    if (!params.id) ctx.throw(400, 'INVALID_DATA')

    //Find and set that company
    let user = await User.findOne(
      { where: { id: params.id, company_id: ctx.state.company.id, status : {[Op.ne]: 'deleted'} }
      }
    )
    if (!user) ctx.throw(400, 'INVALID_DATA')


    try {
      //Add the soft delete values
      var now = dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss')
      user.updatedAt = now
      user.deletedAt = now
      user.status = 'deleted'
      await user.save()
      ctx.body = { message: 'SUCCESS' }
    } catch (error) {
      ctx.throw(400, 'INVALID_DATA')
    }
  }

  /*
   * ===== HELPERS =====
   */

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
