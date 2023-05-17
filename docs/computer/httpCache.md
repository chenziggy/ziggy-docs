# http 缓存

## 私有缓存
* 仅用于单个用户
* 在HTTP响应中添加了一些头信息
* 缓存数据只能在用户本地存储
```bash
Cache-Control: private, max-age=3600
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
Cache-Control: public, max-age=3600
```
进一步细分为代理缓存和托管缓存

### 代理缓存
除了访问控制的功能外，一些代理还实现了缓存以减少网络流量。这通常不由服务开发人员管理，因此必须由恰当的 HTTP 标头等控制
### 托管缓存
托管缓存由服务开发人员明确部署，以降低源服务器负载并有效地交付内容，包括反向代理、CDN 和 service worker 
### 
## 强缓存

击中强缓存不发送 http 请求，code 200

## 协商缓存

击中协商缓存发送 http 请求，code 304、body没有数据， http 存在 两对请求头
**ETag** 与 **If-None-Match** 或者 **If-Modified-Since** 与 **Last-Modified**，如果两对字段都不匹配，就没有击中协商缓存，那么就会请求服务器最新

* 禁止缓存   cache-control: no-store
* 缓存静态资源 cache-control:public, max-age=31536000 
* 需要重新验证缓存 Cache-Control: no-cache; max-age=0; must-revalidate 

https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Caching#%E4%B8%8D%E4%BD%BF%E7%94%A8%E7%BC%93%E5%AD%98