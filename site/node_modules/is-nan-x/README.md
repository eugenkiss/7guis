<a href="https://travis-ci.org/Xotic750/is-nan-x"
   title="Travis status">
<img
   src="https://travis-ci.org/Xotic750/is-nan-x.svg?branch=master"
   alt="Travis status" height="18"/>
</a>
<a href="https://david-dm.org/Xotic750/is-nan-x"
   title="Dependency status">
<img src="https://david-dm.org/Xotic750/is-nan-x.svg"
   alt="Dependency status" height="18"/>
</a>
<a href="https://david-dm.org/Xotic750/is-nan-x#info=devDependencies"
   title="devDependency status">
<img src="https://david-dm.org/Xotic750/is-nan-x/dev-status.svg"
   alt="devDependency status" height="18"/>
</a>
<a href="https://badge.fury.io/js/is-nan-x" title="npm version">
<img src="https://badge.fury.io/js/is-nan-x.svg"
   alt="npm version" height="18"/>
</a>
<a name="module_is-nan-x"></a>

## is-nan-x
ES6-compliant shim for Number.isNaN - the global isNaN returns false positives.

**Version**: 1.0.3  
**Author**: Xotic750 <Xotic750@gmail.com>  
**License**: [MIT](&lt;https://opensource.org/licenses/MIT&gt;)  
**Copyright**: Xotic750  
<a name="exp_module_is-nan-x--module.exports"></a>

### `module.exports(value)` ⇒ <code>boolean</code> ⏏
This method determines whether the passed value is NaN and its type is
`Number`. It is a more robust version of the original, global isNaN().

**Kind**: Exported function  
**Returns**: <code>boolean</code> - `true` if the given value is NaN and its type is Number;
 otherwise, `false`.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | The value to be tested for NaN. |

**Example**  
```js
var numberIsNaN = require('is-nan-x');

numberIsNaN(NaN);        // true
numberIsNaN(Number.NaN); // true
numberIsNaN(0 / 0);      // true

// e.g. these would have been true with global isNaN()
numberIsNaN('NaN');      // false
numberIsNaN(undefined);  // false
numberIsNaN({});         // false
numberIsNaN('blabla');   // false

// These all return false
numberIsNaN(true);
numberIsNaN(null);
numberIsNaN(37);
numberIsNaN('37');
numberIsNaN('37.37');
numberIsNaN('');
numberIsNaN(' ');
```
