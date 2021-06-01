const express = require("express");

const axios = require("axios");

const app = express();

// 导入操作日志模块
const OperationLog = require("./src/operationLog");

// 读取本地数据
const readFile = require("./src/readFixtures");

// 导入路径模块
const path = require("path");

// 监听端口
const port = 8080;

// axios 全局配置
// axios全局设置网络超时
axios.defaults.timeout = 30 * 1000; // 30s
axios.defaults.headers.common["quyunzhao"] = "nice";

// 添加中间间
// 添加请求头
app.use((req, res, next) => {
  res.append("Access-Control-Allow-Origin", "*");
  res.append("Access-Control-Allow-Content-Type", "*");
  next();
});

// 判断接口是否请求成功
// 成功用原数据
// 失败采用本地数据
function readJson(req) {
  axios.interceptors.response.use(
    (response) => {
      // console.log("成功", response.status);
      // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
      // 否则的话抛出错误
      if (response.status === 200) {
        return Promise.resolve(response);
      } else {
        return Promise.reject(response);
      }
    },
    (error) => {
      const reqURL = req.url;
      var result = readFile.readAsync(reqURL);
      return Promise.reject(result);
    }
  );
}
// 调用本地数据
app.use((req, res, next) => {
  readJson(req);
  next();
});

// 记录操作日志
app.use((req, res, next) => {
  const options = {
    url: req.url,
    documentName: "api",
    params: {
      data: { text: req.url, api: req.url, time: Date.now() },
    },
  };
  // 写日志
  OperationLog.writeOperationLog(options);
  next();
});

let cookie =
  "device_id=24700f9f1986800ab4fcc880530dd0ed; s=e011hbwphk; Hm_lvt_1db88642e346389874251b5a1eded6e3=1620219739,1621337955,1621944496,1622200026; xq_a_token=ac3c2b00373aafa819dd63230fff55140e7d0bb4; xqat=ac3c2b00373aafa819dd63230fff55140e7d0bb4; xq_r_token=c73c6ef7939ae99173067d99572528058c22bed7; xq_id_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1aWQiOi0xLCJpc3MiOiJ1YyIsImV4cCI6MTYyNTEwNzgwNiwiY3RtIjoxNjIyNTQ2Nzc5OTYxLCJjaWQiOiJkOWQwbjRBWnVwIn0.f_VU2BgmdaFdLCvFsNlCG1sPy2jbyXLZS1aWFNuJl56Y8VBApvSDAgjE05ban3dGfAgcvBZrqEsBvpOroOBBkR9hnWRzpW4enrz6fSmQcnTYSjmKAuUHm5UazC2BNAn5OoBe6s6ojuf2yHrmJyT4Cow2x5HZWOWOY3Y_SOq0gExjMHQJtdq5hY6gXq8NxycBso37ZlyqJmXnMoM2akwkAILIBAeEBItBoD_dvYASYz-u_ZhuU4EBI7-ZNNw-bUT1U2p9GApReP5mw-Olsr0ASA-u7CU6iDryg0G73rghsWevtjPcLItkWrDDre87Zqj7xPhJOQePdCYsrvtgOcsK9Q; u=731622546789103; acw_tc=2760820616225485901077213e4abca1039990aa67e69af9ea2e2c34396570; Hm_lpvt_1db88642e346389874251b5a1eded6e3=1622549944";

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
    cookie: cookie,
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
      res.json(result.data);
    })
    .catch((err) => {
      res.json(err);
    });
});

/* ----------------后台数据 --------*/
function getCookie() {
  axios.interceptors.response.use(
    (res) => {
      const { config, data, headers, status } = res;

      // console.log(
      //   `-----------------------${config.url}请求开始------------------------`
      // );
      // console.log(`接口地址：`, config.url);
      // console.log(`接口请求方式：`, config.method);
      // console.log(
      //   `接口请求参数：`,
      //   config.method === "get" ? config.params : config.data
      // );
      // console.log(`接口请求头：`, config.headers);
      // console.log(`接口响应头：`, headers);
      // console.log(`接口响应状态：`, status);
      // console.log(`接口响应数据：`, data);

      cookie = headers["set-cookie"].toString();
      // console.log(cookie);
      // console.log(
      //   `-----------------------${config.url}请求结束------------------------`
      // );
      return res;
    },
    (err) => {
      return Promise.reject(err);
    }
  );
}

// 指数数据
app.get("/api/index/quote", (req, res) => {
  const httpUrl = "https://stock.xueqiu.com/v5/stock/batch/quote.json";

  const promise = axios.get(httpUrl, {
    ...options,
    params: {
      symbol:
        "SH000001,SZ399001,SZ399006,SH000688,HKHSI,HKHSCEI,HKHSCCI,.DJI,.IXIC,.INX",
    },
  });
  promise
    .then((result) => {
      res.json(result.data);
    })
    .catch((err) => {
      res.send(err);
    });
});

