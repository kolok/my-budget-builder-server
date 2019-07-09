/**
 * GET      /api/v1/currencies         -> indexList
 */

import HTTP from './common/http'

/*
 * Service should be singleton,
 * hence we could declare a simple object literal.
 */
let CurrencyResource = {
  list() { // Update a company
    return HTTP.get('currencies/')
  }
}

export default CurrencyResource
