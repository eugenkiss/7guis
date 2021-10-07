<a href="https://travis-ci.org/Xotic750/require-object-coercible-x"
   title="Travis status">
<img
   src="https://travis-ci.org/Xotic750/require-object-coercible-x.svg?branch=master"
   alt="Travis status" height="18"/>
</a>
<a href="https://david-dm.org/Xotic750/require-object-coercible-x"
   title="Dependency status">
<img src="https://david-dm.org/Xotic750/require-object-coercible-x.svg"
   alt="Dependency status" height="18"/>
</a>
<a href="https://david-dm.org/Xotic750/require-object-coercible-x#info=devDependencies"
   title="devDependency status">
<img src="https://david-dm.org/Xotic750/require-object-coercible-x/dev-status.svg"
   alt="devDependency status" height="18"/>
</a>
<a href="https://badge.fury.io/js/require-object-coercible-x" title="npm version">
<img src="https://badge.fury.io/js/require-object-coercible-x.svg"
   alt="npm version" height="18"/>
</a>
<a name="module_require-object-coercible-x"></a>

## require-object-coercible-x
ES6-compliant shim for RequireObjectCoercible.

**See**: [7.2.1 RequireObjectCoercible ( argument )](http://www.ecma-international.org/ecma-262/6.0/#sec-requireobjectcoercible)  
**Version**: 1.4.3  
**Author**: Xotic750 <Xotic750@gmail.com>  
**License**: [MIT](&lt;https://opensource.org/licenses/MIT&gt;)  
**Copyright**: Xotic750  
<a name="exp_module_require-object-coercible-x--module.exports"></a>

### `module.exports(value)` ⇒ <code>string</code> ⏏
The abstract operation RequireObjectCoercible throws an error if argument
is a value that cannot be converted to an Object using ToObject.

**Kind**: Exported function  
**Returns**: <code>string</code> - The `value`.  
**Throws**:

- <code>TypeError</code> If `value` is a `null` or `undefined`.


| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | The `value` to check. |

**Example**  
```js
var RequireObjectCoercible = require('require-object-coercible-x');

RequireObjectCoercible(); // TypeError
RequireObjectCoercible(null); // TypeError
RequireObjectCoercible('abc'); // 'abc'
RequireObjectCoercible(true); // true
RequireObjectCoercible(Symbol('foo')); // Symbol('foo')
```
