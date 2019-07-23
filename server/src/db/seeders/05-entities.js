'use strict'

if (!process.env.NODE_ENV) {
  throw new Error('NODE_ENV not set')
}

//We don't want seeds to run in production
if (process.env.NODE_ENV === 'production') {
  throw new Error('Can\'t run seeds in production')
}

module.exports = {
  up: async function(queryInterface, Sequelize) {
    var result = await queryInterface.bulkInsert('entities',[
      {
        id: 1,
        name: 'Company1 SA',
        company_id: 1,
        country_id: 1,
        default_currency_id:1,
        status: 'active',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 2,
        name: 'Company1 Limited',
        company_id: 1,
        country_id: 2,
        default_currency_id:2,
        status: 'active',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 3,
        name: 'Company1 Corporation',
        company_id: 1,
        country_id: 3,
        default_currency_id:3,
        status: 'active',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 4,
        name: 'Company2 SA',
        company_id: 2,
        country_id: 1,
        default_currency_id:1,
        status: 'active',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 5,
        name: 'Company2 Limited',
        company_id: 2,
        country_id: 2,
        default_currency_id:2,
        status: 'active',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 6,
        name: 'Company3 SA',
        company_id: 3,
        country_id: 1,
        status: 'active',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {})
    await queryInterface.sequelize.query('select setval(\'entities_id_seq\', (select max(id) from entities), true)')
    return result
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('entities', null, {})
  }
}
