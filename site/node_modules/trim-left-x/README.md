<a href="https://travis-ci.org/Xotic750/trim-left-x"
   title="Travis status">
<img
   src="https://travis-ci.org/Xotic750/trim-left-x.svg?branch=master"
   alt="Travis status" height="18"/>
</a>
<a href="https://david-dm.org/Xotic750/trim-left-x"
   title="Dependency status">
<img src="https://david-dm.org/Xotic750/trim-left-x.svg"
   alt="Dependency status" height="18"/>
</a>
<a href="https://david-dm.org/Xotic750/trim-left-x#info=devDependencies"
   title="devDependency status">
<img src="https://david-dm.org/Xotic750/trim-left-x/dev-status.svg"
   alt="devDependency status" height="18"/>
</a>
<a href="https://badge.fury.io/js/trim-left-x" title="npm version">
<img src="https://badge.fury.io/js/trim-left-x.svg"
   alt="npm version" height="18"/>
</a>
<a name="module_trim-left-x"></a>

## trim-left-x
This method removes whitespace from the left end of a string.

**Version**: 3.0.0  
**Author**: Xotic750 <Xotic750@gmail.com>  
**License**: [MIT](&lt;https://opensource.org/licenses/MIT&gt;)  
**Copyright**: Xotic750  

* [trim-left-x](#module_trim-left-x)
    * [`.trimLeft`](#module_trim-left-x.trimLeft)
    * [`.trimLeft2016`](#module_trim-left-x.trimLeft2016) ⇒ <code>string</code>
    * [`.trimLeft2018`](#module_trim-left-x.trimLeft2018) ⇒ <code>string</code>

<a name="module_trim-left-x.trimLeft"></a>

### `trim-left-x.trimLeft`
A reference to leftTrim2018.

**Kind**: static property of [<code>trim-left-x</code>](#module_trim-left-x)  
<a name="module_trim-left-x.trimLeft2016"></a>

### `trim-left-x.trimLeft2016` ⇒ <code>string</code>
This method removes whitespace from the left end of a string. (ES2016)

**Kind**: static property of [<code>trim-left-x</code>](#module_trim-left-x)  
**Returns**: <code>string</code> - The left trimmed string.  
**Throws**:

- <code>TypeError</code> If string is null or undefined or not coercible.


| Param | Type | Description |
| --- | --- | --- |
| string | <code>string</code> | The string to trim the left end whitespace from. |

**Example**  
```js
var trimLeft = require('trim-left-x').trimLeft2016;

trimLeft(' \t\na \t\n') === 'a \t\n'; // true
```
<a name="module_trim-left-x.trimLeft2018"></a>

### `trim-left-x.trimLeft2018` ⇒ <code>string</code>
This method removes whitespace from the left end of a string. (ES2018)

**Kind**: static property of [<code>trim-left-x</code>](#module_trim-left-x)  
**Returns**: <code>string</code> - The left trimmed string.  
**Throws**:

- <code>TypeError</code> If string is null or undefined or not coercible.


| Param | Type | Description |
| --- | --- | --- |
| string | <code>string</code> | The string to trim the left end whitespace from. |

**Example**  
```js
var trimLeft = require('trim-left-x').trimLeft2018;

trimLeft(' \t\na \t\n') === 'a \t\n'; // true
```
