/**
 *
 */
const getIp = function (req) {
  const ipStr = req.headers["x-forwarded-for"]; // F5

  if (ipStr) {
    const ipArray = ipStr.split(",");
    if (ipArray.length > 1) {
      // 如果获取到的为ip数组（用手机访问时，如果机房双线，可能获取到的为数组
      for (let i = 0; i < ipArray.length; i++) {
        const ipNumArray = ipArray[i].split(".");
        const tmp = ipNumArray[0] + "." + ipNumArray[1];
        if (
          tmp == "192.168" ||
          (ipNumArray[0] == "172" &&
            ipNumArray[1] >= 16 &&
            ipNumArray[1] <= 32) ||
          ipNumArray[0] == "10"
        ) {
          //排除特殊区间ip
          continue;
        }
        return ipArray[i];
      }
    }
    return ipArray[0];
  } else {
    // F5获取不到时
    // console.log(req.ip);
    return req.ip.substring(req.ip.lastIndexOf(":") + 1);
  }
};

exports.getIp = getIp;
