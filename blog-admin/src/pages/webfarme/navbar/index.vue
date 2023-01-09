<template>
  <div class="box" ref="nav">
    <div class="nav-bw sm:ml-5 sm:mr-5">
      <ul class="nav-bar">
        <li class="text-slate-200">
          <img class="logo" :src="logoPath" mode="aspectFill" />yulinZ blog
        </li>
      </ul>
      <ul class="nav-bar text-blue-400">
        <li v-if="isMobel" class="nav-menu-icon" @click.stop="navMenuTap">
          <i-ant-design-bars-outlined
            class="menu-icon cursor-pointer duration-300"
            style="font-size: 20px"
            v-if="!showMobelMenu"
          />
          <i-ant-design-close-outlined
            style="font-size: 20px"
            class="menu-icon cursor-pointer duration-300"
            v-else
          />
        </li>
        <li
          v-else
          class="nav-item"
          v-for="(item, index) in dataItem"
          @click="navItemClick(item, index)"
          :key="index"
          :class="item.path === currentItem ? 'current' : 'no-current'"
        >
          {{ item.name }}
        </li>
        <li class="nav-item">
          <theme />
        </li>
      </ul>
      <!-- <ul class="nav-bar text-white dark:text-blue-400">
        <li>
          <theme />
        </li>
        <li class="nav-item">登录</li>
      </ul> -->
    </div>

    <div v-show="showMobelMenu" class="mask">
      <div class="mobel-menu">
        <ul class="nav-mobel text-white dark:text-blue-400">
          <li
            class="nav-item"
            v-for="(item, index) in dataItem"
            @click="navItemClick(item, index)"
            :key="index"
            :class="item.path === currentItem ? 'current' : 'no-current'"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>
      <div></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import logoPath from "@/assets/logo.png";
const props = defineProps({
  dataItem: {
    type: Array,
    default: [
      {
        name: "首页",
        path: "/index",
      },
      {
        name: "关于我",
        path: "/aboutme",
      },
      {
        name: "管理",
        path: "/login",
      },
    ],
  },
});
const windowWidth = ref(document.documentElement.clientWidth);
const isMobel = ref(false);
const showMobelMenu = ref(false);
const currentItem = ref(props.dataItem[0].path);

function setNav() {
  if (windowWidth.value < 768) {
    isMobel.value = true;
    console.log("isMobel");
  } else {
    isMobel.value = false;
  }
}

watch(windowWidth, (newVal, oldVal) => {
  console.log(newVal, oldVal);
  setNav();
});

onMounted(() => {
  setNav();
  document.addEventListener("click", outClick);
  window.onresize = () => {
    windowWidth.value = document.documentElement.clientWidth;
  };
});

function outClick(e) {
  if (e.target.className != "mobel-menu") {
    showMobelMenu.value = false;
    let body = document.querySelector("body");
    let html = document.querySelector("html");
    body.style.overflowY = "auto";
    html.style.overflowY = "auto";
    return;
  }
}

function navMenuTap(e) {
  showMobelMenu.value = !showMobelMenu.value;
  let body = document.querySelector("body");
  let html = document.querySelector("html");
  if (showMobelMenu.value) {
    body.style.overflowY = "hidden";
    html.style.overflowY = "hidden";
  } else {
    body.style.overflowY = "auto";
    html.style.overflowY = "auto";
  }
}
const emits = defineEmits();
const router = useRouter();
function navItemClick(item, index) {
  emits("itemClick", item);
  router.push(item.path);
  currentItem.value = item.type;
}
</script>
<style lang="scss" scoped>
.nav-bw {
  display: flex;
  justify-content: space-between;
}
.current {
  // border: red 1px solid;
  // background-color: #007AFF;
  border-bottom: 3px solid red;
  // border-radius: 10px;
  // transition: all 1s;
  // animation: show 0.5 keywords;
}
@keyframes show {
  0% {
    background-color: #007aff;
  }

  100% {
    background-color: #18bc37;
  }
}
.no-current {
  // border: 1px solid #C0C0C0;
  border-bottom: 3px solid rgba($color: #000000, $alpha: 0);
}
ul {
  list-style: none;
  padding: 0;
}
.nav-mobel {
  display: flex;
  flex-direction: column;
  .nav-item,
  .nav-menu-icon {
    margin: 3px 5px;
    padding: 8px 15px;
    // color: #ffffff;
    // border-bottom: 3px solid #007AFF;
    cursor: pointer;
  }
}
.nav-bar {
  display: flex;
  li {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .nav-item,
  .nav-menu-icon {
    margin: 3px 5px;
    padding: 0 10px;
    // color: #ffffff;
    // border-bottom: 3px solid #007AFF;
    cursor: pointer;
  }
  // .nav-item:hover{
  //     background-color: #00BFFF;
  // }
}

.nav-menu-icon:hover {
  // background-color: #00BFFF;
  border-radius: 10px;
  transition: all 1s;
}
.logo {
  width: 38px;
  height: 38px;
  margin: 4px;
  border-radius: 5px;
  object-fit: cover;
}
.box {
  // background-color: #007aff;
  position: relative;
}
.mask {
  // display: flex;
  position: absolute;
  left: 0;
  top: 46px;
  z-index: 999;
  height: 100vh;
  width: 100%;
  // background: #0081FF;
}
.mobel-menu {
  // height: calc(100% - 46px);
  background-color: rgba($color: #000000, $alpha: 0.2);
}
@keyframes show {
  0% {
    height: 0;
  }

  100% {
    height: 100%;
  }
}
</style>
