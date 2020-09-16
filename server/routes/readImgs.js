const path = require("path");
module.exports = async (req, res, next) => {
  const { img } = req.params;
  res.sendFile(path.resolve(__dirname,`../assets/avatar/${img}`));
};
