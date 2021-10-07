<a href="https://travis-ci.org/Xotic750/is-array-buffer-x"
   title="Travis status">
<img
   src="https://travis-ci.org/Xotic750/is-array-buffer-x.svg?branch=master"
   alt="Travis status" height="18"/>
</a>
<a href="https://david-dm.org/Xotic750/is-array-buffer-x"
   title="Dependency status">
<img src="https://david-dm.org/Xotic750/is-array-buffer-x.svg"
   alt="Dependency status" height="18"/>
</a>
<a href="https://david-dm.org/Xotic750/is-array-buffer-x#info=devDependencies"
   title="devDependency status">
<img src="https://david-dm.org/Xotic750/is-array-buffer-x/dev-status.svg"
   alt="devDependency status" height="18"/>
</a>
<a href="https://badge.fury.io/js/is-array-buffer-x" title="npm version">
<img src="https://badge.fury.io/js/is-array-buffer-x.svg"
   alt="npm version" height="18"/>
</a>
<a name="module_is-array-buffer-x"></a>

## is-array-buffer-x
Detect whether or not an object is an ArrayBuffer.

**Version**: 1.7.0  
**Author**: Xotic750 <Xotic750@gmail.com>  
**License**: [MIT](&lt;https://opensource.org/licenses/MIT&gt;)  
**Copyright**: Xotic750  
<a name="exp_module_is-array-buffer-x--module.exports"></a>

### `module.exports(object)` ⇒ <code>boolean</code> ⏏
Determine if an `object` is an `ArrayBuffer`.

**Kind**: Exported function  
**Returns**: <code>boolean</code> - `true` if the `object` is an `ArrayBuffer`,
 else false`.  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>\*</code> | The object to test. |

**Example**  
```js
var isArrayBuffer = require('is-array-buffer-x');

isArrayBuffer(new ArrayBuffer(4)); // true
isArrayBuffer(null); // false
isArrayBuffer([]); // false
```
