<!--
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-11-05 16:51:22
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-11-06 22:00:35
 * @FilePath: \项目\yl-blog\src\components\ImgCropper\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div v-show="option.img" class="w-full duration-300">
    <div class="cropper-content">
      <VueCropper
        class="w-full h-[200px]"
        ref="cropper"
        :img="option.img"
        :outputSize="option.size"
        :outputType="option.outputType"
        :autoCrop="option.crop"
        mode="contain"
      ></VueCropper>
    </div>
    <div>
      <div class="text-xl flex">
        <i-ant-design-radius-setting-outlined
          class="mr-2"
          @click="cropper.goAutoCrop()"
        />
        <i-ant-design-check-outlined class="mr-2" @click="startCropper" />
        <i-ant-design-rotate-left-outlined
          class="mr-2"
          @click="cropper.rotateLeft()"
        />
        <i-ant-design-rotate-right-outlined
          class="mr-2"
          @click="cropper.rotateRight()"
        />
        <i-ant-design-close-square-outlined
          class="mr-2"
          @click="cropper.clearCrop()"
        />
        <i-mdi-restart-alert class="mr-2" @click="resetImg" />
      </div>
    </div>

    <!-- <div>
      <el-image
        style="width: 300px; height: 200px"
        :src="cropImg"
        fit="contain"
      />
    </div> -->
  </div>
</template>

<script lang="ts" setup>
import "vue-cropper/dist/index.css";
import { VueCropper } from "vue-cropper";

const cropper = ref();
const props = defineProps({
  option: Object,
});

console.log(props.option.img);
const emits = defineEmits();
const cropImg = ref();
function startCropper() {
  cropper.value.startCrop();
  cropper.value.getCropData((data) => {
    // do something
    cropImg.value = data;

    emits("getBase64", data);
  });
}
function resetImg() {
  cropper.value.clearCrop();
  emits("resetImg");
}
</script>

<style lang="scss" scoped>
.cropper-content {
  width: 100%;
  height: 300px;
}
</style>
