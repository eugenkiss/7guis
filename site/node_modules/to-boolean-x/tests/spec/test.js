'use strict';

var toBoolean;
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
  toBoolean = require('../../index.js');
} else {
  toBoolean = returnExports;
}

var coercibleObject = {
  toString: function () {
    return 42;
  },
  valueOf: function () {
    return '3';
  }
};

var valueOfOnlyObject = {
  toString: function () {
    return {};
  },
  valueOf: function () {
    return 4;
  }
};

var toStringOnlyObject = {
  toString: function () {
    return 7;
  },
  valueOf: function () {
    return {};
  }
};

var uncoercibleObject = {
  toString: function () {
    return {};
  },
  valueOf: function () {
    return {};
  }
};

var objects = [
  {},
  coercibleObject,
  toStringOnlyObject,
  valueOfOnlyObject
];

describe('toBoolean', function () {
  it('is a function', function () {
    expect(typeof toBoolean).toBe('function');
  });

  it('shoul return the correct boolean value', function () {
    expect(toBoolean(undefined)).toBe(false, 'undefined coerces to false');
    expect(toBoolean(null)).toBe(false, 'null coerces to false');
    expect(toBoolean(false)).toBe(false, 'false returns false');
    expect(toBoolean(true)).toBe(true, 'true returns true');

    [
      0,
      -0,
      NaN
    ].forEach(function (falsyNumber) {
      expect(toBoolean(falsyNumber)).toBe(false, 'falsy number ' + falsyNumber + ' coerces to false');
    });

    [
      Infinity,
      42,
      1,
      -Infinity
    ].forEach(function (truthyNumber) {
      expect(toBoolean(truthyNumber)).toBe(true, 'truthy number ' + truthyNumber + ' coerces to true');
    });

    expect(toBoolean('')).toBe(false, 'empty string coerces to false');
    expect(toBoolean('foo')).toBe(true, 'nonempty string coerces to true');
    objects.forEach(function (obj) {
      expect(toBoolean(obj)).toBe(true, 'object coerces to true');
    });

    expect(toBoolean(uncoercibleObject)).toBe(true, 'uncoercibleObject coerces to true');
  });
});
