<a href="https://travis-ci.org/Xotic750/has-own-property-x"
   title="Travis status">
<img
   src="https://travis-ci.org/Xotic750/has-own-property-x.svg?branch=master"
   alt="Travis status" height="18"/>
</a>
<a href="https://david-dm.org/Xotic750/has-own-property-x"
   title="Dependency status">
<img src="https://david-dm.org/Xotic750/has-own-property-x.svg"
   alt="Dependency status" height="18"/>
</a>
<a href="https://david-dm.org/Xotic750/has-own-property-x#info=devDependencies"
   title="devDependency status">
<img src="https://david-dm.org/Xotic750/has-own-property-x/dev-status.svg"
   alt="devDependency status" height="18"/>
</a>
<a href="https://badge.fury.io/js/has-own-property-x" title="npm version">
<img src="https://badge.fury.io/js/has-own-property-x.svg"
   alt="npm version" height="18"/>
</a>
<a name="module_has-own-property-x"></a>

## has-own-property-x
Used to determine whether an object has an own property with the specified property key.

**See**: [7.3.11 HasOwnProperty (O, P)](http://www.ecma-international.org/ecma-262/6.0/#sec-hasownproperty)  
**Version**: 3.2.0  
**Author**: Xotic750 <Xotic750@gmail.com>  
**License**: [MIT](&lt;https://opensource.org/licenses/MIT&gt;)  
**Copyright**: Xotic750  
<a name="exp_module_has-own-property-x--module.exports"></a>

### `module.exports(object, property)` ⇒ <code>boolean</code> ⏏
The `hasOwnProperty` method returns a boolean indicating whether
the `object` has the specified `property`. Does not attempt to fix known
issues in older browsers, but does ES6ify the method.

**Kind**: Exported function  
**Returns**: <code>boolean</code> - `true` if the property is set on `object`, else `false`.  
**Throws**:

- <code>TypeError</code> If object is null or undefined.


| Param | Type | Description |
| --- | --- | --- |
| object | <code>Object</code> | The object to test. |
| property | <code>string</code> \| <code>Symbol</code> | The name or Symbol of the property to test. |

**Example**  
```js
var hasOwnProperty = require('has-own-property-x');
var o = {
  foo: 'bar'
};


hasOwnProperty(o, 'bar'); // false
hasOwnProperty(o, 'foo'); // true
hasOwnProperty(undefined, 'foo');
                  // TypeError: Cannot convert undefined or null to object
```
