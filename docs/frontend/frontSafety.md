# 前端安全

## XSS 跨站脚本
击者通过在受信任的网页中注入恶意脚本，使得浏览器在加载和渲染页面时执行这些恶意脚本
* 用户会话劫持
* 钓鱼攻击
* 恶意重定向
* 点击劫持
* 挂马
* XSS蠕虫

### 存储型 XSS
攻击者将恶意脚本注入到目标网站的数据库中，当用户访问包含恶意脚本的页面时，网站从数据库中读取并呈现这些脚本，导致脚本在用户的浏览器中执行

* 喜马拉雅
![](/img/xss_database.png)
用户访问该页面，将会执行`http://t.cn/RAdReE`脚本

### 反射型 XSS
攻击者通过诱使用户点击包含恶意脚本的恶意链接，使得恶意脚本作为参数被发送到目标网站的服务器。服务器将恶意脚本在响应中返回给用户的浏览器，并在浏览器中执行。

#### document.write
```html
<html>
<body>
<form>
  <input type="text" name="keyword">
  <input type="submit" value="Search">
</form>

<script>
  const url = new URL(window.location);
  const keyword = url.searchParams.get("keyword");

  document.write("You searched for: " + keyword); 
</script>
</body>
</html>
```

恶意链接：http://localhost:5171/?keyword=%3Cimg%20src=x%20onerror=alert(1)%3E
![](/img/xss_reflect.png)
* html 内容进行转译
* 废弃 document.write() 可以使用更明确和安全的 DOM 方法如textContent、innerHTML、appendChlid()，（安全性是相对的）

#### a 标签
```html
<html>
<body>

<form>
  <input type="text" name="keyword">
  <input type="submit" value="Search">
</form>
<a>xss攻击</a>

<script>
  const url = new URL(window.location);
  const keyword = url.searchParams.get("keyword");
  document.querySelector('a').href = keyword
</script>

</body>
</html>
```
恶意链接：http://localhost:5171/?keyword=javascript:alert(%27XSS%27)
![](/img/xss_reflect.png)
* a 标签 href 禁止掉 "javascript:" 链接、非法 scheme

### DOM XSS
利用浏览器 DOM 解析和操作 HTML文档实现，攻击注入恶意代码，使浏览器进行解析，这种攻击与依赖服务器响应
```html
<html>
<body>
<input id="searchInput">
<button id="searchButton">Search</button>

<script>
const input = document.getElementById("searchInput");
const button = document.getElementById("searchButton");

button.addEventListener("click", () => {
  const value = input.value;
  document.getElementById("result").innerHTML = value;
});
</script>

<div id="result"></div>
</body>
</html>
```
input 输入：`<img src=x onerror=alert(1)>`

:::tip
xss 小游戏： https://xss-game.appspot.com/level1
:::

## CSRF 跨站请求伪造
黑客引诱用户打开黑客的网站，黑客利用用户登录状态发起跨站请求

### demo
1. 假设一个论坛网站forum.com,用户登录后可以发帖
2. 攻击者可以在自己控制的网站evil.com中植入以下HTML:
```html
<img src="http://forum.com/newthread?title=spam&content=spam">
```
3. 当用户登录 forum.com 之后，打开 evil.com
4. forum.com 收到请求后，会以用户身份创建标题和内容分别为"spam"的帖子
5. 这样攻击者就利用用户在 forum.com 的身份，执行了未经用户授权的操作

防治
* cookie SameSite
* 验证请求来源  http header origin referer
* CSRF Token