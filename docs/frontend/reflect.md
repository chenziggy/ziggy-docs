# Reflect

Reflect对象与Proxy对象一样，也是 ES6 为了操作对象而提供的新 API

Reflect对象的设计目的有这样几个：

* 将Object对象的一些明显属于`语言内部的方法`（比如Object.defineProperty），放到Reflect对象上。现阶段，某些方法同时在Object和Reflect对象上部署，未来的新方法将只部署在Reflect对象上

* 修改某些Object方法的返回结果，让其变得更合理。比如，Object.defineProperty(obj, name, desc)在无法定义属性时，会抛出一个错误，而Reflect.defineProperty(obj, name, desc)则会返回false

* 让Object操作都变成函数行为。某些Object操作是命令式，比如name in obj和delete obj[name]，而Reflect.has(obj, name)和Reflect.deleteProperty(obj, name)让它们变成了函数行为

```js
// 老写法
'assign' in bbject // true
delete obj.name

// 新写法
Reflect.has(Object, 'assign') // true
Reflect.deleteProperty(obj, 'name')
```

* Reflect对象的方法与Proxy对象的方法一一对应，只要是Proxy对象的方法，就能在Reflect对象上找到对应的方法。这就让Proxy对象可以方便地调用对应的Reflect方法，完成默认行为，作为修改行为的基础。也就是说，不管Proxy怎么修改默认行为，你总可以在Reflect上获取默认行为

```js
Proxy(target, {
  set(target, name, value, receiver) {
    return Reflect.set(target, name, value, receiver)
  }
})
```

## method
``` js
Reflect.apply(target, thisArg, args)
Reflect.construct(target, args)
Reflect.get(target, name, receiver)
Reflect.set(target, name, value, receiver)
Reflect.defineProperty(target, name, desc)
Reflect.deleteProperty(target, name)
Reflect.has(target, name)
Reflect.ownKeys(target)
Reflect.isExtensible(target)
Reflect.preventExtensions(target)
Reflect.getOwnPropertyDescriptor(target, name)
Reflect.getPrototypeOf(target)
Reflect.setPrototypeOf(target, prototype)
```

### Reflect.get

Reflect.get方法查找并返回target对象的name属性，如果没有该属性，则返回undefined

```js
const myObject = {
  foo: 1
}
Reflect.get(myObject, 'foo') // 1
```

### Reflect.set
Reflect.set方法设置target对象的name属性等于value

```js
Reflect.set(myObject, 'foo', 2)
myObject.foo // 2
```

### Reflect.has
Reflect.has方法对应name in obj里面的in运算符

```js
// 旧写法
'foo' in myObject // true

// 新写法
Reflect.has(myObject, 'foo') // true
```

### Reflect.deleteProperty
Reflect.deleteProperty方法等同于delete obj[name]，用于删除对象的属性


```js
// 旧写法
delete myObj.foo

// 新写法
Reflect.deleteProperty(myObj, 'foo')
```

### Reflect.construct
Reflect.construct方法等同于new target(...args)，这提供了一种不使用new，来调用构造函数的方法

```js
function Greeting(name) {
  this.name = name
}

// new 的写法
const instance = new Greeting('张三')

// Reflect.construct 的写法
const instance = Reflect.construct(Greeting, ['张三'])
```

### Reflect.getPrototypeOf
Reflect.getPrototypeOf方法用于读取对象的__proto__属性，对应Object.getPrototypeOf(obj)

```js
const myObj = new FancyThing()

// 旧写法
Object.getPrototypeOf(myObj) === FancyThing.prototype

// 新写法
Reflect.getPrototypeOf(myObj) === FancyThing.prototype
```

### Reflect.setProtoTypeOf
Reflect.setPrototypeOf方法用于设置目标对象的原型（prototype），对应Object.setPrototypeOf(obj, newProto)方法。它返回一个布尔值，表示是否设置成功

```js
const myObj = {}

// 旧写法
Object.setPrototypeOf(myObj, Array.prototype)

// 新写法
Reflect.setPrototypeOf(myObj, Array.prototype)

myObj.length // 0
```

### Reflect.defineProperty
Reflect.defineProperty方法基本等同于Object.defineProperty，用来为对象定义属性。未来，后者会被逐渐废除，请从现在开始就使用Reflect.defineProperty代替它

```js
function MyDate() {
  /* … */
}

// 旧写法
Object.defineProperty(MyDate, 'now', {
  value: () => Date.now()
})

// 新写法
Reflect.defineProperty(MyDate, 'now', {
  value: () => Date.now()
})
```

### Reflect.getOwnPropertyDescriptor
Reflect.getOwnPropertyDescriptor基本等同于Object.getOwnPropertyDescriptor，用于得到指定属性的描述对象，将来会替代掉后者


```js
const myObject = {}
Object.defineProperty(myObject, 'hidden', {
  value: true,
  enumerable: false,
})

// 旧写法
const theDescriptor1 = Object.getOwnPropertyDescriptor(myObject, 'hidden')

// 新写法
const theDescriptor2 = Reflect.getOwnPropertyDescriptor(myObject, 'hidden')
```

### Reflect.ownKeys
Reflect.ownKeys方法用于返回对象的所有属性，基本等同于Object.getOwnPropertyNames与Object.getOwnPropertySymbols之和

```js
const myObject = {
  foo: 1,
  bar: 2,
  [Symbol.for('baz')]: 3,
  [Symbol.for('bing')]: 4,
}

// 旧写法
Object.getOwnPropertyNames(myObject)
// ['foo', 'bar']

Object.getOwnPropertySymbols(myObject)
// [Symbol(baz), Symbol(bing)]

// 新写法
Reflect.ownKeys(myObject)
// ['foo', 'bar', Symbol(baz), Symbol(bing)]
```



