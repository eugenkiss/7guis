<a href="https://gitter.im/Reactlandia/Lobby" target="_blank">
  <img alt="Edit Redux-First Router Demo" src="http://cdn.reactlandia.com/chat-badge-reactlandia.png">
</a>

<a href="https://codesandbox.io/s/github/faceyspacey/redux-first-router-codesandbox/tree/master/?module=r1oVP5YEUZ" target="_blank">
  <img alt="Edit Redux-First Router Demo" src="https://codesandbox.io/static/img/play-codesandbox.svg">
</a>


# Webpack Flush Chunks



<p align="center">
  <a href="https://www.npmjs.com/package/webpack-flush-chunks">
    <img src="https://img.shields.io/npm/v/webpack-flush-chunks.svg" alt="Version" />
  </a>

  <a href="https://travis-ci.org/faceyspacey/webpack-flush-chunks">
    <img src="https://travis-ci.org/faceyspacey/webpack-flush-chunks.svg?branch=master" alt="Build Status" />
  </a>

  <a href="https://lima.codeclimate.com/github/faceyspacey/webpack-flush-chunks/coverage">
    <img src="https://lima.codeclimate.com/github/faceyspacey/webpack-flush-chunks/badges/coverage.svg" alt="Coverage Status"/>
  </a>

  <a href="https://lima.codeclimate.com/github/faceyspacey/webpack-flush-chunks">
    <img src="https://lima.codeclimate.com/github/faceyspacey/webpack-flush-chunks/badges/gpa.svg" alt="GPA" />
  </a>

  <a href="https://www.npmjs.com/package/webpack-flush-chunks">
    <img src="https://img.shields.io/npm/dt/webpack-flush-chunks.svg" alt="Downloads" />
  </a>

  <a href="https://www.npmjs.com/package/webpack-flush-chunks">
    <img src="https://img.shields.io/npm/l/webpack-flush-chunks.svg" alt="License" />
  </a>
</p>

<p align="center">
🍾🍾🍾 <a href="https://github.com/faceyspacey/universal-demo">GIT CLONE LOCAL DEMO</a> 🚀🚀🚀
</p>

<p align="center">
  <img src="./poo.jpg" height="350" />
</p>

