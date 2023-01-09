/*
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-10-16 17:17:23
 * @LastEditors: yulinZ 1973329248@qq.com
 * @LastEditTime: 2022-11-25 18:38:46
 * @FilePath: \vue3-element-admin\vite.config.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

import viteSetting from "./vite/vite";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: viteSetting(),
  server: {
    // host: true,
    // port: 3000,
    proxy: {
      "/blogApi": {
        target: "https://www.blogyl.top/blogApi",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/blogApi/, ""),
      },
      "/api": {
        target: "http://127.0.0.1:4000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, " "), // 重写路径把路径变成空字符
      },
    },
  },
  resolve: {
    alias: [{ find: "@", replacement: resolve(__dirname, "src") }],
  },
  envPrefix: ["APP_", "VITE_"],
});
