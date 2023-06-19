# 设计模式

## 单例模式
单例模式确保只有一个不可更改实例，并提供一个全局访问该实例的接口

```js
// AppConfig 对象就是一个单例，我们可以在应用程序中的任何地方访问它
const AppConfig = {
  apiUrl: "http://example.com/api",
  maxItemsPerPage: 20,
  enableDebugMode: true
};

// 使用构造函数和静态方法来实现单例模式
class Singleton {
  constructor() {
  // Singleton.instance 类属性
    if (!Singleton.instance) {
      Singleton.instance = this;
    }
    return Singleton.instance;
  }
  
  static getInstance() {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }
    return Singleton.instance;
  }
}
```
## 工厂模式
工厂模式（Factory Pattern）是一种创建型设计模式，它提供了一种创建对象的最佳方式  

工厂模式通常包括以下几种类型：
* 简单工厂模式：由一个`工厂类`根据传入的参数来创建不同类型的对象  `一个类`
* 工厂方法模式：定义一个用于创建对象的`接口`，由子类来决定具体实例化哪一个类  `多个类`
* 抽象工厂模式：提供一个用于创建一系列相关或相互依赖对象的接口，而无需指定它们具体的类  `一系列对象`

```js
// 不使用类
function createPerson(name, age) {
  return {
    name: name,
    age: age,
    greet: function() {
      console.log(`Hi, my name is ${this.name}, and I'm ${this.age} years old.`);
    }
  }
}

const person1 = createPerson('Alice', 25);
const person2 = createPerson('Bob', 30);
```

## 原型模式
它通过克隆现有的对象来生成新对象，而不是通过实例化类。不必编写复杂的创建代码。在 JavaScript 中，通过原型链实现对象的继承

在原型模式中，每个对象都有一个原型对象，该原型对象作为新对象的模板。新对象通过克隆原型对象并向其添加新属性和方法来创建
:::tip
JavaScript 中，每个对象都有一个 __proto__ 属性指向原型对象  
每一个对象的构造函数都一个 prototype 属性指向原型对象
:::


## 策略模式

在策略模式中，将不同的方法封装在各自的策略类中，这些策略类都实现了相同的接口或基类。然后，根据需要，在运行时选择特定的策略对象来执行相应的方法

```js
const strategies = {
  run() {
    console.log("Called run");
  },
  walk() {
    console.log("Called walk");
  },
  bus() {
    console.log("Called bus");
  }
}

const execute = (strategy) => {
  return strategies[strategy]();
}

execute('run')
execute('walk')
execute('bus')
```
* 后续新增 `train airplane` 接口 execute 不需要修改