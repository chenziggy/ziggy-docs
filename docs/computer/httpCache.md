# http 缓存

## 私有缓存
* 仅用于单个用户
* 在HTTP响应中添加了一些头信息
* 只能被客户端缓存，不能被中间代理服务器缓存
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

:::tip
启发式缓存是在 Cache-Control 被广泛采用之前出现的一种解决方法
:::
### 基于 age 的缓存策略
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

:::tip
只有在设置了 Authorization 标头时需要存储响应时才应使用 public 指令。否则不需要，因为只要给出了 max-age，响应就会存储在共享缓存中
:::
### Vary 响应
Vary 字段用于指示服务器在响应中使用了哪些请求头部字段来确定缓存的有效性  
当客户端发送请求时，服务器会检查请求中的这些字段的值，以确定是否可以使用缓存的响应。如果请求中的这些字段的值与缓存的响应匹配，则服务器可以返回缓存的响应

常见的 Vary 字段值包括：
* Accept-Encoding：内容编码方式来确定缓存的有效性
* Accept-Language：首选的语言来确定缓存的有效性
* Authorization：身份验证凭证来确定缓存的有效性

### 验证响应
过时的响应不会立即被丢弃。HTTP 有一种机制，可以通过询问源服务器将陈旧的响应转换为新的响应。这称为验证，有时也称为重新验证
####  If-Modified-Since
验证是通过使用包含 If-Modified-Since 或 If-None-Match 请求标头的条件请求完成的
```
HTTP/1.1 200 OK
Content-Type: text/html
Content-Length: 1024
Date: Tue, 22 Feb 2022 22:22:22 GMT
Last-Modified: Tue, 22 Feb 2022 22:00:00 GMT
Cache-Control: max-age=3600
```
1. 响应在 22:22:22 生成，max-age 为 1 小时，因此响应在 23:22:22 之前是新鲜的 fresh
2. 过了 23:22:22 时，响应会过时并且不能重用缓存，客户端发送带有 If-Modified-Since 请求标头的请求，以询问服务器自指定时间以来是否有任何的改变
```
GET /index.html HTTP/1.1
Host: example.com
Accept: text/html
If-Modified-Since: Tue, 22 Feb 2022 22:00:00 GMT
```
3. 如果内容自指定时间以来没有更改，服务器将响应 304 Not Modified，响应主体——只有一个状态码——因此传输大小非常小
```
HTTP/1.1 304 Not Modified
Content-Type: text/html
Date: Tue, 22 Feb 2022 23:22:22 GMT
Last-Modified: Tue, 22 Feb 2022 22:00:00 GMT
Cache-Control: max-age=3600
```
4. 收到该响应后，客户端将存储的陈旧响应恢复为新鲜的，并可以在剩余的 1 小时内重复使用它

#### ETag/If-None-Match
ETag 响应标头的值是服务器生成的任意值，常用主体内容的哈希或版本号
```
HTTP/1.1 200 OK
Content-Type: text/html
Content-Length: 1024
Date: Tue, 22 Feb 2022 22:22:22 GMT
ETag: "deadbeef"
Cache-Control: max-age=3600
```
1. ETag 标头使用了 hash 值，index.html 资源的 hash 值是 deadbeef
2. 如果该响应是陈旧的，则客户端获取缓存响应的 ETag 响应标头的值，并将其放入 If-None-Match 请求标头中，以询问服务器资源是否已被修改
```
GET /index.html HTTP/1.1
Host: example.com
Accept: text/html
If-None-Match: "deadbeef"
```
3. 如果服务器为请求的资源确定的 ETag 标头的值与请求中的 If-None-Match 值相同，则服务器将返回 304 Not Modified

:::tip
* 如果 ETag 和 Last-Modified 都存在，则 ETag 优先 
* Last-Modified 不仅仅对缓存有用,相反，它是一个标准的 HTTP 标头，内容管理 (CMS) 系统也使用它来显示上次修改时间
* 最好同时提供 ETag 和 Last-Modified
:::

#### 强制重新验证
如果你不希望重复使用响应，而是希望始终从服务器获取最新内容，则可以使用 no-cache 指令`强制验证`  
Cache-Control: no-cache 以及 Last-Modified 和 ETag
```
HTTP/1.1 200 OK
Content-Type: text/html
Content-Length: 1024
Date: Tue, 22 Feb 2022 22:22:22 GMT
Last-Modified: Tue, 22 Feb 2022 22:00:00 GMT
ETag: deadbeef
Cache-Control: no-cache
```
max-age=0 和 must-revalidate 的组合与 no-cache 相同  
max-age=0 的使用是解决 HTTP/1.1 之前的许多实现无法处理 no-cache 这一指令，优先使用 no-cache

### 不使用缓存
如果你不希望将响应存储在任何缓存中，请使用 no-store
```
Cache-Control: no-store
```


## 强缓存

击中强缓存不发送 http 请求，code 200

## 协商缓存

击中协商缓存发送 http 请求，code 304、body没有数据， http 存在 两对请求头
**ETag** 与 **If-None-Match** 或者 **If-Modified-Since** 与 **Last-Modified**，如果两对字段都不匹配，就没有击中协商缓存，那么就会请求服务器最新

* 禁止缓存   cache-control: no-store
* 缓存静态资源 cache-control:public, max-age=31536000 
* 需要重新验证缓存 Cache-Control: no-cache; max-age=0; must-revalidate 

https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Caching#%E4%B8%8D%E4%BD%BF%E7%94%A8%E7%BC%93%E5%AD%98


## 浏览器解决缓存问题

### request header
* `If-Modified-Since`: 0
* `Cache-Control`: no-cache

### url中增加随机数

* `fresh=`+ Math.random()
* `nowtime=` + new Date().getTime()