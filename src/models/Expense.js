'use strict'

module.exports  = function(sequelize, DataTypes) {
  var Expense = sequelize.define('Expense', {
    id: {
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      type: DataTypes.UUID
    },
    expense_type: {
      allowNull: false,
      defaultValue: 'payroll',
      type: DataTypes.ENUM(['payroll','bonus','payroll_increase','bonus_increase'])
    },
    companyID: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'company_id'
    },
    budgetID: {
      type: DataTypes.UUID,
      allowNull: true,
      field: 'budget_id'
    },
    employeeID: {
      type: DataTypes.UUID,
      allowNull: true,
      field: 'employee_id'
    },
    positionID: {
      type: DataTypes.UUID,
      allowNull: true,
      field: 'position_id'
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
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
  }, {underscored: true, tableName: 'expenses'})

  Expense.associate = function(models) {
    Expense.belongsTo(models.Company, {
      foreignKey: 'companyID',
      as: 'company'
    })
    Expense.belongsTo(models.Budget, {
      foreignKey: 'budgetID',
      as: 'budget'
    })
    Expense.belongsTo(models.Employee, {
      foreignKey: 'employeeID',
      as: 'employee'
    })
    Expense.belongsTo(models.Position, {
      foreignKey: 'positionID',
      as: 'position'
    })
  }

  return Expense
}
