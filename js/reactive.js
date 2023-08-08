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

  const effects = depsMap.get(key)
  const effectsToRun = new Set(effects)
  effectsToRun.forEach(fn => fn())
}

export function reactive(obj) {
  return new Proxy(obj, {
    get(target, key) {
      track(target, key)
      const ret = Reflect.get(target, key)
      return typeof ret === 'object' ? reactive(ret) : ret
    },
    set(target, key, newVal) {
      const ret = Reflect.set(target, key, newVal)
      trigger(target, key)
      return ret
    },
  })
}

export function effect(update) {
  const effectFn = () => {
    cleanup(effectFn)
    activeEffect = effectFn
    update()
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
