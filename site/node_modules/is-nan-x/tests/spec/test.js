'use strict';

var numberIsNaN;
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
  numberIsNaN = require('../../index.js');
} else {
  numberIsNaN = returnExports;
}

var itHasWindow = typeof window === 'undefined' ? xit : it;

describe('numberIsNaN', function () {
  it('is a function', function () {
    expect(typeof numberIsNaN).toBe('function');
  });

  it('primitives', function () {
    expect(numberIsNaN()).toBe(false, 'undefined is not NaN');
    expect(numberIsNaN(null)).toBe(false, 'null is not NaN');
    expect(numberIsNaN(false)).toBe(false, 'false is not NaN');
    expect(numberIsNaN(true)).toBe(false, 'true is not NaN');
    expect(numberIsNaN(0)).toBe(false, 'positive zero is not NaN');
    expect(numberIsNaN(Infinity)).toBe(false, 'Infinity is not NaN');
    expect(numberIsNaN(-Infinity)).toBe(false, '-Infinity is not NaN');
    expect(numberIsNaN('foo')).toBe(false, 'string is not NaN');
    expect(numberIsNaN('NaN')).toBe(false, 'string NaN is not NaN');
  });

  it('objects', function () {
    expect(numberIsNaN([])).toBe(false, 'array is not NaN');
    expect(numberIsNaN({})).toBe(false, 'object is not NaN');
    expect(numberIsNaN(function () {})).toBe(false, 'function is not NaN');
  });

  it('valueOf', function () {
    var obj = {
      valueOf: function () {
        return NaN;
      }
    };

    expect(numberIsNaN(Number(obj))).toBe(true, 'object with valueOf of NaN, converted to Number, is NaN');
    expect(numberIsNaN(obj)).toBe(false, 'object with valueOf of NaN is not NaN');
  });

  it('NaN', function () {
    expect(numberIsNaN(NaN)).toBe(true, 'NaN is NaN');
  });

  itHasWindow('Work with window', function () {
    expect(numberIsNaN(window)).toBe(false, 'window is not NaN');
  });
});
