'use strict';

if (!process.env.NODE_ENV) {
    throw new Error('NODE_ENV not set')
}

//We don't want seeds to run in production
if (process.env.NODE_ENV === 'production') {
    throw new Error("Can't run seeds in production")
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('companies', [
      {
        name: 'Company 1',
        status: 'active',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Company 2',
        status: 'active',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Company 3',
        status: 'active',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('companies', null, {});
  }
};
