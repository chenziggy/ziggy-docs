# prop

## 名字格式
camelCase 形式，是合法的 JavaScript 标识符
```js
export default {
  props: {
    greetingMessage: String
  }
}
```
虽然理论上你也可以在向子组件传递 props 时使用 camelCase 形式 (使用 DOM 模板时例外)，但实际上为了和 HTML attribute 对齐，我们通常会将其写为 kebab-case 形式：
```html
<MyComponent greeting-message="hello" />
```

对于组件名我们推荐使用 PascalCase，因为这提高了模板的可读性，能帮助我们区分 Vue 组件和原生 HTML 元素。然而对于传递 props 来说，使用 camelCase 并没有太多优势，因此我们推荐更贴近 HTML 的书写风格。

###  DOM 模板
在 DOM 中直接书写 Vue 模板
```html
<div id="app">
  <my-component title-prop="title"></my-component>
</div>
<script src="https://cdn.jsdelivr.net/npm/vue@2.7.14/dist/vue.js"></script>
    <script>
      Vue.component('my-component', {
        template: `<div>{{titleProp}}</div>`,
        props: ['titleProp']
      })
      var vm = new Vue({
        el: '#app'
      })
    </script>
```

::: tip
请注意下面讨论只适用于直接在 DOM 中编写模板的情况。如果你使用来自以下来源的字符串模板，就不需要顾虑这些限制了：

* 单文件组件
* 内联模板字符串 (例如 `template: '...'`)
* `<script type="text/x-template">`
:::


## 组件事件
::: tip
组件事件名字格式和prop一致
:::