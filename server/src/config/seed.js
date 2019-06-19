/**
 * Populate DB with sample data on server start
 */

'use strict'
const Thing = require('../api/thing/thing.model')
const User = require('../api/user/user.model')
const Company = require('../api/company/company.model')

const seeding = async() => {
  await Thing.collection.deleteMany()
  await Thing.create(
    { name: 'Our first Koa and Node app', info: 'Lightweight server' },
    { name: 'Mongo is here', info: 'We use mongodb to store data!' }
  )
  await Company.collection.deleteMany()
  var company = await Company.create({
    name: 'The Main Company',
    info: 'This is the default company'
  })
  await User.collection.deleteMany()
  await User.create({
    name: 'tester',
    email: 'test@example.com',
    password: 'helloworld',
    role: 'user',
    companyID: company._id
  })
  await User.create({
    name: 'admin',
    email: 'admin@example.com',
    password: 'admini',
    role: 'admin',
    companyID: company._id
  })
  console.log('Finish populating database')
}

seeding()
