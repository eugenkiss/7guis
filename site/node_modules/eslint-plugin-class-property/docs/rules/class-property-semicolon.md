# require or disallow semicolons after class property (lass-property/class-property-semicolon)

This rule enforces consistent use of semicolons for class properties.

## Options

This rule has a single string optio:

* `"always"` (default) requires semicolons at the end of a class property
* `"never"` disallows semicolons as the end of a class property

### always

Examples of **incorrect** code for this rule with the default `"always"` option:

```js
/*eslint class-properties/semi: ["error", "always"]*/

class MyClass {
    classProperty = 'foo'
}
```

Examples of **correct** code for this rule with the default `"always"` option:

```js
/*eslint class-properties/semi: ["error", "always"]*/

class MyClass {
    classProperty = 'foo';
}
```

### never

Examples of **incorrect** code for this rule with the `"never"` option:

```js
/*eslint class-properties/semi: ["error", "never"]*/

class MyClass {
    classProperty = 'foo';
}
```

Examples of **correct** code for this rule with the `"never"` option:

```js
/*eslint class-properties/semi: ["error", "never"]*/

class MyClass {
    classProperty = 'foo'
}
```

## When Not To Use It

If you do not want to enforce semicolon usage or omission for class properties in any particular way, then you can turn this rule off.

## Further Reading

* [An Open Letter to JavaScript Leaders Regarding Semicolons](http://blog.izs.me/post/2353458699/an-open-letter-to-javascript-leaders-regarding)
* [JavaScript Semicolon Insertion](http://inimino.org/~inimino/blog/javascript_semicolons)

## Related Rules

* [no-extra-semi](no-extra-semi.md)
* [no-unexpected-multiline](no-unexpected-multiline.md)
* [semi-spacing](semi-spacing.md)