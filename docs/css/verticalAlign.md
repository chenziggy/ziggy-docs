# vertical-align

指定行内元素（inline）或表格单元格（table-cell）元素的垂直对齐方式

* baseline 使元素的基线与父元素的基线对齐（默认值）
* middle 使元素的中部与父元素的基线加上父元素 [x-height](#x-height) 的一半对齐
* top 使元素及其后代元素的顶部与整行的顶部对齐
* bottom 使元素及其后代元素的底部与整行的底部对齐

```html
<div>
  <div style="display: inline-block;height: 20px; width: 4px; background: var(--vp-c-brand-lighter);vertical-align: middle"></div>
  <span style="vertical-align: middle;">12345</span>
```
<div>
  <div style="display: inline-block;height: 20px; width: 4px; background: var(--vp-c-brand-lighter);vertical-align: middle"></div>
  <span style="vertical-align: middle;">12345</span>
   <div style="display: inline-block;height: 20px; width: 4px; background: var(--vp-c-brand-lighter);vertical-align: middle"></div>
  <span style="vertical-align: middle;">xxxx国</span>
   <div style="display: inline-block;height: 20px; width: 4px; background: var(--vp-c-brand-lighter);vertical-align: middle"></div>
</div>

## x-height 
小写字母'x'的高度，术语描述就是基线（`baseline`）和等分线（`mean line`也称作中线`midline`）之间的距离
![x-height](/img/x-height.png)

* ascender height: 上行线高度
* cap height: 大写字母高度
* median: 中线
* descender height: 下行线高度


## ex
ex是CSS中的一个相对单位，指的的是小写字母x的高度，就是指 [x-height](#x-height)

用途图标和文字中间位置排整齐
```html
<div 
  style="position: relative; font-size: 30px; "
  >第二页
  <i class="icon-arrow" />
</div>

<style scoped>
  .icon-arrow {
    display: inline-block;
    width: 20px;
    height: 1ex;
    background: url(/img/arrow.png) no-repeat center;
}
</style>
```
<div style="position: relative; font-size: 30px; ">第二页x<i class="icon-arrow" /></div>

<style scoped>
  .icon-arrow {
    display: inline-block;
    width: 20px;
    height: 1ex;
    background: url(/img/arrow.png) no-repeat center;
}
</style>