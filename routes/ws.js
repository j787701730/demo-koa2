const router = require('koa-router')()

router.prefix('/ws')


router.get('/', async (ctx, next) => {
  await ctx.render('ws.html');
})


router.get('/bar', function (ctx, next) {

  ctx.body = 'bar'
})

module.exports = router
