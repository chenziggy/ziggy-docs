```js
 var db

      var request = window.indexedDB.open('errorDatabase')
      request.onupgradeneeded = function (event) {
        console.log('onupgradeneeded')
        db = event.target.result
        var objectStore
        if (!db.objectStoreNames.contains('error')) {
          objectStore = db.createObjectStore('error', { autoIncrement: true })
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