# 数组查询

* 数组过滤、排序、分组
* 链式调用
* execute 返回结果

```js
const list = [
  {
    name: 'jin',
    age: 9,
    id: 7,
  },
  {
    name: 'li',
    age: 9,
    id: 9,
  },
  {
    name: 'li',
    age: 8,
    id: 2,
  },
  {
    name: 'li',
    age: 1,
    id: 3,
  },
  {
    name: 'jin',
    age: 6,
    id: 9,
  },
  {
    name: 'chen',
    age: 8,
    id: 9,
  },
  {
    name: 'jin',
    age: 4,
    id: 1,
  },
  {
    name: 'chen',
    age: 1,
    id: 3,
  },
  {
    name: 'li',
    age: 8,
    id: 1,
  },
  {
    name: 'chen',
    age: 6,
    id: 1,
  },
  {
    name: 'li',
    age: 3,
    id: 3,
  },
  {
    name: 'jin',
    age: 5,
    id: 7,
  },
  {
    name: 'ziggy',
    age: 0,
    id: 6,
  },
  {
    name: 'chen',
    age: 7,
    id: 3,
  },
  {
    name: 'jin',
    age: 2,
    id: 7,
  },
  {
    name: 'chen',
    age: 7,
    id: 4,
  },
  {
    name: 'ziggy',
    age: 3,
    id: 4,
  },
  {
    name: 'chen',
    age: 4,
    id: 0,
  },
  {
    name: 'li',
    age: 5,
    id: 2,
  },
  {
    name: 'jin',
    age: 2,
    id: 0,
  },
]

function query(data) {
  let list = data
  const methods = {
    where(func) {
      list = list.filter(func)
      return methods
    },

    sortBy(key) {
      list = list.sort((a, b) => a[key] - b[key])
      return methods
    },

    groupBy(key) {
      const obj = {}
      list.forEach((item) => {
        const groupKey = item[key]
        if (!obj[groupKey])
          obj[groupKey] = []

        obj[groupKey].push(item)
      })
      list = obj
      return methods
    },

    execute() {
      return list
    },

    query(data) {
      list = data
      return methods
    },
  }
  return methods
}

const result = query(list)
  .where(item => item.age > 5)
  .sortBy('id')
  .groupBy('name')
  .execute()
console.log('🚀 ~ file: query.js:149 ~ result:', result)
```