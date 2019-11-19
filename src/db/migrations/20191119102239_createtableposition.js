'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('positions', {
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
      companyID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'company_id'
      },
      teamID: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: 'team_id'
      },
      employeeID: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: 'employee_id'
      },
      parttime: {
        type: Sequelize.INTEGER,
        allowNull: true,
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
    return queryInterface.dropTable('positions')
  }
}
