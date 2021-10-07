/**
* @fileoverview Enforces semicolon after class properties
* @author marudor
* @copyright 2016 marudor. All rights reserved.
* See LICENSE file in root directory for full license.
*/
'use strict';

const message = {
  always: 'Missing semicolon.',
  never: 'Extranous semicolon.',
};

const fixer = {
  always(lastToken) {
    return function(fixer) {
      return fixer.insertTextAfter(lastToken, ';');
    };
  },
  never(lastToken) {
    return function(fixer) {
      return fixer.remove(lastToken);
    };
  },
};

function isSemicolon(token) {
  return (token.type === 'Punctuator' && token.value === ';');
}

const check = {
  always(node, lastToken) {
    return !isSemicolon(lastToken);
  },
  never(node, lastToken) {
    return isSemicolon(lastToken);
  },
};

const classProperty = function(context) {
  let mode = 'always';
  if (context.options.length) {
    if (context.options[0] === 'never') {
      mode = 'never';
    }
  }

  return {
    ClassProperty(node) {
      const lastToken = context.getLastToken(node);
      if (check[mode](node, lastToken)) {
        context.report({
          node: lastToken,
          message: message[mode],
          fix: fixer[mode](lastToken),
        });
      }
    },
  };
};
classProperty.schema = [];

// import all rules in lib/rules
module.exports = {
  meta: {
    docs: {
      description: 'Validate Class Property semicolons',
      category: 'Stylistic Issues',
    },
    fixable: 'code',
    schema: [{
      enum: ['always', 'never'],
    }],
  },
  create: classProperty,
};
