// 读取桩数据
// 导入路径模块
const path = require("path");
const fs = require("fs");

// 打桩文件路径
// const fixtures = path.resolve("src", "fixtures") + "/";
const fixtures = path.join(__dirname, "fixtures/");
const readFile = {
  // 异步
  read: function (filename = "test.json") {
    // 异步读取
    fs.readFile(fixtures + filename, function (err, data) {
      if (err) {
        return err;
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
    let arrLast = arr[arr.length - 1];
    var reg1 = /.json$/;

    arrLast = arrLast.replace(reg1, "");

    // 去除？后面的参数
    var reg2 = /\?.*/;
    arrLast = arrLast.replace(reg2, "");

    // console.log(arrLast);

    const filename = arrLast + ".json";
    return filename;
  },
};
readFile.api2Pathname("/api/screener/stocks");

module.exports = readFile;
