export function debounce(func, delay) {
  let timerId
  return function (...args) {
    clearTimeout(timerId)
    timerId = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

export function throttle(func, delay) {
  let timerId
  return function (...args) {
    if (!timerId) {
      func.apply(this, args)
      timerId = setTimeout(() => {
        timerId = null
      }, delay)
    }
  }
}
