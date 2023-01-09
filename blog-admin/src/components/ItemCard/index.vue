<!--
 * @Author: yulinZ 1973329248@qq.com
 * @Date: 2022-10-31 21:21:59
 * @LastEditors: yulinZ 1973329248@qq.com
 * @LastEditTime: 2022-11-02 10:08:05
 * @FilePath: \vue3-element-admin - 副本\src\components\ItemCard\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="main rounded-md">
    <view class="card-box hover:shadow-md">
      <view class="left-img">
        <el-image
          class="xs:w-[5.9em] xs:h-[4.22em] sm:w-[16em] sm:h-[11em] rounded-md m-2"
          :src="img"
          fit="cover"
        />
      </view>

      <view class="content">
        <view class="title">{{ title }}</view>
        <view class="note">{{ note }}</view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
const props = defineProps({
  img: {
    type: [String],
    default: "",
  },
  title: {
    type: [String],
    default: "title",
  },
  note: {
    type: [String],
    default: "note",
  },
});

function tap(e) {
  e.currentTarget.dataset.itemid;
  console.log(e, "card");
}
</script>

<style scoped>
.main {
  width: 100%;
}
.card-box {
  display: flex;
  width: 100% !important;
  align-items: center;
}
.content {
  width: calc(100% - 3.5em);
}
.left-img {
  display: flex;
  align-items: center;
}
.image {
  width: 9em;
  height: 7em;
  object-fit: cover;
  border: #f0f0f0 1px solid;
  background-color: #dcdcdc;
  margin: 10rpx;
  border-radius: 10rpx;
}
.title,
.note {
  overflow: hidden;
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
.title {
  -webkit-line-clamp: 1;
  font-size: 18px;
}
.note {
  -webkit-line-clamp: 2;
  font-weight: 200;
  font-size: 14px;
}
</style>
