# 作用域

## 词法作用域
* 词法作用域（Lexical Scope）是指变量和函数在代码编写阶段就确定其作用域的一种作用域规则  
* 它是由代码中变量和函数声明的位置决定的，而不是在运行时确定的
* 嵌套关系：作用域可以嵌套，一个作用域可以包含另一个作用域，形成作用域链。

```js
function outer() {
  var x = 10;
  
  function inner() {
    var y = 20;
    console.log(x + y);
  }
  
  inner();
}

outer(); // 输出: 30
```
在 inner 函数中，可以访问到外部作用域 outer 中声明的变量 x，因为它在 outer 函数的词法作用域内