import Router from 'koa-router'

const router = new Router()

router.get('/', async (ctx/*, next*/) => {
  ctx.body = {'msg':'yeah !! we are up'}
  return
})

export default router
