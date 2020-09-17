const { insert } = require("../db/sql"); 

module.exports = async (req, res, next) => {
    console.log(req.body);
    const sql = `INSERT INTO player SET ?`
    const newUser = req.body;
    const { insertId : id } = await insert(sql,newUser);

    res.send({id,...newUser})
};