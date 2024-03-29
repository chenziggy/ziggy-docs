# module

## CommonJS
* node.js 模块化规范
* 有自己的`作用域`，在一个文件里面定义的变量、函数、类，都是私有的，对其他文件不可见
* CommonJS规范加载模块是`同步`的，只有加载完成，才能执行后面的操作
* 要在模块中导出变量、函数或对象，可以使用 module.exports，require方法用于加载模块
* `模块缓存`，第一次加载某个模块时，Node会缓存该模块。以后再加载该模块，就直接从缓存取出该模块的module.exports属性
* 模块加载机制，CommonJS模块的加载机制是，输入的是被输出的`值的拷贝`。也就是说，一旦输出一个值，模块内部的变化就影响不到这个值
* 所有代码都运行在模块作用域，`不会污染`全局作用域

:::tip  
require “/”开头，则表示加载一个位于绝对路径的模块文件  
“./”开头，则表示加载的是一个位于相对路径的模块文件  
不以“./“或”/“开头，则表示加载的是一个默认提供的核心模块（位于Node的系统安装目录中），或者一个位于各级node_modules目录的已安装模块（全局安装或局部安装）
:::

### 命名空间
```js
// lib.js
module.exports = {
  func: () => {},
  propertyA: 'ziggy',
  default: 'hello world'
}

const utils = require('lib')
// utils 是命名空间，具体使用方法 utils.func() utils.propertyA
```

## ES6 Module

* 使用 import 和 export 关键字来导入和导出模块
* 编译时就能确定模块的依赖关系，以及输入和输出的变量
* shaking tree 在编译阶段可以正确判断到底加载了那些模块，静态分析判断哪些模块和变量未被使用或者引用，进而删除对应代码

## 对比
* CommonJS 输出值拷贝，ES6模块输出值引用
* CommonJS 单个值导出，ES6模块可以导出多个
* CommonJS 模块在加载时执行，不支持动态导入，ES6模块支持动态导入，可以在运行时根据条件导入模块
* CommonJS 运行时加载，ES6模块是编译时输出接口
* CommonJS this 指向当前模块，ES6模块 this 是 undefined
* CommonJS 模块的require()是同步加载模块，ES6 模块的import命令是异步加载，导入的模块会被编译器静态分析

## AMD
用于在浏览器环境中异步加载模块
* 异步加载：AMD 模块加载是异步的，模块的加载和执行不会阻塞页面的其他操作，可以提高页面的响应性
* 声明模块依赖：使用 define 函数来声明模块，其中可以指定模块所依赖的其他模块
* 异步加载模块：使用 require 函数来异步加载依赖的模块，并在加载完成后执行相应的回调函数
* 浏览器环境：AMD 规范主要应用于浏览器环境，用于解决浏览器中模块加载的问题

AMD 规范的一个常见实现是 RequireJS

## UMD
是一种通用的模块定义规范，旨在在不同的环境中（如浏览器、Node.js 等）都能使用相同的模块代码
* 兼容多种模块规范：UMD 可以适配多种模块规范，如 AMD、CommonJS 和全局变量等。它会根据当前环境自动选择适合的模块加载方式
* 声明模块依赖：与 AMD 和 CommonJS 类似，UMD 也允许声明模块依赖关系，并在加载模块时进行解析和加 载
* 全局变量兼容：UMD 还支持直接通过全局变量来使用模块，这对于那些不使用模块加载器的环境很有用


## iife 
iife (Immediately Invoked Function Expression): 生成自执行函数表达式的模块，适用于浏览器环境。该模块将所有的代码包装在一个立即执行的函数中


## bundle

`Bundle`（捆绑包）是指将多个文件或模块合并为一个单独的文件，通常是应用程序的入口文件。它包含了应用程序的核心代码以及其所有依赖项，从而形成一个完整的功能单元。打包工具将所有需要的代码和资源合并到一个 bundle 中，以便在部署时可以一次性加载

## chunk
`Chunk`（代码块）是指在打包过程中，将代码拆分成多个独立的块或模块。这些代码块可以根据不同的条件进行拆分，例如按需加载、按路由划分、按模块关系划分等。拆分代码块的主要目的是实现代码的`懒加载`（按需加载），以减小初始加载的文件大小，提高页面加载速度

:::tip
可以将 bundle 视为包含所有核心代码和依赖项的完整打包文件，而 chunk 则是在打包过程中根据一定的规则或条件拆分出的独立代码块。在典型的 Web 应用中，通常会有一个主要的 bundle（入口文件），以及一些按需加载的 chunk（例如按路由加载的代码块）
:::

## vendor
`vendor`（供应商）一词通常用于指代第三方库、框架或其他外部依赖。具体来说，"vendor" 通常指的是应用程序中由外部提供的代码，而不是由开发人员自己编写的应用程序代码

## import

### module namespace object
模块命名空间对象是块中导出的一个对象，该对象包含了模块中所有导出的成员
* 当一个模块中有多个导出时，可以将这些导出统一放在一个命名空间对象中，以便更好地组织和管理。
* 模块命名空间对象是一个普通的 JavaScript 对象，它的属性对应模块中导出的成员

```js
import * as utils from './utils.js'

const res = await import('./utils')
// {DEV: true, default: Object, registerApp: ƒ registerApp(), Symbol(Symbol.toStringTag): "Module"}
/// utils res 都是命名空间对象
```

### default
引入模块有一个 default 导出成员 `export default`，可以通过一下形式导入默认值
```js
import myDefault from '/modules/my-module.js'
```

### __esModule
__esModule是一个特殊的属性，用于表示一个JavaScript模块是否采用了ES模块（ESM）规范

esModule
```js
export const person = { name: 'ziggy' }

export default person
```

babel 转化为 common.js
```js
'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.person = exports.default = undefined
const person = {
  name: 'ziggy'
}
exports.person = person
const _default = person
exports.default = _default
```