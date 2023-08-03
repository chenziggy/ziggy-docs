import { describe, expect, it } from 'vitest'
import { LruCache } from './lru'

describe('lru', () => {
  it('lru 1 2 3 4 1', () => {
    const cache = new LruCache(3)
    cache.set(1, 1)
    cache.set(2, 2)
    cache.set(3, 3)
    cache.set(4, 4)
    cache.set(1, 1)
    expect(cache).toMatchObject({ cache: new Map([[3, 3], [4, 4], [1, 1]]), size: 3 })
    expect(cache.get(1)).toBe(1)
  })

  it('lru get', () => {
    const cache = new LruCache(3)
    cache.set(1, 1)
    cache.set(2, 2)
    cache.set(3, 3)
    expect(cache).toMatchObject({ cache: new Map([[1, 1], [2, 2], [3, 3]]), size: 3 })
    cache.get(1) // 2 3 1  1最新
    expect(cache).toMatchObject({ cache: new Map([[2, 2], [3, 3], [1, 1]]), size: 3 })
    cache.get(2) // 3 1 2  2最新
    expect(cache).toMatchObject({ cache: new Map([[3, 3], [1, 1], [2, 2]]), size: 3 })
  })

  it('lru set', () => {
    const cache = new LruCache(3)
    cache.set(1, 1)
    cache.set(2, 2)
    cache.set(3, 3)
    cache.set(4, 4)
    expect(cache).toMatchObject({ cache: new Map([[2, 2], [3, 3], [4, 4]]), size: 3 })
    cache.set(2, 2)
    expect(cache).toMatchObject({ cache: new Map([[3, 3], [4, 4], [2, 2]]), size: 3 })
  })
})
