# —*  var() CSS

Created time: January 3, 2022 4:16 PM
Property: January 3, 2022 5:22 PM
Tags: CSS

# CSS自定义属性 CSS变量

**自定义属性**

声明一个自定义属性，属性名需要以两个减号（**`--`**）开始   **`--main-color: black`**;

由自定义属性标记设定值（比如： **`--main-color: black;`**），由[var()](https://developer.mozilla.org/zh-CN/docs/Web/CSS/var()) 函数来获取值（比如： `color: var(--main-color);`）

---

**注意：** 自定义属性名是大小写敏感的，`--my-color` 和 `--My-color` 会被认为是两个不同的自定义属性。

**备用值：**`color: var(--my-var, red);`

备用值并不是用于实现浏览器兼容性的。如果浏览器不支持CSS自定义属性，备用值也没什么用。

[使用CSS自定义属性（变量） - CSS（层叠样式表） | MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Using_CSS_custom_properties)

![Untitled](/img/var().png)