# 原型

通过克隆现有对象生成新对象，而不是通过实例化类，在 JavaScript 中，通过原型链实现对象的继承

## 原型链

原型链是 JavaScript 中用于实现对象继承的一种机制。每个对象都有一个指向其原型对象的内部链接，这个原型对象又有自己的原型对象，这样就形成了一个链式结构，称为原型链

### 原型链的查找

当访问一个对象的属性时，JavaScript 引擎会按照以下顺序查找：

1. 首先，查找对象自身是否具有该属性。如果有，则直接返回属性的值
2. 如果对象自身没有该属性，则会沿着原型链向上查找，即查找对象的原型对象的属性
3. 如果原型对象上也没有该属性，则会继续沿着原型链向上查找，直到找到属性或到达原型链的顶端（Object.prototype），顶端没有就返回undefined


:::tip
需要注意的是，原型链是一个单向链式结构，不能形成循环引用，否则会导致查找时的死循环。同时，原型链的顶端是 Object.prototype，它是所有对象的最终原型，没有原型对象
:::

```js
const person = {
  name: 'ziggy'
}

person.__proto__  ===  Object.prototype
// true

function Dog(name) {
  this.name = name
}
var dog = new Dog('husky')

dog.__proto__ === dog.constructor.prototype
// true
dog.__proto__.__proto__ === Object.prototype
// true
```

![prototype](/img/prototype.svg)


## 原型方法

### valueOf

* 返回对象的原始值，对象包括：Object String Date Number BigInt Boolean Symbol
* 使用算术操作符或字符串拼接，JavaScript 会自动调用对象的 valueOf 方法

|数据类型|valueOf|
|:----|:----|
|Array|数组本身|
|Boolean|布尔值|
|Date|返回毫秒形式的时间戳|
|Function|函数本身|
|Number|数字值|
|Object|对象本身|
|String|字符串值|



#### 重写valueOf
```js
function Dog (name) {
    this.name = name
    this.valueOf = () => {
        return this.name
    }
}
var dog = new Dog('husky')
console.log(dog+'wowo')
// husky wowo
```

### toString

|数据类型|toString|
|:----|:----|
|Array|以逗号分割的字符串，如[1,2]的toString返回值为"1,2"|
|Boolean|True|
|Date|可读的时间字符串，如"Tue Oct 15 2019 12:20:56 GMT+0800 (中国标准时间)"|
|Function|声明函数的JS源代码字符串|
|Number|数字值|
|Object|[object Object]|
|String|字符串|

#### 重写toString

```js
function Dog (name) {
    this.name = name
    this.toString = () => {
        return this.name
    }
}
var dog = new Dog('husky')
console.log(dog.toString())
```