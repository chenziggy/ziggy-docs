# 数据结构

## Set
它类似于数组，但是成员的值都是唯一的，没有重复的值
* Set本身是一个构造函数，通过 add() 方法添加成员
* Set函数可以接受一个数组（或者具有 iterable 接口的其他数据结构）作为参数
* Set.prototype.constructor：构造函数，默认就是Set函数
* Set.prototype.size：返回成员总数

### 操作方法
* Set.prototype.add(value)：添加某个值，返回 Set 结构本身
* Set.prototype.delete(value)：删除某个值，返回一个布尔值，表示删除是否成功
* Set.prototype.has(value)：返回一个布尔值，表示该值是否为Set的成员
* Set.prototype.clear()：清除所有成员，没有返回值
```js
let s = new Set();
s.add(1).add(2).add(2);

s.size // 2
s.has(1) // true
s.has(2) // true
s.has(3) // false
s.delete(2) // true
s.has(2) // false
```


### 遍历方法
* Set.prototype.keys()：返回键名的遍历器
* Set.prototype.values()：返回键值的遍历器
* Set.prototype.entries()：返回键值对的遍历器
* Set.prototype.forEach()：使用回调函数遍历每个成员
遍历方法返回的都是遍历器 `Iterator`
由于 Set 结构没有键名，只有键值（或者说键名和键值是同一个值），所以keys方法和values方法的行为完全一致

```js
let set = new Set(['red', 'green', 'blue']);

for (let item of set.keys()) {
  console.log(item);
}
// red
// green
// blue
```

Set 结构的实例默认可遍历，它的默认遍历器生成函数就是它的values方法
```js
Set.prototype[Symbol.iterator] === Set.prototype.values
```

### 数组去重
```js
function dedupe(array) {
  return Array.from(new Set(array));
}
dedupe([1, 1, 2, 3]) // [1, 2, 3]
```
### Set遍历操作
在遍历操作中改变原来的 Set 结构
```js
let set = new Set([1, 2, 3]);
set = new Set([...set].map(val => val * 2));

let set = new Set([1, 2, 3]);
set = new Set(Array.from(set, val => val * 2));
```

## WeakSet
WeakSet 结构与 Set 类似，也是不重复的值的集合
### 与Set区别
* WeakSet 的成员只能是对象
* WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用
* WeakSet 没有size属性，同时也没有办法遍历它的成员
```js
const a = [[1, 2], [3, 4]];
const ws = new WeakSet(a);
// WeakSet {[1, 2], [3, 4]}
const b = [3, 4];
const ws = new WeakSet(b);
// Uncaught TypeError: Invalid value used in weak set(…)
```



### 操作方法
* WeakSet.prototype.add(value)：向 WeakSet 实例添加一个新成员，返回 WeakSet 结构本身  
* WeakSet.prototype.delete(value)：清除 WeakSet 实例的指定成员，清除成功返回true，如果在 WeakSet 中找不到该成员或该成员不是对象，返回false  
* WeakSet.prototype.has(value)：返回一个布尔值，表示某个值是否在 WeakSet 实例之中  

:::tip
如果其他对象都不再引用该对象，那么[垃圾回收机制](./garbage)会自动回收该对象所占用的内存，不考虑该对象还存在于 WeakSet 之中  
垃圾回收机制根据对象的可达性（reachability）来判断回收，如果对象还能被访问到，垃圾回收机制就不会释放这块内存。WeakSet 里面的引用，都不计入垃圾回收机制。
:::

## Map
它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串（对象键只能是字符串），各种类型的值（包括对象）都可以当作键，是一种更完善的Hash结构

Map构造函数接收数组，实际上执行的是下面的算法
```js
const map = new Map([
  ['name', '张三'],
  ['title', 'Author']
]);


const items = [
  ['name', '张三'],
  ['title', 'Author']
];

const map = new Map();

items.forEach(
  ([key, value]) => map.set(key, value)
);

map.has('name') // true
map.get('name') // "张三"
```

* Map.prototype.size 属性返回 Map 结构的成员总数

### 操作方法
* Map.prototype.set(key, value) 设置键名key对应的键值为value，然后返回整个 Map 结构。如果key已经有值，则键值会被更新
* Map.prototype.get(key) 读取key对应的键值，如果找不到key，返回undefined
* Map.prototype.has(key) 方法返回一个布尔值，表示某个键是否在当前 Map 对象之中
* Map.prototype.delete(key) 删除某个键，返回boolean
* Map.prototype.clear() 清除所有成员

