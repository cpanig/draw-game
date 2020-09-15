const ws = require('nodejs-websocket')
const { insert } = require('./db/sql')
const eventCode = {
    0 : (info) =>{ console.log(info)}, //测试
    99 : register, //注册
    100 : joinInGame, //已经注册，加入游戏
    300 : setAnswer, //检测答案
    350 : setOrigin, //松开鼠标、或鼠标移除绘画区域时，重置原点（实现）
    400 : setCanvas, //广播作画轨迹（实现）
    450 : setTools //切换工具（实现）
}
// 待解决的问题
// 1.怎么样去监听不同的事件
// 2.怎么传输canvas

// 需要广播的数据
// 1.canvas
// 2.回答问题的数据
// 3.分数和排名
// 4.轮到哪一个人作画



const server = ws.createServer(function (connection) {
    connection.on('connect',function(code){
        console.log('开启连接',code)
    })


    connection.on('text', function (data) {
        // 获取事件代码
        const { code,data : res } = JSON.parse(data);
        // 根据代码获取处理函数
        const eventHandle = eventCode[code];
        // 执行处理函数
        eventHandle(res);
    })

    // 断开连接
    connection.on('close', function (code, reason) {
        console.log(code)
        console.log(reason);
        console.log('断开')
    })

    // 连接错误
    connection.on('error', function (error) {
        console.log(error)
    })
})


// 注册
async function register(info){
    const sql = `INSERT INTO player SET ?`
    const value = {
        name:"小红",
        score : 0
    }
    const { insertId : id } = await insert(sql,value);
    
    broadcast(JSON.stringify({code:99,data:{id,...value}}))
}

// 加入游戏
function joinInGame(info){
    
}


// 开始游戏后，将所有参赛玩家保存到数据库中，并广播整个玩家列表数据
// 每个玩家进入游戏时（之后会设置为在开始游戏后），将玩家数据保存到数据库中
// 届时会让玩家设置自己的名称，选择一个自己的头像
function setPlayerList(userData){
    
}


// 设置当前作画者
function setDrawer(){
    // 从数据库获取本次游戏的全部玩家
    // 找到当前作画者
    // 将作画标签移到下一位
}

// 检验当前回答是否为正确答案
// 如果是正确答案，那么根据答对的排位进行加分
// 最后返回整个数组
function setAnswer(answer){
    
   broadcast(JSON.stringify({code:300,data:answer}))
}


// 鼠标点击时，确定笔触的原点坐标
function setOrigin(){
    broadcast(JSON.stringify({code : 350 }))
}


// 鼠标移动时，从点击的这个原坐标开始移动
// 鼠标松开后，取消跟踪鼠标
function setCanvas(position){
    broadcast(JSON.stringify({code : 400 , data:position}))
}

// 广播切换工具
function setTools(tools){
    broadcast(JSON.stringify({code : 450 , data:tools}))
}



// 广播数据
function broadcast(msg) {
    server.connections.forEach(function (connection) {
        connection.sendText(msg)
    })
}


server.listen(8081)