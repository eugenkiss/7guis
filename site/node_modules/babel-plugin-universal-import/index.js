'use-strict'

const { addDefault } = require('@babel/helper-module-imports')

const visited = Symbol('visited')

const IMPORT_UNIVERSAL_DEFAULT = {
  id: Symbol('universalImportId'),
  source: 'babel-plugin-universal-import/universalImport',
  nameHint: 'universalImport'
}

const IMPORT_CSS_DEFAULT = {
  id: Symbol('importCssId'),
  source: 'babel-plugin-universal-import/importCss',
  nameHint: 'importCss'
}

const IMPORT_PATH_DEFAULT = {
  id: Symbol('pathId'),
  source: 'path',
  nameHint: 'path'
}

function getImportArgPath(p) {
  return p.parentPath.get('arguments')[0]
}

function trimChunkNameBaseDir(baseDir) {
  return baseDir.replace(/^[./]+|(\.js$)/g, '')
}

function prepareChunkNamePath(path) {
  return path.replace(/\//g, '-')
}

function getImport(p, { id, source, nameHint }) {
  if (!p.hub.file[id]) {
    p.hub.file[id] = addDefault(p, source, { nameHint })
  }

  return p.hub.file[id]
}

function createTrimmedChunkName(t, importArgNode) {
  if (importArgNode.quasis) {
    let quasis = importArgNode.quasis.slice(0)
    const baseDir = trimChunkNameBaseDir(quasis[0].value.cooked)
    quasis[0] = Object.assign({}, quasis[0], {
      value: { raw: baseDir, cooked: baseDir }
    })

    quasis = quasis.map((quasi, i) => (i > 0 ? prepareQuasi(quasi) : quasi))

    return Object.assign({}, importArgNode, {
      quasis
    })
  }

  const moduleName = trimChunkNameBaseDir(importArgNode.value)
  return t.stringLiteral(moduleName)
}

function prepareQuasi(quasi) {
  const newPath = prepareChunkNamePath(quasi.value.cooked)

  return Object.assign({}, quasi, {
    value: { raw: newPath, cooked: newPath }
  })
}

function getMagicCommentChunkName(importArgNode) {
  const { quasis, expressions } = importArgNode
  if (!quasis) return trimChunkNameBaseDir(importArgNode.value)

  const baseDir = quasis[0].value.cooked
  const hasExpressions = expressions.length > 0
  const chunkName = baseDir + (hasExpressions ? '[request]' : '')
  return trimChunkNameBaseDir(chunkName)
}

function getComponentId(t, importArgNode) {
  const { quasis, expressions } = importArgNode
  if (!quasis) return importArgNode.value

  return quasis.reduce((str, quasi, i) => {
    const q = quasi.value.cooked
    const id = expressions[i] && expressions[i].name
    str += id ? `${q}\${${id}}` : q
    return str
  }, '')
}

function idOption(t, importArgNode) {
  const id = getComponentId(t, importArgNode)
  return t.objectProperty(t.identifier('id'), t.stringLiteral(id))
}

function fileOption(t, p) {
  return t.objectProperty(
    t.identifier('file'),
    t.stringLiteral(p.hub.file.opts.filename)
  )
}

function getCssOptionExpression(t, cssOptions) {
  const opts = Object.keys(cssOptions).reduce((options, option) => {
    const cssOption = cssOptions[option]
    const optionType = typeof cssOption

    if (optionType !== 'undefined') {
      const optionProperty = t.objectProperty(
        t.identifier(option),
        t[`${optionType}Literal`](cssOption)
      )

      options.push(optionProperty)
    }

    return options
  }, [])

  return t.objectExpression(opts)
}

function loadOption(t, loadTemplate, p, importArgNode, cssOptions) {
  const argPath = getImportArgPath(p)
  const chunkName = getMagicCommentChunkName(importArgNode)

  delete argPath.node.leadingComments
  argPath.addComment('leading', ` webpackChunkName: '${chunkName}' `)

  const cssOpts = getCssOptionExpression(t, cssOptions)
  const load = loadTemplate({
    IMPORT: argPath.parent,
    IMPORT_CSS: getImport(p, IMPORT_CSS_DEFAULT),
    MODULE: createTrimmedChunkName(t, importArgNode),
    CSS_OPTIONS: cssOpts
  }).expression

  return t.objectProperty(t.identifier('load'), load)
}

function pathOption(t, pathTemplate, p, importArgNode) {
  const path = pathTemplate({
    PATH: getImport(p, IMPORT_PATH_DEFAULT),
    MODULE: importArgNode
  }).expression

  return t.objectProperty(t.identifier('path'), path)
}

function resolveOption(t, resolveTemplate, importArgNode) {
  const resolve = resolveTemplate({
    MODULE: importArgNode
  }).expression

  return t.objectProperty(t.identifier('resolve'), resolve)
}

function chunkNameOption(t, chunkNameTemplate, importArgNode) {
  const chunkName = chunkNameTemplate({
    MODULE: createTrimmedChunkName(t, importArgNode)
  }).expression

  return t.objectProperty(t.identifier('chunkName'), chunkName)
}

module.exports = function universalImportPlugin({ types: t, template }) {
  const chunkNameTemplate = template('() => MODULE')
  const pathTemplate = template('() => PATH.join(__dirname, MODULE)')
  const resolveTemplate = template('() => require.resolveWeak(MODULE)')
  const loadTemplate = template(
    '() => Promise.all([IMPORT, IMPORT_CSS(MODULE, CSS_OPTIONS)]).then(proms => proms[0])'
  )

  return {
    name: 'universal-import',
    visitor: {
      Import(p) {
        if (p[visited]) return
        p[visited] = true

        const importArgNode = getImportArgPath(p).node
        const universalImport = getImport(p, IMPORT_UNIVERSAL_DEFAULT)
        const cssOptions = {
          disableWarnings: this.opts.disableWarnings
        }

        // if being used in an await statement, return load() promise
        if (
          p.parentPath.parentPath.isYieldExpression() || // await transformed already
          t.isAwaitExpression(p.parentPath.parentPath.node) // await not transformed already
        ) {
          const func = t.callExpression(universalImport, [
            loadOption(t, loadTemplate, p, importArgNode, cssOptions).value,
            t.booleanLiteral(false)
          ])

          p.parentPath.replaceWith(func)
          return
        }

        const opts = this.opts.babelServer
          ? [
            idOption(t, importArgNode),
            fileOption(t, p),
            pathOption(t, pathTemplate, p, importArgNode),
            resolveOption(t, resolveTemplate, importArgNode),
            chunkNameOption(t, chunkNameTemplate, importArgNode)
          ]
          : [
            idOption(t, importArgNode),
            fileOption(t, p),
            loadOption(t, loadTemplate, p, importArgNode, cssOptions), // only when not on a babel-server
            pathOption(t, pathTemplate, p, importArgNode),
            resolveOption(t, resolveTemplate, importArgNode),
            chunkNameOption(t, chunkNameTemplate, importArgNode)
          ]

        const options = t.objectExpression(opts)

        const func = t.callExpression(universalImport, [options])
        p.parentPath.replaceWith(func)
      }
    }
  }
}
