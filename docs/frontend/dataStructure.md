# 数据结构

## Set
它类似于数组，但是成员的值都是唯一的，没有重复的值
Set本身是一个构造函数，通过 add() 方法添加成员
Set函数可以接受一个数组（或者具有 iterable 接口的其他数据结构）作为参数

Set.prototype.constructor：构造函数，默认就是Set函数
Set.prototype.size：返回成员总数

### 操作方法
Set.prototype.add(value)：添加某个值，返回 Set 结构本身
Set.prototype.delete(value)：删除某个值，返回一个布尔值，表示删除是否成功
Set.prototype.has(value)：返回一个布尔值，表示该值是否为Set的成员
Set.prototype.clear()：清除所有成员，没有返回值
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
Set.prototype.keys()：返回键名的遍历器
Set.prototype.values()：返回键值的遍历器
Set.prototype.entries()：返回键值对的遍历器
Set.prototype.forEach()：使用回调函数遍历每个成员
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