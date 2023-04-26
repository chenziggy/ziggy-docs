# 前端异常监控

## 整体流程

`异常捕获` --> `数据存储` --> `数据上传`  
`异常捕获` --> `数据上传`

## 异常捕获

### window.onerror

```js
window.onerror = function(message, source, lineno, colno, error) {...}
```
函数参数：
* `message`: 错误信息（字符串）。可用于HTML onerror=""处理程序中的event
* `source`: 发生错误的脚本URL（字符串）
* `lineno`:  发生错误的行号（数字）
* `colno`:  发生错误的列号（数字）
* `error`: Error对象（对象）

```js
window.onerror = (message, source, lineno, clono, error) => {
  // 处理异常数据  
  this.saveLog({
    type: 'onerror',
    mesage: message,
    url: source,
    detail: `${lineno}-${clono}: ${error}`
  })
}
```

### unhandledrejection

未捕获的reject会报异常，触发unhandledrejection事件，通过监听unhandledrejection事件，拿到异常数据。
```js
window.addEventListener('unhandledrejection', (param) => {
  this.saveLog({
    type: 'unhandledrejection',
    data: param.reason
  })
})

```

### 接口错误
通过重写window.XMLHttpRequest的方法，在需要处理异常的地方记录数据。
```js
const sendError = (e) => {
  this.saveLog({
    type: 'http',
    message: e.target.status,
    url: e.target.responseURL,
    detail: e.target.response
  })
}
window.XMLHttpRequest.prototype.send = function (...param) {
  const oldHttpStatechange = this.onreadystatechange

  this.addEventListener('error', sendError)
  this.addEventListener('abort', sendError)
  this.onreadystatechange = (e) => {
    if (this.readyState === 4) {
      if (this.status !== 200) {
        sendError()
      }
    }
    oldHttpStatechange.call(this)
  }
  return oldHttpSend.call(this, ...param)
}
```

### 错误日志
在代码中通过console.error打印出的错误信息，通过重写方法捕获数据。
```js
const oldConsole = window.console.error
window.console.error = (info) => {
  oldConsole(info)
  this.saveLog({
    type: 'console-error',
    message: info
  })
}
```

### Vue errorHandler
指定组件的渲染和观察期间未捕获错误的处理函数。这个处理函数被调用时，可获取错误信息和 Vue 实例。

```js
Vue.config.errorHandler = function (err, vm, info) {
  // handle error
  // `info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
  // 只在 2.2.0+ 可用
}
```
`Vue2`
* 从 2.4.0起，这个钩子也会捕获 Vue 自定义事件处理函数内部的错误
* 从 2.6.0 起，这个钩子也会捕获 v-on DOM 监听器内部抛出的错误。另外，如果任何被覆盖的钩子或处理函数返回一个 Promise 链 (例如 async 函数)，则来自其 Promise 链的错误也会被处理。

`Vue3`
* 组件渲染器
* 事件处理器
* 生命周期钩子
* setup() 函数
* 侦听器
* 自定义指令钩子
* 过渡 (Transition) 钩子

## 数据存储
*	`Cookies`：信息会被带入请求头中，容量较小且影响数据包大小
*	`LocalStorage`: 容量较小
*	`SessionStorage`：容量较小，同时关闭后会被清除
*	`indexDB`：采用键值对存储数据，提供异步API对数据进行操作
*	`webSQL`：兼容性较差，标准被废除不再更新

```js
insert(param) {
    try {
      return new Promise((resolve, reject) => {
        const transaction = this.database.transaction(param.name, 'readwrite')
        const store = transaction.objectStore(param.name)
        const dbRequest = store.add(param.data)
        dbRequest.onsuccess = () => {
          console.log('%c insert success', 'color: green;')
          resolve()
        }
        dbRequest.onerror = (e) => {
          console.log('insert error', e)
          reject(e)
        }
      })
    } catch (error) {
      console.log('insert error', error)
    }
  }
```
![indexDB](/img/errorHandler_indexDB.png){height="120%" width="120%"}