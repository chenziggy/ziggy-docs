# 级联、继承

## 继承
继承指的是类似 color, font-family, visibility 等属性父元素设置，子元素会被继承的特性


## 级联规则
* 开发者设置 `<style>`、 HTML style 内联
* @layer 现代浏览器新特性，降低所有 CSS 优先级新特性（tailwindcss 当中的@layer 与其不同）
* 用户设置 浏览器设置自定义字体，用户安装浏览器插件 Adblock
* 浏览器内置 HTML 元素内置样式的CSS
	
	
	开发者设置 > @layer规则 > 用户设置 > 浏览器内置
	
## 开发者设置
* !important,加在样式属性值后，权重值为10000（一般不要使用）
* 内联样式，如：style=""，权重值为1000
* ID选择器，如：#content，权重值为100
* 类，伪类和属性选择器，如：content、:hover权重值为10
* 标签选择器和伪元素选择器，如：div/p/:before权重值为1
* 通用选择器（ * ） 、子选择器（>）、相邻选择器（+）、同胞选择器（~）、权重值为0
	
style内联 > ID选择器 > 类、属性选择器（a[title] 存在 title属性的a标签） > 标签选择器 > 通配符选择器

## !important
原本级联水平高的CSS声明应用了!important后，其优先级反而低，而原本级联水平低的 CSS 声明应用了 !important 后，CSS 计算的优先级反而高
	
  !important
		!important 浏览器内置 > !important 用户设置 > !important @layer > !important 开发者设置
	权重问题  
		!important > style内联 > id 选择器(权重 100) > 类、属性选择器 (权重 10)  > 标签 和伪类 （权重 1）


## 整体

![css-imoport-s](/img/css-important-s.png)