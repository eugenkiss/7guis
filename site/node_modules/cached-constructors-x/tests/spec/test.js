'use strict';

var constructors;
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
  constructors = require('../../index.js');
} else {
  constructors = returnExports;
}

describe('constructors', function () {
  it('is an object', function () {
    expect(typeof constructors).toBe('object');
    expect(constructors).not.toBe(null);
  });

  it('should have all literal constructors', function () {
    var literals = [
      'Array',
      'Boolean',
      'Function',
      'Number',
      'Object',
      'RegExp',
      'String'
    ];

    var ctrs = [
      Array,
      Boolean,
      Function,
      Number,
      Object,
      RegExp,
      String
    ];

    literals.forEach(function (name, index) {
      expect(constructors[name]).toBe(ctrs[index]);
    });
  });
});
