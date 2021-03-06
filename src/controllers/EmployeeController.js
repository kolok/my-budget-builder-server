import dateFormat from 'date-fns/format'

import db from '../models'
const BudgetEmployee = db.BudgetEmployee
const Employee = db.Employee
const Expense = db.Expense
const Position = db.Position
const Op = db.Sequelize.Op

class EmployeeController {

  // CRUD

  // List employees
  async list(ctx) {
    const query = ctx.query
    try {
      let where = { 
        companyID: ctx.state.company.id, 
        status: { [Op.ne]: 'deleted' }
      }
      if (query.budgetID) {
        where['$budgetEmployees.budget_id$'] = query.budgetID
      }
      let result = await Employee.findAll(
        { where: where, 
          include: ['positions', 'expenses', 'budgetEmployees' ] }
      )
      ctx.body = result
    } catch (error) {
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
        { where:  { id: params.id, companyID: ctx.state.company.id, status: { [Op.ne]: 'deleted' } }, 
          include: ['positions', 'expenses']
        }
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
    request.email = request.email || null

    try {
      let employee = await Employee.create(request)
      await this.updateOrCreateExpenses(ctx, request, employee, 'payroll')
      await this.updateOrCreateExpenses(ctx, request, employee, 'bonus')
      await this.updateOrCreatePositions(ctx, request, employee)
      if (request.budgetID) {
        await BudgetEmployee.create({employeeID: employee.id, budgetID: request.budgetID})
      }
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
      { where: { id: params.id, companyID: ctx.state.company.id, status: { [Op.ne]: 'deleted' } }, 
        include: ['positions', 'expenses'] 
      }
    )
    if (!employee) ctx.throw(400, 'INVALID_DATA')

    try {
      await this.updateOrCreateExpenses(ctx, request, employee, 'payroll')
      await this.updateOrCreateExpenses(ctx, request, employee, 'bonus')
      await this.updateOrCreatePositions(ctx, request, employee)
    } catch (error) {
      ctx.throw(400, 'INVALID_DATA')
    }

    delete request.createdAt
    delete request.updatedAt
    Object.keys(request).forEach(function (parameter) {
      employee[parameter] = request[parameter]
    })
    employee.email = request.email || null
    //Add the updated date value
    employee.updatedAt = dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss')

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

  async updateOrCreatePositions(ctx, request, employee) {
    if (employee.positions !== undefined) {
      for (const ep of employee.positions) {
        //delete positions
        if (request.positions.find( rp => rp.id == ep.id ) === undefined) {
          ep.destroy()
        }
      }
    }
    for (const rp of request.positions) {
      //create or update positions
      if (rp.id) {
        // update
        let ep = await Position.findByPk(rp.id)
        ep.name = rp.name
        ep.teamID = Array.isArray(rp.teamID) ? rp.teamID[rp.teamID.length - 1 ] || 0 : rp.teamID
        ep.parttime = rp.parttime
        ep.save()
      }
      else {
        //create
        rp['companyID'] = ctx.state.company.id
        rp['employeeID'] = employee.id
        rp.teamID = Array.isArray(rp.teamID) ? rp.teamID[rp.teamID.length - 1 ] || 0 : rp.teamID
        Position.create(rp)
      }
    }
  }

  async updateOrCreateExpenses(ctx, request, employee, expense_type) {
    let requestExpense = request.expenses.find(expense => expense.expense_type == expense_type)
    let employeeExpense = employee.expenses !== undefined ? 
      employee.expenses.find(expense => expense.expense_type == expense_type) : 
      undefined
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
