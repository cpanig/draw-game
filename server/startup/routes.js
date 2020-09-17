const express = require(`express`)
const router = express.Router()
const getUserList = require('../routes/getUserList');
const joinInGame = require('../routes/joinInGame');
const readImg  = require('../routes/readImgs')
const getAvatarList = require('../routes/getAvatarList')

// 获取数据
router.get('/api/getUserList',getUserList);

// 加入游戏
router.post('/api/joinInGame',require("body-parser").json(),joinInGame)

// 读取单张图片
router.get('/assets/:img',readImg);



// 读取头像列表
router.get('/api/getAvatarList',getAvatarList)

module.exports = router




