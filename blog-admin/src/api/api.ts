/*
 * @Author: yulinZ 1973329248@qq.com
 * @Date: 2022-09-11 17:47:25
 * @LastEditors: yulinZ 1973329248@qq.com
 * @LastEditTime: 2022-11-29 02:32:40
 * @FilePath: \vue3vite\src\api\api.ts
 * @Description:
 *
 * Copyright (c) 2022 by yulinZ 1973329248@qq.com, All Rights Reserved.
 */
import request from "../axios/http";

const api_list = {
  login: "/user/login",
  articleList: "/article",
  labelList: "/label",
  addArticle: "/v1/addArticle",
  editArticle: "/v1/editArticle",
  articleData: "/v1/articleById",
  userInfo: "/user",
  group: "/group",
  code: "/user/code",
};

export const login = (data: object) => {
  return request({ url: api_list.login, method: "post", data });
};

export const article = ({ method = "get" }, data: any) => {
  let p_data = null;
  let p_url = api_list.articleList;
  if (method == "put" || method == "delete" || method == "patch") {
    p_url += data.id;
  }
  if (method == "get") {
    p_data = { params: data };
  }
  if (method == "get" || method == "patch") {
    p_data = { data };
  }
  return request({ url: p_url, method: method, ...p_data });
};

export const group = ({ method = "get" }, data: any) => {
  let p_data = null;
  let p_url = api_list.group;
  if (method == "put" || method == "delete" || method == "patch") {
    p_url += data.id;
  }
  if (method == "get") {
    p_data = { params: data };
  }
  if (method == "get" || method == "patch") {
    p_data = { data };
  }
  return request({ url: p_url, method: method, ...p_data });
};

export const articleList = (data: object) => {
  return request({ url: api_list.articleList, method: "get", params: data });
};

export const labelList = (data: object) => {
  return request({ url: api_list.labelList, method: "get", params: data });
};

export const addArticle = (data: object) => {
  return request({ url: api_list.articleList, method: "post", data });
};

export const articleData = (data: object) => {
  return request({
    url: api_list.articleList + "/" + data.id,
    method: "get",
    params: data,
  });
};

export const userInfo = (data: object) => {
  return request({
    url: api_list.userInfo + "/" + data.id,
    method: "get",
    params: data,
  });
};
export const editArticle = (data: object) => {
  return request({
    url: api_list.articleList + "/" + data.id,
    method: "patch",
    data,
  });
};

export const getCode = () => {
  return request({
    url: api_list.code,
    method: "get",
  });
};
