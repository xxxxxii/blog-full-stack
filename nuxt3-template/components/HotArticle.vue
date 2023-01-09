<!--
 * @Author: yulinZ 1973329248@qq.com
 * @Date: 2022-11-16 22:19:57
 * @LastEditors: yulinZ 1973329248@qq.com
 * @LastEditTime: 2022-12-07 00:04:03
 * @FilePath: \nuxt3-template\components\HotArticle.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="p-1 mt-1">
    <ZTitle title="热门文章" note="更多" class="py-1">
      <template #icon>
        <Icon color="red" name="mdi:chili-hot-outline"></Icon>
      </template>
    </ZTitle>
    <ul>
      <li v-for="item in hotArticleList" class="p-1 rounded-sm cursor-pointer">
        <div class="">
          <a :href="'/article/' + item.id">
            <div class="t-elli">{{ item.title }}</div>
            <p class="text-xs">{{ dateToStr(item.createdAt) }}</p>
          </a>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const { dateToStr } = useUtils();
const hotArticleList = ref();

async function getHotArticle() {
  const { data } = await getHotArticleList();
  if (data.code == 200) {
    hotArticleList.value = data.data;
  }
}

onMounted(() => {
  getHotArticle();
});
</script>

<style scoped>
.img {
  width: 50px;
  height: 50px;
  border-radius: 5px;
}
</style>
