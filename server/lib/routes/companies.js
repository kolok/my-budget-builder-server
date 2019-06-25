"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _koaRouter = _interopRequireDefault(require("koa-router"));

var _log = _interopRequireDefault(require("../logs/log"));

var _CompanyController = _interopRequireDefault(require("../controllers/CompanyController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import jwt from '../middleware/jwt'
const router = new _koaRouter.default(); //const jwtMiddleware = jwt({ secret: process.env.JWT_SECRET })

const companyController = new _CompanyController.default(); // FIXME: add v1 in the path
// FIXME: manage authentication usign jwt

router.get('/api/companies', async (ctx, next) => {
  await companyController.index(ctx);
});
router.post('/api/companies',
/*jwtMiddleware,*/
async (ctx, next) => {
  await companyController.create(ctx);
});
router.get('/api/companies/:id',
/*jwtMiddleware,*/
async (ctx, next) => {
  await companyController.show(ctx);
});
router.get('/api/companies/:id/users',
/*jwtMiddleware,*/
async (ctx, next) => {
  await companyController.getUsers(ctx);
});
router.put('/api/companies/:id',
/*jwtMiddleware,*/
async (ctx, next) => {
  await companyController.update(ctx);
});
router.delete('/api/companies/:id',
/*jwtMiddleware,*/
async (ctx, next) => {
  await companyController.delete(ctx);
});
var _default = router;
exports.default = _default;