/*
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-10-15 18:48:02
 * @LastEditors: yulinZ 1973329248@qq.com
 * @LastEditTime: 2022-11-09 16:26:54
 * @FilePath: \vue3vite\src\api\menus\menu.ts
 * @Description:
 *
 * Copyright (c) 2022 by error: git config user.name && git config user.email & please set dead value or install git, All Rights Reserved.
 */

import request from "@/axios/http";

const api_list = {
  user_menu: "/menus",
};

export const userMenu = (data: object) => {
  return request({ url: api_list.user_menu, method: "get", data });
};
