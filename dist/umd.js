(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react')) :
	typeof define === 'function' && define.amd ? define(['exports', 'react'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.fuyao = {}, global.React));
})(this, (function (exports, require$$0) { 'use strict';

	function getDefaultExportFromCjs (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

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

	var classnames$1 = {exports: {}};

	/*!
		Copyright (c) 2018 Jed Watson.
		Licensed under the MIT License (MIT), see
		http://jedwatson.github.io/classnames
	*/

	var hasRequiredClassnames;

	function requireClassnames () {
		if (hasRequiredClassnames) return classnames$1.exports;
		hasRequiredClassnames = 1;
		(function (module) {
			/* global define */

			(function () {

				var hasOwn = {}.hasOwnProperty;

				function classNames () {
					var classes = '';

					for (var i = 0; i < arguments.length; i++) {
						var arg = arguments[i];
						if (arg) {
							classes = appendClass(classes, parseValue(arg));
						}
					}

					return classes;
				}

				function parseValue (arg) {
					if (typeof arg === 'string' || typeof arg === 'number') {
						return arg;
					}

					if (typeof arg !== 'object') {
						return '';
					}

					if (Array.isArray(arg)) {
						return classNames.apply(null, arg);
					}

					if (arg.toString !== Object.prototype.toString && !arg.toString.toString().includes('[native code]')) {
						return arg.toString();
					}

					var classes = '';

					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes = appendClass(classes, key);
						}
					}

					return classes;
				}

				function appendClass (value, newClass) {
					if (!newClass) {
						return value;
					}
				
					if (value) {
						return value + ' ' + newClass;
					}
				
					return value + newClass;
				}

				if (module.exports) {
					classNames.default = classNames;
					module.exports = classNames;
				} else {
					window.classNames = classNames;
				}
			}()); 
		} (classnames$1));
		return classnames$1.exports;
	}

	var classnamesExports = requireClassnames();
	var classnames = /*@__PURE__*/getDefaultExportFromCjs(classnamesExports);

	const EmptyImgMaps = {
	    '404页面': '404',
	    服务器异常: 'error',
	    功能: 'gn',
	    合同: 'ht',
	    核实情况: 'hsqk',
	    加载失败: 'jzsb',
	    敬请期待: 'jqqd',
	    没有绑定银行卡: 'yhk',
	    纳税人默认头像: 'mrtx',
	    票据: 'pj',
	    权限不足: 'qxbz',
	    任务: 'rw',
	    审核完成: 'shwc',
	    审核中: 'shz',
	    数据: 'sj',
	    搜索为空: 'sswk',
	    图表内容为空: 'nrwk',
	    网络不给力: 'wl',
	    未绑定电话号码: 'hm',
	    未绑定企业: 'qy',
	    系统维护: 'xtwh',
	    研发中: 'yfz',
	    暂无内容: 'zwnr',
	    暂无信息: 'zwxx',
	    帐套: 'zt',
	    XX加载失败: 'xx',
	};
	const isNoPaddingButton = (type) => [
	    '404页面',
	    '加载失败',
	    '敬请期待',
	    '没有绑定银行卡',
	    '纳税人默认头像',
	    '网络不给力',
	    '未绑定电话号码',
	].includes(type);
	const FuyaoEmpty = (props) => {
	    const { type, description, className, style, image, imageStyle } = props;
	    const imgStyle = require$$0.useMemo(() => (Object.assign({ backgroundImage: `url(${image})` }, imageStyle)), [image, imageStyle]);
	    const img = type && EmptyImgMaps[type];
	    return (jsxRuntimeExports.jsxs("div", { className: classnames('fuyao-empty', className), style: style, children: [img ? (jsxRuntimeExports.jsx("div", { style: imageStyle, className: classnames('fuyao-empty-img-inner', `fuyao-empty-img-${img}`) })) : (jsxRuntimeExports.jsx("div", { className: "fuyao-empty-img", style: imgStyle })), jsxRuntimeExports.jsx("div", { className: classnames('fuyao-empty-desc', isNoPaddingButton(type) && ' no-padding', type === '审核中' && 'type-audit', type === '404页面' && 'type-404'), children: description !== null && description !== void 0 ? description : (type === '审核中' ? '审核中...' : type) })] }));
	};

	exports.FuyaoButton = Button;
	exports.FuyaoEmpty = FuyaoEmpty;

}));
