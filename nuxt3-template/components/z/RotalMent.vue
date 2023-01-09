<template>
  <div class="topbg">
    <nav class="menu">
      <input
        type="checkbox"
        v-model="checked"
        class="menu-toggler"
        id="menu_toggler"
      />
      <label for="menu_toggler"></label>
      <ul>
        <li class="menu-item" v-for="item in menu" :key="item?.id">
          <a @click="selectGroup(item)">
            <div class="menu-itemx">
              <Icon :name="item?.icon" />
              <div>{{ item?.name }}</div>
            </div>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { groupListDto } from "~~/types/public";
import ZTable from "@/components/z/Table.vue";

const checked = ref(false);

defineProps({
  menu: Array<groupListDto>,
});
if (process.client) {
  watch(
    checked,
    (newVal, oldVal) => {
      console.log(newVal);
      const menuList: any = document.querySelectorAll(".menu-item");
      const rotalEdg = 360 / menuList.length;
      if (newVal) {
        for (let i = 0; i < menuList.length; i++) {
          console.log(menuList[i].children[0]);
          menuList[i].children[0].style.transform = `rotate(${
            -rotalEdg * (i + 1)
          }deg)`;
          menuList[i].style.opacity = "1";
          menuList[i].style.transform = `rotate(${
            rotalEdg * (i + 1)
          }deg) translateX(-110px)`;
        }
      } else {
        for (let i = 0; i < menuList.length; i++) {
          menuList[i].style.opacity = "0";
          menuList[i].style.transform = `rotate(0deg) translateX(0px)`;
        }
      }
    },
    { deep: true }
  );
}

async function selectGroup(item: { id: number; name: string }) {
  const res = await articleByGroupId({ groupId: item.id });
  let resData = null;
  if (res.data.code == 200) {
    resData = res.data.data;
  }
  useDialog(h(ZTable, { list: resData }), item.name, {
    dangerouslyUseHTMLString: true,
    lockScroll: true,
    draggable: true,
  });
}
</script>

<style lang="scss" scoped>
.topbg {
  width: 100%;
  position: relative;
  height: 100%;

  .menu-toggler {
    position: absolute;
    display: block;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    margin: auto;
    width: 30px;
    height: 30px;
    opacity: 0;
    cursor: pointer;
  }

  .menu-toggler:hover + label,
  .menu-toggler:hover + label::before,
  .menu-toggler:hover + label::after {
    background: #fff;
  }

  .menu-toggler:checked + label {
    background: transparent;
  }

  .menu-toggler:checked + label::before,
  .menu-toggler:checked + label::after {
    top: 0;
    width: 30px;
    transform-origin: 50% 50%;
  }

  .menu-toggler:checked + label::before {
    transform: rotate(45deg);
  }

  .menu-toggler:checked + label::after {
    transform: rotate(-45deg);
  }
  .menu-toggler:checked ~ ul .menu-item a {
    pointer-events: auto;
  }

  .menu-toggler + label {
    width: 30px;
    height: 5px;
    display: block;
    z-index: 1;
    border-radius: 2.5px;
    background: rgba(255, 255, 255, 0.7);
    transition: transform 0.5s, top 0.5s;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    margin: auto;
    cursor: pointer;
  }

  .menu-toggler + label::before,
  .menu-toggler + label::after {
    cursor: pointer;
    width: 30px;
    height: 5px;
    display: block;
    z-index: 1;
    border-radius: 2.5px;
    background: rgba(255, 255, 255, 0.7);
    transition: transform 0.5s, top 0.5s;
    content: "";
    position: absolute;
    left: 0;
  }

  .menu-toggler + label::before {
    top: 10px;
  }

  .menu-toggler + label::after {
    top: -10px;
  }
  .menu-toggler:checked .menu-item {
    border-radius: 50%;
    background: #000;
  }
  .menu-item {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 80px;
    height: 80px;
    opacity: 0;
    transition: 0.5s;
  }
  .menu-itemx {
    display: flex;
    width: inherit;
    height: inherit;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
  .menu-item a {
    display: block;
    width: inherit;
    height: inherit;
    color: rgba(255, 255, 255, 0.7);
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    text-align: center;
    text-decoration: none;
    font-size: 12px;
    pointer-events: none;
    transition: 0.2s;
  }

  .menu-item a:hover {
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.3);
    color: #fff;
    background: rgba(255, 255, 255, 0.3);
    font-size: 14px;
  }
}
</style>
