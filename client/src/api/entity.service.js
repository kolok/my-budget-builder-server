/**
 * GET      /api/entities         -> index
 * POST     /api/entities         -> create
 * GET      /api/entities/:id     -> show
 * PUT      /api/entities/:id     -> update
 * DELETE   /api/entities/:id     -> delete
 */

import HTTP from './common/http'

/*
 * Service should be singleton,
 * hence we could declare a simple object literal.
 */
let EntityResource = {
  listWithOffices() { // Show all the entities
    return HTTP.get('entitiesoffices')
  },

  list() { // Show all the entities
    return HTTP.get('entities')
  },

  get(id) { // Get a specific entity
    return HTTP.get('entities/' + id)
  },

  create(body) { // Create a entity
    return HTTP.post('entities', body)
  },

  delete(id) { // Delete a entity
    return HTTP.delete('entities/' + id)
  },

  update(id, body) { // Update a entity
    return HTTP.put('entities/' + id, body)
  }
}

export default EntityResource
