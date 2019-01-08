
import { forEach } from './util'

export default function order (Promise) {
  Promise.order = function (promises, onFulfilled, onRejected) {
    return new Promise((resolve) => {
      let len = promises.length
      let arr = new Array(len)
      let j = 0
      for (let i = 0; i < len; i++) {
        let item = promises[i]
        item.then((value) => {
          arr[i] = {
            value,
            state: 'fulfilled'
          }
        }, (reason) => {
          arr[i] = {
            reason,
            state: 'rejected'
          }
        }).finally(() => {
          j = forEach(arr, (v) => {
            if (v.state === 'fulfilled') {
              onFulfilled(v.value)
            } else if (v.state === 'rejected') {
              onRejected(v.reason)
            }
          }, j)
          if (j === len) {
            resolve(arr)
          }
        })
      }
    })
  }
}
