<!--
 * @Author: yulinZ 1973329248@qq.com
 * @Date: 2022-11-13 01:32:08
 * @LastEditors: yulinZ 1973329248@qq.com
 * @LastEditTime: 2022-12-28 02:02:48
 * @FilePath: \nuxt3-template\pages\article\[id].vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="w-full h-full warpper bg-light-200 dark:bg-dark">
    <!-- <select v-model="color.preference">
      <option value="system">System</option>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
      <option value="sepia">Sepia</option>
    </select> -->
    <ClientOnly>
      <!-- <el-affix class="fixed z-50" :offset="120">
        <el-button type="primary">Offset top 120px</el-button>
      </el-affix> -->
    </ClientOnly>

    <div class="m-2" id="edit-box">
      <LazyClientOnly>
        <div class="flex felx-row">
          <div class="w-full">
            <el-image :src="text.img" class="p-10" />
            <div class="m-2 text-center">
              <h1 class="my-2 text-3xl">{{ text.title }}</h1>
              <h2 class="mb-1">{{ text.bf }}</h2>
              <div class="flex items-center justify-center">
                <div class="flex items-center mr-2 text-sm">
                  <Icon name="carbon:user-filled" size="14" />
                  {{ text.user?.username }}
                </div>
                <div class="flex items-center text-sm">
                  <Icon name="carbon:server-time" size="14" />{{
    dateToStr(text.createdAt)
}}
                </div>
              </div>
              <div class="flex justify-center mt-1">
                <div class="flex flex-row items-center justify-center mr-2 cursor-pointer">
                  <Icon size="14" color="red" name="ep:menu" />
                  <div>
                    {{ text.group.name }}
                  </div>
                </div>

                <el-tag v-for="item in text.labels" class="mr-2 cursor-pointer">
                  <span :style="{ color: item.color }">{{ item.name }}</span>
                </el-tag>
              </div>
            </div>
            <md-editor previewOnly class="p-1" :editor-id="editId" v-model="text.content" :theme="color.value"
              :show-code-row-number="true" @on-get-catalog="getCatalog" />

            <div class="w-full text-3xl text-center">--over--</div>

            <div class="w-full">
              <div class="flex items-center justify-between p-3 m-2 rounded-lg bg-light-400 dark:bg-gray-700">
                <div class="flex items-center">
                  <el-avatar :src="text.user.avatar" />
                  <div class="flex flex-col p-2">
                    <span>{{ text.user.username }} &ensp;{{
    text.user.email
}}</span>
                    <div>
                      <span class="text-xs">
                        {{ text.user.brief }}
                      </span>
                    </div>
                  </div>
                </div>

                <div class="text-right">
                  <el-button :disabled="!commitValue">关注</el-button>
                </div>
              </div>
            </div>


            <Comment :author="text.user" />

          </div>
          <div v-show="catalogShow" class="hidden flex-none pl-2 w-[250px] md:block h-full">
            <div class="fixed w-full min-h-screen">
              <md-catalog class="w-[250px] atalog h-full mt-2" :editor-id="editId" :theme="color.value"
                @on-click="toc" />
            </div>
          </div>
        </div>
      </LazyClientOnly>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { ElMessage } from "element-plus"
import { useUserStore } from "@/store/modules/user";
import LoginForm from "@/components/LoginForm.vue";
import MdEditor from "md-editor-v3";
import "md-editor-v3/lib/style.css";

import Comment from "./compponents/comment.vue"
const MdCatalog = MdEditor.MdCatalog;

const userInfo = useUserStore();

MdEditor.config({
  markedRenderer(renderer) {
    // renderer.heading = (text, level, raw, s, index) => {
    //   console.log(text, level, raw, s, index);

    //   return `<h${level} id="heading-${index}"> ${text}</h${level}>`;
    // };

    return renderer;
  },
});
const { dateToStr } = useUtils();
const color = useColorMode();

const route = useRoute();
const router = useRouter();
const editId = ref("my-editor");
const text = ref({
  id: "my-editor",
  content: "",
});

const commitValue = ref();

const catalogShow = ref(false);
const tocList = ref();
const getCatalog = (list) => {
  tocList.value = list;
  catalogShow.value = list.length > 0;
};

const articleData = await getArticleDetail({ id: route.params.id });

text.value = articleData.data[0];

useHead({
  title: `${text.value.title}`,
  meta: [
    { name: "description", content: `${text.value.bf}` },
    {
      hid: "keywords",
      name: "keywords",
      content: `${text.value.title},${text.value.labels.map((item) => {
        return item.name;
      })}`,
    },
  ],
  bodyAttrs: {
    class: "",
  },
});

function getElementTop(el) {
  if (el.offsetParent) {
    return getElementTop(el.offsetParent) + el.offsetTop;
  }
  return el.offsetTop;
}


onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

const currentTocItemIndex = ref();
function handleScroll() {
  if (process.client) {
    for (let i = 0; i < tocList.value?.length; i++) {
      if (i < tocList.value.length - 1) {
        let tocItem = document.getElementById(tocList.value[i].text);
        let tocItem1 = document.getElementById(tocList.value[i + 1].text);

        if (
          window.pageYOffset <= getElementTop(tocItem1) &&
          window.pageYOffset + 65 >= getElementTop(tocItem)
        ) {

          currentTocItemIndex.value = i;
          // tocItemList[i + 1].classList.add("md-editor-catalog-active");
        }
      } else {
        let tocItem = document.getElementById(tocList.value[i].text);
        if (
          window.pageYOffset <= getElementTop(tocItem) * 2 &&
          window.pageYOffset + 65 >= getElementTop(tocItem)
        ) {
          currentTocItemIndex.value = i;
          // tocItemList[i + 1].classList.add("md-editor-catalog-active");
        }
      }
    }
  }
}

watch(
  currentTocItemIndex,
  (newVal, oldVal) => {
    let tocItemList = document.querySelector(".md-editor-catalog").children;
    for (let i = 0; i < tocItemList.length; i++) {
      tocItemList[i].classList.remove("md-editor-catalog-active");
    }
    tocItemList[newVal].classList.add("md-editor-catalog-active");
  },
  { deep: true }
);

const toc = (e, t) => {
  console.log(e, t);
  if (process.client) {
    // let m = document.createElement("a");
    // m.href = "#" + t.text;
    // m.click();
    // 页面滚动到 指定位置
    const scrollDom = document.getElementById(t.text);
    const marTop = getElementTop(scrollDom);
    window.scrollTo({
      top: marTop - 60,
      behavior: "smooth",
    });

    // 添加目录选中颜色
    // let tocItemList = document.querySelector(".md-editor-catalog").children;
    // for (let i = 0; i < tocItemList.length; i++) {
    //   tocItemList[i].classList.remove("md-editor-catalog-active");
    // }
    // tocItemList[t.index - 1].classList.add("md-editor-catalog-active");
  }
};


</script>

<style scoped>
.atalog {
  /* position: fixed; */
  /* top: 60px; */
  margin-left: 0;
  margin-right: 0;
  overflow: auto;
  /* height: calc(100vh - 250px); */
  list-style: none !important;
}

.line-h-24 {
  display: inline-flexbox;
  line-height: 24px;
}
</style>
