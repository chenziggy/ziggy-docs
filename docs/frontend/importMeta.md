# import.meta

import.meta 是 ECMAScript（JavaScript）中的一个特殊属性，用于获取当前模块相关的元数据信息

import.meta 允许开发者在模块中访问关于当前模块的元数据

```js
console.log(import.meta)
// { url: 'http://localhost:5173/ziggy-docs/frontend/importMeta.md?import&t=1688655821896' }
```

:::tip
用户可以给当前模块自定义属性，例如 import.meta.cold = 'cold!!'
:::

## import.meta.hot
vite 热更新模块，所有 ESM 都有这个属性

在构建工具 vite 中启动时，plugins importAnalysis -> transform 时，会对每一个模块注入 `import.meta.hot` HMR 模块
```js
// packages/vite/src/node/plugins/importAnalysis.ts
async function transform(source, importer, options) {
  // ...
  if (hasHMR && !ssr) {
    // inject hot context
    str().prepend(
      `import { createHotContext as __vite__createHotContext } from "${clientPublicPath}";`
        + `import.meta.hot = __vite__createHotContext(${JSON.stringify(
          normalizeHmrUrl(importerModule.url),
        )});`
    )
  }
  // ...
}
```

```js
// packages/vite/src/client/client.ts
export function createHotContext(ownerPath: string): ViteHotContext {
  // ...
  const hot: ViteHotContext = {
    get data() {
      return dataMap.get(ownerPath)
    },

    accept(deps?: any, callback?: any) {
      if (typeof deps === 'function' || !deps) {
        // self-accept: hot.accept(() => {})
        acceptDeps([ownerPath], ([mod]) => deps?.(mod))
      }
      else if (typeof deps === 'string') {
        // explicit deps
        acceptDeps([deps], ([mod]) => callback?.(mod))
      }
      else if (Array.isArray(deps)) {
        acceptDeps(deps, callback)
      }
      else {
        throw new TypeError('invalid hot.accept() usage.')
      }
    },
    // ...
  }

  return hot
}
```