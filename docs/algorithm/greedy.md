# 贪心算法

## 思想
在每一步都做出在当前看来最好的选择，以求解最优解

* 将问题分解为若干个子问题
* 对每一个子问题，选择代价最小的解决方案，`全局最优解`依赖于每个子问题的`局部最优解`
* 最后得到全局最优解

## 例题

### 盛最多水的容器

给定一个长度为 n 的整数数组 height 。有 n 条垂线，第 i 条线的两个端点是 (i, 0) 和 (i, height[i]) 。
找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水

![](/img/question_11.jpg)
```js
const maxArea = function (H) {
  let ans = 0
  let i = 0; let j = H.length - 1
  while (i < j) {
    ans = Math.max(ans, Math.min(H[i], H[j]) * (j - i))
    H[i] <= H[j] ? i++ : j--
  }
  return ans
}
```