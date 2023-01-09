<!--
 * @Author: yulinZ 1973329248@qq.com
 * @Date: 2022-10-27 18:36:58
 * @LastEditors: yulinZ 1973329248@qq.com
 * @LastEditTime: 2022-10-29 01:15:13
 * @FilePath: \vue3-element-admin - 副本\src\pages\index\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div
    :style="{
      backgroundImage: 'url(' + homebg + ') ',
    }"
  >
    <div class="home-box border-spacing-1 sm:p-5">
      <h2 class="item text-center home-text hidden sm:block">
        <span>WELCOME TO CREATIVITY</span>
      </h2>

      <el-carousel
        class="item"
        :interval="4000"
        :type="carouselType()"
        :height="carouselHeight"
      >
        <el-carousel-item
          v-for="item in carouselData"
          :key="item.id"
          class="car-img rounded-xl"
          :style="{ backgroundImage: 'url(' + item.img + ') ' }"
        >
          <h3 class="item-text" justify="center" @click="toArticle(item.id)">
            {{ item.title }}
          </h3>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script setup lang="ts">
import homebg from "@/assets/homebg.jpg";
import { articleList } from "@/api/api";

const router = useRouter();
const carouselData = ref([]);
async function getCarousel() {
  const res = await articleList({ type: 1 });
  if (res.code == 200) {
    carouselData.value = res.data;
  }
}

getCarousel();

const carouselHeight = computed(() => {
  if (document.documentElement.clientWidth < 768) {
    return "300px";
  } else {
    return "600px";
  }
});
// const carouselType
function carouselType() {
  if (document.documentElement.clientWidth < 768) {
    return "";
  } else {
    return "";
  }
}

function toArticle(id) {
  router.push({
    path: "/articleshow/" + id,
  });
}
</script>

<style lang="scss" scoped>
.home-box {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-position: center center;
  /* 背景图不平铺 */
  background-repeat: no-repeat;
  /* 当内容高度大于图片高度时，背景图像的位置相对于viewport固定 */
  background-attachment: fixed;
  /* 让背景图基于容器大小伸缩 */
  background-size: cover;
  font-size: 3em;
  .item {
    flex: 1;
    .item-text {
      font-size: 1rem;
    }
  }
}
.car-img {
  background-position: center center;
  /* 背景图不平铺 */
  background-repeat: no-repeat;
  /* 当内容高度大于图片高度时，背景图像的位置相对于viewport固定 */
  background-attachment: fixed;
  /* 让背景图基于容器大小伸缩 */
  background-size: cover;
  /* 设置背景颜色，背景图加载过程中会显示背景色 */
  background-color: #464646;

  h3 {
    background-color: rgba($color: #000000, $alpha: 0.4);
    width: 100%;
    color: #ebebeb;
    line-height: 100px;
    padding: 10px;
    border-radius: 10px;
    position: fixed;
    bottom: 0;
    text-align: center;
  }
}
</style>
