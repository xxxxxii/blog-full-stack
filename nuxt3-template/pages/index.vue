<!--
 * @Author: yulinZ 1973329248@qq.com
 * @Date: 2022-11-12 02:38:49
 * @LastEditors: yulinZ 1973329248@qq.com
 * @LastEditTime: 2023-01-10 01:04:13
 * @FilePath: \nuxt3-template\app.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <section id="section"
    class="flex flex-col-reverse pt-4 pb-4 min-h-screen-sm md:flex-row p2-4 sm:px-6 lg:px-2 xl:px-3 sm:pb-6 lg:pb-4 xl:pb-6">
    <LazyClientOnly>
      <div class="flex-none <md:w-full md:w-[250px] md:mr-2">
        <div class="p-2 rounded-md bg-light-800 dark:bg-dark-50">
          <div>
            <div class="flex justify-center">
              <el-avatar :size="100" :src="userInfo?.avatar" />
            </div>
            <div class="p-3 text-2xl text-center">
              {{ userInfo?.username }}
            </div>
            <div class="flex items-center">
              <Icon name="ic:sharp-mark-email-unread" />
              {{ userInfo?.email }}
            </div>
            <div class="flex items-center pt-1">
              <Icon name="ant-design:qq-circle-filled" />
              {{ userInfo?.qq }}
            </div>
            <div class="p-2 mt-1 text-center bg-gray-300 dark:bg-gray-600">
              {{ userInfo?.brief }}
            </div>
          </div>
          <div>
            <div class="flex pt-1">
              <Icon name="ic:round-event-note" />
              <div>{{ pagination.total }}</div>
            </div>
          </div>
          <div class="p-1 mt-1 text-center bg-gray-300 my-link dark:bg-gray-600">
            <abbr title="github">
              <a href="https://github.com/xxxxxii">
                <Icon size="28" name="uil:github" />
              </a>
            </abbr>
            <abbr title="gitee">
              <a href="https://gitee.com/yulinzhu">
                <Icon name="simple-icons:gitee" />
              </a>
            </abbr>
          </div>
        </div>
        <div class="rounded-md bg-light-800 dark:bg-dark-50">
          <HotArticle />
        </div>
        <div class="mt-1 rounded-md bg-light-800 dark:bg-dark-50">
          <Group />
        </div>
        <div class="mt-1 rounded-md bg-light-800 dark:bg-dark-50">
          <Label />
        </div>
      </div>
    </LazyClientOnly>
    <div class="w-full">
      <ul class="grid w-full grid-cols-1 gap-3 mt-0 lg:grid-cols-2 xl:grid-cols-2">
        <LazyClientOnly>
          <li v-for="item in articleList" :key="item.id" class="w-full p-2 rounded-md md:p-0">
            <div
              class="block w-full p-1 border-gray-200 rounded-lg bg-sky-50 dark:bg-dark-100 hover:border-current hover:border-transparent hover:shadow-lg group shdadow-md">
              <LazyClientOnly>
                <div class="img-box w-full h-[300px] relative overflow-hidden duration-300">
                  <el-image class="w-full h-[300px] object-cover" :src="item.img" alt="" fit="cover" loading="lazy" />

                  <div class="absolute top-0 left-0 right-0 flex items-center justify-center w-full h-full p-20 bf-box">
                    <a :href="'/article/' + item.id" class="w-full h-full">
                      <div class="w-full h-full break-words bg-black btn dark:bg-white">
                        {{ item.bf }}
                      </div>
                    </a>
                  </div>
                </div>
              </LazyClientOnly>
              <dl class="items-center p-4">
                <a :href="'/article/' + item.id" class="inline-block w-full">
                  <div class="w-full text-dark-200 dark:text-light-100">
                    <dt class="sr-only">title</dt>
                    <div class="leading-6 t-elli text-xl my-2 hover:text-[#ff8b18]">
                      {{ item.title }}
                    </div>
                  </div>
                </a>
                <div class="text-dark-200 dark:text-light-100">
                  <dt class="sr-only">Category</dt>
                  <div class="flex items-center text-xs t-elli sm:mb-4 lg:mb-0 xl:mb-4">
                    <div class="flex items-center">
                      <Icon size="14" name="ic:sharp-access-time" />
                      {{ dateToStr(item.createdAt) }}
                    </div>
                    <div class="flex items-center ml-1">
                      <Icon size="14" color="red" name="ep:menu" />
                      {{ item.group.name }}
                    </div>
                  </div>
                </div>
                <div>
                  <dt class="sr-only">Labels</dt>
                  <div class="flex justify-start sm:justify-start lg:justify-start xl:justify-start">
                    <div v-for="tag in item.labels"
                      class="border cursor-pointer mr-2 px-2 py-1 rounded-md text-xs hover:-translate-y-0.5"
                      :style="{ color: tag.color }">
                      {{ tag.name }}
                    </div>
                  </div>
                </div>
              </dl>
            </div>
          </li>
        </LazyClientOnly>
        <!-- <li class="flex rounded-lg hover:shadow-lg">
          <a
            href="/new"
            class="flex items-center justify-center w-full py-4 text-sm font-medium border-2 border-gray-200 border-dashed rounded-lg hover:border-transparent hover:shadow-xs"
          >
            New Project
          </a>
        </li> -->
      </ul>
      <LazyClientOnly>
        <el-pagination small background layout="total, sizes, prev, pager, next, jumper" :page-sizes="[10, 20, 30]"
          :total="pagination.total" class="mt-4 mb-4" @size-change="handleSizeChange"
          @current-change="handleCurrentChange" />
      </LazyClientOnly>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ElDialog, ElMessageBox } from "element-plus";

