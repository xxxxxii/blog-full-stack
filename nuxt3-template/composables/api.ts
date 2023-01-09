/*
 * @Author: yulinZ 1973329248@qq.com
 * @Date: 2022-11-13 12:30:01
 * @LastEditors: yulinZ 1973329248@qq.com
 * @LastEditTime: 2022-12-27 21:47:47
 * @FilePath: \blog_web\composables\api.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import axios from "axios";
import request from "@/utils/http/axios";
import qs from "qs";
// axios.defaults.withCredentials = true;

export function getBaseUrl() {
  const userConfig = useRuntimeConfig();
  const {
    VITE_API_HOST,
    VITE_API_PREFFIX,
    VITE_PACK_ENV,
    VITE_PACK_URL,
    VITE_USER_ID,
  } = userConfig.public;
  console.log(userConfig);
  return VITE_PACK_URL;
}

export function loginApi(data: any) {
  return request({
    url: "/user/login",
    method: "post",
    data: data,
  });
}

export function comment(data: any) {
  return request({
    url: "/comments",
    method: "post",
    data: data,
  });
}

export async function articleComments(data: any) {
  return request({
    url: `/comments/` + data.id,
    method: "get",
  });
  return axios.get(`${getBaseUrl()}/comments/${data.id}`);
}

export function getArticle(data: any) {
  return axios.get(`${getBaseUrl()}/article`, { params: data });
}

export function getArticleDetail(data: any) {
  return request({
    url: "/article/" + data.id,
    method: "get",
  });
  return axios.get(`${getBaseUrl()}/article/${data.id}`);
}

export function getHotArticleList() {
  return axios.get(`${getBaseUrl()}/article`, {
    params: {
      type: "hot",
    },
  });
}

export function getLabelList() {
  return axios.get(`${getBaseUrl()}/label`);
}

export async function getGroupList() {
  return axios.get(`${getBaseUrl()}/group`);
}

export async function getUserInfo(data: any) {
  return axios.get(`${getBaseUrl()}/user/` + data.id);
}

export async function getPlugins(data: any) {
  return axios.get(`${getBaseUrl()}/article/plugins?userId=` + data.id);
}

export async function articleByLabelId(data: any) {
  return axios.get(
    `${getBaseUrl()}/article/articleByLabelId?${qs.stringify(data)}`
  );
}

export async function articleByGroupId(data: any) {
  return axios.get(
    `${getBaseUrl()}/article/articleByGroupId?${qs.stringify(data)}`
  );
}
