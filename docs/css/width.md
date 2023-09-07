# width

# 盒模型

### 块级盒子（block box）

CSS中组成一个块级盒子需要：

- **Content box**: 这个区域是用来显示内容，大小可以通过设置 [width](https://developer.mozilla.org/zh-CN/docs/Web/CSS/width) 和 [height](https://developer.mozilla.org/zh-CN/docs/Web/CSS/height)
- **Padding box**: 包围在内容区域外部的空白区域；大小通过 [padding](https://developer.mozilla.org/zh-CN/docs/Web/CSS/padding) 相关属性设置。
- **Border box**: 边框盒包裹内容和内边距。大小通过 [border](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border) 相关属性设置。
- **Margin box**: 这是最外面的区域，是盒子和其他元素之间的空白区域。大小通过 [margin](https://developer.mozilla.org/zh-CN/docs/Web/CSS/margin) 相关属性设置。

![Untitled](/img/box.png)

### 标准盒模型   box-sizing: content-box

- width 和 height 实际设置的是 content box

### IE盒模型   box-sizing: border-box

- width 和 height 设置的是 content box + padding box + border box

## width `<percentage>`

**width: 50%**

- 普通定位的子元素，width: 50% = content-box * 50%
- <font color=red>绝对定位的子元素，width: 50%  = (content-box + padding-box) * 50% </font>
- 绝对定位的子元素，不设置 width、height（优先级更高） 可以设置 left、right、top、bottom 控制元素大小
::: tip
响应式布局中，可以利用这一特性，保证图片等比缩放
:::

<div class="relative w-96 h-96 bg-[#f1c40f]">
  <div class="absolute w-1/2 left-0 right-0  top-0 bottom-0 bg-[#3498db]"></div>
</div>