/**
 * GET      /api/offices         -> index
 * POST     /api/offices         -> create
 * GET      /api/offices/:id     -> show
 * PUT      /api/offices/:id     -> update
 * DELETE   /api/offices/:id     -> delete
 */

import HTTP from './common/http'

/*
 * Service should be singleton,
 * hence we could declare a simple object literal.
 */
let OfficeResource = {
  create(body) { // Create a office
    return HTTP.post('offices', body)
  },

  delete(id) { // Delete a office
    return HTTP.delete('offices/' + id)
  },

  update(id, body) { // Update a office
    return HTTP.put('offices/' + id, body)
  }
}

export default OfficeResource
