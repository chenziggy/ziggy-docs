// https://vitepress.dev/guide/custom-theme
import { watch } from 'vue'
import Theme from 'vitepress/theme'
import './rainbow.css'
import './vars.css'
import './overrides.css'


export default {
  ...Theme,
  enhanceApp({ router }) {
    if (typeof window === 'undefined')
      return

      watch(
        () => router.route.data.relativePath,
        () => {
          return updateHomePageStyle(location.pathname === '/ziggy-docs/')
        },
        { immediate: true },
      )
  },
 
}

let homePageStyle: HTMLStyleElement | undefined

// Speed up the rainbow animation on home page
function updateHomePageStyle(value: boolean) {
  if (value) {
    if (homePageStyle)
      return

    homePageStyle = document.createElement('style')
    homePageStyle.innerHTML = `
    :root {
      animation: rainbow 6s linear infinite;
    }`
    document.body.appendChild(homePageStyle)
  }
  else {
    if (!homePageStyle)
      return

    homePageStyle.remove()
    homePageStyle = undefined
  }
}
