/**
 * GET      /api/teams         -> index
 * POST     /api/teams         -> create
 * GET      /api/teams/:id     -> show
 * PUT      /api/teams/:id     -> update
 * DELETE   /api/teams/:id     -> delete
 */

import HTTP from './common/http'

/*
 * Service should be singleton,
 * hence we could declare a simple object literal.
 */
let TeamResource = {

  list() { // Show all the teams
    return HTTP.get('teams')
  },

  get(id) { // Get a specific team
    return HTTP.get('teams/' + id)
  },

  create(body) { // Create a team
    return HTTP.post('teams', body)
  },

  delete(id) { // Delete a team
    return HTTP.delete('teams/' + id)
  },

  update(id, body) { // Update a team
    return HTTP.put('teams/' + id, body)
  }
}

export default TeamResource
