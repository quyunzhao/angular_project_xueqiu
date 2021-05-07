const express = require("express");

const axios = require("axios");

const app = express();

const path = require("path");

// 监听端口
const port = 8080;

// 打桩文件路径
const fixtures = path.resolve("fixtures") + "\\";

app.get("/", (req, res) => {
  res.send("apiServer运行中...");
});

// 获取本地数据
app.get("/fixtures/quote", (req, res) => {
  // const httpUrl = fixtures + "quote.json";
  const httpUrl = "http://127.0.0.1:5500/server/fixtures/quote.json";
  console.log(httpUrl);

  const promise = axios.get(httpUrl, {});
  promise
    .then((result) => {
      // console.log(result);
      res.json(result.data);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.listen(port, () => {
  console.log("server start", "http://localhost:8080");
});
