/*
 * @Author: yulinZ 1973329248@qq.com
 * @Date: 2022-11-15 16:01:13
 * @LastEditors: yulinZ 1973329248@qq.com
 * @LastEditTime: 2022-12-06 22:19:32
 * @FilePath: \nuxt3-template\composables\useArticle.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { groupListDto } from "~~/types/public";

export const useArticle = () => useState("groupList", () => null);
