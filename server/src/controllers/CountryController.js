import jsonwebtoken from 'jsonwebtoken'

import db from '../models'
const Country = db.Country;

class CountryController {
  constructor() {}

  async list(ctx) {
    //Get list of users which belongs to the company
    try {
      //Find and show note
      let result = await Country.findAll()
      ctx.body = result
    } catch (error) {
      console.log(error)
      ctx.throw(400, 'INVALID_DATA')
    }
  }

}

export default CountryController
