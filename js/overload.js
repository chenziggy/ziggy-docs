// 函数重载1

export function addMethod(object, name, fn) {
  const old = object[name]
  object[name] = function (...args) {
    if (args.length === fn.length)
      return fn.apply(this, args)
    else if (typeof old === 'function')
      return old.apply(this, args)
  }
}

// 函数重载2
export function createOverload() {
  const callMap = new Map()
  function overload(...args) {
    const key = args.map(arg => typeof arg).join(',')
    const fn = callMap.get(key)
    if (fn)
      return fn.apply(this, args)

    throw new Error('not matching function')
  }

  overload.addImpl = function (...args) {
    const fn = args.pop()
    if (typeof fn !== 'function')
      return

    const types = args
    callMap.set(types.join(','), fn)
  }

  return overload
}
