<a href="https://travis-ci.org/Xotic750/math-clamp-x"
   title="Travis status">
<img
   src="https://travis-ci.org/Xotic750/math-clamp-x.svg?branch=master"
   alt="Travis status" height="18"/>
</a>
<a href="https://david-dm.org/Xotic750/math-clamp-x"
   title="Dependency status">
<img src="https://david-dm.org/Xotic750/math-clamp-x.svg"
   alt="Dependency status" height="18"/>
</a>
<a href="https://david-dm.org/Xotic750/math-clamp-x#info=devDependencies"
   title="devDependency status">
<img src="https://david-dm.org/Xotic750/math-clamp-x/dev-status.svg"
   alt="devDependency status" height="18"/>
</a>
<a href="https://badge.fury.io/js/math-clamp-x" title="npm version">
<img src="https://badge.fury.io/js/math-clamp-x.svg"
   alt="npm version" height="18"/>
</a>
<a name="module_math-clamp-x"></a>

## math-clamp-x
Clamp a number to limits.

**Version**: 1.2.0  
**Author**: Xotic750 <Xotic750@gmail.com>  
**License**: [MIT](&lt;https://opensource.org/licenses/MIT&gt;)  
**Copyright**: Xotic750  
<a name="exp_module_math-clamp-x--module.exports"></a>

### `module.exports(value, [min], max)` ⇒ <code>number</code> ⏏
This method clamp a number to min and max limits inclusive.

**Kind**: Exported function  
**Returns**: <code>number</code> - The clamped number.  
**Throws**:

- <code>RangeError</code> If min > max.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| value | <code>number</code> |  | The number to be clamped. |
| [min] | <code>number</code> | <code>0</code> | The minimum number. |
| max | <code>number</code> |  | The maximum number. |

**Example**  
```js
var mathClamp = require('math-clamp-x');
```
