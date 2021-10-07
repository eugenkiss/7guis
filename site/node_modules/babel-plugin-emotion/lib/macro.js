'use strict';

var _index = require('./index');

var _babelUtils = require('./babel-utils');

var _babelPluginMacros = require('babel-plugin-macros');

module.exports = (0, _babelPluginMacros.createMacro)(macro);


function macro(_ref) {
  var references = _ref.references,
      state = _ref.state,
      t = _ref.babel.types;

  Object.keys(references).forEach(function (referenceKey) {
    var isPure = true;
    switch (referenceKey) {
      case 'injectGlobal':
        {
          isPure = false;
        }
      // eslint-disable-next-line no-fallthrough
      case 'css':
      case 'keyframes':
        {
          references[referenceKey].reverse().forEach(function (reference) {
            var path = reference.parentPath;
            var runtimeNode = (0, _babelUtils.buildMacroRuntimeNode)(reference, state, referenceKey, t);
            if (t.isTaggedTemplateExpression(path)) {
              (0, _index.replaceCssWithCallExpression)(path, runtimeNode, state, t, undefined, !isPure);
            } else {
              if (isPure) {
                path.addComment('leading', '#__PURE__');
              }
              reference.replaceWith(runtimeNode);
            }
          });
          break;
        }
      default:
        {
          references[referenceKey].reverse().forEach(function (reference) {
            reference.replaceWith((0, _babelUtils.buildMacroRuntimeNode)(reference, state, referenceKey, t));
          });
        }
    }
  });
  (0, _babelUtils.addRuntimeImports)(state, t);
}