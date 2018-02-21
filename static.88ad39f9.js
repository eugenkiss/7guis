(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "https://eugenkiss.github.io/7guis/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 20);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("emotion");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("@fortawesome/react-fontawesome");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Layout = exports.Heading = exports.Link = exports.FloatClear = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _templateObject = _taggedTemplateLiteral(['\n    position: sticky;\n    top: 1rem;\n    padding-left: 0.5rem;\n    border-left: 1px solid #eee;\n  '], ['\n    position: sticky;\n    top: 1rem;\n    padding-left: 0.5rem;\n    border-left: 1px solid #eee;\n  ']),
    _templateObject2 = _taggedTemplateLiteral(['\n  '], ['\n  ']),
    _templateObject3 = _taggedTemplateLiteral(['\n    margin-right: 0.5rem;\n    margin-bottom: 0.5rem;\n    padding: 0.5rem;\n    background: #f7f7f7;\n    &:hover {\n      text-decoration: none;\n      background: #eee;\n    }\n  '], ['\n    margin-right: 0.5rem;\n    margin-bottom: 0.5rem;\n    padding: 0.5rem;\n    background: #f7f7f7;\n    &:hover {\n      text-decoration: none;\n      background: #eee;\n    }\n  ']),
    _templateObject4 = _taggedTemplateLiteral(['\n    display: flex;\n    justify-content: center;\n    margin-bottom: 2rem;\n  '], ['\n    display: flex;\n    justify-content: center;\n    margin-bottom: 2rem;\n  ']),
    _templateObject5 = _taggedTemplateLiteral(['\n        flex: 0 9999 12rem;\n        @media (max-width: 47rem) {\n          display: none;\n        }\n      '], ['\n        flex: 0 9999 12rem;\n        @media (max-width: 47rem) {\n          display: none;\n        }\n      ']),
    _templateObject6 = _taggedTemplateLiteral(['\n      flex: 0 1 ', 'rem;\n      min-width: 0;\n    '], ['\n      flex: 0 1 ', 'rem;\n      min-width: 0;\n    ']),
    _templateObject7 = _taggedTemplateLiteral(['\n        display: flex;\n        flex-wrap: wrap;\n        margin-right: -0.5rem;\n        margin-bottom: -0.5rem;\n      '], ['\n        display: flex;\n        flex-wrap: wrap;\n        margin-right: -0.5rem;\n        margin-bottom: -0.5rem;\n      ']),
    _templateObject8 = _taggedTemplateLiteral(['\n    display: flex;\n    justify-content: center;\n  '], ['\n    display: flex;\n    justify-content: center;\n  ']),
    _templateObject9 = _taggedTemplateLiteral(['\n      flex: 0 1 44rem;\n      min-width: 0;\n    '], ['\n      flex: 0 1 44rem;\n      min-width: 0;\n    ']),
    _templateObject10 = _taggedTemplateLiteral(['\n        font-size: 1rem;\n        margin-left: 1rem;\n        flex: 0 0 12rem;\n        @media (max-width: 47rem) {\n          display: none;\n        }\n      '], ['\n        font-size: 1rem;\n        margin-left: 1rem;\n        flex: 0 0 12rem;\n        @media (max-width: 47rem) {\n          display: none;\n        }\n      ']);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactStatic = __webpack_require__(4);

var ReactStatic = _interopRequireWildcard(_reactStatic);

var _emotion = __webpack_require__(1);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var FloatClear = exports.FloatClear = function FloatClear() {
  return _react2.default.createElement('div', { style: { clear: 'both' } });
};

// TODO: I need the scroll hack to retain the scroll position when going back/forth
var Link = function Link(_ref) {
  var children = _ref.children,
      to = _ref.to,
      rest = _objectWithoutProperties(_ref, ['children', 'to']);

  return _react2.default.createElement(
    ReactStatic.Link,
    _extends({}, rest, {
      to: to,
      exact: true,
      onClick: function onClick() {
        return setTimeout(function () {
          return window.scrollTo(0, 0);
        }, 0);
      }
    }),
    children
  );
};

exports.Link = Link;
var Toc = function Toc(p) {
  return _react2.default.createElement(
    'div',
    {
      className: (0, _emotion.css)(_templateObject) },
    Object.values(p.toc).map(function (x) {
      return _react2.default.createElement(
        'div',
        { key: x.id },
        _react2.default.createElement(
          'a',
          { href: '#' + x.id },
          x.name
        )
      );
    })
  );
};

var Heading = exports.Heading = function Heading(p) {
  return _react2.default.createElement(
    _react.Fragment,
    null,
    _react2.default.createElement('div', { id: p.id }),
    _react2.default.createElement(
      'h2',
      {
        className: (0, _emotion.css)(_templateObject2) },
      p.name
    )
  );
};

var NavLink = function NavLink(p) {
  return _react2.default.createElement(
    Link,
    {
      to: p.to,
      activeStyle: { background: '#eee' },
      className: (0, _emotion.css)(_templateObject3) },
    p.children
  );
};

var Layout = exports.Layout = function Layout(p) {
  return _react2.default.createElement(
    _react.Fragment,
    null,
    _react2.default.createElement(
      'div',
      {
        className: (0, _emotion.css)(_templateObject4) },
      p.toc && _react2.default.createElement('div', {
        className: (0, _emotion.css)(_templateObject5) }),
      _react2.default.createElement(
        'div',
        {
          className: (0, _emotion.css)(_templateObject6, p.toc != null ? 57 : 44) },
        _react2.default.createElement(
          'div',
          {
            className: (0, _emotion.css)(_templateObject7) },
          _react2.default.createElement(
            NavLink,
            { to: '/' },
            '7GUIs'
          ),
          _react2.default.createElement(
            NavLink,
            { to: '/tasks' },
            'Tasks'
          ),
          _react2.default.createElement(
            NavLink,
            { to: '/dimensions' },
            'Dimensions'
          ),
          _react2.default.createElement(
            NavLink,
            { to: '/implementations' },
            'Code'
          ),
          _react2.default.createElement(
            NavLink,
            { to: '/contributing' },
            'Contributing'
          ),
          _react2.default.createElement(
            NavLink,
            { to: '/more' },
            'More'
          )
        )
      )
    ),
    _react2.default.createElement(
      'div',
      {
        className: (0, _emotion.css)(_templateObject8) },
      p.toc && _react2.default.createElement('div', {
        className: (0, _emotion.css)(_templateObject5) }),
      _react2.default.createElement(
        'div',
        {
          className: (0, _emotion.css)(_templateObject9) },
        p.children
      ),
      p.toc && _react2.default.createElement(
        'div',
        {
          className: (0, _emotion.css)(_templateObject10) },
        _react2.default.createElement(Toc, { toc: p.toc })
      )
    )
  );
};

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("react-static");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cacheProm = exports.loadFromPromiseCache = exports.cacheExport = exports.loadFromCache = exports.callForString = exports.createElement = exports.findExport = exports.resolveExport = exports.requireById = exports.tryRequire = exports.DefaultError = exports.DefaultLoading = exports.babelInterop = exports.isWebpack = exports.isServer = exports.isTest = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isTest = exports.isTest = "production" === 'test';
var isServer = exports.isServer = !(typeof window !== 'undefined' && window.document && window.document.createElement);

var isWebpack = exports.isWebpack = function isWebpack() {
  return typeof __webpack_require__ !== 'undefined';
};
var babelInterop = exports.babelInterop = function babelInterop(mod) {
  return mod && (typeof mod === 'undefined' ? 'undefined' : _typeof(mod)) === 'object' && mod.__esModule ? mod.default : mod;
};

var DefaultLoading = exports.DefaultLoading = function DefaultLoading() {
  return _react2.default.createElement(
    'div',
    null,
    'Loading...'
  );
};
var DefaultError = exports.DefaultError = function DefaultError(_ref) {
  var error = _ref.error;
  return _react2.default.createElement(
    'div',
    null,
    'Error: ',
    error && error.message
  );
};

var tryRequire = exports.tryRequire = function tryRequire(id) {
  try {
    return requireById(id);
  } catch (err) {
    // warn if there was an error while requiring the chunk during development
    // this can sometimes lead the server to render the loading component.
    if (false) {
      console.warn('chunk not available for synchronous require yet: ' + id + ': ' + err.message, err.stack);
    }
  }

  return null;
};

var requireById = exports.requireById = function requireById(id) {
  if (!isWebpack() && typeof id === 'string') {
    return module.require(id);
  }

  return __webpack_require__(id);
};

var resolveExport = exports.resolveExport = function resolveExport(mod, key, onLoad, chunkName, props, context, modCache) {
  var isSync = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : false;

  var exp = findExport(mod, key);
  if (onLoad && mod) {
    var _isServer = typeof window === 'undefined';
    var info = { isServer: _isServer, isSync: isSync };
    onLoad(mod, info, props, context);
  }
  if (chunkName && exp) cacheExport(exp, chunkName, props, modCache);
  return exp;
};

var findExport = exports.findExport = function findExport(mod, key) {
  if (typeof key === 'function') {
    return key(mod);
  } else if (key === null) {
    return mod;
  }

  return mod && (typeof mod === 'undefined' ? 'undefined' : _typeof(mod)) === 'object' && key ? mod[key] : babelInterop(mod);
};

var createElement = exports.createElement = function createElement(Component, props) {
  return _react2.default.isValidElement(Component) ? _react2.default.cloneElement(Component, props) : _react2.default.createElement(Component, props);
};

var callForString = exports.callForString = function callForString(strFun, props) {
  return typeof strFun === 'function' ? strFun(props) : strFun;
};

var loadFromCache = exports.loadFromCache = function loadFromCache(chunkName, props, modCache) {
  return !isServer && modCache[callForString(chunkName, props)];
};

var cacheExport = exports.cacheExport = function cacheExport(exp, chunkName, props, modCache) {
  return modCache[callForString(chunkName, props)] = exp;
};

var loadFromPromiseCache = exports.loadFromPromiseCache = function loadFromPromiseCache(chunkName, props, promisecache) {
  return promisecache[callForString(chunkName, props)];
};

var cacheProm = exports.cacheProm = function cacheProm(pr, chunkName, props, promisecache) {
  return promisecache[callForString(chunkName, props)] = pr;
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)(module)))

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['\n    width: 24%;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    margin-bottom: 0.5rem;\n    padding: 1rem;\n    background: #f7f7f7;\n    &:hover {\n      text-decoration: none;\n      background: #eee;\n    }\n    @media (max-width: 40rem) {\n      width: 49%;\n    }\n    '], ['\n    width: 24%;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    margin-bottom: 0.5rem;\n    padding: 1rem;\n    background: #f7f7f7;\n    &:hover {\n      text-decoration: none;\n      background: #eee;\n    }\n    @media (max-width: 40rem) {\n      width: 49%;\n    }\n    ']),
    _templateObject2 = _taggedTemplateLiteral(['\n      margin-top: 1rem;\n      font-size: 1rem;\n      text-align: center;\n    '], ['\n      margin-top: 1rem;\n      font-size: 1rem;\n      text-align: center;\n    ']),
    _templateObject3 = _taggedTemplateLiteral(['\n    margin-top: 2rem;\n    display: flex;\n    flex-wrap: wrap;\n    align-items: stretch;\n    justify-content: space-between;\n  '], ['\n    margin-top: 2rem;\n    display: flex;\n    flex-wrap: wrap;\n    align-items: stretch;\n    justify-content: space-between;\n  ']);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _emotion = __webpack_require__(1);

var _reactFontawesome = __webpack_require__(2);

var _reactFontawesome2 = _interopRequireDefault(_reactFontawesome);

var _faTasks = __webpack_require__(9);

var _faTasks2 = _interopRequireDefault(_faTasks);

var _faExpandArrowsAlt = __webpack_require__(10);

var _faExpandArrowsAlt2 = _interopRequireDefault(_faExpandArrowsAlt);

var _faCode = __webpack_require__(11);

var _faCode2 = _interopRequireDefault(_faCode);

var _faPlusCircle = __webpack_require__(12);

var _faPlusCircle2 = _interopRequireDefault(_faPlusCircle);

var _faEllipsisH = __webpack_require__(13);

var _faEllipsisH2 = _interopRequireDefault(_faEllipsisH);

var _shared = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var challengesHref = 'https://medium.com/@eugenkiss/challenges-in-gui-programming-65d360466e3f';

