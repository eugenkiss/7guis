<a href="https://travis-ci.org/Xotic750/is-function-x"
   title="Travis status">
<img
   src="https://travis-ci.org/Xotic750/is-function-x.svg?branch=master"
   alt="Travis status" height="18"/>
</a>
<a href="https://david-dm.org/Xotic750/is-function-x"
   title="Dependency status">
<img src="https://david-dm.org/Xotic750/is-function-x.svg"
   alt="Dependency status" height="18"/>
</a>
<a href="https://david-dm.org/Xotic750/is-function-x#info=devDependencies"
   title="devDependency status">
<img src="https://david-dm.org/Xotic750/is-function-x/dev-status.svg"
   alt="devDependency status" height="18"/>
</a>
<a href="https://badge.fury.io/js/is-function-x" title="npm version">
<img src="https://badge.fury.io/js/is-function-x.svg"
   alt="npm version" height="18"/>
</a>
<a name="module_is-function-x"></a>

## is-function-x
Determine whether a given value is a function object.

**Version**: 3.3.0  
**Author**: Xotic750 <Xotic750@gmail.com>  
**License**: [MIT](&lt;https://opensource.org/licenses/MIT&gt;)  
**Copyright**: Xotic750  
<a name="exp_module_is-function-x--module.exports"></a>

### `module.exports(value, [allowClass])` ⇒ <code>boolean</code> ⏏
Checks if `value` is classified as a `Function` object.

**Kind**: Exported function  
**Returns**: <code>boolean</code> - Returns `true` if `value` is correctly classified,
else `false`.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| value | <code>\*</code> |  | The value to check. |
| [allowClass] | <code>boolean</code> | <code>false</code> | Whether to filter ES6 classes. |

**Example**  
```js
var isFunction = require('is-function-x');

isFunction(); // false
isFunction(Number.MIN_VALUE); // false
isFunction('abc'); // false
isFunction(true); // false
isFunction({ name: 'abc' }); // false
isFunction(function () {}); // true
isFunction(new Function ()); // true
isFunction(function* test1() {}); // true
isFunction(function test2(a, b) {}); // true
isFunction(async function test3() {}); // true
isFunction(class Test {}); // false
isFunction(class Test {}, true); // true
isFunction((x, y) => {return this;}); // true
```
