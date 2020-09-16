const fs = require("fs");

module.exports = function readImg(path) {
  fs.readFileSync(path, "binary", function (err, file) {
    if (err) {
      console.log(err);
      return;
    } else {
      console.log("输出文件");
      res.write(file, "binary");
      res.end();
    }
  });
};
