/**
 * @file Detect whether or not an object is an ArrayBuffer.
 * @version 1.7.0
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module is-array-buffer-x
 */

/* global ArrayBuffer */

'use strict';

var attempt = require('attempt-x');
var isObjectLike = require('is-object-like-x');
var hasABuf = typeof ArrayBuffer === 'function';
var bLength = false;
var toStringTag;
var aBufTag;

if (hasABuf) {
  if (require('has-to-string-tag-x')) {
    var getOwnPropertyDescriptor = require('object-get-own-property-descriptor-x');
    var descriptor = getOwnPropertyDescriptor(ArrayBuffer.prototype, 'byteLength');
    if (descriptor && typeof descriptor.get === 'function') {
      var res = attempt(function () {
        return new ArrayBuffer(4);
      });

      if (res.threw === false && isObjectLike(res.value)) {
        res = attempt.call(res.value, descriptor.get);
        bLength = res.threw === false && typeof res.value === 'number' && descriptor.get;
      }
    }
  }

  if (bLength === false) {
    toStringTag = require('to-string-tag-x');
    aBufTag = '[object ArrayBuffer]';
  }
}

/**
 * Determine if an `object` is an `ArrayBuffer`.
 *
 * @param {*} object - The object to test.
 * @returns {boolean} `true` if the `object` is an `ArrayBuffer`,
 *  else false`.
 * @example
 * var isArrayBuffer = require('is-array-buffer-x');
 *
 * isArrayBuffer(new ArrayBuffer(4)); // true
 * isArrayBuffer(null); // false
 * isArrayBuffer([]); // false
 */
module.exports = function isArrayBuffer(object) {
  if (hasABuf === false || isObjectLike(object) === false) {
    return false;
  }

  if (bLength === false) {
    return toStringTag(object) === aBufTag;
  }

  var result = attempt.call(object, bLength);
  return result.threw === false && typeof result.value === 'number';
};
