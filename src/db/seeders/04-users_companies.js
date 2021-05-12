'use strict'
const uuidv4 = require('uuid/v4')

if (!process.env.NODE_ENV) {
  throw new Error('NODE_ENV not set')
}

//We don't want seeds to run in production
if (process.env.NODE_ENV === 'production') {
  throw new Error('Can\'t run seeds in production')
}

module.exports = {
  up: async function(queryInterface/*, Sequelize*/) {
    var [users] = await queryInterface.sequelize.query('select * from users')
    var [companies] = await queryInterface.sequelize.query('select * from companies')

    var result = await queryInterface.bulkInsert('users_companies', [
      {
        id: uuidv4(),
        company_id: companies.find(c => c.name == 'Company 1').id, 
        user_id: users.find(c => c.name == 'Admin1').id, 
        role: 'client_admin'
      },
      {
        id: uuidv4(),
        company_id: companies.find(c => c.name == 'Company 2').id, 
        user_id: users.find(c => c.name == 'Admin2').id, 
        role: 'client_admin'
      },
      {
        id: uuidv4(),
        company_id: companies.find(c => c.name == 'Company 3').id,
        user_id: users.find(c => c.name == 'Admin3').id, 
        role: 'client_admin'
      },
      {
        id: uuidv4(),
        company_id: companies.find(c => c.name == 'Company 1').id, //Company 1
        user_id: users.find(c => c.name == 'User1').id, 
        role: 'client_user'
      },
      {
        id: uuidv4(),
        company_id: companies.find(c => c.name == 'Company 1').id, //Company 1
        user_id: users.find(c => c.name == 'User2').id, 
        role: 'client_user'
      },
    ], {})
    return result
  },

  down: (queryInterface/*, Sequelize*/) => {
    return queryInterface.bulkDelete('users_companies', null, {})
  }
}
