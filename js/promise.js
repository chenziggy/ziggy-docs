const PENDING = 'pending'
const REJECTED = 'rejected'
const FULFILLED = 'fulfilled'

class MyPromise {
  constructor(executor) {
    executor(this.resolve, this.reject)
  }

  status = PENDING
  value = null
  reason = null
  fulfilledCallbacks = []
  rejectedCallbacks = []

  resolve = (value) => {
    if (this.status === PENDING) {
      this.status = FULFILLED
      this.value = value
      while (this.fulfilledCallbacks.length)
        this.fulfilledCallbacks.shift()(value)
    }
  }

  reject = (reason) => {
    if (this.status === PENDING) {
      this.status = REJECTED
      this.reason = reason
      while (this.rejectedCallbacks.length)
        this.rejectedCallbacks.shift()(reason)
    }
  }

  then = (onFulfilled, onRejected) => {
    const realOnFulfilled = typeof onFulfilled === 'function' ? onFulfilled : val => val
    const realOnRejected = typeof onRejected === 'function' ? onRejected : (reason) => { throw reason }

    const promise = new MyPromise((resolve, reject) => {
      const fulFilledMicrotask = () => {
        queueMicrotask(() => {
          try {
            const x = realOnFulfilled(this.value)
            resolvePromise(promise, x, resolve, reject)
          }
          catch (error) {
            reject(error)
          }
        })
      }

      const rejectedMicrotask = () => {
        queueMicrotask(() => {
          try {
            const x = realOnRejected(this.reason)
            resolvePromise(promise, x, resolve, reject)
          }
          catch (error) {
            reject(error)
          }
        })
      }

      if (this.status === PENDING) {
        this.fulfilledCallbacks.push(fulFilledMicrotask)
        this.rejectedCallbacks.push(rejectedMicrotask)
      }
      if (this.status === REJECTED)
        rejectedMicrotask()

      if (this.status === FULFILLED)
        fulFilledMicrotask()
    })
    return promise
  }

  catch = onRejected => this.then(null, onRejected)

  static resolve(value) {
    return new MyPromise((resolve, reject) => resolve(value))
  }

  static reject(reason) {
    return new MyPromise((resolve, reject) => reject(reason))
  }

  static race(promiseArg) {
    return new MyPromise((resolve, reject) => {
      for (let i = 0; i < promiseArg.length; i++)
        promiseArg[i].then(resolve, reject)
    })
  }

  static all(promiseArg) {
    return new MyPromise((resolve, reject) => {
      const ret = []
      let count = 0
      for (let i = 0; i < promiseArg.length; i++) {
        promiseArg[i].then((res) => {
          ret[i] = res
          count++
          if (count === promiseArg.length)
            resolve(ret)
        }, (reason) => {
          reject(reason)
        })
      }
    })
  }
}

function resolvePromise(promise, x, resolve, reject) {
  if (promise === x) {
    return reject(
      new TypeError('promise and value are the same'),
    )
  }

  if (typeof x === 'object' || typeof x === 'function') {
    if (x === null)
      return resolve(x)

    let then
    try {
      then = x.then
    }
    catch (error) {
      return reject(error)
    }
    if (typeof then === 'function') {
      let called = false
      try {
        then.call(x, (y) => {
          if (called)
            return
          called = true
          resolvePromise(promise, y, resolve, reject)
        }, (r) => {
          if (called)
            return
          called = true
          reject(r)
        })
      }
      catch (error) {
        if (called)
          return
        reject(error)
      }
    }
    else {
      resolve(x)
    }
  }
  else {
    resolve(x)
  }
}

MyPromise.deferred = function () {
  const result = {}
  result.promise = new MyPromise((resolve, reject) => {
    result.resolve = resolve
    result.reject = reject
  })

  return result
}

module.exports = MyPromise
