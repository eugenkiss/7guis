<a href="https://travis-ci.org/Xotic750/white-space-x"
   title="Travis status">
<img
   src="https://travis-ci.org/Xotic750/white-space-x.svg?branch=master"
   alt="Travis status" height="18"/>
</a>
<a href="https://david-dm.org/Xotic750/white-space-x"
   title="Dependency status">
<img src="https://david-dm.org/Xotic750/white-space-x.svg"
   alt="Dependency status" height="18"/>
</a>
<a href="https://david-dm.org/Xotic750/white-space-x#info=devDependencies"
   title="devDependency status">
<img src="https://david-dm.org/Xotic750/white-space-x/dev-status.svg"
   alt="devDependency status" height="18"/>
</a>
<a href="https://badge.fury.io/js/white-space-x" title="npm version">
<img src="https://badge.fury.io/js/white-space-x.svg"
   alt="npm version" height="18"/>
</a>
<a name="module_white-space-x"></a>

## white-space-x
List of ECMAScript white space characters.

**Version**: 3.0.1  
**Author**: Xotic750 <Xotic750@gmail.com>  
**License**: [MIT](&lt;https://opensource.org/licenses/MIT&gt;)  
**Copyright**: Xotic750  

* [white-space-x](#module_white-space-x)
    * _static_
        * [`.list`](#module_white-space-x.list) : <code>Array.&lt;CharRecord&gt;</code>
        * [`.string`](#module_white-space-x.string) : <code>string</code>
        * [`.string5`](#module_white-space-x.string5) : <code>string</code>
        * [`.string2015`](#module_white-space-x.string2015) : <code>string</code>
        * [`.string2016`](#module_white-space-x.string2016) : <code>string</code>
        * [`.string2017`](#module_white-space-x.string2017) : <code>string</code>
        * [`.string2018`](#module_white-space-x.string2018) : <code>string</code>
    * _inner_
        * [`~CharRecord`](#module_white-space-x..CharRecord) : <code>Object</code>

<a name="module_white-space-x.list"></a>

### `white-space-x.list` : <code>Array.&lt;CharRecord&gt;</code>
An array of the whitespace char codes, string, descriptions and language
presence in the specifications.

**Kind**: static property of [<code>white-space-x</code>](#module_white-space-x)  
**Example**  
```js
var whiteSpace = require('white-space-x');
whiteSpaces.list.foreach(function (item) {
  console.log(lib.description, item.code, item.string);
});
```
<a name="module_white-space-x.string"></a>

### `white-space-x.string` : <code>string</code>
A string of the ES2017 to ES2018 whitespace characters.

**Kind**: static property of [<code>white-space-x</code>](#module_white-space-x)  
<a name="module_white-space-x.string5"></a>

### `white-space-x.string5` : <code>string</code>
A string of the ES5 to ES2016 whitespace characters.

**Kind**: static property of [<code>white-space-x</code>](#module_white-space-x)  
<a name="module_white-space-x.string2015"></a>

### `white-space-x.string2015` : <code>string</code>
A string of the ES5 to ES2016 whitespace characters.

**Kind**: static property of [<code>white-space-x</code>](#module_white-space-x)  
<a name="module_white-space-x.string2016"></a>

### `white-space-x.string2016` : <code>string</code>
A string of the ES5 to ES2016 whitespace characters.

**Kind**: static property of [<code>white-space-x</code>](#module_white-space-x)  
**Example**  
```js
var whiteSpace = require('white-space-x');
var characters = [
  '\u0009',
  '\u000a',
  '\u000b',
  '\u000c',
  '\u000d',
  '\u0020',
  '\u00a0',
  '\u1680',
  '\u180e',
  '\u2000',
  '\u2001',
  '\u2002',
  '\u2003',
  '\u2004',
  '\u2005',
  '\u2006',
  '\u2007',
  '\u2008',
  '\u2009',
  '\u200a',
  '\u2028',
  '\u2029',
  '\u202f',
  '\u205f',
  '\u3000',
  '\ufeff'
];
var ws = characters.join('');
var re1 = new RegExp('^[' + whiteSpace.string2016 + ']+$)');
re1.test(ws); // true
```
<a name="module_white-space-x.string2017"></a>

### `white-space-x.string2017` : <code>string</code>
A string of the ES2017 to ES2018 whitespace characters.

**Kind**: static property of [<code>white-space-x</code>](#module_white-space-x)  
<a name="module_white-space-x.string2018"></a>

### `white-space-x.string2018` : <code>string</code>
A string of the ES2017 to ES2018 whitespace characters.

**Kind**: static property of [<code>white-space-x</code>](#module_white-space-x)  
**Example**  
```js
var whiteSpace = require('white-space-x');
var characters = [
  '\u0009',
  '\u000a',
  '\u000b',
  '\u000c',
  '\u000d',
  '\u0020',
  '\u00a0',
  '\u1680',
  '\u2000',
  '\u2001',
  '\u2002',
  '\u2003',
  '\u2004',
  '\u2005',
  '\u2006',
  '\u2007',
  '\u2008',
  '\u2009',
  '\u200a',
  '\u2028',
  '\u2029',
  '\u202f',
  '\u205f',
  '\u3000',
  '\ufeff'
];
var ws = characters.join('');
var re1 = new RegExp('^[' + whiteSpace.string2018 + ']+$)');
re1.test(ws); // true
```
<a name="module_white-space-x..CharRecord"></a>

### `white-space-x~CharRecord` : <code>Object</code>
A record of a white space character.

**Kind**: inner typedef of [<code>white-space-x</code>](#module_white-space-x)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| code | <code>number</code> | The character code. |
| description | <code>string</code> | A description of the character. |
| es5 | <code>boolean</code> | Whether the spec lists this as a white space. |
| es2015 | <code>boolean</code> | Whether the spec lists this as a white space. |
| es2016 | <code>boolean</code> | Whether the spec lists this as a white space. |
| es2017 | <code>boolean</code> | Whether the spec lists this as a white space. |
| es2018 | <code>boolean</code> | Whether the spec lists this as a white space. |
| string | <code>string</code> | The character string. |

