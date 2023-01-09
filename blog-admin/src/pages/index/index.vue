<!--
 * @Author: yulinZ 1973329248@qq.com
 * @Date: 2022-10-27 18:36:58
 * @LastEditors: yulinZ 1973329248@qq.com
 * @LastEditTime: 2022-11-11 17:58:02
 * @FilePath: \vue3-element-admin - 副本\src\pages\index\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="main-content main-box pt-5">
    <div
      class="left-box min-w-[250px] sm:min-w-[260px] md:min-w-[280px] lg:min-w-[300px] mr-4"
    >
      <div class="left-bg self-info">
        <div class="p-5 flex-column">
          <div>
            <el-avatar :size="100" :src="userData?.avatar" />
          </div>
          <div>
            {{ userData.username }}
          </div>
          <div>
            {{ userData.brief }}
          </div>
          <div class="text-left">
            <div class="flex">
              <i-ant-design-qq-circle-filled />:{{ userData.qq }}
            </div>
            <div class="flex">
              <i-mdi-email-check-outline />:{{ userData.email }}
            </div>
          </div>
        </div>
      </div>

      <div class="left-bg hot-article mt-2">
        <Hot />
      </div>

      <div class="left-bg mt-2">
        <div>最新消息</div>
        <div>
          <ul>
            <li>122</li>
            <li>122</li>
            <li>122</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="w-full">
      <!-- <Banner /> -->
      <New @clickItem="articleItemSet" />
      <!-- <Hot /> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { userInfo } from "@/api/api";
import Banner from "./components/banner.vue";
import Hot from "./components/hot.vue";
import New from "./components/new.vue";
import { useUserStore } from "@/stores/useUser";
const userStore = useUserStore();

const userData = ref({
  avatar: "",
  username: "",
  brief: "",
});
async function getUserInfo() {
  console.log(import.meta.env.APP_USER_ID);
  const res = await userInfo({ id: import.meta.env.APP_USER_ID });
  if (res.code == 200) {
    userData.value = res.data[0];
  }
}
getUserInfo();

const navInfo = ref();
function articleItemSet(val) {
  navInfo.value = val;
}
</script>

<style lang="scss" scoped>
.main-box {
  @apply flex  xs:flex-col-reverse lg:flex-row;
}
.left-box {
  @apply flex-initial xs:w-full sm:min-w-[250px] md:min-w-[300px];
}
.left-bg {
  @apply bg-slate-100 dark:bg-gray-700;
}
.hot-article {
  @apply bg-slate-100 dark:bg-gray-700;
}
.flex-column {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
