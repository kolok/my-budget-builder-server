import dateFormat from 'date-fns/format'

import db from '../models'
const Budget = db.Budget
const Op = db.Sequelize.Op

class BudgetController {

// CRUD

// List budgets
  async list(ctx) {
    try {
      let result = await Budget.findAll(
        { where: { companyID: ctx.state.company.id, status: {[Op.ne]: 'deleted'} } }
      )
      ctx.body = result
    } catch (error) {
      console.log(error)
      ctx.throw(400, 'INVALID_DATA')
    }
  }

  // get budget
  async get(ctx) {
    //Make sure they've specified a budget id
    const params = ctx.params
    if (!params.id) ctx.throw(400, 'INVALID_DATA')

    //Find and set that company
    let budget = await Budget
      .findOne(
        { where: { id: params.id, companyID: ctx.state.company.id, status : {[Op.ne]: 'deleted'} } }
      )
    if (!budget) ctx.throw(400, 'INVALID_DATA')

    ctx.body = budget
  }

  // create budget
  async create(ctx) {
    const request = ctx.request.body
    // force the company id with the user one
    request.companyID = ctx.state.company.id
    if (request.startDate == "") {
      delete request.startDate
    }
    if (request.endDate == "") {
      delete request.endDate
    }
    try {
      console.log('request',request)
      let budget = await Budget.create( request )
      ctx.body = budget
    } catch (error) {
      ctx.throw(400, 'INVALID_DATA')
    }
  }

  // update budget
  async update(ctx) {
    const request = ctx.request.body
    //Make sure they've specified a budget id
    const params = ctx.params
    if (!params.id) ctx.throw(400, 'INVALID_DATA')

    //Find and set that company
    let budget = await Budget.findOne(
      { where: { id: params.id, companyID: ctx.state.company.id, status : {[Op.ne]: 'deleted'} } }
    )
    if (!budget) ctx.throw(400, 'INVALID_DATA')

    //Add the updated date value
    budget.updatedAt = dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss')

    //Replace the note data with the new updated note data
    Object.keys(request).forEach(function(parameter) {
      budget[parameter] = request[parameter]
    })

    try {
      await budget.save()
      ctx.body = budget
    } catch (error) {
      ctx.throw(400, 'INVALID_DATA')
    }
  }

  // soft delete budget
  async delete(ctx) {
    //Make sure they've specified a budget id
    const params = ctx.params
    if (!params.id) ctx.throw(400, 'INVALID_DATA')

    //Find and set that company
    let budget = await Budget.findOne(
      { where: { id: params.id, companyID: ctx.state.company.id, status : {[Op.ne]: 'deleted'} } }
    )
    if (!budget) ctx.throw(400, 'INVALID_DATA')

    //Add the soft delete values
    budget.updatedAt = dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss')
    budget.deletedAt = dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss')
    budget.status = 'deleted'

    try {
      await budget.save()
      ctx.body = budget
    } catch (error) {
      ctx.throw(400, 'INVALID_DATA')
    }
  }

}

export default BudgetController
