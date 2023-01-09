<!--
 * @Author: yulinZ 1973329248@qq.com
 * @Date: 2022-09-11 17:47:25
 * @LastEditors: yulinZ 1973329248@qq.com
 * @LastEditTime: 2022-11-27 00:48:18
 * @FilePath: \vue3vite\src\pages\test\components\editor.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by yulinZ 1973329248@qq.com, All Rights Reserved. 
-->
<template>
  <div class="h-full">
    <div class="flex h-full">
      <md-atalog
        v-show="atalogShow"
        class="atalog border-solid h-full"
        :editor-id="state.id"
        :scroll-element="scrollElement"
        :theme="state.theme"
      />
      <md-editor
        class="md-editor h-full"
        :showCodeRowNumber="true"
        :toolbars="toolbarsConfig"
        previewTheme="default"
        codeTheme="github"
        v-model="editData.text"
        :editor-id="state.id"
        :theme="themeMode"
        @onSave="save"
        @onGetCatalog="onGetCatalog"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import MdEditor from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import { saveAs } from "file-saver";
const MdAtalog = MdEditor.MdCatalog;
import useTheme from "@/hooks/useTheme";
const { isDark, toggleDark } = useTheme();

MdEditor.config({
  markedRenderer(renderer) {
    renderer.heading = (text, level, raw, s, index) => {
      return `<h${level} id="heading-${index}"> ${text}</h${level}>`;
    };

    return renderer;
  },
});

const props = defineProps({
  data: String,
});

import DialogHtml from "./dialogHtml.vue";

const saveMode = ref(null);
const atalogShow = ref(false);

const state = reactive({
  theme: "dark",
  text: "# 标题",
  id: "my-editor",
});

console.log(props.data);
const editData = ref({
  text: "",
});
watch(
  () => props.data,
  (newVal) => {
    editData.value.text = newVal;
  }
);
const scrollElement = document.documentElement;

const themeMode = computed(() => {
  return isDark.value ? "dark" : "light";
});

let text = ref("# 123153425");

const toolbarsConfig = [
  "bold",
  "underline",
  "italic",
  "-",
  "title",
  "strikeThrough",
  "sub",
  "sup",
  "quote",
  "unorderedList",
  "orderedList",
  "-",
  "codeRow",
  "code",
  "link",
  "image",
  "table",
  "mermaid",
  "katex",
  "-",
  "revoke",
  "next",
  "save",
  "=",
  "pageFullscreen",
  "fullscreen",
  "preview",
  "htmlPreview",
  "catalog",
];

const emits = defineEmits();
const save = (v: string) => {
  emits("save", editData.value.text);
};

const onGetCatalog = (list: HeadList[]) => {
  console.log(list);
};
</script>

<style scoped>
.arc-box {
  border: 1px solid #969696;
}
.atalog {
}
.md {
  width: 100%;
  height: 100%;
}
:deep(.md-catalog-link) {
  padding: 5px 1em !important;
}
:deep(.default-theme pre code) {
  background-color: v-bind(
    themeMode === "dark" ? "rgba(0,1,1,1)": "rgba(1,1,1,0)"
  ) !important;
}
.md-editor {
  height: 100%;
}
</style>
