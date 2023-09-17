# :where

 CSS 伪类函数，接受`选择器列表`作为它的参数，将会选择所有能被该选择器列表中任何一条规则选中的元素

## 用法

 ```css
:where(.header, .footer) p:hover {
  color: red;
  cursor: pointer;
}

/* ==>  */
.header p:hover,
.footer p:hover {
  color: red;
  cursor: pointer;
}
```

<header class="header">
  <p>header</p>
</header>
<footer class="footer">
  <p>footer</p>
</footer>

<style>
  :where(.header, .footer) p:hover {
    color: red;
    cursor: pointer;
  }
</style>

## 优先级
`:where` 的优先级总是为0，会被其他选择器覆盖

```css
  :where(.header1) p:hover {
    color: red;
  }

  .header1 p:hover {
    color: orange;
  }
```

<div class="header1">
  <p>class header1</p>
</div>

<style>
  :where(.header1) p:hover {
    color: red;
  }

  .header1 p:hover {
    color: orange;
  }
</style>


# :is
语法和 `:where` 一样

## 简化列表

```css
/* 三层或更深的无序列表使用方形符号。 */
ol ol ul,
ol ul ul,
ol menu ul,
ol dir ul,
ol ol menu,
ol ul menu,
ol menu menu,
ol dir menu,
ol ol dir,
ol ul dir,
ol menu dir,
ol dir dir,
ul ol ul,
ul ul ul,
ul menu ul,
ul dir ul,
ul ol menu,
ul ul menu,
ul menu menu,
ul dir menu,
ul ol dir,
ul ul dir,
ul menu dir,
ul dir dir,
menu ol ul,
menu ul ul,
menu menu ul,
menu dir ul,
menu ol menu,
menu ul menu,
menu menu menu,
menu dir menu,
menu ol dir,
menu ul dir,
menu menu dir,
menu dir dir,
dir ol ul,
dir ul ul,
dir menu ul,
dir dir ul,
dir ol menu,
dir ul menu,
dir menu menu,
dir dir menu,
dir ol dir,
dir ul dir,
dir menu dir,
dir dir dir {
  list-style-type: square;
}

:is(ol, ul, menu, dir) :is(ol, ul, menu, dir) :is(ul, menu, dir) {
  list-style-type: square;
}

```

`:is` 不改变选择器原有的优先级

```css
  :is(.header2) {
    color: blue;
  }

  .header2 {
    color: red;
  }
  /* 谁写后面谁生效 */
```
<div class="header2">
  vz-components
</div>

<style>
  
  :is(.header2) {
    color: blue;
  }

  .header2 {
    color: red;
  }
 </style>


