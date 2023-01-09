/*
 * @Author: yulinZ 1973329248@qq.com
 * @Date: 2022-11-13 01:57:39
 * @LastEditors: yulinZ 1973329248@qq.com
 * @LastEditTime: 2022-11-13 02:14:11
 * @FilePath: \nuxt3-template\composables\useTheme.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { useState } from "#app";

import { useDark, useToggle } from "@vueuse/core";
import { ref } from "vue";

const isDark = ref(useDark());
const toggleDark = useToggle(isDark);

export default () => ({ isDark, toggleDark });
