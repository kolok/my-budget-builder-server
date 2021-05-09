'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('budgets_employees', {
      employee_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      budget_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    })
  },
  down: (queryInterface/*, Sequelize*/) => {
    return queryInterface.dropTable('budgets_employees')
  }
}
