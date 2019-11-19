'use strict'

module.exports = function (sequelize, DataTypes) {
  var Position = sequelize.define('Position', {
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
    teamID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'team_id'
    },
    employeeID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'employee_id'
    },
    parttime: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    status: {
      allowNull: false,
      defaultValue: 'active',
      type: DataTypes.ENUM(['active', 'deleted'])
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
  }, { underscored: true, tableName: 'positions' })

  Position.associate = function (models) {
    Position.belongsTo(models.Company, {
      foreignKey: 'companyID',
      as: 'company'
    })
    Position.belongsTo(models.Team, {
      foreignKey: 'teamID',
      as: 'team'
    })
    Position.belongsTo(models.Employee, {
      foreignKey: 'employeeID',
      as: 'employee'
    })
    Position.hasMany(models.Expense, {
      foreignKey: 'positionID',
      as: 'expenses'
    })

  }

  return Position
}
