# 浏览器存储

## cookie
`cookie` 主要作用会话管理跟踪用户会话状态；存储用户偏好、个性设置、语言偏好、主题字体；记录登录状态

### 特点
* 可以跨域
* 用于标识状态（用户登录状态、购物车等）
*	服务器在响应请求头中的Set-Cookie字段设置、更新、删除
*	每次请求都会带cookie
*	http cookie 明文，请使用 https
*	4KB

## session storage
浏览器中临时存储会话数据，可以在当前窗口或标签页中保存数据

### 特点
* 不可跨域
* 数据隔离，每个标签页都拥有独立的session Storage
* 5MB

:::tip
window.open(self.url, '_blank') 在新窗口打开自身url时，session storage 会复制值到新页面；并且保持数据隔离特性
:::

## local storage
浏览器一种持久化存储数据，可以在同一浏览器的不同窗口或标签页之间共享数据，主要用于本地缓存、跨页面数据共享

### 特点
* 不可跨域
* 在浏览器关闭，然后重新打开后数据仍然存在，可用作持久存储数据，所有窗口都可以共享
* 5MB

## indexedDB
浏览器中存储大量结构化数据的客户端数据库系统，提供了一种持久化存储和检索大量数据的能力

### 特点
*	存储大量结构化数据（文件、二进制对象）
* 高性能查询和检索
*	键值对储存
* 事务管理和数据一致性，它支持事务的原子性，即要么所有操作都成功提交，要么全部回滚
* 数据库版本管理，可以在数据库结构发生变化时进行升级或迁移

```js
 var db
      // 打开数据库
      var request = window.indexedDB.open('errorDatabase')
      request.onupgradeneeded = function (event) {
        console.log('onupgradeneeded')
        db = event.target.result
        var objectStore
        if (!db.objectStoreNames.contains('error')) {
          // 创建对象存储空间
          objectStore = db.createObjectStore('error', { autoIncrement: true })
          // 添加引索
          objectStore.createIndex('type', 'type', { unique: false })
          objectStore.createIndex('message', 'message', { unique: false })
          objectStore.createIndex('data', 'data', { unique: false })
        }
      }

      request.onsuccess = function (event) {
        console.log('onsuccess')
        db = event.target.result
        add()
        // read()
      }

      function add() {
        var transaction = db
          // 开启事务
          .transaction(['error'], 'readwrite')
          .objectStore('error')
        // .add({ id: 1, name: '张三', age: 24, email: 'zhangsan@example.com' })

        transaction.onsuccess = function (event) {
          console.log('数据写入成功')
        }

        transaction.onerror = function (event) {
          console.log('数据写入失败')
        }
      }

      function read() {
        var transaction = db.transaction(['error'])
        var objectStore = transaction.objectStore('error')
        var request = objectStore.get(1)

        request.onerror = function (event) {
          console.log('事务失败')
        }

        request.onsuccess = function (event) {
          if (request.result) {
            console.log('type: ' + request.result.type)
            console.log('message: ' + request.result.message)
            console.log('data: ' + request.result.data)
          } else {
            console.log('未获得数据记录')
          }
        }
      }
```