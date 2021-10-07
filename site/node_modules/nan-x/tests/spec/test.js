'use strict';

var NAN;
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
  NAN = require('../../index.js');
} else {
  NAN = returnExports;
}

describe('NAN', function () {
  it('is a number', function () {
    expect(typeof NAN).toBe('number');
  });

  it('should not equal itself', function () {
    expect(NAN).not.toBe(NAN);
    expect(NAN === NAN).toBe(false);
    expect(NAN !== NAN).toBe(true);
  });

  it('should not equal NaN', function () {
    expect(NAN).not.toBe(NaN);
    // eslint-disable-next-line use-isnan
    expect(NAN === NaN).toBe(false);
    // eslint-disable-next-line use-isnan
    expect(NAN !== NaN).toBe(true);
  });
});
