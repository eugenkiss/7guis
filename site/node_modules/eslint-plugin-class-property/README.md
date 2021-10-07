# eslint-plugin-class-property

## DEPRECATED

Please use [babel-plugin-eslint](https://github.com/babel/eslint-plugin-babel) with the babel/semi rule!

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-class-property`:

```
$ npm install eslint-plugin-class-property --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-class-property` globally.

## Usage

Add `class-property` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "class-property"
    ]
}
```

## Supported Rules
### class-property/class-property-semicolon

This rule enforces consistent use of semicolons for class properties.

## Options

This rule has a single string optio:

* `"always"` (default) requires semicolons at the end of a class property
* `"never"` disallows semicolons as the end of a class property

### always

Examples of **incorrect** code for this rule with the default `"always"` option:

```js
/*eslint class-property/class-property-semicolon: ["error", "always"]*/

class MyClass {
    classProperty = 'foo'
}
```

Examples of **correct** code for this rule with the default `"always"` option:

```js
/*eslint class-property/class-property-semicolon: ["error", "always"]*/

class MyClass {
    classProperty = 'foo';
}
```

### never

Examples of **incorrect** code for this rule with the `"never"` option:

```js
/*eslint class-property/class-property-semicolon: ["error", "never"]*/

class MyClass {
    classProperty = 'foo';
}
```

Examples of **correct** code for this rule with the `"never"` option:

```js
/*eslint class-property/class-property-semicolon: ["error", "never"]*/

class MyClass {
    classProperty = 'foo'
}
```
