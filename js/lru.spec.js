import { describe, expect, test } from 'vitest'
import { LruCache } from './lru'

describe('lru', () => {
  test('lru 1 2 3 4 1', () => {
    const cache = new LruCache(3)
    cache.set(1, 1)
    cache.set(2, 2)
    cache.set(3, 3)
    cache.set(4, 4)
    cache.set(1, 1)
    expect(cache).toMatchObject({ cache: new Map([[3, 3], [4, 4], [1, 1]]), size: 3 })
    expect(cache.get(1)).toBe(1)
  })
})
