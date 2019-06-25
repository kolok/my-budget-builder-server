import Router from 'koa-router'
//import jwt from '../middleware/jwt'
import logger from '../logs/log'

import CompanyController from '../controllers/CompanyController'

const router = new Router()
//const jwtMiddleware = jwt({ secret: process.env.JWT_SECRET })

const companyController = new CompanyController()

// FIXME: add v1 in the path
// FIXME: manage authentication usign jwt
router.get('/api/companies', async (ctx, next) => {
    await companyController.index(ctx)
})

router.post('/api/companies', /*jwtMiddleware,*/ async (ctx, next) => {
    await companyController.create(ctx)
})

router.get('/api/companies/:id', /*jwtMiddleware,*/ async (ctx, next) => {
    await companyController.show(ctx)
})

router.get('/api/companies/:id/users', /*jwtMiddleware,*/ async (ctx, next) => {
    await companyController.getUsers(ctx)
})

router.put('/api/companies/:id', /*jwtMiddleware,*/ async (ctx, next) => {
    await companyController.update(ctx)
})

router.delete('/api/companies/:id', /*jwtMiddleware,*/ async (ctx, next) => {
    await companyController.delete(ctx)
})

export default router
