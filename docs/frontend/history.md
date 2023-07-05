# history
History 接口允许操作浏览器的曾经访问的会话历史记录

## property
* history.length 该回话历史元素长度
* scrollRestoration 在历史导航上显式地设置默认滚动恢复行为 
 `auto` 将恢复用户已滚动到的页面上的位置 
 `manual` 用户必须手动滚动到该位置
* state 返回 history 栈顶的值拷贝

## method

* back()  方法会在会话历史记录中向后移动一页。如果没有上一页，则此方法调用不执行任何操作
* forward() 在会话历史中向前移动一页。它与 history.go(1) 相同
* go()  可以使用它在历史记录中前后移动，具体取决于 `delta` 参数的值，负值表示向后移动，正值表示向前移动， 0 或 不传参 重新加载当前页面
* pushState() 向浏览器的会话历史栈增加了一个条目
* replaceState()  修改当前历史记录

### pushState
异步方法，它允许你在不刷新整个页面的情况下，修改浏览器的历史记录栈和当前页面的 URL

#### params
* state 状态对象， 16MB 大小限制
* unused 空字符串，必填
* url  新历史条目的 URL 可选

```js
history.pushState({ name: 'ziggy' }, '', 'baidu.html')
// history.length 2
history.pushState({ name: 'cs' }, '', 'google.html')
// history.length 3
history.pushState({ name: 'ziggy' }, '', 'baidu.html')
// history.length 4
// 相同url state 也会新增条目
```

#### pushState  hash
调用 pushState() 类似于 window.location = "#foo"，它们都会在当前的文档中创建和激活一个新的历史条目。但是 pushState() 有以下优势：

* 新的 URL 可以是任何和当前 URL 同源的 URL。然而，如果你仅修改 hash，将其设置到 window.location，将使你留在同一文档中（路劲相同只有hash不同）
* 改变页面的 URL 是可选的。相反，设置 window.location = "#foo"; 仅仅会在当前 hash 不是 #foo 情况下，创建一条新的历史条目
* 你可以使用你的新历史条目关联任意数据 （state）。使用基于 hash 的方式，你需要将所有相关的数据编码为一个短字符串


:::tip
 注意，pushState() 从未引起 hashchange 事件的触发，即使新 URL 与旧 URL 仅在 hash 上不同
:::

### replaceState
使用state objects, title,和 URL 作为参数，修改当前历史记录实体，如果你想更新当前的 state 对象或者当前历史实体的 URL 来响应用户的的动作的话这个方法将会非常有用

### popstate
浏览器行为，当激活同一个文档中不同的历史记录条目时， popstate 事件就会触发，如果当前处在激活状态的历史条目是通过 `pushState` `replaceState` 生成的， popstate 的参数state 对应条目的 state


```js
window.onpopstate = function (event) {
  alert(`location: ${document.location}, state: ${JSON.stringify(event.state)}`)
}

history.pushState({ page: 1 }, 'title 1', '?page=1')
history.pushState({ page: 2 }, 'title 2', '?page=2')
history.replaceState({ page: 3 }, 'title 3', '?page=3')
history.back() // 弹出 "location: http://example.com/example.html?page=1, state: {"page":1}"
history.back() // 弹出 "location: http://example.com/example.html, state: null
history.go(2) // 弹出 "location: http://example.com/example.html?page=3, state: {"page":3}
```

:::tip
调用 `pushState` `replaceState`  不会触发 popstate 
:::