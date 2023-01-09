<!--
 * @Author: yulinZ 1973329248@qq.com
 * @Date: 2022-10-27 12:40:59
 * @LastEditors: yulinZ 1973329248@qq.com
 * @LastEditTime: 2022-11-17 03:43:27
 * @FilePath: \vue3-element-admin - 副本\src\pages\webfarme\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="min-h-screen relative">
    <header
      class="relative duration-500"
      :class="{ index: active === '/index', other: active != '/index' }"
      :style="{
        backgroundImage:
          'url(' +
          (active != '/index'
            ? article.img
            : 'https://s1.vika.cn/space/2022/11/04/7bc0b1372dcf4995864095edbbdd42e1') +
          ')',
      }"
    >
      <el-affix position="top" v-show="!downScroll">
        <NavBar :class="{ 'nav-bg': !top }" />
      </el-affix>
      <div
        v-if="active === '/index'"
        class="absolute left-0 right-0 top-96 text-center font-bold text-5xl text-white"
      >
        <!-- {{ isBgShow }} -->
        <div>yulinZ blog</div>
        <!-- <div>{{ downScroll }}-{{ toTop }}-{{ top }}-{{ isScrolling }}</div> -->
        <div ref="content" class="text-3xl"></div>
      </div>
      <div
        v-else
        class="absolute left-0 right-0 top-52 text-center font-bold text-5xl text-white"
      >
        <h4 class="text-xl">{{ article.title }}</h4>
        <p class="text-sm">{{ article.bf }}</p>
        <p class="text-xs">作者：{{ article?.user?.username }}</p>
        <p class="text-xs">发布时间：{{ dateToStr(article?.updateAt) }}</p>
      </div>

      <div
        class="absolute bottom-5 left-0 right-0 flex justify-center align-middle"
      >
        <i-ep-arrow-down-bold
          class="down-icon text-5xl text-white"
          @click="useWebfarme.scrollById('main')"
        />
      </div>
    </header>

    <div id="main" class="min-h-full pt-2">
      <RouterView />
    </div>
    <div>
      <Footer />
    </div>
  </div>
</template>

<script setup lang="ts">
import NavBar from "./navbar/index.vue";
import Footer from "./footer/index.vue";
import useWebfarme from "@/hooks/useWebfarme";
import { useArticleStore } from "@/stores/useArticle";
const useArticle = useArticleStore();
const { article } = storeToRefs(useArticle);
import useUtils from "@/hooks/useUtils";
const { dateToStr } = useUtils();

const currentArc = computed(() => {
  return useArticle.getArcticle;
});

const route = useRoute();

const active = ref(route.fullPath);

watch(
  () => route,
  (to) => {
    active.value = to.fullPath;
  },
  {
    deep: true,
  }
);

import { useScroll } from "@vueuse/core";

const app = document.querySelector("#app");
// app.style.overflowY = "hidden";
const { x, y, isScrolling, arrivedState, directions } = useScroll(app);
const { left, right, top, bottom } = toRefs(arrivedState);
const {
  left: toLeft,
  right: toRight,
  top: toTop,
  bottom: toBottom,
} = toRefs(directions);
console.log(x, y, isScrolling, arrivedState, directions);

const downScroll = ref(false);
watch(y, (newVal, oldVal) => {
  console.log(newVal, oldVal);
  if (newVal - oldVal > 0) {
    downScroll.value = true;
  } else {
    downScroll.value = false;
  }
});

const isBgShow = computed(() => {
  return top;
});

import { init } from "ityped";
const content = ref<null | Element>(null);

onMounted(() => {
  active.value === "/index" &&
    init(content.value as Element, {
      showCursor: false,
      disableBackTyping: true,
      strings: [" 千里之行，始于足下。"],
    });
});
</script>

<style scoped>
:deep(#app) {
  overflow-y: scroll;
}
::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}
.index {
  /* background-image: url("https://s1.vika.cn/space/2022/11/04/7bc0b1372dcf4995864095edbbdd42e1"); */
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  width: 100vw;
  height: 100vh;
  animation: index-ani 1s;
  transition: all;
}
.other {
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  width: 100vw;
  height: 400px;
  animation: index-ani 1s;
  transition: all;
}

.down-icon {
  cursor: pointer;
  animation: down-icon 1s infinite;
  transition: all;
}

@keyframes index-ani {
  0% {
    transform: scale(0.2);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes down-icon {
  0% {
    transform: translateY(10);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

.nav-bg {
  background-color: rgba(1, 1, 1, 0.1);
}
</style>
