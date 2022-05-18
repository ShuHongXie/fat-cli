const fs = require("fs");
// 判断是否为文件
exports.existFile = function (path) {
  const file = fs.statSync(path);
  console.log(file);
  return file.isFile();
};
