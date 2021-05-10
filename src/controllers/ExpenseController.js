import dateFormat from 'date-fns/format'

import db from '../models'
const Expense = db.Expense
const Op = db.Sequelize.Op

class ExpenseController {

// CRUD

// List expenses
  async list(ctx) {
    try {
      let result = await Expense.findAll(
        { where: { companyID: ctx.state.company.id, status: {[Op.ne]: 'deleted'} } }
      )
      ctx.body = result
    } catch (error) {
      console.log(error)
      ctx.throw(400, 'INVALID_DATA')
    }
  }

  // get expense
  async get(ctx) {
    //Make sure they've specified a expense id
    const params = ctx.params
    if (!params.id) ctx.throw(400, 'INVALID_DATA')

    //Find and set that company
    let expense = await Expense
      .findOne(
        { where: { id: params.id, companyID: ctx.state.company.id, status : {[Op.ne]: 'deleted'} } }
      )
    if (!expense) ctx.throw(400, 'INVALID_DATA')

    ctx.body = expense
  }

  // create expense
  async create(ctx) {
    const request = ctx.request.body
    // force the company id with the user one
    request.companyID = ctx.state.company.id
    request.status = 'active'

    try {
      let expense = await Expense.create( request )
      ctx.body = expense
    } catch (error) {
      ctx.throw(400, 'INVALID_DATA')
    }
  }

  // update expense
  async update(ctx) {
    const request = ctx.request.body
    //Make sure they've specified a expense id
    const params = ctx.params
    if (!params.id) ctx.throw(400, 'INVALID_DATA')

    //Find and set that company
    let expense = await Expense.findOne(
      { where: { id: params.id, companyID: ctx.state.company.id, status : {[Op.ne]: 'deleted'} } }
    )
    if (!expense) ctx.throw(400, 'INVALID_DATA')

    //Add the updated date value
    expense.updatedAt = dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss')

    //Replace the note data with the new updated note data
    Object.keys(request).forEach(function(parameter) {
      expense[parameter] = request[parameter]
    })

    try {
      await expense.save()
      ctx.body = expense
    } catch (error) {
      ctx.throw(400, 'INVALID_DATA')
    }
  }

  // soft delete expense
  async delete(ctx) {
    //Make sure they've specified a expense id
    const params = ctx.params
    if (!params.id) ctx.throw(400, 'INVALID_DATA')

    //Find and set that company
    let expense = await Expense.findOne(
      { where: { id: params.id, companyID: ctx.state.company.id, status : {[Op.ne]: 'deleted'} } }
    )
    if (!expense) ctx.throw(400, 'INVALID_DATA')

    //Add the soft delete values
    expense.updatedAt = dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss')
    expense.deletedAt = dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss')
    expense.status = 'deleted'

    try {
      await expense.save()
      ctx.body = expense
    } catch (error) {
      ctx.throw(400, 'INVALID_DATA')
    }
  }

}

export default ExpenseController
