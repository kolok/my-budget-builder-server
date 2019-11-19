import Router from 'koa-router'
import jwt from '../middleware/jwt'

import ExpenseController from '../controllers/ExpenseController'
const expenseController = new ExpenseController()

const router = new Router()
const jwtMiddleware = jwt({ secret: process.env.JWT_SECRET })

// list expenses
router.get('/api/v1/expenses', jwtMiddleware, async (ctx/*, next*/) => {
  await expenseController.list(ctx)
})

// get expense
router.get('/api/v1/expenses/:id', jwtMiddleware, async (ctx/*, next*/) => {
  await expenseController.get(ctx)
})

// create expense
router.post('/api/v1/expenses', jwtMiddleware, async (ctx/*, next*/) => {
  await expenseController.create(ctx)
})

// update expense
router.put('/api/v1/expenses/:id', jwtMiddleware, async (ctx/*, next*/) => {
  await expenseController.update(ctx)
})

// delete expense
router.delete('/api/v1/expenses/:id', jwtMiddleware, async (ctx/*, next*/) => {
  await expenseController.delete(ctx)
})

export default router
