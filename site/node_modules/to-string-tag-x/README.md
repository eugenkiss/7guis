<a href="https://travis-ci.org/Xotic750/to-string-tag-x"
   title="Travis status">
<img
   src="https://travis-ci.org/Xotic750/to-string-tag-x.svg?branch=master"
   alt="Travis status" height="18"/>
</a>
<a href="https://david-dm.org/Xotic750/to-string-tag-x"
   title="Dependency status">
<img src="https://david-dm.org/Xotic750/to-string-tag-x.svg"
   alt="Dependency status" height="18"/>
</a>
<a href="https://david-dm.org/Xotic750/to-string-tag-x#info=devDependencies"
   title="devDependency status">
<img src="https://david-dm.org/Xotic750/to-string-tag-x/dev-status.svg"
   alt="devDependency status" height="18"/>
</a>
<a href="https://badge.fury.io/js/to-string-tag-x" title="npm version">
<img src="https://badge.fury.io/js/to-string-tag-x.svg"
   alt="npm version" height="18"/>
</a>
<a name="module_to-string-tag-x"></a>

## to-string-tag-x
Get an object's ES6 @@toStringTag.

**See**: [19.1.3.6 Object.prototype.toString ( )](http://www.ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)  
**Version**: 1.4.3  
**Author**: Xotic750 <Xotic750@gmail.com>  
**License**: [MIT](&lt;https://opensource.org/licenses/MIT&gt;)  
**Copyright**: Xotic750  
<a name="exp_module_to-string-tag-x--module.exports"></a>

### `module.exports(value)` ⇒ <code>string</code> ⏏
The `toStringTag` method returns "[object type]", where type is the
object type.

**Kind**: Exported function  
**Returns**: <code>string</code> - The object type string.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | The object of which to get the object type string. |

**Example**  
```js
var toStringTag = require('to-string-tag-x');

var o = new Object();
toStringTag(o); // returns '[object Object]'
```
