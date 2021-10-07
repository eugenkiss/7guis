'use strict';

var INFINITY;
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
  INFINITY = require('../../index.js');
} else {
  INFINITY = returnExports;
}

describe('INFINITY', function () {
  it('is a number', function () {
    expect(typeof INFINITY).toBe('number');
  });

  it('should be the same as the global Infinity', function () {
    expect(INFINITY).toBe(Infinity);
  });

  it('when negated should be the same as the global negated Infinity', function () {
    expect(-INFINITY).toBe(-Infinity);
  });

  it('when negated should not be the same as the global Infinity', function () {
    expect(-INFINITY).not.toBe(Infinity);
  });
});
