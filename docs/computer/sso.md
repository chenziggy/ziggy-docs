# 单点登录

SSO(Single Sign On) 在多个应用系统中，只需要登录一次，就可以访问其他相互信任的应用系统

## cookie
cookie 的特点，父域中的cookie 可以被子域继承，利用这一特性， 设置同一domain下的应用，单点登录
## jwt
无状态，服务器不需要存储
* Header（头部）： 包含了令牌类型（JWT）和使用的签名算法（例如 HMAC SHA256 或 RSA）等信息。这部分通常会被 Base64 编码
* Payload（负载）： 包含了声明（claims），声明是关于实体（通常是用户）和其他数据的声明性语句。有三种类型的声明：注册声明、公共声明和私有声明。这部分通常也会被 Base64 编码
* Signature（签名）： 用于验证令牌是否有效的签名部分。签名的内容是由头部、负载和一个密钥进行加密生成的。这个部分用于验证令牌的完整性和真实性

![](/img/jwt_structure.png)
## 认证中心
![](/img/sso_cas.png)

## 首次登录

* 用户访问app系统，app系统是需要登录的，但用户现在没有登录
* 跳转到CAS server，即SSO登录系统，以后图中的CAS Server我们统一叫做SSO系统。 SSO系统也没有登录，弹出用户登录页
* 用户填写用户名、密码，SSO系统进行认证后，将登录状态写入SSO的session，浏览器（Browser）中写入SSO域下的Cookie
* SSO系统登录完成后会生成一个ST（Service Ticket），然后跳转到app系统，同时将ST作为参数传递给app系统
* app系统拿到ST后，从后台向SSO发送请求，验证ST是否有效
* 验证通过后，app系统将登录状态写入session并设置app域下的Cookie

## 登录后访问其他应用
* 用户访问app2系统，app2系统没有登录，跳转到SSO （这里一般是访问接口 返回 302 临时重定向 res: 'https://sso.serve.com/?redirect=https://app2.com'）
* 由于SSO已经登录了，不需要重新登录认证
* SSO生成ST，浏览器跳转到app2系统，并将ST作为参数传递给app2
* app2拿到ST，后台访问SSO，验证ST是否有效
* 验证成功后，app2将登录状态写入session，并在app2域下写入Cookie


## 前端控制单点登录
* 可以选择将 Session ID （或 Token ）保存到浏览器的 LocalStorage 中，让前端在每次向后端发送请求时，主动将LocalStorage的数据传递给服务端
* 这些都是由前端来控制的，后端需要做的仅仅是在用户登录成功后，将 Session ID（或 Token）放在响应体中传递给前端
* 单点登录完全可以在前端实现。前端拿到 Session ID（或 Token ）后，除了将它写入自己的 LocalStorage 中之外，还可以通过特殊手段将它写入多个其他域下的 LocalStorage 中

```js
// 获取 token
const token = result.data.token

// 动态创建一个不可见的iframe，在iframe中加载一个跨域HTML
const iframe = document.createElement('iframe')
iframe.src = 'http://app1.com/localstorage.html'
document.body.append(iframe)
// 使用postMessage()方法将token传递给iframe
setTimeout(() => {
  iframe.contentWindow.postMessage(token, 'http://app1.com')
}, 4000)
setTimeout(() => {
  iframe.remove()
}, 6000)

// 在这个iframe所加载的HTML中绑定一个事件监听器，当事件被触发时，把接收到的token数据写入localStorage
window.addEventListener('message', (event) => {
  localStorage.setItem('token', event.data)
}, false)
```