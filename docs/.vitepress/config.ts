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
      { text: 'computer', link: '/computer/computer' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [{ text: 'Runtime API Examples', link: '/api-examples' }]
      },
      {
        text: 'Computer',
        items: [{ text: 'Byte Order', link: '/computer/byte-order' }]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
