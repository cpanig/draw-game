// 封装axios
import axios from "axios";

// 本地调试,代理使用
// const baseUrl = process.env.VUE_APP_API_URL_WEB;
const baseUrl = "/api";

// get请求
export function get(config) {
  const getData = axios.create({
    baseURL: baseUrl,
    // timeout:1000,
    header: {
      "Content-Type": "application/json",
    },
    method: "get",
  });

  getData.interceptors.response.use(
    (res) => {
      let data = res.data;
      return data;
      // if (typeof res.data !== 'string') return JSON.stringify(data);
      // else {
      //   Message.info({
      //     message: '您暂无该模块权限'
      //   })
      //   return Promise.reject();
      // }
    },
    (err) => {
      console.log(err);
    }
  );

  return getData(config);
}

// post请求
export function post(config) {
  const postData = axios.create({
    baseURL: baseUrl,
    method: "post",
    // timeout: 3000,
    header: {
      "Content-Type": "application/json",
    },
  });

  postData.interceptors.response.use(
    ({ data: res }) => {
      return res;
    },
    (err) => {
      console.log(err);
    }
  );
  return postData(config);
}
