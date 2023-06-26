# Object

## defineProperty
`Object.defineProperty`
直接在一个对象上定义一个新属性，或修改其现有属性，并返回此对象
```js
Object.defineProperty(obj, prop, descriptor)
```

### descriptor
定义或修改的属性的描述符
* `数据描述符` 是一个具有可写或不可写值的属性
* `访问器描述符` 由 getter/setter 函数对描述的属性
* 描述符只能是这两种类型之一，`不能同时为两者`

#### 数据描述符和访问器描述符共享属性


* configurable 当设置为 false（默认值） 时，
  1. 该属性的类型不能在数据属性和访问器属性之间更改
  2. 该属性不可被删除
  3. 其描述符的其他属性也不能被更改（但是，如果它是一个可写的数据描述符，则 value 可以被更改，writable 可以更改为 false）

* [enumerable](#enumerable) 当前属性是否`可枚举`，默认值为 false。

#### 数据描述符独有属性

* value 与属性相关联的值，默认值为 undefined。
* writable value可以使用赋值运算符更改，则为 true。默认值为 false

```js
Object.defineProperty(o, 'a', {
  value: 37,
  writable: true,
  enumerable: true,
  configurable: true,
})
```

#### 访问器描述符独有属性

* get 用作属性 `getter 的函数`，当访问该属性时，将不带参地调用此函数，并将 this 设置为通过该属性访问的对象
* set 用作属性 `setter 的函数`，调用此函数，并带有一个参数（要赋给该属性的值），并将 this 设置为通过该属性分配的对象

```js
Object.defineProperty(o, 'b', {
  get() {
    return bValue
  },
  set(newValue) {
    bValue = newValue
  },
  enumerable: true,
  configurable: true,
})
```
## getPrototypeOf
`Object.getPrototypeOf`
返回指定对象的原型（即内部 [[Prototype]] 属性的值）
```js
Object.getPrototypeOf(obj)
```


## getOwnPropertyDescriptor
`Object.getOwnPropertyDescriptor`
返回一个对象，该对象描述给定对象上特定属性的配置
```js
// Object.getOwnPropertyDescriptor(obj, prop)

const obj = {
  age: 18,
}

const descriptor1 = Object.getOwnPropertyDescriptor(obj, 'age')
// {value: 42, writable: true, enumerable: true, configurable: true}

let interval
const descriptor2 = Object.defineProperty(obj, 'name', {
  get() {
    return interval
  },
  set(newVal) {
    interval = newVal
  }
})

console.log(Object.getOwnPropertyDescriptor(obj, 'name'))
// {enumerable: false, configurable: false, get: ƒ, set: ƒ}
```

## enumerable
可枚举属性，最初让某些属性可以规避掉`for...in`操作，不然所有内部属性和方法都会被遍历到

* for...in循环：只遍历对象自身的和继承的可枚举的属性
* Object.keys()：返回对象自身的所有可枚举的属性的键名
* JSON.stringify()：只串行化对象自身的可枚举的属性
* Object.assign()： 忽略enumerable为false的属性，只拷贝对象自身的可枚举的属性

## 属性的遍历
* for...in 循环遍历对象自身的和继承的可枚举属性
* Object.keys(obj) 返回一个数组，包括对象自身的（不含继承的）所有可枚举属性
* Object.getOwnPropertyNames(obj)  返回一个数组，包含对象自身的所有属性（包括不可枚举属性）
* Object.getOwnPropertySymbols(obj) 包含对象自身的所有 Symbol 属性的键名
* Reflect.ownKeys(obj) 返回一个数组，包含对象自身的（不含继承的）所有键名，不管键名是 Symbol 或字符串，也不管是否可枚举