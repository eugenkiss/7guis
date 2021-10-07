'use strict';

var isFalsey;
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
  isFalsey = require('../../index.js');
} else {
  isFalsey = returnExports;
}

var coercibleObject = {
  toString: function () {
    return 42;
  },
  valueOf: function () {
    return 3;
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

var objects = [
  {},
  coercibleObject,
  toStringOnlyObject,
  valueOfOnlyObject
];

var nullPrimitives = [undefined, null];
var falsies = [].concat(nullPrimitives, false, '', 0, -0, NaN);
var truthies = [].concat(true, 'foo', 42, objects);

describe('isFalsey', function () {
  it('is a function', function () {
    expect(typeof isFalsey).toBe('function');
  });

  it('should return true for falsey values', function () {
    var expected = falsies.map(function () {
      return true;
    });

    var actual = falsies.map(function (item) {
      return isFalsey(item);
    });

    expect(actual).toEqual(expected);
  });

  it('should return false for truthy values', function () {
    var expected = truthies.map(function () {
      return false;
    });

    var actual = truthies.map(function (item) {
      return isFalsey(item);
    });

    expect(actual).toEqual(expected);
  });
});
