/**
 * @file Indicates whether the specified property is enumerable.
 * @version 1.1.0
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module property-is-enumerable-x
 */

'use strict';

var toPropertyKey = require('to-property-key-x');
var toObject = require('to-object-x');
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

/**
 * This method returns a Boolean indicating whether the specified property is
 * enumerable. Does not attempt to fix bugs in IE<9 or old Opera, otherwise it
 * does ES6ify the method.
 *
 * @param {!Object} object - The object on which to test the property.
 * @param {string|Symbol} property - The name of the property to test.
 * @throws {TypeError} If target is null or undefined.
 * @returns {boolean} A Boolean indicating whether the specified property is
 *  enumerable.
 * @example
 * var propertyIsEnumerable = require('property-is-enumerable-x');
 *
 * var o = {};
 * var a = [];
 * o.prop = 'is enumerable';
 * a[0] = 'is enumerable';
 *
 * propertyIsEnumerable(o, 'prop'); // true
 * propertyIsEnumerable(a, 0); // true
 */
module.exports = function propertyIsEnumerable(object, property) {
  return propIsEnumerable.call(toObject(object), toPropertyKey(property));
};
