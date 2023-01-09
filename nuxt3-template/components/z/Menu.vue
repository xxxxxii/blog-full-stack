<!--
 * @Author: yulinZ 1973329248@qq.com
 * @Date: 2022-11-12 04:08:20
 * @LastEditors: yulinZ 1973329248@qq.com
 * @LastEditTime: 2022-12-06 21:59:20
 * @FilePath: \nuxt3-template\components\z\Menu.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="flex flex-row items-center mr-4">
    <a
      :href="item.path ? item.path : '#'"
      class="hidden md:block menu-items text-[#1e90ff] mr-4 cursor-pointer hover:( !bg-blue-200 !rounded-md)"
      v-for="(item, index) in menus"
      :key="index"
    >
      <div v-if="!item.children">
        <div class="w-full px-2 py-1">
          {{ item.name }}
        </div>
        <div :class="{ active: route.fullPath == item.path }"></div>
      </div>
      <div v-else>
        <ZDropdown class="p-2 py-1" :items="item" />
      </div>
    </a>
  </div>
</template>

<script setup lang="ts">
interface menuDot {
  path?: string;
  children?: Array<menuDot>;
  name: string;
}
defineProps({
  menus: [Array<menuDot>],
});
const route = useRoute();
</script>

<style lang="scss" scoped>
.active {
  border-bottom: 2px solid red;
  animation: active-ani 2s;
}

@keyframes active-ani {
  0% {
    width: 0;
  }
  100% {
    width: 100%;
  }
}
.menu-items {
  font-size: 16px;
}
</style>
