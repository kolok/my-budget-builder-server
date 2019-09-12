import dateFormat from 'date-fns/format'

import db from '../models'
const Entity = db.Entity
const Op = db.Sequelize.Op

class EntityController {

// CRUD

// List entities
  async list(ctx) {
    try {
      let result = await Entity.findAll(
        { where: { company_id: ctx.state.company.id, status: {[Op.ne]: 'deleted'} } }
      )
      ctx.body = result
    } catch (error) {
      console.log(error)
      ctx.throw(400, 'INVALID_DATA')
    }
  }

  // get entity
  async get(ctx) {
    //Make sure they've specified a entity id
    const params = ctx.params
    if (!params.id) ctx.throw(400, 'INVALID_DATA')

    //Find and set that company
    let entity = await Entity
      .findOne(
        { where: { id: params.id, company_id: ctx.state.company.id, status : {[Op.ne]: 'deleted'} } }
      )
    if (!entity) ctx.throw(400, 'INVALID_DATA')

    ctx.body = entity
  }

  // create entity
  async create(ctx) {
    const request = ctx.request.body
    request.company_id = ctx.state.company.id

    try {
      let entity = await Entity.create( request , {include: ['currency', 'country']})
      let result = await Entity.findOne( { where: { id: entity.id}, include: ['offices', 'currency', 'country'] } )
      ctx.body = result
    } catch (error) {
      ctx.throw(400, 'INVALID_DATA')
    }
  }

  // update entity
  async update(ctx) {
    const request = ctx.request.body
    //Make sure they've specified a entity id
    const params = ctx.params
    if (!params.id) ctx.throw(400, 'INVALID_DATA')

    //Find and set that company
    let entity = await Entity.findOne(
      { where: { id: params.id, company_id: ctx.state.company.id, status : {[Op.ne]: 'deleted'} } }
    )
    if (!entity) ctx.throw(400, 'INVALID_DATA')

    //Add the updated date value
    entity.updatedAt = dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss')

    //Replace the note data with the new updated note data
    Object.keys(request).forEach(function(parameter) {
      entity[parameter] = request[parameter]
    })

    try {
      await entity.save()
      let result = await Entity.findOne( { where: { id: entity.id}, include: ['offices', 'currency', 'country'] } )
      ctx.body = result
    } catch (error) {
      ctx.throw(400, 'INVALID_DATA')
    }
  }

  // soft delete entity
  async delete(ctx) {
    //Make sure they've specified a entity id
    const params = ctx.params
    if (!params.id) ctx.throw(400, 'INVALID_DATA')

    //Find and set that company
    let entity = await Entity.findOne(
      { where: { id: params.id, company_id: ctx.state.company.id, status : {[Op.ne]: 'deleted'} },
        include: [
          {association: 'offices', required:false, where: { status : {[Op.ne]: 'deleted'} }}
        ]
      }
    )
    if (!entity) ctx.throw(400, 'INVALID_DATA')


    try {
      //Add the soft delete values
      var now = dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss')
      entity.updatedAt = now
      entity.deletedAt = now
      entity.status = 'deleted'
      await entity.save()
      await entity.offices.forEach( office => {
        office.updatedAt = now
        office.deletedAt = now
        office.status = 'deleted'
        office.save()
      })
      ctx.body = { message: 'SUCCESS' }
    } catch (error) {
      ctx.throw(400, 'INVALID_DATA')
    }
  }

  // CRUD with offices

  // List entities with offices
  async listWithOffices(ctx) {
    try {
      let result = await Entity.findAll(
        { where: { company_id: ctx.state.company.id, status: {[Op.ne]: 'deleted'} },
          include: [
            {association: 'offices', required:false, where: { status : {[Op.ne]: 'deleted'} }},
            'currency',
            'country'
          ] }
      )
      ctx.body = result
    } catch (error) {
      console.log(error)
      ctx.throw(400, 'INVALID_DATA')
    }
  }

}

export default EntityController
