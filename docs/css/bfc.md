# BFC
block formatting context  区块格式化上下文

通常，我们会为定位和清除浮动创建新的 BFC，而不是更改布局

BFC 元素可以看做隔离的独立容器，容器内部元素的布局不会影响外部的元素



## 创建BFC
* 文档的根元素（`<html>`）
* 浮动元素（即 float 值不为 none 的元素）
* 绝对定位元素（position 值为 absolute 或 fixed 的元素）
* 行内块元素（display 值为 inline-block 的元素）
* 表格单元格（display 值为 table-cell，HTML 表格单元格默认值）
* overflow 值不为 visible 或 clip 的块级元素
* display 值为 flow-root 的元素
* 弹性元素（display 值为 flex 或 inline-flex 元素的直接子元素），如果它们本身既不是弹性、网格也不是表格容器
* 网格元素（display 值为 grid 或 inline-grid 元素的直接子元素），如果它们本身既不是弹性、网格也不是表格容器


## 特点
* 包含内部浮动，BFC 使得让浮动内容和周围的内容等高
* 排除外部浮动，在同一个BFC下的两个浮动元素不重叠
* 同一个BFC下的元素边距可以重叠，不同BFC阻止外边距


包含内部浮动（清除浮动）
```html
<div class="box">
	<div class="float">我是浮动的盒子！</div>
	<p>我是容器内的内容。</p>
</div>

<style>
.box {
  background-color: rgb(224, 206, 247);
  border: 5px solid rebeccapurple;
}

.float {
  float: left;
  width: 200px;
  height: 100px;
  background-color: rgba(255, 255, 255, .5);
  border:1px solid black;
  padding: 10px;
}
</style>
```

排除外部浮动，浮动元素不重叠
```html
<div>
	<div class="float">试试重新调整这个外部浮动元素的大小</div>
  <div class="box" style="display:flow-root"><p>
</div>

<style>
.box {
  background-color: rgb(224, 206, 247);
  border: 5px solid rebeccapurple;
}

.float {
  float: left;
  width: 200px;
  height: 100px;
  background-color: rgba(255, 255, 255, .5);
  border:1px solid black;
  padding: 10px;
}
</style>
```