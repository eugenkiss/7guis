/**
* @fileoverview
* @author
* @copyright 2016 . All rights reserved.
* See LICENSE file in root directory for full license.
*/
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require('../../../lib/rules/class-property-semicolon'),

RuleTester = require('eslint').RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parser: 'babel-eslint',
});
ruleTester.run('class-property/class-property-semicolon', rule, {

  valid: [
    'class foo { bar = \'\';}',
    'class foo { bar = \'\'; batz = 1; foobar() {}}',
    {
      code: 'class foo { bar = \'\'; batz = 1; foobar() {}}',
      options: ['always'],
    },
    {
      code: 'class foo { bar = \'\'}',
      options: ['never'],
    },
  ],

  invalid: [
    {
      code: 'class foo { bar = \'\'}',
      errors: [{
        message: 'Missing semicolon.',
      }],
      options: ['always'],
    }, {
      code: 'class foo { bar = \'\'; foobar() {} batz = 1 }',
      errors: [{
        message: 'Missing semicolon.',
      }],
    },
    {
      code: 'class foo { bar = \'\'; batz = 1; foobar() {}}',
      options: ['never'],
      errors: [{
        message: 'Extranous semicolon.',
      }, {
        message: 'Extranous semicolon.',
      }],
    },
  ],
});
