import { describe, expect, it, vi } from 'vitest'
import { EventEmitter } from './event'

describe('EventEmitter', () => {
  const emitter = new EventEmitter()
  const args = 'helloworld'
  it('on emit off', () => {
    const fn = vi.fn()
    emitter.on('click', fn)
    emitter.emit('click', args)
    expect(fn).toBeCalledWith(args)
    emitter.emit('click', args)
    emitter.off('click', fn)
    emitter.emit('click', args)
    expect(fn).toBeCalledTimes(2)
  })

  it('once', () => {
    const fn = vi.fn()
    emitter.once('click', fn)
    emitter.emit('click', args)
    expect(fn).toBeCalledWith(args)
    emitter.emit('click', args)
    expect(fn).toBeCalledTimes(1)
  })
})
