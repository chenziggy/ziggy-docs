# proxy

Proxy 对象用于创建一个对象的代理，从而实现基本操作的拦截和自定义

## 语法参数
```js
const p = new Proxy(target, handler)
```

* `target` 要使用 Proxy 包装的目标对象（可以是任何类型的对象，包括原生数组，函数，甚至另一个代理）  
* `handler` 一个通常以函数作为属性的对象，各属性中的函数分别定义了在执行各种操作时代理 p 的行为
```
handler.getPrototypeOf()
handler.setPrototypeOf()
handler.isExtensible()
handler.getOwnPropertyDescriptor()
handler.preventExtensions()
handler.defineProperty()
handler.has()
handler.get()
handler.set()
handler.deleteProperty()
handler.ownKeys()
handler.apply()
handler.construct()
```
p 可以通过 handler 扩展以上Object原生方法

## 通过代理验证数据
```js
let validator = {
  set: function(obj, prop, value) {
    if (prop === 'age') {
      if (!Number.isInteger(value)) {
        throw new TypeError('The age is not an integer');
      }
      if (value > 200) {
        throw new RangeError('The age seems invalid');
      }
    }

    // The default behavior to store the value
    obj[prop] = value;

    // 表示成功
    return true;
  }
};

let person = new Proxy({}, validator);
person.age = 100;
console.log(person.age);
// 100
person.age = 'young';
// 抛出异常：Uncaught TypeError: The age is not an integer
person.age = 300;
// 抛出异常：Uncaught RangeError: The age seems invalid
```

### 修正及附加属性
```js
let products = new Proxy({
  browsers: ['Internet Explorer', 'Netscape']
}, {
  get: function(obj, prop) {
    // 附加一个属性
    if (prop === 'latestBrowser') {
      return obj.browsers[obj.browsers.length - 1];
    }
    // 默认行为是返回属性值
    return obj[prop];
  },
  set: function(obj, prop, value) {
    // 附加属性
    if (prop === 'latestBrowser') {
      obj.browsers.push(value);
      return;
    }
    // 如果不是数组，则进行转换
    if (typeof value === 'string') {
      value = [value];
    }
    // 默认行为是保存属性值
    obj[prop] = value;
    // 表示成功
    return true;
  }
});

console.log(products.browsers); // ['Internet Explorer', 'Netscape']
products.browsers = 'Firefox';  // 如果不小心传入了一个字符串
console.log(products.browsers); // ['Firefox'] <- 也没问题，得到的依旧是一个数组

products.latestBrowser = 'Chrome';
console.log(products.browsers);      // ['Firefox', 'Chrome']
console.log(products.latestBrowser); // 'Chrome'
```

## 通过属性查找数组中特点的对象
```js
let products = new Proxy([
  { name: 'Firefox'    , type: 'browser' },
  { name: 'SeaMonkey'  , type: 'browser' },
  { name: 'Thunderbird', type: 'mailer' }
], {
  get: function(obj, prop) {
    // 默认行为是返回属性值，prop ?通常是一个整数
    if (prop in obj) {
      return obj[prop];
    }
    // 获取 products 的 number; 它是 products.length 的别名
    if (prop === 'number') {
      return obj.length;
    }

    let result, types = {};

    for (let product of obj) {
      if (product.name === prop) {
        result = product;
      }
      if (types[product.type]) {
        types[product.type].push(product);
      } else {
        types[product.type] = [product];
      }
    }
    // 通过 name 获取 product
    if (result) {
      return result;
    }
    // 通过 type 获取 products
    if (prop in types) {
      return types[prop];
    }
    // 获取 product type
    if (prop === 'types') {
      return Object.keys(types);
    }
    return undefined;
  }
});

console.log(products[0]); // { name: 'Firefox', type: 'browser' }
console.log(products['Firefox']); // { name: 'Firefox', type: 'browser' }
console.log(products['Chrome']); // undefined
console.log(products.browser); // [{ name: 'Firefox', type: 'browser' }, { name: 'SeaMonkey', type: 'browser' }]
console.log(products.types); // ['browser', 'mailer']
console.log(products.number); // 3
```

## 定义私有属性
```js
const target = {
  _id: '1024',
  name:  'vuejs'
}

const proxy = new Proxy(target, {
  get(target, propkey, proxy){
    if(propkey[0] === '_'){
      throw Error(`${propkey} is restricted`)
    }
    return Reflect.get(target, propkey, proxy)
  },
  set(target, propkey, value, proxy){
    if(propkey[0] === '_'){
      throw Error(`${propkey} is restricted`)
    }
    return Reflect.set(target, propkey, value, proxy)
  }
})

proxy.name // vuejs
proxy._id // Uncaught Error: _id is restricted
proxy._id = '1025' // Uncaught Error: _id is restricted
```


## Proxy.revocable
唯一的静态方法
```js
Proxy.revocable(target, handler);
```
返回一个包含了代理对象本身和它的撤销方法的可撤销 Proxy 对象 `{"proxy": proxy, "revoke": revoke}`
```js
var revocable = Proxy.revocable({}, {
  get(target, name) {
    return "[[" + name + "]]";
  }
});
var proxy = revocable.proxy;
proxy.foo;              // "[[foo]]"
revocable.revoke();
console.log(proxy.foo); // 抛出 TypeError
```

