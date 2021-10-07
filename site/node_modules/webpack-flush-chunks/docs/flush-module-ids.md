## `flushModuleIds()`

There's also a method for users not using chunk names. `babel-plugin-universal-import` which this package is focused on now uses webpack's *"magic comments"* to generate chunk names for you. So if you're using the babel-plugin or *"magic comments"* directly, you don't need this. 

Flushing module IDs in fact was actually the original implementation of this package, and was quite a break-through since it was far more challenging than dealing with chunk names, and the *"magic comment"* for providing chunk names didn't exist at the time.

Here's how you use it:


*server/render.js:*
```js
export default stats => {
  return (req, res, next) => {
    const app = ReactDOMServer.renderToString(<App />)
    const moduleIds = flushModuleIds()

    const { js, styles } = flushChunks(stats, {
      moduleIds,
      // rootDir: path.join(__dirname, '..') // only needed with a babel server
    })
```



If you're rendering your server with Babel, you must provide the `rootDir` of your application so that Babel/Node module paths can be matched to relative module paths used by webpack to bundle the client.

However, if you're using webpack to bundle both the server and client, you instead need deterministic module IDs so they can be matched. Add this to your webpack configs:

*development: client + server webpack config:*
```js
plugins: [
  new webpack.NamedModulesPlugin()
```

*production: client + server webpack config:*
```js
plugins: [
  new webpack.HashedModuleIdsPlugin()
```

Now both the client and server bundles have the same IDs! [@richardscarrot](https://github.com/richardscarrott) came up with this technique by the way!

> NOTE: in production you don't want to expose your file system like the `NamedModulesPlugin` does so you use generated hashes for IDs instead.

## Boilerplates to Learn From
We have some older boilerplates that we aren't promoting/maintaining, but will showcase the core configuration hurdles using `moduleIds` instead of `chunkNames` being solved. 

- https://github.com/faceyspacey/flush-chunks-boilerplate-babel
- https://github.com/faceyspacey/flush-chunks-boilerplate-webpack

If this is the route you plan to take, definitely check these out, as their configuration still applies.
