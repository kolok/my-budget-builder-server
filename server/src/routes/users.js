import Router from 'koa-router'
import jwt from '../middleware/jwt'
import logger from '../logs/log'

import UserController from '../controllers/UserController'

const router = new Router()
const jwtMiddleware = jwt({ secret: process.env.JWT_SECRET })

router.get('/', async (ctx, next) => {
  ctx.body = { message: 'Hi there. ' + process.env.npm_package_version }
})

//Initial controller once for all routes
const userController = new UserController()

router.post('/api/v1/users/signup', async (ctx, next) => {
  await userController.signup(ctx)
})

router.post('/api/v1/users/signin', async (ctx, next) => {
  await userController.signin(ctx)
})

router.get('/api/v1/users/me', jwtMiddleware, async (ctx, next) => {
  await userController.me(ctx)
})

router.get('/api/v1/users/me/company', jwtMiddleware, async (ctx, next) => {
  await userController.myCompany(ctx)
})

router.put('/api/v1/users/me/company', jwtMiddleware, async (ctx, next) => {
  await userController.saveMyCompany(ctx)
})

/*
router.post('/api/v1/user/refreshAccessToken', async (ctx, next) => {
    await userController.refreshAccessToken(ctx)
})

router.post(
    '/api/user/invalidateAllRefreshTokens',
    jwtMiddleware,
    async (ctx, next) => {
        await userController.invalidateAllRefreshTokens(ctx)
    }
)

router.post(
    '/api/user/invalidateRefreshToken',
    jwtMiddleware,
    async (ctx, next) => {
        await userController.invalidateRefreshToken(ctx)
    }
)

router.post('/api/user/forgot', async (ctx, next) => {
    await userController.forgot(ctx)
})

router.post('/api/user/checkPasswordResetToken', async (ctx, next) => {
    await userController.checkPasswordResetToken(ctx)
})

router.post('/api/user/resetPassword', async (ctx, next) => {
    await userController.resetPassword(ctx)
})
*/

export default router
