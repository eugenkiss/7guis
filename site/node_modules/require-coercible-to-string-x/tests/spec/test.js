'use strict';

var requireCoercibleToString;
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
  requireCoercibleToString = require('../../index.js');
} else {
  requireCoercibleToString = returnExports;
}

var hasSymbol = typeof Symbol === 'function' && typeof Symbol('') === 'symbol';
var ifSymbolIt = hasSymbol ? it : xit;

describe('requireCoercibleToString', function () {
  it('is a function', function () {
    expect(typeof requireCoercibleToString).toBe('function');
  });

  it('should throw when target is null or undefined', function () {
    expect(function () {
      requireCoercibleToString();
    }).toThrow();

    expect(function () {
      requireCoercibleToString(void 0);
    }).toThrow();

    expect(function () {
      requireCoercibleToString(null);
    }).toThrow();
  });

  it('should return a string for everything', function () {
    var values = [
      true,
      'abc',
      1,
      function () {},
      [],
      /r/
    ];

    var expected = values.map(String);
    var actual = values.map(requireCoercibleToString);
    expect(actual).toEqual(expected);
  });

  it('should throw for Object.create(null)', function () {
    expect(function () {
      requireCoercibleToString(Object.create(null));
    }).toThrow();
  });

  ifSymbolIt('should throw for Symbol', function () {
    var sym = Symbol('foo');
    expect(function () {
      requireCoercibleToString(sym);
    }).toThrow();

    var symObj = Object(sym);
    expect(function () {
      requireCoercibleToString(Object(symObj));
    }).toThrow();
  });
});
