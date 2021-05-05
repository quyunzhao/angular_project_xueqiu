const express = require("express");

const axios = require("axios");

const app = express();

// 监听端口
const port = 8080;

app.get("/", (req, res) => {
  res.send("apiServer");
});

app.get("/api/index", (req, res) => {
  res.json("apiServer");
});

app.listen(port, () => {
  console.log("server start", "http://localhost:8080");
});
