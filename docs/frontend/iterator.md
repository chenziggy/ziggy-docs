# 遍历器

## Iterator
用于遍历数据结构的机制，它定义了一种统一的方式来访问集合中的每个元素，任何数据接口只要部署 Iterator，就可以完成遍历操作
* 为各种数据结构，提供一个统一的、简便的访问接口
* 使得数据结构的成员能够按某种次序排列
* ES6 创造了一种新的遍历命令for...of循环，Iterator 接口主要供 `for...of` `...` `Array.from()` 消费

原生具备 Iterator 接口数据类型：
Array、String、Map、Set、TypeArray、NodeList

对象没有部署 Iterator 接口

### 调用遍历器
```js
const arr = [10, 11, 12]
const iterator = arr[Symbol.iterator]()
iterator.next() // {value: 10, done: false}
iterator.next() // {value: 11, done: false}
// ...
iterator.next() // {value: undefined, done: true}
```

### 利用遍历器实现"链表"
```js
function Obj(value) {
  this.value = value
  this.next = null
}

Obj.prototype[Symbol.iterator] = function () {
  const iterator = { next }
  let current = this

  function next() {
    if (current) {
      const value = current.value
      current = current.next
      return { done: false, value }
    }
    return { done: true }
  }
  return iterator
}

const one = new Obj(1)
const two = new Obj(2)
const three = new Obj(3)

one.next = two
two.next = three

for (const i of one)
  console.log(i) // 1, 2, 3
```

## Array.from
将类似数组的对象（array-like object）和可遍历（iterable）的对象，转化为真正的数组  
常见的类数组对象有： arguments、NodeList
```js
// 类数组对象
const arrayLike = {
  0: 'a',
  1: 'b',
  2: 'c',
  length: 3
}
// ES5 的写法
const arr1 = [].slice.call(arrayLike) // ['a', 'b', 'c']
// ES6 的写法
const arr2 = Array.from(arrayLike) // ['a', 'b', 'c']
```

## generator
* generator 是一个函数生成器，被调用时会返回一个遍历器(迭代器  Iterator)对象，遍历器在执行过程中可以暂停和恢复
* Generator生成的函数调用时，不会立即执行，通过调用 next() 开始一步一步继续往下执行 
* 第一次调用 next() 才开始执行，一直到第一个yield后面的执行完毕就暂停，第一个next() 无法传参
* next() 被调用，会停在 yield 处，返回右侧，左侧不执行，并且返还对象为 `{ value: xx, done: boolean }`
* 个人理解 Generator 函数是一个状态机，封装了多个内部状态
```js
function* numberGenerator() {
  const a = yield 1
  console.log('🚀 ~ file: generator.md:25 ~ function*numberGenerator ~ a:', a)
  yield 2
  yield 3
}

const generator = numberGenerator('xxxxxxxxxx')

console.log(generator.next()) // 输出: {value: 1, done: false}
console.log(generator.next('params 2')) 
// 🚀 ~ file: generator.md:25 ~ function*numberGenerator ~ a: params 2
// 输出: {value: 2, done: false}
console.log(generator.next()) // 输出: {value: 3, done: false}
console.log(generator.next()) // 输出: {value: undefined, done: true}
```