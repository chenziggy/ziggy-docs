# blob

Blob （Binary Large Object） 对象表示一个不可变、原始数据的类文件对象

## property

* `Blob.prototype.size` 只读，Blob 对象中所包含数据的大小（字节）
* `Blob.prototype.type` 只读，一个字符串，表明该 Blob 对象所包含数据的 MIME 类型

## method
* `Blob.prototype.arrayBuffer()` 返回一个 promise，其会兑现一个包含 Blob 所有内容的二进制格式的 ArrayBuffer
* `Blob.prototype.slice()` 返回一个新的 Blob 对象，包含了源 Blob 对象中指定范围内的数据
* `Blob.prototype.stream()` 返回一个能读取 Blob 内容的 ReadableStream
* `Blob.prototype.text()` 返回一个 promise，其会兑现一个包含 Blob 所有内容的 UTF-8 格式的字符串

## 创建一个 blob

```js
const obj = { hello: 'world' }
const blob = new Blob([JSON.stringify(obj, null, 2)], { type: 'application/json' })

// 转化为 URL
const blobURL = URL.createObjectURL(blob)
```

# File

文件（File）接口提供有关文件的信息，并允许网页中的 JavaScript 访问其内容，File 对象是特殊类型的 Blob

通常 File 对象来自用户 <input type='file'> 选择文件后返回的 FileList 对象，或则 `paste copy` 事件 `event.clipboardData` 