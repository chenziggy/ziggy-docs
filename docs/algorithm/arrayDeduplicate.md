# 数组去重

## Array.includes

```js
function removeDuplicates(arr) {
  const list = []
  arr.forEach((item) => {
    !list.includes(item) && list.push(item)
    // [NaN].includes(NaN)  true   
  })
  return list
}
```

## Set
```js
function removeDuplicates(arr) {
  return [...new Set(arr)]
}
```

## hashMap
```js
function removeDuplicatesHashMap(arr) {
  const map = {}
  arr.reduce((acc, cur) => {
    if (!acc[cur])
      acc[cur] = cur

    return acc
  }, map)
  return Object.values(map)
}
```

## 两次遍历
```js
function removeDuplicates(arr) {
  let list = arr.slice()
  for (let i = 0; i < list.length; i++) {

    for (let j = i + 1; j < list.length; j++) {
      if (list[j] === list[i]) {
        list.splice(j, 1)
        j--
      } else {
        if ((typeof list[i] === 'number' && list[i] !== list[i]) && (typeof list[j] === 'number' && list[j] !== list[j])) {
          list.splice(j, 1)
          j--
        }
      }
    }
  }
  return list
}

```