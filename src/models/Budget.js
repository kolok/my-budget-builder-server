'use strict'

module.exports  = function(sequelize, DataTypes) {
  var Budget = sequelize.define('Budget', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    companyID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'company_id'
    },
    startDate: {
      allowNull: true,
      type: DataTypes.DATE,
      field: 'start_date'
    },
    endDate: {
      allowNull: true,
      type: DataTypes.DATE,
      field: 'end_date'
    },
    status: {
      allowNull: false,
      defaultValue: 'active',
      type: DataTypes.ENUM(['active','deleted'])
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: sequelize.fn('NOW'),
      field: 'created_at'
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: sequelize.fn('NOW'),
      field: 'updated_at'
    },
    deletedAt: {
      allowNull: true,
      default: undefined,
      type: DataTypes.DATE,
      field: 'deleted_at'
    }
  }, {underscored: true, tableName: 'budgets'})

  Budget.associate = function(models) {
    Budget.belongsTo(models.Company, {
      foreignKey: 'companyID',
      as: 'company'
    })
  }

  return Budget
}
