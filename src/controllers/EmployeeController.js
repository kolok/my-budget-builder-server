import dateFormat from 'date-fns/format'

import db from '../models'
const Employee = db.Employee
const Expense = db.Expense
const Position = db.Position
const Op = db.Sequelize.Op

class EmployeeController {

  // CRUD

  // List employees
  async list(ctx) {
    try {
      let result = await Employee.findAll(
        { where: { companyID: ctx.state.company.id, status: { [Op.ne]: 'deleted' } }, include: ['positions', 'expenses'] }
      )
      ctx.body = result
    } catch (error) {
      console.log(error)
      ctx.throw(400, 'INVALID_DATA')
    }
  }

  // get employee
  async get(ctx) {
    //Make sure they've specified a employee id
    const params = ctx.params
    if (!params.id) ctx.throw(400, 'INVALID_DATA')

    //Find and set that company
    let employee = await Employee
      .findOne(
        { where: { id: params.id, companyID: ctx.state.company.id, status: { [Op.ne]: 'deleted' } }, include: ['positions', 'expenses'] }
      )
    if (!employee) ctx.throw(400, 'INVALID_DATA')

    ctx.body = employee
  }

  // create employee
  async create(ctx) {
    const request = ctx.request.body
    // force the company id with the user one
    request.companyID = ctx.state.company.id
    request.status = 'active'

    try {
      let employee = await Employee.create(request)
      this.updateOrCreateExpense(ctx, request, employee, 'payroll')
      this.updateOrCreateExpense(ctx, request, employee, 'bonus')
      ctx.body = employee
    } catch (error) {
      console.log(error)
      ctx.throw(400, 'INVALID_DATA')
    }
  }

  // update employee
  async update(ctx) {
    const request = ctx.request.body
    //Make sure they've specified a employee id
    const params = ctx.params
    if (!params.id) ctx.throw(400, 'INVALID_DATA')

    //Find and set that company
    let employee = await Employee.findOne(
      { where: { id: params.id, companyID: ctx.state.company.id, status: { [Op.ne]: 'deleted' } }, include: ['positions', 'expenses'] }
    )
    if (!employee) ctx.throw(400, 'INVALID_DATA')

    this.updateOrCreateExpense(ctx, request, employee, 'payroll')
    this.updateOrCreateExpense(ctx, request, employee, 'bonus')

    // C'est pas beau mais ça marche
    if (employee.positions.length) {
      console.log(request.positions[0])
      employee.positions[0].name = request.positions[0].name
      employee.positions[0].teamID = request.positions[0].teamID
      employee.positions[0].save()
    }
    else {
      request.positions.forEach(p => {
        var position = {
          companyID: ctx.state.company.id,
          employeeID: employee.id,
          teamID: p.teamID,
          name: p.name,
        }
        Position.create(position)
      })
  
    }

    delete request.expenses
    delete request.payroll
    delete request.bonus

    //Add the updated date value
    employee.updatedAt = dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss')

    Object.keys(request).forEach(function (parameter) {
      employee[parameter] = request[parameter]
    })

    try {
      await employee.save()
      ctx.body = employee
    } catch (error) {
      ctx.throw(400, 'INVALID_DATA')
    }
  }

  // soft delete employee
  async delete(ctx) {
    //Make sure they've specified a employee id
    const params = ctx.params
    if (!params.id) ctx.throw(400, 'INVALID_DATA')

    //Find and set that company
    let employee = await Employee.findOne(
      { where: { id: params.id, companyID: ctx.state.company.id, status: { [Op.ne]: 'deleted' } } }
    )
    if (!employee) ctx.throw(400, 'INVALID_DATA')

    //Add the soft delete values
    employee.updatedAt = dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss')
    employee.deletedAt = dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss')
    employee.status = 'deleted'

    try {
      await employee.save()
      ctx.body = employee
    } catch (error) {
      ctx.throw(400, 'INVALID_DATA')
    }
  }

  async updateOrCreateExpense(ctx, request, employee, expense_type) {
    let requestExpense = request.expenses.find(expense => expense.expense_type == expense_type)
    let employeeExpense = employee.expenses !== undefined ? employee.expenses.find(expense => expense.expense_type == expense_type) : undefined
    if (employeeExpense === undefined) {
      var expense = {
        companyID: ctx.state.company.id,
        employeeID: employee.id,
        expense_type: expense_type,
        amount: requestExpense ? requestExpense.amount : 0,
      }
      Expense.create(expense)
    }
    else {
      employeeExpense.amount = requestExpense ? requestExpense.amount : 0
      employeeExpense.save()
    }

  }

}

export default EmployeeController
