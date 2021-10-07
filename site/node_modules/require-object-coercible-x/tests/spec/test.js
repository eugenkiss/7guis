'use strict';

var hasSymbol = typeof Symbol === 'function' && typeof Symbol('') === 'symbol';
var ifSymbolIt = hasSymbol ? it : xit;
var $requireObjectCoercible;
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
  $requireObjectCoercible = require('../../index.js');
} else {
  $requireObjectCoercible = returnExports;
}

describe('Basic tests', function () {
  it('should throw TypeError everything', function () {
    expect(function () {
      $requireObjectCoercible();
    }).toThrow();
    expect(function () {
      $requireObjectCoercible(undefined);
    }).toThrow();
    expect(function () {
      $requireObjectCoercible(null);
    }).toThrow();
  });

  it('should return value for everything', function () {
    var values = [
      true,
      'abc',
      1,
      function () {},
      [],
      /r/
    ];
    var actual = values.map($requireObjectCoercible);
    expect(actual).toEqual(values);
  });

  ifSymbolIt('should return Symbol', function () {
    var sym = Symbol('foo');
    expect($requireObjectCoercible(sym)).toBe(sym);
  });
});
