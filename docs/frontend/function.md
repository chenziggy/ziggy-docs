# 函数

## 箭头函数
```js
const arrowFunc = () => {...}
```
* 箭头函数没有自己的this对象
* 不可以当作构造函数，也就是说，不可以对箭头函数使用new命令，否则会抛出一个错误
* 不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替 `(...rest) => {console.log(rest)}`
* 不可以使用yield命令，因此箭头函数不能用作 Generator 函数

:::tip
箭头函数没有自己的this，箭头函数中的 this 固定指向上一层作用域中this，[词法作用域](/frontend/scope#词法作用域)
:::