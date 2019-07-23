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
    var result = await queryInterface.bulkInsert('currencies', [
      {
        id: 1,
        name: 'Euro',
        symbol: '€'
      },
      {
        id: 2,
        name: 'Pound sterling',
        symbol: '£'
      },
      {
        id: 3,
        name: 'Dollar',
        symbol: '$'
      }
    ], {})
    await queryInterface.sequelize.query('select setval(\'currencies_id_seq\', (select max(id) from currencies), true)')
    return result
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('currencies', null, {})
  }
}
