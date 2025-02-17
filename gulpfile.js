var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var nodemon = require('gulp-nodemon');
//这个可以让express启动
gulp.task("node", function () {
  nodemon({
    script: './bin/www',
    ignore: [
      //由于nodemon默认会监听所有文件的变化，所以在这指定忽略那些文件改变后不重启服务，这样就不会阻塞浏览器刷新的进程了不是吗
      "static/"
    ],
    env: {
      'NODE_ENV': 'development'
    }
  })
});

gulp.task('a', ["node"], function () { //'./static/**/*.*',
  //这的文件只需要监听前端的，一般后端开发不需要刷新页面
  var files = [
    // '../templates/**/*.mustache',
    // './static/**/*.*',
    './views/*.html',
    './*'
  ];

  //gulp.run(["node"]);
  browserSync.init({
    proxy: 'http://localhost:3000',
    browser: 'chrome',
    notify: false,
    port: 3001 //这个是browserSync对http://localhost:3000实现的代理端口
  });

  gulp.watch(files).on("change", reload);
});