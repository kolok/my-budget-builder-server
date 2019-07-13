import Router from 'koa-router'
import jwt from '../middleware/jwt'
import logger from '../logs/log'

import CompanyController from '../controllers/CompanyController'

const router = new Router()
const jwtMiddleware = jwt({ secret: process.env.JWT_SECRET })

const companyController = new CompanyController()

// get a company
router.get('/api/v1/companies/current', jwtMiddleware, async (ctx, next) => {
  //FIXME: check the user right
  await companyController.getCurrent(ctx)
})

router.put('/api/v1/companies/current', jwtMiddleware, async (ctx, next) => {
    await companyController.updateCurrent(ctx)
})

export default router
