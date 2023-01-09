/*
 * @Author: yulinZ 1973329248@qq.com
 * @Date: 2022-10-18 20:22:19
 * @LastEditors: yulinZ 1973329248@qq.com
 * @LastEditTime: 2022-12-25 22:18:01
 * @FilePath: \vue3-element-admin\src\stores\useUser.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineStore } from "pinia";
import { ElMessage, ElMessageBox } from "element-plus";

import { loginApi } from "@/composables/api";
export const useUserStore = defineStore("user", {
  state: () => {
    return {
      token: null,
      users: null,
    };
  },
  getters: {
    getToken(): string {
      return this.token;
    },
  },
  actions: {
    // user login
    login(userInfo: {
      role: never;
      avatar: any;
      username: string;
      password: string;
      code: string;
    }) {
      const { username, password, code } = userInfo;
      return new Promise<void>((resolve, reject) => {
        loginApi({ username: username.trim(), password: password, code })
          .then((response: any) => {
            if (response.code === 0) {
              ElMessage.error(response.msg);
              return;
            }
            ElMessage.success(response.msg);
            const resData = response.data;
            console.log(resData);
            this.token = resData.token;
            this.users = resData.userInfo;
            ElMessageBox.close();
            resolve();
          })
          .catch((error: any) => {
            reject(error);
          });
      });
    },

    clearToken() {
      this.token = null;
    },
  },

  persist: process.client && {
    storage: localStorage,
    paths: ["users", "token"],
  },
});
