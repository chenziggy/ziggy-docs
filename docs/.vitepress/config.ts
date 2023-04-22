import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'ziggy-docs',
  description: 'Z master document',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' },
      { text: 'Computer', link: '/computer/computer' },
      { text: 'C', link: '/c/c' },
      { text: 'Node', link: '/node/node' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [{ text: 'Runtime API Examples', link: '/api-examples' }]
      },
      {
        text: 'Computer',
        items: [
          { text: '字节序', link: '/computer/byte-order' },
          { text: '位图', link: '/computer/bitmap' }
        ]
      },
      {
        text: 'Node',
        items: [{ text: 'process.nextTick', link: '/node/nextTick' }]
      },
      {
        text: 'C',
        items: [{ text: 'FFERRTAG', link: '/c/fferrtag' }]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
