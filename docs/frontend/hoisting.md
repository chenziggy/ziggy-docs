# 变量提升


变量提升（Hoisting）被认为是，Javascript 中执行上下文（特别是创建和执行阶段）工作方式的一种认识


从概念的字面意义上说，“变量提升”意味着变量和函数的声明会在物理层面移动到代码的最前面，但这么说并不准确。

实际上变量和函数声明在代码里的位置是不会动的，而是在编译阶段被放入内存中


## 函数提升
JavaScript 在执行任何代码段之前，将函数声明放入内存中

```js
// 不推荐的方式：先调用函数，再声明函数

catName("Chloe");

function catName(name) {
    console.log("我的猫名叫 " + name);
}
```

:::tip
函数和变量相比，会被优先提升，函数会被提升到更靠前的位置
:::

## 变量提升
只有 var 关键字会有变量提升

JavaScript 只会提升声明，不会提升其初始化。如果一个变量先被使用再被声明和赋值的话，使用时的值是 undefined

```js
console.log(num); // Returns undefined
var num = 6;
```

## 函数表达式
函数表达式会有变量提升，在赋值之前，值也是 undefined

```js
console.log(fn)
var fn = function (a) {
  return a;
}
// Returns undefined
```

## 覆盖
变量赋值会覆盖函数声明
```js
fn();
var fn = function () {
  console.log(1);
}
fn();
function fn () {
  console.log(2);
}
var fn = function () {
  console.log(3)
};
fn();
var fn = 4
console.log(fn)
// 2 1 3 4
```

## 与块级作用域
var i 会变量提升到函数 `foo`，for 循环是同步代码，for 循环执行完成才会执行异步宏任务 setTimeout
```js
function foo() {
  for (var i = 0; i < 10; i++ ) {
    setTimeout(() => {
      console.log(i)
    })
  }
}
foo()
// 10 (10) 打印 10个10
``` 

let i 块级作用域 与最近的`{}`绑定
```js
function foo() {
  for (let i = 0; i < 10; i++ ) {
    setTimeout(() => {
      console.log(i)
    })
  }
}
foo()
// 1,2,3,...,9,10 
```