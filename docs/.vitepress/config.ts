import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/ziggy-docs",
  title: "ziggy-docs",
  description: "Stay hungry stay foolish",
  head: [
    ['link', { rel: "shortcut icon", href: "/img/favicon.ico"}],
  ],
  themeConfig: {
    // logo: '/avatar.png',
    // https://vitepress.dev/reference/default-theme-config
    "search": {
      provider: 'local'
    },
    nav: [
      { text: "Home", link: "/" },
      { text: "Computer", link: "/computer/code" },
      { text: "Frontend", link: "/frontend/url" },
      { text: "CSS", link: "/css/width" },
      { text: "Vue", link: "/vue/prop" },
      { text: "Node", link: "/node/nextTick" },
      { text: "C", link: "/c/fferrtag" },
    ],

    sidebar: {
      "/computer/": [
        {
          text: "Computer",
          items: [
            { text: "编码", link: "/computer/code" },
            { text: "字节序", link: "/computer/byteOrder" },
            { text: "位图", link: "/computer/bitmap" },
            { text: "流程图", link: "/computer/flowChart" },
            { text: "代理", link: "/computer/proxy" },
            { text: "wsl", link: "/computer/wsl" },
            { text: "docker", link: "/computer/docker" },
            { text: "git", link: "/computer/git" },
            { text: "http cache", link: "/computer/httpCache" },
            { text: "http header", link: "/computer/httpHeader" },
            { text: "http request body", link: "/computer/httpRequestBody" },
            { text: "regex", link: "/computer/regex" },
            { text: "时间", link: "/computer/time" },
            { text: "设计模式", link: "/computer/designPattern" },
          ],
        },
      ],
      "/frontend/": [
        {
          text: "Frontend",
          items: [
            { text: "url", link: "/frontend/url" },
            { text: "module", link: "/frontend/module" },
            {text: "异常捕获", link: "/frontend/errorHandler"},
            {text: "npm", link: "/frontend/npm"},
            {text: "axios", link: "/frontend/axios"},
            { text: "keyboardEvent", link: "/frontend/keyboardEvent" },
            { text: "keyof", link: "/frontend/keyof" },
            { text: "svg path", link: "/frontend/svgPath" },
            { text: "proxy", link: "/frontend/proxy" },
            { text: "class", link: "/frontend/class" },
            { text: "iterator", link: "/frontend/iterator" },
            { text: "作用域", link: "/frontend/scope" },
            { text: "函数", link: "/frontend/function" },
            { text: "es6数据结构", link: "/frontend/es6DataStructure" },
            { text: "树", link: "/frontend/tree" },
            { text: "垃圾回收机制", link: "/frontend/garbage" },
          ],
        },
      ],
      '/css/': [
        {
          text: "CSS",
          items: [
            { text: "width", link: "/css/width" },
            { text: "flex", link: "/css/flex" },
            { text: "var()", link: "/css/var()" },
            { text: "mask-image", link: "/css/maskImage" },
            { text: "background", link: "/css/background" },
            { text: "vertical-align", link: "/css/verticalAlign" },
          ]
        },
      ],
      '/vue/': [
        {
          text: "Vue",
          items: [
            { text: "prop", link: "/vue/prop" },
            { text: "reactive", link: "/vue/reactive" },
            { text: "attrs-listeners-inheritAtrrs", link: "/vue/attrsListenersInheritAtrrs" },
            { text: "effectScope", link: "/vue/effectScope" },
          ]
        },
      ],
      '/node/': [
        {
          text: "Node",
          items: [{ text: "process.nextTick", link: "/node/nextTick" }],
        },
      ],
      "/c/": [
        {
          text: "C",
          items: [{ text: "FFERRTAG", link: "/c/fferrtag" }],
        },
      ]
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/chenziggy/ziggy-docs" },
    ],
  },
});
