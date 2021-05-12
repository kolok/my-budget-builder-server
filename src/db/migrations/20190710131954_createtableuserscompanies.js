'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users_companies', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      company_id: {
        type: Sequelize.UUID,
        allowNull: false
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false
      },
      role: {
        allowNull: false,
        defaultValue: 'client_user',
        type: Sequelize.ENUM(['client_admin', 'client_user'])
      }
    })
  },
  down: (queryInterface/*, Sequelize*/) => {
    return queryInterface.dropTable('users_companies')
  }
}
