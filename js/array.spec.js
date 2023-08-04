import { describe, expect, it } from 'vitest'
import { diffCollect, diffCollectMap, intersectionCollect, intersectionCollectMap, removeDuplicates, removeDuplicatesHashMap, removeDuplicatesSet } from './array'

describe('数组去重', () => {
  const list = [1, 2, 3, 4, 5, 1, 2, 3]
  const unique = [1, 2, 3, 4, 5]
  it('数组去重 includes', () => {
    expect(removeDuplicates(list)).toEqual(unique)
  })

  it('数组去重 Set', () => {
    expect(removeDuplicatesSet(list)).toEqual(unique)
  })

  it('数组去重 hashMap', () => {
    expect(removeDuplicatesHashMap(list)).toEqual(unique)
  })
})

describe('集合', () => {
  const arr1 = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]
  const arr2 = [{ id: 11 }, { id: 2 }, { id: 33 }, { id: 4 }]

  const common = [{ id: 2 }, { id: 4 }]

  it('交集 filter some', () => {
    expect(intersectionCollect(arr1, arr2)).toEqual(common)
  })

  it('交集 hashMap', () => {
    expect(intersectionCollectMap(arr1, arr2)).toEqual(common)
  })

  it('差集 filter every', () => {
    expect(diffCollect(arr1, arr2)).toEqual([{ id: 1 }, { id: 3 }, { id: 11 }, { id: 33 }])
  })

  it('差集 hashMap', () => {
    expect(diffCollectMap(arr1, arr2)).toEqual([{ id: 1 }, { id: 3 }, { id: 11 }, { id: 33 }])
  })
})
