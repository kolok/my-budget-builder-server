'use strict';

if (!process.env.NODE_ENV) {
    throw new Error('NODE_ENV not set')
}

//We don't want seeds to run in production
if (process.env.NODE_ENV === 'production') {
    throw new Error("Can't run seeds in production")
}

const bcrypt = require('bcrypt')


module.exports = {
  up: async function(queryInterface, Sequelize) {
    let password = 'azerty'
    try {
      password = await bcrypt.hash("azerty", 12)
    } catch (error) {
      console.log('encrypt error')
    }
    return queryInterface.bulkInsert('users', [
      {
        id: 1,
        name: 'Admin1',
        email: 'admin1@komber.io',
        token: 'admin1@komber.io',
        company_id: 1,
        password: password,
        status: 'active',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 2,
        name: 'Admin2',
        email: 'admin2@komber.io',
        token: 'admin2@komber.io',
        company_id: 2,
        password: password,
        status: 'active',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 3,
        name: 'Admin3',
        email: 'admin3@komber.io',
        token: 'admin3@komber.io',
        company_id: 3,
        password: password,
        status: 'active',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
