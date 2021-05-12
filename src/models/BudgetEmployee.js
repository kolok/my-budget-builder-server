'use strict'

module.exports  = function(sequelize, DataTypes) {
  var BudgetEmployee = sequelize.define('BudgetEmployee', {
    employeeID: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Employee',
        key: 'id'
      },
      field: 'employee_id'
    },
    budgetID: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Budget',
        key: 'id'
      },
      field: 'budget_id'
    }
  }, {underscored: true, tableName: 'budgets_employees'})

  //FIXME add unicity budget_id, employee_id

  BudgetEmployee.associate = (models) => {
    //So BudgetEmployee belongs to Employee
    BudgetEmployee.belongsTo(models.Employee, {
      foreignKey: 'employeeID',
      as: 'employee'
    })
    //So BudgetEmployee belongs to Budget
    BudgetEmployee.belongsTo(models.Budget, {
      foreignKey: 'budgetID',
      as: 'budget'
    })
  }

  return BudgetEmployee
}
