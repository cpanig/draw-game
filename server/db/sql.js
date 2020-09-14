var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "game",
});

// connection.connect();

// plyaer 存放游戏中的玩家
// question 存放所有的问题
// answer 所有的回复信息 ，在想需不需要



// 统一查询数据库函数
function exec(sql) {
  const promise = new Promise((resolve, reject) => {
    connection.query(sql, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
  return promise;
}

// 数据库插入
function insert(sql,value) {
  const promise = new Promise((resolve, reject) => {
    connection.query(sql,value,(err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
  return promise;
}

module.exports = {
  exec,
  insert
};
