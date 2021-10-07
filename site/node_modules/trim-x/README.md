<a href="https://travis-ci.org/Xotic750/trim-x"
   title="Travis status">
<img
   src="https://travis-ci.org/Xotic750/trim-x.svg?branch=master"
   alt="Travis status" height="18"/>
</a>
<a href="https://david-dm.org/Xotic750/trim-x"
   title="Dependency status">
<img src="https://david-dm.org/Xotic750/trim-x.svg"
   alt="Dependency status" height="18"/>
</a>
<a href="https://david-dm.org/Xotic750/trim-x#info=devDependencies"
   title="devDependency status">
<img src="https://david-dm.org/Xotic750/trim-x/dev-status.svg"
   alt="devDependency status" height="18"/>
</a>
<a href="https://badge.fury.io/js/trim-x" title="npm version">
<img src="https://badge.fury.io/js/trim-x.svg"
   alt="npm version" height="18"/>
</a>
<a name="module_trim-x"></a>

## trim-x
This method removes whitespace from the left and right end of a string.

**Version**: 3.0.0  
**Author**: Xotic750 <Xotic750@gmail.com>  
**License**: [MIT](&lt;https://opensource.org/licenses/MIT&gt;)  
**Copyright**: Xotic750  

* [trim-x](#module_trim-x)
    * [`.trim`](#module_trim-x.trim)
    * [`.trim2016`](#module_trim-x.trim2016) ⇒ <code>string</code>
    * [`.trim2018`](#module_trim-x.trim2018) ⇒ <code>string</code>

<a name="module_trim-x.trim"></a>

### `trim-x.trim`
A reference to trim2018.

**Kind**: static property of [<code>trim-x</code>](#module_trim-x)  
<a name="module_trim-x.trim2016"></a>

### `trim-x.trim2016` ⇒ <code>string</code>
This method removes whitespace from the left and right end of a string.
(ES2016)

**Kind**: static property of [<code>trim-x</code>](#module_trim-x)  
**Returns**: <code>string</code> - The trimmed string.  
**Throws**:

- <code>TypeError</code> If string is null or undefined or not coercible.


| Param | Type | Description |
| --- | --- | --- |
| string | <code>string</code> | The string to trim the whitespace from. |

**Example**  
```js
var trim = require('trim-x');

trim(' \t\na \t\n') === 'a'; // true
```
<a name="module_trim-x.trim2018"></a>

### `trim-x.trim2018` ⇒ <code>string</code>
This method removes whitespace from the left and right end of a string.
(ES2018)

**Kind**: static property of [<code>trim-x</code>](#module_trim-x)  
**Returns**: <code>string</code> - The trimmed string.  
**Throws**:

- <code>TypeError</code> If string is null or undefined or not coercible.


| Param | Type | Description |
| --- | --- | --- |
| string | <code>string</code> | The string to trim the whitespace from. |

**Example**  
```js
var trim = require('trim-x');

trim(' \t\na \t\n') === 'a'; // true
```
