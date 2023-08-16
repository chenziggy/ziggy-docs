# http status code

## 1**	信息，服务器收到请求，需要请求者继续执行操作
*	100 Continue 客户端继续请求
*	101 Switching Protocols 切换高版本协议

## 2**	成功，操作被成功接收并处理
*	200 OK
*	201 Created 创建成功
*	202  Accepted  已接受，未处理完成
*	203 Non-Authoritative  非授权信息
*	204 No Content  无内容，服务器处理成功，但未返回内容
*	206  Range 成功状态响应代码表示请求已成功，并且主体包含所请求的数据区间

## 3**	重定向，需要进一步的操作以完成请求
*	300 Multiple Choices 多种选择
*	301 Moved Permanently 资源被永久移动
*	302 Found 临时移动，可以继续使用原URI
*	304 Not Modified 未修改，客户端已缓存过的资源

:::tip
重定向，需求进一步操作
* 301 Moved Permanently 当前 url 资源被移除，返回新的 url。客户端下次需要访问新的 url
* 302 Found 当前 url 资源临时移动，返回新的 url，客户端下次还可以访问当前 url
:::
## 4**	客户端错误，请求包含语法错误或无法完成请求
*	400 Bad Request 语法错误
*	401 Unauthorized 请求要求用户身份认证
*	402 Payment Required 需要付费才能访问
*	403 Forbidden 拒绝访问
*	404 Not Found 资源无法找到

## 5**	服务器错误，服务器在处理请求的过程中发生了错误
*	500 Internal Server Error 服务器内部错误
*	501 Not Implemented 请求未实现
*	502 Bad Gateway  网关或代理服务器访问远程服务器接收到无效的响应
*	503 Service Unavailable	 服务器维护或超载
*	504 Gateway Time-out 网关或代理服务器请求超时
