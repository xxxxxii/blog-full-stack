/*
 * @Author: yulinZ 1973329248@qq.com
 * @Date: 2022-11-14 00:50:50
 * @LastEditors: yulinZ 1973329248@qq.com
 * @LastEditTime: 2022-11-16 03:25:09
 * @FilePath: \nuxt3-template\plugins\element-plus.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineNuxtPlugin } from "#app";
import ElementPlus from "element-plus/dist/index.full";

// // import { ElMessage } from "element-plus";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(ElementPlus);
  // nuxtApp.vueApp.use(ElMessage)
});

// import * as ElementPlus from "element-plus/dist/index.full";
// import zhCn from "element-plus/es/locale/lang/zh-cn";

// export default defineNuxtPlugin((nuxtApp) => {
//   // if (process.client) {
//   nuxtApp.vueApp.use(ElementPlus, {
//     size: "small",
//     locale: zhCn,
//   });
//   // }
// });
