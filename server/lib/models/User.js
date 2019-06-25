"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = void 0;

var _db = require("../db/db");

var _Company = require("./Company");

const User = _db.sequelize.define("users", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: _db.Sequelize.INTEGER
  },
  name: {
    allowNull: false,
    type: _db.Sequelize.STRING,
    unique: true
  },
  email: {
    allowNull: false,
    type: _db.Sequelize.STRING,
    unique: true
  },
  company_id: {
    type: _db.Sequelize.INTEGER,
    allowNull: false
    /*,
    references: {
    model: 'Company',
    key: 'id'
    }*/

  },
  password: {
    allowNull: false,
    type: _db.Sequelize.STRING
  },
  role: {
    allowNull: false,
    type: _db.Sequelize.STRING,
    default: 'user'
  },
  status: {
    allowNull: false,
    default: 'active',
    type: _db.Sequelize.ENUM(['active', 'inactive', 'deleted'])
  },
  createdAt: {
    allowNull: false,
    type: _db.Sequelize.DATE,
    field: "created_at"
  },
  updatedAt: {
    allowNull: false,
    type: _db.Sequelize.DATE,
    field: "updated_at"
  },
  deletedAt: {
    allowNull: true,
    default: undefined,
    type: _db.Sequelize.DATE,
    field: "deleted_at"
  }
}, {
  underscored: true
});

exports.User = User;