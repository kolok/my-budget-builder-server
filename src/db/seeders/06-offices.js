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
    var [companies] = await queryInterface.sequelize.query('select * from companies')
    var [entities] = await queryInterface.sequelize.query('select * from entities')

    var result = await queryInterface.bulkInsert('offices', [
      {
        id: uuidv4(),
        name: 'My Company 1 at Paris',
        address: '1 place de la république',
        zipcode: '75011',
        town: 'Paris',
        company_id: companies.find(c => c.name == 'Company 1').id,
        entity_id: entities.find(c => c.name == 'Company1 SA').id,
        status: 'active',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuidv4(),
        name: 'My Company 1 at Nantes',
        address: 'Quai de la Loire',
        zipcode: '44000',
        town: 'Nantes',
        company_id: companies.find(c => c.name == 'Company 1').id,
        entity_id: entities.find(c => c.name == 'Company1 SA').id,
        status: 'active',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {})
    return result
  },

  down: (queryInterface/*, Sequelize*/) => {
    return queryInterface.bulkDelete('offices', null, {})
  }
}
