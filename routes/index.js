const router = require('koa-router')()
const mysql = require('../lib/mysql.js')
router.get('/', async (ctx, next) => {
  await ctx.render('index.html');
})

router.post('/checkLogin', async (ctx, next) => {
  const {
    user_name,
    user_pwd
  } = ctx.request.body;

  if (ctx.session.user && ctx.session.user.user_name == user_name && ctx.session.user.user_pwd == user_pwd) {
    ctx.body = {
      err_code: '0',
      err_msg: `${ctx.session.user.user_name} 已登录，请勿重复登录`,
      timelong: ctx.session.user.timelong / 1000
    }
    ctx.session.user.timelong = Date.now() + 1000 * 3600;
  } else {
    if (user_name && user_pwd) {
      let sql = `select * from user where user_name = '${user_name}' and user_pwd = '${user_pwd}'`;
      var res = await mysql.query(sql);
      if (res.length) {
        ctx.body = res;
        ctx.session.user = {
          user_name,
          user_pwd,
          timelong: Date.now() + 1000 * 3600
        }
        ctx.body = {
          err_code: '0',
          err_msg: '登陆成功，请访问 GET / 查看session中的信息',
          timelong: ctx.session.user.timelong / 1000
        }
      } else {
        ctx.body = {
          err_code: '1221',
          code_msg: '用户不存在'
        }
      }
      // console.log(ctx.session.user.cookie.maxAge);
    } else {
      ctx.body = {
        err_code: '12212',
        code_msg: '用户名或密码不能为空'
      }
    }
  }
})


router.post('/string', async (ctx, next) => {
  var res = await mysql.query(`SELECT * FROM user where user_id = '${ctx.request.body.user_id}'`);
  ctx.body = res;

})
router.post('/updateSession', async (ctx, next) => {
  if (ctx.session.user && ctx.session.user.timelong && ctx.session.user.timelong > Date.now()) {
    ctx.session.user.timelong = Date.now() + 1000 * 3600;
    ctx.body = {
      err_code: '',
      code_msg: '还在登录中',
      timelong: new Date(ctx.session.user.timelong) + ':' + ctx.session.user.user_name
    }
  } else {
    ctx.session.user = null;
    ctx.body = {
      err_code: '',
      code_msg: '登录失效'
    }
  }
})

router.get('/json', async (ctx, next) => {
  var res = await mysql.query(`SELECT * FROM user where user_id = '${ctx.query.user_id}'`);
  ctx.body = res;
})

module.exports = router