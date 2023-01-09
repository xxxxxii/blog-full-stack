<!--
 * @Author: yulinZ 1973329248@qq.com
 * @Date: 2022-11-12 23:59:05
 * @LastEditors: yulinZ 1973329248@qq.com
 * @LastEditTime: 2022-12-06 22:18:16
 * @FilePath: \nuxt3-template\components\NavBg.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div
    class="w-full relative nav-bg duration-500 h-[60px]"
    :class="{
      'h-screen': active === '/',
      // 'h-[60px]': active.split('/')[1] === 'article',
    }"
  >
    <video
      v-if="active === '/'"
      class="absolute left-0 right-0 top-0 bottom-0 h-screen min-w-screen object-fill"
      autoplay
      loop
      muted=""
      preload
    >
      <source src="../assets/autumn20190924.mp4" />
    </video>
    <!-- :class="{ hidden: active === '/' && active.split('/')[1] != 'article' }" -->
    <div
      v-if="active === '/'"
      class="absolute flex flex-col left-0 right-0 top-0 bottom-0 flex justify-center items-center font-sans text-light-100"
    >
      <div class="absolute top-20">
        <ZSearch />
      </div>
      <div class="w-[300px] h-[380px] absolute top-30">
        <zRotalMent :menu="groupList" />
      </div>
      <div
        class="bg-text w-full h-full flex flex-col justify-center items-center"
      >
        <div>
          <h1 class="text-3xl">yl blog</h1>
        </div>
        <div>
          <h3>鱼跃此时海，花开彼岸天。</h3>
        </div>
      </div>
    </div>
    <LazyClientOnly>
      <!-- :class="{ hidden: active != '/' }" -->
      <div
        class="animate-bounce opacity-60 hover:opacity-100 duration-300 absolute left-0 right-0 bottom-5 text-center cursor-pointer"
      >
        <Icon
          size="32"
          color="#ffffff"
          @click="toSection"
          name="carbon:touch-1-down-filled"
        />
      </div>
    </LazyClientOnly>
    <div>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { groupListDto } from "~~/types/public";

const route = useRoute();

const groupList: any = useArticle();
console.log(groupList);

const active = ref(route.fullPath);
function toSection() {
  if (process.client) {
    const sectionDom = document.getElementById(
      "section"
    ) as HTMLInputElement | null;
    sectionDom?.scrollIntoView();
  }
}
</script>

<style scoped>
.nav-bg {
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  width: 100vw;
  animation: index-ani 1s;
  transition: all;
}
.bg-text > div h1,
h2,
h3 {
  color: var(--_bg-light);
}
</style>
