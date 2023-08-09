import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/ziggy-docs',
  title: 'ziggy-docs',
  description: 'Stay hungry stay foolish',
  head: [
    ['link', { rel: 'shortcut icon', href: '/ziggy-docs/img/favicon.ico' }],
  ],
  ignoreDeadLinks: true,
  themeConfig: {
    // logo: '/avatar.png',
    // https://vitepress.dev/reference/default-theme-config
    search: {
      provider: 'local',
    },
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Computer', link: '/computer/code' },
      { text: 'Frontend', link: '/frontend/url' },
      { text: 'CSS', link: '/css/width' },
      { text: 'Vue', link: '/vue/prop' },
      { text: 'Algorithm', link: '/algorithm/arrayQuery' },
      { text: 'Node', link: '/node/nextTick' },
      { text: 'Other', link: '/other/fferrtag' },
    ],

    sidebar: {
      '/computer/': [
        {
          text: 'Computer',
          items: [
            { text: '编码', link: '/computer/code' },
            { text: '字节序', link: '/computer/byteOrder' },
            { text: '位图', link: '/computer/bitmap' },
            { text: '流程图', link: '/computer/flowChart' },
            { text: '代理', link: '/computer/proxy' },
            { text: 'wsl', link: '/computer/wsl' },
            { text: 'docker', link: '/computer/docker' },
            { text: 'nginx', link: '/computer/nginx' },
            { text: 'git', link: '/computer/git' },
            { text: 'http cache', link: '/computer/httpCache' },
            { text: 'http 发展历史', link: '/computer/httpHistory' },
            { text: 'http 队头阻塞', link: '/computer/headOfLineBlock' },
            { text: 'http 报文结构', link: '/computer/httpMessage' },
            { text: 'http header', link: '/computer/httpHeader' },
            { text: 'http status code', link: '/computer/httpStatusCode' },
            { text: 'http request body', link: '/computer/httpRequestBody' },
            { text: 'regex', link: '/computer/regex' },
            { text: 'regex demo', link: '/computer/regexDemo' },
            { text: '时间', link: '/computer/time' },
            { text: '设计模式', link: '/computer/designPattern' },
            { text: '二进制协议和文本协议', link: '/computer/protocol' },
            { text: '跨域', link: '/computer/corsOrigin' },
          ],
        },
      ],
      '/frontend/': [
        {
          text: 'Frontend',
          items: [
            { text: 'v8引擎编译', link: '/frontend/v8Compile' },
            { text: 'url', link: '/frontend/url' },
            { text: 'history', link: '/frontend/history' },
            { text: 'module', link: '/frontend/module' },
            { text: '异常捕获', link: '/frontend/errorHandler' },
            { text: '浏览器存储', link: '/frontend/application' },
            { text: '执行上下文', link: '/frontend/executionContext' },
            { text: 'npm', link: '/frontend/npm' },
            { text: 'pnpm', link: '/frontend/pnpm' },
            { text: 'vite&rollup', link: '/frontend/viteRollup' },
            { text: 'axios', link: '/frontend/axios' },
            { text: 'keyboardEvent', link: '/frontend/keyboardEvent' },
            { text: 'keyof', link: '/frontend/keyof' },
            { text: 'ts常见类型', link: '/frontend/es5.d.ts.md' },
            { text: 'svg path', link: '/frontend/svgPath' },
            { text: 'proxy', link: '/frontend/proxy' },
            { text: 'class', link: '/frontend/class' },
            { text: '原型', link: '/frontend/prototype' },
            { text: 'object', link: '/frontend/object' },
            { text: 'reflect', link: '/frontend/reflect' },
            { text: 'iterator', link: '/frontend/iterator' },
            { text: '作用域', link: '/frontend/scope' },
            { text: '变量提升', link: '/frontend/hoisting' },
            { text: '函数', link: '/frontend/function' },
            { text: '柯里化', link: '/frontend/currying' },
            { text: '函数重载', link: '/frontend/overload' },
            { text: 'es6数据结构', link: '/frontend/es6DataStructure' },
            { text: 'babel', link: '/frontend/babel' },
            { text: 'blob', link: '/frontend/blob' },
            { text: 'node_modules debug', link: '/frontend/nodeModulesDebug' },
            { text: 'import.meta', link: '/frontend/importMeta' },
            { text: '前端安全', link: '/frontend/frontSafety' },
            { text: 'rxjs', link: '/frontend/rxjs' },
            { text: '防抖节流', link: '/frontend/debounceThrottle' },
          ],
        },
      ],
      '/css/': [
        {
          text: 'CSS',
          items: [
            { text: '浏览器渲染', link: '/css/browserRender' },
            { text: 'width', link: '/css/width' },
            { text: 'flex', link: '/css/flex' },
            { text: 'var()', link: '/css/var()' },
            { text: 'mask-image', link: '/css/maskImage' },
            { text: 'background', link: '/css/background' },
            { text: 'vertical-align', link: '/css/verticalAlign' },
            { text: 'stacking order', link: '/css/stackingOrder' },
            { text: '级联 继承', link: '/css/cascading' },
            { text: 'bfc', link: '/css/bfc' },
          ],
        },
      ],
      '/vue/': [
        {
          text: 'Vue',
          items: [
            { text: 'prop', link: '/vue/prop' },
            { text: 'reactive', link: '/vue/reactive' },
            { text: 'attrs-listeners-inheritAtrrs', link: '/vue/attrsListenersInheritAtrrs' },
            { text: 'effectScope', link: '/vue/effectScope' },
          ],
        },
      ],
      '/algorithm/': [
        {
          text: 'Algorithm',
          items: [
            { text: '树', link: '/algorithm/tree' },
            { text: '树深度优先', link: '/algorithm/treeDfs' },
            { text: '树广度优先', link: '/algorithm/treeBfs' },
            { text: '图', link: '/algorithm/map' },
            { text: '数组query', link: '/algorithm/arrayQuery' },
            { text: '数组reduce', link: '/algorithm/arrayReduce' },
            { text: 'Array转Tree', link: '/algorithm/arrayToTree' },
            { text: 'Array去重', link: '/algorithm/arrayDeduplicate' },
            { text: 'Array交集、差集', link: '/algorithm/arrayCollect' },
            { text: 'LRU', link: '/algorithm/lru' },
            { text: '复杂度', link: '/algorithm/complexity' },
            { text: '分治算法', link: '/algorithm/divideConquer' },
            { text: '快速排序', link: '/algorithm/quickSort' },
            { text: '归并排序', link: '/algorithm/mergeSort' },
            { text: '贪心算法', link: '/algorithm/greedy' },
            { text: '动态规划', link: '/algorithm/dynamicProgramming' },
            { text: '最长回文子串', link: '/algorithm/longestPalindromicSubstring' },
          ],
        },
      ],
      '/node/': [
        {
          text: 'Node',
          items: [
            { text: '事件循环', link: '/node/eventLoop' },
            { text: 'process.nextTick', link: '/node/nextTick' },
            { text: '垃圾回收机制', link: '/node/garbage' },
          ],
        },
      ],
      '/other/': [
        {
          text: 'Other',
          items: [
            { text: '视频预览', link: '/other/videoFramePreview' },
            { text: 'FFERRTAG', link: '/other/fferrtag' },
            { text: 'input.value', link: '/other/input' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/chenziggy/ziggy-docs' },
    ],
  },
})