var Button = function Button(p) {
  return _react2.default.createElement(
    _shared.Link,
    {
      to: p.to,
      className: (0, _emotion.css)(_templateObject) },
    _react2.default.createElement(_reactFontawesome2.default, { size: '3x', icon: p.icon }),
    _react2.default.createElement(
      'span',
      {
        className: (0, _emotion.css)(_templateObject2) },
      p.text
    )
  );
};

// noinspection JSUnusedGlobalSymbols

exports.default = function () {
  return _react2.default.createElement(
    _shared.Layout,
    null,
    _react2.default.createElement(
      'h1',
      null,
      '7GUIs: A GUI Programming Benchmark'
    ),
    _react2.default.createElement(
      'p',
      null,
      'There are countless GUI toolkits in different languages and with diverse approaches to GUI development. Yet, diligent comparisons between them are rare. Whereas in a traditional benchmark competing implementations are compared in terms of their resource consumption, here implementations are compared in terms of their notation. To that end, 7GUIs defines',
      ' ',
      _react2.default.createElement(
        _shared.Link,
        { to: '/tasks' },
        'seven tasks'
      ),
      ' ',
      'that represent typical challenges in GUI programming. In addition, 7GUIs provides a recommended',
      ' ',
      _react2.default.createElement(
        _shared.Link,
        { to: '/dimensions' },
        'set of evaluation dimensions'
      ),
      '.'
    ),
    _react2.default.createElement(
      'p',
      null,
      'One might wonder why such a project is useful. First, GUI programming is in fact ',
      _react2.default.createElement(
        'a',
        { target: '_blank', href: challengesHref },
        'not an easy task'
      ),
      '. 7GUIs may help in identifying and propagating',
      ' ',
      _react2.default.createElement(
        _shared.Link,
        { to: '/implementations' },
        'better approaches'
      ),
      ' ',
      'to GUI programming, ultimately pushing programming forward. Second, alternative approaches to GUI programming and programming in general gained in popularity. Understanding the advantages and disadvantages of these alternatives versus the traditional OOP & MVC GUI development approach is interesting. Finally, there was no widely used set of tasks which represent typical GUI programming challenges when 7GUIs was conceived (2014).'
    ),
    _react2.default.createElement(
      'div',
      {
        className: (0, _emotion.css)(_templateObject3) },
      _react2.default.createElement(Button, { to: '/tasks', icon: _faTasks2.default, text: 'The 7 Tasks' }),
      _react2.default.createElement(Button, { to: '/dimensions', icon: _faExpandArrowsAlt2.default, text: 'Dimensions' }),
      _react2.default.createElement(Button, { to: '/implementations', icon: _faCode2.default, text: 'Implementations' }),
      _react2.default.createElement(Button, { to: '/contributing', icon: _faPlusCircle2.default, text: 'Contributing' }),
      _react2.default.createElement(Button, { to: '/more', icon: _faEllipsisH2.default, text: 'More' })
    )
  );
};

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("@fortawesome/fontawesome-free-solid/faTasks");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("@fortawesome/fontawesome-free-solid/faExpandArrowsAlt");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("@fortawesome/fontawesome-free-solid/faCode");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("@fortawesome/fontawesome-free-solid/faPlusCircle");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("@fortawesome/fontawesome-free-solid/faEllipsisH");

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['\n    margin-top: -6px;\n    margin-left: -10px;\n    margin-right: 8px;\n    margin-bottom: -2px;\n    float: left;\n    @media (max-width: 47rem) {\n      float: none;\n      max-width: 100%;\n      margin: 0;\n      margin-left: -10px;\n    }\n  '], ['\n    margin-top: -6px;\n    margin-left: -10px;\n    margin-right: 8px;\n    margin-bottom: -2px;\n    float: left;\n    @media (max-width: 47rem) {\n      float: none;\n      max-width: 100%;\n      margin: 0;\n      margin-left: -10px;\n    }\n  ']);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _emotion = __webpack_require__(1);

var _reactFontawesome = __webpack_require__(2);

var _reactFontawesome2 = _interopRequireDefault(_reactFontawesome);

var _faTasks = __webpack_require__(9);

var _faTasks2 = _interopRequireDefault(_faTasks);

var _shared = __webpack_require__(3);

var _counter = __webpack_require__(32);

var _counter2 = _interopRequireDefault(_counter);

var _tempconv = __webpack_require__(33);

var _tempconv2 = _interopRequireDefault(_tempconv);

var _bookflight = __webpack_require__(34);

var _bookflight2 = _interopRequireDefault(_bookflight);

var _timer = __webpack_require__(35);

var _timer2 = _interopRequireDefault(_timer);

var _crud = __webpack_require__(36);

var _crud2 = _interopRequireDefault(_crud);

var _circledraw = __webpack_require__(37);

var _circledraw2 = _interopRequireDefault(_circledraw);

var _cells = __webpack_require__(38);

var _cells2 = _interopRequireDefault(_cells);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var mobxHref = 'https://eugenkiss.github.io/7guis-React-TypeScript-MobX/';
var scalaTempConvHref = 'https://www.artima.com/pins1ed/gui-programming.html#32.4';
var sodiumFlightHref = 'http://blog.reactiveprogramming.org/?p=21';
var crossingStateLinesHref = 'http://cs.brown.edu/~sk/Publications/Papers/Published/ick-adapt-oo-fwk-frp/paper.pdf';
var frpHref = 'http://apfelmus.nfshost.com/blog/2012/03/29-frp-three-principles-bidirectional-gui.html';
var dialogControlHref = 'http://ceur-ws.org/Vol-610/paper11.pdf';
var scellsHref = 'https://www.artima.com/pins1ed/the-scells-spreadsheet.html';

var Img = function Img(p) {
  return _react2.default.createElement('img', {
    src: p.src,
    className: (0, _emotion.css)(_templateObject)
  });
};

