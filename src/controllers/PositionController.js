import dateFormat from 'date-fns/format'

import db from '../models'
const Position = db.Position
const Op = db.Sequelize.Op

class PositionController {

// CRUD

// List positions
  async list(ctx) {
    try {
      let result = await Position.findAll(
        { where: { companyID: ctx.state.company.id, status: {[Op.ne]: 'deleted'} } }
      )
      ctx.body = result
    } catch (error) {
      console.log(error)
      ctx.throw(400, 'INVALID_DATA')
    }
  }

  // get position
  async get(ctx) {
    //Make sure they've specified a position id
    const params = ctx.params
    if (!params.id) ctx.throw(400, 'INVALID_DATA')

    //Find and set that company
    let position = await Position
      .findOne(
        { where: { id: params.id, companyID: ctx.state.company.id, status : {[Op.ne]: 'deleted'} } }
      )
    if (!position) ctx.throw(400, 'INVALID_DATA')

    ctx.body = position
  }

  // create position
  async create(ctx) {
    const request = ctx.request.body
    // force the company id with the user one
    request.companyID = ctx.state.company.id
    request.status = 'active'

    try {
      console.log('request',request)
      let position = await Position.create( request )
      ctx.body = position
    } catch (error) {
      ctx.throw(400, 'INVALID_DATA')
    }
  }

  // update position
  async update(ctx) {
    const request = ctx.request.body
    //Make sure they've specified a position id
    const params = ctx.params
    if (!params.id) ctx.throw(400, 'INVALID_DATA')

    //Find and set that company
    let position = await Position.findOne(
      { where: { id: params.id, companyID: ctx.state.company.id, status : {[Op.ne]: 'deleted'} } }
    )
    if (!position) ctx.throw(400, 'INVALID_DATA')

    //Add the updated date value
    position.updatedAt = dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss')

    //Replace the note data with the new updated note data
    Object.keys(request).forEach(function(parameter) {
      position[parameter] = request[parameter]
    })

    try {
      await position.save()
      ctx.body = position
    } catch (error) {
      ctx.throw(400, 'INVALID_DATA')
    }
  }

  // soft delete position
  async delete(ctx) {
    //Make sure they've specified a position id
    const params = ctx.params
    if (!params.id) ctx.throw(400, 'INVALID_DATA')

    //Find and set that company
    let position = await Position.findOne(
      { where: { id: params.id, companyID: ctx.state.company.id, status : {[Op.ne]: 'deleted'} } }
    )
    if (!position) ctx.throw(400, 'INVALID_DATA')

    //Add the soft delete values
    position.updatedAt = dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss')
    position.deletedAt = dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss')
    position.status = 'deleted'

    try {
      await position.save()
      ctx.body = position
    } catch (error) {
      ctx.throw(400, 'INVALID_DATA')
    }
  }

}

export default PositionController
