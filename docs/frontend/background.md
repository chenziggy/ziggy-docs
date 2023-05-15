# background
<style>
  .rainbow__text {
    --color1: #00a98e;
    --color2: #007ace;
    --color3: #aa78e3;
    --color4: #f15989;
    background: linear-gradient( 135deg, var(--color1) 25%, var(--color2) 50%, var(--color3) 75%, var(--color4) 100% );
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent; 
    font-size: 26px;
    line-height: 30px;
}
</style>
<span class="rainbow__text">ziggy chen</span>

## background-clip
* border-box 背景延伸至边框外沿（但是在边框下层）
* padding-box  背景延伸至内边距（padding），不会绘制到边框处
* content-box  背景被裁剪至内容区（content box）外沿
* text  背景被裁剪成文字的前景色 （类似于遮罩图像 mask-image）


## background-image
```css
background-image = <bg-image>#  
  <bg-image> = <image>  |  none     
    <image> = <url> | <gradient>
      <url> = url( <string> <url-modifier>* )  |  src( <string> <url-modifier>* )  

.app {
  background-image: linear-gradient(135deg, var(--color1) 50%, var(--color2)),    
                    url("../../media/examples/lizard.png");
}
```
\# 出现一次或多次， `<bg-image>` 一次或多次

### line-gradient