var toc = {
  counter: { id: 'counter', name: 'Counter' },
  temp: { id: 'temp', name: 'Temperature Converter' },
  flight: { id: 'flight', name: 'Flight Booker' },
  timer: { id: 'timer', name: 'Timer' },
  crud: { id: 'crud', name: 'CRUD' },
  circle: { id: 'circle', name: 'Circle Drawer' },
  cells: { id: 'cells', name: 'Cells' }

  // noinspection JSUnusedGlobalSymbols
};
exports.default = function () {
  return _react2.default.createElement(
    _shared.Layout,
    { toc: toc },
    _react2.default.createElement(
      'h1',
      { id: '7tasks' },
      'The 7 Tasks ',
      _react2.default.createElement(
        'sup',
        null,
        _react2.default.createElement(_reactFontawesome2.default, { size: 'xs', icon: _faTasks2.default })
      )
    ),
    _react2.default.createElement(
      'p',
      null,
      'The tasks were selected by the following criteria. The task set should be as small as possible yet reflect as many typical (or fundamental or representative) challenges in GUI programming as possible. Each task should be as simple and self-contained as possible yet not too artificial. Preferably, a task should be based on existing examples as that gives the task more justification to be useful and there already will be at least one reference implementation.'
    ),
    _react2.default.createElement(
      'p',
      null,
      'Below, a description of each task highlighted with the challenges it reflects and a screenshot of the resulting GUI application in Java/Swing is given.'
    ),
    _react2.default.createElement(
      'p',
      null,
      'For a live version of the tasks see my',
      ' ',
      _react2.default.createElement(
        'a',
        { target: '_blank', href: mobxHref },
        'React/MobX'
      ),
      ' ',
      'implementation.'
    ),
    _react2.default.createElement(_shared.Heading, toc.counter),
    _react2.default.createElement(
      'p',
      null,
      _react2.default.createElement(
        'em',
        null,
        'Challenge:'
      ),
      ' Understanding the basic ideas of a language/toolkit.'
    ),
    _react2.default.createElement(Img, { src: _counter2.default }),
    _react2.default.createElement(
      'p',
      null,
      'The task is to build a frame containing a label or read-only textfield',
      ' ',
      _react2.default.createElement(
        'em',
        null,
        'T'
      ),
      ' and a button ',
      _react2.default.createElement(
        'em',
        null,
        'B'
      ),
      '. Initially, the value in ',
      _react2.default.createElement(
        'em',
        null,
        'T'
      ),
      ' is \u201C0\u201D and each click of ',
      _react2.default.createElement(
        'em',
        null,
        'B'
      ),
      ' increases the value in ',
      _react2.default.createElement(
        'em',
        null,
        'T'
      ),
      ' by one.'
    ),
    _react2.default.createElement(
      'p',
      null,
      'Counter serves as a gentle introduction to the basics of the language, paradigm and toolkit for one of the simplest GUI applications imaginable. Thus, Counter reveals the required scaffolding and how the very basic features work together to build a GUI application. A good solution will have almost no scaffolding.'
    ),
    _react2.default.createElement(_shared.FloatClear, null),
    _react2.default.createElement(_shared.Heading, toc.temp),
    _react2.default.createElement(
      'p',
      null,
      _react2.default.createElement(
        'em',
        null,
        'Challenges:'
      ),
      ' bidirectional data flow, user-provided text input.'
    ),
    _react2.default.createElement(Img, { src: _tempconv2.default }),
    _react2.default.createElement(
      'p',
      null,
      'The task is to build a frame containing two textfields ',
      _react2.default.createElement(
        'em',
        null,
        'T',
        _react2.default.createElement(
          'sub',
          null,
          'C'
        )
      ),
      ' ',
      'and ',
      _react2.default.createElement(
        'em',
        null,
        'T',
        _react2.default.createElement(
          'sub',
          null,
          'F'
        )
      ),
      ' representing the temperature in Celsius and Fahrenheit, respectively. Initially, both ',
      _react2.default.createElement(
        'em',
        null,
        'T',
        _react2.default.createElement(
          'sub',
          null,
          'C'
        )
      ),
      ' and ',
      _react2.default.createElement(
        'em',
        null,
        'T',
        _react2.default.createElement(
          'sub',
          null,
          'F'
        )
      ),
      ' are empty. When the user enters a numerical value into ',
      _react2.default.createElement(
        'em',
        null,
        'T',
        _react2.default.createElement(
          'sub',
          null,
          'C'
        )
      ),
      ' the corresponding value in ',
      _react2.default.createElement(
        'em',
        null,
        'T',
        _react2.default.createElement(
          'sub',
          null,
          'F'
        )
      ),
      ' is automatically updated and vice versa. When the user enters a non-numerical string into ',
      _react2.default.createElement(
        'em',
        null,
        'T',
        _react2.default.createElement(
          'sub',
          null,
          'C'
        )
      ),
      ' the value in ',
      _react2.default.createElement(
        'em',
        null,
        'T',
        _react2.default.createElement(
          'sub',
          null,
          'F'
        )
      ),
      ' is ',
      _react2.default.createElement(
        'em',
        null,
        'not'
      ),
      ' updated and vice versa. The formula for converting a temperature ',
      _react2.default.createElement(
        'em',
        null,
        'C'
      ),
      ' in Celsius into a temperature ',
      _react2.default.createElement(
        'em',
        null,
        'F'
      ),
      ' in Fahrenheit is ',
      _react2.default.createElement(
        'em',
        null,
        'C = (F - 32) * (5/9)'
      ),
      ' and the dual direction is ',
      _react2.default.createElement(
        'em',
        null,
        'F = C * (9/5) + 32'
      ),
      '.'
    ),
    _react2.default.createElement(
      'p',
      null,
      'Temperature Converter increases the complexity of Counter by having bidirectional data flow between the Celsius and Fahrenheit inputs and the need to check the user input for validity. A good solution will make the bidirectional dependency very clear with minimal boilerplate code.'
    ),
    _react2.default.createElement(
      'p',
      null,
      'Temperature Converter is inspired by the',
      ' ',
      _react2.default.createElement(
        'a',
        { target: '_blank', href: scalaTempConvHref },
        'Celsius/Fahrenheit converter'
      ),
      ' ',
      'from the book ',
      _react2.default.createElement(
        'em',
        null,
        'Programming in Scala'
      ),
      '. It is such a widespread example\u2014sometimes also in the form of a currency converter\u2014that one could give a thousand references. The same is true for the Counter task.'
    ),
    _react2.default.createElement(_shared.FloatClear, null),
    _react2.default.createElement(_shared.Heading, toc.flight),
    _react2.default.createElement(
      'p',
      null,
      _react2.default.createElement(
        'em',
        null,
        'Challenge:'
      ),
      ' Constraints.'
    ),
    _react2.default.createElement(Img, { src: _bookflight2.default }),
    _react2.default.createElement(
      'p',
      null,
      'The task is to build a frame containing a combobox ',
      _react2.default.createElement(
        'em',
        null,
        'C'
      ),
      ' with the two options \u201Cone-way flight\u201D and \u201Creturn flight\u201D, two textfields ',
      _react2.default.createElement(
        'em',
        null,
        'T',
        _react2.default.createElement(
          'sub',
          null,
          '1'
        )
      ),
      ' and',
      ' ',
      _react2.default.createElement(
        'em',
        null,
        'T',
        _react2.default.createElement(
          'sub',
          null,
          '2'
        )
      ),
      ' representing the start and return date, respectively, and a button ',
      _react2.default.createElement(
        'em',
        null,
        'B'
      ),
      ' for submitting the selected flight. ',
      _react2.default.createElement(
        'em',
        null,
        'T',
        _react2.default.createElement(
          'sub',
          null,
          '2'
        )
      ),
      ' is enabled iff ',
      _react2.default.createElement(
        'em',
        null,
        'C'
      ),
      '\u2019s value is \u201Creturn flight\u201D. When ',
      _react2.default.createElement(
        'em',
        null,
        'C'
      ),
      ' has the value \u201Creturn flight\u201D and ',
      _react2.default.createElement(
        'em',
        null,
        'T',
        _react2.default.createElement(
          'sub',
          null,
          '2'
        )
      ),
      '\u2019s date is strictly before ',
      _react2.default.createElement(
        'em',
        null,
        'T',
        _react2.default.createElement(
          'sub',
          null,
          '1'
        )
      ),
      '\u2019s then ',
      _react2.default.createElement(
        'em',
        null,
        'B'
      ),
      ' is disabled. When a non-disabled textfield ',
      _react2.default.createElement(
        'em',
        null,
        'T'
      ),
      ' has an ill-formatted date then ',
      _react2.default.createElement(
        'em',
        null,
        'T'
      ),
      ' is colored red and ',
      _react2.default.createElement(
        'em',
        null,
        'B'
      ),
      ' is disabled. When clicking ',
      _react2.default.createElement(
        'em',
        null,
        'B'
      ),
      ' a message is displayed informing the user of his selection (e.g. \u201CYou have booked a one-way flight on 04.04.2014.\u201D). Initially, ',
      _react2.default.createElement(
        'em',
        null,
        'C'
      ),
      ' has the value \u201Cone-way flight\u201D and ',
      _react2.default.createElement(
        'em',
        null,
        'T',
        _react2.default.createElement(
          'sub',
          null,
          '1'
        )
      ),
      ' as well as ',
      _react2.default.createElement(
        'em',
        null,
        'T',
        _react2.default.createElement(
          'sub',
          null,
          '2'
        )
      ),
      ' have the same (arbitrary) date (it is implied that ',
      _react2.default.createElement(
        'em',
        null,
        'T',
        _react2.default.createElement(
          'sub',
          null,
          '2'
        )
      ),
      ' is disabled).'
    ),
    _react2.default.createElement(
      'p',
      null,
      'The focus of Flight Booker lies on modelling constraints between widgets on the one hand and modelling constraints within a widget on the other hand. Such constraints are very common in everyday interactions with GUI applications. A good solution for Flight Booker will make the constraints clear, succinct and explicit in the source code and not hidden behind a lot of scaffolding.'
    ),
    _react2.default.createElement(
      'p',
      null,
      'Flight Booker is directly inspired by the',
      ' ',
      _react2.default.createElement(
        'a',
        { target: '_blank', href: sodiumFlightHref },
        'Flight Booking Java example in Sodium'
      ),
      ' ',
      'with the simplification of using textfields for date input instead of specialized date picking widgets as the focus of Flight Booker is not on specialized/custom widgets.'
    ),
    _react2.default.createElement(_shared.FloatClear, null),
    _react2.default.createElement(_shared.Heading, toc.timer),
    _react2.default.createElement(
      'p',
      null,
      _react2.default.createElement(
        'em',
        null,
        'Challenges:'
      ),
      ' concurrency, competing user/signal interactions, responsiveness.'
    ),
    _react2.default.createElement(Img, { src: _timer2.default }),
    _react2.default.createElement(
      'p',
      null,
      'The task is to build a frame containing a gauge ',
      _react2.default.createElement(
        'em',
        null,
        'G'
      ),
      ' for the elapsed time ',
      _react2.default.createElement(
        'em',
        null,
        'e'
      ),
      ', a label which shows the elapsed time as a numerical value, a slider ',
      _react2.default.createElement(
        'em',
        null,
        'S'
      ),
      ' by which the duration ',
      _react2.default.createElement(
        'em',
        null,
        'd'
      ),
      ' of the timer can be adjusted while the timer is running and a reset button ',
      _react2.default.createElement(
        'em',
        null,
        'R'
      ),
      '. Adjusting',
      ' ',
      _react2.default.createElement(
        'em',
        null,
        'S'
      ),
      ' must immediately reflect on ',
      _react2.default.createElement(
        'em',
        null,
        'd'
      ),
      ' and not only when',
      ' ',
      _react2.default.createElement(
        'em',
        null,
        'S'
      ),
      ' is released. It follows that while moving ',
      _react2.default.createElement(
        'em',
        null,
        'S'
      ),
      ' the filled amount of ',
      _react2.default.createElement(
        'em',
        null,
        'G'
      ),
      ' will (usually) change immediately. When ',
      _react2.default.createElement(
        'em',
        null,
        'e \u2265 d'
      ),
      ' is true then the timer stops (and ',
      _react2.default.createElement(
        'em',
        null,
        'G'
      ),
      ' will be full). If, thereafter, ',
      _react2.default.createElement(
        'em',
        null,
        'd'
      ),
      ' is increased such that ',
      _react2.default.createElement(
        'em',
        null,
        'd > e'
      ),
      ' will be true then the timer restarts to tick until ',
      _react2.default.createElement(
        'em',
        null,
        'e \u2265 d'
      ),
      ' is true again. Clicking ',
      _react2.default.createElement(
        'em',
        null,
        'R'
      ),
      ' will reset ',
      _react2.default.createElement(
        'em',
        null,
        'e'
      ),
      ' to zero.'
    ),
    _react2.default.createElement(
      'p',
      null,
      'Timer deals with concurrency in the sense that a timer process that updates the elapsed time runs concurrently to the user\u2019s interactions with the GUI application. This also means that the solution to competing user and signal interactions is tested. The fact that slider adjustments must be reflected immediately moreover tests the responsiveness of the solution. A good solution will make it clear that the signal is a timer tick and, as always, has not much scaffolding.'
    ),
    _react2.default.createElement(
      'p',
      null,
      'Timer is directly inspired by the timer example in the paper',
      ' ',
      _react2.default.createElement(
        'a',
        { target: '_blank', href: crossingStateLinesHref },
        'Crossing State Lines: Adapting Object-Oriented Frameworks to Functional Reactive Languages'
      ),
      '.'
    ),
    _react2.default.createElement(_shared.FloatClear, null),
    _react2.default.createElement(_shared.Heading, toc.crud),
    _react2.default.createElement(
      'p',
      null,
      _react2.default.createElement(
        'em',
        null,
        'Challenges:'
      ),
      ' separating the domain and presentation logic, managing mutation, building a non-trivial layout.'
    ),
    _react2.default.createElement(Img, { src: _crud2.default }),
    _react2.default.createElement(
      'p',
      null,
      'The task is to build a frame containing the following elements: a textfield',
      ' ',
      _react2.default.createElement(
        'em',
        null,
        'T',
        _react2.default.createElement(
          'sub',
          null,
          'prefix'
        )
      ),
      ', a pair of textfields ',
      _react2.default.createElement(
        'em',
        null,
        'T',
        _react2.default.createElement(
          'sub',
          null,
          'name'
        )
      ),
      ' and',
      ' ',
      _react2.default.createElement(
        'em',
        null,
        'T',
        _react2.default.createElement(
          'sub',
          null,
          'surname'
        )
      ),
      ', a listbox ',
      _react2.default.createElement(
        'em',
        null,
        'L'
      ),
      ', buttons ',
      _react2.default.createElement(
        'em',
        null,
        'B',
        _react2.default.createElement(
          'sub',
          null,
          'C'
        )
      ),
      ',',
      ' ',
      _react2.default.createElement(
        'em',
        null,
        'B',
        _react2.default.createElement(
          'sub',
          null,
          'U'
        )
      ),
      ' and ',
      _react2.default.createElement(
        'em',
        null,
        'B',
        _react2.default.createElement(
          'sub',
          null,
          'D'
        )
      ),
      ' and the three labels as seen in the screenshot. ',
      _react2.default.createElement(
        'em',
        null,
        'L'
      ),
      ' presents a view of the data in the database that consists of a list of names. At most one entry can be selected in ',
      _react2.default.createElement(
        'em',
        null,
        'L'
      ),
      ' at a time. By entering a string into ',
      _react2.default.createElement(
        'em',
        null,
        'T',
        _react2.default.createElement(
          'sub',
          null,
          'prefix'
        )
      ),
      ' the user can filter the names whose surname start with the entered prefix\u2014this should happen immediately without having to submit the prefix with enter. Clicking ',
      _react2.default.createElement(
        'em',
        null,
        'B',
        _react2.default.createElement(
          'sub',
          null,
          'C'
        )
      ),
      ' ',
      'will append the resulting name from concatenating the strings in',
      ' ',
      _react2.default.createElement(
        'em',
        null,
        'T',
        _react2.default.createElement(
          'sub',
          null,
          'name'
        )
      ),
      ' and ',
      _react2.default.createElement(
        'em',
        null,
        'T',
        _react2.default.createElement(
          'sub',
          null,
          'surname'
        )
      ),
      ' to ',
      _react2.default.createElement(
        'em',
        null,
        'L'
      ),
      '.',
      ' ',
      _react2.default.createElement(
        'em',
        null,
        'B',
        _react2.default.createElement(
          'sub',
          null,
          'U'
        )
      ),
      ' and ',
      _react2.default.createElement(
        'em',
        null,
        'B',
        _react2.default.createElement(
          'sub',
          null,
          'D'
        )
      ),
      ' are enabled iff an entry in ',
      _react2.default.createElement(
        'em',
        null,
        'L'
      ),
      ' is selected. In contrast to ',
      _react2.default.createElement(
        'em',
        null,
        'B',
        _react2.default.createElement(
          'sub',
          null,
          'C'
        )
      ),
      ', ',
      _react2.default.createElement(
        'em',
        null,
        'B',
        _react2.default.createElement(
          'sub',
          null,
          'U'
        )
      ),
      ' ',
      'will not append the resulting name but instead replace the selected entry with the new name. ',
      _react2.default.createElement(
        'em',
        null,
        'B',
        _react2.default.createElement(
          'sub',
          null,
          'D'
        )
      ),
      ' will remove the selected entry. The layout is to be done like suggested in the screenshot. In particular, ',
      _react2.default.createElement(
        'em',
        null,
        'L'
      ),
      ' must occupy all the remaining space.'
    ),
    _react2.default.createElement(
      'p',
      null,
      'CRUD (Create, Read, Update and Delete) represents a typical graphical business application. The primary challenge is the separation of domain and presentation logic in the source code that is more or less forced on the implementer due to the ability to filter the view by a prefix. Traditionally, some form of MVC pattern is used to achieve the separation of domain and presentation logic. Also, the approach to managing the mutation of the list of names is tested. A good solution will have a good separation between the domain and presentation logic without much overhead (e.g. in the form of toolkit specific concepts or language/paradigm concepts), a mutation management that is fast but not error-prone and a natural representation of the layout (layout builders are allowed, of course, but would increase the overhead).'
    ),
    _react2.default.createElement(
      'p',
      null,
      'CRUD is directly inspired by the crud example in the blog post',
      ' ',
      _react2.default.createElement(
        'a',
        { target: '_blank', href: frpHref },
        'FRP - Three principles for GUI elements with bidirectional data flow'
      ),
      '.'
    ),
    _react2.default.createElement(_shared.FloatClear, null),
    _react2.default.createElement(_shared.Heading, toc.circle),
    _react2.default.createElement(
      'p',
      null,
      _react2.default.createElement(
        'em',
        null,
        'Challenges:'
      ),
      ' undo/redo, custom drawing, dialog control*.'
    ),
    _react2.default.createElement(Img, { src: _circledraw2.default }),
    _react2.default.createElement(
      'p',
      null,
      'The task is to build a frame containing an undo and redo button as well as a canvas area underneath. Left-clicking inside an empty area inside the canvas will create an unfilled circle with a fixed diameter whose center is the left-clicked point. The circle nearest to the mouse pointer such that the distance from its center to the pointer is less than its radius, if it exists, is filled with the color gray. The gray circle is the selected circle ',
      _react2.default.createElement(
        'em',
        null,
        'C'
      ),
      '. Right-clicking ',
      _react2.default.createElement(
        'em',
        null,
        'C'
      ),
      ' will make a popup menu appear with one entry \u201CAdjust diameter..\u201D. Clicking on this entry will open another frame with a slider inside that adjusts the diameter of ',
      _react2.default.createElement(
        'em',
        null,
        'C'
      ),
      '. Changes are applied immediately. Closing this frame will mark the last diameter as significant for the undo/redo history. Clicking undo will undo the last significant change (i.e. circle creation or diameter adjustment). Clicking redo will reapply the last undoed change unless new changes were made by the user in the meantime.'
    ),
    _react2.default.createElement(
      'p',
      null,
      'Circle Drawer\u2019s goal is, among other things, to test how good the common challenge of implementing an undo/redo functionality for a GUI application can be solved. In an ideal solution the undo/redo functionality comes for free resp. just comes out as a natural consequence of the language / toolkit / paradigm. Moreover, Circle Drawer tests how dialog control*, i.e. keeping the relevant context between several successive GUI interaction steps, is achieved in the source code. Last but not least, the ease of custom drawing is tested.'
    ),
    _react2.default.createElement(
      'p',
      null,
      _react2.default.createElement(
        'small',
        null,
        '* Dialog control is explained in more detail in the paper',
        ' ',
        _react2.default.createElement(
          'a',
          { target: '_blank', href: dialogControlHref },
          'Developing GUI Applications: Architectural Patterns Revisited'
        ),
        ' ',
        'starting on page seven. The term describes the challenge of retaining context between successive GUI operations.'
      )
    ),
    _react2.default.createElement(_shared.FloatClear, null),
    _react2.default.createElement(_shared.Heading, toc.cells),
    _react2.default.createElement(
      'p',
      null,
      _react2.default.createElement(
        'em',
        null,
        'Challenges:'
      ),
      ' change propagation, widget customization, implementing a more authentic/involved GUI application.'
    ),
    _react2.default.createElement(Img, { src: _cells2.default }),
    _react2.default.createElement(
      'p',
      null,
      'The task is to create a simple but usable spreadsheet application. The spreadsheet should be scrollable. The rows should be numbered from 0 to 99 and the columns from A to Z. Double-clicking a cell ',
      _react2.default.createElement(
        'em',
        null,
        'C'
      ),
      ' lets the user change ',
      _react2.default.createElement(
        'em',
        null,
        'C'
      ),
      '\u2019s formula. After having finished editing the formula is parsed and evaluated and its updated value is shown in ',
      _react2.default.createElement(
        'em',
        null,
        'C'
      ),
      '. In addition, all cells which depend on ',
      _react2.default.createElement(
        'em',
        null,
        'C'
      ),
      ' must be reevaluated. This process repeats until there are no more changes in the values of any cell (change propagation). Note that one should not just recompute the value of every cell but only of those cells that depend on another cell\u2019s changed value. If there is an already provided spreadsheet widget it should not be used. Instead, another similar widget (like JTable in Swing) should be customized to become a reusable spreadsheet widget.'
    ),
    _react2.default.createElement(
      'p',
      null,
      'Cells is a more authentic and involved task that tests if a particular approach also scales to a somewhat bigger application. The two primary GUI-related challenges are intelligent propagation of changes and widget customization. Admittedly, there is a substantial part that is not necessarily very GUI-related but that is just the nature of a more authentic challenge. A good solution\u2019s change propagation will not involve much effort and the customization of a widget should not prove too difficult. The domain-specific code is clearly separated from the GUI-specific code. The resulting spreadsheet widget is reusable.'
    ),
    _react2.default.createElement(
      'p',
      null,
      'Cells is directly inspired by the',
      ' ',
      _react2.default.createElement(
        'a',
        { target: '_blank', href: scellsHref },
        'SCells spreadsheet example'
      ),
      ' ',
      'from the book ',
      _react2.default.createElement(
        'em',
        null,
        'Programming in Scala'
      ),
      '. Please refer to the book (or the implementations in this repository) for more details especially with respect to the not directly GUI-related concerns like parsing and evaluating formulas and the precise syntax and semantics of the spreadsheet language.'
    ),
    _react2.default.createElement(_shared.FloatClear, null)
  );
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _emotion = __webpack_require__(1);

var _reactFontawesome = __webpack_require__(2);

var _reactFontawesome2 = _interopRequireDefault(_reactFontawesome);

var _faExpandArrowsAlt = __webpack_require__(10);

var _faExpandArrowsAlt2 = _interopRequireDefault(_faExpandArrowsAlt);

var _shared = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cdsHref = 'http://www.cl.cam.ac.uk/~afb21/CognitiveDimensions/';
var paper1Href = 'http://www.ppig.org/papers/15th-clarke.pdf';
var paper2Href = 'http://homepage.ntlworld.com/greenery/workStuff/Papers/AVI2000.PDF';
var paper3Href = 'http://www.ppig.org/papers/12th-kutar.pdf';
var paper4Href = 'http://ecs.victoria.ac.nz/foswiki/pub/Events/PLATEAU/Program/plateau2011-sadowski.pdf';
var thesisHref = 'https://eugenkiss.com/projects/thesis.pdf';
var fragileHref = 'https://en.wikipedia.org/wiki/Fragile_base_class';

var toc = {
  abstraction: { id: 'abstraction', name: 'Abstraction Level' },
  closeness: { id: 'closeness', name: 'Closeness of Mapping' },
  hidden: { id: 'hidden', name: 'Hidden Dependencies' },
  error: { id: 'error', name: 'Error Proneness' },
  diffuseness: { id: 'diffuseness', name: 'Diffuseness' },
  viscosity: { id: 'viscosity', name: 'Viscosity' },
  commentary: { id: 'commentary', name: 'Commentary' }
};

exports.default = function () {
  return _react2.default.createElement(
    _shared.Layout,
    { toc: toc },
    _react2.default.createElement(
      'h1',
      { id: 'dimensions' },
      'Dimensions of Evaluation ',
      _react2.default.createElement(
        'sup',
        null,
        _react2.default.createElement(_reactFontawesome2.default, { size: 'xs', icon: _faExpandArrowsAlt2.default })
      )
    ),
    _react2.default.createElement(
      'p',
      null,
      'The following dimensions of evaluation are a subset of the dimensions from the',
      ' ',
      _react2.default.createElement(
        'a',
        { target: '_blank', href: cdsHref },
        'Cognitive Dimensions of Notations (CDs)'
      ),
      ' ',
      'framework which is \u201Can approach to analysing the usability of information artefacts\u201D. CDs has been used in',
      ' ',
      _react2.default.createElement(
        'a',
        { target: '_blank', href: paper1Href },
        'a'
      ),
      ' ',
      ' ',
      _react2.default.createElement(
        'a',
        { target: '_blank', href: paper2Href },
        'variety'
      ),
      ' ',
      ' ',
      _react2.default.createElement(
        'a',
        { target: '_blank', href: paper3Href },
        'of'
      ),
      ' ',
      ' ',
      _react2.default.createElement(
        'a',
        { target: '_blank', href: paper4Href },
        'papers'
      ),
      ' ',
      'to analytically investigate the usability of programming language features or an API. Often, CDs is only applied insofar as it makes sense for a particular information artifact. That is, some of the 14 dimensions are left out and some new are added possibly. In this way, CDs can be taken as a basis for the evaluation of different solutions to the 7GUIs benchmark. The following dimensions are thus a recommended subset of CDs which turned out to work well for the analysis of',
      ' ',
      _react2.default.createElement(
        'a',
        { target: '_blank', href: thesisHref },
        'two different approaches'
      ),
      ' ',
      'to 7GUIs.'
    ),
    _react2.default.createElement(
      'p',
      null,
      'The list of dimensions is a recommendation to make it easier to get started with an analysis between different approaches to 7GUIs. Of course, you are free to use your own criteria as you see fit.'
    ),
    _react2.default.createElement(_shared.Heading, toc.abstraction),
    _react2.default.createElement(
      'em',
      null,
      'Types and availability of abstraction mechanisms'
    ),
    _react2.default.createElement(
      'p',
      null,
      'Does the system provide any way of defining new terms within the notation so that it can be extended to describe ideas more clearly? Can details be encapsulated? Does the system insist on defining new terms? What number of new high-level concepts have to be learned to make use of a system? Are they easy to use and easy to learn?'
    ),
    _react2.default.createElement(
      'p',
      null,
      'Each new idea is a barrier to learning and acceptance but can also make complex code more understandable. For example, Java Swing, the predecessor to JavaFX, employs a variation of the MVC design pattern in its general architecture and in particular for each of its widgets. Such being the case, there is a significant learning requirement to using the widgets reasonably well and often much boilerplate involved (\u201Cthe system insists on defining new terms\u201D) which does not pay off for simple applications. On the other hand, for very complex applications the MVC-architecture may make the code more understandable and manageable as details can be encapsulated in the new terms \u201CModel, View and Controller\u201D.'
    ),
    _react2.default.createElement(
      'p',
      null,
      'Another example is a function. A function has a name and, optionally, parameters as well as a body that returns a value following certain computational steps. A client can simply refer to a function by its name without knowing its implementation details. Accordingly, a function abstracts the computational process involved in the computation of a value. The learning barrier to the principle of a function is not great but it can still make a lot of code much more understandable by hiding unimportant details.'
    ),
    _react2.default.createElement(_shared.Heading, toc.closeness),
    _react2.default.createElement(
      'em',
      null,
      'Closeness of representations to domain'
    ),
    _react2.default.createElement(
      'p',
      null,
      'How closely related is the notation to the result it is describing resp. the problem domain? Which parts seem to be a particularly strange way of doing or describing something?'
    ),
    _react2.default.createElement(
      'p',
      null,
      'An example is the layout definition of a GUI. Languages that do not provide a way to describe the layout in a nested resp. hierarchical manner, and as such force the programmer to \u201Clinearize\u201D the code with the introduction of meaningless temporary variables, make it hard to see how the structure of the layout definition relates to the resulting layout of the application. Not for nothing are XML-based view specifications widespread for GUI-toolkits in languages without native support for hierarchical layout expressions.'
    ),
    _react2.default.createElement(_shared.Heading, toc.hidden),
    _react2.default.createElement(
      'em',
      null,
      'Important links between entities invisible'
    ),
    _react2.default.createElement(
      'p',
      null,
      'Are dependencies between entities in the notation visible or hidden? Is every dependency indicated in both directions? Could local changes have confusing global effects?'
    ),
    _react2.default.createElement(
      'p',
      null,
      'If one entity cites another entity, which in turn cites a third, changing the value of the third entity may have unexpected repercussions. The key aspect is not the fact that A depends on B, but that the dependency is not made visible. A well-known illustration of a bad case of Hidden Dependencies is the',
      ' ',
      _react2.default.createElement(
        'a',
        { target: '_blank', href: fragileHref },
        'fragile base class problem'
      ),
      '. In (complex) class hierarchies a seemingly safe modification to a base class may cause derived classes to malfunction. The IDE in general cannot help discovering such problems and only certain programming language features can help preventing them. Another example are non-local side-effects in procedures, i.e. the dependencies of a procedure with non-local side-effects are not visible in its signature.'
    ),
    _react2.default.createElement(_shared.Heading, toc.error),
    _react2.default.createElement(
      'em',
      null,
      'Notation invites mistakes'
    ),
    _react2.default.createElement(
      'p',
      null,
      'To what extent does the notation influence the likelihood of the user making a mistake? Do some things seem especially complex or difficult (e.g. when combining several things)?'
    ),
    _react2.default.createElement(
      'p',
      null,
      'In many dynamic languages with implicit definitions of variables a typing error in a variable name can suddenly lead to hard to find errors as the IDE cannot always point out such an error due to the language\u2019s dynamicity. Java\u2019s different calling semantics for primitive and reference types may lead to mistakes if the programmer mixes them up. Implicit null-initialization of variables can lead to null-pointer exceptions if the programmer forgets to correctly initialize a variable before its use.'
    ),
    _react2.default.createElement(_shared.Heading, toc.diffuseness),
    _react2.default.createElement(
      'em',
      null,
      'Verbosity of language'
    ),
    _react2.default.createElement(
      'p',
      null,
      'How many symbols or how much space does the notation require to produce a certain result or express a meaning? What sorts of things take more space to describe?'
    ),
    _react2.default.createElement(
      'p',
      null,
      'Some notations can be annoyingly long-winded, or occupy too much valuable \u201Creal-estate\u201D within a display area. In Java before version 8 in order to express what are lambdas today anonymous classes were employed. Compared to Java 8\u2019s lambdas these anonymous classes used to be a very verbose way of encoding anonymous functions especially when used in a callback-heavy setting like traditional GUI programming.'
    ),
    _react2.default.createElement(_shared.Heading, toc.viscosity),
    _react2.default.createElement(
      'em',
      null,
      'Resistance to change'
    ),
    _react2.default.createElement(
      'p',
      null,
      'Are there any inherent barriers to change in the notation? How much effort is required to make a change to a program expressed in the notation?'
    ),
    _react2.default.createElement(
      'p',
      null,
      'A viscous system needs many user actions to accomplish one goal. Changing the return type of a function might lead to many code breakages in the call sites of said function. In such a case an IDE can be of great help. Creating a conceptual two-way data-binding by means of two callbacks involves more repetition than a more direct way to define such a dependency.'
    ),
    _react2.default.createElement(_shared.Heading, toc.commentary),
    _react2.default.createElement(
      'p',
      null,
      'This part is not so much a dimension but a place to mention everything else which is noteworthy and to give a conclusion. For instance, general observations that do not fit into the above dimensions, impressions during the development process, efficiency concerns of the resulting code and potential improvements can be addressed. In addition, the responsibilities of the other dimensions\u2019 results are assigned to the paradigm, language, toolkit and the IDE.'
    )
  );
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['\n    display: flex;\n    flex-wrap: wrap;\n    justify-content: space-between;\n    @media (max-width: 40rem) {\n       display: block;\n    }\n  '], ['\n    display: flex;\n    flex-wrap: wrap;\n    justify-content: space-between;\n    @media (max-width: 40rem) {\n       display: block;\n    }\n  ']),
    _templateObject2 = _taggedTemplateLiteral(['\n        width: 47%;\n        @media (max-width: 40rem) {\n           width: 100%;\n        }\n      '], ['\n        width: 47%;\n        @media (max-width: 40rem) {\n           width: 100%;\n        }\n      ']),
    _templateObject3 = _taggedTemplateLiteral(['\n            font-size: 1.35rem;\n            font-weight: 500;\n          '], ['\n            font-size: 1.35rem;\n            font-weight: 500;\n          ']);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _emotion = __webpack_require__(1);

var _reactFontawesome = __webpack_require__(2);

var _reactFontawesome2 = _interopRequireDefault(_reactFontawesome);

var _faCode = __webpack_require__(11);

var _faCode2 = _interopRequireDefault(_faCode);

var _faFileCode = __webpack_require__(39);

var _faFileCode2 = _interopRequireDefault(_faFileCode);

var _shared = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

// noinspection JSUnusedGlobalSymbols
exports.default = function () {
  return _react2.default.createElement(
    _shared.Layout,
    null,
    _react2.default.createElement(
      'h1',
      { id: 'implementations' },
      'Implementations ',
      _react2.default.createElement(
        'sup',
        null,
        _react2.default.createElement(_reactFontawesome2.default, { size: 'xs', icon: _faCode2.default })
      )
    ),
    _react2.default.createElement(
      'div',
      {
        className: (0, _emotion.css)(_templateObject) },
      implementations.sort(function (a, b) {
        return a.title.localeCompare(b.title);
      }).map(function (x, i) {
        return _react2.default.createElement(
          'p',
          {
            key: i,
            className: (0, _emotion.css)(_templateObject2) },
          _react2.default.createElement(
            'a',
            { target: '_blank', href: x.link },
            _react2.default.createElement(
              'span',
              {
                className: (0, _emotion.css)(_templateObject3) },
              x.title
            )
          ),
          ' — ',
          _react2.default.createElement(
            'a',
            { target: '_blank', href: x.src },
            'source ',
            _react2.default.createElement(_reactFontawesome2.default, { size: 'sm', icon: _faFileCode2.default })
          ),
          x.author != null && _react2.default.createElement(
            _react2.default.Fragment,
            null,
            _react2.default.createElement('br', null),
            'Author: ',
            _react2.default.createElement(
              'a',
              { target: '_blank', href: x.authorLink },
              x.author
            )
          ),
          _react2.default.createElement('br', null),
          'Techs: ',
          x.technologies.join(', '),
          '.',
          x.notes && _react2.default.createElement(
            _react.Fragment,
            null,
            _react2.default.createElement('br', null),
            'Notes: ',
            x.notes
          )
        );
      })
    )
  );
};

var implementations = [{
  title: 'React/MobX',
  technologies: ['React', 'TypeScript', 'MobX'],
  author: 'Eugen Kiss',
  authorLink: 'https://github.com/eugenkiss/',
  link: 'https://eugenkiss.github.io/7guis-React-TypeScript-MobX/',
  src: 'https://github.com/eugenkiss/7guis-React-TypeScript-MobX'
}, {
  title: 'Java7/Swing',
  technologies: ['Java7', 'Swing'],
  author: 'Eugen Kiss',
  authorLink: 'https://github.com/eugenkiss/',
  notes: 'Reference implementation',
  link: 'https://github.com/eugenkiss/7guis-Java7-Swing',
  src: 'https://github.com/eugenkiss/7guis-Java7-Swing'
}, {
  title: 'Clojure/Seesaw',
  technologies: ['Clojure', 'Seesaw'],
  author: 'Eugen Kiss',
  authorLink: 'https://github.com/eugenkiss/',
  link: 'https://github.com/eugenkiss/7guis-Clojure-Seesaw',
  src: 'https://github.com/eugenkiss/7guis-Clojure-Seesaw'
}, {
  title: 'Java8/JavaFX|ReactFX',
  technologies: ['Java8', 'JavaFX', 'ReactFX'],
  author: 'Eugen Kiss',
  authorLink: 'https://github.com/eugenkiss/',
  link: 'https://github.com/eugenkiss/7guis-Java8-JavaFX',
  src: 'https://github.com/eugenkiss/7guis-Java8-JavaFX'
}, {
  title: 'Scala/ScalaFX|Scala.Rx|ReactFX',
  technologies: ['Scala', 'ScalaFX', 'Scala.Rx', 'ReactFX'],
  author: 'Eugen Kiss',
  authorLink: 'https://github.com/eugenkiss/',
  link: 'https://github.com/eugenkiss/7guis-Scala-ScalaFX',
  src: 'https://github.com/eugenkiss/7guis-Scala-ScalaFX'
}, {
  title: 'Elm',
  technologies: ['Elm'],
  author: 'Eugen Kiss',
  authorLink: 'https://github.com/eugenkiss/',
  notes: 'Incomplete and rather old (2014)',
  link: 'https://github.com/eugenkiss/7guis-Elm',
  src: 'https://github.com/eugenkiss/7guis-Elm'
}, {
  title: 'ClojureScript/Om',
  technologies: ['ClojureScript', 'Om'],
  author: 'Dave Clayton',
  authorLink: 'https://github.com/davedx',
  link: 'https://github.com/eugenkiss/7guis/tree/master/ClojureScript-Om',
  src: 'https://github.com/eugenkiss/7guis/tree/master/ClojureScript-Om'
}, {
  title: 'Qt5',
  technologies: ['Qt5'],
  author: 'Jean-Michaël Celerier',
  authorLink: 'https://github.com/jcelerier',
  link: 'https://github.com/eugenkiss/7guis/tree/master/Qt5',
  src: 'https://github.com/eugenkiss/7guis/tree/master/Qt5'
}, {
  title: 'C#/WinForms',
  technologies: ['C#', 'WinForms'],
  author: 'Dmitri Suvorov',
  authorLink: 'https://github.com/suvjunmd',
  link: 'https://github.com/eugenkiss/7guis/tree/master/C%23-WinForms',
  src: 'https://github.com/eugenkiss/7guis/tree/master/C%23-WinForms'
}, {
  title: 'Kotlin/TornadoFX',
  technologies: ['Kotlin', 'TornadoFX'],
  author: 'Karl',
  authorLink: 'https://github.com/KarlFish',
  link: 'https://github.com/KarlFish/7guis-tornadofx',
  src: 'https://github.com/KarlFish/7guis-tornadofx'
}, {
  title: 'GHCi GUI toolkit',
  technologies: ['Haskell', 'GHCi-GUI'],
  author: 'Péter Diviánszky',
  authorLink: 'https://github.com/divipp',
  link: 'https://github.com/divipp/lensref/wiki',
  src: 'https://github.com/divipp/lensref'
}, {
  title: 'FOAM',
  technologies: ['FOAM'],
  author: 'Kevin Glen Roy Greer',
  authorLink: 'https://github.com/kgrgreer',
  link: 'http://foam-framework.github.io/foam/foam/js/foam/demos/sevenguis/',
  src: 'http://foam-framework.github.io/foam/foam/js/foam/demos/sevenguis/'
}, {
  title: 'reflex-dom',
  technologies: ['Haskell', 'reflex-dom'],
  author: 'Moritz Drexl',
  authorLink: 'https://github.com/themoritz',
  link: 'https://github.com/themoritz/7guis-reflex',
  src: 'https://github.com/themoritz/7guis-reflex'
}, {
  title: 'Groovy/Fenja (SodiumFRP)',
  technologies: ['Groovy', 'Fenja', 'SodiumFRP'],
  author: 'Sven Reinck',
  authorLink: 'https://github.com/FLUXparticle',
  link: 'https://github.com/FLUXparticle/7guis',
  src: 'https://github.com/FLUXparticle/7guis'
}, {
  title: 'Red',
  technologies: ['Red'],
  author: 'Gregg Irwin',
  authorLink: 'https://github.com/greggirwin',
  link: 'https://github.com/greggirwin/7guis/tree/master/Red',
  src: 'https://github.com/greggirwin/7guis/tree/master/Red'
}, {
  title: 'Phix',
  technologies: ['Phix'],
  author: 'petelomax NA',
  authorLink: 'https://bitbucket.org/petelomax/',
  link: 'https://bitbucket.org/petelomax/phix/src/default/demo/rosetta/7guis/',
  src: 'https://bitbucket.org/petelomax/phix/src/default/demo/rosetta/7guis/'
}, {
  title: 'VFP',
  technologies: ['VFP'],
  author: 'Hernan Cano M',
  authorLink: 'https://github.com/jhernancanom',
  link: 'https://github.com/jhernancanom/7GUIs_VFP',
  src: 'https://github.com/jhernancanom/7GUIs_VFP'
}, {
  title: 'Vanilla React',
  technologies: ['React'],
  author: 'Andrew Greenh',
  authorLink: 'https://github.com/andreasgruenh',
  link: 'https://andreasgruenh.github.io/7guis/#/counter',
  src: 'https://github.com/andreasgruenh/7guis'
}, {
  title: 'Svelte',
  technologies: ['Svelte', 'JavaScript'],
  author: 'Rich Harris',
  authorLink: 'https://github.com/Rich-Harris',
  link: 'https://svelte.technology/repl',
  src: 'https://github.com/sveltejs/svelte.technology/tree/master/content/examples'
}, {
  title: 'Tcl/Tk',
  technologies: ['Tcl', 'Tk'],
  link: 'http://wiki.tcl.tk/41121',
  src: 'http://wiki.tcl.tk/41121'
}];

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactFontawesome = __webpack_require__(2);

var _reactFontawesome2 = _interopRequireDefault(_reactFontawesome);

var _faPlusCircle = __webpack_require__(12);

var _faPlusCircle2 = _interopRequireDefault(_faPlusCircle);

var _shared = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// noinspection JSUnusedGlobalSymbols
exports.default = function () {
  return _react2.default.createElement(
    _shared.Layout,
    null,
    _react2.default.createElement(
      'h1',
      { id: 'contributing' },
      'Contributing ',
      _react2.default.createElement(
        'sup',
        null,
        _react2.default.createElement(_reactFontawesome2.default, { size: 'xs', icon: _faPlusCircle2.default })
      )
    ),
    _react2.default.createElement(
      'p',
      null,
      'Thank you for your interest in contributing! New implementations are always welcome as well as links to blog posts, articles and related work.'
    ),
    _react2.default.createElement(
      'h3',
      null,
      'Setup'
    ),
    _react2.default.createElement(
      'ol',
      null,
      _react2.default.createElement(
        'li',
        null,
        'Fork ',
        _react2.default.createElement(
          'a',
          { target: '_blank', href: 'https://github.com/eugenkiss/7guis' },
          'the repo'
        )
      ),
      _react2.default.createElement(
        'li',
        null,
        'Clone your fork'
      ),
      _react2.default.createElement(
        'li',
        null,
        'Make a branch for your changes'
      ),
      _react2.default.createElement(
        'li',
        null,
        'Go into the ',
        _react2.default.createElement(
          'code',
          null,
          'site'
        ),
        ' directory'
      ),
      _react2.default.createElement(
        'li',
        null,
        _react2.default.createElement(
          'code',
          null,
          'make install'
        )
      ),
      _react2.default.createElement(
        'li',
        null,
        _react2.default.createElement(
          'code',
          null,
          'make run'
        ),
        ' to run a development server'
      ),
      _react2.default.createElement(
        'li',
        null,
        'If you are adding a link to a new 7GUIs implementation add it as an entry to the array in ',
        _react2.default.createElement(
          'code',
          null,
          'site/src/containers/Implementations.js'
        )
      ),
      _react2.default.createElement(
        'li',
        null,
        'Create a pull request from your branch on your fork to ',
        _react2.default.createElement(
          'code',
          null,
          'master'
        ),
        ' on this repo'
      ),
      _react2.default.createElement(
        'li',
        null,
        'Have your branch get merged in!'
      )
    ),
    _react2.default.createElement(
      'small',
      null,
      'Note that in the past implementations could be merged directly into the repo. From now on the 7GUIs repo will contain this website and links to implementations but not implementations themselves. This makes ownership clearer and reduces maintainenance effort without any downsides.'
    )
  );
};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactFontawesome = __webpack_require__(2);

var _reactFontawesome2 = _interopRequireDefault(_reactFontawesome);

var _faEllipsisH = __webpack_require__(13);

var _faEllipsisH2 = _interopRequireDefault(_faEllipsisH);

var _shared = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var thesisHref = 'https://eugenkiss.com/projects/thesis.pdf';
var hciHref = 'https://hci.uni-hannover.de/';

var toc = {
  about: { id: 'about', name: 'About' },
  analyses: { id: 'analyses', name: 'Analyses' },
  related: { id: 'related', name: 'Related Work' }

  // noinspection JSUnusedGlobalSymbols
};
exports.default = function () {
  return _react2.default.createElement(
    _shared.Layout,
    { toc: toc },
    _react2.default.createElement(
      'h1',
      { id: 'more' },
      'More ',
      _react2.default.createElement(
        'sup',
        null,
        _react2.default.createElement(_reactFontawesome2.default, { size: 'xs', icon: _faEllipsisH2.default })
      )
    ),
    _react2.default.createElement(_shared.Heading, toc.about),
    '7GUIs has been created as a spin-off of',
    ' ',
    _react2.default.createElement(
      'a',
      { target: '_blank', href: 'https://eugenkiss.com' },
      'my'
    ),
    ' ',
    'master\u2019s thesis',
    ' ',
    _react2.default.createElement(
      'a',
      { target: '_blank', href: thesisHref },
      'Comparison of Object-Oriented and Functional Programming for GUI Development'
    ),
    ' ',
    'at the',
    ' ',
    _react2.default.createElement(
      'a',
      { target: '_blank', href: hciHref },
      'Human-Computer Interaction group',
      ' '
    ),
    'of the Leibniz Universit\xE4t Hannover in 2014. The GUI programming sphere has anything but stopped evolving since then. Yet, the holy grail appears to still be out of reach. I believe projects such as 7GUIs may help us find the right direction sooner. Four years after its inception I have written an article about 7GUIs:',
    ' ',
    _react2.default.createElement(
      'a',
      { target: '_blank', href: 'https://hackernoon.com/towards-a-better-gui-programming-benchmark-397aca3542b8' },
      'Towards a Better GUI Programming Benchmark'
    ),
    '.',
    _react2.default.createElement(_shared.Heading, toc.analyses),
    _react2.default.createElement(
      'p',
      null,
      'Having various implementations of 7GUI\u2019s tasks is good. Having analyses of the different approaches to identify the pros and cons is even better. If you created a blog post, an article, a video, a short overview etc. comparing of one or more 7GUIs implementations',
      ' ',
      _react2.default.createElement(
        _shared.Link,
        { to: '/contributing' },
        'feel free to add'
      ),
      ' ',
      'your link here:'
    ),
    _react2.default.createElement(
      'ul',
      null,
      _react2.default.createElement(
        'li',
        null,
        _react2.default.createElement(
          'a',
          { target: '_blank', href: thesisHref },
          'Comparison of Object-Oriented and Functional Programming for GUI Development'
        ),
        ' '
      )
    ),
    _react2.default.createElement(_shared.Heading, toc.related),
    _react2.default.createElement(
      'ul',
      null,
      _react2.default.createElement(
        'li',
        null,
        _react2.default.createElement(
          'p',
          null,
          _react2.default.createElement(
            'a',
            { target: '_blank', href: 'http://todomvc.com/' },
            'TodoMVC'
          ),
          ' ',
          'is similar in spirit to 7GUIs in the sense that a task is compared between different application frameworks (in different languages and paradigms) mostly in terms of the clarity of the source code behind the resulting application but also in terms of the performance. Instead of several isolated tasks such as in 7GUIs, TodoMVC is about implementing one cohesive application. In terms of contributions and positioning, TodoMVC\'s focus lies on web-based (single-page and/or MV*) application frameworks.'
        )
      ),
      _react2.default.createElement(
        'li',
        null,
        _react2.default.createElement(
          'p',
          null,
          _react2.default.createElement(
            'a',
            { target: '_blank', href: 'https://hnpwa.com/' },
            'HNPWA'
          ),
          ' ',
          '(Hacker News readers as Progressive Web Apps) describes itself as a \u201Cspiritual successor to TodoMVC\u201D. Its focus lies even more on web based technology and performance, the app/task is larger and it optionally encompasses non-GUI aspects such as writing an API server.'
        )
      ),
      _react2.default.createElement(
        'li',
        null,
        _react2.default.createElement(
          'p',
          null,
          _react2.default.createElement(
            'a',
            { target: '_blank', href: 'http://rosettacode.org/wiki/Category:GUI' },
            'Rosettacode\'s GUI category'
          ),
          '.',
          ' ',
          'Rosettacode is a general programming chrestomathy site with a category for GUI tasks. However, these tasks focus mainly on very specifics of a toolkit and not on fundamental GUI programming challenges.'
        )
      ),
      _react2.default.createElement(
        'li',
        null,
        _react2.default.createElement(
          'p',
          null,
          _react2.default.createElement(
            'a',
            { target: '_blank', href: 'http://web.archive.org/web/20120414134638/http://wiki.java.net/bin/view/Javadesktop/LayoutManagerShowdown' },
            'Layout Manager Showdown'
          ),
          '.',
          ' ',
          'The author stumbled upon a complex layout task that could not be fulfilled by his GUI builder of choice. This task was used to compare different layout managers in terms of code clarity. The difference to 7GUIs is that complex layouts are but one GUI challenge (which is already somewhat reflected in 7GUIs\' CRUD task) and not a mostly \u201Ccomplete\u201D set of GUI challenges.'
        )
      ),
      _react2.default.createElement(
        'li',
        null,
        _react2.default.createElement(
          'p',
          null,
          _react2.default.createElement(
            'a',
            { target: '_blank', href: 'https://github.com/staltz/flux-challenge' },
            'Flux Challenge'
          ),
          ' ',
          'is a \u201CA frontend challenge to test UI architectures and solutions\u201D in the same vein as TodoMVC. The main challenge lies in handling tricky asynchrony elegantly which I find interesting since I feel 7GUIs lacks in this regard.'
        )
      )
    )
  );
};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// noinspection JSUnusedGlobalSymbols
exports.default = function () {
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'h1',
      null,
      '404 - Not found'
    )
  );
};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(21);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _App = __webpack_require__(22);

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// noinspection JSUnusedGlobalSymbols
exports.default = _App2.default;


