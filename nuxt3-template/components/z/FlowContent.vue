<!--
 * @Author: yulinZ 1973329248@qq.com
 * @Date: 2022-11-28 20:27:50
 * @LastEditors: yulinZ 1973329248@qq.com
 * @LastEditTime: 2022-11-28 21:01:47
 * @FilePath: \blog-full-stack\nuxt3-template\components\z\FlowContent.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div id="flow-content"></div>
</template>

<script setup>
import { random } from "lodash";

if (process.client) {
  const content = document.querySelector("#flow-content");
  const createImg = () => {
    Array(10)
      .fill(null)
      .map((v, i) => {
        const html = `<div>
                <img src="https://cdn.staticaly.com/gh/xxxxxii/blogcdn/main/img/a03cf7dd-a70b-41da-8038-78c5bcec8118.png" />
                <div>2132453253253</div>
                </div>`;

        content?.insertAdjacentHTML("afterbegin", html);
      });
  };
  createImg();
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}
#flow-content {
  width: 100%;
  column-count: 3;
}
#flow-content > div {
  display: flex;
  flex-direction: column;
  margin-bottom: 0.5rem;
}
#flow-content > div > img {
  width: 100%;
  display: block;
  margin-bottom: 0.5rem;
}
#flow-content > div > span {
  display: block;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
</style>
