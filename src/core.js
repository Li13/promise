const PENDING = void 0
const FULFILLED = 1
const REJECTED = 2

export function resolve (promise, value) {
  if (promise === value) {
    return reject(promise, new TypeError('A promise cannot be resolved with itself.'))
  } else if (value && (typeof value === 'object' || typeof value === 'function')) {

  } else {
    fulfill(promise, value)
  }
}

export function fulfill (promise, value) {
  if (promise._state !== PENDING) return
  promise._state = FULFILLED
  promise._value = value
}

export function reject (promise, reason) {
  if (promise._state !== PENDING) return
  promise._state = REJECTED
  promise._value = reason
}

export function initPromise (promise, fn) {
  try {
    fn(
      function _resolve (value) { resolve(promise, value) },
      function _reject (reason) { reject(promise, reason) }
    )
  } catch (err) {
    reject(promise, err)
  }
}
