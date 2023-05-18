# http 缓存

## 私有缓存
* 仅用于单个用户
* 在HTTP响应中添加了一些头信息
* 缓存数据只能在用户本地存储
```bash
Cache-Control: private
```

一些应用程序需要将某些数据存储在私有缓存中，以便在应用程序的不同部分或页面之间共享这些数据。这种情况下，使用私有缓存可以保证数据不会被其他应用程序或用户访问和更改  

另一个使用私有缓存的情况是，当数据是针对特定用户或特定会话时。例如，将已登录用户的会话数据存储在私有缓存中，以便在同一用户的后续请求中共享  

私有缓存通常适用于数据敏感或需要安全性保障的应用程序
:::tip
`知乎`、`google` 大量使用 private  
`虎牙`、`bilibili` 未发现使用 private
:::

## 共享缓存
* 可以由多个用户或客户端共享一份缓存
* 通常存储在代理服务器缓存和CDN缓存
* 共享缓存通常用于静态资源 例如 JavaScript、CSS、图像等
```bash
Cache-Control: public
```
进一步细分为代理缓存和托管缓存


### 代理缓存
除了访问控制的功能外，一些代理还实现了缓存以减少网络流量。这通常不由服务开发人员管理，因此必须由恰当的 HTTP 标头等控制

### 托管缓存
托管缓存由服务开发人员明确部署，以降低源服务器负载并有效地交付内容，包括反向代理、CDN 和 service worker 

### 启发式缓存
尽可能多地缓存，即使没有给出 Cache-Control，如果满足某些条件，响应也会被存储和重用  
客户端存储此响应（尽管缺少 max-age）并重用它一段时间  
```
HTTP/1.1 200 OK
Content-Type: text/html
Content-Length: 1024
Date: Tue, 22 Feb 2022 22:22:22 GMT
Last-Modified: Tue, 22 Feb 2021 22:22:22 GMT
```
当前资源2021最后一次修改，推测它这么长时间未修改，最近也不会修改，响应被客户端复用
复用多长时间取决于实现，但规范建议存储后大约 10%，在这个例子中0.1年


## 基于 age 的缓存策略
存储的 HTTP 响应有两种状态：fresh 和 stale
* fresh 状态通常表示响应仍然有效，可以重复使用
* stale 状态表示缓存的响应已经过期

确定响应何时是 fresh 的和何时是 stale 的标准是 age，age 消息头里包含对象在缓存代理中存贮的时长，以秒为单位


```
HTTP/1.1 200 OK
Content-Type: text/html
Content-Length: 1024
Date: Tue, 22 Feb 2022 22:22:22 GMT
Cache-Control: max-age=604800
Age: 86400
```
max-age 604800 （一周）  
* 如果响应的 age 小于一周，则响应为 fresh
* 如果响应的 age 超过一周，则响应为 stale
* 该响应它在剩余的 518400 秒内是新鲜

## Vary 响应
Vary 字段用于指示服务器在响应中使用了哪些请求头部字段来确定缓存的有效性  
当客户端发送请求时，服务器会检查请求中的这些字段的值，以确定是否可以使用缓存的响应。如果请求中的这些字段的值与缓存的响应匹配，则服务器可以返回缓存的响应

常见的 Vary 字段值包括：
* Accept-Encoding：表示客户端支持的内容编码方式来确定缓存的有效性
* Accept-Language：表示客户端首选的语言来确定缓存的有效性
* Authorization：表示客户端的身份验证凭证来确定缓存的有效性

## 强缓存

击中强缓存不发送 http 请求，code 200

## 协商缓存

击中协商缓存发送 http 请求，code 304、body没有数据， http 存在 两对请求头
**ETag** 与 **If-None-Match** 或者 **If-Modified-Since** 与 **Last-Modified**，如果两对字段都不匹配，就没有击中协商缓存，那么就会请求服务器最新

* 禁止缓存   cache-control: no-store
* 缓存静态资源 cache-control:public, max-age=31536000 
* 需要重新验证缓存 Cache-Control: no-cache; max-age=0; must-revalidate 

https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Caching#%E4%B8%8D%E4%BD%BF%E7%94%A8%E7%BC%93%E5%AD%98