'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('expenses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      expense_type: {
        allowNull: false,
        defaultValue: 'payroll',
        type: Sequelize.ENUM(['payroll','bonus','payroll_increase','bonus_increase'])
      },
      companyID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'company_id'
      },
      budgetID: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: 'budget_id'
      },
      employeeID: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: 'employee_id'
      },
      positionID: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: 'position_id'
      },
      amount: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      status: {
        allowNull: false,
        defaultValue: 'active',
        type: Sequelize.ENUM(['active','deleted'])
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
    return queryInterface.dropTable('expenses')
  }
}
