/*
 * @Author: yulinZ 1973329248@qq.com
 * @Date: 2022-11-19 01:05:47
 * @LastEditors: yulinZ 1973329248@qq.com
 * @LastEditTime: 2022-11-19 01:06:47
 * @FilePath: \nuxt3-template\middleware\defaule.global.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export default defineNuxtRouteMiddleware((to, from) => {
  console.log(to, from);
});
