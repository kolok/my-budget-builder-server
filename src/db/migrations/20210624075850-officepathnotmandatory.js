'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('offices', 'address', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.changeColumn('offices', 'zipcode', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.changeColumn('offices', 'town', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('offices', 'address', {
        type: Sequelize.STRING,
        allowNull: false,
      }),
      queryInterface.changeColumn('offices', 'zipcode', {
        type: Sequelize.STRING,
        allowNull: false,
      }),
      queryInterface.changeColumn('offices', 'town', {
        type: Sequelize.STRING,
        allowNull: false,
      }),
    ])
  }
};
