<!--
 * @Author: yulinZ 1973329248@qq.com
 * @Date: 2022-11-12 03:09:36
 * @LastEditors: yulinZ 1973329248@qq.com
 * @LastEditTime: 2022-12-07 15:59:16
 * @FilePath: \nuxt3-template\layouts\default.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="body w-full relative">
    <header>
      <LazyClientOnly>
        <PageHeader />
      </LazyClientOnly>
    </header>
    <div class="warpper relative min-h-full">
      <keep-alive>
        <slot />
      </keep-alive>
    </div>
    <LazyClientOnly>
      <Footer />
    </LazyClientOnly>
  </div>
</template>