if (typeof document !== 'undefined') {
  _reactDom2.default.render(_react2.default.createElement(_App2.default, null), document.getElementById('root'));
}

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("react-dom");

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['\n      margin-left: auto;\n      margin-right: auto;\n      padding: 1.5rem 1.125rem;\n    '], ['\n      margin-left: auto;\n      margin-right: auto;\n      padding: 1.5rem 1.125rem;\n    ']),
    _templateObject2 = _taggedTemplateLiteral(['\n* {\n  box-sizing: border-box;\n}\n\nhtml {\n  font-size: 1em;\n}\n\nbody {\n  margin: 0;\n  padding: 0;\n  background-color: white;\n  line-height: 1.55;\n\n  font-size: 1.1rem;\n  font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;\n  color: hsla(0,0%,0%,0.8);\n  font-weight: normal;\n}\n\na {\n  color: #0366d6;\n  text-decoration: none;\n}\n\na:hover {\n  text-decoration: underline;\n}\n\np {\n  word-wrap: break-word;\n  hyphens: auto;\n  margin-bottom: 1.3em;\n}\n\nh1, h2, h3, h4 {\n  margin-bottom: 0.5em;\n  margin-top: 1.414em;\n  line-height: 1.2;\n  hyphens: none;\n\n  font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;\n  font-weight: 600;\n  text-rendering: optimizeLegibility;\n}\n\nh1 {\n  margin-top: 0;\n  font-size: 2.074em;\n}\n\nh2 {\n  font-size: 1.728em;\n}\n\nh3 {\n  font-size: 1.44em;\n}\n\nh4 {\n  font-size: 1.2em;\n}\n\nsmall, .font_small {\n  font-size: 0.833em;\n}\n\n.sans-serif {\n  font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;\n}\n\ntt, code {\n  word-break: break-all;\n  font-family: "SFMono-Regular",Consolas,"Liberation Mono",Menlo,Courier,monospace;\n  font-size: 85%;\n  padding: 0.2em 0.4em;\n  border-radius: 3px;\n  background-color: rgba(27,31,35,0.05);\n}\n\n/* https://gist.github.com/unruthless/413930 */\nsub, sup {\n  /* Specified in % so that the sup/sup is the\n     right size relative to the surrounding text */\n  font-size: 75%;\n\n  /* Zero out the line-height so that it doesn\'t\n     interfere with the positioning that follows */\n  line-height: 0;\n\n  /* Where the magic happens: makes all browsers position\n     the sup/sup properly, relative to the surrounding text */\n  position: relative;\n\n  /* Note that if you\'re using Eric Meyer\'s reset.css, this\n     is already set and you can remove this rule */\n  vertical-align: baseline;\n}\n\nsup {\n  /* Move the superscripted text up */\n  top: -0.5em;\n}\n\nsub {\n  /* Move the subscripted text down, but only\n     half as far down as the superscript moved up */\n  bottom: -0.25em;\n}\n'], ['\n* {\n  box-sizing: border-box;\n}\n\nhtml {\n  font-size: 1em;\n}\n\nbody {\n  margin: 0;\n  padding: 0;\n  background-color: white;\n  line-height: 1.55;\n\n  font-size: 1.1rem;\n  font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;\n  color: hsla(0,0%,0%,0.8);\n  font-weight: normal;\n}\n\na {\n  color: #0366d6;\n  text-decoration: none;\n}\n\na:hover {\n  text-decoration: underline;\n}\n\np {\n  word-wrap: break-word;\n  hyphens: auto;\n  margin-bottom: 1.3em;\n}\n\nh1, h2, h3, h4 {\n  margin-bottom: 0.5em;\n  margin-top: 1.414em;\n  line-height: 1.2;\n  hyphens: none;\n\n  font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;\n  font-weight: 600;\n  text-rendering: optimizeLegibility;\n}\n\nh1 {\n  margin-top: 0;\n  font-size: 2.074em;\n}\n\nh2 {\n  font-size: 1.728em;\n}\n\nh3 {\n  font-size: 1.44em;\n}\n\nh4 {\n  font-size: 1.2em;\n}\n\nsmall, .font_small {\n  font-size: 0.833em;\n}\n\n.sans-serif {\n  font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;\n}\n\ntt, code {\n  word-break: break-all;\n  font-family: "SFMono-Regular",Consolas,"Liberation Mono",Menlo,Courier,monospace;\n  font-size: 85%;\n  padding: 0.2em 0.4em;\n  border-radius: 3px;\n  background-color: rgba(27,31,35,0.05);\n}\n\n/* https://gist.github.com/unruthless/413930 */\nsub, sup {\n  /* Specified in % so that the sup/sup is the\n     right size relative to the surrounding text */\n  font-size: 75%;\n\n  /* Zero out the line-height so that it doesn\'t\n     interfere with the positioning that follows */\n  line-height: 0;\n\n  /* Where the magic happens: makes all browsers position\n     the sup/sup properly, relative to the surrounding text */\n  position: relative;\n\n  /* Note that if you\'re using Eric Meyer\'s reset.css, this\n     is already set and you can remove this rule */\n  vertical-align: baseline;\n}\n\nsup {\n  /* Move the superscripted text up */\n  top: -0.5em;\n}\n\nsub {\n  /* Move the subscripted text down, but only\n     half as far down as the superscript moved up */\n  bottom: -0.25em;\n}\n']);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactStatic = __webpack_require__(4);

