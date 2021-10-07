# shorthash

+ A mini Node.js module to generate short, alpha-number, undecryptable and unique hash id from a long string (utf8 format).
+ Use shorthash when you want to encrypt a string like a movie name or a people name to a short, unique and url friendly id.
+ so with shorthash, you can build an id-string map, instead of quering the id from db each time, you just calculate the id out on the fly. 
+ it's quite convenient in many conditions if you want to build a site like [书本画](http://shubenhua.com), a book search engine in China.


## Usage

#### less's more, no options, just unique the string. 

```javascript
var sh = require("shorthash");

console.log(sh.unique('foobar@example.com'));
// you will get: Z1bL2tE

console.log(sh.unique('my name is really big big and big...'));
// you will get: Z1TirWS

console.log(sh.unique('万里长城永不倒。。。'));
// you will get: 2r6EFF

console.log(sh.unique('和平'));
// you will get: 33NM

```