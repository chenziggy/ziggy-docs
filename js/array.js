export function removeDuplicates(arr) {
  const list = []
  arr.forEach((item) => {
    if (!list.includes(item))
      list.push(item)
  })
  return list
}

export function removeDuplicatesSet(arr) {
  return [...new Set(arr)]
}

export function removeDuplicatesHashMap(arr) {
  const map = {}
  arr.reduce((acc, cur) => {
    if (!acc[cur])
      acc[cur] = cur

    return acc
  }, map)
  return Object.values(map)
}

export function intersectionCollect(arr1, arr2) {
  return arr1.filter(a =>
    arr2.some(b => a.id === b.id),
  )
}

export function intersectionCollectMap(arr1, arr2) {
  const map = {}
  arr1.reduce((acc, cur) => {
    if (!acc[cur.id]) {
      acc[cur.id] = {
        value: cur,
        duplicate: false,
      }
    }
    else {
      acc[cur.id].duplicate = true
    }
    return acc
  }, map)

  arr2.reduce((acc, cur) => {
    if (!acc[cur.id]) {
      acc[cur.id] = {
        value: cur,
        duplicate: false,
      }
    }
    else {
      acc[cur.id].duplicate = true
    }
    return acc
  }, map)

  return Object.keys(map).filter(key => map[key].duplicate).map(key => map[key].value)
}

export function diffCollect(arr1, arr2) {
  const arr1Diff = arr1.filter(a => arr2.every(b => a.id !== b.id))
  const arr2Diff = arr2.filter(a => arr1.every(b => a.id !== b.id))

  return [...arr1Diff, ...arr2Diff]
}

export function diffCollectMap(arr1, arr2) {
  const map = {}
  arr1.reduce((acc, cur) => {
    if (!acc[cur.id]) {
      acc[cur.id] = {
        value: cur,
        duplicate: false,
      }
    }
    else {
      acc[cur.id].duplicate = true
    }
    return acc
  }, map)

  arr2.reduce((acc, cur) => {
    if (!acc[cur.id]) {
      acc[cur.id] = {
        value: cur,
        duplicate: false,
      }
    }
    else {
      acc[cur.id].duplicate = true
    }
    return acc
  }, map)

  return Object.keys(map).filter(key => !map[key].duplicate).map(key => map[key].value)
}
