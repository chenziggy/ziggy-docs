# url

## URL()
创建并返回一个URL对象 new URL("https://www.example.com:8080/index.html?param=type")
* `origin`  "https://www.example.com:8080"
* `host`  "www.example.com:8080"
* `hostname` "www.example.com"
* `pathname`  "/index.html"
* `search`  "?param=type"
* `searchParams`  URLSearchParams \{size: 1\}  

## window.location
`window.location`是一个对象，包含了当前页面的 URL 信息，可以通过这些属性来获取或修改页面的 URL 信息
```js
// 当前页面url https://www.baidu.com/index.html?param=type&order=desc
window.location.host="www.google.com"
// 页面跳转到https://www.google.com/index.html?param=type&order=desc
```

## encodeURI()
encodeURI 会替换所有的字符，但不包括以下字符，即使它们具有适当的 UTF-8 转义序列：
| 类型     | 包含                      |
|--------|-------------------------|
| 保留字符   | ; , / ? : @ & = + $     |
| 非转义的字符 | 字母 数字 - _ . ! ~ * ' ( ) |
| 数字符号   | #                       |
:::tip
请注意，encodeURI 自身无法产生能适用于 HTTP GET 或 POST 请求的 URI，例如对于 XMLHTTPRequests，因为 "&", "+", 和 "=" 不会被编码，在 GET 和 POST 请求中它们是特殊字符
:::

## encodeURIComponent
encodeURIComponent 会替换所有的字符，但不包括以下字符：
| 类型     | 包含                      |
|--------|-------------------------|
| 非转义的字符 | 字母 数字 - _ . ! ~ * ' ( ) |
```js
var set1 = ";,/?:@&=+$";  // 保留字符
var set2 = "-_.!~*'()";   // 不转义字符
var set3 = "#";           // 数字标志
var set4 = "ABC abc 123"; // 字母数字字符和空格

console.log(encodeURI(set1)); // ;,/?:@&=+$
console.log(encodeURI(set2)); // -_.!~*'()
console.log(encodeURI(set3)); // #
console.log(encodeURI(set4)); // ABC%20abc%20123 (空格被编码为 %20)

console.log(encodeURIComponent(set1)); // %3B%2C%2F%3F%3A%40%26%3D%2B%24
console.log(encodeURIComponent(set2)); // -_.!~*'()
console.log(encodeURIComponent(set3)); // %23
console.log(encodeURIComponent(set4)); // ABC%20abc%20123 (空格被编码为 %20)
```

## URLSearchParams
```js
// 当前页面url的参数 https://www.baidu.com/index.html?param=type&order=desc
const params = new URLSearchParams(window.location.search)
for (const [key, value] of params) {
  console.log(key, value)
}
// param type
// order desc
```
