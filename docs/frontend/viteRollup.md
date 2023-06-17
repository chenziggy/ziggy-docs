# vite & rollup

## vite

### base
开发或生产环境服务的`公共基础路径`
* 绝对 URL 路径名，例如 /foo/
* 完整的 URL，例如 https://foo.com/
* 空字符串或 ./（用于嵌入形式的开发）
:::tip
JS 引入的资源 URL，CSS 中的 url() 引用以及 .html 文件中引用的资源在构建过程中都会自动调整，以适配此选项
:::
全局注入的 import.meta.env.BASE_URL，它的值为`公共基础路径`，这个变量会在构建时被静态替换


### resolve

#### alias
用文件系统路径的别名
```js
 resolve: {
    alias: {
      '@': '/src'
    }
  }
```

### build

#### minify
`boolean | 'terser' | 'esbuild'`

指定使用哪种混淆器

* false 关闭混淆


#### rollupOptions
查看 [rollup](#rollup) 配置

### plugins

### 虚拟模块
虚拟模块在 vite 中都以 `virtual:` 为浅醉，
对ESM 语法的源文件传入编译时信息，`node_modules` 中并不存在 `virtual:my-module` 依赖
```js
import { msg } from 'virtual:my-module'

console.log(msg)
```
vite 启动时注册插件 myPlugin，在解析源码 `virtual:my-module` 时，
```js
// my-plugin.js
export default function myPlugin() {
  const virtualModuleId = 'virtual:my-module'
  const resolvedVirtualModuleId = '\0' + virtualModuleId

  return {
    name: 'my-plugin', // 必须的，将会在 warning 和 error 中显示
    // 定义自定义解析器
    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId
      }
    },
    load(id) {
      if (id === resolvedVirtualModuleId) {
        return `export const msg = "from virtual module"`
      }
    },
  }
}
```




## rollup

### output
输出选项

#### exports
`"auto" | "default"| "named"| "none"`

指定导出模式，默认是 auto，指根据 input 模块导出推测你的意图

:::tip
* input 为 index.html 时，没有导出，auto 推测为 none
* default 默认导出具体值、变量或函数而非[命名空间](./module#命名空间)
```js
// your-lib 包入口
export default 'Hello world';

// CommonJS 消费者
/* require( "your-lib" ) 返回 "Hello World" */
const hello = require('your-lib');
```

* named 适用于 CommonJs
```js
// your-lib 包入口
export const hello = 'Hello world';

// CommonJS 消费者
/* require( "your-lib" ) 返回 {hello: "Hello World"} */
const hello = require('your-lib').hello;
/* 或使用解构 */
const { hello } = require('your-lib');
```
:::

#### minifyInternalExports
es格式下，把内部变量导出为单个字母的变量
```js
// a.js 源文件
export { registerApp } from

// a.js 输出文件
export { registerApp as r }

// b.js 引入文件
import { r as regsiterApp } './b.js'
```

#### manualChunks
`{ [chunkAlias: string]: string[] } | ((id: string, {getModuleInfo, getModuleIds}) => string | void)`

创建自定义的公共 [chunk](./module#chunk)

```js
manualChunks: {
  'entry': ['/src/entry.js']
}

manualChunks(id) {
  if (id.includes("entry")) {
    return "entry";
  }
}
```

#### chunkFileNames
`string | ((chunkInfo: ChunkInfo) => string)`

对代码分割中产生的 chunk 自定义命名
```js
chunkFileNames( chunkInfo) {
  if (chunkInfo.name==='entry') {
    return "assets/[name].js"
  }
  return "assets/[name]-[hash].js"
}
```

#### assetFileNames

### plugins

#### 常见插件
* @rollup/plugin-node-resolve 定位 `node_modules` 中第三方库依赖
* @rollup/plugin-commonjs 转化 CommonJS 为 ESM

#### 钩子
启动时被调用：

* options
* buildStart

每个传入模块请求时被调用：

* resolveId
* load
* transform
* moduleParsed 

关闭时被调用：

* buildEnd
* closeBundle

#### 构建钩子
![图例](/img/rollup_hookLegend.png)
![构建](/img/rollup_buildHook.png)
#### 输出生成钩子
![图例](/img/rollup_outputHook.png)