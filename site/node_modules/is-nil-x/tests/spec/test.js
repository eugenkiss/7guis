'use strict';

var isNil;
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
  isNil = require('../../index.js');
} else {
  isNil = returnExports;
}

describe('isNil', function () {
  it('should return true for `undefined` or `null`', function () {
    expect(isNil()).toBe(true);
    expect(isNil(undefined)).toBe(true);
    expect(isNil(null)).toBe(true);
  });

  it('should return false for anything else', function () {
    expect(isNil(true)).toBe(false);
    expect(isNil(1)).toBe(false);
    expect(isNil('')).toBe(false);
    expect(isNil([])).toBe(false);
    expect(isNil({})).toBe(false);
  });
});
