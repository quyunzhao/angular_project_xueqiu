const express = require("express");

const axios = require("axios");

const app = express();

const path = require("path");

// 监听端口
const port = 8080;

// 打桩文件路径
const fixtures = path.resolve("fixtures") + "\\";

const options = {
  // `headers` 是即将被发送的自定义请求头
  headers: {
    "user-agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36",
    origin: "https://xueqiu.com",
    referer: "https://xueqiu.com/",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-site",
    cookie:
      "xq_a_token=4b4d3f5b97e67b975f4e1518dc4c417ebf0ad4c4; xqat=4b4d3f5b97e67b975f4e1518dc4c417ebf0ad4c4; xq_r_token=960e1d453ab676f85fa80d2d41b80edebfde8cc0; xq_id_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1aWQiOi0xLCJpc3MiOiJ1YyIsImV4cCI6MTYyMjUxNTc5MiwiY3RtIjoxNjIwMjE5NzMzMzI0LCJjaWQiOiJkOWQwbjRBWnVwIn0.hVKTsEQRJ6GXlliby8uVsbTFLXJFzjMtL8mWu1g4cQOrj4oFMUWSo_CTole1W8GJuBcMUf63zg4vi4QAKMFXWSA0e9tQwvcMG1Ru9y2JHY09tiRaHPf6Wm5ZUOlmonVjpWSdVjDyTS9oHxJptVbg_7nzti5-BYKHuU5RDEy_Wj20UIAbPZo_JqwqL1QNsaPmCae8OCMPRXVqtx6saMWpK81QSPkAvbbbWFRnv8h2SRKqTjgegBUz62K7sqVZyXSDb2e9rdB6H6BgXVx4jjNJ-JKTX7omfPZw5F2tGHwDRygoAw_LfT6kEQz2x1AqIC3npGGrNMtj1TKG2J3QgniC6w; u=181620219737402; Hm_lvt_1db88642e346389874251b5a1eded6e3=1620219739; Hm_lpvt_1db88642e346389874251b5a1eded6e3=1620219739; device_id=24700f9f1986800ab4fcc880530dd0ed",
  },
};

app.get("/", (req, res) => {
  res.send("apiServer运行中...");
});

/* ---------- 获取本地数据---------- */
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

/* ----------------后台数据 --------*/
// 指数数据
app.get("/api/index/quote", (req, res) => {
  const httpUrl =
    "https://stock.xueqiu.com/v5/stock/batch/quote.json?symbol=SH000001,SZ399001,SZ399006,SH000688,HKHSI,HKHSCEI,HKHSCCI,.DJI,.IXIC,.INX";

  const promise = axios.get(httpUrl, options);
  promise
    .then((result) => {
      // console.log(result);
      res.json(result.data);
    })
    .catch((err) => {
      res.send(err);
    });
});

// 热股榜
app.get("/api/index/hotStock", async (req, res) => {
  /* 10 全球
   * 11 美股
   * 12 沪深
   * 13 港股
   **/

  const index = req.query.index || 12;
  const httpUrl = `https://stock.xueqiu.com/v5/stock/hot_stock/list.json?size=8&_type=${index}&type=${index}`;

  let result;
  try {
    result = await axios.get(httpUrl, options);
  } catch (error) {
    res.send(err);
  }
  res.json(result.data);
});

app.listen(port, () => {
  console.log("server start", "http://localhost:8080");
});
