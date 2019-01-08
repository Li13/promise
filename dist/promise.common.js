'use strict';

function _finally (Promise) {
  if (Promise.prototype.finally) { return }
  Promise.prototype.finally = function (fn) {
    return this.then(
      function (value) { return Promise.resolve(fn()).then(function () { return value; }); },
      function (reason) { return Promise.resolve(fn()).then(function () { throw reason }); }
    )
  };
}

function timeout (Promise) {
  if (Promise.prototype.timeout) { return }
  Promise.prototype.timeout = function (ms, error) {
    var this$1 = this;

    return new Promise(function (resolve, reject) {
      var timeoutId = setTimeout(function () {
        if (!error || typeof error === 'string') {
          error = new Error(error || 'Timed out after ' + ms + ' ms');
        }
        reject(error);
      }, ms);

      this$1.then(function (value) {
        clearTimeout(timeoutId);
        resolve(value);
      }, function (exception) {
        clearTimeout(timeoutId);
        reject(exception);
      });
    })
  };
}

function forEach (arr, fn, start) {
  if ( start === void 0 ) start = 0;

  var i = start;
  var len = arr.length;
  while (i < len && arr[i] !== void 0) {
    fn(arr[i], i++);
  }
  return i
}
function delayResolve (time, value) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(value);
    }, time);
  })
}

function delayReject (time, reason) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      reject(reason);
    }, time);
  })
}

function order (Promise) {
  Promise.order = function (promises, onFulfilled, onRejected) {
    return new Promise(function (resolve) {
      var len = promises.length;
      var arr = new Array(len);
      var j = 0;
      var loop = function ( i ) {
        var item = promises[i];
        item.then(function (value) {
          arr[i] = {
            value: value,
            state: 'fulfilled'
          };
        }, function (reason) {
          arr[i] = {
            reason: reason,
            state: 'rejected'
          };
        }).finally(function () {
          j = forEach(arr, function (v) {
            if (v.state === 'fulfilled') {
              onFulfilled(v.value);
            } else if (v.state === 'rejected') {
              onRejected(v.reason);
            }
          }, j);
          if (j === len) {
            resolve(arr);
          }
        });
      };

      for (var i = 0; i < len; i++) loop( i );
    })
  };
}

_finally(Promise$1);
timeout(Promise$1);
order(Promise$1);

function Promise$1 () {
  this._value = null;
  this._state = void 0;
  this.subs = [];
  this._init();
}

Promise$1.prototype._init = function () {
  var Constructor = this.constructor;
  _finally(Constructor);
  timeout(Constructor);
  order(Constructor);
};

var index = {
  delayResolve: delayResolve,
  delayReject: delayReject,
  forEach: forEach
};

module.exports = index;
//# sourceMappingURL=promise.common.js.map
