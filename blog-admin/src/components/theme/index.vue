<!--
 * @Author: yulinZ 1973329248@qq.com
 * @Date: 2022-10-27 21:46:29
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-11-06 16:10:14
 * @FilePath: \vue3-element-admin - 副本\src\components\theme\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup lang="ts">
import useTheme from "@/hooks/useTheme";
const { isDark, toggleDark } = useTheme();
</script>

<template>
  <div style="font-size: 1.3em" @click="() => toggleDark()">
    <abbr title="主题切换">
      <i-mdi-white-balance-sunny v-show="!isDark" class="dark-mode" />
      <i-mdi-weather-night v-show="isDark" class="dark-mode" />
    </abbr>
  </div>
</template>

<style scoped>
.dark-mode {
  @apply cursor-pointer mx-2 hover:rotate-90 duration-500;
}
</style>
