<!--
 * @Author: yulinZ 1973329248@qq.com
 * @Date: 2022-11-25 21:56:58
 * @LastEditors: yulinZ 1973329248@qq.com
 * @LastEditTime: 2022-12-07 17:04:51
 * @FilePath: \blog-full-stack\nuxt3-template\components\Group.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="p-1">
    <ZTitle title="文章分类" class="py-1">
      <template #icon>
        <Icon color="red" name="ep:menu"></Icon>
      </template>
    </ZTitle>

    <div class="flex flex-wrap justify-center items-center p-1">
      <el-tag
        @click="selectGroup(item)"
        class="m-1 cursor-pointer"
        v-for="item in groupData"
        :key="item.id"
      >
        {{ item.name }}
      </el-tag>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus";
import ZTable from "@/components/z/Table.vue";
let groupList = useArticle();
const groupData = ref();

async function getGroupData() {
  const { data } = await getGroupList();
  console.log(data);
  if (data.code == 200) {
    groupData.value = data.data;
    groupList.value = data.data;
    console.log(groupList);
  } else {
    ElMessage.error(data.msg);
  }
}

async function selectGroup(item: { id: number; name: string }) {
  const res = await articleByGroupId({ groupId: item.id });
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

onMounted(() => {
  getGroupData();
});
</script>
