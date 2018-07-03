const router = require('koa-router')()
const mysql = require('../lib/mysql.js')
router.get('/', async (ctx, next) => {
  // await ctx.render('index', {
  //   title: 'hello '
  // })

  // var _sql = 'select * from user';
  console.log(await mysql.findAllPost());
  // ctx.body = ctx.request.query;
  // ctx.body = ctx.query;
  ctx.body = await mysql.findAllPost();
})

router.get('/string', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }; // 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router