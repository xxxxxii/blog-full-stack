/*
 * @Author: yulinZ 1973329248@qq.com
 * @Date: 2022-12-07 12:00:51
 * @LastEditors: yulinZ 1973329248@qq.com
 * @LastEditTime: 2022-12-25 21:52:27
 * @FilePath: \blog-full-stack\nuxt3-template\composables\useDialog.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { ElMessageBox } from "element-plus";

export default (msg: any, title: string, options: object) => {
  if (process.client) {
    let bodyDom = document.querySelector("body") as HTMLElement;
    // bodyDom.style.overflowY = "hidden";
    ElMessageBox.alert(msg, title, options);
    // ElMessageBox.close();
  }
};
