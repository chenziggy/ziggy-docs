# 函数重载
不同的参数调用，实现不同的函数操作

javaScript 并没有像一些其他编程语言（如 Java、C++）中提供显式的函数重载机制，但你可以通过一些技巧来模拟函数重载的效果


## addMethod 函数重载

利用闭包、递归实现函数重载

缺点
* 需要将函数挂载为对象属性
* addMethod 中使用形参的长度判断，但 `args.length` 不计算函数参数默认值
* 只能适配参数数量，不能适配参数类型

```js
export function addMethod(object, name, fn) {
  const old = object[name]
  object[name] = function (...args) {
    if (args.length === fn.length)
      return fn.apply(this, args)
    else if (typeof old === 'function')
      return old.apply(this, args)

  }
}

const searcher = {}
addMethod(searcher, 'getArgs', () => {
  return []
})
addMethod(searcher, 'getArgs', (name) => {
  return [name]
})
addMethod(searcher, 'getArgs', (name, sex) => {
  return [name, sex]
})

searcher.getArgs()
searcher.getArgs(1)
searcher.getArgs(1, 2)
```


:::tip
函数默认值 和 fn.length 关系

* fn = (a, b, c) => {}    fn.length ===  3
* fn = (a = 1, b, c) => {}    fn.length === 0
* fn = (a, b = 1, c) => {}    fn.length === 1
:::
