import { describe, expect, it, vi } from 'vitest'
import { debounce, throttle } from './debounce'

describe('debounce', () => {
  it('异步执行', () => {
    vi.useFakeTimers()

    let callCount = 0
    const debounced = debounce(() => { ++callCount }, 0)
    debounced()
    debounced()
    expect(callCount).toBe(0)

    vi.runAllTimers()
    expect(callCount).toBe(1)
  })

  it('每间隔10毫秒执行一次，110毫秒后最终只执行最后1次', () => {
    vi.useFakeTimers()

    let callCount = 0
    const fn = () => callCount++
    const debounced = debounce(fn, 10)
    const timerId = setInterval(() => {
      debounced()
    }, 10)
    setTimeout(() => {
      clearInterval(timerId)
    }, 110)
    vi.runAllTimers()
    expect(callCount).toBe(1)
  })
})

describe('throttle', () => {
  it('立即执行', () => {
    let callCount = 0
    const throttled = throttle(() => { ++callCount }, 10)
    throttled()
    expect(callCount).toBe(1)
  })

  it('每间隔10毫秒执行一次，100毫秒后最终执行5次', () => {
    vi.useFakeTimers()
    let callCount = 0
    const throttled = throttle(() => { ++callCount }, 10)

    const timerId = setInterval(() => {
      throttled()
    }, 10)

    setTimeout(() => {
      clearInterval(timerId)
    }, 100)
    vi.runAllTimers()
    expect(callCount).toBe(5)
  })
})
