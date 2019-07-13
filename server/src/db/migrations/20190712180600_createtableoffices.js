'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('offices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      address: {
        allowNull: false,
        type: Sequelize.STRING
      },
      zipcode: {
        allowNull: false,
        type: Sequelize.STRING
      },
      town: {
        allowNull: false,
        type: Sequelize.STRING
      },
      company_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      entity_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      status: {
        allowNull: false,
        defaultValue: 'active',
        type: Sequelize.ENUM(['active','deleted'])
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: "created_at"
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: "updated_at"
      },
      deletedAt: {
        allowNull: true,
        default: undefined,
        type: Sequelize.DATE,
        field: "deleted_at"
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('offices');
  }
};
