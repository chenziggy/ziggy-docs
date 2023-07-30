# 防抖节流

## 防抖 debounce
n秒后再执行该事件，若在n秒内被重复触发，则重新计时

```js
function debounce(func, delay) {
  let timerId
  return function (...args) {
    clearTimeout(timerId)
    timerId = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}
```

## 节流 throttle
n秒内只运行一次，n秒内重复触发，只有一次生效

```js
function throttle(func, delay) {
  let timerId
  return function (...args) {
    if (!timerId) {
      func.apply(this, args)
      timerId = setTimeout(() => {
        timerId = null
      }, delay)
    }
  }
}
```
