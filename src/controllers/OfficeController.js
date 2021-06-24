import dateFormat from 'date-fns/format'

import db from '../models'
const Office = db.Office
const Op = db.Sequelize.Op

class OfficeController {

// CRUD

  // create office
  async create(ctx) {
    const request = ctx.request.body
    request.companyID = ctx.state.company.id

    try {
      let office = await Office.create( request )
      ctx.body = office
    } catch (error) {
      ctx.throw(400, 'INVALID_DATA')
    }
  }

  // update office
  async update(ctx) {
    const request = ctx.request.body
    //Make sure they've specified a office id
    const params = ctx.params
    if (!params.id) ctx.throw(400, 'INVALID_DATA')

    //Find and set that company
    let office = await Office.findOne(
      { where: { id: params.id, companyID: ctx.state.company.id, status : {[Op.ne]: 'deleted'} } }
    )
    if (!office) ctx.throw(400, 'INVALID_DATA')

    //Add the updated date value
    office.updatedAt = dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss')

    //Replace the note data with the new updated note data
    Object.keys(request).forEach(function(parameter) {
      office[parameter] = request[parameter]
    })

    try {
      await office.save()
      ctx.body = office
    } catch (error) {
      ctx.throw(400, 'INVALID_DATA')
    }
  }

  // soft delete office
  async delete(ctx) {
    //Make sure they've specified a office id
    const params = ctx.params
    if (!params.id) ctx.throw(400, 'INVALID_DATA')

    //Find and set that company
    let office = await Office.findOne(
      { where: { id: params.id, companyID: ctx.state.company.id, status : {[Op.ne]: 'deleted'} } }
    )
    if (!office) ctx.throw(400, 'INVALID_DATA')

    //Add the soft delete values
    office.updatedAt = dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss')
    office.deletedAt = dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss')
    office.status = 'deleted'

    try {
      await office.save()
      ctx.body = office
    } catch (error) {
      ctx.throw(400, 'INVALID_DATA')
    }
  }

}

export default OfficeController
