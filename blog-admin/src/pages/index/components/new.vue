<!--
 * @Author: yulinZ 1973329248@qq.com
 * @Date: 2022-10-31 21:17:54
 * @LastEditors: yulinZ 1973329248@qq.com
 * @LastEditTime: 2022-11-11 02:05:26
 * @FilePath: \vue3-element-admin - 副本\src\pages\index\components\new.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="">
    <!-- <Title class="mt-5 mb-4" title="最新文章" note="更多>">
      <template #icon>
        <i-mdi-chili-hot style="color: red" />
      </template>
    </Title> -->

    <el-row class="">
      <el-col
        class="mb-5"
        :xs="{ span: 24 }"
        :sm="{ span: 24 }"
        v-for="(item, index) in article"
        :key="index"
      >
        <el-card :body-style="{ padding: '0px' }">
          <div class="image overflow-hidden">
            <img
              :src="item.img + '?' + new Date().getTime()"
              class="w-full image-animation"
            />
            <div class="btn-box">
              <button class="btn" @click="toArticleDetailsItem(item)">
                查看详情
              </button>
            </div>
          </div>

          <div style="padding: 14px">
            <h2 class="text-2xl" @click="toArticleDetailsItem(item)">
              {{ item.title }}
            </h2>
            <div class="">
              <div>{{ item.bf }}</div>
              <div class="flex justify-between">
                <ul class="flex">
                  <li class="flex justify-center align-middle mr-3">
                    <div>
                      <i-ep-star-filled
                        style="color: #fadb14; font-size: 18px"
                      />
                    </div>
                    <div class="w-8 text-ellipsis">0</div>
                  </li>
                  <li class="flex justify-center align-middle mr-3">
                    <div>
                      <i-ant-design-eye-filled style="font-size: 18px" />
                    </div>
                    <div class="w-8 text-ellipsis">{{ item.readCount }}</div>
                  </li>
                </ul>
                <time class="time">{{ dateToStr(item.createdAt) }}</time>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-pagination
      small
      background
      layout="total, sizes, prev, pager, next, jumper"
      :page-sizes="[10, 20, 30]"
      :total="pagination.total"
      class="mt-4 mb-4"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup lang="ts">
import { articleList } from "@/api/api";
import useWebfarme from "@/hooks/useWebfarme";
import useUtils from "@/hooks/useUtils";
const { dateToStr } = useUtils();
import useArticle from "@/hooks/useArticle";
const { toArticleDetails } = useArticle();

const pagination = ref({
  total: 10,
  pageSize: 10,
  pageNum: 1,
});
const article = ref([]);

const emits = defineEmits();

function toArticleDetailsItem(item: object) {
  emits("clickItem", item);
  toArticleDetails(item.id);
}
function handleSizeChange(val: number) {
  console.log(val, "handleSizeChange");
  pagination.value.pageSize = val;
  getArcticle();
  useWebfarme.scrollById("main");
}

function handleCurrentChange(val: number) {
  console.log(val, "handleCurrentChange");
  pagination.value.pageNum = val;
  getArcticle();
  useWebfarme.scrollById("main");
}

async function getArcticle() {
  const res = await articleList(pagination.value);
  if (res.code == 200) {
    article.value = res.data;
    pagination.value.total = res.total;
  }
}
getArcticle();
</script>
<style lang="scss" scoped>
.image {
  background-position: center;
  object-fit: cover;
  max-height: 500px;
  position: relative;
  .btn-box {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 99;
    display: flex;
    justify-content: center;
    align-items: center;
    .btn {
      @apply w-1/2 transition  ease-in-out hidden duration-700 bg-black bg-opacity-10 rounded-md  text-[#cf1322] p-3 font-mono font-semibold shadow-md ring-indigo-300 border-blue-700  border;
    }
  }
  .btn-box:hover {
    .btn {
      display: block;
      animation: img-ani 1s;
    }
  }
}
@keyframes img-ani {
  0% {
    transform: scale(0);
    transform: translateY(100%);
  }
  100% {
    transform: scale(1.07);
  }
}
</style>
