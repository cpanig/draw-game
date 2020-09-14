const express = require(`express`)
const router = express.Router()
const getUserList = require('../routes/getUserList');
const joinInGame = require('../routes/joinInGame');


// 获取数据
router.get('/api/getUserList',getUserList);

// 加入游戏
router.post('/api/joinInGame',joinInGame)


module.exports = router




