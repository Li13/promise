const expect = require('chai').expect
const { delayResolve } = require('../../dist/promise.common')

describe('order', function () {
  it('normal', function (done) {
    let i = 1
    Promise.order([delayResolve(1000, 1), delayResolve(2000, 2), delayResolve(4000, 3), delayResolve(1000, 4)], function (value) {
      console.log(value)
      expect(value).to.be.equal(i++)
    }).then((res) => {
      expect(res).to.be.lengthOf(4)
      done()
    }).catch(done)
  })
})
