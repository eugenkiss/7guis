(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.returnExports = f()}})(function(){var define,module,exports;return (function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(_dereq_,module,exports){
/**
 * @file Determine if a value is object like.
 * @version 1.7.1
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module is-object-like-x
 */

'use strict';

var isFunction = _dereq_('is-function-x');
var isPrimitive = _dereq_('is-primitive');

/**
 * Checks if `value` is object-like. A value is object-like if it's not a
 * primitive and not a function.
 *
 * @param {*} value - The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 * var isObjectLike = require('is-object-like-x');
 *
 * isObjectLike({});
 * // => true
 *
 * isObjectLike([1, 2, 3]);
 * // => true
 *
 * isObjectLike(_.noop);
 * // => false
 *
 * isObjectLike(null);
 * // => false
 */
module.exports = function isObjectLike(value) {
  return isPrimitive(value) === false && isFunction(value, true) === false;
};

},{"is-function-x":7,"is-primitive":10}],2:[function(_dereq_,module,exports){
/**
 * @file Invokes function, returning an object of the results.
 * @version 1.1.3
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module attempt-x
 */

'use strict';

var getArgs = function _getArgs(args) {
  var length = args.length >>> 0;
  var array = [];
  var argLength = length - 1;
  if (argLength < 1) {
    return array;
  }

  array.length = argLength;
  for (var index = 1; index < length; index += 1) {
    array[index - 1] = args[index];
  }

  return array;
};

/**
 * This method attempts to invoke the function, returning either the result or
 * the caught error object. Any additional arguments are provided to the
 * function when it's invoked.
 *
 * @param {Function} fn - The function to attempt.
 * @param {...*} [args] - The arguments to invoke the function with.
 * @returns {Object} Returns an object of the result.
 * @example
 * var attempt = require('attempt-x');
 *
 * function thrower() {
 *   throw new Error('Threw');
 * }
 *
 * attempt(thrower, 1, 2);
 * // {
 * //   threw: true,
 * //   value: // Error('Threw') object
 * // }
 *
 * function sumArgs(a, b) {
 *   return a + b;
 * }
 *
 * attempt(sumArgs, 1, 2);
 * // {
 * //   threw: false,
 * //   value: 3
 * // }
 *
 * var thisArg = [];
 * function pusher(a, b) {
 *   return this.push(a, b);
 * }
 *
 * attempt.call(thisArg, pusher, 1, 2);
 * // {
 * //   threw: false,
 * //   value: 2
 * // }
 * // thisArg => [1, 2];
 */
module.exports = function attempt(fn) {
  try {
    return {
      threw: false,
      value: fn.apply(this, getArgs(arguments))
    };
  } catch (e) {
    return {
      threw: true,
      value: e
    };
  }
};

},{}],3:[function(_dereq_,module,exports){
/**
 * @file Constructors cached from literals.
 * @version 1.0.2
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module cached-constructors-x
 */

'use strict';

/**
 * Constructors cached from literals.
 *
 * @type Object
 * @example
 * var constructors = require('cached-constructors-x');
 */
module.exports = {
  Array: [].constructor,
  Boolean: true.constructor,
  Function: function () {}.constructor,
  Number: (0).constructor,
  Object: {}.constructor,
  RegExp: (/(?:)/).constructor,
  String: ''.constructor
};

},{}],4:[function(_dereq_,module,exports){
/**
 * @file Tests if ES6 Symbol is supported.
 * @version 1.4.1
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module has-symbol-support-x
 */

'use strict';

/**
 * Indicates if `Symbol`exists and creates the correct type.
 * `true`, if it exists and creates the correct type, otherwise `false`.
 *
 * @type boolean
 */
module.exports = typeof Symbol === 'function' && typeof Symbol('') === 'symbol';

},{}],5:[function(_dereq_,module,exports){
/**
 * @file Tests if ES6 @@toStringTag is supported.
 * @see {@link http://www.ecma-international.org/ecma-262/6.0/#sec-@@tostringtag|26.3.1 @@toStringTag}
 * @version 1.4.1
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module has-to-string-tag-x
 */

'use strict';

/**
 * Indicates if `Symbol.toStringTag`exists and is the correct type.
 * `true`, if it exists and is the correct type, otherwise `false`.
 *
 * @type boolean
 */
module.exports = _dereq_('has-symbol-support-x') && typeof Symbol.toStringTag === 'symbol';

},{"has-symbol-support-x":4}],6:[function(_dereq_,module,exports){
/**
 * @file Test if a given value is falsey.
 * @version 1.0.3
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module is-falsey-x
 */

'use strict';

var toBoolean = _dereq_('to-boolean-x');

/**
 * This method tests if a given value is falsey.
 *
 * @param {*} value - The value to test.
 * @returns {boolean} `true` if the value is falsey: otherwise `false`.
 * @example
 * var isFalsey = require('is-falsey-x');
 *
 * isFalsey(); // true
 * isFalsey(0); // true
 * isFalsey(''); // true
 * isFalsey(false); // true
 * isFalsey(null); // true
 *
 * isFalsey(true); // false
 * isFalsey([]); // false
 * isFalsey(1); // false
 * isFalsey(function () {}); // false
 */
module.exports = function isFalsey(value) {
  return toBoolean(value) === false;
};

},{"to-boolean-x":17}],7:[function(_dereq_,module,exports){
/**
 * @file Determine whether a given value is a function object.
 * @version 3.3.0
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module is-function-x
 */

'use strict';

var attempt = _dereq_('attempt-x');
var fToString = Function.prototype.toString;
var toBoolean = _dereq_('to-boolean-x');
var isFalsey = _dereq_('is-falsey-x');
var toStringTag = _dereq_('to-string-tag-x');
var hasToStringTag = _dereq_('has-to-string-tag-x');
var isPrimitive = _dereq_('is-primitive');
var normalise = _dereq_('normalize-space-x').normalizeSpace;
var deComment = _dereq_('replace-comments-x');
var funcTag = '[object Function]';
var genTag = '[object GeneratorFunction]';
var asyncTag = '[object AsyncFunction]';
var ctrRx = /^class /;
var test = ctrRx.test;

var hasNativeClass = attempt(function () {
  // eslint-disable-next-line no-new-func
  return Function('"use strict"; return class My {};')();
}).threw === false;

var testClassstring = function _testClassstring(value) {
  return test.call(ctrRx, normalise(deComment(fToString.call(value), ' ')));
};

var isES6ClassFn = function isES6ClassFunc(value) {
  var result = attempt(testClassstring, value);

  return result.threw === false && result.value;
};

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @private
 * @param {*} value - The value to check.
 * @param {boolean} allowClass - Whether to filter ES6 classes.
 * @returns {boolean} Returns `true` if `value` is correctly classified,
 * else `false`.
 */
var tryFuncToString = function funcToString(value, allowClass) {
  if (hasNativeClass && allowClass === false && isES6ClassFn(value)) {
    return false;
  }

  return attempt.call(value, fToString).threw === false;
};

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @param {*} value - The value to check.
 * @param {boolean} [allowClass=false] - Whether to filter ES6 classes.
 * @returns {boolean} Returns `true` if `value` is correctly classified,
 * else `false`.
 * @example
 * var isFunction = require('is-function-x');
 *
 * isFunction(); // false
 * isFunction(Number.MIN_VALUE); // false
 * isFunction('abc'); // false
 * isFunction(true); // false
 * isFunction({ name: 'abc' }); // false
 * isFunction(function () {}); // true
 * isFunction(new Function ()); // true
 * isFunction(function* test1() {}); // true
 * isFunction(function test2(a, b) {}); // true
 * isFunction(async function test3() {}); // true
 * isFunction(class Test {}); // false
 * isFunction(class Test {}, true); // true
 * isFunction((x, y) => {return this;}); // true
 */
module.exports = function isFunction(value) {
  if (isPrimitive(value)) {
    return false;
  }

  if (hasToStringTag) {
    return tryFuncToString(value, toBoolean(arguments[1]));
  }

  if (hasNativeClass && isFalsey(arguments[1]) && isES6ClassFn(value)) {
    return false;
  }

  var strTag = toStringTag(value);
  return strTag === funcTag || strTag === genTag || strTag === asyncTag;
};

},{"attempt-x":2,"has-to-string-tag-x":5,"is-falsey-x":6,"is-primitive":8,"normalize-space-x":13,"replace-comments-x":14,"to-boolean-x":17,"to-string-tag-x":18}],8:[function(_dereq_,module,exports){
/*!
 * is-primitive <https://github.com/jonschlinkert/is-primitive>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

// see http://jsperf.com/testing-value-is-primitive/7
module.exports = function isPrimitive(value) {
  return value == null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],9:[function(_dereq_,module,exports){
/**
 * @file Checks if `value` is `null` or `undefined`.
 * @version 1.4.1
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module is-nil-x
 */

'use strict';

var isUndefined = _dereq_('validate.io-undefined');
var isNull = _dereq_('lodash.isnull');

/**
 * Checks if `value` is `null` or `undefined`.
 *
 * @param {*} value - The value to check.
 * @returns {boolean} Returns `true` if `value` is nullish, else `false`.
 * @example
 * var isNil = require('is-nil-x');
 *
 * isNil(null); // => true
 * isNil(void 0); // => true
 * isNil(NaN); // => false
 */
module.exports = function isNil(value) {
  return isNull(value) || isUndefined(value);
};

},{"lodash.isnull":12,"validate.io-undefined":23}],10:[function(_dereq_,module,exports){
/*!
 * is-primitive <https://github.com/jonschlinkert/is-primitive>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

'use strict';

module.exports = function isPrimitive(val) {
  switch (typeof val) {
    case 'boolean':
    case 'number':
    case 'string':
    case 'symbol':
    case 'undefined':
      return true;
    default: {
      return val === null;
    }
  }
};

},{}],11:[function(_dereq_,module,exports){
'use strict';

var toStr = Object.prototype.toString;
var hasSymbols = typeof Symbol === 'function' && typeof Symbol() === 'symbol';

if (hasSymbols) {
	var symToStr = Symbol.prototype.toString;
	var symStringRegex = /^Symbol\(.*\)$/;
	var isSymbolObject = function isSymbolObject(value) {
		if (typeof value.valueOf() !== 'symbol') { return false; }
		return symStringRegex.test(symToStr.call(value));
	};
	module.exports = function isSymbol(value) {
		if (typeof value === 'symbol') { return true; }
		if (toStr.call(value) !== '[object Symbol]') { return false; }
		try {
			return isSymbolObject(value);
		} catch (e) {
			return false;
		}
	};
} else {
	module.exports = function isSymbol(value) {
		// this environment does not support Symbols.
		return false;
	};
}

},{}],12:[function(_dereq_,module,exports){
/**
 * lodash 3.0.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/**
 * Checks if `value` is `null`.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `null`, else `false`.
 * @example
 *
 * _.isNull(null);
 * // => true
 *
 * _.isNull(void 0);
 * // => false
 */
function isNull(value) {
  return value === null;
}

module.exports = isNull;

},{}],13:[function(_dereq_,module,exports){
/**
 * @file Trims and replaces sequences of whitespace characters by a single space.
 * @version 3.0.0
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module normalize-space-x
 */

'use strict';

var libTrim = _dereq_('trim-x');
var trim2016 = libTrim.trim2016;
var trim2018 = libTrim.trim2018;
var Rx = _dereq_('cached-constructors-x').RegExp;
var libWhiteSpace = _dereq_('white-space-x');
var reNormalize2016 = new Rx('[' + libWhiteSpace.string2016 + ']+', 'g');
var reNormalize2018 = new Rx('[' + libWhiteSpace.string2018 + ']+', 'g');
var replace = ''.replace;

var $normalizeSpace2016 = function normalizeSpace2016(string) {
  return replace.call(trim2016(string), reNormalize2016, ' ');
};

var $normalizeSpace2018 = function normalizeSpace2018(string) {
  return replace.call(trim2018(string), reNormalize2018, ' ');
};

module.exports = {
  /**
   * Reference to normalizeSpace2018.
   */
  normalizeSpace: $normalizeSpace2018,

  /**
   * This method strips leading and trailing white-space from a string,
   * replaces sequences of whitespace characters by a single space,
   * and returns the resulting string. (ES2016)
   *
   * @param {string} string - The string to be normalized.
   * @throws {TypeError} If string is null or undefined or not coercible.
   * @returns {string} The normalized string.
   * @example
   * var normalizeSpace = require('normalize-space-x');
   *
   * normalizeSpace(' \t\na \t\nb \t\n') === 'a b'; // true
   */
  normalizeSpace2016: $normalizeSpace2016,

  /**
   * This method strips leading and trailing white-space from a string,
   * replaces sequences of whitespace characters by a single space,
   * and returns the resulting string. (ES2018)
   *
   * @param {string} string - The string to be normalized.
   * @throws {TypeError} If string is null or undefined or not coercible.
   * @returns {string} The normalized string.
   * @example
   * var normalizeSpace = require('normalize-space-x');
   *
   * normalizeSpace(' \t\na \t\nb \t\n') === 'a b'; // true
   */
  normalizeSpace2018: $normalizeSpace2018
};

},{"cached-constructors-x":3,"trim-x":22,"white-space-x":24}],14:[function(_dereq_,module,exports){
/**
 * @file Replace the comments in a string.
 * @version 2.0.0
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module replace-comments-x
 */

'use strict';

var toStr = _dereq_('to-string-x');
var requireCoercibleToString = _dereq_('require-coercible-to-string-x');
var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
var replace = ''.replace;

/**
 * This method replaces comments in a string.
 *
 * @param {string} string - The string to be stripped.
 * @param {string} [replacement] - The string to be used as a replacement.
 * @throws {TypeError} If string is null or undefined or not coercible.
 * @throws {TypeError} If replacement is not coercible.
 * @returns {string} The new string with the comments replaced.
 * @example
 * var replaceComments = require('replace-comments-x');
 *
 * replaceComments(test;/* test * /, ''), // 'test;'
 * replaceComments(test; // test, ''), // 'test;'
 */
module.exports = function replaceComments(string) {
  return replace.call(requireCoercibleToString(string), STRIP_COMMENTS, arguments.length > 1 ? toStr(arguments[1]) : '');
};

},{"require-coercible-to-string-x":15,"to-string-x":19}],15:[function(_dereq_,module,exports){
/**
 * @file Requires an argument is corecible then converts using ToString.
 * @version 1.0.0
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module require-coercible-to-string-x
 */

'use strict';

var requireObjectCoercible = _dereq_('require-object-coercible-x');
var toStr = _dereq_('to-string-x');

/**
 * This method requires an argument is corecible then converts using ToString.
 *
 * @param {*} value - The value to converted to a string.
 * @throws {TypeError} If value is null or undefined.
 * @returns {string} The value as a string.
 * @example
 * var requireCoercibleToString = require('require-coercible-to-string-x');
 *
 * requireCoercibleToString(); // TypeError
 * requireCoercibleToString(null); // TypeError
 * requireCoercibleToString(Symbol('')); // TypeError
 * requireCoercibleToString(Object.create(null)); // TypeError
 * requireCoercibleToString(1); // '1'
 * requireCoercibleToString(true); // 'true'
 */
module.exports = function requireCoercibleToString(value) {
  return toStr(requireObjectCoercible(value));
};

},{"require-object-coercible-x":16,"to-string-x":19}],16:[function(_dereq_,module,exports){
/**
 * @file ES6-compliant shim for RequireObjectCoercible.
 * @see {@link http://www.ecma-international.org/ecma-262/6.0/#sec-requireobjectcoercible|7.2.1 RequireObjectCoercible ( argument )}
 * @version 1.4.1
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module require-object-coercible-x
 */

'use strict';

var isNil = _dereq_('is-nil-x');

/**
 * The abstract operation RequireObjectCoercible throws an error if argument
 * is a value that cannot be converted to an Object using ToObject.
 *
 * @param {*} value - The `value` to check.
 * @throws {TypeError} If `value` is a `null` or `undefined`.
 * @returns {string} The `value`.
 * @example
 * var RequireObjectCoercible = require('require-object-coercible-x');
 *
 * RequireObjectCoercible(); // TypeError
 * RequireObjectCoercible(null); // TypeError
 * RequireObjectCoercible('abc'); // 'abc'
 * RequireObjectCoercible(true); // true
 * RequireObjectCoercible(Symbol('foo')); // Symbol('foo')
 */
module.exports = function RequireObjectCoercible(value) {
  if (isNil(value)) {
    throw new TypeError('Cannot call method on ' + value);
  }

  return value;
};

},{"is-nil-x":9}],17:[function(_dereq_,module,exports){
/**
 * @file Converts argument to a value of type Boolean.
 * @version 1.0.3
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module to-boolean-x
 */

'use strict';

/**
 * The abstract operation ToBoolean converts argument to a value of type Boolean.
 *
 * @param {*} value - The value to be converted.
 * @returns {boolean} 'true' if value is truthy; otherwise 'false'.
 * @example
 * var toBoolean = require('to-boolean-x');
 *
 * toBoolean(null); // false
 * toBoolean(''); // false
 * toBoolean(1); // true
 * toBoolean('0'); // true
 */
module.exports = function toBoolean(value) {
  return !!value;
};

},{}],18:[function(_dereq_,module,exports){
/**
 * @file Get an object's ES6 @@toStringTag.
 * @see {@link http://www.ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring|19.1.3.6 Object.prototype.toString ( )}
 * @version 1.4.2
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module to-string-tag-x
 */

'use strict';

var isNull = _dereq_('lodash.isnull');
var isUndefined = _dereq_('validate.io-undefined');
var toStr = {}.toString;

/**
 * The `toStringTag` method returns "[object type]", where type is the
 * object type.
 *
 * @param {*} value - The object of which to get the object type string.
 * @returns {string} The object type string.
 * @example
 * var toStringTag = require('to-string-tag-x');
 *
 * var o = new Object();
 * toStringTag(o); // returns '[object Object]'
 */
module.exports = function toStringTag(value) {
  if (isNull(value)) {
    return '[object Null]';
  }

  if (isUndefined(value)) {
    return '[object Undefined]';
  }

  return toStr.call(value);
};

},{"lodash.isnull":12,"validate.io-undefined":23}],19:[function(_dereq_,module,exports){
/**
 * @file ES6-compliant shim for ToString.
 * @see {@link http://www.ecma-international.org/ecma-262/6.0/#sec-tostring|7.1.12 ToString ( argument )}
 * @version 1.4.5
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module to-string-x
 */

'use strict';

var castString = _dereq_('cached-constructors-x').String;
var isSymbol = _dereq_('is-symbol');

/**
 * The abstract operation ToString converts argument to a value of type String.
 *
 * @param {*} value - The value to convert to a string.
 * @throws {TypeError} If `value` is a Symbol.
 * @returns {string} The converted value.
 * @example
 * var $toString = require('to-string-x');
 *
 * $toString(); // 'undefined'
 * $toString(null); // 'null'
 * $toString('abc'); // 'abc'
 * $toString(true); // 'true'
 * $toString(Symbol('foo')); // TypeError
 * $toString(Symbol.iterator); // TypeError
 * $toString(Object(Symbol.iterator)); // TypeError
 * $toString(Object.create(null)); // TypeError
 */
module.exports = function ToString(value) {
  if (isSymbol(value)) {
    throw new TypeError('Cannot convert a Symbol value to a string');
  }

  return castString(value);
};

},{"cached-constructors-x":3,"is-symbol":11}],20:[function(_dereq_,module,exports){
/**
 * @file This method removes whitespace from the left end of a string.
 * @version 3.0.0
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module trim-left-x
 */

'use strict';

var requireCoercibleToString = _dereq_('require-coercible-to-string-x');
var Rx = _dereq_('cached-constructors-x').RegExp;
var reLeft2016 = new Rx('^[' + _dereq_('white-space-x').string2016 + ']+');
var reLeft2018 = new Rx('^[' + _dereq_('white-space-x').string2018 + ']+');
var replace = ''.replace;

var $trimLeft2016 = function trimLeft2016(string) {
  return replace.call(requireCoercibleToString(string), reLeft2016, '');
};

var $trimLeft2018 = function trimLeft2018(string) {
  return replace.call(requireCoercibleToString(string), reLeft2018, '');
};

module.exports = {
  /**
   * A reference to leftTrim2018.
   */
  trimLeft: $trimLeft2018,

  /**
   * This method removes whitespace from the left end of a string. (ES2016)
   *
   * @param {string} string - The string to trim the left end whitespace from.
   * @throws {TypeError} If string is null or undefined or not coercible.
   * @returns {string} The left trimmed string.
   * @example
   * var trimLeft = require('trim-left-x').trimLeft2016;
   *
   * trimLeft(' \t\na \t\n') === 'a \t\n'; // true
   */
  trimLeft2016: $trimLeft2016,

  /**
   * This method removes whitespace from the left end of a string. (ES2018)
   *
   * @param {string} string - The string to trim the left end whitespace from.
   * @throws {TypeError} If string is null or undefined or not coercible.
   * @returns {string} The left trimmed string.
   * @example
   * var trimLeft = require('trim-left-x').trimLeft2018;
   *
   * trimLeft(' \t\na \t\n') === 'a \t\n'; // true
   */
  trimLeft2018: $trimLeft2018
};

},{"cached-constructors-x":3,"require-coercible-to-string-x":15,"white-space-x":24}],21:[function(_dereq_,module,exports){
/**
 * @file This method removes whitespace from the right end of a string.
 * @version 3.0.0
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module trim-right-x
 */

'use strict';

var requireCoercibleToString = _dereq_('require-coercible-to-string-x');
var Rx = _dereq_('cached-constructors-x').RegExp;
var reRight2016 = new Rx('[' + _dereq_('white-space-x').string2016 + ']+$');
var reRight2018 = new Rx('[' + _dereq_('white-space-x').string2018 + ']+$');
var replace = ''.replace;

var $trimRight2016 = function trimRight2016(string) {
  return replace.call(requireCoercibleToString(string), reRight2016, '');
};

var $trimRight2018 = function trimRight2018(string) {
  return replace.call(requireCoercibleToString(string), reRight2018, '');
};

module.exports = {
  /**
   * A reference to trimRight2018.
   */
  trimRight: $trimRight2018,

  /**
   * This method removes whitespace from the right end of a string. (ES2016)
   *
   * @param {string} string - The string to trim the right end whitespace from.
   * @throws {TypeError} If string is null or undefined or not coercible.
   * @returns {string} The right trimmed string.
   * @example
   * var trimRight = require('trim-right-x');
   *
   * trimRight(' \t\na \t\n') === ' \t\na'; // true
   */
  trimRight2016: $trimRight2016,

  /**
   * This method removes whitespace from the right end of a string. (ES2018)
   *
   * @param {string} string - The string to trim the right end whitespace from.
   * @throws {TypeError} If string is null or undefined or not coercible.
   * @returns {string} The right trimmed string.
   * @example
   * var trimRight = require('trim-right-x');
   *
   * trimRight(' \t\na \t\n') === ' \t\na'; // true
   */
  trimRight2018: $trimRight2018
};

},{"cached-constructors-x":3,"require-coercible-to-string-x":15,"white-space-x":24}],22:[function(_dereq_,module,exports){
/**
 * @file This method removes whitespace from the left and right end of a string.
 * @version 3.0.0
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module trim-x
 */

'use strict';

var libTrimLeft = _dereq_('trim-left-x');
var trimLeft2016 = libTrimLeft.trimLeft2016;
var trimLeft2018 = libTrimLeft.trimLeft2018;
var libTrimRight = _dereq_('trim-right-x');
var trimRight2016 = libTrimRight.trimRight2016;
var trimRight2018 = libTrimRight.trimRight2016;

var $trim2016 = function trim2016(string) {
  return trimLeft2016(trimRight2016(string));
};

var $trim2018 = function trim2018(string) {
  return trimLeft2018(trimRight2018(string));
};

module.exports = {
  /**
   * A reference to trim2018.
   */
  trim: $trim2018,

  /**
   * This method removes whitespace from the left and right end of a string.
   * (ES2016)
   * @param {string} string - The string to trim the whitespace from.
   * @throws {TypeError} If string is null or undefined or not coercible.
   * @returns {string} The trimmed string.
   * @example
   * var trim = require('trim-x');
   *
   * trim(' \t\na \t\n') === 'a'; // true
   */
  trim2016: $trim2016,

  /**
   * This method removes whitespace from the left and right end of a string.
   * (ES2018)
   *
   * @param {string} string - The string to trim the whitespace from.
   * @throws {TypeError} If string is null or undefined or not coercible.
   * @returns {string} The trimmed string.
   * @example
   * var trim = require('trim-x');
   *
   * trim(' \t\na \t\n') === 'a'; // true
   */
  trim2018: $trim2018
};

},{"trim-left-x":20,"trim-right-x":21}],23:[function(_dereq_,module,exports){
/**
*
*	VALIDATE: undefined
*
*
*	DESCRIPTION:
*		- Validates if a value is undefined.
*
*
*	NOTES:
*		[1]
*
*
*	TODO:
*		[1]
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2014. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. kgryte@gmail.com. 2014.
*
*/

'use strict';

/**
* FUNCTION: isUndefined( value )
*	Validates if a value is undefined.
*
* @param {*} value - value to be validated
* @returns {Boolean} boolean indicating whether value is undefined
*/
function isUndefined( value ) {
	return value === void 0;
} // end FUNCTION isUndefined()


// EXPORTS //

module.exports = isUndefined;

},{}],24:[function(_dereq_,module,exports){
/**
 * @file List of ECMAScript white space characters.
 * @version 3.0.0
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module white-space-x
 */

'use strict';

/**
 * A record of a white space character.
 *
 * @typedef {Object} CharRecord
 * @property {number} code - The character code.
 * @property {string} description - A description of the character.
 * @property {boolean} es5 - Whether the spec lists this as a white space.
 * @property {boolean} es2015 - Whether the spec lists this as a white space.
 * @property {boolean} es2016 - Whether the spec lists this as a white space.
 * @property {boolean} es2017 - Whether the spec lists this as a white space.
 * @property {boolean} es2018 - Whether the spec lists this as a white space.
 * @property {string} string - The character string.
 */

/**
 * An array of the whitespace char codes, string, descriptions and language
 * presence in the specifications.
 *
 * @private
 * @type Array.<CharRecord>
 */
var list = [
  {
    code: 0x0009,
    description: 'Tab',
    es5: true,
    es2015: true,
    es2016: true,
    es2017: true,
    es2018: true,
    string: '\u0009'
  },
  {
    code: 0x000a,
    description: 'Line Feed',
    es5: true,
    es2015: true,
    es2016: true,
    es2017: true,
    es2018: true,
    string: '\u000a'
  },
  {
    code: 0x000b,
    description: 'Vertical Tab',
    es5: true,
    es2015: true,
    es2016: true,
    es2017: true,
    es2018: true,
    string: '\u000b'
  },
  {
    code: 0x000c,
    description: 'Form Feed',
    es5: true,
    es2015: true,
    es2016: true,
    es2017: true,
    es2018: true,
    string: '\u000c'
  },
  {
    code: 0x000d,
    description: 'Carriage Return',
    es5: true,
    es2015: true,
    es2016: true,
    es2017: true,
    es2018: true,
    string: '\u000d'
  },
  {
    code: 0x0020,
    description: 'Space',
    es5: true,
    es2015: true,
    es2016: true,
    es2017: true,
    es2018: true,
    string: '\u0020'
  },
  /*
  {
    code: 0x0085,
    description: 'Next line',
    es5: false,
    es2015: false,
    es2016: false,
    es2017: false,
    es2018: false,
    string: '\u0085'
  }
  */
  {
    code: 0x00a0,
    description: 'No-break space',
    es5: true,
    es2015: true,
    es2016: true,
    es2017: true,
    es2018: true,
    string: '\u00a0'
  },
  {
    code: 0x1680,
    description: 'Ogham space mark',
    es5: true,
    es2015: true,
    es2016: true,
    es2017: true,
    es2018: true,
    string: '\u1680'
  },
  {
    code: 0x180e,
    description: 'Mongolian vowel separator',
    es5: true,
    es2015: true,
    es2016: true,
    es2017: false,
    es2018: false,
    string: '\u180e'
  },
  {
    code: 0x2000,
    description: 'En quad',
    es5: true,
    es2015: true,
    es2016: true,
    es2017: true,
    es2018: true,
    string: '\u2000'
  },
  {
    code: 0x2001,
    description: 'Em quad',
    es5: true,
    es2015: true,
    es2016: true,
    es2017: true,
    es2018: true,
    string: '\u2001'
  },
  {
    code: 0x2002,
    description: 'En space',
    es5: true,
    es2015: true,
    es2016: true,
    es2017: true,
    es2018: true,
    string: '\u2002'
  },
  {
    code: 0x2003,
    description: 'Em space',
    es5: true,
    es2015: true,
    es2016: true,
    es2017: true,
    es2018: true,
    string: '\u2003'
  },
  {
    code: 0x2004,
    description: 'Three-per-em space',
    es5: true,
    es2015: true,
    es2016: true,
    es2017: true,
    es2018: true,
    string: '\u2004'
  },
  {
    code: 0x2005,
    description: 'Four-per-em space',
    es5: true,
    es2015: true,
    es2016: true,
    es2017: true,
    es2018: true,
    string: '\u2005'
  },
  {
    code: 0x2006,
    description: 'Six-per-em space',
    es5: true,
    es2015: true,
    es2016: true,
    es2017: true,
    es2018: true,
    string: '\u2006'
  },
  {
    code: 0x2007,
    description: 'Figure space',
    es5: true,
    es2015: true,
    es2016: true,
    es2017: true,
    es2018: true,
    string: '\u2007'
  },
  {
    code: 0x2008,
    description: 'Punctuation space',
    es5: true,
    es2015: true,
    es2016: true,
    es2017: true,
    es2018: true,
    string: '\u2008'
  },
  {
    code: 0x2009,
    description: 'Thin space',
    es5: true,
    es2015: true,
    es2016: true,
    es2017: true,
    es2018: true,
    string: '\u2009'
  },
  {
    code: 0x200a,
    description: 'Hair space',
    es5: true,
    es2015: true,
    es2016: true,
    es2017: true,
    es2018: true,
    string: '\u200a'
  },
  /*
  {
    code: 0x200b,
    description: 'Zero width space',
    es5: false,
    es2015: false,
    es2016: false,
    es2017: false,
    es2018: false,
    string: '\u200b'
  },
  */
  {
    code: 0x2028,
    description: 'Line separator',
    es5: true,
    es2015: true,
    es2016: true,
    es2017: true,
    es2018: true,
    string: '\u2028'
  },
  {
    code: 0x2029,
    description: 'Paragraph separator',
    es5: true,
    es2015: true,
    es2016: true,
    es2017: true,
    es2018: true,
    string: '\u2029'
  },
  {
    code: 0x202f,
    description: 'Narrow no-break space',
    es5: true,
    es2015: true,
    es2016: true,
    es2017: true,
    es2018: true,
    string: '\u202f'
  },
  {
    code: 0x205f,
    description: 'Medium mathematical space',
    es5: true,
    es2015: true,
    es2016: true,
    es2017: true,
    es2018: true,
    string: '\u205f'
  },
  {
    code: 0x3000,
    description: 'Ideographic space',
    es5: true,
    es2015: true,
    es2016: true,
    es2017: true,
    es2018: true,
    string: '\u3000'
  },
  {
    code: 0xfeff,
    description: 'Byte Order Mark',
    es5: true,
    es2015: true,
    es2016: true,
    es2017: true,
    es2018: true,
    string: '\ufeff'
  }
];

var stringES2016 = '';
var stringES2018 = '';
var length = list.length;
for (var i = 0; i < length; i += 1) {
  if (list[i].es2016) {
    stringES2016 += list[i].string;
  }

  if (list[i].es2018) {
    stringES2018 += list[i].string;
  }
}

module.exports = {
  /**
   * An array of the whitespace char codes, string, descriptions and language
   * presence in the specifications.
   *
   * @type Array.<CharRecord>
   * @example
   * var whiteSpace = require('white-space-x');
   * whiteSpaces.list.foreach(function (item) {
   *   console.log(lib.description, item.code, item.string);
   * });
   */
  list: list,
  /**
   * A string of the ES2017 to ES2018 whitespace characters.
   *
   * @type string
   */
  string: stringES2018,

  /**
   * A string of the ES5 to ES2016 whitespace characters.
   *
   * @type string
   */
  string5: stringES2016,

  /**
   * A string of the ES5 to ES2016 whitespace characters.
   *
   * @type string
   */
  string2015: stringES2016,

  /**
   * A string of the ES5 to ES2016 whitespace characters.
   *
   * @type string
   * @example
   * var whiteSpace = require('white-space-x');
   * var characters = [
   *   '\u0009',
   *   '\u000a',
   *   '\u000b',
   *   '\u000c',
   *   '\u000d',
   *   '\u0020',
   *   '\u00a0',
   *   '\u1680',
   *   '\u180e',
   *   '\u2000',
   *   '\u2001',
   *   '\u2002',
   *   '\u2003',
   *   '\u2004',
   *   '\u2005',
   *   '\u2006',
   *   '\u2007',
   *   '\u2008',
   *   '\u2009',
   *   '\u200a',
   *   '\u2028',
   *   '\u2029',
   *   '\u202f',
   *   '\u205f',
   *   '\u3000',
   *   '\ufeff'
   * ];
   * var ws = characters.join('');
   * var re1 = new RegExp('^[' + whiteSpace.string2016 + ']+$)');
   * re1.test(ws); // true
   */
  string2016: stringES2016,

  /**
   * A string of the ES2017 to ES2018 whitespace characters.
   *
   * @type string
   */
  string2017: stringES2018,

  /**
   * A string of the ES2017 to ES2018 whitespace characters.
   *
   * @type string
   * @example
   * var whiteSpace = require('white-space-x');
   * var characters = [
   *   '\u0009',
   *   '\u000a',
   *   '\u000b',
   *   '\u000c',
   *   '\u000d',
   *   '\u0020',
   *   '\u00a0',
   *   '\u1680',
   *   '\u2000',
   *   '\u2001',
   *   '\u2002',
   *   '\u2003',
   *   '\u2004',
   *   '\u2005',
   *   '\u2006',
   *   '\u2007',
   *   '\u2008',
   *   '\u2009',
   *   '\u200a',
   *   '\u2028',
   *   '\u2029',
   *   '\u202f',
   *   '\u205f',
   *   '\u3000',
   *   '\ufeff'
   * ];
   * var ws = characters.join('');
   * var re1 = new RegExp('^[' + whiteSpace.string2018 + ']+$)');
   * re1.test(ws); // true
   */
  string2018: stringES2018
};

},{}]},{},[1])(1)
});