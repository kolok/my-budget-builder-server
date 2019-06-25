'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _koa = _interopRequireDefault(require("koa"));

var _koaBodyparser = _interopRequireDefault(require("koa-bodyparser"));

var _kcors = _interopRequireDefault(require("kcors"));

var _log = _interopRequireDefault(require("./logs/log"));

var _koaUseragent = _interopRequireDefault(require("koa-useragent"));

var _koaJsonError = _interopRequireDefault(require("koa-json-error"));

var _koaRatelimit = _interopRequireDefault(require("koa-ratelimit"));

var _ioredis = _interopRequireDefault(require("ioredis"));

var _default2 = _interopRequireDefault(require("./routes/default"));

var _companies = _interopRequireDefault(require("./routes/companies"));

var _users = _interopRequireDefault(require("./routes/users"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Routes
//Initialize app
const app = new _koa.default(); //Here's the rate limiter

/*
app.use(
    ratelimit({
        db: new redis(),
        duration: 60000,
        errorMessage:
            "Hmm, you seem to be doing that a bit too much - wouldn't you say?",
        id: ctx => ctx.ip,
        headers: {
            remaining: 'Rate-Limit-Remaining',
            reset: 'Rate-Limit-Reset',
            total: 'Rate-Limit-Total',
        },
        max: 100,
    })
)
*/
//Let's log each successful interaction. We'll also log each error - but not here,
//that's be done in the json error-handling middleware

app.use(async (ctx, next) => {
  try {
    await next();

    _log.default.info(ctx.method + ' ' + ctx.url + ' RESPONSE: ' + ctx.response.status);
  } catch (error) {}
}); //Apply error json handling

let errorOptions = {
  postFormat: (e, obj) => {
    //Here's where we'll stick our error logger.
    _log.default.info(obj);

    if (process.env.NODE_ENV !== 'production') {
      return obj;
    } else {
      delete obj.stack;
      delete obj.name;
      return obj;
    }
  }
};
app.use((0, _koaJsonError.default)(errorOptions)); // return response time in X-Response-Time header

app.use(async function responseTime(ctx, next) {
  const t1 = Date.now();
  await next();
  const t2 = Date.now();
  ctx.set('X-Response-Time', Math.ceil(t2 - t1) + 'ms');
}); //For cors with options

app.use((0, _kcors.default)({
  origin: '*'
})); //For useragent detection

app.use(_koaUseragent.default); //For managing body. We're only allowing json.

app.use((0, _koaBodyparser.default)({
  enableTypes: ['json']
})); //For router

app.use(_default2.default.routes());
app.use(_default2.default.allowedMethods());
app.use(_companies.default.routes());
app.use(_companies.default.allowedMethods());
app.use(productsRouter.routes());
app.use(productsRouter.allowedMethods());
var _default = app;
exports.default = _default;