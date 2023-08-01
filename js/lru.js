export class LruCache {
  constructor(size) {
    this.cache = new Map()
    this.size = size
  }

  get(key) {
    if (!this.cache.has(key)) {
      return null
    }
    else {
      const value = this.cache.get(key)
      this.cache.delete(key)
      this.cache.set(key, value)
      return this.cache.get(key)
    }
  }

  set(key, value) {
    if (!this.cache.has(key)) {
      this.cache.set(key, value)
    }
    else {
      this.cache.delete(key)
      this.cache.set(key, value)
    }
    if (this.cache.size > this.size)
      this.cache.delete(this.cache.keys().next().value)
  }
}
