import dateFormat from 'date-fns/format'

import db from '../models'
const Employee = db.Employee
const Op = db.Sequelize.Op

class EmployeeController {

// CRUD

// List employees
  async list(ctx) {
    try {
      let result = await Employee.findAll(
        { where: { companyID: ctx.state.company.id, status: {[Op.ne]: 'deleted'} } }
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
        { where: { id: params.id, companyID: ctx.state.company.id, status : {[Op.ne]: 'deleted'} } }
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
      console.log('request',request)
      let employee = await Employee.create( request )
      ctx.body = employee
    } catch (error) {
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
      { where: { id: params.id, companyID: ctx.state.company.id, status : {[Op.ne]: 'deleted'} } }
    )
    if (!employee) ctx.throw(400, 'INVALID_DATA')

    //Add the updated date value
    employee.updatedAt = dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss')

    //Replace the note data with the new updated note data
    Object.keys(request).forEach(function(parameter) {
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
      { where: { id: params.id, companyID: ctx.state.company.id, status : {[Op.ne]: 'deleted'} } }
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

}

export default EmployeeController
