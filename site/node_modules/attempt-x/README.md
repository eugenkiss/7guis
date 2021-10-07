<a href="https://travis-ci.org/Xotic750/attempt-x"
   title="Travis status">
<img
   src="https://travis-ci.org/Xotic750/attempt-x.svg?branch=master"
   alt="Travis status" height="18"/>
</a>
<a href="https://david-dm.org/Xotic750/attempt-x"
   title="Dependency status">
<img src="https://david-dm.org/Xotic750/attempt-x.svg"
   alt="Dependency status" height="18"/>
</a>
<a href="https://david-dm.org/Xotic750/attempt-x#info=devDependencies"
   title="devDependency status">
<img src="https://david-dm.org/Xotic750/attempt-x/dev-status.svg"
   alt="devDependency status" height="18"/>
</a>
<a href="https://badge.fury.io/js/attempt-x" title="npm version">
<img src="https://badge.fury.io/js/attempt-x.svg"
   alt="npm version" height="18"/>
</a>
<a name="module_attempt-x"></a>

## attempt-x
Invokes function, returning an object of the results.

**Version**: 1.1.3  
**Author**: Xotic750 <Xotic750@gmail.com>  
**License**: [MIT](&lt;https://opensource.org/licenses/MIT&gt;)  
**Copyright**: Xotic750  
<a name="exp_module_attempt-x--module.exports"></a>

### `module.exports(fn, [...args])` ⇒ <code>Object</code> ⏏
This method attempts to invoke the function, returning either the result or
the caught error object. Any additional arguments are provided to the
function when it's invoked.

**Kind**: Exported function  
**Returns**: <code>Object</code> - Returns an object of the result.  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | The function to attempt. |
| [...args] | <code>\*</code> | The arguments to invoke the function with. |

**Example**  
```js
var attempt = require('attempt-x');

function thrower() {
  throw new Error('Threw');
}

attempt(thrower, 1, 2);
// {
//   threw: true,
//   value: // Error('Threw') object
// }

function sumArgs(a, b) {
  return a + b;
}

attempt(sumArgs, 1, 2);
// {
//   threw: false,
//   value: 3
// }

var thisArg = [];
function pusher(a, b) {
  return this.push(a, b);
}

attempt.call(thisArg, pusher, 1, 2);
// {
//   threw: false,
//   value: 2
// }
// thisArg => [1, 2];
```
