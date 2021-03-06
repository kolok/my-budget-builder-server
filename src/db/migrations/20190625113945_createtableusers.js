'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
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
      defaultLanguage: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: 'en',
        field: 'default_language'
      },
      password: {
        allowNull: true,
        type: Sequelize.STRING
      },
      loginCount: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        field: 'login_count'
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
        defaultValue: undefined,
        type: Sequelize.DATE,
        field: 'deleted_at'
      }
    })
  },
  down: (queryInterface/*, Sequelize*/) => {
    //removeConstraint('products', 'Company').
    return queryInterface.dropTable('users')
    /*
     *    return queryInterface.sequelize.transaction((t) => {
     * return Promise.all([
     * queryInterface.removeConstraint('products', 'Company', { transaction: t })
     * queryInterface.dropTable('products', { transaction: t }),
     * ])
     * })
     */
  }
}
