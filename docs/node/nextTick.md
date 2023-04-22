# process.nextTick

## 起因
在整理远古笔记的时候发现了问题

```js
  process.nextTick(function A() {
    console.log('A')
    process.nextTick(function C() {
      console.log('C')
    })
  })

  new Promise((resolve) => {
    console.log('Promise')
    resolve()
  }).then(() => {
    console.log('then')
  })
```

### 惯犯思维
```
Promise
A
then
C
```
+ Promise 的构造函数同步执行，在执行`console.log('Promise')`时，微任务queue只有`function A`  
+ 执行`resolve()`，向微任务queue队尾插入then的回调`()=> {console.log('then')}`，这时微任务queue长度为2。本轮事件循环宏任务执行结束，下面执行微任务  
+ 先执行微任务`function A`，又产生了一个微任务`function C`，<font color="red">错误的理解</font>`function C`应该插入到当前微任务queue队尾， `微任务queue: [then, C]`

### 微任务
process.nextTick 是一种特殊的微任务，它总是在当前阶段结束之前执行，即在事件循环的下一个阶段之前执行，而其他微任务会在下一个阶段执行（promise, queueMicrotask）

### 个人理解（臆想了一个队列）
process.nextTick 不像Promise.then()一样追加到微任务队尾，而是被放入一个单独的队列中，这个队列只存放 nextTick，并且这个队列的优先级比其他微任务要高。这意味着在当前事件循环中，所有的 nextTick 回调函数都会被执行完毕（包括在执行中产生的新的 nextTick），才会执行其他微任务。

```js
process.nextTick(function A() {
  console.log('A')
  process.nextTick(function C() {
    console.log('C')
    process.nextTick(function D() {
      console.log('D')
    })
  })
})

process.nextTick(function F() {
  console.log("F")
  process.nextTick(function J() {
    console.log("J")
  })
})

new Promise((resolve) => {
  console.log('Promise')
  resolve()
}).then(() => {
  console.log('then')
})

/** output
Promise
A
F
C
J
D
then
 */
```

