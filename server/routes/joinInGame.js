const { insert } = require("../db/sql"); 

module.exports = async (req, res, next) => {
    const sql = `INSERT INTO player SET ?`
    const value = req.body;
    const { insertId : id } = await insert(sql,value);

    res.send({id,...newUser})
};