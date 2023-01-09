<!--
 * @Author: yulinZ 1973329248@qq.com
 * @Date: 2022-11-01 10:49:48
 * @LastEditors: yulinZ 1973329248@qq.com
 * @LastEditTime: 2022-11-10 21:58:36
 * @FilePath: \vue3-element-admin - 副本\src\pages\webfarme\footer\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="footer"></div>
  <footer class="footer absolute bg-slate-50 dark:bg-slate-900">
    <div class="text-2xl">yl Blog {{ date.getFullYear() }}</div>
    <div class="text-sm">
      <a href="https://blogyl.top/">备案号: 渝ICP备2021012610号-1</a>
    </div>
  </footer>
</template>

<script setup lang="ts">
const date = new Date();
</script>

<style lang="scss" scoped>
.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 5em 0 0 0;
  padding: 3em 0 3em 0;

  // position: absolute;
  bottom: 0; /* 4. 设置页脚position为absolute之后，再将其bottom值设为0，即可使其处于页面的底部 */
  width: 100%;
}
</style>
