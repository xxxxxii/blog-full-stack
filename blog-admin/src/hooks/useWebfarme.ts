/*
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-11-05 00:17:45
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-11-05 02:28:57
 * @FilePath: \项目\yl-blog\src\hooks\useWebfarme.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

export default {
  // 页面滚动到指定id处
  scrollById(el: string) {
    document.getElementById(el).scrollIntoView();
  },
};
