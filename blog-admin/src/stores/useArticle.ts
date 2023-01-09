/*
 * @Author: yulinZ 1973329248@qq.com
 * @Date: 2022-11-10 21:13:07
 * @LastEditors: yulinZ 1973329248@qq.com
 * @LastEditTime: 2022-11-10 21:41:43
 * @FilePath: \blog-full-stack\yl-blog\src\stores\useArticle.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineStore } from "pinia";

import { login } from "@/api/api";
export const useArticleStore = defineStore("article", {
  state() {
    return {
      article: {},
    };
  },

  getters: {
    getArticle(): object {
      return this.article;
    },
  },
  actions: {
    setArticle(article: object) {
      this.article = article;
      console.log(this.article, "222222222");
    },
  },
});
