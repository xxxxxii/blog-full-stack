/*
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-11-03 21:18:26
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-11-06 16:11:49
 * @FilePath: \项目\yl-blog\src\hooks\useTheme.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { useDark, useToggle } from "@vueuse/core";
import { ref } from "vue";

const isDark = ref(useDark());
const toggleDark = useToggle(isDark);

export default () => ({ isDark, toggleDark });

// import { getColorSchemeFromStroage } from "@/utils/web";
// import { useColorMode, useCycleList, usePreferredDark } from "@vueuse/core";

// const mode = useColorMode({
//   modes: {
//     sky: "sky"
//   }
// });

// const preferredDark = usePreferredDark();
// const color = getColorSchemeFromStroage();
// if (preferredDark.value && color === "auto") {
//   mode.value = "dark";
// }

// const { next, state } = useCycleList<any>(["light", "dark", "sky"], {
//   initialValue: mode
// });

// export function useTheme() {
//   return {
//     next,
//     state
//   };
// }
