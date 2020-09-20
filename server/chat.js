const ws = require("nodejs-websocket");
const { insert } = require("./db/sql");
const eventCode = {
  0: (info) => {
    console.log(info);
  }, //测试

  // 准备房间
  99: register, //注册(实现)
  101: setTrans, //换位(实现)
  250: startGame, //开始游戏(实现)


  // 游戏中
  300: setAnswer, //检测答案
  350: setOrigin, //松开鼠标、或鼠标移除绘画区域时，重置原点（实现）
  400: setCanvas, //广播作画轨迹（实现）
  450: setTools, //切换工具（实现）


  // 游戏提示(控场)
  500: setLastPlayer,  //轮到 XX作画
  550: setLoadBegin,  //计时开始
  600: setRoundOver,  //回合结束，setLastPlayer
  650: setGameOver  //游戏结束， 总清算

};

const server = ws.createServer(function (connection) {
  connection.on("connect", function (code) {
    console.log("开启连接", code);
  });

  connection.on("text", function (data) {
    try {
      // 获取事件代码
      const { code, data: res } = JSON.parse(data);
      // 根据代码获取处理函数
      const eventHandle = eventCode[code];
      // 执行处理函数
      eventHandle(res);
    } catch (error) {
      console.log(error);
    }
  });

  // 断开连接
  connection.on("close", function (code, reason) {
    // console.log(code);
    // console.log(reason);
    console.log("断开连接");
  });

  // 连接错误
  connection.on("error", function (error) {
    // console.log(error);
  });
});

// 成功注册后，将新成员进行广播
function register(newPlayer) {
  broadcast({ code: 99, data: newPlayer });
}

//  换位
async function setTrans(player) {
  const sql = "UPDATE player SET locate = ? WHERE Id = ?";
  const value = [player.locate, player.id];
  try {
    const result = await insert(sql, value);
    broadcast({ code: 99, data: player });
  } catch (error) {
    console.log(error);
  }
}

function startGame() {
  broadcast({ code: 250 });
}


// 检验当前回答是否为正确答案
// 如果是正确答案，那么根据答对的排位进行加分
// 最后返回整个数组
async function setAnswer(answer) {
  console.log(answer);
  broadcast({ code: 300, data: { ...answer } });
}

// 鼠标点击时，确定笔触的原点坐标
function setOrigin() {
  broadcast({ code: 350 });
}

// 鼠标移动时，从点击的这个原坐标开始移动
// 鼠标松开后，取消跟踪鼠标
function setCanvas(position) {
  broadcast({ code: 400, data: position });
}

// 广播切换工具
function setTools(tools) {
  broadcast({ code: 450, data: tools });
}


// 轮到XX作画
function setLastPlayer(lastPlyaer){
  broadcast({ code: 500,data: lastPlyaer });
}


// 计时开始
function setLoadBegin(){
  console.log('计时计时计时计时计时计时计时计时');
  broadcast({ code: 550 });
}


// 回合结束
function setRoundOver(){
  broadcast({ code: 600 });
}

// 游戏结束
function setGameOver(){
  broadcast({ code: 650 });
}



// 广播数据
function broadcast(msg) {
  server.connections.forEach(function (connection) {
    connection.sendText(JSON.stringify(msg));
  });
}

server.listen(8081);
