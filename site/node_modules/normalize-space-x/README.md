<a href="https://travis-ci.org/Xotic750/normalize-space-x"
   title="Travis status">
<img
   src="https://travis-ci.org/Xotic750/normalize-space-x.svg?branch=master"
   alt="Travis status" height="18"/>
</a>
<a href="https://david-dm.org/Xotic750/normalize-space-x"
   title="Dependency status">
<img src="https://david-dm.org/Xotic750/normalize-space-x.svg"
   alt="Dependency status" height="18"/>
</a>
<a href="https://david-dm.org/Xotic750/normalize-space-x#info=devDependencies"
   title="devDependency status">
<img src="https://david-dm.org/Xotic750/normalize-space-x/dev-status.svg"
   alt="devDependency status" height="18"/>
</a>
<a href="https://badge.fury.io/js/normalize-space-x" title="npm version">
<img src="https://badge.fury.io/js/normalize-space-x.svg"
   alt="npm version" height="18"/>
</a>
<a name="module_normalize-space-x"></a>

## normalize-space-x
Trims and replaces sequences of whitespace characters by a single space.

**Version**: 3.0.0  
**Author**: Xotic750 <Xotic750@gmail.com>  
**License**: [MIT](&lt;https://opensource.org/licenses/MIT&gt;)  
**Copyright**: Xotic750  

* [normalize-space-x](#module_normalize-space-x)
    * [`.normalizeSpace`](#module_normalize-space-x.normalizeSpace)
    * [`.normalizeSpace2016`](#module_normalize-space-x.normalizeSpace2016) ⇒ <code>string</code>
    * [`.normalizeSpace2018`](#module_normalize-space-x.normalizeSpace2018) ⇒ <code>string</code>

<a name="module_normalize-space-x.normalizeSpace"></a>

### `normalize-space-x.normalizeSpace`
Reference to normalizeSpace2018.

**Kind**: static property of [<code>normalize-space-x</code>](#module_normalize-space-x)  
<a name="module_normalize-space-x.normalizeSpace2016"></a>

### `normalize-space-x.normalizeSpace2016` ⇒ <code>string</code>
This method strips leading and trailing white-space from a string,
replaces sequences of whitespace characters by a single space,
and returns the resulting string. (ES2016)

**Kind**: static property of [<code>normalize-space-x</code>](#module_normalize-space-x)  
**Returns**: <code>string</code> - The normalized string.  
**Throws**:

- <code>TypeError</code> If string is null or undefined or not coercible.


| Param | Type | Description |
| --- | --- | --- |
| string | <code>string</code> | The string to be normalized. |

**Example**  
```js
var normalizeSpace = require('normalize-space-x');

normalizeSpace(' \t\na \t\nb \t\n') === 'a b'; // true
```
<a name="module_normalize-space-x.normalizeSpace2018"></a>

### `normalize-space-x.normalizeSpace2018` ⇒ <code>string</code>
This method strips leading and trailing white-space from a string,
replaces sequences of whitespace characters by a single space,
and returns the resulting string. (ES2018)

**Kind**: static property of [<code>normalize-space-x</code>](#module_normalize-space-x)  
**Returns**: <code>string</code> - The normalized string.  
**Throws**:

- <code>TypeError</code> If string is null or undefined or not coercible.


| Param | Type | Description |
| --- | --- | --- |
| string | <code>string</code> | The string to be normalized. |

**Example**  
```js
var normalizeSpace = require('normalize-space-x');

normalizeSpace(' \t\na \t\nb \t\n') === 'a b'; // true
```
