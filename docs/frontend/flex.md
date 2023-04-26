# flex


## 语法
```css
flex: none | auto | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
```

| “互斥”组合符。表示排他，这个符号前后的属性值都是支持的，但不能同时出现

?  表示0次或1次  flex-shrink 属性可有可无

|| “或”组合符，连接的所有组成元素是可选的，次序任意，但是至少其中一个要出现。`flex: flex-grow flex-shrink?`和 `flex-basis` 都是合法的

&& “与”组合符，连接的各个部分都必须出现，顺序任意

```css
flex: auto;
flex: none;
/* 1个值，flex-grow */
flex: 1;
/* 1个值，flex-basis */
flex: 100px;
/* 2个值，flex-grow和flex-basis */
flex: 1 100px;
/* 2个值，flex-grow和flex-shrink */
flex: 1 1;
/* 3个值 */
flex: 1 1 100px;
```

### **initial**

默认值，flex: initial 等同于 flex: 0 1 auto

### **auto**

flex: auto 等同于 flex: 1 1 auto

### **none**

flex: none 等同于 flex:0 0 auto

### **1**

flex: 1 等同于 flex: 1 1 0%

### **flex-basis 和 width**

### **不考虑项目尺寸不足或溢出**

- `width:100px` + `flex-basis:auto` = 元素自身100px （content 宽度小于项目）
- `width:200px` + `flex-basis:100px` = 100px （content 宽度小于项目） flex-basis 优先级高于 width
- `content + width: 100px` = 元素自身100px
- content + `flex-basis:100px` = max(content, flex-basis) = 大于等于100px

### **当content比项目尺寸大**

- `width: auto` + `flex-basis: auto` = content宽度
- `width: 100px` + `flex-basis: auto` = 元素自身100px
- `width: 100px` + `flex-basis: 50px` = 元素自身100px
- `width: 100px` + `flex-basis: 200px` = 200px

当content比项目尺寸大时，同时设置`width` 和`flex-basis` = max(width, flex-basis)

### **flex 项目大小**

一个flex子项的最终尺寸是基础尺寸、弹性增长或收缩、最大最小尺寸限制共同作用的结果。

其中：

- 基础尺寸由CSS `flex-basis`属性，`width`等属性以及`box-sizing`盒模型共同决定；
- 弹性增长指的是`flex-grow`属性，弹性收缩指的是`flex-shrink`属性；
- 最大最小尺寸限制指的是`min-width`/`max-width`等CSS属性，以及`min-content`最小内容尺寸。flex布局会自动给项目`min-width`/`max-width` 赋初始值 `auto`

```
最大最小尺寸限制 > 弹性增长或收缩 > 基础尺寸
```

### flex

```css
flex: none | auto | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
```

| 单管道符。表示排他，这个符号前后的属性值都是支持的，且不能同时出现

?  表示0个或1个  flex-shrink 属性可有可无

|| 双管道，或者的意思，前后可以分开独立合法使用。`flex: flex-grow flex-shrink?`和 `flex-basis` 都是合法的

```css
flex: auto;
flex: none;
/* 1个值，flex-grow */
flex: 1;
/* 1个值，flex-basis */
flex: 100px;
/* 2个值，flex-grow和flex-basis */
flex: 1 100px;
/* 2个值，flex-grow和flex-shrink */
flex: 1 1;
/* 3个值 */
flex: 1 1 100px;
```

### **initial**

默认值，flex: initial 等同于 flex: 0 1 auto

### **auto**

flex: auto 等同于 flex: 1 1 auto

### **none**

flex: none 等同于 flex:0 0 auto

### **1**

flex: 1 等同于 flex: 1 1 0%

### **flex-basis 和 width**

flex-basis: atuo 项目的基本尺寸根据自身尺寸决定。自身尺寸与以下几个方面有关

- box-sizing 盒模型
- width/ min-width/max-width
- content 内容

