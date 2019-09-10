import Router from 'koa-router'
import jwt from '../middleware/jwt'

import TeamController from '../controllers/TeamController'
const teamController = new TeamController()

const router = new Router()
const jwtMiddleware = jwt({ secret: process.env.JWT_SECRET })

// create team
router.post('/api/v1/teams', jwtMiddleware, async (ctx/*, next*/) => {
  await teamController.create(ctx)
})

// update team
router.put('/api/v1/teams/:id', jwtMiddleware, async (ctx/*, next*/) => {
  await teamController.update(ctx)
})

// delete team
router.delete('/api/v1/teams/:id', jwtMiddleware, async (ctx/*, next*/) => {
  await teamController.delete(ctx)
})

export default router
