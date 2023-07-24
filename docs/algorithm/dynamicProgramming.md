# 动态规划

## 思想

动态规划（Dynamic Programming DP）最核心的思想，就在于拆分子问题，记录子问题的解，减少重复计算

动态规划适用的问题通常有重叠子问题和最优子结构 [链接](https://juejin.cn/post/6951922898638471181)

记录子问题的解，会增加空间复杂度，动态规划通过空间复杂度换取时间复杂度

## 步骤

* 定义状态：将原问题转化为更小的子问题，并定义状态来表示子问题的解
* 确定状态转移方程：根据子问题之间的关系，推导出状态转移方程，用于计算当前问题的解
* 初始化：初始化边界条件，即最小的子问题的解
* 递推计算：按照状态转移方程，从边界条件开始逐步计算出所有子问题的解，直到得到原问题的解
* 返回结果：返回原问题的解

## 01背包

```js
function testWeightBagProblem(weight, value, size) {
  // 定义 dp 数组
  const len = weight.length
  const dp = Array(len)
    .fill()
    .map(() => Array(size + 1).fill(0))

  // 初始化
  for (let j = weight[0]; j <= size; j++)
    dp[0][j] = value[0]

  // weight 数组的长度len 就是物品个数
  for (let i = 1; i < len; i++) {
    // 遍历物品
    for (let j = 0; j <= size; j++) {
      // 遍历背包容量
      if (j < weight[i])
        dp[i][j] = dp[i - 1][j]
      else
        dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - weight[i]] + value[i])

    }
  }

  return dp[len - 1][size]
}

console.log(testWeightBagProblem([1, 3, 4, 5], [15, 20, 30, 55], 6))
```