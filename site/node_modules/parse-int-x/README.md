<a href="https://travis-ci.org/Xotic750/parse-int-x"
   title="Travis status">
<img
   src="https://travis-ci.org/Xotic750/parse-int-x.svg?branch=master"
   alt="Travis status" height="18"/>
</a>
<a href="https://david-dm.org/Xotic750/parse-int-x"
   title="Dependency status">
<img src="https://david-dm.org/Xotic750/parse-int-x.svg"
   alt="Dependency status" height="18"/>
</a>
<a href="https://david-dm.org/Xotic750/parse-int-x#info=devDependencies"
   title="devDependency status">
<img src="https://david-dm.org/Xotic750/parse-int-x/dev-status.svg"
   alt="devDependency status" height="18"/>
</a>
<a href="https://badge.fury.io/js/parse-int-x" title="npm version">
<img src="https://badge.fury.io/js/parse-int-x.svg"
   alt="npm version" height="18"/>
</a>
<a name="module_parse-int-x"></a>

## parse-int-x
Parses a string argument and returns an integer of the specified radix.

**Version**: 2.0.0  
**Author**: Xotic750 <Xotic750@gmail.com>  
**License**: [MIT](&lt;https://opensource.org/licenses/MIT&gt;)  
**Copyright**: Xotic750  

* [parse-int-x](#module_parse-int-x)
    * [`.parseInt`](#module_parse-int-x.parseInt)
    * [`.parseInt2016`](#module_parse-int-x.parseInt2016) ⇒ <code>number</code>
    * [`.parseInt2018`](#module_parse-int-x.parseInt2018) ⇒ <code>number</code>

<a name="module_parse-int-x.parseInt"></a>

### `parse-int-x.parseInt`
Reference to parseInt2018.

**Kind**: static property of [<code>parse-int-x</code>](#module_parse-int-x)  
<a name="module_parse-int-x.parseInt2016"></a>

### `parse-int-x.parseInt2016` ⇒ <code>number</code>
This method parses a string argument and returns an integer of the specified
radix (the base in mathematical numeral systems). (ES2016)

**Kind**: static property of [<code>parse-int-x</code>](#module_parse-int-x)  
**Returns**: <code>number</code> - An integer number parsed from the given string. If the first
 character cannot be converted to a number, NaN is returned.  
**Throws**:

- <code>TypeError</code> If target is a Symbol or is not coercible.


| Param | Type | Description |
| --- | --- | --- |
| string | <code>string</code> | The value to parse. If the string argument is not a  string, then it is converted to a string (using the ToString abstract  operation). Leading whitespace in the string argument is ignored. |
| radix | <code>number</code> | An integer between 2 and 36 that represents the radix  (the base in mathematical numeral systems) of the above mentioned string.  Specify 10 for the decimal numeral system commonly used by humans. Always  specify this parameter to eliminate reader confusion and to guarantee  predictable behavior. Different implementations produce different results  when a radix is not specified, usually defaulting the value to 10. |

**Example**  
```js
var $parseInt = require('parse-int-x').parseInt2016;

// The following examples all return 15
$parseInt(' 0xF', 16);
$parseInt(' F', 16);
$parseInt('17', 8);
$parseInt(021, 8);
$parseInt('015', 10);   // $parseInt(015, 10); will return 15
$parseInt(15.99, 10);
$parseInt('15,123', 10);
$parseInt('FXX123', 16);
$parseInt('1111', 2);
$parseInt('15 * 3', 10);
$parseInt('15e2', 10);
$parseInt('15px', 10);
$parseInt('12', 13);

//The following examples all return NaN:
$parseInt('Hello', 8); // Not a number at all
$parseInt('546', 2);   // Digits are not valid for binary representations
```
<a name="module_parse-int-x.parseInt2018"></a>

### `parse-int-x.parseInt2018` ⇒ <code>number</code>
This method parses a string argument and returns an integer of the specified
radix (the base in mathematical numeral systems). (ES2018)

**Kind**: static property of [<code>parse-int-x</code>](#module_parse-int-x)  
**Returns**: <code>number</code> - An integer number parsed from the given string. If the first
 character cannot be converted to a number, NaN is returned.  
**Throws**:

- <code>TypeError</code> If target is a Symbol or is not coercible.


| Param | Type | Description |
| --- | --- | --- |
| string | <code>string</code> | The value to parse. If the string argument is not a  string, then it is converted to a string (using the ToString abstract  operation). Leading whitespace in the string argument is ignored. |
| radix | <code>number</code> | An integer between 2 and 36 that represents the radix  (the base in mathematical numeral systems) of the above mentioned string.  Specify 10 for the decimal numeral system commonly used by humans. Always  specify this parameter to eliminate reader confusion and to guarantee  predictable behavior. Different implementations produce different results  when a radix is not specified, usually defaulting the value to 10. |

**Example**  
```js
var $parseInt = require('parse-int-x').parseInt2018;

// The following examples all return 15
$parseInt(' 0xF', 16);
$parseInt(' F', 16);
$parseInt('17', 8);
$parseInt(021, 8);
$parseInt('015', 10);   // $parseInt(015, 10); will return 15
$parseInt(15.99, 10);
$parseInt('15,123', 10);
$parseInt('FXX123', 16);
$parseInt('1111', 2);
$parseInt('15 * 3', 10);
$parseInt('15e2', 10);
$parseInt('15px', 10);
$parseInt('12', 13);

//The following examples all return NaN:
$parseInt('Hello', 8); // Not a number at all
$parseInt('546', 2);   // Digits are not valid for binary representations
```
