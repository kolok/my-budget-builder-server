'use strict'

if (!process.env.NODE_ENV) {
  throw new Error('NODE_ENV not set')
}

//We don't want seeds to run in production
if (process.env.NODE_ENV === 'production') {
  throw new Error('Can\'t run seeds in production')
}

module.exports = {
  up: async function(queryInterface/*, Sequelize*/) {
    var result = await queryInterface.bulkInsert('users_companies', [
      {
        id: 1,
        company_id: 1,
        user_id: 1,
        role: 'client_admin'
      },
      {
        id: 2,
        company_id: 2,
        user_id: 2,
        role: 'client_admin'
      },
      {
        id: 3,
        company_id: 3,
        user_id: 3,
        role: 'client_admin'
      }
    ], {})
    await queryInterface.sequelize
      .query('select setval(\'users_companies_id_seq\', (select max(id) from users_companies), true)')
    return result
  },

  down: (queryInterface/*, Sequelize*/) => {
    return queryInterface.bulkDelete('users_companies', null, {})
  }
}
