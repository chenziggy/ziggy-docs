# 最长回文子串

## 思路
回文子串长度有奇偶区别： 奇数`aba` 偶数`abba`

## 中心扩散

```js
function longestPalindrome(s) {
  let ll = 0
  let rr = 0
  for (let i = 0; i < s.length; i++) {
    for (const j of [i, i + 1]) {
      // 奇、偶
      for (let l = i, r = j; s[l] && s[r] === s[l]; l--, r++)
        [ll, rr] = r - l + 1 > rr - ll + 1 ? [l, r] : [ll, rr]

    }
  }
  return s.substring(ll, rr + 1)
}
```
时间复杂度 O(n^2) 空间复杂度 O(1)


```js
const longestPalindrome = function (s) {
  let max = 0
  let start = -1
  const len = s.length
  for (let i = 0; i < len; i++) {
    let now = 1
    let l = i - 1
    while (s[i + 1] === s[i]) { // 如果当前字符后边的字符都一样, 当前长度 + 1,  s遍历指针向后推
      now++
      i++
    }
    let r = i + 1
    while (s[l] === s[r] && s[l] !== undefined) {
      now += 2
      l--
      r++
    }
    if (now > max) {
      max = now
      start = l + 1
    }
  }
  return s.slice(start, start + max)
}
```
时间复杂度 O(n) 空间复杂度 O(1)

## 动态规划

```js
const longestPalindrome = function (s) {
  const n = s.length
  let res = ''
  const dp = Array.from(new Array(n), () => new Array(n).fill(false))// 初始化数组
  for (let i = n - 1; i >= 0; i--) { // 循环字符串
    for (let j = i; j < n; j++) {
      // dp[i][j]表示子串i～j是否是回文子串
      // 回文子串必须满足s[i]，s[j]相等。并且向外扩展一个字符也相等，即dp[i+1][j-1]也是回文子串
      // j - i < 2表示子串小于等于1也是回文串
      dp[i][j] = s[i] === s[j] && (j - i < 2 || dp[i + 1][j - 1])
      if (dp[i][j] && j - i + 1 > res.length) { // 当前回文子串比之前的大，更新最大长度
        res = s.substring(i, j + 1)
      }
    }
  }
  return res
}
```
时间复杂度 O(n^2) 空间复杂度 O(n^2)