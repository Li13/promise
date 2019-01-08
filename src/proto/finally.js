
export default function _finally (Promise) {
  if (Promise.prototype.finally) return
  Promise.prototype.finally = function (fn) {
    return this.then(
      (value) => Promise.resolve(fn()).then(() => value),
      (reason) => Promise.resolve(fn()).then(() => { throw reason })
    )
  }
}
