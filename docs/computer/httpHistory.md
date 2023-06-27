# http 发展历史

## HTTP/0.9
1991年
* 方法单一，只有 get 方法
* 服务器只能回复 HTML 格式的字符串

## HTTP/1.0
1996年5月
* 任何格式的内容都可以发送，为互联网大发展奠定了基础
* 命令增加，引入 POST 和 HEAD 命令
* http 请求和回应的格式也变了。除了数据部分，每次通信都必须包括头信息（[http header](./httpHeader) ） ，用来描述一些元数据。头信息必须是 ASCII 码
* 非标准的 connection: keep-alive  tcp 复用

## HTTP/1.1
1997年1月
* 新增方法 PUT、PATCH、HEAD、 OPTIONS、DELETE
* 持久连接  不需要声明  connection: keep-alive，允许在单个 tcp 连接上发送多个请求和响应，减少了每次请求的连接建立和断开开销
* 流水线传输（pipelining），支持请求和响应的流水线传输。同一个 tcp 连接里面，客户端可以同时发送多个请求（但是服务器只有处理完一个 response 才会处理下一个，可能造成“队头堵塞”）
* 分块传输编码（Chunked Transfer Encoding）：HTTP 1.1 引入了分块传输编码，允许服务器将响应消息分成多个块进行传输，而不是等待整个响应消息完全生成。这对于传输大型响应或动态生成的响应非常有用，无需知道响应大小
* 缓存控制（Caching）：HTTP 1.1 引入了更灵活的缓存控制机制，包括使用Cache-Control头字段指定缓存策略、使用ETag和If-None-Match字段支持条件请求等，以提高缓存效率和减少网络传输

## HTTP/2