var _reactStaticRoutes = __webpack_require__(23);

var _reactStaticRoutes2 = _interopRequireDefault(_reactStaticRoutes);

var _emotion = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

exports.default = function () {
  return _react2.default.createElement(
    _reactStatic.Router,
    { autoScrollToTop: false },
    _react2.default.createElement(
      'div',
      {
        className: (0, _emotion.css)(_templateObject) },
      _react2.default.createElement(_reactStaticRoutes2.default, null)
    )
  );
};

(0, _emotion.injectGlobal)(_templateObject2);

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path2 = __webpack_require__(24);

var _path3 = _interopRequireDefault(_path2);

var _importCss2 = __webpack_require__(25);

var _importCss3 = _interopRequireDefault(_importCss2);

var _universalImport2 = __webpack_require__(26);

var _universalImport3 = _interopRequireDefault(_universalImport2);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(27);

var _reactUniversalComponent = __webpack_require__(28);

var _reactUniversalComponent2 = _interopRequireDefault(_reactUniversalComponent);

var _reactStatic = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

(0, _reactUniversalComponent.setHasBabelPlugin)();

var universalOptions = {
  loading: function loading() {
    return null;
  },
  error: function error(props) {
    console.error(props.error);
    return _react2.default.createElement(
      'div',
      null,
      'An error occurred loading this page\'s template. More information is available in the console.'
    );
  }
};

