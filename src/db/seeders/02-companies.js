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
    var result = await queryInterface.bulkInsert('companies', [
      {
        id: uuidv4(),
        name: 'Company 1',
        status: 'active',
        subdomain: 'company1',
        default_currency_id: currencies.find(c => c.name == 'Euro').id,
        first_month_fiscal_year: '1',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuidv4(),
        name: 'Company 2',
        status: 'active',
        subdomain: 'company2',
        default_currency_id: currencies.find(c => c.name == 'Pound sterling').id,
        first_month_fiscal_year: '3',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuidv4(),
        name: 'Company 3',
        status: 'active',
        subdomain: 'company3',
        default_currency_id: currencies.find(c => c.name == 'Dollar').id,
        first_month_fiscal_year: '6',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {})
    return result
  },

  down: (queryInterface/*, Sequelize*/) => {
    return queryInterface.bulkDelete('companies', null, {})
  }
}
