<!--
 * @Author: yulinZ 1973329248@qq.com
 * @Date: 2022-09-11 17:47:25
 * @LastEditors: yulinZ 1973329248@qq.com
 * @LastEditTime: 2022-11-11 02:06:42
 * @FilePath: \vue3vite\src\pages\test\components\editor.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by yulinZ 1973329248@qq.com, All Rights Reserved. 
-->
<template>
  <div class="main-content">
    <div>
      <div class="text-left">
        <el-icon
          class="el-icon--right cursor-pointer"
          @click="atalogShow = !atalogShow"
        >
          <IEpFinished />
        </el-icon>
      </div>
    </div>
    <div class="flex">
      <div class="atalog w-3 md:w-[200px]">
        <md-atalog
          v-show="atalogShow"
          class="border-solid h-full"
          :editor-id="state.id"
          :scroll-element="scrollElement"
        />
      </div>

      <md-editor
        class="h-full"
        :showCodeRowNumber="true"
        :toolbars="toolbarsConfig"
        previewTheme="default"
        codeTheme="github"
        previewOnly
        v-model="state.text"
        :editor-id="state.id"
        :theme="themeMode"
        @onSave="save"
        @onGetCatalog="onGetCatalog"
      />
      <div class="advert w-3 md:w-[200px]"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import MdEditor from "md-editor-v3";
import "md-editor-v3/lib/style.css";
const MdAtalog = MdEditor.MdCatalog;
import useTheme from "@/hooks/useTheme";

import { articleData } from "@/api/api";
const { isDark, toggleDark } = useTheme();

import { useArticleStore } from "@/stores/useArticle";
const useArticle = useArticleStore();

MdEditor.config({
  markedRenderer(renderer) {
    renderer.heading = (text, level, raw, s, index) => {
      console.log(text, level, raw, s, index);

      return `<h${level} id="heading-${index}"> ${text}</h${level}>`;
    };

    return renderer;
  },
});

const router = useRouter();
const articleId = router.currentRoute.value.params.id;
console.log(articleId);

if (articleId) {
  getArticleData();
}

// 获取对应文章数据
async function getArticleData() {
  const res = await articleData({ id: articleId });
  console.log(res);
  if (res.code == 200) {
    state.text = res.data[0].content;
    useArticle.setArticle(res.data[0]);
  }
}

const saveMode = ref(null);

const atalogShow = ref(true);

const state = reactive({
  theme: "dark",
  text: `# 标题 
            ## 3333`,
  id: "my-editor",
});

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
  emits("save", state.text);
};

const onGetCatalog = (list: HeadList[]) => {
  console.log(list);
};
</script>

<style scoped>
:deep(h1) {
  font-size: 1.3em;
}
.arc-box {
  border: 1px solid #969696;
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
</style>
