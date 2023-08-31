# effectScope

## 背景
Vueuse 提供了一个函数 createSharedComposable  
作用：一个 composition 函数多个组件复用  

```js
import { createSharedComposable, useMouse } from '@vueuse/core'

const useSharedMouse = createSharedComposable(useMouse)

// CompA.vue
const { x, y } = useSharedMouse()

// CompB.vue - will reuse the previous state and no new event listeners will be registered
const { x, y } = useSharedMouse()
```
## createSharedComposable 源码
```js
export function createSharedComposable<Fn extends AnyFn>(composable: Fn): Fn {
  let subscribers = 0
  let state: ReturnType<Fn> | undefined
  let scope: EffectScope | undefined

  const dispose = () => {
    subscribers -= 1
    if (scope && subscribers <= 0) {
      scope.stop()
      state = undefined
      scope = undefined
    }
  }

  return <Fn>((...args) => {
    subscribers += 1
    if (!state) {
      scope = effectScope(true)
      state = scope.run(() => composable(...args))
    }
    tryOnScopeDispose(dispose)
    return state
  })
}
```
effectScope 的作用是什么？

## [RFC 0041-reactivity-effect-scope](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0041-reactivity-effect-scope.md)

这是 effectScope RFC ，初衷是为了抽象 setup 自动收集、注销 effect 这一特性，让这一特性在 component 之外也能使用

This RFC is trying to abstract the component's setup() effect collecting and disposing feature into a more general API that can be reused outside of the component model.
