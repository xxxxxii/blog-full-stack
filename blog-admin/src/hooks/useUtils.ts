/*
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-11-05 02:27:21
 * @LastEditors: yulinZ 1973329248@qq.com
 * @LastEditTime: 2022-12-08 23:11:44
 * @FilePath: \项目\yl-blog\src\hooks\useUtils.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export default function () {
  const dateToStr = (oldDate: string) => {
    console.log(oldDate);
    return new Date(oldDate).toLocaleString().split(" ")[0];
  };
  return {
    dateToStr,
  };
}
