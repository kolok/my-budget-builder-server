import Router from 'koa-router'
import jwt from '../middleware/jwt'
import logger from '../logs/log'

import UserActionController from '../controllers/UserActionController'

const router = new Router()
const jwtMiddleware = jwt({ secret: process.env.JWT_SECRET })

router.get('/', async (ctx, next) => {
  ctx.body = { message: 'Hi there. ' + process.env.npm_package_version }
})

//Initial controller once for all routes
const userActionController = new UserActionController()

router.post('/api/v1/users/signup', async (ctx, next) => {
  await userActionController.signup(ctx)
})

router.post('/api/v1/users/signin', async (ctx, next) => {
  await userActionController.signin(ctx)
})

router.get('/api/v1/users/me', jwtMiddleware, async (ctx, next) => {
  await userActionController.me(ctx)
})

/*
router.post('/api/v1/user/refreshAccessToken', async (ctx, next) => {
    await userActionController.refreshAccessToken(ctx)
})

router.post(
    '/api/user/invalidateAllRefreshTokens',
    jwtMiddleware,
    async (ctx, next) => {
        await userActionController.invalidateAllRefreshTokens(ctx)
    }
)

router.post(
    '/api/user/invalidateRefreshToken',
    jwtMiddleware,
    async (ctx, next) => {
        await userActionController.invalidateRefreshToken(ctx)
    }
)

router.post('/api/user/forgot', async (ctx, next) => {
    await userActionController.forgot(ctx)
})

router.post('/api/user/checkPasswordResetToken', async (ctx, next) => {
    await userActionController.checkPasswordResetToken(ctx)
})

router.post('/api/user/resetPassword', async (ctx, next) => {
    await userActionController.resetPassword(ctx)
})
*/

export default router
