import Router from 'koa-router'
import jwt from '../middleware/jwt'

import EmployeeController from '../controllers/EmployeeController'
const employeeController = new EmployeeController()

const router = new Router()
const jwtMiddleware = jwt({ secret: process.env.JWT_SECRET })

// list employees
router.get('/api/v1/employees', jwtMiddleware, async (ctx/*, next*/) => {
  await employeeController.list(ctx)
})

// get employee
router.get('/api/v1/employees/:id', jwtMiddleware, async (ctx/*, next*/) => {
  await employeeController.get(ctx)
})

// create employee
router.post('/api/v1/employees', jwtMiddleware, async (ctx/*, next*/) => {
  await employeeController.create(ctx)
})

// update employee
router.put('/api/v1/employees/:id', jwtMiddleware, async (ctx/*, next*/) => {
  await employeeController.update(ctx)
})

// delete employee
router.delete('/api/v1/employees/:id', jwtMiddleware, async (ctx/*, next*/) => {
  await employeeController.delete(ctx)
})

export default router
