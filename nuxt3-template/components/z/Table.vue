<!--
 * @Author: yulinZ 1973329248@qq.com
 * @Date: 2022-12-07 15:03:32
 * @LastEditors: yulinZ 1973329248@qq.com
 * @LastEditTime: 2022-12-07 15:52:40
 * @FilePath: \blog-full-stack\nuxt3-template\components\z\Table.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <ul>
    <li
      v-for="item in list"
      v-if="list?.length != 0"
      class="my-2 bg-gray-300 dark:bg-gray-600 shadow-light-700 cursor-pointer rounded-md"
    >
      <a :href="'/article/' + item.id" class="m-1 inline-block">
        <h3>{{ item.title }}</h3>
        <h4 class="text-xs">{{ item.bf }}</h4>
      </a>
    </li>
    <div v-else>
      <el-empty description="description" />
    </div>
  </ul>
</template>
<script setup lang="ts">
import { ElEmpty } from "element-plus";
defineProps({
  list: Array<{ id: number; title: string; bf: string; length: number }>,
});
</script>
