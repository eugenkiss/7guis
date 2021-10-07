## How to get Webpack Stats

Below is an example of the recommended approach to getting stats. You can also do the below in your `npm scripts`, but it's far more robust to do it in code and keep your `npm scripts` cleaner.

If you haven't seen it before, it uses a `multi-compiler`. That means Webpack can compile 2 bundles at once: *both the client and the server bundles*. In fact, it's faster this way since shared modules are cached.

More importantly though, this approach makes "universal HMR" for both the client and server more frictionless than ever, thanks to [@richardscarrot](https://github.com/richardscarrott)'s amazing [webpack-hot-server-middleware](https://github.com/60frames/webpack-hot-server-middleware) package.

```js
const express = require('express')
const webpack = require('webpack')

const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackHotServerMiddleware = require('webpack-hot-server-middleware')

const clientConfig = require('../webpack/client.dev')
const serverConfig = require('../webpack/server.dev')

const clientConfigProd = require('../webpack/client.prod')
const serverConfigProd = require('../webpack/server.prod')

const publicPath = clientConfig.output.publicPath
const outputPath = clientConfig.output.path
const DEV = process.env.NODE_ENV === 'development'
const app = express()

if (DEV) {
  const compiler = webpack([clientConfig, serverConfig]) // multi-compiler
  const clientCompiler = compiler.compilers[0]

  app.use(webpackDevMiddleware(compiler, { publicPath }))
  app.use(webpackHotMiddleware(clientCompiler))
  app.use(webpackHotServerMiddleware(compiler)) // passes stats to `serverRender`

  compiler.plugin('done', done)
}
else {
  webpack([clientConfigProd, serverConfigProd]).run((err, stats) => {
    const clientStats = stats.toJson().children[0]
    const serverRender = require('../buildServer/main.js').default

    app.use(publicPath, express.static(outputPath))
    app.use(serverRender({ clientStats }))      // production version of `serverRender`

    done()
  })
}

let isBuilt = false

const done = () =>
  !isBuilt &&
  app.listen(3000, () => {
    isBuilt = true
    console.log('BUILD COMPLETE -- Listening @ http://localhost:3000/')
  })
```

So the idea here is that your `serverRender` method is the default export of the entry module for your server webpack bundle:

*webpack/server.prod.js + webpack/server.dev.js:*
```js
entry: path.resolve(__dirname, '../server/render.js'),
```

## `serverRender()`

Lastly *server/render.js* which you should be familiar with by now looks like this in its entirety:

```js
import React from 'react'
import ReactDOM from 'react-dom/server'
import { flushChunkNames } from 'react-universal-component/server'
import flushChunks from 'webpack-flush-chunks'
import App from '../src/components/App'

export default ({ clientStats }) => (req, res) => {
  const app = ReactDOM.renderToString(<App />)
  const chunkNames = flushChunkNames()
  const { js, styles, cssHash } = flushChunks(clientStats, { chunkNames })

  res.send(
    `<!doctype html>
      <html>
        <head>
          ${styles}
        </head>
        <body>
          <div id="root">${app}</div>
          ${cssHash}
          ${js}
        </body>
      </html>`
  )
}
```

The key takeaway is that the export IS A FUNCTION THAT RETURNS A TYPICAL EXPRESS MIDDLEWARE FUNCTION. And that first function takes an object with a `clientStats` key/val thanks to *webpack-hot-server-middleware*. 

And finally since that's how our super awesome *universal HMR middleware works*, we simply replicate the same in production, passing `clientStats` in the same place. Again, that looks like this:


*production call to `serverRender`:*
```js
app.use(publicPath, express.static(outputPath))
app.use(serverRender({ clientStats })) // function returned which becomes the middleware
```

## Stats from a file

If you really need to get stats from a file, here's how you do it:

*server/index.js:*
```js
const clientStats = require('../buildClient/stats.json')
const serverRender = require('../buildServer/main.js').default

app.use(publicPath, express.static(outputPath))
app.use(serverRender({ clientStats, outputPath }))
```

*webpack/client.prod.js:*

```js
const StatsPlugin = require('stats-webpack-plugin')

// ...

plugins: [
  new StatsPlugin('stats.json')
```


## Getting Stats using a Babel server

To get stats when using a Babel server (especially in development where HMR is important), you use the following:


*server/index.js:*
```js
import serverRender from './render'

let serverRenderWithHmr = (req, res) => res.send('not ready yet')
const appMiddleware = (req, res) => serverRenderWithHmr

compiler.plugin('done', stats => {
  const clientStats = stats.toJson()
  serverRenderWithHmr = serverRender({ clientStats })
})

app.use(appMiddleware)
```

Do not do this:

```js
compiler.run((error, stats) => {
  const clientStats = stats.toJson()
  // etc
})
```
> The stats in the `run` callback are not complete as they are in the compiler plugin's `done` callback.

`serverRenderWithHmr` will continue to be replaced on every compilation that HMR triggers. If you're using a webpack server, *webpack-hot-server-middleware* does the same.


## Additional Tricks

If you want to embed CSS in your served responses (rather than use stylesheets), pass `outputPath` to `serverRender` like this:

```js
app.use(serverRender({ clientStats, outputPath }))
```

Then you can pass it to `flushChunks` like this:

```js
const { js, css } = flushChunks(clientStats, {
  chunkNames,
  outputPath
})
```