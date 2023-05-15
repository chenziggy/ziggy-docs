import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/ziggy-docs",
  title: "ziggy-docs",
  description: "Z master document",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Book", link: "/computer/byteOrder" },
    ],

    sidebar: [
      {
        text: "Computer",
        items: [
          { text: "字节序", link: "/computer/byteOrder" },
          { text: "编码", link: "/computer/code" },
          { text: "位图", link: "/computer/bitmap" },
          { text: "流程图", link: "/computer/flowChart" },
          { text: "wsl", link: "/computer/wsl" },
          { text: "git", link: "/computer/git" },
          { text: "http cache", link: "/computer/httpCache" },
          { text: "regex", link: "/computer/regex" },
          { text: "设计模式", link: "/computer/designPattern" },
        ],
      },
      {
        text: "Frontend",
        items: [
          { text: "url", link: "/frontend/url" },
          {text: "异常捕获", link: "/frontend/errorHandler"},
          {text: "npm", link: "/frontend/npm"},
          {text: "axios", link: "/frontend/axios"},
          { text: "attrs-listeners-inheritAtrrs", link: "/frontend/attrsListenersInheritAtrrs" },
          { text: "keyboardEvent", link: "/frontend/keyboardEvent" },
          { text: "keyof", link: "/frontend/keyof" },
          { text: "svg path", link: "/frontend/svgPath" },
        ],
      },
      {
        text: "CSS",
        items: [
          { text: "width", link: "/css/width" },
          { text: "flex", link: "/css/flex" },
          { text: "var()", link: "/css/var()" },
          { text: "mask-image", link: "/css/maskImage" },
          { text: "background", link: "/css/background" },
        ]
      },
      {
        text: "Vue",
        items: [
          { text: "prop", link: "/vue/prop" },
          { text: "effectScope", link: "/vue/effectScope" },
        ]
      },
      {
        text: "Node",
        items: [{ text: "process.nextTick", link: "/node/nextTick" }],
      },
      {
        text: "C",
        items: [{ text: "FFERRTAG", link: "/c/fferrtag" }],
      },
      {
        text: "Examples",
        items: [{ text: "Runtime API Examples", link: "/api-examples" }],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});
