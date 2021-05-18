// 读取桩数据
// 导入路径模块
const path = require("path");
const fs = require("fs");

// 打桩文件路径
const fixtures = path.resolve("fixtures") + "\\";
const readFile = {
  // 异步
  read: function (filename = "test.json") {
    // 异步读取
    fs.readFile(fixtures + filename, function (err, data) {
      if (err) {
        return console.error(err);
      }
      return data;
    });
  },
  // 同步
  readAsync: function (filename = "test.json") {
    var data = fs.readFileSync(fixtures + filename);
    return data.toString();
  },
};
// var result = readFile.readAsync();

module.exports = readFile;
