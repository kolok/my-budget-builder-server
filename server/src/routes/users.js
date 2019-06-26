import Router from 'koa-router'
//import jwt from '../middleware/jwt'
import logger from '../logs/log'

import UserController from '../controllers/UserController'

const router = new Router()
//const jwtMiddleware = jwt({ secret: process.env.JWT_SECRET })

const userController = new UserController()

// FIXME: add v1 in the path
// FIXME: manage authentication usign jwt

// FIXME: do we need it ?
router.get('/api/users', async (ctx, next) => {
    await userController.index(ctx)
})

router.get('/api/users/:id/company', /*jwtMiddleware,*/ async (ctx, next) => {
    await userController.getCompany(ctx)
})

export default router
