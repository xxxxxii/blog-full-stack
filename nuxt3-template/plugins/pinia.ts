/*
 * @Author: yulinZ 1973329248@qq.com
 * @Date: 2022-12-22 15:28:26
 * @LastEditors: yulinZ 1973329248@qq.com
 * @LastEditTime: 2022-12-22 15:56:37
 * @FilePath: \blog-full-stack\nuxt3-template\plugins\pinia-plugin-persistedstate.client.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { defineNuxtPlugin } from "#app";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.$pinia.use(piniaPluginPersistedstate);
});
