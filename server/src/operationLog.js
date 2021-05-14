// 导入操作数据库方法
const CURD = require("./mongo/CURD_DB");

// 操作日志记录
const OperationLog = {
  // 获取日志
  getOperationLog: function getLog(params) {
    const promise = CURD.findDB();
    promise
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  // 写日志
  writeOperationLog: function writeLog(time, api) {
    // console.log(time, api);
    var params = {
      time: time,
      api: api,
    };
    CURD.creatDB(params);
  },

  // 删日志
  deleteOperationLog: function deleteLog(time, api) {
    console.log(time, api);
  },
};

module.exports = OperationLog;
