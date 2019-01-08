
export default function timeout (Promise) {
  if (Promise.prototype.timeout) return
  Promise.prototype.timeout = function (ms, error) {
    return new Promise((resolve, reject) => {
      var timeoutId = setTimeout(function () {
        if (!error || typeof error === 'string') {
          error = new Error(error || 'Timed out after ' + ms + ' ms')
        }
        reject(error)
      }, ms)

      this.then(function (value) {
        clearTimeout(timeoutId)
        resolve(value)
      }, function (exception) {
        clearTimeout(timeoutId)
        reject(exception)
      })
    })
  }
}
