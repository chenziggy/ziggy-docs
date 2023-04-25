import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "ziggy-docs",
  description: "Z master document",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Book", link: "/computer/byte-order" },
    ],

    sidebar: [
      {
        text: "Computer",
        items: [
          { text: "字节序", link: "/computer/byte-order" },
          { text: "位图", link: "/computer/bitmap" },
        ],
      },
      {
        text: "Frontend",
        items: [
          { text: "keyboardEvent", link: "/frontend/keyboardEvent" },
          { text: "mask", link: "/frontend/mask" },
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
