# 响应式

## vue3

### 实现
```js
let targetMap = new WeakMap()
let activeEffect = null;

function track(target, key) {
  if (activeEffect) {
    let depsMap = targetMap.get(target)
    if (!depsMap) {
      targetMap.set(target, (depsMap = new Map()))
    }
    let deps = depsMap.get(key)
    if (!deps) {
      depsMap.set(key, (deps = new Set()))
    }
    deps.add(activeEffect)
  }
}

function trigger(target, key) {
  const depsMap = targetMap.get(target)
  if (!depsMap) {
    return
  }
  const effects = depsMap.get(key)
  effects && effects.forEach((fn) => fn())
}


function reactive(obj) {
  return new Proxy(obj, {
    get(target, key) {
      track(target, key);
      const ret = Reflect.get(target, key);
      return typeof ret === "object" ? reactive(ret) : ret;
    },
    set(target, key, newVal) {
      const ret = Reflect.set(target, key, newVal);
      trigger(target, key);
      return ret;
    },
  });
}

function effect(update) {
  let wrapper = () => {
    activeEffect = wrapper;
    update();
    activeEffect = null;
  };
  wrapper();
}

const state = {
  count: 1,
  person: {
    age: 18,
  },
};

const proxy = reactive(state)

effect(() => {
  document.getElementById("app").innerHTML = proxy.person.age;
});
effect(() => {
  document.getElementById("app1").innerHTML = proxy.person.age + 'app1';
})
setInterval(() => {
  proxy.person.age++;
}, 1000);
```