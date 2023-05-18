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