import { describe, expect, it, vi } from 'vitest'
import { Scheduler } from './scheduler'

describe('scheduler', () => {
  it('async schedule', async () => {
    const timeout = time => new Promise((resolve) => {
      setTimeout(resolve, time)
    })

    const fn = vi.fn()
    const scheduler = new Scheduler()
    const addTask = (time, order) => {
      scheduler.add(() => timeout(time)).then(() => fn(order))
    }

    addTask(1000, '1')
    addTask(500, '2')
    addTask(300, '3')
    addTask(400, '4')
    await timeout(1500)
    expect(fn).toHaveBeenNthCalledWith(1, '2')
    expect(fn).toHaveBeenNthCalledWith(2, '3')
    expect(fn).toHaveBeenNthCalledWith(3, '1')
    expect(fn).toHaveBeenNthCalledWith(4, '4')
  })
})
