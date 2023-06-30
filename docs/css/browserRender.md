# 浏览器渲染
	
## 整体渲染流程
* 解析HTML生成DOM树			，HTML 解释器 将字符串 (标记节点)`<div></div>`转换为heap（堆）内存中的结构化对象（类似于JSON反序列化）
*	解析CSS生成CSSOM规则树
*	将DOM树与CSSOM规则树合并在一起生成渲染树
*	遍历渲染树开始`布局`（layout），计算每个节点的位置大小信息
*	将渲染树每个节点`绘制`（painting）到屏幕

![browser_render_1](/img/browser_render_1.png)


## js 改变页面
![browser_render_2](/img/browser_render_2.png)

* javascript 做一个动画或者添加、移除DOM
* style 计算样式，根据CSS选择器，对每一个DOM匹配对应CSS样式
* layout 根据DOM CSS样式，计算每一个DOM最终在屏幕上显示大小和位置
* paint 绘制，填充像素的过程，绘制文字、颜色、图像、边框、阴影，一个DOM元素所有的可视效果，绘制过程是在多个层上完成的
* composite 渲染层合并，DOM元素绘制发生在多层，浏览器需要按照合理顺序合并成一个图层

## 渲染原理
![browser_render_3](/img/browser_render_3.png)

### Node
*	在浏览器中，页面内容存储在由 Node 对象组成的 DOM 树
*	每一个HTML element元素 都有一个Node对象与之对应
*	DOM树的根节点永远都是 Document Node
*	DOM树的每一个Node节点都有一个对应的 Layout Object

### Layout Object
* Layout Object（布局对象）通常是指在布局阶段生成的用于描述元素布局信息的对象，它包含了元素的位置、尺寸、边界框等属性
* 拥有相同的坐标空间的 Layout Object 属于同一个渲染层（PaintLayer）

### 渲染层 PaintLayer
渲染层分为 3 种分别是：
#### NormalPaintLayer
*	根元素 HTML
*	明确定位属性 （relative fixed  sticky absolute）
*	透明度 opacity < 1
*	CSS 滤镜 filter
*	CSS mix-blend-mode 
*	transform 不为 none
*	...
####	OverflowClipPaintLayer
* overflow 不为 visible
####	NoPaintLayer
* 不需要 paint （例如空div）

### 图形层 GraphicsLayers
某些特殊的渲染层被认为是合成层( Compositing Layers) ，合成层有用单独的 GraphicsLayer
而其他不是合成层的渲染层，则和其他第一个拥有 GraphicsLayer 渲染层共用一个

:::tip
chrome 对 Blank 引擎某些实现进行修改， RenderObject  => Layout Object   RenderLayer => PaintLayer
:::


###	渲染层提升成合成层
			 合成层 没有 layout 和 paint
			该渲染层必须是 SelfPaintingLayer（基本可认为是上文介绍的 NormalPaintLayer）
			直接原因
				硬件加速的 iframe 元素
				video 元素
				覆盖在 video 元素上的视频控制栏
				3D 或者 硬件加速的 2D Canvas 元素
				有 3D transform
				backface-visibility 为 hidden
				对 opacity、transform、fliter、backdropfilter 应用了 animation 或者 transition（需要是 active 的 animation 或者 transition，当 animation 或者 transition 效果未开始或结束后，提升合成层也会失效）
			overlap 重叠原因
			后代元素原因
			提升为合成层最好的方式
				will-change
				transform 3D (遇到兼容问题使用)
			提升为合成层优点
				合成层的位图，交由GPU合成，比CPU处理快
				当需要repaint，只需要渲染本身，不影响其他层
				transform 和 opacity效果，不会触发layout和 paint
			合成层缺点
				每一个合成层都需要上传GPU处理，消耗CPU到GPU带宽
				占用内存增大