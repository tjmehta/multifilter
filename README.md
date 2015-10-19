# multifilter [![Build Status](https://travis-ci.org/tjmehta/multifilter.svg)](https://travis-ci.org/tjmehta/multifilter) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](http://standardjs.com/)
Split an array into multiple arrays using filters

# Installation

`npm install multifilter`

# Usage

Filter arrays to multiple arrays:
```js
var multifilter = require('multiline')
var arr = [
  1,
  '2',
  3,
  '4'
]
var out;

// use it with reduce
out = arr.reduce(multifilter({
  numbers: isNumber,
  strings: isString
}))

// or use it standalone
out = multifilter(arr, {
  numbers: isNumber,
  strings: isString
})

/* out =
  {
    numbers: [1, 3],
    strings: ['2', '4']
  }
*/
```

Filter objects to multiple objects:
```js
var multifilter = require('multiline')
var obj = {
  a: 1,
  b: '2',
  c: 3,
  d: '4'
}
var out;

out = multifilter(obj, {
  numbers: isNumber,
  strings: isString
})

/* out =
  {
    numbers: { a: 1, c: 3 },
    strings: { b:'2', d:'4'}
  }
*/
```

You can, optionally, output arrays:
```js
var multifilter = require('multiline')
var arr = [
  1,
  '2',
  3,
  '4'
]
var out;

// use it with reduce
out = arr.reduce(multifilter([
  isNumber,
  isString
]))

// or use it standalone
out = multifilter(arr, [
  isNumber,
  isString
])

/* out =
  [
    [1, 3],
    ['2', '4']
  ]
*/

// and w/ objects
var multifilter = require('multiline')
var obj = {
  a: 1,
  b: '2',
  c: 3,
  d: '4'
}
var out;

out = multifilter(obj, [
  isNumber,
  isString
])

/* out =
  [
    { a: 1, c: 3 },
    { b:'2', d:'4'}
  ]
*/
```

# License
MIT