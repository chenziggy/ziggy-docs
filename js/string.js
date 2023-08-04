export function longestPalindrome(str) {
  let max = 0
  let start = -1
  const len = str.length
  for (let i = 0; i < len; i++) {
    let now = 1
    let l = i - 1
    while (str[i] === str[i + 1]) {
      i++
      now++
    }
    let r = i + 1
    while (str[l] === str[r] && str[l]) {
      l--
      r++
      now += 2
    }

    if (now > max) {
      max = now
      start = l + 1
    }
  }
  return str.slice(start, start + max)
}
