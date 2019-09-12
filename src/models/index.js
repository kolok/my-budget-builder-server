'use strict'

const Sequelize = require('sequelize')
const sequelizeConfig = require('../db/config/sequelize')

const sequelize = new Sequelize(sequelizeConfig[process.env.NODE_ENV])

var fs        = require('fs')
var path      = require('path')
var basename  = path.basename(module.filename)
var db        = {}



fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) &&
    (file !== basename) &&
    (file.slice(-3) === '.js')
  })
  .forEach(function(file) {
    var model = sequelize['import'](path.join(__dirname, file))
    db[model.name] = model
  })

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
