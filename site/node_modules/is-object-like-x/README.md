<a href="https://travis-ci.org/Xotic750/is-object-like-x"
   title="Travis status">
<img
   src="https://travis-ci.org/Xotic750/is-object-like-x.svg?branch=master"
   alt="Travis status" height="18"/>
</a>
<a href="https://david-dm.org/Xotic750/is-object-like-x"
   title="Dependency status">
<img src="https://david-dm.org/Xotic750/is-object-like-x.svg"
   alt="Dependency status" height="18"/>
</a>
<a href="https://david-dm.org/Xotic750/is-object-like-x#info=devDependencies"
   title="devDependency status">
<img src="https://david-dm.org/Xotic750/is-object-like-x/dev-status.svg"
   alt="devDependency status" height="18"/>
</a>
<a href="https://badge.fury.io/js/is-object-like-x" title="npm version">
<img src="https://badge.fury.io/js/is-object-like-x.svg"
   alt="npm version" height="18"/>
</a>
<a name="module_is-object-like-x"></a>

## is-object-like-x
Determine if a value is object like.

**Version**: 1.7.1  
**Author**: Xotic750 <Xotic750@gmail.com>  
**License**: [MIT](&lt;https://opensource.org/licenses/MIT&gt;)  
**Copyright**: Xotic750  
<a name="exp_module_is-object-like-x--module.exports"></a>

### `module.exports(value)` ⇒ <code>boolean</code> ⏏
Checks if `value` is object-like. A value is object-like if it's not a
primitive and not a function.

**Kind**: Exported function  
**Returns**: <code>boolean</code> - Returns `true` if `value` is object-like, else `false`.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | The value to check. |

**Example**  
```js
var isObjectLike = require('is-object-like-x');

isObjectLike({});
// => true

isObjectLike([1, 2, 3]);
// => true

isObjectLike(_.noop);
// => false

isObjectLike(null);
// => false
```