### 遍历方法
* Map.prototype.keys()：返回键名的遍历器
* Map.prototype.values()：返回键值的遍历器
* Map.prototype.entries()：返回所有成员的遍历器
* Map.prototype.forEach()：遍历 Map 的所有成

:::tip
需要特别注意的是，Map 的遍历顺序就是插入顺序
:::

Map 结构的默认遍历器接口（Symbol.iterator属性），就是entries方法
```js
map[Symbol.iterator ] === map.entries
// true
```

## WeakMap
WeakMap结构与Map结构类似，也是用于生成键值对的集合

### 与Map区别
* WeakMap只接受对象作为键名（null除外），不接受其他类型的值作为键名
* WeakMap的键名所指向的对象，不计入垃圾回收机制
* WeakMap 没有size属性，同时也没有办法遍历它的成员

WeakMap的设计目的在于，有时我们想在某个对象上面存放一些数据，但是这会形成对于这个对象的引用
```js
const e1 = document.getElementById('foo');
const e2 = document.getElementById('bar');
const arr = [
  [e1, 'foo 元素'],
  [e2, 'bar 元素'],
];
```
e1和e2是两个对象，我们通过arr数组对这两个对象添加一些文字说明  
一旦不再需要这两个对象，我们就必须手动删除这个引用，否则垃圾回收机制就不会释放e1和e2占用的内存  
```js
// 不需要 e1 和 e2 的时候
// 必须手动删除引用
arr [0] = null;
arr [1] = null;
```
上面这样的写法显然很不方便。一旦忘了写，就会造成内存泄露

WeakMap 就是为了解决这个问题而诞生的，它的键名所引用的对象都是弱引用，即垃圾回收机制不将该引用考虑在内
```js
const e1 = document.getElementById('foo');
const e2 = document.getElementById('bar');
const wm = new WeakMap()
wm.set(e1, 'foo 元素')
wm.set(e2, 'bar 元素')
```

WeakMap 应用的典型场合就是 DOM 节点作为键名
```js
let myWeakmap = new WeakMap();

myWeakmap.set(
  document.getElementById('logo'),
  {timesClicked: 0})
;

document.getElementById('logo').addEventListener('click', function() {
  let logoData = myWeakmap.get(document.getElementById('logo'));
  logoData.timesClicked++;
}, false);
```

WeakMap 的另一个用处是部署私有属性，WeakMap 是弱引用作为实例的属性，所以如果删除实例，它们也就随之消失，不会造成内存泄漏

## WeakRef
用于直接创建对象的弱引用
```js
let target = {};
let wr = new WeakRef(target);
```
target是原始对象，构造函数WeakRef()创建了一个基于target的新对象wr。这里，wr就是一个 WeakRef 的实例，属于对target的弱引用，垃圾回收机制不会计入这个引用，也就是说，wr的引用不会妨碍原始对象target被垃圾回收机制清除

weakRef.prototype.deref 如果原始对象存在，该方法返回原始对象；如果原始对象已经被垃圾回收机制清除，该方法返回undefined

弱引用对象的一大用处，就是作为缓存，未被清除时可以从缓存取值，一旦清除缓存就自动失效
```js
function getImage(key) {
  // 获取指定 key 对应的图片数据的逻辑
  // 这里仅作示例，具体实现需要根据需求来定义
  console.log(`Fetching image for key: ${key}`);
  return `Image for ${key}`;
}

const makeWeakCached = (f) => {
  const cache = new Map();
  return (key) => {
    const ref = cache.get(key);
    if (ref) {
      const cached = ref.deref();
      if (cached !== undefined) return cached;
    }
    const fresh = f(key);
    cache.set(key, new WeakRef(fresh));
    return fresh;
  };
};

const getImageCached = makeWeakCached(getImage);

console.log(getImageCached("image1")); // Fetching image for key: image1  Output: Image for image1
console.log(getImageCached("image1")); // Output: Image for image1 (从缓存中获取，不再调用 getImage)

console.log(getImageCached("image2")); // Fetching image for key: image2  Output: Image for image2
console.log(getImageCached("image2")); // Output: Image for image2 (从缓存中获取，不再调用 getImage)
```