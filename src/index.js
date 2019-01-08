import _finally from './proto/finally'
import timeout from './proto/timeout'
import order from './order'
import { delayResolve, delayReject, forEach } from './util'

_finally(Promise)
timeout(Promise)
order(Promise)

function Promise () {
  this._value = null
  this._state = void 0
  this.subs = []
  this._init()
}

Promise.prototype._init = function () {
  let Constructor = this.constructor
  _finally(Constructor)
  timeout(Constructor)
  order(Constructor)
}

export default {
  delayResolve,
  delayReject,
  forEach
}
