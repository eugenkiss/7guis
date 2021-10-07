/**
 * @file Shim for Math.sign.
 * @see {@link http://www.ecma-international.org/ecma-262/6.0/#sec-math.sign|20.2.2.29 Math.sign(x)}
 * @version 3.0.0
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module math-sign-x
 */

'use strict';

var libToNumber = require('to-number-x');
var toNumber2016 = libToNumber.toNumber2016;
var toNumber2018 = libToNumber.toNumber2018;
var numberIsNaN = require('is-nan-x');

var $sign2016 = function sign2016(x) {
  var n = toNumber2016(x);
  if (n === 0 || numberIsNaN(n)) {
    return n;
  }

  return n > 0 ? 1 : -1;
};

var $sign2018 = function sign2018(x) {
  var n = toNumber2018(x);
  if (n === 0 || numberIsNaN(n)) {
    return n;
  }

  return n > 0 ? 1 : -1;
};

module.exports = {
  /**
   * Reference to sign2018.
   */
  sign: $sign2018,

  /**
   * This method returns the sign of a number, indicating whether the number is positive,
   * negative or zero. (ES2016)
   *
   * @param {*} x - A number.
   * @returns {number} A number representing the sign of the given argument. If the argument
   * is a positive number, negative number, positive zero or negative zero, the function will
   * return 1, -1, 0 or -0 respectively. Otherwise, NaN is returned.
   * @example
   * var mathSign = require('math-sign-x').sign2016;
   *
   * mathSign(3);     //  1
   * mathSign(-3);    // -1
   * mathSign('-3');  // -1
   * mathSign(0);     //  0
   * mathSign(-0);    // -0
   * mathSign(NaN);   // NaN
   * mathSign('foo'); // NaN
   * mathSign();      // NaN
   */
  sign2016: $sign2016,

  /**
   * This method returns the sign of a number, indicating whether the number is positive,
   * negative or zero. (ES2018)
   *
   * @param {*} x - A number.
   * @returns {number} A number representing the sign of the given argument. If the argument
   * is a positive number, negative number, positive zero or negative zero, the function will
   * return 1, -1, 0 or -0 respectively. Otherwise, NaN is returned.
   * @example
   * var mathSign = require('math-sign-x').sign2018;
   *
   * mathSign(3);     //  1
   * mathSign(-3);    // -1
   * mathSign('-3');  // -1
   * mathSign(0);     //  0
   * mathSign(-0);    // -0
   * mathSign(NaN);   // NaN
   * mathSign('foo'); // NaN
   * mathSign();      // NaN
   */
  sign2018: $sign2018
};
