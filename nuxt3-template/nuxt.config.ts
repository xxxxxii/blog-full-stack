/*
 * @Author: yulinZ 1973329248@qq.com
 * @Date: 2022-11-12 02:38:49
 * @LastEditors: yulinZ 1973329248@qq.com
 * @LastEditTime: 2023-01-10 00:59:52
 * @FilePath: \nuxt3-template\nuxt.config.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// https://v3.nuxtjs.org/api/configuration/nuxt.config

import { loadEnv } from "vite";
import { resolve } from "pathe";
interface VITE_ENV_CONFIG {
  VITE_USER_ID: string;
  VITE_API_HOST: string;
  VITE_API_PREFFIX: string;
  VITE_PACK_ENV: string;
  VITE_PACK_URL: string;
}

const lifecycle = process.env.npm_lifecycle_event;
const envScript = process.env.npm_lifecycle_script.split(" ");
const envName = envScript[envScript.length - 1]; // 通过启动命令区分环境
const envData = loadEnv(envName, "env") as unknown as VITE_ENV_CONFIG;

console.log("当前环境：", envData);

export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      ...envData,
    },
  },

  modules: [
    "nuxt-icon",
    "@vueuse/nuxt",
    "@unocss/nuxt",
    "@vueuse/nuxt",
    "@nuxtjs/color-mode",
    "@pinia/nuxt",
  ],
  // publicRuntimeConfig: {
  //   axios: {
  //     baseURL:
  //       process.env.NODE_ENV === "production"
  //         ? "/api"
  //         : "http://localhost:4000/api",
  //   },
  // },
  // meta: {
  //   htmlAttrs: {
  //     lang: "zh-CN",
  //   },
  //   titleTemplate: "%s - blogyl.top",
  //   title: "blogyl.top",
  //   meta: [
  //     {
  //       name: "referrer",
  //       content: "no-referrer",
  //     },
  //     { name: "theme-color", content: "light" },

  //     {
  //       name: "viewport",
  //       content:
  //         "initial-scale=1,maximum-scale=1, minimum-scale=1, user-scalable=no",
  //     },
  //     {
  //       hid: "description",
  //       name: "description",
  //       content:
  //         "yl blog博客,主要用于记录日常想法，问题解决,日志,记录记录文章的一个nuxt网站",
  //     },
  //     {
  //       hid: "keywords",
  //       content: "yl blog博客,nuxt网站,nuxt3网站,vue网站,个人网站,yl blog网站",
  //     },
  //   ],
  //   link: [
  //     { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
  //     { type: "script", href: "/js/index.js" },
  //   ],
  // },
  plugins: [],
  vueuse: {
    ssrHandlers: true,
  },

  typescript: {
    shim: false,
  },
  css: [
    "~/assets/scss/main.scss",
    "@unocss/reset/tailwind.css",
    "element-plus/dist/index.css",
  ],
  colorMode: {
    classSuffix: "",
  },
  build: {
    extractCSS: true,
    transpile:
      lifecycle === "build" || lifecycle === "generate"
        ? ["element-plus"]
        : ["nuxt-icon"],
  },
  vite: {
    // server: {
    //   proxy: {
    //     "/blogApi": {
    //       target: "https://www.blogyl.top/blogApi",
    //       changeOrigin: true,
    //       rewrite: (path) => path.replace(/^\/blogApi/, ""),
    //     },
    //     "/api": {
    //       target: "http://127.0.0.1:4000",
    //       changeOrigin: true,
    //       rewrite: (path) => path.replace(/^\/api/, " "), // 重写路径把路径变成空字符
    //     },
    //   },
    // },
    // 生产环境移除console
    build: {
      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
    },
  },
});
