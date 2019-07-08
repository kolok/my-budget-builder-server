import Router from 'koa-router'
import jwt from '../middleware/jwt'
import logger from '../logs/log'

import CurrencyController from '../controllers/CurrencyController'

const router = new Router()
const jwtMiddleware = jwt({ secret: process.env.JWT_SECRET })

//Initial controller once for all routes
const currencyController = new CurrencyController()

router.get('/api/v1/currencies', jwtMiddleware, async (ctx, next) => {
  await currencyController.list(ctx)
})

export default router
