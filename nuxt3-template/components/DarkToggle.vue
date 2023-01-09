<!--
 * @Author: yulinZ 1973329248@qq.com
 * @Date: 2022-11-12 02:41:00
 * @LastEditors: yulinZ 1973329248@qq.com
 * @LastEditTime: 2022-11-15 02:58:18
 * @FilePath: \nuxt3-template\components\DarkToggle.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup lang="ts">
const color = useColorMode();
console.log(color);
function toggleDark() {
  color.preference = color.value === "dark" ? "light" : "dark";
  console.log(color.preference);
}
</script>

<template>
  <div
    class="!outline-none stroke-current icon-btn text-[#1e90ff] hover:text-green-500 hover:rotate-90 duration-500"
    @click="toggleDark"
  >
    <Icon v-if="color.preference == 'dark'" name="carbon:sun" />
    <Icon v-else name="carbon:moon" />
  </div>
</template>
