export class EventEmitter {
  constructor() {
    this.event = {}
  }

  on(eventName, callback) {
    if (!Array.isArray(this.event[eventName]))
      this.event[eventName] = []

    this.event[eventName].push(callback)
  }

  emit(eventName, ...args) {
    if (Array.isArray(this.event[eventName])) {
      this.event[eventName].forEach((cb) => {
        cb.apply(this, args)
      })
    }
  }

  off(eventName, callback) {
    if (!callback) {
      this.event[eventName] = []
      return
    }
    if (!Array.isArray(this.event[eventName])) {
      const index = this.event[eventName].indexOf(callback)
      if (index !== -1)
        this.event[eventName].splice(index, 1)
    }
    else {
      this.event[eventName] = []
    }
  }

  once(eventName, callback) {
    const wrapper = (...args) => {
      callback.apply(this, args)
      this.off(eventName, wrapper)
    }
    this.on(eventName, wrapper)
  }
}
