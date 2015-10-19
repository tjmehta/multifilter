var forEach = require('object-loops/for-each')
var isObject = require('101/is-object')
var map = require('object-loops/map')
var reduce = require('object-loops/reduce')

module.exports = multifilter

function multifilter (obj, filters, init) {
  return (arguments.length > 2)
    ? reduce(obj, multifilterReduce(filters), init)
    : arguments.length === 2
      ? reduce(obj, multifilterReduce(filters))
      : multifilterReduce(obj) // obj is filters
}

function multifilterReduce (filters) {
  if (!Array.isArray(filters) && !isObject(filters)) {
    throw new TypeError('`filters` must be an object or array')
  }
  var firstKey
  var firstLoop = true
  var objIsArray
  return function callback (memo, item, key, obj) {
    firstKey = firstKey || first(obj)
    if (firstLoop) {
      firstLoop = false
      objIsArray = Array.isArray(obj)
      var noInitVal = key !== firstKey // && !firstLoop
      var init = map(filters, createInit.bind(null, objIsArray))
      if (noInitVal) {
        // no initialValue provided
        memo = callback(init, memo, firstKey, obj) // memo is first item
        return callback(memo, item, key, obj) // item is second item
      } else {
        // initialValue provided, extend it w/ init output
        forEach(init, function (val, key) {
          memo[key] = val
        })
      }
    }
    forEach(filters, function (filter, filterKey) {
      if (filter(item)) {
        if (objIsArray)
          memo[filterKey].push(item)
        else
          memo[filterKey][key] = item
      }
    })
    return memo
  }
}

function first (o) {
  if (Array.isArray(o)) {
    return 0
  }
  for (var key in o) return key
}

function createInit (createArray) {
  return createArray ? [] : {}
}
