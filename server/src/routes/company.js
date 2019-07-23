import Router from 'koa-router'
import jwt from '../middleware/jwt'

import CompanyController from '../controllers/CompanyController'

const router = new Router()
const jwtMiddleware = jwt({ secret: process.env.JWT_SECRET })

const companyController = new CompanyController()

// get the current company
router.get('/api/v1/companies/current', jwtMiddleware, async (ctx/*, next*/) => {
  await companyController.getCurrent(ctx)
})

// update the current company
router.put('/api/v1/companies/current', jwtMiddleware, async (ctx/*, next*/) => {
  await companyController.updateCurrent(ctx)
})

export default router
