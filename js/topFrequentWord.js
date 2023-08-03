export function splitWords(str) {
  return str.match(/[a-zA-Z0-9'-]+/g).filter(item => item).map(str => str.toLowerCase())
}

export function genHashMap(arr) {
  const map = {}
  arr.reduce((acc, word, index, arr) => {
    const prevItem = index - 1 >= 0 ? arr[index - 1] : false
    const nextItem = index + 1 < arr.length ? arr[index + 1] : false

    if (!acc[word]) {
      acc[word] = {
        value: 1,
        prev: [],
        next: [],
      }
    }
    else {
      acc[word].value++
    }
    prevItem && acc[word].prev.push(prevItem)
    nextItem && acc[word].next.push(nextItem)

    return acc
  }, map)
  return map
}

export function sortValue(hashMap) {
  return Object.keys(hashMap).sort((aKey, bKey) => {
    const a = hashMap[aKey]
    const b = hashMap[bKey]
    const cond1 = b.value - a.value
    return cond1 !== 0 ? cond1 : aKey.localeCompare(bKey)
  })
}

export function findMostFrequentString(arr) {
  if (!arr.length)
    return
  const map = {}
  arr.reduce((acc, word) => {
    if (!acc[word])
      acc[word] = { value: 1 }
    else acc[word].value++
    return acc
  }, map)
  const word = sortValue(map)[0]
  return {
    word,
    value: map[word].value,
  }
}

export function topFrequentWord(str) {
  const arr = splitWords(str)
  const hashMap = genHashMap(arr)
  const words = sortValue(hashMap).slice(0, 3)
  return words.map((word) => {
    const item = hashMap[word]
    return {
      word,
      value: item.value,
      topPrevWord: findMostFrequentString(item.prev),
      topNextWord: findMostFrequentString(item.next),
    }
  })
}