useHead({
  title: "yl blog",
  meta: [
    {
      name: "viewport",
      content:
        "initial-scale=1,maximum-scale=1, minimum-scale=1, user-scalable=no",
    },
    {
      hid: "description",
      name: "description",
      content:
        "yl blog博客,主要用于记录日常想法，问题解决,日志,记录记录文章的一个nuxt网站",
    },
    {
      hid: "keywords",
      content: "yl blog博客,nuxt网站,nuxt3网站,vue网站,个人网站,yl blog网站",
    },
  ],
  bodyAttrs: {
    class: "",
  },
});
const { dateToStr } = useUtils();
const router = useRouter();

const pagination = ref({
  total: 10,
  page: 1,
  pageSize: 10,
});

function handleSizeChange(val: number) {
  console.log(val, "handleSizeChange");
  pagination.value.pageSize = val;
  getArticleList();
  // useWebfarme.scrollById("main");
}

function handleCurrentChange(val: number) {
  console.log(val, "handleCurrentChange");
  pagination.value.page = val;
  getArticleList();
  // useWebfarme.scrollById("main");
}

const userConfig = useRuntimeConfig();
const {
  VITE_API_HOST,
  VITE_API_PREFFIX,
  VITE_PACK_ENV,
  VITE_PACK_URL,
  VITE_USER_ID,
} = userConfig.public;

console.log(userConfig);
const keyWord = ref("");
// 获取文章列表
const articleList = ref();
async function getArticleList() {
  const { data } = await getArticle({
    ...pagination.value,
    keyWord: keyWord.value,
  });
  console.log(data);
  if (data.code == 200) {
    articleList.value = data.data;
    pagination.value.total = data.total;
  }
}

// 获取用户信息
const userInfo = ref();
async function getUserInfoData() {
  const { data } = await getUserInfo({ id: VITE_USER_ID });
  if (data.code == 200) {
    userInfo.value = data.data[0];
  }
}

onMounted(() => {
  getArticleList();
  getUserInfoData();
});
</script>

<style lang="scss" scoped>
.img-box:hover {
  >.el-image {
    scale: 1.1;
    transition: all 0.5s;
  }

  .btn {
    display: block;
  }
}

.btn {
  overflow: hidden; //超出的文本隐藏

  text-overflow: ellipsis; //溢出用省略号显示

  display: -webkit-box;

  -webkit-line-clamp: 1; // 超出多少行

  -webkit-box-orient: vertical;
}

.bf-box {
  .btn {
    @apply ease-in-out animate-ping md: hidden duration-700 bg-black bg-opacity-40 rounded-md text-[#1e90ff] p-3 font-mono font-semibold shadow-md border;
  }
}

@keyframes bf-box-ani {
  0% {
    width: 100%;
    height: 100%;
    display: inline;
  }

  100% {}
}

.my-link {
  display: flex;
  justify-content: center;

  abbr {
    padding: 10px;
  }
}
</style>
