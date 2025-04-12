(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.fuyao = {}));
})(this, (function (exports) { 'use strict';

  var jsxRuntime = {exports: {}};

  var reactJsxRuntime_production = {};

  /**
   * @license React
   * react-jsx-runtime.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  var hasRequiredReactJsxRuntime_production;

  function requireReactJsxRuntime_production () {
  	if (hasRequiredReactJsxRuntime_production) return reactJsxRuntime_production;
  	hasRequiredReactJsxRuntime_production = 1;
  	var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"),
  	  REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
  	function jsxProd(type, config, maybeKey) {
  	  var key = null;
  	  void 0 !== maybeKey && (key = "" + maybeKey);
  	  void 0 !== config.key && (key = "" + config.key);
  	  if ("key" in config) {
  	    maybeKey = {};
  	    for (var propName in config)
  	      "key" !== propName && (maybeKey[propName] = config[propName]);
  	  } else maybeKey = config;
  	  config = maybeKey.ref;
  	  return {
  	    $$typeof: REACT_ELEMENT_TYPE,
  	    type: type,
  	    key: key,
  	    ref: void 0 !== config ? config : null,
  	    props: maybeKey
  	  };
  	}
  	reactJsxRuntime_production.Fragment = REACT_FRAGMENT_TYPE;
  	reactJsxRuntime_production.jsx = jsxProd;
  	reactJsxRuntime_production.jsxs = jsxProd;
  	return reactJsxRuntime_production;
  }

  var hasRequiredJsxRuntime;

  function requireJsxRuntime () {
  	if (hasRequiredJsxRuntime) return jsxRuntime.exports;
  	hasRequiredJsxRuntime = 1;

  	{
  	  jsxRuntime.exports = requireReactJsxRuntime_production();
  	}
  	return jsxRuntime.exports;
  }

  var jsxRuntimeExports = requireJsxRuntime();

  function Button(props) {
      const { className = '', style, type = 'primary', children, onClick = () => { }, } = props;
      return (jsxRuntimeExports.jsx("div", { className: `btn ${className} btn-${type}`, style: Object.assign({}, style), onClick: onClick, children: children }));
  }

  exports.Button = Button;

}));
