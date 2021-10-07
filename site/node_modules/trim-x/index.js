/**
 * @file This method removes whitespace from the left and right end of a string.
 * @version 3.0.0
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module trim-x
 */

'use strict';

var libTrimLeft = require('trim-left-x');
var trimLeft2016 = libTrimLeft.trimLeft2016;
var trimLeft2018 = libTrimLeft.trimLeft2018;
var libTrimRight = require('trim-right-x');
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