Use this package server-side to flush webpack chunks from *[React Universal Component](https://github.com/faceyspacey/react-universal-component)* or any package that flushes an array of rendered `moduleIds` or `chunkNames`. The preferred approach is `chunkNames`, as that's what [babel-plugin-universal-import](https://github.com/faceyspacey/babel-plugin-universal-import) focuses on.

```js
import { flushChunkNames } from 'react-universal-component/server'
import flushChunks from 'webpack-flush-chunks'

const app = ReactDOMServer.renderToString(<App />)
const { js, styles, cssHash } = flushChunks(webpackStats, {
  chunkNames: flushChunkNames()
})

res.send(`
  <!doctype html>
  <html>
    <head>
      ${styles}
    </head>
    <body>
      <div id="root">${app}</div>
      ${cssHash}
      ${js}
    </body>
  </html>
`)
```

The code has been cracked for while now for Server Side Rendering and Code-Splitting *individually*. Accomplishing both *simultaneously* has been an impossibility without jumping through major hoops or using a *framework*, specifically Next.js. Our tools are for "power users" that prefer the *frameworkless* approach.

*Webpack Flush Chunks* is essentially the backend to universal rendering components like [React Universal Component](https://github.com/faceyspacey/react-universal-component). It works with any "universal" component/module that buffers a list of `moduleIds` or `chunkNames` evaluated. 

Via a simple API it gives you the chunks (javascript, stylesheets, etc) corresponding to the modules that were ***synchronously*** rendered on the server, which without this package would be *asynchronously* rendered on the client. In doing so, it also allows your first client-side render on page-load to render async components ***synchronously***! 

This solves the problem of having to make additional requests to get async components plus React checksum mismatches when the client expects to render a `<Loading />` component.

It offers 2 functions `flushChunks` and `flushFiles`, which you call immediately after `ReactDOMServer.renderToString`. They are used in server-rendering to extract the minimal amount of chunks to send to the client, thereby solving a missing piece for code-splitting: server-side rendering. 

The dream of **code-splitting everywhere** is finally here.

**Reactlandia Articles:**

- [code-cracked-for-ssr-plus-splitting-in-reactlandia](https://medium.com/@faceyspacey/code-cracked-for-code-splitting-ssr-in-reactlandia-react-loadable-webpack-flush-chunks-and-1a6b0112a8b8)

- [announcing-react-universal-component-2-and-babel-plugin-universal-import](https://medium.com/faceyspacey/announcing-react-universal-component-2-0-babel-plugin-universal-import-5702d59ec1f4) 🚀

- [how-to-use-webpack-magic-comments-with-react-universal-component](https://medium.com/@faceyspacey/how-to-use-webpacks-new-magic-comment-feature-with-react-universal-component-ssr-a38fd3e296a)

- [webpack-import-will-soon-fetch-js-and-css-heres-how-you-do-it-today](https://medium.com/faceyspacey/webpacks-import-will-soon-fetch-js-css-here-s-how-you-do-it-today-4eb5b4929852)

## Installation

```
yarn add react-universal-component webpack-flush-chunks 
yarn add --dev babel-plugin-universal-import extract-css-chunks-webpack-plugin
```
- ***[Babel Plugin Universal Import](https://github.com/faceyspacey/babel-plugin-universal-import)*** is used to make `react-universal-component` as frictionless as possible. It removes the need to provide additional options to insure synchronous rendering happens on the server and on the client on initial load. These packages aren't required, but usage as frictionless as possible.

- ***[Extract Css Chunks Webpack Plugin](https://github.com/faceyspacey/extract-css-chunks-webpack-plugin)*** is another companion package made to complete the CSS side of the code-splitting dream. It uses the `cssHash` string to asynchronously request CSS assets as part of a "dual import" when calling `import()`. 



*If you like to move fast, git clone the [universal-demo](https://github.com/faceyspacey/universal-demo)*.

## How It Works

*React Universal Component*, when used on the server, skips the *loading* phase and syncronously renders your contained component, while recording the ID of 
its corresponding module. *React Universal Component* may be used multiple times and therefore may record multiple split points. `flushChunks/flushFiles` is then able 
to determine the minimal set of chunks required to re-render those modules/components on the client. From there it outputs strings, arrays or React components 
containing the precise javascript files (and CSS files) to embed in your HTML response. 

The result is a server-rendered response whose *"checksum"* 
matches the one generated on the client, so that another client render is not needed, and more importantly so that another request to the server for
an additional chunk is not needed.

For future imports performed on user navigation, the "dual-import" mechanism of `babel-plugin-universal-import` will request a stylesheet. To accomplish that, a hash of chunk names to stylsheets is provided so you can embed it in the page, similar to what webpack does with your js chunks in its bootstrap code.

Before we examine how to use `flushChunks/flushFiles`, let's take a look at the desired output. It's something like this:

```html
<head>
  <link rel='stylesheet' href='/static/0.css' />
  <link rel='stylesheet' href='/static/7.css' />
  <link rel='stylesheet' href='/static/main.css' />
</head> 

<body>
  <div id="react-root"></div>

  <!-- before entry chunks -->
  <script type='text/javascript' src='/static/bootstrap.js'></script>
  <script type='text/javascript' src='/static/vendor.js'></script>

  <!-- dynamic chunks -->
  <script type='text/javascript' src='/static/0.js'></script>
  <script type='text/javascript' src='/static/7.js'></script>

  <!-- after entry chunks -->
  <script type='text/javascript' src='/static/main.js'></script>

  <!-- stylsheets that will be requested when import() is called -->
  <script>
    window.__CSS_CHUNKS__ = {
      Foo: '/static/Foo.css',
      Bar: '/static/Bar.css'
    }
  </script>
</body>
```

> Notice common `vendor` and `bootstrap` chunks at the beginning and your main entry bundle (`main`) at the end. 
Notice that chunks `0` and `7` are served, but not chunks `1-6` or `8+`. That's a lot of bytes saved in initial requests!

Because of the way Webpack works where "bootstrap" code must be run before any additional chunks can be registered, 
it's imperative bootstrap and common chunks are generated and placed at the beginning, 
thereby allowing you to place dynamic chunks before your entry chunk which kickstarts app rendering.

In conjunction with your Webpack configuration (which we'll specify [below](#webpack-configuration)), *Webpack Flush Chunks* solves these problems for you by consuming your Webpack compilation `stats` and generating strings, arrays and components you can embed in the final output rendered on the server.

*.babelrc:*
```
{
  "plugins": ["universal-import"]
}

```

*src/components/App.js:*
```js
import universal from 'react-universal-component'

const UniversalComponent = universal(props => import(`./${props.page})

export default () =>
  <div>
    <UniversalComponent page='Foo' />
  </div>
```

*server/render.js:*

```js
import ReactDOMServer from 'react-dom/server'
import { flushChunkNames } from 'react-universal-component/server'
import flushChunks from 'webpack-flush-chunks'

const app = ReactDOMServer.renderToString(<App />)
const chunkNames = flushChunkNames()
const { js, styles, cssHash } = flushChunks(stats, { chunkNames })

res.send(`
  <!doctype html>
  <html>
    <head>
      ${styles}
    </head>
    <body>
      <div id="root">${app}</div>
      ${cssHash}
      ${js}
    </body>
  </html>
`)
```

*et voila!*

> Note: if you require a less automated approach where you're given just the stylesheets and scripts corresponding to dynamic chunks (e.g. not `main.js`), see `flushFiles` in the [the low-level API section](#low-level-api-flushfiles).

## Options API:

```js
flushChunks(stats, {
  chunkNames: ReactUniversalComponent.flushChunkNames(),
  before: ['bootstrap', 'vendor'],                // default
  after: ['main'],                                // default
  outputPath: path.resolve(__dirname, '../dist'), // required only if you want to serve raw CSS
})
```


- **chunkNames** - ***array of chunks flushed from `react-universal-component`

- **before** - ***array of named entries that come BEFORE your dynamic chunks:*** A typical 
pattern is to create a `vendor` chunk. A better strategy is to create a `vendor` and a `bootstrap` chunk. The "bootstrap"
chunk is a name provided to the `CommonsChunkPlugin` which has no entry point specified for it. The plugin by default removes 
webpack bootstrap code from the named `vendor` common chunk and puts it in the `bootstrap` chunk. This is a common pattern because
the webpack bootstrap code has info about the chunks/modules used in your bundle and is likely to change, which means to cache
your `vendor` chunk you need to extract the bootstrap code into its own small chunk file. If this is new to you, don't worry.
[Below](#webpack-configuration) you will find examples for exactly how to specify your Webpack config. Lastly, you do not need to 
provide this option if you have a `bootstrap` chunk, or `vendor` chunk or both, as those are the defaults.

- **after** - ***array of named entries that come AFTER your dynamic chunks:*** 
Similar to `before`, `after` contains an array of chunks you want to come after the dynamic chunks that
your universal component flushes. Typically you have just a `main` chunk, and if that's the case, you can ignore this option,
as that's the default.

- **outputPath** - ***absolute path to the directory containing your client build:*** This is only needed if serving css 
embedded in your served response HTML, rather than links to external stylesheets. I.e. if you are using the `Css` and `css` values in the `return API` described in the next section. It's needed to determine where in the file system to find the CSS that needs to be extract into
an in-memory string. Keep in mind if you're rendering the server with Webpack, filesystem paths may not match up, so it's important
to accurately pass the `outputPath` to your `serverRender` method. We recommend to do this by running your server 
express/koa/hapi/etc code via Babel and then by requiring your Webpack server bundle into it. 
See [one of our boilerplates](#boilerplates) for an example.


## Return API:

The return of `flushChunks` provides many options to render server side requests, giving you maximum flexibility:

```js
const {
  // react components:
  Js,     // javascript chunks
  Styles, // external stylesheets
  Css,    // raw css

  // strings:
  js,     // javascript chunks
  styles, // external stylesheets
  css,    // raw css

  // arrays of file names:
  scripts,
  stylesheets,

  // cssHash for use with babel-plugin-dual-import
  cssHashRaw, // hash object of chunk names to css file paths
  cssHash,    // string: <script>window.__CSS_CHUNKS__ = ${JSON.stringify(cssHashRaw)}</script>
  CssHash,    // react component of above

  // important paths:
  publicPath,
  outputPath
} = flushChunks(moduleIds, stats, options)
```

Let's take a look at some examples:





## Webpack Configuration

***client:***
```js
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin')

entry: [
  path.resolve(__dirname, '../src/index.js'),
],
module: {
  rules: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: 'babel-loader',
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
    names: ['bootstrap'],                   // notice there is no "bootstrap" named entry
    filename: '[name].js',
    minChunks: Infinity
  })
  ...
```

- The `CommonsChunkPlugin` with a `"bootstrap"` entry ***which does NOT in fact exist (notice there is no `entry` for it)*** insures that a separate chunk is created just for webpack bootstrap code. 
This moves the webpack bootstrap code out of your `main` entry chunk so that it can also run before your dynamic
chunks. 


***server:***
```js
module: {
  rules: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: 'babel-loader',
    },
    {
      test: /\.css$/,
      exclude: /node_modules/,
      use: {
        loader: 'css-loader/locals',          // notice you're using the `locals` file as your loader
        options: {
          modules: true,
          localIdentName: '[name]__[local]--[hash:base64:5]'
        }
      }
    }
  ]
}
plugins: [
  new webpack.optimize.LimitChunkCountPlugin({
    maxChunks: 1,                               
  })
  ...
```

- The `LimitChunkCountPlugin` with `maxChunks: 1` insures only one file is generated for your server bundle
so it can be run synchronously.


## Externals
If you're specifying externals to leave unbundled, you need to tell Webpack
to still bundle `react-universal-component` and `webpack-flush-chunks` so that they know they are running within Webpack. For example:

```js
const externals = fs
  .readdirSync(modeModules)
  .filter(x => !/\.bin|react-universal-component|webpack-flush-chunks/.test(x))
  .reduce((externals, mod) => {
    externals[mod] = `commonjs ${mod}`
    return externals
  }, {})
```

## AutoDllPlugin
Since the webpack plugin API does not yet allow you to add to stats, the [AutoDllPlugin cannot add chunks to stats](https://github.com/asfktz/autodll-webpack-plugin/issues/23). Therefore you have to embed its corresponding script manually. 

## Low-level API: `flushFiles`

For advanced users that want access to all files flushed (`.js`, `.css` or whatever else might be in there) and without named entry chunks you already know (such as `bootstrap`, `vendor`, and `main`), here you go:

```js
import { flushChunkNames } from 'react-universal-component/server'
import { flushFiles } from 'webpack-flush-chunks'

const chunkNames = flushChunkNames()
const scripts = flushFiles(stats, { chunkNames, filter: 'js' })
const styles = flushFiles(stats, { chunkNames, filter: 'css' })
```
> i.e. this will get you all files corresponding to flushed "dynamic" chunks, not `main`, `vendor`, etc. 

The only thing different with the API is that it has a `filter` option, and that it doesn't have `before`, `after` and `outputPath` options. The `filter` can be a file extension as a string, a regex, or a function: `filter: file => file.endsWith('js')`.

Keep in mind, you will have to get right placing these between your `bootstrap` and `main` scripts. ***OR*** if you don't have a `bootstrap` script, you need to set it up so your `main` script doesn't actually call `ReactDOM.render`, and instead you put `<script>window.render()</script>` (where `window.render()` calls `ReactDOM.render`) after all your chunks in your markup so that by the time it's called all your chunks are loaded. In the latter case, you should put your dynamic chunks received from `flushFiles` **after** your `main` script so that the webpack bootstrap code *now within your `main` script* (as it regularly is) knows what to do with the additional scripts from dynamic chunks.

If what you want, instead of file names, is full-on compilation `chunk` objects (and any information it contains, which for 99% of most projects is unnecessary), create an issue and we'll add it. But until there is an actual need, we would like to keep the API simple.

## Additional Docs
- [How to get webpack stats](./docs/webpack-stats.md)
- [using a babel server (not recommended)](./docs/babel-config.md)
- [`flushModuleIds()` (legacy)](./docs/flush-module-ids.md)


## Universal Demo
🍾🍾🍾 **[faceyspacey/universal-demo](https://github.com/faceyspacey/universal-demo)** 🚀🚀🚀

```bash
git clone https://github.com/faceyspacey/universal-demo.git
cd universal-demo
yarn
yarn start
```

## Contributing

We use [commitizen](https://github.com/commitizen/cz-cli), so run `npm run cm` to make commits. A command-line form will appear, requiring you answer a few questions to automatically produce a nicely formatted commit. Releases, semantic version numbers, tags, changelogs and publishing to NPM will automatically be handled based on these commits thanks to [semantic-release](https://github.com/semantic-release/semantic-release). Be good.


## Tests

Reviewing a package's tests are a great way to get familiar with it. It's direct insight into the capabilities of the given package (if the tests are thorough). What's even better is a screenshot of the tests neatly organized and grouped (you know the whole "a picture says a thousand words" thing). 

Below is a screenshot of this module's tests running in [Wallaby](https://wallabyjs.com) *("An Integrated Continuous Testing Tool for JavaScript")* which everyone in the React community should be using. It's fantastic and has taken my entire workflow to the next level. It re-runs your tests on every change along with comprehensive logging, bi-directional linking to your IDE, in-line code coverage indicators, **and even snapshot comparisons + updates for Jest!** I requestsed that feature by the way :). It's basically a substitute for live-coding that inspires you to test along your journey.

![webpack-flush-chunks wallaby tests screenshot](./tests-screenshot.png)

## More from FaceySpacey in Reactlandia
- [redux-first-router](https://github.com/faceyspacey/redux-first-router). It's made to work perfectly with *Universal*. Together they comprise our *"frameworkless"* Redux-based approach to what Next.js does (splitting, SSR, prefetching, and routing). *People are lovin it by the way* 😎
