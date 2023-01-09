<!--
 * @Author: yulinZ 1973329248@qq.com
 * @Date: 2022-10-28 00:25:27
 * @LastEditors: yulinZ 1973329248@qq.com
 * @LastEditTime: 2022-11-17 16:19:50
 * @FilePath: \vue3-element-admin - 副本\src\components\title\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="title">
    <div class="title-content">
      <slot name="icon"></slot>
      {{ title }}
    </div>
    <div v-if="moreUrl" class="more" @click="toMore">{{ note }}</div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    default: "my is title",
  },
  note: {
    type: String,
    default: "more>",
  },
  moreUrl: {
    type: String,
    default: "",
  },
});
function toMore() {}
</script>

<style lang="scss" scoped>
.title {
  display: flex;
  justify-content: space-between;
  margin: 10rpx 0 10rpx 0;
}

.title-content {
  display: flex;
  align-items: center;
}

.more {
  font-size: 0.8em;
  color: #00bfff;
  display: flex;
  align-items: center;
}
</style>
