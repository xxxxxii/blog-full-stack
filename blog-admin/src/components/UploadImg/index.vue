<!--
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-10-14 00:09:53
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-11-06 22:09:19
 * @FilePath: \vue3vite\src\components\uploadImg\index.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by error: git config user.name && git config user.email & please set dead value or install git, All Rights Reserved. 
-->
<template>
  <el-upload
    ref="upload"
    class="avatar-uploader"
    action="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
    :auto-upload="false"
    :on-change="fileAdd"
    :show-file-list="false"
    list-type="picture"
    :limit="1"
    :on-exceed="handleExceed"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
  >
    <!-- <template #tip>
      <div class="el-upload__tip">
        <el-button type="danger" size="small" circle @click="removeFile">
          <template #icon>
            <IEpDelete />
          </template>
        </el-button>
      </div>
    </template> -->
    <div v-if="isPreview">
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <el-icon v-else class="avatar-uploader-icon"><IEpPlus /></el-icon>
    </div>
    <el-button v-else type="primary">选择文件</el-button>
    <el-button @click.stop="removeFile">删除图片</el-button>
  </el-upload>
</template>

<script setup lang="ts">
import { genFileId } from "element-plus";
import type { UploadInstance, UploadProps, UploadRawFile } from "element-plus";

const imageUrl = ref("");
const upload = ref<UploadInstance>();
const emits = defineEmits();

defineProps({
  isPreview: Boolean,
});

const handleAvatarSuccess: UploadProps["onSuccess"] = (
  response,
  uploadFile
) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!);
};

const fileAdd = (file, fileList) => {
  console.log(file, fileList);
  fileList = [];
  fileList.push(file);
  imageUrl.value = URL.createObjectURL(file.raw); //图片链接
  console.log(imageUrl.value);
  emits("imageUrl", file.raw);
};
const handleExceed: UploadProps["onExceed"] = (files) => {
  upload.value!.clearFiles();
  const file = files[0] as UploadRawFile;
  file.uid = genFileId();
  upload.value!.handleStart(file);
};

const removeFile = () => {
  imageUrl.value = "";
  emits("imageUrl", null);
  console.log(imageUrl.value);
};
const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile) => {
  if (rawFile.type !== "image/jpeg") {
    ElMessage.error("Avatar picture must be JPG format!");
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error("Avatar picture size can not exceed 2MB!");
    return false;
  }
  return true;
};
</script>

<style scoped lang="scss">
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  border: 1px dashed var(--el-border-color);
  font-size: 28px;
  color: #8c939d;
  width: 125px;
  height: 125px;
  text-align: center;
}
.avatar-uploader .avatar {
  width: 125px;
  height: 125px;
  display: block;
}
</style>
