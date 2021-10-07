/**
 * @file ToInteger converts 'argument' to an integral numeric value.
 * @see {@link http://www.ecma-international.org/ecma-262/6.0/#sec-tointeger|7.1.4 ToInteger ( argument )}
 * @version 3.0.0
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module to-integer-x
 */

'use strict';

var libToNumber = require('to-number-x');
var toNumber2016 = libToNumber.toNumber2016;
var toNumber2018 = libToNumber.toNumber2018;
var numberIsNaN = require('is-nan-x');
var numberIsFinite = require('is-finite-x');
var libMathSign = require('math-sign-x');
var mathSign2016 = libMathSign.sign2016;
var mathSign2018 = libMathSign.sign2018;
var mathFloor = Math.floor;
var mathAbs = Math.abs;

var $toInteger2016 = function toInteger2016(value) {
  var number = toNumber2016(value);
  if (numberIsNaN(number)) {
    return 0;
  }

  if (number === 0 || numberIsFinite(number) === false) {
    return number;
  }

  return mathSign2016(number) * mathFloor(mathAbs(number));
};

var $toInteger2018 = function toInteger2018(value) {
  var number = toNumber2018(value);
  if (numberIsNaN(number)) {
    return 0;
  }

  if (number === 0 || numberIsFinite(number) === false) {
    return number;
  }

  return mathSign2018(number) * mathFloor(mathAbs(number));
};

module.exports = {
  /**
   * Reference to toInteger2018.
   */
  toInteger: $toInteger2018,

  /**
   * Converts `value` to an integer. (ES2016)
   *
   * @param {*} value - The value to convert.
   * @returns {number} Returns the converted integer.
   *
   * @example
   * var toInteger = require('to-integer-x').toInteger2016;
   * toInteger(3); // 3
   * toInteger(Number.MIN_VALUE); // 0
   * toInteger(Infinity); // 1.7976931348623157e+308
   * toInteger('3'); // 3
   */
  toInteger2016: $toInteger2016,

  /**
   * Converts `value` to an integer. (ES2018)
   *
   * @param {*} value - The value to convert.
   * @returns {number} Returns the converted integer.
   *
   * @example
   * var toInteger = require('to-integer-x').toInteger2018;
   * toInteger(3); // 3
   * toInteger(Number.MIN_VALUE); // 0
   * toInteger(Infinity); // 1.7976931348623157e+308
   * toInteger('3'); // 3
   */
  toInteger2018: $toInteger2018
};
