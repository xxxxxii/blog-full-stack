<!--
 * @Author: yulinZ 1973329248@qq.com
 * @Date: 2022-10-07 18:45:51
 * @LastEditors: yulinZ 1973329248@qq.com
 * @LastEditTime: 2022-11-27 00:46:54
 * @FilePath: \vue3vite\src\pages\arc\addOrEdit.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by yulinZ 1973329248@qq.com, All Rights Reserved. 
-->
<template>
  <div class="h-full flex flex-col">
    <div class="h-fit">
      <el-button
        type="primary"
        class="mb-2"
        @click="titleSetShow = !titleSetShow"
        >标题信息设置</el-button
      >
    </div>
    <div class="edit-box h-full">
      <MarkdownEditor
        @save="save"
        v-model:data="editData.content"
      ></MarkdownEditor>
    </div>
    <el-dialog
      v-model="titleSetShow"
      :close-on-click-modal="false"
      :before-close="dialogClose"
      title="文章标题信息设置"
      align-center
    >
      <ArcAddOption
        :isShow="titleSetShow"
        @getForm="getForm"
        :data="editData"
      />
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import ArcAddOption from "./components/arcAddOption.vue";
import MarkdownEditor from "@/components/MarkdownEditor/index.vue";
import { addArticle, articleData, editArticle } from "@/api/api";

const route = useRoute();
console.log(route.query.id);
const editData = ref({});

if (route.query.id) {
  getArticleData();
}

async function getArticleData() {
  const res = await articleData({ id: route.query.id });
  if (res.code == 200) {
    editData.value = res.data[0];
    console.log(editData.value);
    editData.value.imgChange = false;
    editData.value.labels = res.data[0].labels.map((item) => {
      return item.id;
    });
    editData.value.group = res.data[0].group.id;
  }
}

const titleSetShow = ref(false);
const submitForm = ref({});
const getForm = (val: any) => {
  console.log(val);
  submitForm.value = val;
  titleSetShow.value = false;
};
const save = (val: any) => {
  console.log(val, submitForm.value, "save");
  // 是否打开弹窗修改过数据
  if (!submitForm.value?.id && route.query.id) {
    submitForm.value = editData.value;
  }
  if (!submitForm.value.title) {
    ElMessage.error("请设置文章标题！");
  }
  submitForm.value.content = val;

  // 修改文章
  if (route.query.id) {
    editArticle(submitForm.value).then((res: any) => {
      if (res.code == 200) {
        ElMessage.success(res.msg);
      }
    });
  } else {
    // 新增文章
    addArticle(submitForm.value).then((res: any) => {
      if (res.code == 200) {
        ElMessage.success(res.msg);
      }
    });
  }
};
const dialogClose = (done: () => void) => {
  ElMessageBox.confirm("Are you sure to close this dialog?")
    .then(() => {
      done();
    })
    .catch(() => {
      // catch error
    });
};
</script>

<style scoped>
:deep(h1) {
  font-size: 1.3em;
}
.edit-box {
  /* height: calc(100% - 32px); */
}
</style>
