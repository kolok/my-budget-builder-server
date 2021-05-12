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
    var [currencies] = await queryInterface.sequelize.query('select * from currencies')
    var [companies] = await queryInterface.sequelize.query('select * from companies')
    var [countries] = await queryInterface.sequelize.query('select * from countries')

    var result = await queryInterface.bulkInsert('entities',[
      {
        id: uuidv4(),
        name: 'Company1 SA',
        company_id: companies.find(c => c.name == 'Company 1').id,
        country_id: countries.find(c => c.name == 'Unites States').id,
        default_currency_id: currencies.find(c => c.name == 'Euro').id,
        status: 'active',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuidv4(),
        name: 'Company1 Limited',
        company_id: companies.find(c => c.name == 'Company 1').id,
        country_id: countries.find(c => c.name == 'United Kingdom').id,
        default_currency_id: currencies.find(c => c.name == 'Pound sterling').id,
        status: 'active',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuidv4(),
        name: 'Company1 Corporation',
        company_id: companies.find(c => c.name == 'Company 1').id,
        country_id: countries.find(c => c.name == 'France').id,
        default_currency_id: currencies.find(c => c.name == 'Dollar').id,
        status: 'active',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuidv4(),
        name: 'Company2 SA',
        company_id: companies.find(c => c.name == 'Company 2').id,
        country_id: countries.find(c => c.name == 'Unites States').id,
        default_currency_id: currencies.find(c => c.name == 'Euro').id,
        status: 'active',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuidv4(),
        name: 'Company2 Limited',
        company_id: companies.find(c => c.name == 'Company 2').id,
        country_id: countries.find(c => c.name == 'United Kingdom').id,
        default_currency_id: currencies.find(c => c.name == 'Pound sterling').id,
        status: 'active',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuidv4(),
        name: 'Company3 SA',
        company_id: companies.find(c => c.name == 'Company 3').id,
        country_id: countries.find(c => c.name == 'Unites States').id,
        status: 'active',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {})
    return result
  },

  down: (queryInterface/*, Sequelize*/) => {
    return queryInterface.bulkDelete('entities', null, {})
  }
}
