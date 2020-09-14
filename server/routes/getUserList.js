const { exec } = require("../db/sql"); 

module.exports = async (req, res, next) => {
  const sql = 'SELECT * FROM player';
  const userList = await exec(sql)
  res.send(userList);
};
