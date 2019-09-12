import Router from 'koa-router'
import jwt from '../middleware/jwt'

import OfficeController from '../controllers/OfficeController'
const officeController = new OfficeController()

const router = new Router()
const jwtMiddleware = jwt({ secret: process.env.JWT_SECRET })

// create office
router.post('/api/v1/offices', jwtMiddleware, async (ctx/*, next*/) => {
  await officeController.create(ctx)
})

// update office
router.put('/api/v1/offices/:id', jwtMiddleware, async (ctx/*, next*/) => {
  await officeController.update(ctx)
})

// delete office
router.delete('/api/v1/offices/:id', jwtMiddleware, async (ctx/*, next*/) => {
  await officeController.delete(ctx)
})

export default router
