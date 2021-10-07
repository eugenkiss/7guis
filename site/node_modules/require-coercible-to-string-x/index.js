/**
 * @file Requires an argument is corecible then converts using ToString.
 * @version 1.0.2
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module require-coercible-to-string-x
 */

'use strict';

var requireObjectCoercible = require('require-object-coercible-x');
var toStr = require('to-string-x');

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
