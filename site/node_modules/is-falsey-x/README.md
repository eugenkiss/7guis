<a href="https://travis-ci.org/Xotic750/is-falsey-x"
   title="Travis status">
<img
   src="https://travis-ci.org/Xotic750/is-falsey-x.svg?branch=master"
   alt="Travis status" height="18"/>
</a>
<a href="https://david-dm.org/Xotic750/is-falsey-x"
   title="Dependency status">
<img src="https://david-dm.org/Xotic750/is-falsey-x.svg"
   alt="Dependency status" height="18"/>
</a>
<a href="https://david-dm.org/Xotic750/is-falsey-x#info=devDependencies"
   title="devDependency status">
<img src="https://david-dm.org/Xotic750/is-falsey-x/dev-status.svg"
   alt="devDependency status" height="18"/>
</a>
<a href="https://badge.fury.io/js/is-falsey-x" title="npm version">
<img src="https://badge.fury.io/js/is-falsey-x.svg"
   alt="npm version" height="18"/>
</a>
<a name="module_is-falsey-x"></a>

## is-falsey-x
Test if a given value is falsey.

**Version**: 1.0.3  
**Author**: Xotic750 <Xotic750@gmail.com>  
**License**: [MIT](&lt;https://opensource.org/licenses/MIT&gt;)  
**Copyright**: Xotic750  
<a name="exp_module_is-falsey-x--module.exports"></a>

### `module.exports(value)` ⇒ <code>boolean</code> ⏏
This method tests if a given value is falsey.

**Kind**: Exported function  
**Returns**: <code>boolean</code> - `true` if the value is falsey: otherwise `false`.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | The value to test. |

**Example**  
```js
var isFalsey = require('is-falsey-x');

isFalsey(); // true
isFalsey(0); // true
isFalsey(''); // true
isFalsey(false); // true
isFalsey(null); // true

isFalsey(true); // false
isFalsey([]); // false
isFalsey(1); // false
isFalsey(function () {}); // false
```
