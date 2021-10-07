<a href="https://travis-ci.org/Xotic750/is-index-x"
   title="Travis status">
<img
   src="https://travis-ci.org/Xotic750/is-index-x.svg?branch=master"
   alt="Travis status" height="18"/>
</a>
<a href="https://david-dm.org/Xotic750/is-index-x"
   title="Dependency status">
<img src="https://david-dm.org/Xotic750/is-index-x.svg"
   alt="Dependency status" height="18"/>
</a>
<a href="https://david-dm.org/Xotic750/is-index-x#info=devDependencies"
   title="devDependency status">
<img src="https://david-dm.org/Xotic750/is-index-x/dev-status.svg"
   alt="devDependency status" height="18"/>
</a>
<a href="https://badge.fury.io/js/is-index-x" title="npm version">
<img src="https://badge.fury.io/js/is-index-x.svg"
   alt="npm version" height="18"/>
</a>
<a name="module_is-index-x"></a>

## is-index-x
Determine whether the passed value is a zero based index.

**Version**: 1.1.0  
**Author**: Xotic750 <Xotic750@gmail.com>  
**License**: [MIT](&lt;https://opensource.org/licenses/MIT&gt;)  
**Copyright**: Xotic750  
<a name="exp_module_is-index-x--module.exports"></a>

### `module.exports(value, [length])` ⇒ <code>boolean</code> ⏏
This method determines whether the passed value is a zero based index.
JavaScript arrays are zero-indexed: the first element of an array is at
index 0, and the last element is at the index equal to the value of the
array's length property minus 1.

**Kind**: Exported function  
**Returns**: <code>boolean</code> - A Boolean indicating whether or not the given value is a
zero based index within bounds.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| value | <code>number</code> \| <code>string</code> |  | The value to be tested for being a zero based index. |
| [length] | <code>number</code> | <code>MAX_SAFE_INTEGER</code> | The length that sets the upper bound. |

**Example**  
```js
var isIndex = require('is-index-x');

isIndex(0);                    // true
isIndex(1);                    // true
isIndex('10');                 // true

isIndex(-100000);              // false
isIndex(Math.pow(2, 53));      // false
isIndex(0.1);                  // false
isIndex(Math.PI);              // false
isIndex(NaN);                  // false
isIndex(Infinity);             // false
isIndex(-Infinity);            // false
isIndex(true);                 // false
isIndex(false);                // false
isIndex([1]);                  // false
isIndex(10, 10);               // false
```
