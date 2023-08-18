# 手写event类

```js
class EventEmitter {
  constructor() {
    this.event = new Map()
  }

  on(eventName, callback) {
    let callbacks = this.event.get(eventName)
    if (!callbacks)
      this.event.set(eventName, callbacks = new Set())

    callbacks.add(callback)
  }

  emit(eventName, ...args) {
    const callbacks = this.event.get(eventName)
    if (!callbacks)
      return

    callbacks.forEach(cb => cb.apply(this, args))
  }

  off(eventName, callback) {
    const callbacks = this.event.get(eventName)
    if (!callbacks)
      return

    if (!callback)
      callbacks.clear()
    else
      callbacks.delete(callback)
  }

  once(eventName, callback) {
    const wrapper = (...args) => {
      callback.apply(this, args)
      this.off(eventName, wrapper)
    }
    this.on(eventName, wrapper)
  }
}
```