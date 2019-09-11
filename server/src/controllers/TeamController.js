import dateFormat from 'date-fns/format'

import db from '../models'
const Team = db.Team
const Op = db.Sequelize.Op

class TeamController {

// CRUD

// List teams
  async list(ctx) {
    try {
      let result = await Team.findAll(
        { where: { company_id: ctx.state.company.id, status: {[Op.ne]: 'deleted'} } }
      )
      ctx.body = result
    } catch (error) {
      console.log(error)
      ctx.throw(400, 'INVALID_DATA')
    }
  }

  // get team
  async get(ctx) {
    //Make sure they've specified a team id
    const params = ctx.params
    if (!params.id) ctx.throw(400, 'INVALID_DATA')

    //Find and set that company
    let team = await Team
      .findOne(
        { where: { id: params.id, company_id: ctx.state.company.id, status : {[Op.ne]: 'deleted'} } }
      )
    if (!team) ctx.throw(400, 'INVALID_DATA')

    ctx.body = team
  }

  // create team
  async create(ctx) {
    const request = ctx.request.body
    // force the company id with the user one
    request.company_id = ctx.state.company.id
    if (request.parent_team_id == '') {
      request.parent_team_id = null
    }

    try {
      console.log('request',request)
      let team = await Team.create( request )
      ctx.body = team
    } catch (error) {
      ctx.throw(400, 'INVALID_DATA')
    }
  }

  // update team
  async update(ctx) {
    const request = ctx.request.body
    //Make sure they've specified a team id
    const params = ctx.params
    if (!params.id) ctx.throw(400, 'INVALID_DATA')

    //Find and set that company
    let team = await Team.findOne(
      { where: { id: params.id, company_id: ctx.state.company.id, status : {[Op.ne]: 'deleted'} } }
    )
    if (!team) ctx.throw(400, 'INVALID_DATA')

    //Add the updated date value
    team.updatedAt = dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss')

    //Replace the note data with the new updated note data
    Object.keys(request).forEach(function(parameter) {
      team[parameter] = request[parameter]
    })

    try {
      await team.save()
      ctx.body = team
    } catch (error) {
      ctx.throw(400, 'INVALID_DATA')
    }
  }

  // soft delete team
  async delete(ctx) {
    //Make sure they've specified a team id
    const params = ctx.params
    if (!params.id) ctx.throw(400, 'INVALID_DATA')

    //Find and set that company
    let team = await Team.findOne(
      { where: { id: params.id, company_id: ctx.state.company.id, status : {[Op.ne]: 'deleted'} } }
    )
    if (!team) ctx.throw(400, 'INVALID_DATA')

    //Add the soft delete values
    team.updatedAt = dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss')
    team.deletedAt = dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss')
    team.status = 'deleted'

    try {
      await team.save()
      ctx.body = team
    } catch (error) {
      ctx.throw(400, 'INVALID_DATA')
    }
  }

}

export default TeamController
