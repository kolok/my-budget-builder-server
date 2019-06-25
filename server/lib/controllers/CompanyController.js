"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Company = require("../models/Company");

var _User = require("../models/User");

class CompanyController {
  async index(ctx) {
    //Init a new company object
    const query = ctx.query; //Get list of company

    try {
      let result = await _Company.Company.findAll();
      ctx.body = result;
    } catch (error) {
      console.log(error);
      ctx.throw(400, 'INVALID_DATA' + error);
    }
  }

  async getUsers(ctx) {
    // get company id from params
    const params = ctx.params;
    if (!params.id) ctx.throw(400, 'INVALID_DATA'); //Init a new company object

    const company = new _Company.Company(); //Get list of users which belongs to the company

    try {
      //Find and show note
      console.log(company);
      let result = await _Company.Company.findByPk(params.id, {
        include: [{
          model: _User.User,
          as: 'users'
        }]
      }).then(companies => {
        return companies;
      });
      ctx.body = result;
    } catch (error) {
      console.log(error);
      ctx.throw(400, 'INVALID_DATA');
    }
  }

  async show(ctx) {
    // get company id from params
    const params = ctx.params;
    if (!params.id) ctx.throw(400, 'INVALID_DATA'); //Get list of users which belongs to the company

    try {
      //Find and show note
      let result = await _Company.Company.findByPk(params.id);
      ctx.body = result;
    } catch (error) {
      console.log(error);
      ctx.throw(400, 'INVALID_DATA');
    }
  }
  /*
      async show(ctx) {
          const params = ctx.params
          if (!params.id) ctx.throw(400, 'INVALID_DATA')
  
          //Initialize company
          const company = new Company()
  
          try {
              //Find and show note
              await company.find(params.id)
              ctx.body = company
          } catch (error) {
              console.log(error)
              ctx.throw(400, 'INVALID_DATA')
          }
      }
  
      async create(ctx) {
          const request = ctx.request.body
  
          //Create a new company object using the request params
          const company = new Company(request)
  
          //Validate the newly created company
          const validator = joi.validate(company, companySchema)
          if (validator.error) ctx.throw(400, validator.error.details[0].message)
  
          try {
              let result = await company.store()
              ctx.body = { message: 'SUCCESS', id: result }
          } catch (error) {
              console.log(error)
              ctx.throw(400, 'INVALID_DATA')
          }
      }
  
      async update(ctx) {
          const params = ctx.params
          const request = ctx.request.body
  
          //Make sure they've specified a company
          if (!params.id) ctx.throw(400, 'INVALID_DATA')
  
          //Find and set that company
          const company = new Company()
          await company.find(params.id)
          if (!note) ctx.throw(400, 'INVALID_DATA')
  
          //Add the updated date value
          company.updatedAt = dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss')
  
          //Replace the note data with the new updated note data
          Object.keys(ctx.request.body).forEach(function(parameter, index) {
              company[parameter] = request[parameter]
          })
  
          try {
              await company.save()
              ctx.body = { message: 'SUCCESS' }
          } catch (error) {
              console.log(error)
              ctx.throw(400, 'INVALID_DATA')
          }
      }
  
      async delete(ctx) {
          const params = ctx.params
          if (!params.id) ctx.throw(400, 'INVALID_DATA')
  
          //Find that company
          const company = new Company()
          await company.find(params.id)
          if (!company) ctx.throw(400, 'INVALID_DATA')
  
          try {
              await note.destroy()
              ctx.body = { message: 'SUCCESS' }
          } catch (error) {
              console.log(error)
              ctx.throw(400, 'INVALID_DATA')
          }
      }
  */


}

var _default = CompanyController;
exports.default = _default;