const MongoClient = require("mongodb").MongoClient;

// 环境配置
const env = require("./config");

// 数据库名称
const dbName = env.dbName;

// 集合名称
const documentName = "api";

const url = env.url + ":" + env.port + "/" + dbName;

async function dataOperate() {
  let conn = null;
  try {
    conn = await MongoClient.connect(url);
    console.log("数据库已连接");
    const test = conn.db(dbName).collection(documentName);
    // 增加
    await test.insertOne({ site: "runoob.com" });
    // 查询
    var arr = await test.find().toArray();
    console.log(arr);
    // 更改
    await test.updateMany(
      { site: "runoob.com" },
      { $set: { site: "example.com" } }
    );
    // 查询
    arr = await test.find().toArray();
    console.log(arr);
    // 删除
    await test.deleteMany({ site: "example.com" });
    // 查询
    arr = await test.find().toArray();
    console.log(arr);
  } catch (err) {
    console.log("错误：" + err.message);
  } finally {
    if (conn != null) conn.close();
  }
}
const CURD_DB = {
  creatDB: async function (options) {
    let conn = null;
    const document_name = options.documentName || documentName;
    const data = options.params.data || {};
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
    let conn = null;
    try {
      conn = await MongoClient.connect(url);
      const test = conn.db(dbName).collection(documentName);
      // 查询
      var arr = await test.find().sort(sort).skip(skip).limit(limit).toArray();
      return arr;
    } catch (error) {
      console.log("错误：" + error);
    } finally {
      if (conn != null) conn.close();
    }
  },
};

// dataOperate();
module.exports = CURD_DB;
