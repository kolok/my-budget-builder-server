'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
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
      email: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      },
      company_id: {
        type: Sequelize.INTEGER,
        allowNull: false/*,
        references: {
          model: 'Company',
          key: 'id'
        }*/
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      role: {
        allowNull: false,
        type: Sequelize.STRING,
        default: 'user'
      },
      status: {
        allowNull: false,
        default: 'active',
        type: Sequelize.ENUM(['active','inactive','deleted'])
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: "created_at"
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: "updated_at"
      },
      deletedAt: {
        allowNull: true,
        default: undefined,
        type: Sequelize.DATE,
        field: "deleted_at"
      }
    });
  },
  down: (queryInterface, Sequelize) => {
//removeConstraint('products', 'Company').
    return queryInterface.dropTable('users');
/*    return queryInterface.sequelize.transaction((t) => {
                return Promise.all([
                    queryInterface.removeConstraint('products', 'Company', { transaction: t })
                    queryInterface.dropTable('products', { transaction: t }),
                ])
            })*/
  }
};
