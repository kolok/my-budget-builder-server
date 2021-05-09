'use strict'

module.exports  = function(sequelize, DataTypes) {
  var Employee = sequelize.define('Employee', {
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
    email: {
      allowNull: true,
      type: DataTypes.STRING,
      unique: false
    },
    companyID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'company_id'
    },
    officeID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'office_id'
    },
    birthDate: {
      allowNull: true,
      type: DataTypes.DATE,
      field: 'birth_date'
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
  }, {underscored: true, tableName: 'employees'})

  Employee.associate = function(models) {
    Employee.belongsTo(models.Company, {
      foreignKey: 'companyID',
      as: 'company'
    })
    Employee.belongsTo(models.Office, {
      foreignKey: 'officeID',
      as: 'office'
    })
    Employee.hasMany(models.Position, {
      foreignKey: 'employeeID',
      as: 'positions'
    })
    Employee.hasMany(models.Expense, {
      foreignKey: 'employeeID',
      as: 'expenses'
    })


    Employee.hasMany(models.BudgetEmployee, {
      foreignKey: 'employeeID',
      as: 'budgetEmployees'
    })

    Employee.belongsToMany(models.Budget, {
      through: 'BudgetEmployee',
      as: 'budgets',
      foreignKey: 'employeeID'
    })

  }

  return Employee
}
