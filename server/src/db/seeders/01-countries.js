'use strict'

if (!process.env.NODE_ENV) {
  throw new Error('NODE_ENV not set')
}

//We don't want seeds to run in production
if (process.env.NODE_ENV === 'production') {
  throw new Error('Can\'t run seeds in production')
}

/*
 *FIXME: we need this object to be populated in prod
 * let check how we can handle it
 */

module.exports = {
  up: async function(queryInterface, Sequelize) {
    var result = await queryInterface.bulkInsert('countries', [
      {
        id: 1,
        name: 'Unites States',
        code2: 'US'
      },
      {
        id: 2,
        name: 'United Kingdom',
        code2: 'UK'
      },
      {
        id: 3,
        name: 'France',
        code2: 'FR'
      }
    ], {})
    await queryInterface.sequelize.query('select setval(\'countries_id_seq\', (select max(id) from countries), true)')
    return result
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('countries', null, {})
  }
}
