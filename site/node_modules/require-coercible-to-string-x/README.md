<a href="https://travis-ci.org/Xotic750/require-coercible-to-string-x"
   title="Travis status">
<img
   src="https://travis-ci.org/Xotic750/require-coercible-to-string-x.svg?branch=master"
   alt="Travis status" height="18"/>
</a>
<a href="https://david-dm.org/Xotic750/require-coercible-to-string-x"
   title="Dependency status">
<img src="https://david-dm.org/Xotic750/require-coercible-to-string-x.svg"
   alt="Dependency status" height="18"/>
</a>
<a href="https://david-dm.org/Xotic750/require-coercible-to-string-x#info=devDependencies"
   title="devDependency status">
<img src="https://david-dm.org/Xotic750/require-coercible-to-string-x/dev-status.svg"
   alt="devDependency status" height="18"/>
</a>
<a href="https://badge.fury.io/js/require-coercible-to-string-x" title="npm version">
<img src="https://badge.fury.io/js/require-coercible-to-string-x.svg"
   alt="npm version" height="18"/>
</a>
<a name="module_require-coercible-to-string-x"></a>

## require-coercible-to-string-x
Requires an argument is corecible then converts using ToString.

**Version**: 1.0.2  
**Author**: Xotic750 <Xotic750@gmail.com>  
**License**: [MIT](&lt;https://opensource.org/licenses/MIT&gt;)  
**Copyright**: Xotic750  
<a name="exp_module_require-coercible-to-string-x--module.exports"></a>

### `module.exports(value)` ⇒ <code>string</code> ⏏
This method requires an argument is corecible then converts using ToString.

**Kind**: Exported function  
**Returns**: <code>string</code> - The value as a string.  
**Throws**:

- <code>TypeError</code> If value is null or undefined.


| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | The value to converted to a string. |

**Example**  
```js
var requireCoercibleToString = require('require-coercible-to-string-x');

requireCoercibleToString(); // TypeError
requireCoercibleToString(null); // TypeError
requireCoercibleToString(Symbol('')); // TypeError
requireCoercibleToString(Object.create(null)); // TypeError
requireCoercibleToString(1); // '1'
requireCoercibleToString(true); // 'true'
```
