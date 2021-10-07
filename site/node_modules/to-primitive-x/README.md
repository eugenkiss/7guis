<a href="https://travis-ci.org/Xotic750/to-primitive-x"
   title="Travis status">
<img
   src="https://travis-ci.org/Xotic750/to-primitive-x.svg?branch=master"
   alt="Travis status" height="18"/>
</a>
<a href="https://david-dm.org/Xotic750/to-primitive-x"
   title="Dependency status">
<img src="https://david-dm.org/Xotic750/to-primitive-x.svg"
   alt="Dependency status" height="18"/>
</a>
<a href="https://david-dm.org/Xotic750/to-primitive-x#info=devDependencies"
   title="devDependency status">
<img src="https://david-dm.org/Xotic750/to-primitive-x/dev-status.svg"
   alt="devDependency status" height="18"/>
</a>
<a href="https://badge.fury.io/js/to-primitive-x" title="npm version">
<img src="https://badge.fury.io/js/to-primitive-x.svg"
   alt="npm version" height="18"/>
</a>
<a name="module_to-primitive-x"></a>

## to-primitive-x
Converts a JavaScript object to a primitive value.

**Version**: 1.1.0  
**Author**: Xotic750 <Xotic750@gmail.com>  
**License**: [MIT](&lt;https://opensource.org/licenses/MIT&gt;)  
**Copyright**: Xotic750  
<a name="exp_module_to-primitive-x--module.exports"></a>

### `module.exports(input, [prefferedtype])` ⇒ <code>string</code> \| <code>number</code> ⏏
This method converts a JavaScript object to a primitive value.
Note: When toPrimitive is called with no hint, then it generally behaves as
if the hint were Number. However, objects may over-ride this behaviour by
defining a @@toPrimitive method. Of the objects defined in this specification
only Date objects (see 20.3.4.45) and Symbol objects (see 19.4.3.4) over-ride
the default ToPrimitive behaviour. Date objects treat no hint as if the hint
were String.

**Kind**: Exported function  
**Returns**: <code>string</code> \| <code>number</code> - The converted input as a primitive.  
**Throws**:

- <code>TypeError</code> If unable to convert input to a primitive.


| Param | Type | Description |
| --- | --- | --- |
| input | <code>\*</code> | The input to convert. |
| [prefferedtype] | <code>constructor</code> | The preffered type (String or Number). |

**Example**  
```js
var toPrimitive = require('to-primitive-x');

var date = new Date(0);
toPrimitive(date)); // Thu Jan 01 1970 01:00:00 GMT+0100 (CET)
toPrimitive(date, String)); // Thu Jan 01 1970 01:00:00 GMT+0100 (CET)
toPrimitive(date, Number)); // 0
```
