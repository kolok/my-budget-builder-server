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

    var result = await queryInterface.bulkInsert('teams', [
      {
        id: uuidv4(),
        name: 'Sales',
        company_id: companies.find(c => c.name == 'Company 1').id,
        status: 'active',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 'f4edf130-d782-495c-a171-946e1966adc6',
        name: 'R&D',
        company_id: companies.find(c => c.name == 'Company 1').id,
        status: 'active',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuidv4(),
        name: 'R&D - data science',
        company_id: companies.find(c => c.name == 'Company 1').id,
        parent_team_id: 'f4edf130-d782-495c-a171-946e1966adc6',
        status: 'active',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuidv4(),
        name: 'R&D - Infra',
        company_id: companies.find(c => c.name == 'Company 1').id,
        parent_team_id: 'f4edf130-d782-495c-a171-946e1966adc6',
        status: 'active',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuidv4(),
        name: 'R&D - software',
        company_id: companies.find(c => c.name == 'Company 1').id,
        parent_team_id: 'f4edf130-d782-495c-a171-946e1966adc6',
        status: 'active',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuidv4(),
        name: 'Sales',
        company_id: companies.find(c => c.name == 'Company 2').id,
        status: 'active',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuidv4(),
        name: 'R&D',
        company_id: companies.find(c => c.name == 'Company 2').id,
        status: 'active',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuidv4(),
        name: 'Sales',
        company_id: companies.find(c => c.name == 'Company 3').id,
        status: 'active',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuidv4(),
        name: 'R&D',
        company_id: companies.find(c => c.name == 'Company 3').id,
        status: 'active',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {})
    return result
  },

  down: (queryInterface/*, Sequelize*/) => {
    return queryInterface.bulkDelete('teams', null, {})
  }
}
