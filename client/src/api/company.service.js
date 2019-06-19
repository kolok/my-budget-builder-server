/**
 * GET      /api/companies         -> index
 * POST     /api/companies         -> create
 * GET      /api/companies/:id     -> show
 * PUT      /api/companies/:id     -> update
 * DELETE   /api/companies/:id     -> delete
 */

import HTTP from './http-common'

/*
 * Service should be singleton,
 * hence we could declare a simple object literal.
 */
let CompanyResource = {
  update(id, body) { // Update a company
    return HTTP.put('companies/' + id, body)
  },
  get(id) { // Update a company
    return HTTP.get('companies/' + id)
  }
}

export default CompanyResource
