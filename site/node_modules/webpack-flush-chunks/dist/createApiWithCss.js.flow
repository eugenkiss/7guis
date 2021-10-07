// @flow
import React from 'react'
import fs from 'fs'

import type { Stats, FilesMap } from './flushChunks'

export type CssChunksHash = {
  [key: string]: string
}

type StatelessComponent = () => React$Element<*>
type ObjectString = {
  toString: () => string
}

export type Api = {
  Js: StatelessComponent,
  Styles: StatelessComponent,
  Css: StatelessComponent,

  js: ObjectString,
  styles: ObjectString,
  css: ObjectString,

  scripts: Array<string>,
  stylesheets: Array<string>,

  publicPath: string,
  outputPath: ?string
}

const DEV = process.env.NODE_ENV === 'development'

/** CREATE API WITH CSS */

export default (
  files: Array<string>,
  filesOrderedForCss: Array<string>,
  stats: Stats,
  outputPath: ?string
): Api => {
  const publicPath = stats.publicPath.replace(/\/$/, '')
  const regex = getJsFileRegex(files)
  const scripts = files.filter(file => isJs(regex, file))
  const stylesheets = filesOrderedForCss.filter(isCss)
  const cssHashRaw = createCssHash(stats)

  const api = {
    // 1) Use as React components using ReactDOM.renderToStaticMarkup, eg:
    // <html><Styles /><Js /><html>
    Js: () => (
      <span>
        {scripts.map((file, key) => (
          <script
            type='text/javascript'
            src={`${publicPath}/${file}`}
            key={key}
            defer
          />
        ))}
      </span>
    ),
    Styles: () => (
      <span>
        {stylesheets.map((file, key) => (
          <link rel='stylesheet' href={`${publicPath}/${file}`} key={key} />
        ))}
      </span>
    ),

    // 2) Use as string, eg: `${styles} ${js}`
    js: {
      toString: () =>
        // lazy-loaded in case not used
        scripts
          .map(
            file =>
              `<script type='text/javascript' src='${publicPath}/${file}' defer></script>`
          )
          .join('\n')
    },
    styles: {
      toString: () =>
        // lazy-loaded in case not used
        stylesheets
          .map(file => `<link rel='stylesheet' href='${publicPath}/${file}' />`)
          .join('\n')
    },

    // 3) Embed the raw css without needing to load another file.
    // Use as a React component (<Css />) or a string (`${css}`):
    // NOTE: during development, HMR requires stylesheets.
    Css: () =>
      (DEV
        ? api.Styles()
        : <span>
          <style>{stylesAsString(stylesheets, outputPath)}</style>
        </span>),
    css: {
      toString: () =>
        // lazy-loaded in case not used
        (DEV
          ? api.styles.toString()
          : `<style>${stylesAsString(stylesheets, outputPath)}</style>`)
    },

    // 4) names of files without publicPath or outputPath prefixed:
    scripts,
    stylesheets,

    // 5) for completeness provide the paths even though they were inputs:
    publicPath,
    outputPath,

    // 6) special goodness for dual-file import()
    cssHashRaw,
    CssHash: () => (
      <script
        type='text/javascript'
        dangerouslySetInnerHTML={{
          __html: `window.__CSS_CHUNKS__ = ${JSON.stringify(cssHashRaw)}`
        }}
      />
    ),
    cssHash: {
      toString: () =>
        `<script type='text/javascript'>window.__CSS_CHUNKS__= ${JSON.stringify(cssHashRaw)}</script>`
    }
  }

  return api
}

/** HELPERS */

export const getJsFileRegex = (files: Array<string>): RegExp => {
  const isUsingExtractCssChunk = !!files.find(file => file.includes('no_css'))
  return isUsingExtractCssChunk ? /\.no_css\.js$/ : /\.js$/
}

export const isJs = (regex: RegExp, file: string): boolean =>
  regex.test(file) && !/\.hot-update\.js$/.test(file)

export const isCss = (file: string): boolean => /\.css$/.test(file)

export const stylesAsString = (
  stylesheets: Array<string>,
  outputPath: ?string
): string => {
  if (!outputPath) {
    throw new Error(
      `No \`outputPath\` was provided as an option to \`flushChunks\`. 
      Please provide one so stylesheets can be read from the
      file system since you're embedding the css as a string.`
    )
  }

  const path = outputPath.replace(/\/$/, '')

  return stylesheets
    .map(file => {
      const filePath = `${path}/${file}`
      return fs.readFileSync(filePath, 'utf8')
    })
    .join('\n')
    .replace(/\/\*# sourceMappingURL=.+\*\//g, '') // hide prod sourcemap err
}

export const createCssHash = ({
  assetsByChunkName,
  publicPath
}: {
  assetsByChunkName: FilesMap,
  publicPath: string
}): CssChunksHash =>
  Object.keys(assetsByChunkName).reduce((hash, name) => {
    if (!assetsByChunkName[name] || !assetsByChunkName[name].find) return hash
    const file = assetsByChunkName[name].find(file => file.endsWith('.css'))
    if (file) hash[name] = `${publicPath}${file}`
    return hash
  }, {})
