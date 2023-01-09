<!--
 * @Author: yulinZ 1973329248@qq.com
 * @Date: 2022-11-11 20:25:56
 * @LastEditors: yulinZ 1973329248@qq.com
 * @LastEditTime: 2022-12-08 16:04:25
 * @FilePath: \blog-full-stack\nuxt3-ts-app\components\PageHeader.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <NavBg class="w-full">
    <div class="" v-show="!downScroll">
      <div class="top-bar w-full fixed">
        <div class="container mx-5 flex flex-row">
          <div
            class="flex flex-row align-middle justify-center w-[40px] h-[40px]"
          >
            <!-- <LazyClientOnly> -->
            <el-image
              class="logo flex-none"
              src="https://s1.vika.cn/space/2022/11/14/fdfc4f71cc76486cb2e598a4cc3f137e"
            />
            <!-- </LazyClientOnly> -->
          </div>

          <div class="w-full flex justify-end items-center dark:text-light-800">
            <ZMenu :menus="menus" />

            <div class="md:hidden mr-3" @click="visible = true">
              <Icon size="32" color="#1e90ff" name="carbon:menu" />
            </div>
            <DarkToggle />
          </div>
        </div>

        <Teleport to="body">
          <el-drawer v-model="visible" :show-close="false" size="auto">
            <template #header="{ close, titleId, titleClass }">
              <div class="flex flex-col">
                <div v-for="item in menus" :key="item?.path" class="my-2">
                  <a :href="item.path">
                    <el-button
                      v-if="!item.children"
                      @click="close"
                      :type="$route.path == item.path ? 'primary' : 'default'"
                    >
                      {{ item.name }}
                    </el-button>
                    <div v-else>
                      <el-dropdown :hide-on-click="false">
                        <el-button
                          >{{ item.name
                          }}<Icon size="16" name="ep:arrow-down-bold"
                        /></el-button>
                        <template #dropdown>
                          <div v-for="citem in item!.children">
                            <span>{{ item.name }}</span>
                            <el-dropdown-menu>
                              <el-dropdown-item v-for="vitem in citem.children">
                                <a :href="'/article/' + vitem!.id">
                                  {{ vitem.title }}
                                </a>
                              </el-dropdown-item>
                            </el-dropdown-menu>
                          </div>
                        </template>
                      </el-dropdown>
                    </div>
                  </a>
                </div>
              </div>
            </template>
          </el-drawer>
        </Teleport>
      </div>
    </div>

    <ToTop
      v-if="toTopShow"
      class="m-3 fixed z-50 right-1 bottom-5 duration-150"
    />
  </NavBg>
</template>

<script setup lang="ts">
import { ElButton, ElDrawer, ElImage, ElAffix } from "element-plus";
const downScroll = ref(false);
const oldScrollTop = ref(0);
const toTopShow = ref(false);
if (process.client) {
}
window.addEventListener("scroll", handleScroll);
function handleScroll() {
  let scrollTop =
    window.pageYOffset ||
    document.documentElement.scrollTop ||
    document.body.scrollTop;
  // 滚动条滚动的距离
  let scrollStep = scrollTop - oldScrollTop.value;
  // 更新——滚动前，滚动条距文档顶部的距离
  oldScrollTop.value = scrollTop;
  if (scrollStep < 0) {
    console.log("滚动条向上滚动了！");
    downScroll.value = false;
  } else {
    downScroll.value = true;
    console.log("滚动条向下滚动了！");
  }
  if (scrollTop > 300) {
    toTopShow.value = true;
  } else {
    toTopShow.value = false;
  }
}

const menuOptions = [
  {
    label: "我的信息",
    key: "account",
  },
  {
    label: "退出",
    key: "logout",
  },
];

const menus: any = ref([
  { name: "首页", path: "/" },

  { name: "关于我", path: "/about" },
]);
const userConfig = useRuntimeConfig();
const { VITE_USER_ID } = userConfig.public;
async function setMenus() {
  const res = await getPlugins({ id: VITE_USER_ID });
  menus.value.splice(1, 0, res.data.data);
  console.log(menus.value);
}
setMenus();
const visible = ref(false);
</script>

<style lang="scss" scoped>
.logo {
  width: 40px;
  height: 40px;
}
.mobel-modal {
  background: red;
}
:deep(.el-drawer) {
  background-color: red !important;
}

.right-content {
  @apply flex flex-row items-center justify-center ml-auto;
}
.bg {
  @apply bg-gray-600 w-screen h-screen z-20 opacity-75  absolute left-0 top-0;
}
</style>
