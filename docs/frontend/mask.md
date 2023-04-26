# mask

在查看**mdn**文档时，会经常看见废弃语法，废弃语法的标识是一个粉色垃圾桶<span class="icon icon-deprecated"></span>  
本以为他是一个简单的`<img>`标签，出于好奇打开控制台发现并非如此

* `mask-image`: none
* `mask-repeat`: repeat
* `mask-position`: center
* `mask-clip`: border-box
* `mask-origin`: border-box
* `mask-size`: auto
* `mask-composite`: add

## mask-image

设置用作元素遮罩层的图像。遮罩图像会按照 `mask-mode`<span class="icon icon-experimental"></span>   和 `mask-position` 等属性设置进行缩放和平移，最后与元素背景叠加形成遮罩效果。  
个人理解为镂空图形，有颜色的地方都是空心的。遮罩图像在上，原图或背景颜色在下

`mask-image`的属性值：url()|渐变|image()|element  
图片格式有所要求，无透明通道的图像会看不见原图 jpg无透明通道

## 应用
改变icon颜色
```css
.icon-deprecated {
  -webkit-mask-image: url(/img/deprecated.svg);
  mask-image: url(/img/deprecated.svg);
  background-color: #ff707f;
}

/*
  粉色垃圾桶
  deprecated.svg 是一个黑色垃圾桶 作为遮罩层图像
  background-color: #ff707f; 设置粉色背景
*/
```

<style>
  @import '/css/common.css'
</style>