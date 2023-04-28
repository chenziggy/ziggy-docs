# http 缓存

## 强缓存

击中强缓存不发送 http 请求，code 200

## 协商缓存

击中协商缓存发送 http 请求，code 304、body没有数据， http 存在 两对请求头
**ETag** 与 **If-None-Match** 或者 **If-Modified-Since** 与 **Last-Modified**，如果两对字段都不匹配，就没有击中协商缓存，那么就会请求服务器最新

* 禁止缓存   cache-control: no-store
* 缓存静态资源 cache-control:public, max-age=31536000 
* 需要重新验证缓存 Cache-Control: no-cache; max-age=0; must-revalidate 

https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Caching#%E4%B8%8D%E4%BD%BF%E7%94%A8%E7%BC%93%E5%AD%98