# svg path

[path](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Element/path)
元素是 SVG [基本形状](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Tutorial/Basic_Shapes)
中最强大的一个。你可以用它创建线条，曲线，弧形等等。

```html
<path d="M10 10 H 90 V 90 H 10 L 10 10" />
```

### d

属性`d`的值是一个“命令 + 参数”的序列

### M

表示的是“Move to”命令

移动到 (10,10) 这个点的命令，应该写成“M 10 10”

### L

最常用的是“Line to”命令，`L`，`L`需要两个参数，分别是一个点的 x 轴和 y 轴坐标

### H

绘制水平线， 标明在 x 轴移动到的位置

### V

绘制垂直线， 标明在 y 轴移动到的位置

### Z

闭合路径命令，`Z`命令会从当前点画一条直线到路径的起点

```html
<path d="M10 10 H 90 V 90 H 10 Z" />
```

### 相对路径

相对命令使用的是小写字母，它们的参数不是指定一个明确的坐标，而是表示相对于它前面的点需要移动多少距离。画的是一个 80*80 的正方形

```html
<path d="M10 10 h 80 v 80 h -80 Z" />
```

### C

三次贝赛尔曲线C 和二次贝赛尔曲线Q，`C x1 y1, x2 y2, x y`

```html
<path d="M 10 10 C 20 20, 40 20, 50 10" />
```

### S

S 命令可以用来创建与前面一样的贝塞尔曲线

S 命令跟在一个 C 或 S 命令后面，则它的第一个控制点会被假设成前一个命令曲线的第二个控制点的中心对称点

```html
<path d="M 10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80" />
```

### A

弧形命令 A 是另一个创建 SVG 曲线的命令

 `A rx ry x-axis-rotation large-arc-flag sweep-flag x y`

```html
<path d="M 10 315
           L 110 215
           A 30 50 0 0 1 162.55 162.45
           L 172.55 152.45
           A 30 50 -45 0 1 215.1 109.9
           L 315 10" stroke="black" fill="green" stroke-width="2" fill-opacity="0.5"/>
```