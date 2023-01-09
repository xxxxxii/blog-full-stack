<!--
 * @Author: yulinZ 1973329248@qq.com
 * @Date: 2022-10-08 00:17:22
 * @LastEditors: yulinZ 1973329248@qq.com
 * @LastEditTime: 2022-11-25 19:29:18
 * @FilePath: \vue3vite\src\pages\arc\components\arcAddOption.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by yulinZ 1973329248@qq.com, All Rights Reserved. 
-->
<template>
  <!-- <el-dialog
    :destroy-on-close="true"
    v-model="isShow"
    :close-on-click-modal="false"
    title="Warning"
    align-center
  > -->
  <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    :rules="rules"
    label-width="120px"
    class="demo-ruleForm"
    :size="formSize"
    status-icon
  >
    <el-form-item label="标题" prop="title">
      <el-input v-model="ruleForm.title" />
    </el-form-item>
    <el-form-item label="简介" prop="bf">
      <el-input
        v-model="ruleForm.bf"
        :autosize="{ minRows: 2, maxRows: 4 }"
        type="textarea"
        placeholder="Please input"
      />
    </el-form-item>
    <el-form-item label="图片" prop="img">
      <UploadImg @imageUrl="getImageUrl" :isPreview="false" />
      <ImgCropper
        class="mt-2"
        @getBase64="getBase64"
        @resetImg="cropperRestImg"
        v-model:option="cropperData"
      />
    </el-form-item>
    <el-form-item label="分类" prop="group">
      <el-radio-group v-model="ruleForm.group" size="small">
        <el-radio-button
          :label="item.id"
          :name="item.id"
          v-for="item in groupData"
          >{{ item.name }}</el-radio-button
        >
      </el-radio-group>
    </el-form-item>
    <el-form-item label="标签" prop="labels">
      <el-checkbox-group v-model="ruleForm.labels" size="small">
        <el-checkbox-button
          v-for="(item, index) in labelData"
          :key="item.id"
          :label="item.id"
          >{{ item.name }}</el-checkbox-button
        >
      </el-checkbox-group>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)"
        >Create</el-button
      >
      <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
    </el-form-item>
  </el-form>
  <!-- </el-dialog> -->
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import UploadImg from "@/components/UploadImg/index.vue";
import ImgCropper from "@/components/ImgCropper/index.vue";
import { labelList, group } from "@/api/api";

const groupData = ref();
async function getGroup() {
  const res = await group({ method: "get" });
  if (res.code == 200) {
    groupData.value = res.data;
  }
}

const labelData = ref([]);
if (labelData.value.length <= 0) {
  labelList({ isAll: true }).then((res) => {
    console.log(res);
    if (res.code == 200) {
      labelData.value = res.data;
    }
  });
}

let ruleForm = ref({
  title: "",
  bf: "",
  img: "",
  labels: [],
  imgType: "",
  group: null,
});
const cropperData = ref({
  img: "",
  size: 1,
  outputType: "png",
  crop: false,
});
const sourceImgData = ref();
const props = defineProps({
  isShow: {
    type: Boolean,
  },
  data: Object,
});
onMounted(() => {
  ruleForm.value = props.data;
  if (props.data.img) {
    cropperData.value.img = ruleForm.value.img;
    sourceImgData.value = JSON.parse(JSON.stringify(ruleForm.value?.img));
  }
  getGroup();
});

const emit = defineEmits();

const formSize = ref("default");
const ruleFormRef = ref<FormInstance>();

const count = ref(0);
onMounted(() => {
  console.log(ruleForm.value);
});
function dialogClose(done) {
  console.log(done);
}

function blobtoBase64(file) {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    let imgResult = "";
    reader.readAsDataURL(file);
    reader.onload = function () {
      imgResult = reader.result;
    };
    reader.onerror = function (error) {
      reject(error);
    };
    reader.onloadend = function () {
      resolve(imgResult);
    };
  });
}

const getImageUrl = (val) => {
  console.log(val);
  if (!val) {
    ruleForm.value.img = "";
    cropperData.value.img = "";
    return;
  }
  ruleForm.value.imgType = val.type;
  blobtoBase64(val).then((res) => {
    console.log(res);
    ruleForm.value.img = res;
    ruleForm.value.imgChange = true;
    cropperData.value.img = res;
    sourceImgData.value = JSON.parse(JSON.stringify(res));
  });
};

const getBase64 = (val) => {
  console.log(val, "getBase64");
  cropperData.value.img = val;
  ruleForm.value.img = val;
  ruleForm.value.imgChange = true;
  ruleForm.value.imgType = "image/png";
};
const cropperRestImg = () => {
  console.log(sourceImgData.value);
  cropperData.value.img = sourceImgData.value;
  ruleForm.value.img = sourceImgData.value;
};

const rules = reactive<FormRules>({
  title: [
    { required: true, message: "Please input Article Title", trigger: "blur" },
    { min: 3, max: 200, message: "Length should be 3 to 5", trigger: "blur" },
  ],
  bf: [
    {
      required: true,
      message: "Please select Activity zone",
      trigger: "change",
    },
  ],
  group: [
    {
      required: true,
      message: "Please select group",
      trigger: "blur",
    },
  ],
  labels: [
    {
      required: true,
      message: "Please select labels",
      trigger: "blur",
    },
  ],
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;

  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log("submit!");
      emit("getForm", ruleForm.value);
    } else {
      console.log("error submit!", fields);
    }
  });
};

defineExpose({ submitForm });

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>
