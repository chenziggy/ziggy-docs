# 快速排序

快速排序(Quicksort)是一种常用的高效排序算法,利用[分治思想](./divideConquer.md)实现

* 从数组中选择一个基准值(pivot),通常选择第一个元素
* 将所有比pivot值小的元素放到它的左边,比pivot大的放到它的右边。此时pivot处于正确的排序位置
* 递归地对pivot左边和右边的子数组进行步骤1、2的排

```js
function quickSort(arr, low, high) {
  if (low < high) {
    const pivot = partition(arr, low, high)
    quickSort(arr, low, pivot - 1)
    quickSort(arr, pivot + 1, high)
  }
}

function partition(arr, low, high) {
  const pivot = arr[low]
  while (low < high) {
    while (low < high && pivot <= arr[high])
      --high

    // 跳出循环时 arr[high] < pivot  pivot 右侧值都大于 pivot  需要现将 小于pivot值放在低位
    arr[low] = arr[high]
    while (low < high && arr[low] <= pivot)
      ++low

    // 跳出循环 arr[low] > pivot   pivot 左侧值都小于 pivot  需要现将 大于pivot值放在高位
    arr[high] = arr[low]
    arr[low] = pivot
  }
  return low
}
```