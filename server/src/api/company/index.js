/**
 * GET      /api/companies         -> index
 * POST     /api/companies         -> create
 * GET      /api/companies/:id     -> show
 * PUT      /api/companies/:id     -> update
 * DELETE   /api/companies/:id     -> delete
 */

'use strict'
const Router = require('koa-router')
var Company = require('./company.model')

let router = new Router({
  prefix: '/api/companies'
})

router
// index
  .get('/', async (ctx) => {
    try {
      ctx.body = await Company.find({})
    } catch(err) {
      throw err
    }
  })

// create
  .post('/', async (ctx) => {
    try {
      let newCompany = await Company.create(ctx.request.body)
      ctx.status = 201 // Status code 201 : created
      ctx.body = newCompany
    } catch(err) {
      throw err
    }
  })

// get single item
  .get('/:id', async (ctx) => {
    try {
      let entity = await Company.findById({_id: ctx.params.id})
      // Handle not found error
      if (!entity) { ctx.throw(404, 'not found') }
      ctx.body = entity
    } catch(err) {
      throw err
    }
  })

// update single item
  .put('/:id', async (ctx) => {
    try {
      let entity = await Company.findByIdAndUpdate(ctx.params.id,
        { $set: ctx.request.body },
        /*
         * new: bool - true to return the modified document rather
         * than the original. defaults to false
         */
        { new: true }
      )
      // Handle not found error
      if (!entity) { ctx.throw(404, 'not found') }
      ctx.body = entity
    } catch(err) {
      throw err
    }
  })

// delete
  .delete('/:id', async (ctx) => {
    try {
      let entity = await Company.findById({_id: ctx.params.id})
      // Handle not found error
      if (!entity) { ctx.throw(404, 'not found') }
      ctx.body = await entity.remove()
    } catch(err) {
      throw err
    }
  })

module.exports = router
