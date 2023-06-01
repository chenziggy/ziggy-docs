# http header

## Cache-Control
Cache-Control 通用消息头字段，被用于在 http 请求和响应中，通过指定指令来实现[缓存机制](./httpCache.md)  
缓存指令是单向的，这意味着在请求中设置的指令，不一定被包含在响应中

缓存请求指令
```
Cache-Control: max-age=<seconds>     # 告知服务器在该时间内可以使用缓存的响应，而无需再次发送请求
Cache-Control: max-stale[=<seconds>]
Cache-Control: min-fresh=<seconds>
Cache-control: no-cache      # 指示服务器不要返回缓存的响应，而要求始终返回最新的内容
Cache-control: no-store      # 指示服务器不要缓存任何内容，包括请求和响应
Cache-control: no-transform
Cache-control: only-if-cached
```

缓存响应指令  
服务器可以控制缓存的行为，指示客户端和中间代理服务器如何处理响应的缓存
```
Cache-control: must-revalidate
Cache-control: no-cache
Cache-control: no-store
Cache-control: no-transform
Cache-control: public       # 指示响应可以被任何缓存（包括客户端和代理服务器）缓存
Cache-control: private      # 指示响应只能被客户端缓存，不能被中间代理服务器缓存
Cache-control: proxy-revalidate
Cache-Control: max-age=<seconds>  # 客户端和中间代理服务器可以根据该值来决定响应的缓存有效期
Cache-control: s-maxage=<seconds>
```


## Date
响应创建的日期和时间
```
Date: Wed, 21 Oct 2015 07:28:00 GMT
```
[启发式缓存](./httpCache.md#启发式缓存) 利用 `Date` `Last-Modified` 计算缓存时间

## Age
Age 响应头里包含对象在缓存代理中存贮的时长，以秒为单位
```
Age: 24
```
响应是24秒前从原始服务器获取  
[基于 age 的缓存策略](./httpCache.md#基于-age-的缓存策略) 通过 `Age` 与 `Cache-Control: max-age`  对比缓存是否新鲜

## Last-Modified
Last-Modified 包含源头服务器认定的资源做出修改的日期及时间  
[验证响应](./httpCache.md#验证响应) 通常与 `If-Modified-Since` 被用作一个验证器来判断接收到的或者存储的资源是否彼此一致

## ETag
资源的特定版本的标识符，资源变化 ETag 必定变化
```
ETag: W/"276f7dbce2395416275a0f05181ff7be"

```
[验证响应](./httpCache.md#验证响应) 通常与 请求头 `If-None-Match` 比较资源是否变化

## Access-Control-Allow-Origin
响应的资源是否被允许与给定的来源（origin）共享
```
Access-Control-Allow-Origin: *        # 服务器会以“*”作为通配符，允许任意来源的请求都具有访问资源的权限
Access-Control-Allow-Origin: <origin> # 指定一个来源（只能指定一个）
```
服务器允许多个源访问资源，需要在响应中动态设置响应头 `Access-Control-Allow-Origin` 指定当前请求的 origin

## Authorization
请求头用于提供服务器验证用户代理身份的凭据，允许访问受保护的资源  
通过Authorization 访问的资源需要缓存时，`Cache-Control` 必须设置 `public`

## Content-Type
```
text/plain
text/html
text/css
image/jpeg
audio/mp4
multipart/data-form
application/json
application/x-www-form-urlencoded
...
```
* [text/plain](./httpRequestBody.md#text-plain)
* [application/json](./httpRequestBody.md#application-json)
* [application/x-www-form-urlencoded](./httpRequestBody.md#application-x-www-form-urlencoded)
* [multipart/form-data](./httpRequestBody.md#multipart-form-data)

查询更多的 [MIME Type](https://www.iana.org/assignments/media-types/media-types.xhtml)

## Provisional headers are shown
请求被插件（AdBlock、AdGuard）拦截
![Untitled](/img/extension_block.png)

