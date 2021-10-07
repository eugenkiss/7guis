<a href="https://travis-ci.org/Xotic750/is-finite-x"
   title="Travis status">
<img
   src="https://travis-ci.org/Xotic750/is-finite-x.svg?branch=master"
   alt="Travis status" height="18"/>
</a>
<a href="https://david-dm.org/Xotic750/is-finite-x"
   title="Dependency status">
<img src="https://david-dm.org/Xotic750/is-finite-x.svg"
   alt="Dependency status" height="18"/>
</a>
<a href="https://david-dm.org/Xotic750/is-finite-x#info=devDependencies"
   title="devDependency status">
<img src="https://david-dm.org/Xotic750/is-finite-x/dev-status.svg"
   alt="devDependency status" height="18"/>
</a>
<a href="https://badge.fury.io/js/is-finite-x" title="npm version">
<img src="https://badge.fury.io/js/is-finite-x.svg"
   alt="npm version" height="18"/>
</a>
<a name="module_is-finite-x"></a>

## is-finite-x
ES6-compliant shim for Number.isFinite.

**See**: [20.1.2.2 Number.isFinite ( number )](http://www.ecma-international.org/ecma-262/6.0/#sec-number.isfinite)  
**Version**: 3.0.4  
**Author**: Xotic750 <Xotic750@gmail.com>  
**License**: [MIT](&lt;https://opensource.org/licenses/MIT&gt;)  
**Copyright**: Xotic750  
<a name="exp_module_is-finite-x--module.exports"></a>

### `module.exports(number)` ⇒ <code>boolean</code> ⏏
This method determines whether the passed value is a finite number.

**Kind**: Exported function  
**Returns**: <code>boolean</code> - A Boolean indicating whether or not the given value is a finite number.  

| Param | Type | Description |
| --- | --- | --- |
| number | <code>\*</code> | The value to be tested for finiteness. |

**Example**  
```js
var numIsFinite = require('is-finite-x');

numIsFinite(Infinity);  // false
numIsFinite(NaN);       // false
numIsFinite(-Infinity); // false

numIsFinite(0);         // true
numIsFinite(2e64);      // true

numIsFinite('0');       // false, would've been true with
                        // global isFinite('0')
numIsFinite(null);      // false, would've been true with
```
