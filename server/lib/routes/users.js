"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _koaRouter = _interopRequireDefault(require("koa-router"));

var _log = _interopRequireDefault(require("../logs/log"));

var _UserController = _interopRequireDefault(require("../controllers/UserController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import jwt from '../middleware/jwt'
const router = new _koaRouter.default(); //const jwtMiddleware = jwt({ secret: process.env.JWT_SECRET })

const userController = new _UserController.default(); // FIXME: add v1 in the path
// FIXME: manage authentication usign jwt

router.get('/api/users', async (ctx, next) => {
  await userController.index(ctx);
});
router.get('/api/users/:id/company',
/*jwtMiddleware,*/
async (ctx, next) => {
  await userController.getCompany(ctx);
});
var _default = router;
exports.default = _default;