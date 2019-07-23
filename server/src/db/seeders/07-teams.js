'use strict';

if (!process.env.NODE_ENV) {
    throw new Error('NODE_ENV not set')
}

//We don't want seeds to run in production
if (process.env.NODE_ENV === 'production') {
    throw new Error("Can't run seeds in production")
}

module.exports = {
  up: async function(queryInterface, Sequelize) {
    var result = await queryInterface.bulkInsert('teams', [
      {
        id: 1,
        name: 'Sales',
        company_id: 1,
        status: 'active',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 2,
        name: 'R&D',
        company_id: 1,
        status: 'active',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 3,
        name: 'Sales',
        company_id: 2,
        status: 'active',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 4,
        name: 'R&D',
        company_id: 2,
        status: 'active',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 5,
        name: 'Sales',
        company_id: 3,
        status: 'active',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 6,
        name: 'R&D',
        company_id: 3,
        status: 'active',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
    await queryInterface.sequelize.query(`select setval('teams_id_seq', (select max(id) from teams), true)`);
    return result;
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('teams', null, {});
  }
};
