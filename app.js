const Koa = require('koa')
const session = require('koa-session-minimal')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')



const index = require('./routes/index')
const users = require('./routes/users')
const ws = require('./routes/ws')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname)) // 去掉了/public

app.use(views(__dirname + '/views', {
  extension: 'html'
}))

// session
app.use(session({
  key: 'hcj', // cookie 中存储 session-id 时的键名, 默认为 koa:sess
  cookie: { // 与 cookie 相关的配置
    // domain: 'localhost', // 写 cookie 所在的域名
    // path: '/', // 写 cookie 所在的路径
    // maxAge: 30 * 1000, // cookie 有效时长
    httpOnly: true, // 是否只用于 http 请求中获取
    overwrite: false // 是否允许重写
  }
}))

// logger
app.use(async (ctx, next) => {
  // const start = new Date()
  await next();
  if (ctx.status === 404) {
    await ctx.render('error.html');
  }
  // const ms = new Date() - start
  // console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(ws.routes(), ws.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

module.exports = app