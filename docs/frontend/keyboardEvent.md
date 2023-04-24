# keyboardEvent
* `key`   **primary**  
* `code`  与键盘布局相关  
* `altKey`<abbr class="icon icon-deprecated"></abbr>
* `ctrlKey`  
* `shiftKey`  
## keydown
当用户按下键盘上的任意键时触发，会重复触发，直到用户松开按键。
## keyup
当用户释放键盘上的键时触发，只触发一次。
## keypress
当用户按下键盘上的字符键时触发，会重复触发，直到用户松开按键。keypress事件只适用于字符键，不能用于非字符键。


<style>
  .icon-deprecated {
  -webkit-mask-image: url(/img/deprecated.svg);
  mask-image: url(/img/deprecated.svg);
  background-color: #ff707f;
}
.icon {
  display: inline-block;
  width: 15px;
  height: 15px;
}

</style>