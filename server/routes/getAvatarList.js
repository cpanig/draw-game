const path = require("path");
const fs = require('fs')

module.exports = async (req, res, next) => {
    const avatarList = [];

    fs.readdirSync(path.resolve(__dirname,`../assets/avatar`)).forEach((file,index) =>{
        avatarList.push({
            id:index,
            img:`http://localhost:8888/assets/${file}`
        })
    })

    res.send(avatarList);
};