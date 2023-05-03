import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
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
        ],
      },
      {
        text: "Frontend",
        items: [
          {text: "异常捕获", link: "/frontend/errorHandler"},
          { text: "attrs-listeners-inheritAtrrs", link: "/frontend/attrsListenersInheritAtrrs" },
          { text: "flex", link: "/frontend/flex" },
          { text: "width", link: "/frontend/width" },
          { text: "keyboardEvent", link: "/frontend/keyboardEvent" },
          { text: "keyof", link: "/frontend/keyof" },
          { text: "var()", link: "/frontend/var()" },
          { text: "mask", link: "/frontend/mask" },
          { text: "svg path", link: "/frontend/svgPath" },
          { text: "prop", link: "/frontend/prop" },
        ],
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
