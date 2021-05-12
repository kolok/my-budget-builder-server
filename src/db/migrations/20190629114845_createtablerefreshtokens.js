'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('refresh_tokens', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING//,unique: true
      },
      refreshToken: {
        allowNull: false,
        type: Sequelize.STRING,
        field: 'refresh_token'
      },
      info: {
        type: Sequelize.STRING
      },
      isValid: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        field: 'is_valid',
        defaultValue: false
      },
      expiration: {
        allowNull: true,
        type: Sequelize.DATE
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
      }
    })
  },
  down: (queryInterface/*, Sequelize*/) => {
    return queryInterface.dropTable('refresh_tokens')
  }
}
