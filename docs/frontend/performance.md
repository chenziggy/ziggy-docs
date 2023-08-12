# 前端性能

对于前端应用来说，网络耗时、页面加载耗时、脚本执行耗时、渲染耗时等耗时情况会影响用户的等待时长，而 CPU 占用、内存占用、本地缓存占用等则可能会导致页面卡顿


## 网络请求优化
减少网络资源的请求和加载耗时

* 请求链路： DNS查询、部署CDN节点、缓存
* 数据大小：代码大小、图片资源等
* 减少请求次数：雪碧图、小图片base64、字体图片

### 请求链路

* DNS缓存 CDN缓存 http缓存 HTTP/2  HTTP/3

### 数据大小
* 代码拆分 代码压缩 图片压缩 webp gzip


## 首屏加载优化
FCP (first contenful paint) 首屏渲染，首批文本和图像元素在屏幕上完成渲染的时间点
```js
new PerformanceObserver((entryList) => {
  for (const entry of entryList.getEntriesByName(
    'first-contentful-paint'
  ))
    console.log('FCP candidate:', entry.startTime, entry)

}).observe({ type: 'paint', buffered: true })
```
* 将页面内容尽快地展示给用户，减少页面白屏时间
骨架片、loading 动画、SSR
* 将用户可操作的时间尽量提前，避免用户无法操作的卡顿体验
* 首屏图片加载 渐进式图片加载

### 最大内容绘制
LCP(Largest Contentful Paint) 最大内容绘制 可视区域内可见的最大图像或文本块完成渲染的时间，（最大图像和文本块两者只有一个）

![LCP](/img/lcp.png)

instagram 最大内容是图像，google最大内容是文本块

## 可交互时间优化

### 可交互时间
TTI (time to interactive) 可交互时间

* First Contentful Paint 开始沿时间轴正向搜索时长至少为 5 秒的安静窗口（安静窗口的定义为：没有长任务且不超过两个正在处理的网络 GET 请求）
沿时间轴反向搜索安静窗口之前的最后一个长任务，如果没有找到长任务，则与 FCP 值相同）
<img style="background: #d2d3d7" src="/img/tti.svg" alt="TTI">
* 使用资源预加载，提升空闲时间的资源利用率
* 减少 DOM 操作，较少重绘、回流
* 使用离屏渲染（渲染层提升到合成层 ），将复杂动画、3D变化、视频、canvas 减少影响主线程性能

### 首次输入延迟
FID (First Input Delay) 从用户第一次与页面交互（例如当他们单击链接、点按按钮或使用由 JavaScript 驱动的自定义控件）直到浏览器对交互作出响应，并实际能够开始处理事件处理程序所经过的时间   （用户体验）

<img style="background: #d2d3d7" src="/img/fid.svg" alt="FID">

```js
new PerformanceObserver((entryList) => {
  for (const entry of entryList.getEntries()) {
    const delay = entry.processingStart - entry.startTime
    console.log('FID candidate:', delay, entry)
  }
}).observe({ type: 'first-input', buffered: true })
```

## 计算/逻辑运行提速

* 将javascript 大任务进行拆分、结合异步任务管理，避免长时间计算导致页面开端
* 将耗时长且非关键逻辑的计算拆离，比如使用 Web Worker
* 提升运行效率，比如 Webassembly
* 通过使用更优的算法或是存储结构，比如LRU
