# Extract HoC
A Babel plugin that enables react-hot-loader to work on HoCs.

## Why this plugin needs to exist
react-hot-loader won't work if you put the component as an argument in functions (to create a higher order component).

See more at this issue: https://github.com/gaearon/react-hot-loader/issues/650

## Installation
```
$ npm install extract-hoc
```

In the `.babelrc`, add `extract-hoc/babel` before the `react-hot-loader/babel`:
```json
{
  "plugins": [
    "extract-hoc/babel",
    "react-hot-loader/babel"
  ]
}
```

## License
MIT
