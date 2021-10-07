# extract-hoc-compose

Super simple and super dumb babel plugin that extracts HOCs from compose
method, enabling simultaneous usage of
[react-hot-loader](https://github.com/gaearon/react-hot-loader) and
[recompose](https://github.com/acdlite/recompose).

## What it does

It converts this:
```
const EnhancedComponent = compose(
    enhancer1,
    enhanver2,
    enhancer3
)(Component);
```
Into this:
```
const _uid = enhancer3(Component);
const _uid2 = enhanver2(_uid);
const EnhancedComponent = enhancer1(_uid2);
```
Single variable declaration and 'compose' name are required.

## Installation

```
$ yarn add extract-hoc-compose -D -E
```
Add `"extract-hoc-compose/babel"` to your Babel plugins before
`"react-hot-loader/babel"`.
## Caveats
The plugin must run before 'react-hot-loader/babel', however Babel 6
does not respect plugin ordering. With webpack, possible solution is to
run babel-loader twice:
```
rules: [
    {
        test: /\.jsx?$/,
        use: [
            'babel-loader',
            {
                loader: 'babel-loader',
                options: {
                    plugins: ["extract-hoc-compose/babel"],
                    babelrc: false
                }
            },
        ],
        exclude: [/node_modules/]
    },
]
```

## See also
Inspired by [extract-hoc](https://github.com/quangbuule/extract-hoc).

## License
MIT