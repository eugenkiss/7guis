'use strict';

var hasSymbol = typeof Symbol === 'function' && typeof Symbol('') === 'symbol';
var isObjectLike;
if (typeof module === 'object' && module.exports) {
  require('es5-shim');
  require('es5-shim/es5-sham');
  if (typeof JSON === 'undefined') {
    JSON = {};
  }
  require('json3').runInContext(null, JSON);
  require('es6-shim');
  var es7 = require('es7-shim');
  Object.keys(es7).forEach(function (key) {
    var obj = es7[key];
    if (typeof obj.shim === 'function') {
      obj.shim();
    }
  });
  isObjectLike = require('../../index.js');
} else {
  isObjectLike = returnExports;
}

describe('isObjectLike', function () {
  it('should return `true` for objects', function () {
    expect(isObjectLike(arguments)).toBe(true);
    expect(isObjectLike([
      1,
      2,
      3
    ])).toBe(true);
    expect(isObjectLike(Object(false))).toBe(true);
    expect(isObjectLike(new Date())).toBe(true);
    expect(isObjectLike(new Error())).toBe(true);
    expect(isObjectLike({ a: 1 })).toBe(true);
    expect(isObjectLike(Object(0))).toBe(true);
    expect(isObjectLike(/x/)).toBe(true);
    expect(isObjectLike(Object('a'))).toBe(true);
  });

  it('should return `false` for non-objects', function () {
    var symbol = hasSymbol && Symbol('');
    var values = [
      '',
      0,
      false,
      NaN,
      null,
      undefined,
      true,
      1,
      'a',
      symbol
    ];
    var expected = values.map(function () {
      return false;
    });

    var actual = values.map(function (value, index) {
      return index ? isObjectLike(value) : isObjectLike();
    });

    expect(actual).toEqual(expected);
  });
});
