/**
 * GET      /api/v1/companies         -> index
 * PUT      /api/v1/companies/:id     -> update
 */

import HTTP from './common/http'

/*
 * Service should be singleton,
 * hence we could declare a simple object literal.
 */
let CompanyResource = {
  update(id, body) { // Update a company
    return HTTP.put('companies/current', body)
  },
  get(id) { // Update a company
    return HTTP.get('companies/current')
  }
}

export default CompanyResource
