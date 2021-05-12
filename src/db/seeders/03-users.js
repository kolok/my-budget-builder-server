'use strict'
const uuidv4 = require('uuid/v4')

if (!process.env.NODE_ENV) {
  throw new Error('NODE_ENV not set')
}

//We don't want seeds to run in production
if (process.env.NODE_ENV === 'production') {
  throw new Error('Can\'t run seeds in production')
}

const bcrypt = require('bcrypt')


module.exports = {
  up: async function(queryInterface/*, Sequelize*/) {
    let password = 'azerty'
    try {
      password = await bcrypt.hash('azerty', 12)
    } catch (error) {
      console.log('encrypt error')
    }
    var result = await queryInterface.bulkInsert('users', [
      {
        id: uuidv4(),
        name: 'Admin1',
        email: 'admin1@pipauls.com',
        password: password,
        status: 'active',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuidv4(),
        name: 'Admin2',
        email: 'admin2@pipauls.com',
        password: password,
        status: 'active',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuidv4(),
        name: 'Admin3',
        email: 'admin3@pipauls.com',
        password: password,
        status: 'active',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuidv4(),
        name: 'User1',
        email: 'user1@pipauls.com',
        password: password,
        status: 'active',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuidv4(),
        name: 'User2',
        email: 'user2@pipauls.com',
        password: password,
        status: 'active',
        created_at: new Date(),
        updated_at: new Date()
      },
    ], {})
    return result
  },

  down: (queryInterface/*, Sequelize*/) => {
    return queryInterface.bulkDelete('users', null, {})
  }
}
