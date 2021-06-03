'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('entities', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      taxeRate: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field: 'taxe_rate'
      },
      country_id: {
        type: Sequelize.UUID,
        allowNull: false
      },
      company_id: {
        type: Sequelize.UUID,
        allowNull: false
      },
      defaultCurrencyID: {
        type: Sequelize.UUID,
        allowNull: true,
        field: 'default_currency_id'
      },
      status: {
        allowNull: false,
        defaultValue: 'active',
        type: Sequelize.ENUM(['active','inactive','deleted'])
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'created_at'
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'updated_at'
      },
      deletedAt: {
        allowNull: true,
        default: undefined,
        type: Sequelize.DATE,
        field: 'deleted_at'
      }
    })
  },
  down: (queryInterface/*, Sequelize*/) => {
    return queryInterface.dropTable('entities')
  }
}