// 雪球热帖
app.get("/api/index/hotList", (req, res) => {
  const httpUrl = "https://xueqiu.com/statuses/hot/listV2.json";

  const promise = axios.get(httpUrl, {
    ...options,
    params: {
      since_id: -1,
      max_id: -1,
      size: 15,
    },
  });
  promise
    .then((result) => {
      res.json(result.data);
    })
    .catch((err) => {
      res.send(err);
    });
});

// 7*24
app.get("/api/index/news", (req, res) => {
  const httpUrl = "https://xueqiu.com/statuses/livenews/list.json";

  const promise = axios.get(httpUrl, {
    ...options,
    params: {
      since_id: -1,
      max_id: -1,
      count: 15,
    },
  });
  promise
    .then((result) => {
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
  const httpUrl = `https://stock.xueqiu.com/v5/stock/hot_stock/list.json`;

  let result;
  try {
    result = await axios.get(httpUrl, {
      ...options,
      params: {
        size: 8,
        _type: index,
        type: index,
      },
    });
  } catch (error) {
    res.send(err);
  }
  res.json(result.data);
});

// 股票筛选的数据
app.get("/api/screener/Tools", async (req, res) => {
  // 获取首页
  const httpUrl = `https://xueqiu.com/hq/screener`;

  let result;
  let content;
  try {
    result = await axios.get(httpUrl, options);
    // 设置正则
    let reg = /SNB.data.condition =(.*?);/gis;
    // 匹配内容
    // const content = result.data.match(reg);
    content = reg.exec(result.data)[1];
    res.send(content);
  } catch (error) {
    res.send(error);
  }
});

// 本周新增
app.get("/api/screener/stocks", (req, res) => {
  const httpUrl = "https://xueqiu.com/service/screener/screen";

  const orderBy = req.query.order_by || "follow7d";
  const order = req.query.order || "desc";
  const time = new Date().getTime;
  // follow （关注人数）   最热门
  // follow7d (关注人数)   本周新增
  // tweet （讨论条数）     最热门
  // tweet7d （讨论条数）  本周新增
  // deal 分享交易         最热门
  // deal7d 分享交易      本周新增

  const promise = axios.get(httpUrl, {
    ...options,
    params: {
      category: "CN",
      size: 10,
      order: order,
      order_by: orderBy,
      only_count: 0,
      page: 1,
      _: time,
    },
  });
  promise
    .then((result) => {
      res.json(result.data);
    })
    .catch((err) => {
      res.send(err);
    });
});

// 获取行业信息
app.get("/api/screener/industries", async (req, res) => {
  // 获取首页
  const httpUrl = `https://xueqiu.com/service/screener/industries`;
  const time = new Date().getTime;

  const promise = axios.get(httpUrl, {
    ...options,
    params: {
      category: "CN",
      _: time,
    },
  });
  promise
    .then((result) => {
      res.json(result.data);
    })
    .catch((err) => {
      res.send(err);
    });
});

// 获取区域信息
app.get("/api/screener/area", async (req, res) => {
  // 获取首页
  const httpUrl = `https://xueqiu.com/service/screener/areas`;
  const time = new Date().getTime;

  const promise = axios.get(httpUrl, {
    ...options,
    params: {
      _: time,
    },
  });
  promise
    .then((result) => {
      res.json(result.data);
    })
    .catch((err) => {
      res.send(err);
    });
});

// 获取最大最小值
app.get("/api/screener/fieldRange", async (req, res) => {
  // 获取首页
  const httpUrl = `https://xueqiu.com/service/screener/values`;
  const time = new Date().getTime;
  const date = "20210331";
  const field = req.query.field || "npana";

  const promise = axios.get(httpUrl, {
    ...options,
    params: {
      _: time,
      category: "CN",
      field: field + "." + date,
    },
  });
  promise
    .then((result) => {
      res.json(result.data);
    })
    .catch((err) => {
      res.send(err);
    });
});

// 筛选股票
app.get("/api/screener/sxStock", async (req, res) => {
  const httpUrl = "https://xueqiu.com/service/screener/screen";
  const params = req.query;
  const promise = axios.get(httpUrl, {
    ...options,
    params: params,
  });
  promise
    .then((result) => {
      res.json(result.data);
    })
    .catch((err) => {
      res.send(err);
    });
});

// 获取数据库日志
app.get("/api/loginCenter/logList", async (req, res) => {
  const params = req.query;
  const promise = OperationLog.getOperationLog(params);
  promise
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.send(err);
    });
});

// 向数据库写数据
app.get("/api/database/creat", async (req, res) => {
  // const params = req.query;
  const options = {
    url: req.url,
    documentName: "advert",
    params: {
      data: { text: "这是一段测试文字", api: req.url, time: Date.now() },
    },
  };
  OperationLog.writeOperationLog(options);
  res.send("ok");
});

// 测试默认请求参数
app.get("/api/test/1", async (req, res) => {
  const httpUrl = "https://xueqiu.com/service/screener/screen";
  const promise = axios.get(httpUrl);
  promise
    .then((result) => {
      res.json(result.data);
    })
    .catch((err) => {
      res.send(err);
    });
});

// 监听端口
app.listen(port, () => {
  console.log("server start", "http://localhost:8080");
});
