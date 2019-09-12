import Router from 'koa-router'
import jwt from '../middleware/jwt'

import CountryController from '../controllers/CountryController'

const router = new Router()
const jwtMiddleware = jwt({ secret: process.env.JWT_SECRET })

//Initial controller once for all routes
const countryController = new CountryController()

router.get('/api/v1/countries', jwtMiddleware, async (ctx/*, next*/) => {
  await countryController.list(ctx)
})

export default router
