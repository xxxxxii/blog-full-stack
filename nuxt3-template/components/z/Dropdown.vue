<!--
 * @Author: yulinZ 1973329248@qq.com
 * @Date: 2022-12-02 13:56:37
 * @LastEditors: yulinZ 1973329248@qq.com
 * @LastEditTime: 2022-12-06 21:52:04
 * @FilePath: \blog-full-stack\nuxt3-template\components\z\Dropdown.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="dropdown">
    <div>{{ items.name }}<Icon size="16" name="ep:arrow-down-bold" /></div>

    <ul class="dropdown-item">
      <div v-for="citem in items.children">
        <span>{{ citem.name }}</span>
        <li v-for="zitem in citem.children">
          <a :href="'/article/' + zitem.id">
            {{ zitem.title }}
          </a>
        </li>
      </div>
    </ul>
  </div>
</template>

<script setup>
defineProps({
  items: Object,
});
const isShow = ref(false);
</script>

<style scoped>
.dropdown {
  position: relative;
}
.dropdown > div {
  display: flex;
  align-items: center;
  justify-content: center;
}
.dropdown:hover .dropdown-item {
  display: block;
}
.dropdown:hover {
  height: 100%;
}
.dropdown-item {
  position: absolute;
  top: 100%;
  left: 0;
  color: var(--el-primary);

  display: none;
}
.dropdown-item span {
  padding: 5px;
}
.dropdown-item {
  @apply bg-opacity-30 bg-white dark:bg-gray-900 shadow-lg;
}
.dropdown-item li {
  padding: 0.3rem;
  transition: all 1s;
  white-space: nowrap;
  margin-left: 0.2rem;
}
.dropdown-item li:hover {
  color: var(--blue-2);
  border-radius: 5px;
}

@keyframes item-ani {
  0% {
    height: 0;
  }
  100% {
    height: 100%;
  }
}
</style>
