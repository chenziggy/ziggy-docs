# class

## 类私有域

类属性在默认情况下是公有的，但可以使用增加哈希前缀 # 的方法来定义私有类字段
```js
class Person {
  #privateField;
  static #PRIVATE_STATIC_FIELD;  // 私有静态属性
  
  constructor() {
    this.#privateFiled = 52
    Person.#PRIVATE_STATIC_FIELD = 42
  }
  #privateMethod() {
    return 'hello world'
  }
  static #privateStaticMethod() { // 私有静态方法
    return 42;
  }
}
```
:::tip
可以使用 in 运算符检查私有字段（或私有方法）是否存在。当私有字段或私有方法存在时，运算符返回 true，否则返回 false。
:::
![Untitled](/img/class_private.png)