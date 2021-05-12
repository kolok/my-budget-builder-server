'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('companies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      },
      subdomain: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      first_month_fiscal_year: {
        type: Sequelize.ENUM(['1','2','3','4','5','6','7','8','9','10','11','12']),
        defaultValue: '1'
      },
      defaultCurrencyID: {
        type: Sequelize.UUID,
        allowNull: true,
        field: 'default_currency_id'
      },
      status: {
        allowNull: false,
        default: 'active',
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
    return queryInterface.dropTable('companies')
  }
}
