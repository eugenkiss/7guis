<a href="https://travis-ci.org/Xotic750/to-integer-x"
   title="Travis status">
<img
   src="https://travis-ci.org/Xotic750/to-integer-x.svg?branch=master"
   alt="Travis status" height="18"/>
</a>
<a href="https://david-dm.org/Xotic750/to-integer-x"
   title="Dependency status">
<img src="https://david-dm.org/Xotic750/to-integer-x.svg"
   alt="Dependency status" height="18"/>
</a>
<a href="https://david-dm.org/Xotic750/to-integer-x#info=devDependencies"
   title="devDependency status">
<img src="https://david-dm.org/Xotic750/to-integer-x/dev-status.svg"
   alt="devDependency status" height="18"/>
</a>
<a href="https://badge.fury.io/js/to-integer-x" title="npm version">
<img src="https://badge.fury.io/js/to-integer-x.svg"
   alt="npm version" height="18"/>
</a>
<a name="module_to-integer-x"></a>

## to-integer-x
ToInteger converts 'argument' to an integral numeric value.

**See**: [7.1.4 ToInteger ( argument )](http://www.ecma-international.org/ecma-262/6.0/#sec-tointeger)  
**Version**: 3.0.0  
**Author**: Xotic750 <Xotic750@gmail.com>  
**License**: [MIT](&lt;https://opensource.org/licenses/MIT&gt;)  
**Copyright**: Xotic750  

* [to-integer-x](#module_to-integer-x)
    * [`.toInteger`](#module_to-integer-x.toInteger)
    * [`.toInteger2016`](#module_to-integer-x.toInteger2016) ⇒ <code>number</code>
    * [`.toInteger2018`](#module_to-integer-x.toInteger2018) ⇒ <code>number</code>

<a name="module_to-integer-x.toInteger"></a>

### `to-integer-x.toInteger`
Reference to toInteger2018.

**Kind**: static property of [<code>to-integer-x</code>](#module_to-integer-x)  
<a name="module_to-integer-x.toInteger2016"></a>

### `to-integer-x.toInteger2016` ⇒ <code>number</code>
Converts `value` to an integer. (ES2016)

**Kind**: static property of [<code>to-integer-x</code>](#module_to-integer-x)  
**Returns**: <code>number</code> - Returns the converted integer.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | The value to convert. |

**Example**  
```js
var toInteger = require('to-integer-x').toInteger2016;
toInteger(3); // 3
toInteger(Number.MIN_VALUE); // 0
toInteger(Infinity); // 1.7976931348623157e+308
toInteger('3'); // 3
```
<a name="module_to-integer-x.toInteger2018"></a>

### `to-integer-x.toInteger2018` ⇒ <code>number</code>
Converts `value` to an integer. (ES2018)

**Kind**: static property of [<code>to-integer-x</code>](#module_to-integer-x)  
**Returns**: <code>number</code> - Returns the converted integer.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | The value to convert. |

**Example**  
```js
var toInteger = require('to-integer-x').toInteger2018;
toInteger(3); // 3
toInteger(Number.MIN_VALUE); // 0
toInteger(Infinity); // 1.7976931348623157e+308
toInteger('3'); // 3
```
