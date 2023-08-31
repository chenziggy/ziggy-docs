# 响应式

## vue2
当你把一个普通的 JavaScript 对象传入 Vue 实例作为 data 选项，Vue 将遍历此对象所有的 property，并使用 Object.defineProperty 把这些 property 全部转为 getter/setter。
每个组件实例都对应一个 watcher 实例，它会在组件渲染的过程中把“接触”过的数据 property 记录为依赖。之后当依赖项的 setter 触发时，会通知 watcher，从而使它关联的组件重新渲染

### 实现
```js
class Dep {
  constructor() {
    this.subscribers = new Set()
  }

  depend() {
    if (activeUpdate)
      this.subscribers.add(activeUpdate)

  }

  notify() {
    this.subscribers.forEach(sub => sub())
  }
}

let activeUpdate = null

function observe(obj) {
  Object.keys(obj).forEach((key) => {
    let interval = obj[key]
    if (typeof interval === 'object')
      observe(obj[key])

    const dep = new Dep()
    Object.defineProperty(obj, key, {
      get() {
        dep.depend()
        return interval
      },
      set(newVal) {
        const changed = newVal !== interval
        interval = newVal
        if (changed)
          dep.notify()

      },
    })
  })
  return obj
}

function autorun(update) {
  const wrapper = () => {
    activeUpdate = wrapper
    update()
    activeUpdate = null
  }
  wrapper()
}

const state = {
  count: 1,
  person: {
    age: 18,
  },
}

observe(state)

autorun(() => {
  document.getElementById('app').innerHTML = state.person.age
})
setInterval(() => {
  state.person.age++
}, 1000)
```


### 数组响应式
vue 没有通过defineProperty 监听数组下标，而是通过数组的方法处理响应式，原因有二
* 数组的长度可以改变数组中的元素，[1].length = 10 //  [1, empty × 9] vue 监听不到
* 数组性能代价太高，如果是很大的数组，预先加 getter/setter 性能负担较大



```js
const arrayProto = Array.prototype // 继承原型对象
export const arrayMethods = Object.create(arrayProto) // 建一个自己的原型 并且重写methods这些方法

const methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach((method) => {
  // cache original method 缓存原生方法
  const original = arrayProto[method]
  // 新增对象的属性。为 arrayMethods 对象添加 method 属性
  def(arrayMethods, method, function mutator(...args) {
    // 改变this指向 拦截
    const result = original.apply(this, args)
    // 获取Observer实例
    const ob = this.__ob__
    // 改变数组的元素,待添加响应式的元素
    let inserted
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args
        break
      case 'splice':
        inserted = args.slice(2)
        break
    }
    // 调用 Observer 类的 observeArray 方法，遍历数组中每一项(inserted)为其添加响应式
    if (inserted)
      ob.observeArray(inserted) // Array 的深度侦测
    // notify change
    ob.dep.notify()
    return result
  })
})
```
## vue3
vue3 基于 Proxy 对象用于创建一个对象的代理，从而实现基本操作的拦截和自定义（如属性查找、赋值、枚举、函数调用等）

### 实现
```js
const targetMap = new WeakMap()
let activeEffect = null
function track(target, key) {
  if (activeEffect) {
    let depsMap = targetMap.get(target)
    if (!depsMap)
      targetMap.set(target, (depsMap = new Map()))

    let deps = depsMap.get(key)
    if (!deps)
      depsMap.set(key, (deps = new Set()))

    deps.add(activeEffect)
    activeEffect.deps.push(deps)
  }
}

function trigger(target, key) {
  const depsMap = targetMap.get(target)
  if (!depsMap)
    return

  const deps = depsMap.get(key)
  const effects = new Set(deps) // 必须值拷贝，否者在执行 effect() 时重新进行依赖收集，deps  -> delete -> add -> add，陷入死循环
  effects.forEach(effect => effect())
}
function reactive(target) {
  return new Proxy(target, {
    get(target, key) {
      track(target, key)
      const ret = Reflect.get(target, key)
      return typeof ret === 'object' ? reactive(ret) : ret
    },
    set(target, key, newVal) {
      const ret = Reflect.set(target, key, newVal)
      trigger(target, key)
      return ret
    }
  })
}
function effect(update) {
  const effectFn = () => {
    cleanup(effectFn)
    activeEffect = effectFn
    update()
    activeEffect = null
  }
  effectFn.deps = []
  effectFn()
}

function cleanup(effectFn) {
  for (let i = 0; i < effectFn.deps.length; i++) {
    const deps = effectFn.deps[i]
    deps.delete(effectFn)
  }
  effectFn.deps.length = 0
}

state = {
  person: {
    age: 18
  }
}
const proxy = reactive(state)

effect(() => {
  const app = document.querySelector('#app')
  app.innerHTML = proxy.person.age
})

setInterval(() => {
  proxy.person.age += 1
}, 1000)
```

## 对比
vue2 使用 defineProperty 劫持对象的所有属性，进行深度遍历所有属性，给每一个属性添加 getter setter 实现响应式
*	检测不到对象属性的添加和删除
*	数组只有特定的API可以被监听
*	需要对每个属性进行遍历监听，如果是嵌套对象，需要深层监听，影响性能


vue3 采用 proxy 重写响应式系统
* proxy可以对整个对象进行监听不需要深度遍历
* 可以监听动态属性，删除属性，数组的索引和length
* proxy 不兼容IE 也没有polyfill