不考虑项目尺寸不足或溢出 （content 宽度小于项目）

- `width:100px` + `flex-basis:auto` = 元素自身100px （content 宽度小于项目）
- `width:200px` + `flex-basis:100px` = 100px （content 宽度小于项目） flex-basis 优先级高于 width
- `content + width: 100px` = 元素自身100px
- content + `flex-basis:100px` = max(content, flex-basis) = 大于等于100px

当content比项目尺寸大

- `width: auto` + `flex-basis: auto` = content宽度
- `width: 100px` + `flex-basis: auto` = 元素自身100px
- `width: 100px` + `flex-basis: 50px` = 元素自身100px
- `width: 100px` + `flex-basis: 200px` = 200px

当content比项目尺寸大时，同时设置`width` 和`flex-basis` = max(width, flex-basis)

### **flex 项目大小**

一个flex子项的最终尺寸是基础尺寸、弹性增长或收缩、最大最小尺寸限制共同作用的结果。

其中：

- 基础尺寸由CSS `flex-basis`属性，`width`等属性以及`box-sizing`盒模型共同决定；
- 弹性增长指的是`flex-grow`属性，弹性收缩指的是`flex-shrink`属性；
- 最大最小尺寸限制指的是`min-width`/`max-width`等CSS属性，以及`min-content`最小内容尺寸。

```
最大最小尺寸限制 > 弹性增长或收缩 > 基础尺寸
```

| content | width | min-width | flex-basis | base size  | minimum size | flexibility flex-shrink | final  |             |
| ------- | ----- | --------- | ---------- | ---------- | ------------ | ----------------------- | ------ | ----------- |
| 60px    | auto  | auto      | auto       | 无         | 无           |                         | 60px   | content     |
| 60px    | 100%  | auto      | auto       | 100% 300px | 无           | -100                    | 200px  | flex-shrink |
| 60px    | auto  | auto      | 100%       | 100% 300px | 无           | -100                    | 200px  | flex-shrink |
| 60px    | auto  | 0         | auto       | 无         | 无           |                         | 60px   | content     |
| 60px    | 100%  | 0         | auto       | 100% 300px | 无           | -100                    | 200px  | flex-shrink |
| 60px    | auto  | 0         | 100%       | 100% 300px | 无           | -100                    | 200px  | flex-shrink |
| 60px    | 100%  | 0         | 200%       | 200% 600px | 无           | -400                    | 200px  | flex-shrink |
| 60px    | 100%  | auto      | 200%       | 200% 600px | 无           | -400                    | 200px  | flex-shrink |
| 1920px  | auto  | auto      | auto       | 无         | 1920px       | -1634.85                | 1920px | content     |
| 1920px  | 100%  | auto      | auto       | 100% 300px | 300px        | -75                     | 300px  | width       |
| 1920px  | auto  | auto      | 100%       | 100% 300px | 1920px       |                         | 1920px | content     |
| 1920px  | auto  | 0         | auto       | 无         | 无           | -1720                   | 200px  | flex-shrink |
| 1920px  | 100%  | 0         | auto       | 100% 300px | 无           | -100                    | 200px  | flex-shrink |
| 1920px  | auto  | 0         | 100%       | 100% 300px | 无           | -100                    | 200px  | flex-shrink |
| 1920px  | 100%  | 0         | 200%       | 200% 600px | 无           | -400                    | 200px  | flex-shrink |
| 1920px  | 100%  | auto      | 200%       | 200% 600px | 300px        | -342.85                 | 300px  | width       |

- 基础尺寸，由 width 和 flex-basis 决定，flex-basis 优先级更高
- 最小尺寸，由 content-width 、min-width 、width 决定， 优先级 min-width > min( width, content-width )
- final计算尺寸，由基础尺寸、弹性增长+弹性缩小和最小、最大尺寸共同决定，如果基础尺寸 在闭区间[最小尺寸, 最大尺寸]