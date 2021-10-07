<a href="https://travis-ci.org/Xotic750/to-number-x"
   title="Travis status">
<img
   src="https://travis-ci.org/Xotic750/to-number-x.svg?branch=master"
   alt="Travis status" height="18"/>
</a>
<a href="https://david-dm.org/Xotic750/to-number-x"
   title="Dependency status">
<img src="https://david-dm.org/Xotic750/to-number-x.svg"
   alt="Dependency status" height="18"/>
</a>
<a href="https://david-dm.org/Xotic750/to-number-x#info=devDependencies"
   title="devDependency status">
<img src="https://david-dm.org/Xotic750/to-number-x/dev-status.svg"
   alt="devDependency status" height="18"/>
</a>
<a href="https://badge.fury.io/js/to-number-x" title="npm version">
<img src="https://badge.fury.io/js/to-number-x.svg"
   alt="npm version" height="18"/>
</a>
<a name="module_to-number-x"></a>

## to-number-x
Converts argument to a value of type Number.

**Version**: 2.0.0  
**Author**: Xotic750 <Xotic750@gmail.com>  
**License**: [MIT](&lt;https://opensource.org/licenses/MIT&gt;)  
**Copyright**: Xotic750  

* [to-number-x](#module_to-number-x)
    * [`.toNumber`](#module_to-number-x.toNumber)
    * [`.toNumber2016`](#module_to-number-x.toNumber2016) ⇒ <code>\*</code>
    * [`.toNumber2018`](#module_to-number-x.toNumber2018) ⇒ <code>\*</code>

<a name="module_to-number-x.toNumber"></a>

### `to-number-x.toNumber`
reference to toNumber2018.

**Kind**: static property of [<code>to-number-x</code>](#module_to-number-x)  
<a name="module_to-number-x.toNumber2016"></a>

### `to-number-x.toNumber2016` ⇒ <code>\*</code>
This method converts argument to a value of type Number. (ES2016)

**Kind**: static property of [<code>to-number-x</code>](#module_to-number-x)  
**Returns**: <code>\*</code> - The argument converted to a number.  
**Throws**:

- <code>TypeError</code> - If argument is a Symbol or not coercible.


| Param | Type | Description |
| --- | --- | --- |
| argument | <code>\*</code> | The argument to convert to a number. |

**Example**  
```js
var toNumber = require('to-number-x').toNumber2016;

toNumber('1'); // 1
toNumber(null); // 0
toNumber(true); // 1
toNumber('0o10'); // 8
toNumber('0b10'); // 2
toNumber('0xF'); // 16

toNumber(' 1 '); // 1

toNumber(Symbol('')) // TypeError
toNumber(Object.create(null)) // TypeError
```
<a name="module_to-number-x.toNumber2018"></a>

### `to-number-x.toNumber2018` ⇒ <code>\*</code>
This method converts argument to a value of type Number. (ES2018)

**Kind**: static property of [<code>to-number-x</code>](#module_to-number-x)  
**Returns**: <code>\*</code> - The argument converted to a number.  
**Throws**:

- <code>TypeError</code> - If argument is a Symbol or not coercible.


| Param | Type | Description |
| --- | --- | --- |
| argument | <code>\*</code> | The argument to convert to a number. |

**Example**  
```js
var toNumber = require('to-number-x').toNumber2018;

toNumber('1'); // 1
toNumber(null); // 0
toNumber(true); // 1
toNumber('0o10'); // 8
toNumber('0b10'); // 2
toNumber('0xF'); // 16

toNumber(' 1 '); // 1

toNumber(Symbol('')) // TypeError
toNumber(Object.create(null)) // TypeError
```
