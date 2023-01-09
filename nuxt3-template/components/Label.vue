<!--
 * @Author: yulinZ 1973329248@qq.com
 * @Date: 2022-11-17 14:49:01
 * @LastEditors: yulinZ 1973329248@qq.com
 * @LastEditTime: 2022-12-07 15:50:19
 * @FilePath: \nuxt3-template\components\Label.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="p-1">
    <ZTitle title="标签" class="py-1">
      <template #icon>
        <Icon color="red" name="mdi:label-multiple-outline"></Icon>
      </template>
    </ZTitle>

    <div class="flex flex-wrap justify-center items-center p-1">
      <el-tag
        class="m-1 cursor-pointer"
        v-for="item in labelList"
        @click="tagClick(item)"
      >
        <span :style="{ color: item.color }">{{ item.name }}</span>
      </el-tag>
    </div>
  </div>
</template>

<script setup lang="ts">
import ZTable from "@/components/z/Table.vue";

const labelList = ref();

onMounted(async () => {
  const { data } = await getLabelList();
  console.log(data);
  if (data.code == 200) {
    labelList.value = data.data;
  }
});

async function tagClick(item: { id: string; name: string }) {
  const res = await articleByLabelId({ labelId: item.id });
  console.log(res);
  let resData = null;
  if (res.data.code == 200) {
    resData = res.data.data;
  }
  useDialog(h(ZTable, { list: resData }), item.name, {
    dangerouslyUseHTMLString: true,
    lockScroll: false,
    draggable: true,
  });
}
</script>

<style>
.citem-li::after {
  content: " ";
}
</style>
