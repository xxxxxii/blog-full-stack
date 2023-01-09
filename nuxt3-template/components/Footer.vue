<!--
 * @Author: yulinZ 1973329248@qq.com
 * @Date: 2022-11-01 10:49:48
 * @LastEditors: yulinZ 1973329248@qq.com
 * @LastEditTime: 2022-12-30 20:05:20
 * @FilePath: \vue3-element-admin - 副本\src\pages\webfarme\footer\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="footer"></div>

  <footer class="absolute footer bg-slate-50 dark:bg-slate-900">
    <div class="text-2xl">yl Blog {{ date.getFullYear() }}</div>
    <div class="flex justify-center text-sm ">
      <div style="width:300px;margin:0 auto; padding:20px 0; " class="flex justify-center">
        <img src="@/assets/beian.png" />
        <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=50010702504822"
          style="display:inline-block;text-decoration:none;height:20px;line-height:20px;"><img src=""
            style="float:left;" />

          <p style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px; color:#939393;">渝公网安备
            50010702504822号</p>
        </a>
      </div>


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
  bottom: 0;
  /* 4. 设置页脚position为absolute之后，再将其bottom值设为0，即可使其处于页面的底部 */
  width: 100%;
}
</style>
