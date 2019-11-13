import Router from 'koa-router'
import jwt from '../middleware/jwt'

import UserController from '../controllers/UserController'

const router = new Router()
const jwtMiddleware = jwt({ secret: process.env.JWT_SECRET })

// Default route to check the API is UP
router.get('/', async (ctx/*, next*/) => {
  ctx.body = { message: 'Hi there. ' + process.env.npm_package_version }
})

//Initial controller once for all routes
const userController = new UserController()

// Manage the sign on : post a sign on form and save a new user in DB
router.post('/api/v1/users/signup', async (ctx/*, next*/) => {
  await userController.signup(ctx)
})

// Manage the sign in with credentials
router.post('/api/v1/users/signin', async (ctx/*, next*/) => {
  await userController.signin(ctx)
})

// return the current user info from database
router.get('/api/v1/users/me', jwtMiddleware, async (ctx/*, next*/) => {
  await userController.me(ctx)
})

// refreshToken is called to refresh the accessToken when it is expired from the refresh token
router.post('/api/v1/users/me/refreshAccessToken', async (ctx/*, next*/) => {
  await userController.refreshAccessToken(ctx)
})

// updatePasswordRequest request to get a renew password email
router.post('/api/v1/users/me/updatePasswordRequest', jwtMiddleware, async (ctx/*, next*/) => {
  await userController.updatePasswordRequest(ctx)
})

// updatePasswordRequest request to get a renew password email
router.post('/api/v1/users/updatePasswordRequest', async (ctx/*, next*/) => {
  await userController.updatePasswordRequest(ctx)
})

// updatePassword will update the password of the user
router.post('/api/v1/users/updatePassword', async (ctx/*, next*/) => {
  console.log('router /api/v1/users/updatePassword')
  await userController.updatePassword(ctx)
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
