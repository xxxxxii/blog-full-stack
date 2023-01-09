<!--
 * @Author: yulinZ 1973329248@qq.com
 * @Date: 2022-11-27 23:25:05
 * @LastEditors: yulinZ 1973329248@qq.com
 * @LastEditTime: 2022-12-08 17:14:55
 * @FilePath: \blog-full-stack\nuxt3-template\components\z\Search.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="container">
    <input
      placeholder="Enter to search..."
      required=""
      class="input bg-dark dark:bg-gray-800"
      name="text"
      type="text"
      v-model="keyWords"
      @keyup.enter.native="handleSeach"
    />
    <div class="icon">
      <svg
        viewBox="0 0 512 512"
        class="ionicon"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Search</title>
        <path
          stroke-width="32"
          stroke-miterlimit="10"
          stroke="currentColor"
          fill="none"
          d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z"
        ></path>
        <path
          d="M338.29 338.29L448 448"
          stroke-width="32"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke="currentColor"
          fill="none"
        ></path>
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus";
import ZTable from "@/components/z/Table.vue";

const keyWords = ref(null);
async function handleSeach(e: KeyboardEvent) {
  console.log(e);
  if (e.charCode === 13) {
    if (!keyWords.value) {
      ElMessage.error("请输入搜索关键字");
      return;
    }
    const { data } = await getArticle({
      keyWord: keyWords.value,
    });
    if (data.code == 200) {
      useDialog(h(ZTable, { list: data.data }), "KeyWord " + keyWords.value, {
        dangerouslyUseHTMLString: true,
        lockScroll: true,
        draggable: true,
      });
    }
  }
}
window.addEventListener("keypress", handleSeach);
</script>

<style scoped>
.container {
  position: relative;
  --size-button: 40px;
}

.input {
  padding-left: var(--size-button);
  height: var(--size-button);
  font-size: 15px;
  border: none;
  color: #fff;
  outline: none;
  width: var(--size-button);
  transition: all ease 0.3s;
  border-radius: 50px;
  cursor: pointer;
}

.input:focus,
.input:not(:invalid) {
  width: 200px;
  cursor: text;
  box-shadow: 0px 0px 0px #0e0e0e, 0px 0px 0px rgb(95 94 94 / 25%),
    inset 1.5px 1.5px 3px #0e0e0e, inset -1.5px -1.5px 3px #5f5e5e;
}

.input:focus + .icon,
.input:not(:invalid) + .icon {
  pointer-events: all;
  cursor: pointer;
}

.container .icon {
  position: absolute;
  width: var(--size-button);
  height: var(--size-button);
  top: 0;
  left: 0;
  padding: 8px;
  pointer-events: none;
}

.container .icon svg {
  width: 100%;
  height: 100%;
}
</style>
