<a href="https://travis-ci.org/Xotic750/to-boolean-x"
   title="Travis status">
<img
   src="https://travis-ci.org/Xotic750/to-boolean-x.svg?branch=master"
   alt="Travis status" height="18"/>
</a>
<a href="https://david-dm.org/Xotic750/to-boolean-x"
   title="Dependency status">
<img src="https://david-dm.org/Xotic750/to-boolean-x.svg"
   alt="Dependency status" height="18"/>
</a>
<a href="https://david-dm.org/Xotic750/to-boolean-x#info=devDependencies"
   title="devDependency status">
<img src="https://david-dm.org/Xotic750/to-boolean-x/dev-status.svg"
   alt="devDependency status" height="18"/>
</a>
<a href="https://badge.fury.io/js/to-boolean-x" title="npm version">
<img src="https://badge.fury.io/js/to-boolean-x.svg"
   alt="npm version" height="18"/>
</a>
<a name="module_to-boolean-x"></a>

## to-boolean-x
Converts argument to a value of type Boolean.

**Version**: 1.0.3  
**Author**: Xotic750 <Xotic750@gmail.com>  
**License**: [MIT](&lt;https://opensource.org/licenses/MIT&gt;)  
**Copyright**: Xotic750  
<a name="exp_module_to-boolean-x--module.exports"></a>

### `module.exports(value)` ⇒ <code>boolean</code> ⏏
The abstract operation ToBoolean converts argument to a value of type Boolean.

**Kind**: Exported function  
**Returns**: <code>boolean</code> - 'true' if value is truthy; otherwise 'false'.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | The value to be converted. |

**Example**  
```js
var toBoolean = require('to-boolean-x');

toBoolean(null); // false
toBoolean(''); // false
toBoolean(1); // true
toBoolean('0'); // true
```