var t_0 = (0, _reactUniversalComponent2.default)((0, _universalImport3.default)({
  id: '../src/containers/Home',
  file: '/Users/eugen/projects/7guis/site/dist/react-static-routes.js',
  load: function load() {
    return Promise.all([new Promise(function(resolve) { resolve(); }).then(__webpack_require__.bind(null, 8)), (0, _importCss3.default)('src/containers/Home', {
      disableWarnings: true
    })]).then(function (proms) {
      return proms[0];
    });
  },
  path: function path() {
    return _path3.default.join(__dirname, '../src/containers/Home');
  },
  resolve: function resolve() {
    return /*require.resolve*/(8);
  },
  chunkName: function chunkName() {
    return 'src/containers/Home';
  }
}), universalOptions);
var t_1 = (0, _reactUniversalComponent2.default)((0, _universalImport3.default)({
  id: '../src/containers/Tasks',
  file: '/Users/eugen/projects/7guis/site/dist/react-static-routes.js',
  load: function load() {
    return Promise.all([new Promise(function(resolve) { resolve(); }).then(__webpack_require__.bind(null, 14)), (0, _importCss3.default)('src/containers/Tasks', {
      disableWarnings: true
    })]).then(function (proms) {
      return proms[0];
    });
  },
  path: function path() {
    return _path3.default.join(__dirname, '../src/containers/Tasks');
  },
  resolve: function resolve() {
    return /*require.resolve*/(14);
  },
  chunkName: function chunkName() {
    return 'src/containers/Tasks';
  }
}), universalOptions);
var t_2 = (0, _reactUniversalComponent2.default)((0, _universalImport3.default)({
  id: '../src/containers/Dimensions',
  file: '/Users/eugen/projects/7guis/site/dist/react-static-routes.js',
  load: function load() {
    return Promise.all([new Promise(function(resolve) { resolve(); }).then(__webpack_require__.bind(null, 15)), (0, _importCss3.default)('src/containers/Dimensions', {
      disableWarnings: true
    })]).then(function (proms) {
      return proms[0];
    });
  },
  path: function path() {
    return _path3.default.join(__dirname, '../src/containers/Dimensions');
  },
  resolve: function resolve() {
    return /*require.resolve*/(15);
  },
  chunkName: function chunkName() {
    return 'src/containers/Dimensions';
  }
}), universalOptions);
var t_3 = (0, _reactUniversalComponent2.default)((0, _universalImport3.default)({
  id: '../src/containers/Implementations',
  file: '/Users/eugen/projects/7guis/site/dist/react-static-routes.js',
  load: function load() {
    return Promise.all([new Promise(function(resolve) { resolve(); }).then(__webpack_require__.bind(null, 16)), (0, _importCss3.default)('src/containers/Implementations', {
      disableWarnings: true
    })]).then(function (proms) {
      return proms[0];
    });
  },
  path: function path() {
    return _path3.default.join(__dirname, '../src/containers/Implementations');
  },
  resolve: function resolve() {
    return /*require.resolve*/(16);
  },
  chunkName: function chunkName() {
    return 'src/containers/Implementations';
  }
}), universalOptions);
var t_4 = (0, _reactUniversalComponent2.default)((0, _universalImport3.default)({
  id: '../src/containers/Contributing',
  file: '/Users/eugen/projects/7guis/site/dist/react-static-routes.js',
  load: function load() {
    return Promise.all([new Promise(function(resolve) { resolve(); }).then(__webpack_require__.bind(null, 17)), (0, _importCss3.default)('src/containers/Contributing', {
      disableWarnings: true
    })]).then(function (proms) {
      return proms[0];
    });
  },
  path: function path() {
    return _path3.default.join(__dirname, '../src/containers/Contributing');
  },
  resolve: function resolve() {
    return /*require.resolve*/(17);
  },
  chunkName: function chunkName() {
    return 'src/containers/Contributing';
  }
}), universalOptions);
var t_5 = (0, _reactUniversalComponent2.default)((0, _universalImport3.default)({
  id: '../src/containers/More',
  file: '/Users/eugen/projects/7guis/site/dist/react-static-routes.js',
  load: function load() {
    return Promise.all([new Promise(function(resolve) { resolve(); }).then(__webpack_require__.bind(null, 18)), (0, _importCss3.default)('src/containers/More', {
      disableWarnings: true
    })]).then(function (proms) {
      return proms[0];
    });
  },
  path: function path() {
    return _path3.default.join(__dirname, '../src/containers/More');
  },
  resolve: function resolve() {
    return /*require.resolve*/(18);
  },
  chunkName: function chunkName() {
    return 'src/containers/More';
  }
}), universalOptions);
var t_6 = (0, _reactUniversalComponent2.default)((0, _universalImport3.default)({
  id: '../src/containers/404',
  file: '/Users/eugen/projects/7guis/site/dist/react-static-routes.js',
  load: function load() {
    return Promise.all([new Promise(function(resolve) { resolve(); }).then(__webpack_require__.bind(null, 19)), (0, _importCss3.default)('src/containers/404', {
      disableWarnings: true
    })]).then(function (proms) {
      return proms[0];
    });
  },
  path: function path() {
    return _path3.default.join(__dirname, '../src/containers/404');
  },
  resolve: function resolve() {
    return /*require.resolve*/(19);
  },
  chunkName: function chunkName() {
    return 'src/containers/404';
  }
}), universalOptions);

