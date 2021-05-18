// 读取桩数据
// 导入路径模块
const path = require("path");
const fs = require("fs");

// 打桩文件路径
const fixtures = path.resolve("src", "fixtures") + "\\";
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
  readAsync: function (api) {
    const name = this.api2Pathname(api);
    var data = fs.readFileSync(fixtures + name);
    return data.toString();
  },
  api2Pathname: function (api) {
    const arr = api.split("/");
    // api最后一项为文件名称
    const arrLast = arr[arr.length - 1];
    const filename = arrLast;
    return filename;
  },
};
// const result = readFile.readAsync("/api/index/quote");

module.exports = readFile;
