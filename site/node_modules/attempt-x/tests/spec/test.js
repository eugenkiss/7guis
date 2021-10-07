'use strict';

var attempt;
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
  attempt = require('../../index.js');
} else {
  attempt = returnExports;
}

describe('attempt', function () {
  it('is a function', function () {
    expect(typeof attempt).toBe('function');
  });

  it('should return a threw result if not a function', function () {
    var actual = attempt();
    var expected = {
      threw: true,
      value: jasmine.any(Error)
    };

    expect(actual).toEqual(expected);
  });

  it('should return a threw result', function () {
    var err;
    try {
      throw new Error('Threw');
    } catch (e) {
      err = e;
    }

    var thrower = function () {
      throw err;
    };

    var actual = attempt(thrower, 1, 2);
    var expected = {
      threw: true,
      value: err
    };

    expect(actual).toEqual(expected);
  });

  it('should return the sum', function () {
    var sumArgs = function (a, b) {
      return a + b;
    };

    var actual = attempt(sumArgs, 1, 2);
    var expected = {
      threw: false,
      value: 3
    };

    expect(actual).toEqual(expected);
  });

  it('should have the correct this argument', function () {
    var pusher = function (a, b) {
      // eslint-disable-next-line no-invalid-this
      this.push(a, b);
      return 2;
    };

    var thisArg = [];
    var actual = attempt.call(thisArg, pusher, 1, 2);
    var expected = {
      threw: false,
      value: 2
    };

    expect(thisArg).toEqual([1, 2]);
    expect(actual).toEqual(expected);
  });
});
