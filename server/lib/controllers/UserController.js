"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _User = require("../models/User");

var _Company = require("../models/Company");

class UserController {
  async index(ctx) {
    //Init a new user object
    const query = ctx.query; //Get list of user

    try {
      let result = await _User.User.findAll();
      ctx.body = result;
    } catch (error) {
      console.log(error);
      ctx.throw(400, 'INVALID_DATA' + error);
    }
  }

  async getCompany(ctx) {
    // get company id from params
    const params = ctx.params;
    if (!params.id) ctx.throw(400, 'INVALID_DATA'); //Get list of users which belongs to the company

    try {
      let result = await _User.User.findByPk(params.id, {
        include: [{
          model: _Company.Company,
          as: 'company'
        }]
      }).then(user => {
        return user;
      });
      ctx.body = result;
    } catch (error) {
      console.log(error);
      ctx.throw(400, 'INVALID_DATA');
    }
  }

}

var _default = UserController;
exports.default = _default;