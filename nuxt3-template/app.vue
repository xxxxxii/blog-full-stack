<!--
 * @Author: yulinZ 1973329248@qq.com
 * @Date: 2022-11-12 02:38:49
 * @LastEditors: yulinZ 1973329248@qq.com
 * @LastEditTime: 2023-01-10 01:03:07
 * @FilePath: \nuxt3-template\app.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <NuxtLayout :name="layout">
    <div class="w-full h-full">
      <NuxtPage />
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ElLoading } from "element-plus";
const layout = "default";

useHead({
  title: "yl blog",
  meta: [
    {
      name: "referrer",
      content: "no-referrer",
    },
    {
      name: "viewport",
      content:
        "initial-scale=1,maximum-scale=1, minimum-scale=1, user-scalable=no",
    },
    {
      hid: "description",
      name: "description",
      content:
        "yl blog博客,主要用于记录日常想法，问题解决,日志,记录记录文章的一个nuxt网站",
    },
    {
      hid: "keywords",
      content: "yl blog博客,nuxt网站,nuxt3网站,vue网站,个人网站,yl blog网站",
    },
  ],
  bodyAttrs: {
    class: "",
  },
});

if (process.client) {
  const loading = ElLoading.service({
    lock: true,
    text: "Loading",
    background: "rgba(0, 0, 0, 0.7)",
  });

  nextTick(() => {
    loading.close();
  });
}
</script>

<style>
html.dark,
body.dark {
  background: rgb(50, 50, 50) !important;
  color: white;
}

#loader {
  border: 12px solid #f3f3f3;
  border-radius: 50%;
  border-top: 12px solid #1066fb;
  width: 70px;
  height: 70px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}

.center {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}
</style>
