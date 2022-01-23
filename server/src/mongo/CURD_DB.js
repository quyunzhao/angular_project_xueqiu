const MongoClient = require("mongodb").MongoClient;

// 环境配置
const env = require("./config");

// 数据库名称
const dbName = env.dbName;

// 集合名称
const documentName = "api";

const url = env.url + ":" + env.port + "/" + dbName;

const CURD_DB = {
  creatDB: async function (options) {
    let conn = null;
    const document_name = options.documentName || documentName;
    const time = Date.now();
    const data =
      {
        ...options.params,
        time: time,
      } || {};
    try {
      conn = await MongoClient.connect(url);
      const test = conn.db(dbName).collection(document_name);
      // 增加
      await test.insertOne(data);
    } catch (error) {
      console.log("错误：" + error);
    } finally {
      if (conn != null) conn.close();
    }
  },
  findDB: async function (params) {
    const skip = parseInt(params.skip);
    const limit = parseInt(params.limit);
    const sort = params.sort || { time: -1 };
    const document_name = params.documentName || documentName;
    let conn = null;
    try {
      conn = await MongoClient.connect(url);
      const test = conn.db(dbName).collection(document_name);
      // 查询
      var arr = await test.find().sort(sort).skip(skip).limit(limit).toArray();
      return arr;
    } catch (error) {
      console.log("错误：" + error);
    } finally {
      if (conn != null) conn.close();
    }
  },
  deleteDB: async function (params) {
    let conn = null;
    const document_name = params.documentName || documentName;

    try {
      conn = await MongoClient.connect(url);
      const test = conn.db(dbName).collection(document_name);
      // 查询
      const arr = await test.deleteMany({ time: params.time });
      return arr;
    } catch (error) {
      console.log("错误：" + error);
    } finally {
      console.log("结束");
      if (conn != null) conn.close();
    }
  },
};

// dataOperate();
module.exports = CURD_DB;