// Template Map
global.componentsByTemplateID = global.componentsByTemplateID || [t_0, t_1, t_2, t_3, t_4, t_5, t_6];

// Template Tree
global.templateIDsByPath = global.templateIDsByPath || {
  '404': 6

  // Get template for given path
};var getComponentForPath = function getComponentForPath(path) {
  path = (0, _reactStatic.cleanPath)(path);
  return global.componentsByTemplateID[global.templateIDsByPath[path]];
};

global.reactStaticGetComponentForPath = getComponentForPath;
global.reactStaticRegisterTemplateIDForPath = function (path, id) {
  global.templateIDsByPath[path] = id;
};

var Routes = function (_Component) {
  _inherits(Routes, _Component);

  function Routes() {
    _classCallCheck(this, Routes);

    return _possibleConstructorReturn(this, (Routes.__proto__ || Object.getPrototypeOf(Routes)).apply(this, arguments));
  }

  _createClass(Routes, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          Comp = _props.component,
          render = _props.render,
          children = _props.children;


      var getFullComponentForPath = function getFullComponentForPath(path) {
        var Comp = getComponentForPath(path);
        var is404 = path === '404';
        if (!Comp) {
          is404 = true;
          Comp = getComponentForPath('404');
        }
        return function (newProps) {
          return Comp ? _react2.default.createElement(Comp, _extends({}, newProps, is404 ? { is404: true } : {})) : null;
        };
      };

      var renderProps = {
        componentsByTemplateID: global.componentsByTemplateID,
        templateIDsByPath: global.templateIDsByPath,
        getComponentForPath: getFullComponentForPath
      };

      if (Comp) {
        return _react2.default.createElement(Comp, renderProps);
      }

      if (render || children) {
        return (render || children)(renderProps);
      }

      // This is the default auto-routing renderer
      return _react2.default.createElement(_reactRouterDom.Route, { path: '*', render: function render(props) {
          var Comp = getFullComponentForPath(props.location.pathname);
          return _react2.default.createElement(Comp, _extends({ key: props.location.pathname }, props));
        } });
    }
  }]);

  return Routes;
}(_react.Component);

exports.default = Routes;
/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = require("babel-plugin-universal-import/importCss");

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = require("babel-plugin-universal-import/universalImport");

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = require("react-router-dom");

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.setHasBabelPlugin = exports.ReportChunks = exports.MODULE_IDS = exports.CHUNK_NAMES = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _requireUniversalModule = __webpack_require__(29);

Object.defineProperty(exports, 'CHUNK_NAMES', {
  enumerable: true,
  get: function get() {
    return _requireUniversalModule.CHUNK_NAMES;
  }
});
Object.defineProperty(exports, 'MODULE_IDS', {
  enumerable: true,
  get: function get() {
    return _requireUniversalModule.MODULE_IDS;
  }
});

var _reportChunks = __webpack_require__(30);

Object.defineProperty(exports, 'ReportChunks', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_reportChunks).default;
  }
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(7);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _hoistNonReactStatics = __webpack_require__(31);

var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);

var _requireUniversalModule2 = _interopRequireDefault(_requireUniversalModule);

var _utils = __webpack_require__(6);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var hasBabelPlugin = false;

var isHMR = function isHMR() {
  return (
    // $FlowIgnore
    module.hot && (module.hot.data || module.hot.status() === 'apply')
  );
};

var setHasBabelPlugin = exports.setHasBabelPlugin = function setHasBabelPlugin() {
  hasBabelPlugin = true;
};

