var Code = require('code')
var Lab = require('lab')

var lab = exports.lab = Lab.script()
var describe = lab.describe
var it = lab.it
var expect = Code.expect

var isNumber = require('101/is-number')
var isString = require('101/is-string')
var multifilter = require('../index.js')
var reduce = require('object-loops/reduce')

describe('multifilter', function () {
  describe('stand-alone', function () {
    it('should multifilter an object to an object', function (done) {
      var obj = {
        a: 1,
        b: '2',
        c: 3,
        d: '4'
      }
      var filters = {
        numbers: isNumber,
        strings: isString
      }
      expect(multifilter(obj, filters)).to.deep.equal({
        numbers: {
          a: 1,
          c: 3
        },
        strings: {
          b: '2',
          d: '4'
        }
      })
      done()
    })
    it('should multifilter an object to an array', function (done) {
      var obj = {
        a: 1,
        b: '2',
        c: 3,
        d: '4'
      }
      var filters = [
        isNumber,
        isString
      ]
      expect(multifilter(obj, filters)).to.deep.equal([
        {
          a: 1,
          c: 3
        },
        {
          b: '2',
          d: '4'
        }
      ])
      done()
    })
    it('should multifilter an array to an object', function (done) {
      var obj = [
        1,
        '2',
        3,
        '4'
      ]
      var filters = {
        numbers: isNumber,
        strings: isString
      }
      expect(multifilter(obj, filters)).to.deep.equal({
        numbers: [1, 3],
        strings: ['2', '4']
      })
      done()
    })
    it('should multifilter an array to an array', function (done) {
      var obj = [
        1,
        '2',
        3,
        '4'
      ]
      var filters = [
        isNumber,
        isString
      ]
      expect(multifilter(obj, filters)).to.deep.equal([
        [1, 3],
        ['2', '4']
      ])
      done()
    })
    describe('init value', function () {
      it('should multifilter an object to an object', function (done) {
        var obj = {
          a: 1,
          b: '2',
          c: 3,
          d: '4'
        }
        var filters = {
          numbers: isNumber,
          strings: isString
        }
        var init = {}
        var out = multifilter(obj, filters, init)
        expect(out)
          .to.equal(init)
        expect(out).to.deep.equal({
          numbers: {
            a: 1,
            c: 3
          },
          strings: {
            b: '2',
            d: '4'
          }
        })
        done()
      })
    })
    describe('error', function () {
      it('should error if multifilter is passed an invalid type', function (done) {
        expect(multifilter.bind(null, /whwat/)).to.throw(TypeError, /filters/)
        done()
      })
    })
  })

  describe('w/ reduce', function () {
    it('should multifilter an object to an object', function (done) {
      var obj = {
        a: 1,
        b: '2',
        c: 3,
        d: '4'
      }
      var filters = {
        numbers: isNumber,
        strings: isString
      }
      expect(reduce(obj, multifilter(filters))).to.deep.equal({
        numbers: {
          a: 1,
          c: 3
        },
        strings: {
          b: '2',
          d: '4'
        }
      })
      done()
    })
    it('should multifilter an object to an array', function (done) {
      var obj = {
        a: 1,
        b: '2',
        c: 3,
        d: '4'
      }
      var filters = [
        isNumber,
        isString
      ]
      expect(reduce(obj, multifilter(filters))).to.deep.equal([
        {
          a: 1,
          c: 3
        },
        {
          b: '2',
          d: '4'
        }
      ])
      done()
    })
    it('should multifilter an array to an object', function (done) {
      var obj = [
        1,
        '2',
        3,
        '4'
      ]
      var filters = {
        numbers: isNumber,
        strings: isString
      }
      expect(obj.reduce(multifilter(filters))).to.deep.equal({
        numbers: [1, 3],
        strings: ['2', '4']
      })
      done()
    })
    it('should multifilter an array to an array', function (done) {
      var obj = [
        1,
        '2',
        3,
        '4'
      ]
      var filters = [
        isNumber,
        isString
      ]
      expect(obj.reduce(multifilter(filters))).to.deep.equal([
        [1, 3],
        ['2', '4']
      ])
      done()
    })
    describe('init value', function () {
      it('should multifilter an object to an object', function (done) {
        var obj = {
          a: 1,
          b: '2',
          c: 3,
          d: '4'
        }
        var filters = {
          numbers: isNumber,
          strings: isString
        }
        var init = {}
        var out = multifilter(obj, filters, init)
        expect(out)
          .to.equal(init)
        expect(out).to.deep.equal({
          numbers: {
            a: 1,
            c: 3
          },
          strings: {
            b: '2',
            d: '4'
          }
        })
        done()
      })
    })
    describe('error', function () {})
  })
})
