'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('teams', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      company_id: {
        type: Sequelize.UUID,
        allowNull: false
      },
      parent_team_id: {
        type: Sequelize.UUID,
        allowNull: true
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
    return queryInterface.dropTable('teams')
  }
}
