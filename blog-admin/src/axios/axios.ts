/*
 * @Author: yulinZ 1973329248@qq.com
 * @Date: 2022-11-03 21:18:26
 * @LastEditors: yulinZ 1973329248@qq.com
 * @LastEditTime: 2022-12-08 23:49:28
 * @FilePath: \blog-full-stack\yl-blog\src\axios\axios.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 封装请求
import axios from "axios";
import router from "../router";
import pinia from "@/stores/store";
import { useUserStore } from "@/stores/useUser";

// 请求
const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 6000,
});
// 请求拦截
http.interceptors.request.use(
  (config) => {
    //请求头设置
    let token =
      JSON.parse(sessionStorage.getItem("user") as string)?.token || "";
    config.headers.Authorization = "Bearer " + token;
    return config;
  },
  (err) => {
    console.log(err);
  }
);
// 响应拦截
http.interceptors.response.use(
  (arr) => {
    console.log(arr);
    // 对响应码的处理
    switch (arr.data.code) {
      case 0:
        ElMessage({
          message: arr.data.msg,
          type: "error",
        });
        break;
      case 201:
        ElMessage({
          message: arr.data.meta.msg,
          type: "success",
        });
        break;
      case 204:
        ElMessage({
          message: arr.data.msg,
          type: "success",
        });
        break;
      case 400:
        ElMessage({
          message: arr.data.meta.msg,
          type: "warning",
        });
        break;
      case 401:
        ElMessage({
          message: arr.data.meta.msg,
          type: "warning",
        });
        break;
      case 403:
        ElMessage({
          message: arr.data.meta.msg,
          type: "warning",
        });
        break;
      case 404:
        ElMessage({
          message: arr.data.meta.msg,
          type: "warning",
        });
        break;
      case 422:
        ElMessage({
          message: arr.data.meta.msg,
          type: "warning",
        });
        break;
      case 500:
        ElMessage({
          message: arr.data.meta.msg,
          type: "error",
        });
        break;
    }
    return arr.data;
  },
  (err) => {
    console.log(err);
    const { status } = err.response;
    switch (status) {
      case 401:
        ElMessage({
          message: "TOKEN 已过期",
          type: "success",
        });

        ElMessageBox.confirm("您的访问权限已过期，是否重新登陆?", "Warning", {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "warning",
        })
          .then(() => {
            const userStore = useUserStore(pinia);
            userStore.clearToken();
            router.push("/login");
          })
          .catch(() => {
            ElMessage({
              type: "info",
              message: " 取消",
            });
          });
        break;
    }
    console.log(status);
  }
);
// 返出
export default http;
