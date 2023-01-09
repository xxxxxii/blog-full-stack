/*
 * @Author: yulinZ 1973329248@qq.com
 * @Date: 2022-09-11 17:47:25
 * @LastEditors: yulinZ 1973329248@qq.com
 * @LastEditTime: 2022-11-10 13:17:17
 * @FilePath: \vue3vite\tailwind.config.js
 * @Description:
 *
 * Copyright (c) 2022 by yulinZ 1973329248@qq.com, All Rights Reserved.
 */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    screens: {
      xs: { min: "300px", max: "639px" },
      sm: { min: "640px", max: "767px" },
      md: { min: "768px", max: "1023px" },
      lg: { min: "1024px", max: "1279px" },
      xl: { min: "1280px", max: "1535px" },
      "2xl": { min: "1536px" },
    },
    extend: {
      backgroundColor: {
        base: "var(--color-base)",
        dark: "var(--color-dark)",
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        muted: "var(--color-text-muted)",
      },
      textColor: {
        base: "var(--color-text-base)",
        muted: "var(--color-text-muted)",
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
      },
      borderColor: {
        base: "var(--color-border-base)",
      },
      shadowColor: {
        base: "var(--color-shadow-base)",
      },
      minWidth: {
        mobile: "350px",
      },
    },
  },
  plugins: [
    function ({ addBase }) {
      // addBase({
      //   ".el-button": {
      //     "background-color": "var(--el-button-bg-color,val(--el-color-white))",
      //   },
      // });
    },
  ],
};
