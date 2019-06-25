"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Company = void 0;

var _db = require("../db/db");

var _User = require("./User");

const Company = _db.sequelize.define("companies", {
  id: {
    type: _db.Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: _db.Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  info: {
    type: _db.Sequelize.STRING,
    allowNull: true
  },
  status: {
    type: _db.Sequelize.ENUM,
    defaultValue: 'active',
    values: ['active', 'inactive', 'deleted']
  },
  createdAt: {
    type: _db.Sequelize.DATE,
    defaultValue: _db.Sequelize.NOW,
    field: "created_at"
  },
  updatedAt: {
    type: _db.Sequelize.DATE,
    defaultValue: _db.Sequelize.NOW,
    field: "updated_at"
  },
  deletedAt: {
    type: _db.Sequelize.DATE,
    field: "deleted_at"
  }
}, {
  underscored: true
});

exports.Company = Company;
Company.hasMany(_User.User, {
  foreignKey: 'company_id',
  as: 'users'
});

_User.User.belongsTo(Company, {
  foreignKey: 'company_id',
  as: 'company'
});