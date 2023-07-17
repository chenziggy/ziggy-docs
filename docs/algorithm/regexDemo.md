# regex demo

## 解析url

```js
const text = '这是一个包含URL的字符串，例如 https://www.example.com/path?param1=value1&param2=value2'

// 使用正则表达式匹配URL
const urlRegex = /https?:\/\/[^\s/$.?#].[^\s]*/g
const matches = text.match(urlRegex)

if (matches) {
  // 提取每个匹配的URL
  matches.forEach((url) => {
    console.log(url)
  })
}
```

<script>
//  const text = '这是一个包含URL的字符串，例如 https://www.example.com/path?param1=value1&param2=value2';
const text = '$.example.com/path?param1=value1&param2=value2'

// 使用正则表达式匹配URL
const urlRegex = /[^\s/$.?#].[^\s]*/g;
const matches = text.match(urlRegex);


if (matches) {
  // 提取每个匹配的URL
  matches.forEach((url) => {
    console.log(url, " ");
  });
} 
</script>