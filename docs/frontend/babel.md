# babel

Babel是一个广泛使用的JavaScript编译工具

它可以将新版本的 JavaScript 代码转换为旧版本的 JavaScript 代码，以确保在各种浏览器和环境中的兼容性

可以转换 箭头函数、解构赋值、模板字符串等

## polyfill
垫片或填充物

用于在旧版本的浏览器或环境中实现新的 JavaScript 特性或 API 的代码

* 常见库 `core-js` `babel-polyfill` `es-module-shims`
* 让旧浏览器支持 `Promise`、`Object.assign`、`Array.from`、内置对象 `Reflect`、原生方法 `Array.prototype.flat`；模拟 CSS 实现 rem 单位 等
* 不能解决底层语言特性，例如 `Proxy` 通过底层引擎提供的特殊机制来实现的 (这就是 vue3 不支持旧版浏览器的原因)


:::tip
Polyfill 在模拟这些特性时，可能会提供近似的实现或部分功能的替代，但无法提供与原生特性完全一致的行为
:::

[HTML5 Polyfills](https://github.com/Modernizr/Modernizr/wiki/HTML5-Cross-Browser-Polyfills)
