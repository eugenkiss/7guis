'use strict';

var $toString;
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
  $toString = require('../../index.js');
} else {
  $toString = returnExports;
}

var hasSymbol = typeof Symbol === 'function' && typeof Symbol('') === 'symbol';
var ifSymbolIt = hasSymbol ? it : xit;

describe('Basic tests', function () {
  it('should return a string for everything', function () {
    var values = [
      true,
      'abc',
      1,
      null,
      undefined,
      function () {},
      [],
      /r/
    ];

    var expected = values.map(String);
    var actual = values.map($toString);
    expect(actual).toEqual(expected);
  });

  it('should throw for Object.create(null)', function () {
    expect(function () {
      $toString(Object.create(null));
    }).toThrow();
  });

  ifSymbolIt('should throw for Symbol', function () {
    var sym = Symbol('foo');
    expect(function () {
      $toString(sym);
    }).toThrow();

    var symObj = Object(sym);
    expect(function () {
      $toString(Object(symObj));
    }).toThrow();
  });
});
