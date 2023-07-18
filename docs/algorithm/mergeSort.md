# 归并排序

归并排序(Merge sort)是一种稳定的排序算法,它采用[分治思想](./divideConquer.md)

* 把长度为n的输入序列分成两个长度为n/2的子序列
* 对这两个子序列分别采用归并排序
* 将两个排序好的子序列合并成一个最终的排序序列

```js
function mergeSort(arr) {
  if (arr.length <= 1)
    return arr

  const mid = Math.floor(arr.length / 2)

  const left = mergeSort(arr.slice(0, mid))
  const right = mergeSort(arr.slice(mid))
  return merge(left, right)
}

// 将两个已排序的数组合并
function merge(left, right) {
  const result = []

  let i = 0
  let j = 0

  while (i < left.length && j < right.length) {
    if (left[i] < right[j])
      result.push(left[i++])
      // 等效于 result.push(left[i]); i++
    else
      result.push(right[j++])

  }

  return [...result, ...left.slice(i), ...right.slice(j)]
}
```
