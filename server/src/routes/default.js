import Router from 'koa-router'
//import jwt from '../middleware/jwt'
import logger from '../logs/log'

const router = new Router()

router.get('/', async (ctx, next) => {
    ctx.body = {"msg":"yeah !! we are up"}
    return
})

export default router
