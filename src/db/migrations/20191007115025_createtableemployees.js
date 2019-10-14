'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('employees', {
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
      email: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      },
      companyID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'company_id'
      },
      officeID: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: 'office_id'
      },
      birthDate: {
        allowNull: true,
        type: Sequelize.DATE,
        field: 'birth_date'
      },
      startDate: {
        allowNull: true,
        type: Sequelize.DATE,
        field: 'start_date'
      },
      endDate: {
        allowNull: true,
        type: Sequelize.DATE,
        field: 'end_date'
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
    return queryInterface.dropTable('employees')
  }
}
