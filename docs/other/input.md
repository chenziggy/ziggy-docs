# input.value
## 诱因
最近在在做一个独立校验框架，在不修改原有业务的基础上，针对表单内容检验业务规则。其中有一个环节需要监听input.value的变化

## input
input 标签具有同名事件`input`，可以通过`addEventListener('input', callback)`监听用户输入事件，但监听不了js改变input.value

## MutationObserver
尝试通过 `MutationObserver` 监听dom属性的变化，但观察不到value变化
```js
const input = document.querySelector('#input')

const callback = function (mutationsList, observer) {
  for (const mutation of mutationsList) {
    if (mutation.type === 'attributes')
      console.log(`The ${mutation.attributeName} attribute was modified.`)

  }
}

const observer = new MutationObserver(callback)
observer.observe(input, { attributes: true })
```

## defineProperty
最后想到vue2 `Object.defineProperty` 重新定义属性

```js
function observe(obj, property, cb) {
  let interval
  Object.defineProperty(obj, property, {
    get() {
      return interval
    },
    set(newVal) {
      interval = newVal
      if (typeof cb == 'function')
        cb(interval)

    }
  })
}
```

但是发现虽然可以重新定义属性，但不能使用interval作为值，需要使用原有的值，不然会影响业务

## 最终方案
由于原型链的存在，可以调用原型的 `get set` 函数设置原有的值
```js
function observe(obj, property, cb) {
  // 获取obj的原型
  const __proto__ = Object.getPrototypeOf(obj)
  if (__proto__.hasOwnProperty(property)) {
    //  获取原型 property descriptor
    const descriptor = Object.getOwnPropertyDescriptor(__proto__, property)
    Object.defineProperty(obj, property, {
      get() {
        // 调用原型 get
        return descriptor.get.apply(this)
      },
      set() {
        // 调用原型 set
        descriptor.set.apply(this, arguments)
        if (typeof cb == 'function')
          cb(this[property])

      }
    })
  }
}
```
* [Object.defineProperty](/frontend/object#defineproperty)
* [Object.getPrototypeOf](/frontend/object#getprototypeof)
* [Object.getOwnPropertyDescriptor](/frontend/object#getownpropertydescriptor)