# 柯里化

柯力化（currying）是一种函数转换技术，它将接受多个参数的函数转换成一系列接受单个参数的函数

柯里化的特点是，每个接受单个参数的函数都返回一个新的函数，直到所有参数都被收集完毕

```js
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn(...args)
    }
    else {
      return function (...moreArgs) {
        return curried(...args, ...moreArgs)
      }
    }
  }
}

function sum(a, b, c) {
  return a + b + c
}

const curry_sum = curry(sum)
console.log(curry_sum(1, 2)(3))
```