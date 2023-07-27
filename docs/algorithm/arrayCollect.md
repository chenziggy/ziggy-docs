# Array 集

## 交集

### es6

```js
const arr1 = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]
const arr2 = [{ id: 11 }, { id: 2 }, { id: 33 }, { id: 4 }]

const arr3 = arr1.filter((x) => {
  return arr2.some(y => x.id === y.id)
})
```

### hashMap

```js
const hashMap = {}
arr1.reduce((hashMap, item) => {
  if (hashMap[item.id]) {
    hashMap[item.id].duplicate = true
  }
  else {
    hashMap[item.id] = {
      value: item,
      duplicate: false
    }
  }
  return hashMap
}, hashMap)
arr2.reduce((hashMap, item) => {
  if (hashMap[item.id]) {
    hashMap[item.id].duplicate = true
  }
  else {
    hashMap[item.id] = {
      value: item,
      duplicate: false
    }
  }
  return hashMap
}, hashMap)
const arr3 = []
Object.keys(hashMap).forEach((key) => {
  if (hashMap[key].duplicate)
    arr3.push(hashMap[key].value)

})
return arr3
```


## 差集

### es6

```js
const arr1 = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]
const arr2 = [{ id: 11 }, { id: 2 }, { id: 33 }, { id: 4 }]

const arr3 = arr1.filter((x) => {
  return arr2.every(y => y.id !== x.id)
})

const arr4 = arr2.filter((x) => {
  return arr1.every(y => y.id !== x.id)
})

const arr5 = [...arr3, ...arr4]
```

### hashMap

```js
const hashMap = {}
arr1.reduce((hashMap, item) => {
  if (hashMap[item.id]) {
    hashMap[item.id].duplicate = true
  }
  else {
    hashMap[item.id] = {
      value: item,
      duplicate: false
    }
  }
  return hashMap
}, hashMap)
arr2.reduce((hashMap, item) => {
  if (hashMap[item.id]) {
    hashMap[item.id].duplicate = true
  }
  else {
    hashMap[item.id] = {
      value: item,
      duplicate: false
    }
  }
  return hashMap
}, hashMap)
const arr3 = []
Object.keys(hashMap).forEach((key) => {
  if (hashMap[key].duplicate === false)
    arr3.push(hashMap[key].value)

})
return arr3
```