import Router from 'koa-router'
import jwt from '../middleware/jwt'

import PositionController from '../controllers/PositionController'
const positionController = new PositionController()

const router = new Router()
const jwtMiddleware = jwt({ secret: process.env.JWT_SECRET })

// list positions
router.get('/api/v1/positions', jwtMiddleware, async (ctx/*, next*/) => {
  await positionController.list(ctx)
})

// get position
router.get('/api/v1/positions/:id', jwtMiddleware, async (ctx/*, next*/) => {
  await positionController.get(ctx)
})

// create position
router.post('/api/v1/positions', jwtMiddleware, async (ctx/*, next*/) => {
  await positionController.create(ctx)
})

// update position
router.put('/api/v1/positions/:id', jwtMiddleware, async (ctx/*, next*/) => {
  await positionController.update(ctx)
})

// delete position
router.delete('/api/v1/positions/:id', jwtMiddleware, async (ctx/*, next*/) => {
  await positionController.delete(ctx)
})

export default router
