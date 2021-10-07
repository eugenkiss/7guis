## Babel Server Configuration

When using babel for the server, you'll have slightly different webpack config and some babel-specific things you have to do. Let's take a look:

*.babelrc*:
```
{
  "presets": ["es2015", "react", "stage-2"],
  "plugins": [[
    "universal-import", {
      "babelServer": true
    }], [
     "css-modules-transform", {
       "generateScopedName": "[name]__[local]--[hash:base64:5]"
     }
  ]]
}
```
- you gotta pass the `babelServer: true` option to the `universal-import` plugin *(in the client webpack config, you will use the regular plugin as you will see below)*
- For CSS Modules, since you can't rely on webpack anymore to handle importing CSS, we recommend using 
[babel-plugin-css-modules-transform](https://github.com/michalkvasnicak/babel-plugin-css-modules-transform) 
to generate CSS class names on the server. What it does is take code like this:

```js
import styles from '../css/Foo.css'
export default () => <div className={styles.box} />
```

and transpiles it to:

```html
<div class="../css/Foo__box--asdfe" />
```
*And it does so without creating CSS files, as that's handled by Webpack bundling the client code.* Your `generatedScopedName` (e.g. `"[name]__[local]--[hash:base64:5]"`) must match your
`localIdentName` that you pass to Webpack's `css-loader`.

Now that we are using this babel transform, we must override its `.babelrc` in your client webpack config since the babelrc powering node on the server users `"css_modules-transform"` which conflicts with `css-loader`:

***webpack config for the client:***
```js
entry: [
  path.resolve(__dirname, '../src/index.js')
],
module: {
  rules: [
    {

      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          babelrc: false,
          presets: ['es2015', 'react', 'stage-2'],
          plugins: [
            'universal-import' // notice there is no babelServer: true option
            // notice there is no 'css-modules-transform' plugin!
          ]
        }
      }
    },
    {
      test: /\.css$/,
      use: ExtractCssChunks.extract({
        use: {
          loader: 'css-loader',         
          options: {
            modules: true,
            localIdentName: '[name]__[local]--[hash:base64:5]'
          }
        }
      })
    }
  ]
},
plugins: [
  new ExtractCssChunks,
  new webpack.optimize.CommonsChunkPlugin({
    names: ['bootstrap'],
    filename: '[name].js',
    minChunks: Infinity
  })
  ...
```

## Sample Boilerplate
The following is an older boilerplate that will showcase babel being used with chunknames *(without babel-plugin-universal-import)*:

- https://github.com/faceyspacey/flush-chunks-boilerplate-babel-chunknames

We aren't promoting this route anymore, but you can definitely learn from how its configured. Specifically how the server babel config is different from the babel config within the *client webpack config*. Check the `.babelrc` and the webpack configs.


