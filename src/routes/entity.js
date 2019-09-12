import Router from 'koa-router'
import jwt from '../middleware/jwt'

import EntityController from '../controllers/EntityController'
const entityController = new EntityController()

const router = new Router()
const jwtMiddleware = jwt({ secret: process.env.JWT_SECRET })

// list entities
router.get('/api/v1/entities', jwtMiddleware, async (ctx/*, next*/) => {
  await entityController.list(ctx)
})

// get entity
router.get('/api/v1/entities/:id', jwtMiddleware, async (ctx/*, next*/) => {
  await entityController.get(ctx)
})

// create entity
router.post('/api/v1/entities', jwtMiddleware, async (ctx/*, next*/) => {
  await entityController.create(ctx)
})

// update entity
router.put('/api/v1/entities/:id', jwtMiddleware, async (ctx/*, next*/) => {
  await entityController.update(ctx)
})

// delete entity
router.delete('/api/v1/entities/:id', jwtMiddleware, async (ctx/*, next*/) => {
  await entityController.delete(ctx)
})

// list entities with their offices
router.get('/api/v1/entitiesoffices', jwtMiddleware, async (ctx/*, next*/) => {
  await entityController.listWithOffices(ctx)
})

export default router
