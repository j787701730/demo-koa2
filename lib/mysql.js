var mysql = require('mysql');
var pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'zhengw',
  port: 3306
});

let query = function (sql, values) {
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        resolve(err)
      } else {
        connection.query(sql, values, (err, rows) => {
          if (err) {
            reject(err)
          } else {
            resolve(rows)
          }
          connection.release()
        })
      }
    })
  })
}


let findAllPost = function () {
  let _sql = `
    SELECT * FROM user
      `
  return query(_sql)
}

module.exports = {
  query,
  findAllPost
}