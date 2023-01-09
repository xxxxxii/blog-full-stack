/*
 * @Author: yulinZ 1973329248@qq.com
 * @Date: 2022-11-24 23:42:41
 * @LastEditors: yulinZ 1973329248@qq.com
 * @LastEditTime: 2022-12-29 22:11:40
 * @FilePath: \blog-full-stack\nuxt3-template\utils\utils.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export default function () {
  const dateToStr = computed(() => (oldDate: string) => {
    return new Date(oldDate).toLocaleString().split(" ")[0];
  });
  const dateToStr1 = computed(() => (oldDate: string) => {
    return (
      new Date(oldDate).toLocaleString().split(" ")[0] +
      " " +
      new Date(oldDate).toLocaleString().split(" ")[1]
    );
  });

  return {
    dateToStr,
    dateToStr1,
  };
}
