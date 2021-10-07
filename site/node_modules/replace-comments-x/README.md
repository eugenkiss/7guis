<a href="https://travis-ci.org/Xotic750/replace-comments-x"
   title="Travis status">
<img
   src="https://travis-ci.org/Xotic750/replace-comments-x.svg?branch=master"
   alt="Travis status" height="18"/>
</a>
<a href="https://david-dm.org/Xotic750/replace-comments-x"
   title="Dependency status">
<img src="https://david-dm.org/Xotic750/replace-comments-x.svg"
   alt="Dependency status" height="18"/>
</a>
<a href="https://david-dm.org/Xotic750/replace-comments-x#info=devDependencies"
   title="devDependency status">
<img src="https://david-dm.org/Xotic750/replace-comments-x/dev-status.svg"
   alt="devDependency status" height="18"/>
</a>
<a href="https://badge.fury.io/js/replace-comments-x" title="npm version">
<img src="https://badge.fury.io/js/replace-comments-x.svg"
   alt="npm version" height="18"/>
</a>
<a name="module_replace-comments-x"></a>

## replace-comments-x
Replace the comments in a string.

**Version**: 2.0.0  
**Author**: Xotic750 <Xotic750@gmail.com>  
**License**: [MIT](&lt;https://opensource.org/licenses/MIT&gt;)  
**Copyright**: Xotic750  
<a name="exp_module_replace-comments-x--module.exports"></a>

### `module.exports(string, [replacement])` ⇒ <code>string</code> ⏏
This method replaces comments in a string.

**Kind**: Exported function  
**Returns**: <code>string</code> - The new string with the comments replaced.  
**Throws**:

- <code>TypeError</code> If string is null or undefined or not coercible.
- <code>TypeError</code> If replacement is not coercible.


| Param | Type | Description |
| --- | --- | --- |
| string | <code>string</code> | The string to be stripped. |
| [replacement] | <code>string</code> | The string to be used as a replacement. |

**Example**  
```js
var replaceComments = require('replace-comments-x');

replaceComments(test;/* test * /, ''), // 'test;'
replaceComments(test; // test, ''), // 'test;'
```
