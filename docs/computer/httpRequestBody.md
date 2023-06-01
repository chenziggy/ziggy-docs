# http request body

## application/x-www-form-urlencoded
用于在HTTP请求中传输表单数据，它是一种 [URL](/frontend/url.md) 编码格式，用于将表单字段和值转换为键值对的形式

### 编码
* 字段名和值通过等号（=）连接。
* 不同字段之间使用与号（&）进行分隔。
* 特殊字符会进行编码转换。例如，空格会转换为加号（+），非字母数字字符会转换为百分号（%）后跟两位十六进制数表示。

```
page=1&rows=30&id=890
```
优点数据简单
缺点数据类型单只支持字符串不支持布尔、数字、对象、数组；对于存在`= &`符号的值需要使用 [encodeURIComponent](/frontend/url.md#encodeuricomponent) 进行编码

## multipart/form-data
在 HTTP 请求中传输带有文件上传的表单数据。它允许同时传输文本字段和二进制文件数据  
请求的主体被分割成多个部分（即多部分内容）
相较于 
```
Content-Type: multipart/form-data; boundary=---------------------------1234567890
```

## application/json
数据以JSON格式编码，支持布尔、数字、对象、数组等
```
[
  {"id": 1, "name": "Object 1"},
  {"id": 2, "name": "Object 2"},
  [
    "Nested", "Array"
  ]
]
```

## text/plain
是一种表示纯文本数据的 MIME 类型