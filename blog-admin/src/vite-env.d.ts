/*
 * @Author: yulinZ 1973329248@qq.com
 * @Date: 2022-11-24 16:27:18
 * @LastEditors: yulinZ 1973329248@qq.com
 * @LastEditTime: 2022-12-08 23:41:37
 * @FilePath: \blog-full-stack\blog-admin\src\vite-env.d.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/// <reference types="vite/client" />

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module "*.ts";
