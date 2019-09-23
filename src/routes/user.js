import Router from 'koa-router'
import jwt from '../middleware/jwt'

import UserController from '../controllers/UserController'

const router = new Router()
const jwtMiddleware = jwt({ secret: process.env.JWT_SECRET })

router.get('/', async (ctx/*, next*/) => {
  ctx.body = { message: 'Hi there. ' + process.env.npm_package_version }
})

//Initial controller once for all routes
const userController = new UserController()

router.post('/api/v1/users/signup', async (ctx/*, next*/) => {
  await userController.signup(ctx)
})

router.post('/api/v1/users/signin', async (ctx/*, next*/) => {
  await userController.signin(ctx)
})

router.get('/api/v1/users/me', jwtMiddleware, async (ctx/*, next*/) => {
  await userController.me(ctx)
})

router.post('/api/v1/users/me/refreshAccessToken', async (ctx/*, next*/) => {
  await userController.refreshAccessToken(ctx)
})

// list users
router.get('/api/v1/users', jwtMiddleware, async (ctx/*, next*/) => {
  await userController.list(ctx)
})

// get user
router.get('/api/v1/users/:id', jwtMiddleware, async (ctx/*, next*/) => {
  await userController.get(ctx)
})

// create user
router.post('/api/v1/users', jwtMiddleware, async (ctx/*, next*/) => {
  await userController.create(ctx)
})

// update user
router.put('/api/v1/users/:id', jwtMiddleware, async (ctx/*, next*/) => {
  await userController.update(ctx)
})

// delete user
router.delete('/api/v1/users/:id', jwtMiddleware, async (ctx/*, next*/) => {
  await userController.delete(ctx)
})


export default router
