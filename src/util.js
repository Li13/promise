export function forEach (arr, fn, start = 0) {
  let i = start
  let len = arr.length
  while (i < len && arr[i] !== void 0) {
    fn(arr[i], i++)
  }
  return i
}
export function delayResolve (time, value) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(value)
    }, time)
  })
}

export function delayReject (time, reason) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(reason)
    }, time)
  })
}
