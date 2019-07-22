/**
 * GET      /api/v1/countries         -> indexList
 */

import HTTP from './common/http'

/*
 * Service should be singleton,
 * hence we could declare a simple object literal.
 */
let CountryResource = {
  list() { // Update a company
    return HTTP.get('countries/')
  }
}

export default CountryResource
