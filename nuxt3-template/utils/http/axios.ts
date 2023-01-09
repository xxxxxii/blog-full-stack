/*
 * @Author: yulinZ 1973329248@qq.com
 * @Date: 2022-12-22 20:51:03
 * @LastEditors: yulinZ 1973329248@qq.com
 * @LastEditTime: 2022-12-28 23:36:22
 * @FilePath: \blog-full-stack\nuxt3-template\utils\http\axios.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { useUserStore } from "@/store/modules/user";

const request = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "http://139.159.200.153:4000"
      : "http://localhost:4000",
  timeout: 30000,
  withCredentials: true,
});

// 请求拦截
request.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = useUserStore().getToken;
    const con: any = config || {};
    if (token) {
      con.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

// 响应拦截
request.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

export default request;
