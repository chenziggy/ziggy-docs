# http 报文结构

## http request

请求报文
* 请求行
* 请求头
* 空行
* 请求体

|     |      |     |     |     |           |     |     |
|-----|------|-----|-----|-----|-----------|-----|-----|
| 请求行 | 请求方法 | 空格  | URI | 空格  | HTTP 协议版本 | 回车符 | 换行符 |
| 请求头 | 头字段名 | ：   | 值   | 回车符 | 换行符       |     |     |
|     | ...  | ：   | ... |     |           |     |     |
|     | 头字段名 | ：   | 值   | 回车符 | 换行符       |     |     |
| 空行  | 回车符  | 换行符 |     |     |           |     |     |
| 请求体 |      |     |     |     |           |     |     |


## http response

响应报文
* 状态行
* 响应头
* 空行
* 响应体

|     |           |     |     |     |        |     |     |
|-----|-----------|-----|-----|-----|--------|-----|-----|
| 状态行 | HTTP 协议版本 | 空格  | 状态码 | 空格  |  状态码描述 | 回车符 | 换行符 |
| 响应头 | 头字段名      | ：   | 值   | 回车符 | 换行符    |     |     |
|     | ...       | ：   | ... |     |        |     |     |
|     | 头字段名      | ：   | 值   | 回车符 | 换行符    |     |     |
| 空行  | 回车符       | 换行符 |     |     |        |     |     |
| 响应体 |           |     |     |     |        |     |     |
