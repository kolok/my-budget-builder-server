"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _koaRouter = _interopRequireDefault(require("koa-router"));

var _log = _interopRequireDefault(require("../logs/log"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import jwt from '../middleware/jwt'
const router = new _koaRouter.default();
router.get('/', async (ctx, next) => {
  ctx.body = {
    "msg": "yeah !! we are up"
  };
  return;
});
var _default = router;
exports.default = _default;