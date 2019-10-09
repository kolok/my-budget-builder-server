import Router from 'koa-router'
import jwt from '../middleware/jwt'

import BudgetController from '../controllers/BudgetController'
const budgetController = new BudgetController()

const router = new Router()
const jwtMiddleware = jwt({ secret: process.env.JWT_SECRET })

// list budgets
router.get('/api/v1/budgets', jwtMiddleware, async (ctx/*, next*/) => {
  await budgetController.list(ctx)
})

// get budget
router.get('/api/v1/budgets/:id', jwtMiddleware, async (ctx/*, next*/) => {
  await budgetController.get(ctx)
})

// create budget
router.post('/api/v1/budgets', jwtMiddleware, async (ctx/*, next*/) => {
  await budgetController.create(ctx)
})

// update budget
router.put('/api/v1/budgets/:id', jwtMiddleware, async (ctx/*, next*/) => {
  await budgetController.update(ctx)
})

// delete budget
router.delete('/api/v1/budgets/:id', jwtMiddleware, async (ctx/*, next*/) => {
  await budgetController.delete(ctx)
})

export default router
