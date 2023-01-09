<!--
 * @Author: yulinZ 1973329248@qq.com
 * @Date: 2022-10-28 00:38:10
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-11-05 02:52:56
 * @FilePath: \vue3-element-admin - 副本\src\pages\index\components\hot.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <Title class="p-2" title="热门文章" note="更多>">
    <template #icon>
      <i-mdi-chili-hot style="color: red" />
    </template>
  </Title>
  <el-row :gutter="10">
    <el-col
      :xs="{ span: 24 }"
      :sm="{ span: 24 }"
      :md="{ span: 24 }"
      v-for="(item, index) in hotList"
      class="mb-1"
    >
      <el-card class="m-2" :body-style="{ padding: '5px' }">
        <div>
          <h2 class="cursor-pointer" @click="toArticleDetails(item.id)">
            {{ item.title }}
          </h2>
          <div class="text-sm">{{ dateToStr(item.created_at) }}</div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import Title from "@/components/title/index.vue";
import useUtils from "@/hooks/useUtils";
const { dateToStr } = useUtils();

import { articleList } from "@/api/api";

import useArticle from "@/hooks/useArticle";
const { toArticleDetails } = useArticle();

const hotList = ref([]);
async function getHotList() {
  const res = await articleList({ type: 0 });

  if (res.code == 200) {
    hotList.value = res.data;
  }
}
getHotList();
</script>

<style lang="scss" scoped>
.no-image {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
