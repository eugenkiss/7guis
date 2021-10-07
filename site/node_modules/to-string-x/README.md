<a href="https://travis-ci.org/Xotic750/to-string-x"
   title="Travis status">
<img
   src="https://travis-ci.org/Xotic750/to-string-x.svg?branch=master"
   alt="Travis status" height="18"/>
</a>
<a href="https://david-dm.org/Xotic750/to-string-x"
   title="Dependency status">
<img src="https://david-dm.org/Xotic750/to-string-x.svg"
   alt="Dependency status" height="18"/>
</a>
<a href="https://david-dm.org/Xotic750/to-string-x#info=devDependencies"
   title="devDependency status">
<img src="https://david-dm.org/Xotic750/to-string-x/dev-status.svg"
   alt="devDependency status" height="18"/>
</a>
<a href="https://badge.fury.io/js/to-string-x" title="npm version">
<img src="https://badge.fury.io/js/to-string-x.svg"
   alt="npm version" height="18"/>
</a>
<a name="module_to-string-x"></a>

## to-string-x
ES6-compliant shim for ToString.

**See**: [7.1.12 ToString ( argument )](http://www.ecma-international.org/ecma-262/6.0/#sec-tostring)  
**Version**: 1.4.5  
**Author**: Xotic750 <Xotic750@gmail.com>  
**License**: [MIT](&lt;https://opensource.org/licenses/MIT&gt;)  
**Copyright**: Xotic750  
<a name="exp_module_to-string-x--module.exports"></a>

### `module.exports(value)` ⇒ <code>string</code> ⏏
The abstract operation ToString converts argument to a value of type String.

**Kind**: Exported function  
**Returns**: <code>string</code> - The converted value.  
**Throws**:

- <code>TypeError</code> If `value` is a Symbol.


| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | The value to convert to a string. |

**Example**  
```js
var $toString = require('to-string-x');

$toString(); // 'undefined'
$toString(null); // 'null'
$toString('abc'); // 'abc'
$toString(true); // 'true'
$toString(Symbol('foo')); // TypeError
$toString(Symbol.iterator); // TypeError
$toString(Object(Symbol.iterator)); // TypeError
$toString(Object.create(null)); // TypeError
```
