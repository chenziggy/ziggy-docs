# 跨域
浏览器出于安全原因会实施同源策略（Same-Origin Policy），默认情况下网页脚本只能访问与其来源相同的域名、端口和协议下的资源

Cross-Origin 网页脚本视图访问另一个域名下的资源

* CORS需要浏览器和服务器同时支持，浏览器自动完成，服务器需要实现CORS接口

## CORS 预检请求
跨域中非简单请求时，浏览器会自动发出一个预检请求（OPTIONS），`Access-Control-Request-Headers`、`Access-Control-Request-Method`、`Origin`
从而获取服务端是否允许该资源跨域

![预检请求](/img/cors_option.png)


## 简单请求

* 请求方法	`HEAD`	`GET`	`POST`
* 请求头 `Accept`	`Accept-Language`	`Content-Language`	`Content-Type : (text/plain multipart/form-data application/x-www-form-urlencoded)`

##	非简单请求 
先发送 OPTIONS 预检请求，获取服务器允许跨域后，再发送跨域请求

*	请求方法   PUT DELETE 
* 请求头 Content-Type: application/json 等 (Content-Type 需要服务器设置对应的)

:::tip
默认情况，跨域请求不会发送身份凭证信息Cookie，如果需要发送凭证信息，需要设置
* 客户端`xhr.withCredentials = true`
* 服务端响应头添加 `Access-Control-Allow-Credentials: true`，（否则响应会被忽略）
:::

## 服务端设置跨域
```js
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000') // 跨域来源
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE') // 跨域方法
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type') // 跨域header
  res.setHeader('Access-Control-Allow-Credentials', 'true') // 跨域请求携带 cookie
  next()
})
```

## JSONP
```html
<script>
    function myFunction (data) {
        alert('获取数据成功，2s后改变数据！')
        let p = document.getElementsByTagName('p')[0]
        setTimeout(function () {
            p.innerHTML = data.message
        }, 2000)
        // 2s后p标签内的内容将改变
    }
</script>
<script src="http://localhost:3001?callback=myFunction"></script>
```

```js
// server.js
app.get('/', (req, res) => {
  const callbackName = req.query.callback // myFunction
  res.send(`${callbackName}({'message': 'hello world from JSONP!🙃'});`)
  // myFunction({'message': 'hello world from JSONP!'})
  // 一个带参数的执行函数
})
```

