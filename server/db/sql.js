var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "192.168.0.123",
  user: "root",
  password: "123456",
  database: "game",
});

connection.connect();

// question 存放所有的问题
// id answer tips

// plyaer 存放游戏中的玩家,初步设计在进入readyroom后，点击加入游戏时创建
// id name score roomId(如果有roomId说明已经进入房间)

// gameroom 由玩家所开设的房间，计划在第三个路由（大厅）中使用，用以展示所有房间
// id name 
// roomId (随机生成，格式为xxxx-1~8,1为房主,8为满人) 
// isGame 房间是否开始游戏 




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
