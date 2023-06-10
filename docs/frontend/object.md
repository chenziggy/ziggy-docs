# Object


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
};

const descriptor1 = Object.getOwnPropertyDescriptor(obj, 'age');
// {value: 42, writable: true, enumerable: true, configurable: true}

let interval 
const descriptor2 =  Object.defineProperty(obj, 'name', {
  get: function () {
    return interval
  },
  set: function (newVal) {
    interval = newVal
  }
})

console.log(Object.getOwnPropertyDescriptor(obj, 'name'))
// {enumerable: false, configurable: false, get: ƒ, set: ƒ}
```