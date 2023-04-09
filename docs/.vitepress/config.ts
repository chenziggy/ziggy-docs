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
      { text: 'Computer', link: '/computer/computer' }
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
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
