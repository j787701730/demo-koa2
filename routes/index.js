const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  // await ctx.render('index', {
  //   title: 'hello '
  // })
  // ctx.body = ctx.request.query;
  ctx.body = ctx.query;
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router