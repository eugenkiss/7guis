/**
 * @file ES6 abstract ToString with Symbol conversion support.
 * @see {@link http://www.ecma-international.org/ecma-262/6.0/#sec-tostring|7.1.12 ToString ( argument )}
 * @version 1.0.2
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module to-string-symbols-supported-x
 */

'use strict';

var castString = require('cached-constructors-x').String;
var pToString = require('has-symbol-support-x') && Symbol.prototype.toString;
var isSymbol = typeof pToString === 'function' && require('is-symbol');

/**
 * The abstract operation ToString converts argument to a value of type String,
 * however the specification states that if the argument is a Symbol then a
 * 'TypeError' is thrown. This version also allows Symbols be converted to
 * a string. Other uncoercible exotics will still throw though.
 *
 * @param {*} value - The value to convert to a string.
 * @returns {string} The converted value.
 * @example
 * var toStringSymbolsSupported = require('to-string-symbols-supported-x');
 *
 * toStringSymbolsSupported(); // 'undefined'
 * toStringSymbolsSupported(null); // 'null'
 * toStringSymbolsSupported('abc'); // 'abc'
 * toStringSymbolsSupported(true); // 'true'
 * toStringSymbolsSupported(Symbol('foo')); // 'Symbol('foo')'
 * toStringSymbolsSupported(Object(Symbol('foo'))); // 'Symbol('foo')'
 * toStringSymbolsSupported(Object.create(null)); // TypeError
 */
module.exports = function toStringSymbolsSupported(value) {
  return isSymbol && isSymbol(value) ? pToString.call(value) : castString(value);
};
