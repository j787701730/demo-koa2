const router = require('koa-router')()
const mysql = require('../lib/mysql.js')
router.get('/', async (ctx, next) => {
  // await ctx.render('index', {
  //   title: 'hello '
  // })
  // var _sql = 'select * from user';
  await ctx.render('index.html');
  // ctx.body = ctx.request.query;
  // ctx.body = ctx.query;
  // ctx.body = await mysql.findAllPost();
})

router.post('/string', async (ctx, next) => {
  var res = await mysql.query(`SELECT * FROM user where user_id = '${ctx.request.body.user_id}'`);
  ctx.body = res;

})

router.get('/json', async (ctx, next) => {
  var res = await mysql.query(`SELECT * FROM user where user_id = '${ctx.query.user_id}'`);
  ctx.body = res;
})

module.exports = router