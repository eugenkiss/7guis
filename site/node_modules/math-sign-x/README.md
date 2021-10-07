<a href="https://travis-ci.org/Xotic750/math-sign-x"
   title="Travis status">
<img
   src="https://travis-ci.org/Xotic750/math-sign-x.svg?branch=master"
   alt="Travis status" height="18"/>
</a>
<a href="https://david-dm.org/Xotic750/math-sign-x"
   title="Dependency status">
<img src="https://david-dm.org/Xotic750/math-sign-x.svg"
   alt="Dependency status" height="18"/>
</a>
<a href="https://david-dm.org/Xotic750/math-sign-x#info=devDependencies"
   title="devDependency status">
<img src="https://david-dm.org/Xotic750/math-sign-x/dev-status.svg"
   alt="devDependency status" height="18"/>
</a>
<a href="https://badge.fury.io/js/math-sign-x" title="npm version">
<img src="https://badge.fury.io/js/math-sign-x.svg"
   alt="npm version" height="18"/>
</a>
<a name="module_math-sign-x"></a>

## math-sign-x
Shim for Math.sign.

**See**: [20.2.2.29 Math.sign(x)](http://www.ecma-international.org/ecma-262/6.0/#sec-math.sign)  
**Version**: 3.0.0  
**Author**: Xotic750 <Xotic750@gmail.com>  
**License**: [MIT](&lt;https://opensource.org/licenses/MIT&gt;)  
**Copyright**: Xotic750  

* [math-sign-x](#module_math-sign-x)
    * [`.sign`](#module_math-sign-x.sign)
    * [`.sign2016`](#module_math-sign-x.sign2016) ⇒ <code>number</code>
    * [`.sign2018`](#module_math-sign-x.sign2018) ⇒ <code>number</code>

<a name="module_math-sign-x.sign"></a>

### `math-sign-x.sign`
Reference to sign2018.

**Kind**: static property of [<code>math-sign-x</code>](#module_math-sign-x)  
<a name="module_math-sign-x.sign2016"></a>

### `math-sign-x.sign2016` ⇒ <code>number</code>
This method returns the sign of a number, indicating whether the number is positive,
negative or zero. (ES2016)

**Kind**: static property of [<code>math-sign-x</code>](#module_math-sign-x)  
**Returns**: <code>number</code> - A number representing the sign of the given argument. If the argument
is a positive number, negative number, positive zero or negative zero, the function will
return 1, -1, 0 or -0 respectively. Otherwise, NaN is returned.  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>\*</code> | A number. |

**Example**  
```js
var mathSign = require('math-sign-x').sign2016;

mathSign(3);     //  1
mathSign(-3);    // -1
mathSign('-3');  // -1
mathSign(0);     //  0
mathSign(-0);    // -0
mathSign(NaN);   // NaN
mathSign('foo'); // NaN
mathSign();      // NaN
```
<a name="module_math-sign-x.sign2018"></a>

### `math-sign-x.sign2018` ⇒ <code>number</code>
This method returns the sign of a number, indicating whether the number is positive,
negative or zero. (ES2018)

**Kind**: static property of [<code>math-sign-x</code>](#module_math-sign-x)  
**Returns**: <code>number</code> - A number representing the sign of the given argument. If the argument
is a positive number, negative number, positive zero or negative zero, the function will
return 1, -1, 0 or -0 respectively. Otherwise, NaN is returned.  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>\*</code> | A number. |

**Example**  
```js
var mathSign = require('math-sign-x').sign2018;

mathSign(3);     //  1
mathSign(-3);    // -1
mathSign('-3');  // -1
mathSign(0);     //  0
mathSign(-0);    // -0
mathSign(NaN);   // NaN
mathSign('foo'); // NaN
mathSign();      // NaN
```