function universal(component) {
  var _class, _temp;

  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var _opts$loading = opts.loading,
      Loading = _opts$loading === undefined ? _utils.DefaultLoading : _opts$loading,
      _opts$error = opts.error,
      Err = _opts$error === undefined ? _utils.DefaultError : _opts$error,
      _opts$minDelay = opts.minDelay,
      minDelay = _opts$minDelay === undefined ? 0 : _opts$minDelay,
      _opts$alwaysDelay = opts.alwaysDelay,
      alwaysDelay = _opts$alwaysDelay === undefined ? false : _opts$alwaysDelay,
      _opts$testBabelPlugin = opts.testBabelPlugin,
      testBabelPlugin = _opts$testBabelPlugin === undefined ? false : _opts$testBabelPlugin,
      _opts$loadingTransiti = opts.loadingTransition,
      loadingTransition = _opts$loadingTransiti === undefined ? true : _opts$loadingTransiti,
      options = _objectWithoutProperties(opts, ['loading', 'error', 'minDelay', 'alwaysDelay', 'testBabelPlugin', 'loadingTransition']);

  var isDynamic = hasBabelPlugin || testBabelPlugin;
  options.isDynamic = isDynamic;
  options.modCache = {};
  options.promCache = {};

  return _temp = _class = function (_React$Component) {
    _inherits(UniversalComponent, _React$Component);

    _createClass(UniversalComponent, null, [{
      key: 'preload',

      /* eslint-enable react/sort-comp */

      /* eslint-disable react/sort-comp */
      value: function preload(props) {
        var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        props = props || {};

        var _req = (0, _requireUniversalModule2.default)(component, options, props),
            requireAsync = _req.requireAsync,
            requireSync = _req.requireSync;

        var Component = void 0;

        try {
          Component = requireSync(props, context);
        } catch (error) {
          return Promise.reject(error);
        }

        if (Component) return Promise.resolve(Component);

        return requireAsync(props, context);
      }
    }]);

    function UniversalComponent(props, context) {
      _classCallCheck(this, UniversalComponent);

      var _this = _possibleConstructorReturn(this, (UniversalComponent.__proto__ || Object.getPrototypeOf(UniversalComponent)).call(this, props, context));

      _this.update = function (state) {
        var isMount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var isSync = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        var isServer = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

        if (!_this._mounted) return;
        if (!state.error) state.error = null;

        _this.handleAfter(state, isMount, isSync, isServer);
      };

      _this.state = { error: null };
      return _this;
    }

    _createClass(UniversalComponent, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        this._mounted = true;

        var _req2 = (0, _requireUniversalModule2.default)(component, options, this.props),
            addModule = _req2.addModule,
            requireSync = _req2.requireSync,
            requireAsync = _req2.requireAsync,
            asyncOnly = _req2.asyncOnly;

        var Component = void 0;

        try {
          Component = requireSync(this.props, this.context);
        } catch (error) {
          return this.update({ error: error });
        }

        this._asyncOnly = asyncOnly;
        var chunkName = addModule(this.props); // record the module for SSR flushing :)

        if (this.context.report) {
          this.context.report(chunkName);
        }

        if (Component || _utils.isServer) {
          this.handleBefore(true, true, _utils.isServer);
          this.update({ Component: Component }, true, true, _utils.isServer);
          return;
        }

        this.handleBefore(true, false);
        this.requireAsync(requireAsync, this.props, true);
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        this._mounted = false;
      }
    }, {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        var _this2 = this;

        if (isDynamic || this._asyncOnly) {
          var _req3 = (0, _requireUniversalModule2.default)(component, options, nextProps, this.props),
              requireSync = _req3.requireSync,
              requireAsync = _req3.requireAsync,
              shouldUpdate = _req3.shouldUpdate;

          if (shouldUpdate(nextProps, this.props)) {
            var Component = void 0;

            try {
              Component = requireSync(nextProps, this.context);
            } catch (error) {
              return this.update({ error: error });
            }

            this.handleBefore(false, !!Component);

            if (!Component) {
              return this.requireAsync(requireAsync, nextProps);
            }

            var state = { Component: Component };

            if (alwaysDelay) {
              if (loadingTransition) this.update({ Component: null }); // display `loading` during componentWillReceiveProps
              setTimeout(function () {
                return _this2.update(state, false, true);
              }, minDelay);
              return;
            }

            this.update(state, false, true);
          } else if (isHMR()) {
            var _Component = requireSync(nextProps, this.context);
            this.setState({ Component: function Component() {
                return null;
              } }); // HMR /w Redux and HOCs can be finicky, so we
            setTimeout(function () {
              return _this2.setState({ Component: _Component });
            }); // toggle components to insure updates occur
          }
        }
      }
    }, {
      key: 'requireAsync',
      value: function requireAsync(_requireAsync, props, isMount) {
        var _this3 = this;

        if (this.state.Component && loadingTransition) {
          this.update({ Component: null }); // display `loading` during componentWillReceiveProps
        }

        var time = new Date();

        _requireAsync(props, this.context).then(function (Component) {
          var state = { Component: Component };

          var timeLapsed = new Date() - time;
          if (timeLapsed < minDelay) {
            var extraDelay = minDelay - timeLapsed;
            return setTimeout(function () {
              return _this3.update(state, isMount);
            }, extraDelay);
          }

          _this3.update(state, isMount);
        }).catch(function (error) {
          return _this3.update({ error: error });
        });
      }
    }, {
      key: 'handleBefore',
      value: function handleBefore(isMount, isSync) {
        var isServer = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        if (this.props.onBefore) {
          var onBefore = this.props.onBefore;

          var info = { isMount: isMount, isSync: isSync, isServer: isServer };
          onBefore(info);
        }
      }
    }, {
      key: 'handleAfter',
      value: function handleAfter(state, isMount, isSync, isServer) {
        var Component = state.Component,
            error = state.error;


        if (Component && !error) {
          (0, _hoistNonReactStatics2.default)(UniversalComponent, Component, { preload: true });

          if (this.props.onAfter) {
            var onAfter = this.props.onAfter;

            var info = { isMount: isMount, isSync: isSync, isServer: isServer };
            onAfter(info, Component);
          }
        } else if (error && this.props.onError) {
          this.props.onError(error);
        }

        this.setState(state);
      }
    }, {
      key: 'render',
      value: function render() {
        var _state = this.state,
            error = _state.error,
            Component = _state.Component;

        var _props = this.props,
            isLoading = _props.isLoading,
            userError = _props.error,
            props = _objectWithoutProperties(_props, ['isLoading', 'error']);

        // user-provided props (e.g. for data-fetching loading):


        if (isLoading) {
          return (0, _utils.createElement)(Loading, props);
        } else if (userError) {
          return (0, _utils.createElement)(Err, _extends({}, props, { error: userError }));
        } else if (error) {
          return (0, _utils.createElement)(Err, _extends({}, props, { error: error }));
        } else if (Component) {
          // primary usage (for async import loading + errors):
          return (0, _utils.createElement)(Component, props);
        }

        return (0, _utils.createElement)(Loading, props);
      }
    }]);

    return UniversalComponent;
  }(_react2.default.Component), _class.contextTypes = {
    store: _propTypes2.default.object,
    report: _propTypes2.default.func
  }, _temp;
}
exports.default = universal;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)(module)))

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clearChunks = exports.flushModuleIds = exports.flushChunkNames = exports.MODULE_IDS = exports.CHUNK_NAMES = undefined;
exports.default = requireUniversalModule;

var _utils = __webpack_require__(6);

var CHUNK_NAMES = exports.CHUNK_NAMES = new Set();
var MODULE_IDS = exports.MODULE_IDS = new Set();

function requireUniversalModule(universalConfig, options, props, prevProps) {
  var key = options.key,
      _options$timeout = options.timeout,
      timeout = _options$timeout === undefined ? 15000 : _options$timeout,
      onLoad = options.onLoad,
      onError = options.onError,
      isDynamic = options.isDynamic,
      modCache = options.modCache,
      promCache = options.promCache;


  var config = getConfig(isDynamic, universalConfig, options, props);
  var chunkName = config.chunkName,
      path = config.path,
      resolve = config.resolve,
      load = config.load;

  var asyncOnly = !path && !resolve || typeof chunkName === 'function';

  var requireSync = function requireSync(props, context) {
    var exp = (0, _utils.loadFromCache)(chunkName, props, modCache);

    if (!exp) {
      var mod = void 0;

      if (!(0, _utils.isWebpack)() && path) {
        var modulePath = (0, _utils.callForString)(path, props) || '';
        mod = (0, _utils.tryRequire)(modulePath);
      } else if ((0, _utils.isWebpack)() && resolve) {
        var weakId = (0, _utils.callForString)(resolve, props);

        if (__webpack_require__.m[weakId]) {
          mod = (0, _utils.tryRequire)(weakId);
        }
      }

      if (mod) {
        exp = (0, _utils.resolveExport)(mod, key, onLoad, chunkName, props, context, modCache, true);
      }
    }

    return exp;
  };

  var requireAsync = function requireAsync(props, context) {
    var exp = (0, _utils.loadFromCache)(chunkName, props, modCache);
    if (exp) return Promise.resolve(exp);

    var cachedPromise = (0, _utils.loadFromPromiseCache)(chunkName, props, promCache);
    if (cachedPromise) return cachedPromise;

    var prom = new Promise(function (res, rej) {
      var reject = function reject(error) {
        error = error || new Error('timeout exceeded');
        clearTimeout(timer);
        if (onError) {
          var _isServer = typeof window === 'undefined';
          var info = { isServer: _isServer };
          onError(error, info);
        }
        rej(error);
      };

      // const timer = timeout && setTimeout(reject, timeout)
      var timer = timeout && setTimeout(reject, timeout);

      var resolve = function resolve(mod) {
        clearTimeout(timer);

        var exp = (0, _utils.resolveExport)(mod, key, onLoad, chunkName, props, context, modCache);
        if (exp) return res(exp);

        reject(new Error('export not found'));
      };

      var request = load(props, { resolve: resolve, reject: reject });

      // if load doesn't return a promise, it must call resolveImport
      // itself. Most common is the promise implementation below.
      if (!request || typeof request.then !== 'function') return;
      request.then(resolve).catch(reject);
    });

    (0, _utils.cacheProm)(prom, chunkName, props, promCache);
    return prom;
  };

  var addModule = function addModule(props) {
    if (_utils.isServer || _utils.isTest) {
      if (chunkName) {
        var name = (0, _utils.callForString)(chunkName, props);
        if (name) CHUNK_NAMES.add(name);
        if (!_utils.isTest) return name; // makes tests way smaller to run both kinds
      }

      if ((0, _utils.isWebpack)()) {
        var weakId = (0, _utils.callForString)(resolve, props);
        if (weakId) MODULE_IDS.add(weakId);
        return weakId;
      }

      if (!(0, _utils.isWebpack)()) {
        var modulePath = (0, _utils.callForString)(path, props);
        if (modulePath) MODULE_IDS.add(modulePath);
        return modulePath;
      }
    }
  };

  var shouldUpdate = function shouldUpdate(next, prev) {
    var cacheKey = (0, _utils.callForString)(chunkName, next);

    var config = getConfig(isDynamic, universalConfig, options, prev);
    var prevCacheKey = (0, _utils.callForString)(config.chunkName, prev);

    return cacheKey !== prevCacheKey;
  };

  return {
    requireSync: requireSync,
    requireAsync: requireAsync,
    addModule: addModule,
    shouldUpdate: shouldUpdate,
    asyncOnly: asyncOnly
  };
}

var flushChunkNames = exports.flushChunkNames = function flushChunkNames() {
  var chunks = Array.from(CHUNK_NAMES);
  CHUNK_NAMES.clear();
  return chunks;
};

var flushModuleIds = exports.flushModuleIds = function flushModuleIds() {
  var ids = Array.from(MODULE_IDS);
  MODULE_IDS.clear();
  return ids;
};

var clearChunks = exports.clearChunks = function clearChunks() {
  CHUNK_NAMES.clear();
  MODULE_IDS.clear();
};

var getConfig = function getConfig(isDynamic, universalConfig, options, props) {
  if (isDynamic) {
    return typeof universalConfig === 'function' ? universalConfig(props) : universalConfig;
  }

  var load = typeof universalConfig === 'function' ? universalConfig : // $FlowIssue
  function () {
    return universalConfig;
  };

  return {
    file: 'default',
    id: options.id || 'default',
    chunkName: options.chunkName || 'default',
    resolve: options.resolve || '',
    path: options.path || '',
    load: load
  };
};

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(7);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReportChunks = function (_React$Component) {
  _inherits(ReportChunks, _React$Component);

  function ReportChunks() {
    _classCallCheck(this, ReportChunks);

    return _possibleConstructorReturn(this, (ReportChunks.__proto__ || Object.getPrototypeOf(ReportChunks)).apply(this, arguments));
  }

  _createClass(ReportChunks, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        report: this.props.report
      };
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.Children.only(this.props.children);
    }
  }]);

  return ReportChunks;
}(_react2.default.Component);

ReportChunks.propTypes = {
  report: _propTypes2.default.func.isRequired
};
ReportChunks.childContextTypes = {
  report: _propTypes2.default.func.isRequired
};
exports.default = ReportChunks;

/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports = require("hoist-non-react-statics");

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/counter.9cd92091.png";

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/tempconv.de9aff1f.png";

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/bookflight.a5434663.png";

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/timer.ed46b6b4.png";

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/crud.515ce94b.png";

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/circledraw.235dfd8b.png";

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/cells.9544a72f.png";

/***/ }),
/* 39 */
/***/ (function(module, exports) {

module.exports = require("@fortawesome/fontawesome-free-solid/faFileCode");

/***/ })
/******/ ]);
});
//# sourceMappingURL=static.88ad39f9.js.map