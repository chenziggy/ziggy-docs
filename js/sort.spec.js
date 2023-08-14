import { describe, expect, it } from 'vitest'
import { quickSort } from './quickSort'

describe('排序', () => {
  it('quickSort', () => {
    const arr = [9, 9, 8, 7, 6, 5, 4, 3, 2, 1]
    const sortArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 9]
    quickSort(arr, 0, arr.length - 1)
    expect(arr).toEqual(sortArr)
  })
})
