# regex demo

## 匹配url

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
const text = 'http://www.example.com/path?param1=value1&param2=value2#a'

// 使用正则表达式匹配URL
const urlRegex = /^(?:(https?):\/\/)?((?:|[\w-]+\.)+[a-z0-9]+)(?:(\/[^/?#]+)*)?(\?[^#]+)?(#.+)?$/i
const matches = urlRegex.exec(text)
console.log("🚀 ~ file: regexDemo.md:26 ~ matches:", JSON.stringify(matches))
</script>

## 解析url

```js
const test = 'https://www.example.com/path?param1=value1&param2=value2'
const urlRegex = /^(?:(https?):\/\/)?((?:|[\w-]+\.)+[a-z0-9]+)(?:(\/[^/?#]+)*)?(\?[^#]+)?(#.+)?$/i
const matches = text.match(httpRegex)
// ["http://www.example.com/path?param1=value1&param2=value2#a","http","www.example.com","/path","?param1=value1&param2=value2","#a"]
```