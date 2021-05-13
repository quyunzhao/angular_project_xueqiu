//创建数据库
var MongoClient = require("mongodb").MongoClient;

// 环境配置
const env = require("./config");

// 数据库名称
const dbName = "xueqiu";

var url = env.url + ":" + env.port + "/" + dbName;
console.log(url);

// 创建连接
MongoClient.connect(url, function (err, db) {
  if (err) throw err;
  console.log("数据库连接成功!");

  // 创建集合
  // var dbase = db.db(dbName);
  //
  // dbase.createCollection("api", function (err, res) {
  //   if (err) throw err;
  //   console.log("创建集合!");
  //   db.close();
  // });

  // 数据库操作( CURD )
  // 插入一条数据
  // var dbo = db.db(dbName);

  // var obj = { time: Date.now(), url: "/" };
  // dbo.collection("api").insertOne(obj, function (err, res) {
  //   if (err) throw err;
  //   console.log("文档插入成功");
  //   db.close();
  // });

  // 插入多条数据
  // var dbo = db.db(dbName);
  // var myobj = [
  //   { time: Date.now(), url: "/1" },
  //   { time: Date.now(), url: "/2" },
  //   { time: Date.now(), url: "/3" },
  // ];
  // dbo.collection("api").insertMany(myobj, function (err, res) {
  //   if (err) throw err;
  //   console.log("插入的文档数量为: " + res.insertedCount);
  //   db.close();
  // });

  // 查询数据
  // var dbo = db.db(dbName);
  // dbo
  //   .collection("api")
  //   .find({})
  //   .toArray(function (err, result) {
  //     // 返回集合中所有数据
  //     if (err) throw err;
  //     console.log(result);
  //     db.close();
  //   });

  // 查询指定条件的数据
  // var dbo = db.db(dbName);
  // var whereStr = { url: "/b" }; // 查询条件
  // dbo
  //   .collection("api")
  //   .find(whereStr)
  //   .toArray(function (err, result) {
  //     if (err) throw err;
  //     console.log(result);
  //     db.close();
  //   });

  // 更新一条数据
  // var dbo = db.db(dbName);
  // var whereStr = { url: "/" }; // 查询条件
  // var updateStr = { $set: { url: "/modify" } };
  // dbo.collection("api").updateOne(whereStr, updateStr, function (err, res) {
  //   if (err) throw err;
  //   console.log("文档修改成功");
  //   db.close();
  // });

  // 更新多条数据 updateMany()
  // var dbo = db.db(dbName);
  // var whereStr = { type: "1" }; // 查询条件
  // var updateStr = { $set: { type: "01" } };
  // dbo.collection("api").updateMany(whereStr, updateStr, function (err, res) {
  //   if (err) throw err;
  //   console.log(res.result.nModified + " 条文档被更新");
  //   db.close();
  // });

  // 删除数据
  var dbo = db.db(dbName);
  var whereStr = { url: "/" }; // 查询条件
  dbo.collection("api").deleteOne(whereStr, function (err, obj) {
    if (err) throw err;
    console.log("文档删除成功");
    db.close();
  });
});
