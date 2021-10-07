/**
 * @file ES6-compliant shim for Number.isNaN - the global isNaN returns false positives.
 * @version 1.0.3
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module is-nan-x
 */

'use strict';

/**
 * This method determines whether the passed value is NaN and its type is
 * `Number`. It is a more robust version of the original, global isNaN().
 *
 * @param {*} value - The value to be tested for NaN.
 * @returns {boolean} `true` if the given value is NaN and its type is Number;
 *  otherwise, `false`.
 * @example
 * var numberIsNaN = require('is-nan-x');
 *
 * numberIsNaN(NaN);        // true
 * numberIsNaN(Number.NaN); // true
 * numberIsNaN(0 / 0);      // true
 *
 * // e.g. these would have been true with global isNaN()
 * numberIsNaN('NaN');      // false
 * numberIsNaN(undefined);  // false
 * numberIsNaN({});         // false
 * numberIsNaN('blabla');   // false
 *
 * // These all return false
 * numberIsNaN(true);
 * numberIsNaN(null);
 * numberIsNaN(37);
 * numberIsNaN('37');
 * numberIsNaN('37.37');
 * numberIsNaN('');
 * numberIsNaN(' ');
 */
module.exports = function isNaN(value) {
  return value !== value;
};
