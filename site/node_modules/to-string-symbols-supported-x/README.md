<a href="https://travis-ci.org/Xotic750/to-string-symbols-supported-x"
   title="Travis status">
<img
   src="https://travis-ci.org/Xotic750/to-string-symbols-supported-x.svg?branch=master"
   alt="Travis status" height="18"/>
</a>
<a href="https://david-dm.org/Xotic750/to-string-symbols-supported-x"
   title="Dependency status">
<img src="https://david-dm.org/Xotic750/to-string-symbols-supported-x.svg"
   alt="Dependency status" height="18"/>
</a>
<a href="https://david-dm.org/Xotic750/to-string-symbols-supported-x#info=devDependencies"
   title="devDependency status">
<img src="https://david-dm.org/Xotic750/to-string-symbols-supported-x/dev-status.svg"
   alt="devDependency status" height="18"/>
</a>
<a href="https://badge.fury.io/js/to-string-symbols-supported-x" title="npm version">
<img src="https://badge.fury.io/js/to-string-symbols-supported-x.svg"
   alt="npm version" height="18"/>
</a>
<a name="module_to-string-symbols-supported-x"></a>

## to-string-symbols-supported-x
ES6 abstract ToString with Symbol conversion support.

**See**: [7.1.12 ToString ( argument )](http://www.ecma-international.org/ecma-262/6.0/#sec-tostring)  
**Version**: 1.0.2  
**Author**: Xotic750 <Xotic750@gmail.com>  
**License**: [MIT](&lt;https://opensource.org/licenses/MIT&gt;)  
**Copyright**: Xotic750  
<a name="exp_module_to-string-symbols-supported-x--module.exports"></a>

### `module.exports(value)` ⇒ <code>string</code> ⏏
The abstract operation ToString converts argument to a value of type String,
however the specification states that if the argument is a Symbol then a
'TypeError' is thrown. This version also allows Symbols be converted to
a string. Other uncoercible exotics will still throw though.

**Kind**: Exported function  
**Returns**: <code>string</code> - The converted value.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | The value to convert to a string. |

**Example**  
```js
var toStringSymbolsSupported = require('to-string-symbols-supported-x');

toStringSymbolsSupported(); // 'undefined'
toStringSymbolsSupported(null); // 'null'
toStringSymbolsSupported('abc'); // 'abc'
toStringSymbolsSupported(true); // 'true'
toStringSymbolsSupported(Symbol('foo')); // 'Symbol('foo')'
toStringSymbolsSupported(Object(Symbol('foo'))); // 'Symbol('foo')'
toStringSymbolsSupported(Object.create(null)); // TypeError
```
