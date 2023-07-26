# 数组 reduce

对数组中的每个元素按序执行一个提供的 reducer 函数，每一次运行 reducer 会将先前元素的计算结果作为参数传入，最后将其结果汇总为单个返回值


* callbackFn
为数组中每个元素执行的函数。其返回值将作为下一次调用 callbackFn

* accumulator
上一次调用 callbackFn 的结果。在第一次调用时，如果指定了 initialValue 则为指定的值，否则为 array[0] 的值

* currentValue
当前元素的值。在第一次调用时，如果指定了 initialValue，则为 array[0] 的值，否则为 array[1]

* currentIndex
currentValue 在数组中的索引位置。在第一次调用时，如果指定了 initialValue 则为 0，否则为 1

* array
调用了 reduce() 的数组本身。

```js
Array.prototype.myReduce = function (fn, initialValue) {
  for (let i = 0; i < this.length; i++) {
    if (typeof initialValue === "undefined") {
      initialValue = fn(this[i], this[i + 1], i + 1, this);
      ++i;
    } else {
      initialValue = fn(initialValue, this[i], i, this);
    }
  }
  return initialValue;
};
```

