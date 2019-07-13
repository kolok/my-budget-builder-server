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
    return queryInterface.bulkInsert('offices', [
      {
        id: 1,
        name: 'My Company 1 at Paris',
        address: '1 place de la république',
        zipcode: '75011',
        town: 'Paris',
        company_id: 1,
        entity_id: 1,
        status: 'active',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 2,
        name: 'My Company 1 at Nantes',
        address: 'Quai de la Loire',
        zipcode: '44000',
        town: 'Nantes',
        company_id: 1,
        entity_id: 1,
        status: 'active',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('offices', null, {});
  }
};
