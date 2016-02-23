/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Vue = __webpack_require__(2);
	var vuebootstrap = __webpack_require__(4);

	new Vue({
	  el: "#main-content",
	  components: {
	    vuebootstrap: vuebootstrap
	  }
	});

/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {/*!
	 * Vue.js v1.0.16
	 * (c) 2016 Evan You
	 * Released under the MIT License.
	 */
	'use strict';

	function set(obj, key, val) {
	  if (hasOwn(obj, key)) {
	    obj[key] = val;
	    return;
	  }
	  if (obj._isVue) {
	    set(obj._data, key, val);
	    return;
	  }
	  var ob = obj.__ob__;
	  if (!ob) {
	    obj[key] = val;
	    return;
	  }
	  ob.convert(key, val);
	  ob.dep.notify();
	  if (ob.vms) {
	    var i = ob.vms.length;
	    while (i--) {
	      var vm = ob.vms[i];
	      vm._proxy(key);
	      vm._digest();
	    }
	  }
	  return val;
	}

	/**
	 * Delete a property and trigger change if necessary.
	 *
	 * @param {Object} obj
	 * @param {String} key
	 */

	function del(obj, key) {
	  if (!hasOwn(obj, key)) {
	    return;
	  }
	  delete obj[key];
	  var ob = obj.__ob__;
	  if (!ob) {
	    return;
	  }
	  ob.dep.notify();
	  if (ob.vms) {
	    var i = ob.vms.length;
	    while (i--) {
	      var vm = ob.vms[i];
	      vm._unproxy(key);
	      vm._digest();
	    }
	  }
	}

	var hasOwnProperty = Object.prototype.hasOwnProperty;
	/**
	 * Check whether the object has the property.
	 *
	 * @param {Object} obj
	 * @param {String} key
	 * @return {Boolean}
	 */

	function hasOwn(obj, key) {
	  return hasOwnProperty.call(obj, key);
	}

	/**
	 * Check if an expression is a literal value.
	 *
	 * @param {String} exp
	 * @return {Boolean}
	 */

	var literalValueRE = /^\s?(true|false|-?[\d\.]+|'[^']*'|"[^"]*")\s?$/;

	function isLiteral(exp) {
	  return literalValueRE.test(exp);
	}

	/**
	 * Check if a string starts with $ or _
	 *
	 * @param {String} str
	 * @return {Boolean}
	 */

	function isReserved(str) {
	  var c = (str + '').charCodeAt(0);
	  return c === 0x24 || c === 0x5F;
	}

	/**
	 * Guard text output, make sure undefined outputs
	 * empty string
	 *
	 * @param {*} value
	 * @return {String}
	 */

	function _toString(value) {
	  return value == null ? '' : value.toString();
	}

	/**
	 * Check and convert possible numeric strings to numbers
	 * before setting back to data
	 *
	 * @param {*} value
	 * @return {*|Number}
	 */

	function toNumber(value) {
	  if (typeof value !== 'string') {
	    return value;
	  } else {
	    var parsed = Number(value);
	    return isNaN(parsed) ? value : parsed;
	  }
	}

	/**
	 * Convert string boolean literals into real booleans.
	 *
	 * @param {*} value
	 * @return {*|Boolean}
	 */

	function toBoolean(value) {
	  return value === 'true' ? true : value === 'false' ? false : value;
	}

	/**
	 * Strip quotes from a string
	 *
	 * @param {String} str
	 * @return {String | false}
	 */

	function stripQuotes(str) {
	  var a = str.charCodeAt(0);
	  var b = str.charCodeAt(str.length - 1);
	  return a === b && (a === 0x22 || a === 0x27) ? str.slice(1, -1) : str;
	}

	/**
	 * Camelize a hyphen-delmited string.
	 *
	 * @param {String} str
	 * @return {String}
	 */

	var camelizeRE = /-(\w)/g;

	function camelize(str) {
	  return str.replace(camelizeRE, toUpper);
	}

	function toUpper(_, c) {
	  return c ? c.toUpperCase() : '';
	}

	/**
	 * Hyphenate a camelCase string.
	 *
	 * @param {String} str
	 * @return {String}
	 */

	var hyphenateRE = /([a-z\d])([A-Z])/g;

	function hyphenate(str) {
	  return str.replace(hyphenateRE, '$1-$2').toLowerCase();
	}

	/**
	 * Converts hyphen/underscore/slash delimitered names into
	 * camelized classNames.
	 *
	 * e.g. my-component => MyComponent
	 *      some_else    => SomeElse
	 *      some/comp    => SomeComp
	 *
	 * @param {String} str
	 * @return {String}
	 */

	var classifyRE = /(?:^|[-_\/])(\w)/g;

	function classify(str) {
	  return str.replace(classifyRE, toUpper);
	}

	/**
	 * Simple bind, faster than native
	 *
	 * @param {Function} fn
	 * @param {Object} ctx
	 * @return {Function}
	 */

	function bind$1(fn, ctx) {
	  return function (a) {
	    var l = arguments.length;
	    return l ? l > 1 ? fn.apply(ctx, arguments) : fn.call(ctx, a) : fn.call(ctx);
	  };
	}

	/**
	 * Convert an Array-like object to a real Array.
	 *
	 * @param {Array-like} list
	 * @param {Number} [start] - start index
	 * @return {Array}
	 */

	function toArray(list, start) {
	  start = start || 0;
	  var i = list.length - start;
	  var ret = new Array(i);
	  while (i--) {
	    ret[i] = list[i + start];
	  }
	  return ret;
	}

	/**
	 * Mix properties into target object.
	 *
	 * @param {Object} to
	 * @param {Object} from
	 */

	function extend(to, from) {
	  var keys = Object.keys(from);
	  var i = keys.length;
	  while (i--) {
	    to[keys[i]] = from[keys[i]];
	  }
	  return to;
	}

	/**
	 * Quick object check - this is primarily used to tell
	 * Objects from primitive values when we know the value
	 * is a JSON-compliant type.
	 *
	 * @param {*} obj
	 * @return {Boolean}
	 */

	function isObject(obj) {
	  return obj !== null && typeof obj === 'object';
	}

	/**
	 * Strict object type check. Only returns true
	 * for plain JavaScript objects.
	 *
	 * @param {*} obj
	 * @return {Boolean}
	 */

	var toString = Object.prototype.toString;
	var OBJECT_STRING = '[object Object]';

	function isPlainObject(obj) {
	  return toString.call(obj) === OBJECT_STRING;
	}

	/**
	 * Array type check.
	 *
	 * @param {*} obj
	 * @return {Boolean}
	 */

	var isArray = Array.isArray;

	/**
	 * Define a non-enumerable property
	 *
	 * @param {Object} obj
	 * @param {String} key
	 * @param {*} val
	 * @param {Boolean} [enumerable]
	 */

	function def(obj, key, val, enumerable) {
	  Object.defineProperty(obj, key, {
	    value: val,
	    enumerable: !!enumerable,
	    writable: true,
	    configurable: true
	  });
	}

	/**
	 * Debounce a function so it only gets called after the
	 * input stops arriving after the given wait period.
	 *
	 * @param {Function} func
	 * @param {Number} wait
	 * @return {Function} - the debounced function
	 */

	function _debounce(func, wait) {
	  var timeout, args, context, timestamp, result;
	  var later = function later() {
	    var last = Date.now() - timestamp;
	    if (last < wait && last >= 0) {
	      timeout = setTimeout(later, wait - last);
	    } else {
	      timeout = null;
	      result = func.apply(context, args);
	      if (!timeout) context = args = null;
	    }
	  };
	  return function () {
	    context = this;
	    args = arguments;
	    timestamp = Date.now();
	    if (!timeout) {
	      timeout = setTimeout(later, wait);
	    }
	    return result;
	  };
	}

	/**
	 * Manual indexOf because it's slightly faster than
	 * native.
	 *
	 * @param {Array} arr
	 * @param {*} obj
	 */

	function indexOf(arr, obj) {
	  var i = arr.length;
	  while (i--) {
	    if (arr[i] === obj) return i;
	  }
	  return -1;
	}

	/**
	 * Make a cancellable version of an async callback.
	 *
	 * @param {Function} fn
	 * @return {Function}
	 */

	function cancellable(fn) {
	  var cb = function cb() {
	    if (!cb.cancelled) {
	      return fn.apply(this, arguments);
	    }
	  };
	  cb.cancel = function () {
	    cb.cancelled = true;
	  };
	  return cb;
	}

	/**
	 * Check if two values are loosely equal - that is,
	 * if they are plain objects, do they have the same shape?
	 *
	 * @param {*} a
	 * @param {*} b
	 * @return {Boolean}
	 */

	function looseEqual(a, b) {
	  /* eslint-disable eqeqeq */
	  return a == b || (isObject(a) && isObject(b) ? JSON.stringify(a) === JSON.stringify(b) : false);
	  /* eslint-enable eqeqeq */
	}

	var hasProto = ('__proto__' in {});

	// Browser environment sniffing
	var inBrowser = typeof window !== 'undefined' && Object.prototype.toString.call(window) !== '[object Object]';

	var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

	var isIE9 = inBrowser && navigator.userAgent.toLowerCase().indexOf('msie 9.0') > 0;

	var isAndroid = inBrowser && navigator.userAgent.toLowerCase().indexOf('android') > 0;

	var transitionProp = undefined;
	var transitionEndEvent = undefined;
	var animationProp = undefined;
	var animationEndEvent = undefined;

	// Transition property/event sniffing
	if (inBrowser && !isIE9) {
	  var isWebkitTrans = window.ontransitionend === undefined && window.onwebkittransitionend !== undefined;
	  var isWebkitAnim = window.onanimationend === undefined && window.onwebkitanimationend !== undefined;
	  transitionProp = isWebkitTrans ? 'WebkitTransition' : 'transition';
	  transitionEndEvent = isWebkitTrans ? 'webkitTransitionEnd' : 'transitionend';
	  animationProp = isWebkitAnim ? 'WebkitAnimation' : 'animation';
	  animationEndEvent = isWebkitAnim ? 'webkitAnimationEnd' : 'animationend';
	}

	/**
	 * Defer a task to execute it asynchronously. Ideally this
	 * should be executed as a microtask, so we leverage
	 * MutationObserver if it's available, and fallback to
	 * setTimeout(0).
	 *
	 * @param {Function} cb
	 * @param {Object} ctx
	 */

	var nextTick = (function () {
	  var callbacks = [];
	  var pending = false;
	  var timerFunc;
	  function nextTickHandler() {
	    pending = false;
	    var copies = callbacks.slice(0);
	    callbacks = [];
	    for (var i = 0; i < copies.length; i++) {
	      copies[i]();
	    }
	  }

	  /* istanbul ignore if */
	  if (typeof MutationObserver !== 'undefined') {
	    var counter = 1;
	    var observer = new MutationObserver(nextTickHandler);
	    var textNode = document.createTextNode(counter);
	    observer.observe(textNode, {
	      characterData: true
	    });
	    timerFunc = function () {
	      counter = (counter + 1) % 2;
	      textNode.data = counter;
	    };
	  } else {
	    // webpack attempts to inject a shim for setImmediate
	    // if it is used as a global, so we have to work around that to
	    // avoid bundling unnecessary code.
	    var context = inBrowser ? window : typeof global !== 'undefined' ? global : {};
	    timerFunc = context.setImmediate || setTimeout;
	  }
	  return function (cb, ctx) {
	    var func = ctx ? function () {
	      cb.call(ctx);
	    } : cb;
	    callbacks.push(func);
	    if (pending) return;
	    pending = true;
	    timerFunc(nextTickHandler, 0);
	  };
	})();

	function Cache(limit) {
	  this.size = 0;
	  this.limit = limit;
	  this.head = this.tail = undefined;
	  this._keymap = Object.create(null);
	}

	var p = Cache.prototype;

	/**
	 * Put <value> into the cache associated with <key>.
	 * Returns the entry which was removed to make room for
	 * the new entry. Otherwise undefined is returned.
	 * (i.e. if there was enough room already).
	 *
	 * @param {String} key
	 * @param {*} value
	 * @return {Entry|undefined}
	 */

	p.put = function (key, value) {
	  var removed;
	  if (this.size === this.limit) {
	    removed = this.shift();
	  }

	  var entry = this.get(key, true);
	  if (!entry) {
	    entry = {
	      key: key
	    };
	    this._keymap[key] = entry;
	    if (this.tail) {
	      this.tail.newer = entry;
	      entry.older = this.tail;
	    } else {
	      this.head = entry;
	    }
	    this.tail = entry;
	    this.size++;
	  }
	  entry.value = value;

	  return removed;
	};

	/**
	 * Purge the least recently used (oldest) entry from the
	 * cache. Returns the removed entry or undefined if the
	 * cache was empty.
	 */

	p.shift = function () {
	  var entry = this.head;
	  if (entry) {
	    this.head = this.head.newer;
	    this.head.older = undefined;
	    entry.newer = entry.older = undefined;
	    this._keymap[entry.key] = undefined;
	    this.size--;
	  }
	  return entry;
	};

	/**
	 * Get and register recent use of <key>. Returns the value
	 * associated with <key> or undefined if not in cache.
	 *
	 * @param {String} key
	 * @param {Boolean} returnEntry
	 * @return {Entry|*}
	 */

	p.get = function (key, returnEntry) {
	  var entry = this._keymap[key];
	  if (entry === undefined) return;
	  if (entry === this.tail) {
	    return returnEntry ? entry : entry.value;
	  }
	  // HEAD--------------TAIL
	  //   <.older   .newer>
	  //  <--- add direction --
	  //   A  B  C  <D>  E
	  if (entry.newer) {
	    if (entry === this.head) {
	      this.head = entry.newer;
	    }
	    entry.newer.older = entry.older; // C <-- E.
	  }
	  if (entry.older) {
	    entry.older.newer = entry.newer; // C. --> E
	  }
	  entry.newer = undefined; // D --x
	  entry.older = this.tail; // D. --> E
	  if (this.tail) {
	    this.tail.newer = entry; // E. <-- D
	  }
	  this.tail = entry;
	  return returnEntry ? entry : entry.value;
	};

	var cache$1 = new Cache(1000);
	var filterTokenRE = /[^\s'"]+|'[^']*'|"[^"]*"/g;
	var reservedArgRE = /^in$|^-?\d+/;

	/**
	 * Parser state
	 */

	var str;
	var dir;
	var c;
	var prev;
	var i;
	var l;
	var lastFilterIndex;
	var inSingle;
	var inDouble;
	var curly;
	var square;
	var paren;
	/**
	 * Push a filter to the current directive object
	 */

	function pushFilter() {
	  var exp = str.slice(lastFilterIndex, i).trim();
	  var filter;
	  if (exp) {
	    filter = {};
	    var tokens = exp.match(filterTokenRE);
	    filter.name = tokens[0];
	    if (tokens.length > 1) {
	      filter.args = tokens.slice(1).map(processFilterArg);
	    }
	  }
	  if (filter) {
	    (dir.filters = dir.filters || []).push(filter);
	  }
	  lastFilterIndex = i + 1;
	}

	/**
	 * Check if an argument is dynamic and strip quotes.
	 *
	 * @param {String} arg
	 * @return {Object}
	 */

	function processFilterArg(arg) {
	  if (reservedArgRE.test(arg)) {
	    return {
	      value: toNumber(arg),
	      dynamic: false
	    };
	  } else {
	    var stripped = stripQuotes(arg);
	    var dynamic = stripped === arg;
	    return {
	      value: dynamic ? arg : stripped,
	      dynamic: dynamic
	    };
	  }
	}

	/**
	 * Parse a directive value and extract the expression
	 * and its filters into a descriptor.
	 *
	 * Example:
	 *
	 * "a + 1 | uppercase" will yield:
	 * {
	 *   expression: 'a + 1',
	 *   filters: [
	 *     { name: 'uppercase', args: null }
	 *   ]
	 * }
	 *
	 * @param {String} str
	 * @return {Object}
	 */

	function parseDirective(s) {

	  var hit = cache$1.get(s);
	  if (hit) {
	    return hit;
	  }

	  // reset parser state
	  str = s;
	  inSingle = inDouble = false;
	  curly = square = paren = 0;
	  lastFilterIndex = 0;
	  dir = {};

	  for (i = 0, l = str.length; i < l; i++) {
	    prev = c;
	    c = str.charCodeAt(i);
	    if (inSingle) {
	      // check single quote
	      if (c === 0x27 && prev !== 0x5C) inSingle = !inSingle;
	    } else if (inDouble) {
	      // check double quote
	      if (c === 0x22 && prev !== 0x5C) inDouble = !inDouble;
	    } else if (c === 0x7C && // pipe
	    str.charCodeAt(i + 1) !== 0x7C && str.charCodeAt(i - 1) !== 0x7C) {
	      if (dir.expression == null) {
	        // first filter, end of expression
	        lastFilterIndex = i + 1;
	        dir.expression = str.slice(0, i).trim();
	      } else {
	        // already has filter
	        pushFilter();
	      }
	    } else {
	      switch (c) {
	        case 0x22:
	          inDouble = true;break; // "
	        case 0x27:
	          inSingle = true;break; // '
	        case 0x28:
	          paren++;break; // (
	        case 0x29:
	          paren--;break; // )
	        case 0x5B:
	          square++;break; // [
	        case 0x5D:
	          square--;break; // ]
	        case 0x7B:
	          curly++;break; // {
	        case 0x7D:
	          curly--;break; // }
	      }
	    }
	  }

	  if (dir.expression == null) {
	    dir.expression = str.slice(0, i).trim();
	  } else if (lastFilterIndex !== 0) {
	    pushFilter();
	  }

	  cache$1.put(s, dir);
	  return dir;
	}

	var directive = Object.freeze({
	  parseDirective: parseDirective
	});

	var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;
	var cache = undefined;
	var tagRE = undefined;
	var htmlRE = undefined;
	/**
	 * Escape a string so it can be used in a RegExp
	 * constructor.
	 *
	 * @param {String} str
	 */

	function escapeRegex(str) {
	  return str.replace(regexEscapeRE, '\\$&');
	}

	function compileRegex() {
	  var open = escapeRegex(config.delimiters[0]);
	  var close = escapeRegex(config.delimiters[1]);
	  var unsafeOpen = escapeRegex(config.unsafeDelimiters[0]);
	  var unsafeClose = escapeRegex(config.unsafeDelimiters[1]);
	  tagRE = new RegExp(unsafeOpen + '(.+?)' + unsafeClose + '|' + open + '(.+?)' + close, 'g');
	  htmlRE = new RegExp('^' + unsafeOpen + '.*' + unsafeClose + '$');
	  // reset cache
	  cache = new Cache(1000);
	}

	/**
	 * Parse a template text string into an array of tokens.
	 *
	 * @param {String} text
	 * @return {Array<Object> | null}
	 *               - {String} type
	 *               - {String} value
	 *               - {Boolean} [html]
	 *               - {Boolean} [oneTime]
	 */

	function parseText(text) {
	  if (!cache) {
	    compileRegex();
	  }
	  var hit = cache.get(text);
	  if (hit) {
	    return hit;
	  }
	  text = text.replace(/\n/g, '');
	  if (!tagRE.test(text)) {
	    return null;
	  }
	  var tokens = [];
	  var lastIndex = tagRE.lastIndex = 0;
	  var match, index, html, value, first, oneTime;
	  /* eslint-disable no-cond-assign */
	  while (match = tagRE.exec(text)) {
	    /* eslint-enable no-cond-assign */
	    index = match.index;
	    // push text token
	    if (index > lastIndex) {
	      tokens.push({
	        value: text.slice(lastIndex, index)
	      });
	    }
	    // tag token
	    html = htmlRE.test(match[0]);
	    value = html ? match[1] : match[2];
	    first = value.charCodeAt(0);
	    oneTime = first === 42; // *
	    value = oneTime ? value.slice(1) : value;
	    tokens.push({
	      tag: true,
	      value: value.trim(),
	      html: html,
	      oneTime: oneTime
	    });
	    lastIndex = index + match[0].length;
	  }
	  if (lastIndex < text.length) {
	    tokens.push({
	      value: text.slice(lastIndex)
	    });
	  }
	  cache.put(text, tokens);
	  return tokens;
	}

	/**
	 * Format a list of tokens into an expression.
	 * e.g. tokens parsed from 'a {{b}} c' can be serialized
	 * into one single expression as '"a " + b + " c"'.
	 *
	 * @param {Array} tokens
	 * @param {Vue} [vm]
	 * @return {String}
	 */

	function tokensToExp(tokens, vm) {
	  if (tokens.length > 1) {
	    return tokens.map(function (token) {
	      return formatToken(token, vm);
	    }).join('+');
	  } else {
	    return formatToken(tokens[0], vm, true);
	  }
	}

	/**
	 * Format a single token.
	 *
	 * @param {Object} token
	 * @param {Vue} [vm]
	 * @param {Boolean} [single]
	 * @return {String}
	 */

	function formatToken(token, vm, single) {
	  return token.tag ? token.oneTime && vm ? '"' + vm.$eval(token.value) + '"' : inlineFilters(token.value, single) : '"' + token.value + '"';
	}

	/**
	 * For an attribute with multiple interpolation tags,
	 * e.g. attr="some-{{thing | filter}}", in order to combine
	 * the whole thing into a single watchable expression, we
	 * have to inline those filters. This function does exactly
	 * that. This is a bit hacky but it avoids heavy changes
	 * to directive parser and watcher mechanism.
	 *
	 * @param {String} exp
	 * @param {Boolean} single
	 * @return {String}
	 */

	var filterRE$1 = /[^|]\|[^|]/;
	function inlineFilters(exp, single) {
	  if (!filterRE$1.test(exp)) {
	    return single ? exp : '(' + exp + ')';
	  } else {
	    var dir = parseDirective(exp);
	    if (!dir.filters) {
	      return '(' + exp + ')';
	    } else {
	      return 'this._applyFilters(' + dir.expression + // value
	      ',null,' + // oldValue (null for read)
	      JSON.stringify(dir.filters) + // filter descriptors
	      ',false)'; // write?
	    }
	  }
	}

	var text$1 = Object.freeze({
	  compileRegex: compileRegex,
	  parseText: parseText,
	  tokensToExp: tokensToExp
	});

	var delimiters = ['{{', '}}'];
	var unsafeDelimiters = ['{{{', '}}}'];

	var config = Object.defineProperties({

	  /**
	   * Whether to print debug messages.
	   * Also enables stack trace for warnings.
	   *
	   * @type {Boolean}
	   */

	  debug: false,

	  /**
	   * Whether to suppress warnings.
	   *
	   * @type {Boolean}
	   */

	  silent: false,

	  /**
	   * Whether to use async rendering.
	   */

	  async: true,

	  /**
	   * Whether to warn against errors caught when evaluating
	   * expressions.
	   */

	  warnExpressionErrors: true,

	  /**
	   * Whether or not to handle fully object properties which
	   * are already backed by getters and seters. Depending on
	   * use case and environment, this might introduce non-neglible
	   * performance penalties.
	   */
	  convertAllProperties: false,

	  /**
	   * Internal flag to indicate the delimiters have been
	   * changed.
	   *
	   * @type {Boolean}
	   */

	  _delimitersChanged: true,

	  /**
	   * List of asset types that a component can own.
	   *
	   * @type {Array}
	   */

	  _assetTypes: ['component', 'directive', 'elementDirective', 'filter', 'transition', 'partial'],

	  /**
	   * prop binding modes
	   */

	  _propBindingModes: {
	    ONE_WAY: 0,
	    TWO_WAY: 1,
	    ONE_TIME: 2
	  },

	  /**
	   * Max circular updates allowed in a batcher flush cycle.
	   */

	  _maxUpdateCount: 100

	}, {
	  delimiters: { /**
	                 * Interpolation delimiters. Changing these would trigger
	                 * the text parser to re-compile the regular expressions.
	                 *
	                 * @type {Array<String>}
	                 */

	    get: function get() {
	      return delimiters;
	    },
	    set: function set(val) {
	      delimiters = val;
	      compileRegex();
	    },
	    configurable: true,
	    enumerable: true
	  },
	  unsafeDelimiters: {
	    get: function get() {
	      return unsafeDelimiters;
	    },
	    set: function set(val) {
	      unsafeDelimiters = val;
	      compileRegex();
	    },
	    configurable: true,
	    enumerable: true
	  }
	});

	var warn = undefined;

	if (process.env.NODE_ENV !== 'production') {
	  (function () {
	    var hasConsole = typeof console !== 'undefined';
	    warn = function (msg, e) {
	      if (hasConsole && (!config.silent || config.debug)) {
	        console.warn('[Vue warn]: ' + msg);
	        /* istanbul ignore if */
	        if (config.debug) {
	          if (e) {
	            throw e;
	          } else {
	            console.warn(new Error('Warning Stack Trace').stack);
	          }
	        }
	      }
	    };
	  })();
	}

	/**
	 * Append with transition.
	 *
	 * @param {Element} el
	 * @param {Element} target
	 * @param {Vue} vm
	 * @param {Function} [cb]
	 */

	function appendWithTransition(el, target, vm, cb) {
	  applyTransition(el, 1, function () {
	    target.appendChild(el);
	  }, vm, cb);
	}

	/**
	 * InsertBefore with transition.
	 *
	 * @param {Element} el
	 * @param {Element} target
	 * @param {Vue} vm
	 * @param {Function} [cb]
	 */

	function beforeWithTransition(el, target, vm, cb) {
	  applyTransition(el, 1, function () {
	    before(el, target);
	  }, vm, cb);
	}

	/**
	 * Remove with transition.
	 *
	 * @param {Element} el
	 * @param {Vue} vm
	 * @param {Function} [cb]
	 */

	function removeWithTransition(el, vm, cb) {
	  applyTransition(el, -1, function () {
	    remove(el);
	  }, vm, cb);
	}

	/**
	 * Apply transitions with an operation callback.
	 *
	 * @param {Element} el
	 * @param {Number} direction
	 *                  1: enter
	 *                 -1: leave
	 * @param {Function} op - the actual DOM operation
	 * @param {Vue} vm
	 * @param {Function} [cb]
	 */

	function applyTransition(el, direction, op, vm, cb) {
	  var transition = el.__v_trans;
	  if (!transition ||
	  // skip if there are no js hooks and CSS transition is
	  // not supported
	  !transition.hooks && !transitionEndEvent ||
	  // skip transitions for initial compile
	  !vm._isCompiled ||
	  // if the vm is being manipulated by a parent directive
	  // during the parent's compilation phase, skip the
	  // animation.
	  vm.$parent && !vm.$parent._isCompiled) {
	    op();
	    if (cb) cb();
	    return;
	  }
	  var action = direction > 0 ? 'enter' : 'leave';
	  transition[action](op, cb);
	}

	/**
	 * Query an element selector if it's not an element already.
	 *
	 * @param {String|Element} el
	 * @return {Element}
	 */

	function query(el) {
	  if (typeof el === 'string') {
	    var selector = el;
	    el = document.querySelector(el);
	    if (!el) {
	      process.env.NODE_ENV !== 'production' && warn('Cannot find element: ' + selector);
	    }
	  }
	  return el;
	}

	/**
	 * Check if a node is in the document.
	 * Note: document.documentElement.contains should work here
	 * but always returns false for comment nodes in phantomjs,
	 * making unit tests difficult. This is fixed by doing the
	 * contains() check on the node's parentNode instead of
	 * the node itself.
	 *
	 * @param {Node} node
	 * @return {Boolean}
	 */

	function inDoc(node) {
	  var doc = document.documentElement;
	  var parent = node && node.parentNode;
	  return doc === node || doc === parent || !!(parent && parent.nodeType === 1 && doc.contains(parent));
	}

	/**
	 * Get and remove an attribute from a node.
	 *
	 * @param {Node} node
	 * @param {String} _attr
	 */

	function getAttr(node, _attr) {
	  var val = node.getAttribute(_attr);
	  if (val !== null) {
	    node.removeAttribute(_attr);
	  }
	  return val;
	}

	/**
	 * Get an attribute with colon or v-bind: prefix.
	 *
	 * @param {Node} node
	 * @param {String} name
	 * @return {String|null}
	 */

	function getBindAttr(node, name) {
	  var val = getAttr(node, ':' + name);
	  if (val === null) {
	    val = getAttr(node, 'v-bind:' + name);
	  }
	  return val;
	}

	/**
	 * Check the presence of a bind attribute.
	 *
	 * @param {Node} node
	 * @param {String} name
	 * @return {Boolean}
	 */

	function hasBindAttr(node, name) {
	  return node.hasAttribute(name) || node.hasAttribute(':' + name) || node.hasAttribute('v-bind:' + name);
	}

	/**
	 * Insert el before target
	 *
	 * @param {Element} el
	 * @param {Element} target
	 */

	function before(el, target) {
	  target.parentNode.insertBefore(el, target);
	}

	/**
	 * Insert el after target
	 *
	 * @param {Element} el
	 * @param {Element} target
	 */

	function after(el, target) {
	  if (target.nextSibling) {
	    before(el, target.nextSibling);
	  } else {
	    target.parentNode.appendChild(el);
	  }
	}

	/**
	 * Remove el from DOM
	 *
	 * @param {Element} el
	 */

	function remove(el) {
	  el.parentNode.removeChild(el);
	}

	/**
	 * Prepend el to target
	 *
	 * @param {Element} el
	 * @param {Element} target
	 */

	function prepend(el, target) {
	  if (target.firstChild) {
	    before(el, target.firstChild);
	  } else {
	    target.appendChild(el);
	  }
	}

	/**
	 * Replace target with el
	 *
	 * @param {Element} target
	 * @param {Element} el
	 */

	function replace(target, el) {
	  var parent = target.parentNode;
	  if (parent) {
	    parent.replaceChild(el, target);
	  }
	}

	/**
	 * Add event listener shorthand.
	 *
	 * @param {Element} el
	 * @param {String} event
	 * @param {Function} cb
	 * @param {Boolean} [useCapture]
	 */

	function on$1(el, event, cb, useCapture) {
	  el.addEventListener(event, cb, useCapture);
	}

	/**
	 * Remove event listener shorthand.
	 *
	 * @param {Element} el
	 * @param {String} event
	 * @param {Function} cb
	 */

	function off(el, event, cb) {
	  el.removeEventListener(event, cb);
	}

	/**
	 * In IE9, setAttribute('class') will result in empty class
	 * if the element also has the :class attribute; However in
	 * PhantomJS, setting `className` does not work on SVG elements...
	 * So we have to do a conditional check here.
	 *
	 * @param {Element} el
	 * @param {String} cls
	 */

	function setClass(el, cls) {
	  /* istanbul ignore if */
	  if (isIE9 && !(el instanceof SVGElement)) {
	    el.className = cls;
	  } else {
	    el.setAttribute('class', cls);
	  }
	}

	/**
	 * Add class with compatibility for IE & SVG
	 *
	 * @param {Element} el
	 * @param {String} cls
	 */

	function addClass(el, cls) {
	  if (el.classList) {
	    el.classList.add(cls);
	  } else {
	    var cur = ' ' + (el.getAttribute('class') || '') + ' ';
	    if (cur.indexOf(' ' + cls + ' ') < 0) {
	      setClass(el, (cur + cls).trim());
	    }
	  }
	}

	/**
	 * Remove class with compatibility for IE & SVG
	 *
	 * @param {Element} el
	 * @param {String} cls
	 */

	function removeClass(el, cls) {
	  if (el.classList) {
	    el.classList.remove(cls);
	  } else {
	    var cur = ' ' + (el.getAttribute('class') || '') + ' ';
	    var tar = ' ' + cls + ' ';
	    while (cur.indexOf(tar) >= 0) {
	      cur = cur.replace(tar, ' ');
	    }
	    setClass(el, cur.trim());
	  }
	  if (!el.className) {
	    el.removeAttribute('class');
	  }
	}

	/**
	 * Extract raw content inside an element into a temporary
	 * container div
	 *
	 * @param {Element} el
	 * @param {Boolean} asFragment
	 * @return {Element}
	 */

	function extractContent(el, asFragment) {
	  var child;
	  var rawContent;
	  /* istanbul ignore if */
	  if (isTemplate(el) && el.content instanceof DocumentFragment) {
	    el = el.content;
	  }
	  if (el.hasChildNodes()) {
	    trimNode(el);
	    rawContent = asFragment ? document.createDocumentFragment() : document.createElement('div');
	    /* eslint-disable no-cond-assign */
	    while (child = el.firstChild) {
	      /* eslint-enable no-cond-assign */
	      rawContent.appendChild(child);
	    }
	  }
	  return rawContent;
	}

	/**
	 * Trim possible empty head/tail text and comment
	 * nodes inside a parent.
	 *
	 * @param {Node} node
	 */

	function trimNode(node) {
	  var child;
	  /* eslint-disable no-sequences */
	  while ((child = node.firstChild, isTrimmable(child))) {
	    node.removeChild(child);
	  }
	  while ((child = node.lastChild, isTrimmable(child))) {
	    node.removeChild(child);
	  }
	  /* eslint-enable no-sequences */
	}

	function isTrimmable(node) {
	  return node && (node.nodeType === 3 && !node.data.trim() || node.nodeType === 8);
	}

	/**
	 * Check if an element is a template tag.
	 * Note if the template appears inside an SVG its tagName
	 * will be in lowercase.
	 *
	 * @param {Element} el
	 */

	function isTemplate(el) {
	  return el.tagName && el.tagName.toLowerCase() === 'template';
	}

	/**
	 * Create an "anchor" for performing dom insertion/removals.
	 * This is used in a number of scenarios:
	 * - fragment instance
	 * - v-html
	 * - v-if
	 * - v-for
	 * - component
	 *
	 * @param {String} content
	 * @param {Boolean} persist - IE trashes empty textNodes on
	 *                            cloneNode(true), so in certain
	 *                            cases the anchor needs to be
	 *                            non-empty to be persisted in
	 *                            templates.
	 * @return {Comment|Text}
	 */

	function createAnchor(content, persist) {
	  var anchor = config.debug ? document.createComment(content) : document.createTextNode(persist ? ' ' : '');
	  anchor.__vue_anchor = true;
	  return anchor;
	}

	/**
	 * Find a component ref attribute that starts with $.
	 *
	 * @param {Element} node
	 * @return {String|undefined}
	 */

	var refRE = /^v-ref:/;

	function findRef(node) {
	  if (node.hasAttributes()) {
	    var attrs = node.attributes;
	    for (var i = 0, l = attrs.length; i < l; i++) {
	      var name = attrs[i].name;
	      if (refRE.test(name)) {
	        return camelize(name.replace(refRE, ''));
	      }
	    }
	  }
	}

	/**
	 * Map a function to a range of nodes .
	 *
	 * @param {Node} node
	 * @param {Node} end
	 * @param {Function} op
	 */

	function mapNodeRange(node, end, op) {
	  var next;
	  while (node !== end) {
	    next = node.nextSibling;
	    op(node);
	    node = next;
	  }
	  op(end);
	}

	/**
	 * Remove a range of nodes with transition, store
	 * the nodes in a fragment with correct ordering,
	 * and call callback when done.
	 *
	 * @param {Node} start
	 * @param {Node} end
	 * @param {Vue} vm
	 * @param {DocumentFragment} frag
	 * @param {Function} cb
	 */

	function removeNodeRange(start, end, vm, frag, cb) {
	  var done = false;
	  var removed = 0;
	  var nodes = [];
	  mapNodeRange(start, end, function (node) {
	    if (node === end) done = true;
	    nodes.push(node);
	    removeWithTransition(node, vm, onRemoved);
	  });
	  function onRemoved() {
	    removed++;
	    if (done && removed >= nodes.length) {
	      for (var i = 0; i < nodes.length; i++) {
	        frag.appendChild(nodes[i]);
	      }
	      cb && cb();
	    }
	  }
	}

	var commonTagRE = /^(div|p|span|img|a|b|i|br|ul|ol|li|h1|h2|h3|h4|h5|h6|code|pre|table|th|td|tr|form|label|input|select|option|nav|article|section|header|footer)$/;
	var reservedTagRE = /^(slot|partial|component)$/;

	/**
	 * Check if an element is a component, if yes return its
	 * component id.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Object|undefined}
	 */

	function checkComponentAttr(el, options) {
	  var tag = el.tagName.toLowerCase();
	  var hasAttrs = el.hasAttributes();
	  if (!commonTagRE.test(tag) && !reservedTagRE.test(tag)) {
	    if (resolveAsset(options, 'components', tag)) {
	      return { id: tag };
	    } else {
	      var is = hasAttrs && getIsBinding(el);
	      if (is) {
	        return is;
	      } else if (process.env.NODE_ENV !== 'production') {
	        if (tag.indexOf('-') > -1 || /HTMLUnknownElement/.test(el.toString()) &&
	        // Chrome returns unknown for several HTML5 elements.
	        // https://code.google.com/p/chromium/issues/detail?id=540526
	        !/^(data|time|rtc|rb)$/.test(tag)) {
	          warn('Unknown custom element: <' + tag + '> - did you ' + 'register the component correctly? For recursive components, ' + 'make sure to provide the "name" option.');
	        }
	      }
	    }
	  } else if (hasAttrs) {
	    return getIsBinding(el);
	  }
	}

	/**
	 * Get "is" binding from an element.
	 *
	 * @param {Element} el
	 * @return {Object|undefined}
	 */

	function getIsBinding(el) {
	  // dynamic syntax
	  var exp = getAttr(el, 'is');
	  if (exp != null) {
	    return { id: exp };
	  } else {
	    exp = getBindAttr(el, 'is');
	    if (exp != null) {
	      return { id: exp, dynamic: true };
	    }
	  }
	}

	/**
	 * Set a prop's initial value on a vm and its data object.
	 *
	 * @param {Vue} vm
	 * @param {Object} prop
	 * @param {*} value
	 */

	function initProp(vm, prop, value) {
	  var key = prop.path;
	  value = coerceProp(prop, value);
	  vm[key] = vm._data[key] = assertProp(prop, value) ? value : undefined;
	}

	/**
	 * Assert whether a prop is valid.
	 *
	 * @param {Object} prop
	 * @param {*} value
	 */

	function assertProp(prop, value) {
	  // if a prop is not provided and is not required,
	  // skip the check.
	  if (prop.raw === null && !prop.required) {
	    return true;
	  }
	  var options = prop.options;
	  var type = options.type;
	  var valid = true;
	  var expectedType;
	  if (type) {
	    if (type === String) {
	      expectedType = 'string';
	      valid = typeof value === expectedType;
	    } else if (type === Number) {
	      expectedType = 'number';
	      valid = typeof value === 'number';
	    } else if (type === Boolean) {
	      expectedType = 'boolean';
	      valid = typeof value === 'boolean';
	    } else if (type === Function) {
	      expectedType = 'function';
	      valid = typeof value === 'function';
	    } else if (type === Object) {
	      expectedType = 'object';
	      valid = isPlainObject(value);
	    } else if (type === Array) {
	      expectedType = 'array';
	      valid = isArray(value);
	    } else {
	      valid = value instanceof type;
	    }
	  }
	  if (!valid) {
	    process.env.NODE_ENV !== 'production' && warn('Invalid prop: type check failed for ' + prop.path + '="' + prop.raw + '".' + ' Expected ' + formatType(expectedType) + ', got ' + formatValue(value) + '.');
	    return false;
	  }
	  var validator = options.validator;
	  if (validator) {
	    if (!validator.call(null, value)) {
	      process.env.NODE_ENV !== 'production' && warn('Invalid prop: custom validator check failed for ' + prop.path + '="' + prop.raw + '"');
	      return false;
	    }
	  }
	  return true;
	}

	/**
	 * Force parsing value with coerce option.
	 *
	 * @param {*} value
	 * @param {Object} options
	 * @return {*}
	 */

	function coerceProp(prop, value) {
	  var coerce = prop.options.coerce;
	  if (!coerce) {
	    return value;
	  }
	  // coerce is a function
	  return coerce(value);
	}

	function formatType(val) {
	  return val ? val.charAt(0).toUpperCase() + val.slice(1) : 'custom type';
	}

	function formatValue(val) {
	  return Object.prototype.toString.call(val).slice(8, -1);
	}

	/**
	 * Option overwriting strategies are functions that handle
	 * how to merge a parent option value and a child option
	 * value into the final value.
	 *
	 * All strategy functions follow the same signature:
	 *
	 * @param {*} parentVal
	 * @param {*} childVal
	 * @param {Vue} [vm]
	 */

	var strats = config.optionMergeStrategies = Object.create(null);

	/**
	 * Helper that recursively merges two data objects together.
	 */

	function mergeData(to, from) {
	  var key, toVal, fromVal;
	  for (key in from) {
	    toVal = to[key];
	    fromVal = from[key];
	    if (!hasOwn(to, key)) {
	      set(to, key, fromVal);
	    } else if (isObject(toVal) && isObject(fromVal)) {
	      mergeData(toVal, fromVal);
	    }
	  }
	  return to;
	}

	/**
	 * Data
	 */

	strats.data = function (parentVal, childVal, vm) {
	  if (!vm) {
	    // in a Vue.extend merge, both should be functions
	    if (!childVal) {
	      return parentVal;
	    }
	    if (typeof childVal !== 'function') {
	      process.env.NODE_ENV !== 'production' && warn('The "data" option should be a function ' + 'that returns a per-instance value in component ' + 'definitions.');
	      return parentVal;
	    }
	    if (!parentVal) {
	      return childVal;
	    }
	    // when parentVal & childVal are both present,
	    // we need to return a function that returns the
	    // merged result of both functions... no need to
	    // check if parentVal is a function here because
	    // it has to be a function to pass previous merges.
	    return function mergedDataFn() {
	      return mergeData(childVal.call(this), parentVal.call(this));
	    };
	  } else if (parentVal || childVal) {
	    return function mergedInstanceDataFn() {
	      // instance merge
	      var instanceData = typeof childVal === 'function' ? childVal.call(vm) : childVal;
	      var defaultData = typeof parentVal === 'function' ? parentVal.call(vm) : undefined;
	      if (instanceData) {
	        return mergeData(instanceData, defaultData);
	      } else {
	        return defaultData;
	      }
	    };
	  }
	};

	/**
	 * El
	 */

	strats.el = function (parentVal, childVal, vm) {
	  if (!vm && childVal && typeof childVal !== 'function') {
	    process.env.NODE_ENV !== 'production' && warn('The "el" option should be a function ' + 'that returns a per-instance value in component ' + 'definitions.');
	    return;
	  }
	  var ret = childVal || parentVal;
	  // invoke the element factory if this is instance merge
	  return vm && typeof ret === 'function' ? ret.call(vm) : ret;
	};

	/**
	 * Hooks and param attributes are merged as arrays.
	 */

	strats.init = strats.created = strats.ready = strats.attached = strats.detached = strats.beforeCompile = strats.compiled = strats.beforeDestroy = strats.destroyed = function (parentVal, childVal) {
	  return childVal ? parentVal ? parentVal.concat(childVal) : isArray(childVal) ? childVal : [childVal] : parentVal;
	};

	/**
	 * 0.11 deprecation warning
	 */

	strats.paramAttributes = function () {
	  /* istanbul ignore next */
	  process.env.NODE_ENV !== 'production' && warn('"paramAttributes" option has been deprecated in 0.12. ' + 'Use "props" instead.');
	};

	/**
	 * Assets
	 *
	 * When a vm is present (instance creation), we need to do
	 * a three-way merge between constructor options, instance
	 * options and parent options.
	 */

	function mergeAssets(parentVal, childVal) {
	  var res = Object.create(parentVal);
	  return childVal ? extend(res, guardArrayAssets(childVal)) : res;
	}

	config._assetTypes.forEach(function (type) {
	  strats[type + 's'] = mergeAssets;
	});

	/**
	 * Events & Watchers.
	 *
	 * Events & watchers hashes should not overwrite one
	 * another, so we merge them as arrays.
	 */

	strats.watch = strats.events = function (parentVal, childVal) {
	  if (!childVal) return parentVal;
	  if (!parentVal) return childVal;
	  var ret = {};
	  extend(ret, parentVal);
	  for (var key in childVal) {
	    var parent = ret[key];
	    var child = childVal[key];
	    if (parent && !isArray(parent)) {
	      parent = [parent];
	    }
	    ret[key] = parent ? parent.concat(child) : [child];
	  }
	  return ret;
	};

	/**
	 * Other object hashes.
	 */

	strats.props = strats.methods = strats.computed = function (parentVal, childVal) {
	  if (!childVal) return parentVal;
	  if (!parentVal) return childVal;
	  var ret = Object.create(null);
	  extend(ret, parentVal);
	  extend(ret, childVal);
	  return ret;
	};

	/**
	 * Default strategy.
	 */

	var defaultStrat = function defaultStrat(parentVal, childVal) {
	  return childVal === undefined ? parentVal : childVal;
	};

	/**
	 * Make sure component options get converted to actual
	 * constructors.
	 *
	 * @param {Object} options
	 */

	function guardComponents(options) {
	  if (options.components) {
	    var components = options.components = guardArrayAssets(options.components);
	    var def;
	    var ids = Object.keys(components);
	    for (var i = 0, l = ids.length; i < l; i++) {
	      var key = ids[i];
	      if (commonTagRE.test(key) || reservedTagRE.test(key)) {
	        process.env.NODE_ENV !== 'production' && warn('Do not use built-in or reserved HTML elements as component ' + 'id: ' + key);
	        continue;
	      }
	      def = components[key];
	      if (isPlainObject(def)) {
	        components[key] = Vue.extend(def);
	      }
	    }
	  }
	}

	/**
	 * Ensure all props option syntax are normalized into the
	 * Object-based format.
	 *
	 * @param {Object} options
	 */

	function guardProps(options) {
	  var props = options.props;
	  var i, val;
	  if (isArray(props)) {
	    options.props = {};
	    i = props.length;
	    while (i--) {
	      val = props[i];
	      if (typeof val === 'string') {
	        options.props[val] = null;
	      } else if (val.name) {
	        options.props[val.name] = val;
	      }
	    }
	  } else if (isPlainObject(props)) {
	    var keys = Object.keys(props);
	    i = keys.length;
	    while (i--) {
	      val = props[keys[i]];
	      if (typeof val === 'function') {
	        props[keys[i]] = { type: val };
	      }
	    }
	  }
	}

	/**
	 * Guard an Array-format assets option and converted it
	 * into the key-value Object format.
	 *
	 * @param {Object|Array} assets
	 * @return {Object}
	 */

	function guardArrayAssets(assets) {
	  if (isArray(assets)) {
	    var res = {};
	    var i = assets.length;
	    var asset;
	    while (i--) {
	      asset = assets[i];
	      var id = typeof asset === 'function' ? asset.options && asset.options.name || asset.id : asset.name || asset.id;
	      if (!id) {
	        process.env.NODE_ENV !== 'production' && warn('Array-syntax assets must provide a "name" or "id" field.');
	      } else {
	        res[id] = asset;
	      }
	    }
	    return res;
	  }
	  return assets;
	}

	/**
	 * Merge two option objects into a new one.
	 * Core utility used in both instantiation and inheritance.
	 *
	 * @param {Object} parent
	 * @param {Object} child
	 * @param {Vue} [vm] - if vm is present, indicates this is
	 *                     an instantiation merge.
	 */

	function mergeOptions(parent, child, vm) {
	  guardComponents(child);
	  guardProps(child);
	  var options = {};
	  var key;
	  if (child.mixins) {
	    for (var i = 0, l = child.mixins.length; i < l; i++) {
	      parent = mergeOptions(parent, child.mixins[i], vm);
	    }
	  }
	  for (key in parent) {
	    mergeField(key);
	  }
	  for (key in child) {
	    if (!hasOwn(parent, key)) {
	      mergeField(key);
	    }
	  }
	  function mergeField(key) {
	    var strat = strats[key] || defaultStrat;
	    options[key] = strat(parent[key], child[key], vm, key);
	  }
	  return options;
	}

	/**
	 * Resolve an asset.
	 * This function is used because child instances need access
	 * to assets defined in its ancestor chain.
	 *
	 * @param {Object} options
	 * @param {String} type
	 * @param {String} id
	 * @return {Object|Function}
	 */

	function resolveAsset(options, type, id) {
	  /* istanbul ignore if */
	  if (typeof id !== 'string') {
	    return;
	  }
	  var assets = options[type];
	  var camelizedId;
	  return assets[id] ||
	  // camelCase ID
	  assets[camelizedId = camelize(id)] ||
	  // Pascal Case ID
	  assets[camelizedId.charAt(0).toUpperCase() + camelizedId.slice(1)];
	}

	/**
	 * Assert asset exists
	 */

	function assertAsset(val, type, id) {
	  if (!val) {
	    process.env.NODE_ENV !== 'production' && warn('Failed to resolve ' + type + ': ' + id);
	  }
	}

	var arrayProto = Array.prototype;
	var arrayMethods = Object.create(arrayProto)

	/**
	 * Intercept mutating methods and emit events
	 */

	;['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'].forEach(function (method) {
	  // cache original method
	  var original = arrayProto[method];
	  def(arrayMethods, method, function mutator() {
	    // avoid leaking arguments:
	    // http://jsperf.com/closure-with-arguments
	    var i = arguments.length;
	    var args = new Array(i);
	    while (i--) {
	      args[i] = arguments[i];
	    }
	    var result = original.apply(this, args);
	    var ob = this.__ob__;
	    var inserted;
	    switch (method) {
	      case 'push':
	        inserted = args;
	        break;
	      case 'unshift':
	        inserted = args;
	        break;
	      case 'splice':
	        inserted = args.slice(2);
	        break;
	    }
	    if (inserted) ob.observeArray(inserted);
	    // notify change
	    ob.dep.notify();
	    return result;
	  });
	});

	/**
	 * Swap the element at the given index with a new value
	 * and emits corresponding event.
	 *
	 * @param {Number} index
	 * @param {*} val
	 * @return {*} - replaced element
	 */

	def(arrayProto, '$set', function $set(index, val) {
	  if (index >= this.length) {
	    this.length = Number(index) + 1;
	  }
	  return this.splice(index, 1, val)[0];
	});

	/**
	 * Convenience method to remove the element at given index.
	 *
	 * @param {Number} index
	 * @param {*} val
	 */

	def(arrayProto, '$remove', function $remove(item) {
	  /* istanbul ignore if */
	  if (!this.length) return;
	  var index = indexOf(this, item);
	  if (index > -1) {
	    return this.splice(index, 1);
	  }
	});

	var uid$3 = 0;

	/**
	 * A dep is an observable that can have multiple
	 * directives subscribing to it.
	 *
	 * @constructor
	 */
	function Dep() {
	  this.id = uid$3++;
	  this.subs = [];
	}

	// the current target watcher being evaluated.
	// this is globally unique because there could be only one
	// watcher being evaluated at any time.
	Dep.target = null;

	/**
	 * Add a directive subscriber.
	 *
	 * @param {Directive} sub
	 */

	Dep.prototype.addSub = function (sub) {
	  this.subs.push(sub);
	};

	/**
	 * Remove a directive subscriber.
	 *
	 * @param {Directive} sub
	 */

	Dep.prototype.removeSub = function (sub) {
	  this.subs.$remove(sub);
	};

	/**
	 * Add self as a dependency to the target watcher.
	 */

	Dep.prototype.depend = function () {
	  Dep.target.addDep(this);
	};

	/**
	 * Notify all subscribers of a new value.
	 */

	Dep.prototype.notify = function () {
	  // stablize the subscriber list first
	  var subs = toArray(this.subs);
	  for (var i = 0, l = subs.length; i < l; i++) {
	    subs[i].update();
	  }
	};

	var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

	/**
	 * Observer class that are attached to each observed
	 * object. Once attached, the observer converts target
	 * object's property keys into getter/setters that
	 * collect dependencies and dispatches updates.
	 *
	 * @param {Array|Object} value
	 * @constructor
	 */

	function Observer(value) {
	  this.value = value;
	  this.dep = new Dep();
	  def(value, '__ob__', this);
	  if (isArray(value)) {
	    var augment = hasProto ? protoAugment : copyAugment;
	    augment(value, arrayMethods, arrayKeys);
	    this.observeArray(value);
	  } else {
	    this.walk(value);
	  }
	}

	// Instance methods

	/**
	 * Walk through each property and convert them into
	 * getter/setters. This method should only be called when
	 * value type is Object.
	 *
	 * @param {Object} obj
	 */

	Observer.prototype.walk = function (obj) {
	  var keys = Object.keys(obj);
	  for (var i = 0, l = keys.length; i < l; i++) {
	    this.convert(keys[i], obj[keys[i]]);
	  }
	};

	/**
	 * Observe a list of Array items.
	 *
	 * @param {Array} items
	 */

	Observer.prototype.observeArray = function (items) {
	  for (var i = 0, l = items.length; i < l; i++) {
	    observe(items[i]);
	  }
	};

	/**
	 * Convert a property into getter/setter so we can emit
	 * the events when the property is accessed/changed.
	 *
	 * @param {String} key
	 * @param {*} val
	 */

	Observer.prototype.convert = function (key, val) {
	  defineReactive(this.value, key, val);
	};

	/**
	 * Add an owner vm, so that when $set/$delete mutations
	 * happen we can notify owner vms to proxy the keys and
	 * digest the watchers. This is only called when the object
	 * is observed as an instance's root $data.
	 *
	 * @param {Vue} vm
	 */

	Observer.prototype.addVm = function (vm) {
	  (this.vms || (this.vms = [])).push(vm);
	};

	/**
	 * Remove an owner vm. This is called when the object is
	 * swapped out as an instance's $data object.
	 *
	 * @param {Vue} vm
	 */

	Observer.prototype.removeVm = function (vm) {
	  this.vms.$remove(vm);
	};

	// helpers

	/**
	 * Augment an target Object or Array by intercepting
	 * the prototype chain using __proto__
	 *
	 * @param {Object|Array} target
	 * @param {Object} proto
	 */

	function protoAugment(target, src) {
	  target.__proto__ = src;
	}

	/**
	 * Augment an target Object or Array by defining
	 * hidden properties.
	 *
	 * @param {Object|Array} target
	 * @param {Object} proto
	 */

	function copyAugment(target, src, keys) {
	  for (var i = 0, l = keys.length; i < l; i++) {
	    var key = keys[i];
	    def(target, key, src[key]);
	  }
	}

	/**
	 * Attempt to create an observer instance for a value,
	 * returns the new observer if successfully observed,
	 * or the existing observer if the value already has one.
	 *
	 * @param {*} value
	 * @param {Vue} [vm]
	 * @return {Observer|undefined}
	 * @static
	 */

	function observe(value, vm) {
	  if (!value || typeof value !== 'object') {
	    return;
	  }
	  var ob;
	  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
	    ob = value.__ob__;
	  } else if ((isArray(value) || isPlainObject(value)) && Object.isExtensible(value) && !value._isVue) {
	    ob = new Observer(value);
	  }
	  if (ob && vm) {
	    ob.addVm(vm);
	  }
	  return ob;
	}

	/**
	 * Define a reactive property on an Object.
	 *
	 * @param {Object} obj
	 * @param {String} key
	 * @param {*} val
	 */

	function defineReactive(obj, key, val) {
	  var dep = new Dep();

	  // cater for pre-defined getter/setters
	  var getter, setter;
	  if (config.convertAllProperties) {
	    var property = Object.getOwnPropertyDescriptor(obj, key);
	    if (property && property.configurable === false) {
	      return;
	    }
	    getter = property && property.get;
	    setter = property && property.set;
	  }

	  var childOb = observe(val);
	  Object.defineProperty(obj, key, {
	    enumerable: true,
	    configurable: true,
	    get: function reactiveGetter() {
	      var value = getter ? getter.call(obj) : val;
	      if (Dep.target) {
	        dep.depend();
	        if (childOb) {
	          childOb.dep.depend();
	        }
	        if (isArray(value)) {
	          for (var e, i = 0, l = value.length; i < l; i++) {
	            e = value[i];
	            e && e.__ob__ && e.__ob__.dep.depend();
	          }
	        }
	      }
	      return value;
	    },
	    set: function reactiveSetter(newVal) {
	      var value = getter ? getter.call(obj) : val;
	      if (newVal === value) {
	        return;
	      }
	      if (setter) {
	        setter.call(obj, newVal);
	      } else {
	        val = newVal;
	      }
	      childOb = observe(newVal);
	      dep.notify();
	    }
	  });
	}

	var util = Object.freeze({
		defineReactive: defineReactive,
		set: set,
		del: del,
		hasOwn: hasOwn,
		isLiteral: isLiteral,
		isReserved: isReserved,
		_toString: _toString,
		toNumber: toNumber,
		toBoolean: toBoolean,
		stripQuotes: stripQuotes,
		camelize: camelize,
		hyphenate: hyphenate,
		classify: classify,
		bind: bind$1,
		toArray: toArray,
		extend: extend,
		isObject: isObject,
		isPlainObject: isPlainObject,
		def: def,
		debounce: _debounce,
		indexOf: indexOf,
		cancellable: cancellable,
		looseEqual: looseEqual,
		isArray: isArray,
		hasProto: hasProto,
		inBrowser: inBrowser,
		devtools: devtools,
		isIE9: isIE9,
		isAndroid: isAndroid,
		get transitionProp () { return transitionProp; },
		get transitionEndEvent () { return transitionEndEvent; },
		get animationProp () { return animationProp; },
		get animationEndEvent () { return animationEndEvent; },
		nextTick: nextTick,
		query: query,
		inDoc: inDoc,
		getAttr: getAttr,
		getBindAttr: getBindAttr,
		hasBindAttr: hasBindAttr,
		before: before,
		after: after,
		remove: remove,
		prepend: prepend,
		replace: replace,
		on: on$1,
		off: off,
		setClass: setClass,
		addClass: addClass,
		removeClass: removeClass,
		extractContent: extractContent,
		trimNode: trimNode,
		isTemplate: isTemplate,
		createAnchor: createAnchor,
		findRef: findRef,
		mapNodeRange: mapNodeRange,
		removeNodeRange: removeNodeRange,
		mergeOptions: mergeOptions,
		resolveAsset: resolveAsset,
		assertAsset: assertAsset,
		checkComponentAttr: checkComponentAttr,
		initProp: initProp,
		assertProp: assertProp,
		coerceProp: coerceProp,
		commonTagRE: commonTagRE,
		reservedTagRE: reservedTagRE,
		get warn () { return warn; }
	});

	var uid = 0;

	function initMixin (Vue) {

	  /**
	   * The main init sequence. This is called for every
	   * instance, including ones that are created from extended
	   * constructors.
	   *
	   * @param {Object} options - this options object should be
	   *                           the result of merging class
	   *                           options and the options passed
	   *                           in to the constructor.
	   */

	  Vue.prototype._init = function (options) {

	    options = options || {};

	    this.$el = null;
	    this.$parent = options.parent;
	    this.$root = this.$parent ? this.$parent.$root : this;
	    this.$children = [];
	    this.$refs = {}; // child vm references
	    this.$els = {}; // element references
	    this._watchers = []; // all watchers as an array
	    this._directives = []; // all directives

	    // a uid
	    this._uid = uid++;

	    // a flag to avoid this being observed
	    this._isVue = true;

	    // events bookkeeping
	    this._events = {}; // registered callbacks
	    this._eventsCount = {}; // for $broadcast optimization

	    // fragment instance properties
	    this._isFragment = false;
	    this._fragment = // @type {DocumentFragment}
	    this._fragmentStart = // @type {Text|Comment}
	    this._fragmentEnd = null; // @type {Text|Comment}

	    // lifecycle state
	    this._isCompiled = this._isDestroyed = this._isReady = this._isAttached = this._isBeingDestroyed = this._vForRemoving = false;
	    this._unlinkFn = null;

	    // context:
	    // if this is a transcluded component, context
	    // will be the common parent vm of this instance
	    // and its host.
	    this._context = options._context || this.$parent;

	    // scope:
	    // if this is inside an inline v-for, the scope
	    // will be the intermediate scope created for this
	    // repeat fragment. this is used for linking props
	    // and container directives.
	    this._scope = options._scope;

	    // fragment:
	    // if this instance is compiled inside a Fragment, it
	    // needs to reigster itself as a child of that fragment
	    // for attach/detach to work properly.
	    this._frag = options._frag;
	    if (this._frag) {
	      this._frag.children.push(this);
	    }

	    // push self into parent / transclusion host
	    if (this.$parent) {
	      this.$parent.$children.push(this);
	    }

	    // save raw constructor data before merge
	    // so that we know which properties are provided at
	    // instantiation.
	    if (process.env.NODE_ENV !== 'production') {
	      this._runtimeData = options.data;
	    }

	    // merge options.
	    options = this.$options = mergeOptions(this.constructor.options, options, this);

	    // set ref
	    this._updateRef();

	    // initialize data as empty object.
	    // it will be filled up in _initScope().
	    this._data = {};

	    // call init hook
	    this._callHook('init');

	    // initialize data observation and scope inheritance.
	    this._initState();

	    // setup event system and option events.
	    this._initEvents();

	    // call created hook
	    this._callHook('created');

	    // if `el` option is passed, start compilation.
	    if (options.el) {
	      this.$mount(options.el);
	    }
	  };
	}

	var pathCache = new Cache(1000);

	// actions
	var APPEND = 0;
	var PUSH = 1;
	var INC_SUB_PATH_DEPTH = 2;
	var PUSH_SUB_PATH = 3;

	// states
	var BEFORE_PATH = 0;
	var IN_PATH = 1;
	var BEFORE_IDENT = 2;
	var IN_IDENT = 3;
	var IN_SUB_PATH = 4;
	var IN_SINGLE_QUOTE = 5;
	var IN_DOUBLE_QUOTE = 6;
	var AFTER_PATH = 7;
	var ERROR = 8;

	var pathStateMachine = [];

	pathStateMachine[BEFORE_PATH] = {
	  'ws': [BEFORE_PATH],
	  'ident': [IN_IDENT, APPEND],
	  '[': [IN_SUB_PATH],
	  'eof': [AFTER_PATH]
	};

	pathStateMachine[IN_PATH] = {
	  'ws': [IN_PATH],
	  '.': [BEFORE_IDENT],
	  '[': [IN_SUB_PATH],
	  'eof': [AFTER_PATH]
	};

	pathStateMachine[BEFORE_IDENT] = {
	  'ws': [BEFORE_IDENT],
	  'ident': [IN_IDENT, APPEND]
	};

	pathStateMachine[IN_IDENT] = {
	  'ident': [IN_IDENT, APPEND],
	  '0': [IN_IDENT, APPEND],
	  'number': [IN_IDENT, APPEND],
	  'ws': [IN_PATH, PUSH],
	  '.': [BEFORE_IDENT, PUSH],
	  '[': [IN_SUB_PATH, PUSH],
	  'eof': [AFTER_PATH, PUSH]
	};

	pathStateMachine[IN_SUB_PATH] = {
	  "'": [IN_SINGLE_QUOTE, APPEND],
	  '"': [IN_DOUBLE_QUOTE, APPEND],
	  '[': [IN_SUB_PATH, INC_SUB_PATH_DEPTH],
	  ']': [IN_PATH, PUSH_SUB_PATH],
	  'eof': ERROR,
	  'else': [IN_SUB_PATH, APPEND]
	};

	pathStateMachine[IN_SINGLE_QUOTE] = {
	  "'": [IN_SUB_PATH, APPEND],
	  'eof': ERROR,
	  'else': [IN_SINGLE_QUOTE, APPEND]
	};

	pathStateMachine[IN_DOUBLE_QUOTE] = {
	  '"': [IN_SUB_PATH, APPEND],
	  'eof': ERROR,
	  'else': [IN_DOUBLE_QUOTE, APPEND]
	};

	/**
	 * Determine the type of a character in a keypath.
	 *
	 * @param {Char} ch
	 * @return {String} type
	 */

	function getPathCharType(ch) {
	  if (ch === undefined) {
	    return 'eof';
	  }

	  var code = ch.charCodeAt(0);

	  switch (code) {
	    case 0x5B: // [
	    case 0x5D: // ]
	    case 0x2E: // .
	    case 0x22: // "
	    case 0x27: // '
	    case 0x30:
	      // 0
	      return ch;

	    case 0x5F: // _
	    case 0x24:
	      // $
	      return 'ident';

	    case 0x20: // Space
	    case 0x09: // Tab
	    case 0x0A: // Newline
	    case 0x0D: // Return
	    case 0xA0: // No-break space
	    case 0xFEFF: // Byte Order Mark
	    case 0x2028: // Line Separator
	    case 0x2029:
	      // Paragraph Separator
	      return 'ws';
	  }

	  // a-z, A-Z
	  if (code >= 0x61 && code <= 0x7A || code >= 0x41 && code <= 0x5A) {
	    return 'ident';
	  }

	  // 1-9
	  if (code >= 0x31 && code <= 0x39) {
	    return 'number';
	  }

	  return 'else';
	}

	/**
	 * Format a subPath, return its plain form if it is
	 * a literal string or number. Otherwise prepend the
	 * dynamic indicator (*).
	 *
	 * @param {String} path
	 * @return {String}
	 */

	function formatSubPath(path) {
	  var trimmed = path.trim();
	  // invalid leading 0
	  if (path.charAt(0) === '0' && isNaN(path)) {
	    return false;
	  }
	  return isLiteral(trimmed) ? stripQuotes(trimmed) : '*' + trimmed;
	}

	/**
	 * Parse a string path into an array of segments
	 *
	 * @param {String} path
	 * @return {Array|undefined}
	 */

	function parse(path) {
	  var keys = [];
	  var index = -1;
	  var mode = BEFORE_PATH;
	  var subPathDepth = 0;
	  var c, newChar, key, type, transition, action, typeMap;

	  var actions = [];

	  actions[PUSH] = function () {
	    if (key !== undefined) {
	      keys.push(key);
	      key = undefined;
	    }
	  };

	  actions[APPEND] = function () {
	    if (key === undefined) {
	      key = newChar;
	    } else {
	      key += newChar;
	    }
	  };

	  actions[INC_SUB_PATH_DEPTH] = function () {
	    actions[APPEND]();
	    subPathDepth++;
	  };

	  actions[PUSH_SUB_PATH] = function () {
	    if (subPathDepth > 0) {
	      subPathDepth--;
	      mode = IN_SUB_PATH;
	      actions[APPEND]();
	    } else {
	      subPathDepth = 0;
	      key = formatSubPath(key);
	      if (key === false) {
	        return false;
	      } else {
	        actions[PUSH]();
	      }
	    }
	  };

	  function maybeUnescapeQuote() {
	    var nextChar = path[index + 1];
	    if (mode === IN_SINGLE_QUOTE && nextChar === "'" || mode === IN_DOUBLE_QUOTE && nextChar === '"') {
	      index++;
	      newChar = '\\' + nextChar;
	      actions[APPEND]();
	      return true;
	    }
	  }

	  while (mode != null) {
	    index++;
	    c = path[index];

	    if (c === '\\' && maybeUnescapeQuote()) {
	      continue;
	    }

	    type = getPathCharType(c);
	    typeMap = pathStateMachine[mode];
	    transition = typeMap[type] || typeMap['else'] || ERROR;

	    if (transition === ERROR) {
	      return; // parse error
	    }

	    mode = transition[0];
	    action = actions[transition[1]];
	    if (action) {
	      newChar = transition[2];
	      newChar = newChar === undefined ? c : newChar;
	      if (action() === false) {
	        return;
	      }
	    }

	    if (mode === AFTER_PATH) {
	      keys.raw = path;
	      return keys;
	    }
	  }
	}

	/**
	 * External parse that check for a cache hit first
	 *
	 * @param {String} path
	 * @return {Array|undefined}
	 */

	function parsePath(path) {
	  var hit = pathCache.get(path);
	  if (!hit) {
	    hit = parse(path);
	    if (hit) {
	      pathCache.put(path, hit);
	    }
	  }
	  return hit;
	}

	/**
	 * Get from an object from a path string
	 *
	 * @param {Object} obj
	 * @param {String} path
	 */

	function getPath(obj, path) {
	  return parseExpression(path).get(obj);
	}

	/**
	 * Warn against setting non-existent root path on a vm.
	 */

	var warnNonExistent;
	if (process.env.NODE_ENV !== 'production') {
	  warnNonExistent = function (path) {
	    warn('You are setting a non-existent path "' + path.raw + '" ' + 'on a vm instance. Consider pre-initializing the property ' + 'with the "data" option for more reliable reactivity ' + 'and better performance.');
	  };
	}

	/**
	 * Set on an object from a path
	 *
	 * @param {Object} obj
	 * @param {String | Array} path
	 * @param {*} val
	 */

	function setPath(obj, path, val) {
	  var original = obj;
	  if (typeof path === 'string') {
	    path = parse(path);
	  }
	  if (!path || !isObject(obj)) {
	    return false;
	  }
	  var last, key;
	  for (var i = 0, l = path.length; i < l; i++) {
	    last = obj;
	    key = path[i];
	    if (key.charAt(0) === '*') {
	      key = parseExpression(key.slice(1)).get.call(original, original);
	    }
	    if (i < l - 1) {
	      obj = obj[key];
	      if (!isObject(obj)) {
	        obj = {};
	        if (process.env.NODE_ENV !== 'production' && last._isVue) {
	          warnNonExistent(path);
	        }
	        set(last, key, obj);
	      }
	    } else {
	      if (isArray(obj)) {
	        obj.$set(key, val);
	      } else if (key in obj) {
	        obj[key] = val;
	      } else {
	        if (process.env.NODE_ENV !== 'production' && obj._isVue) {
	          warnNonExistent(path);
	        }
	        set(obj, key, val);
	      }
	    }
	  }
	  return true;
	}

	var path = Object.freeze({
	  parsePath: parsePath,
	  getPath: getPath,
	  setPath: setPath
	});

	var expressionCache = new Cache(1000);

	var allowedKeywords = 'Math,Date,this,true,false,null,undefined,Infinity,NaN,' + 'isNaN,isFinite,decodeURI,decodeURIComponent,encodeURI,' + 'encodeURIComponent,parseInt,parseFloat';
	var allowedKeywordsRE = new RegExp('^(' + allowedKeywords.replace(/,/g, '\\b|') + '\\b)');

	// keywords that don't make sense inside expressions
	var improperKeywords = 'break,case,class,catch,const,continue,debugger,default,' + 'delete,do,else,export,extends,finally,for,function,if,' + 'import,in,instanceof,let,return,super,switch,throw,try,' + 'var,while,with,yield,enum,await,implements,package,' + 'proctected,static,interface,private,public';
	var improperKeywordsRE = new RegExp('^(' + improperKeywords.replace(/,/g, '\\b|') + '\\b)');

	var wsRE = /\s/g;
	var newlineRE = /\n/g;
	var saveRE = /[\{,]\s*[\w\$_]+\s*:|('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*")|new |typeof |void /g;
	var restoreRE = /"(\d+)"/g;
	var pathTestRE = /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['.*?'\]|\[".*?"\]|\[\d+\]|\[[A-Za-z_$][\w$]*\])*$/;
	var identRE = /[^\w$\.](?:[A-Za-z_$][\w$]*)/g;
	var booleanLiteralRE = /^(?:true|false)$/;

	/**
	 * Save / Rewrite / Restore
	 *
	 * When rewriting paths found in an expression, it is
	 * possible for the same letter sequences to be found in
	 * strings and Object literal property keys. Therefore we
	 * remove and store these parts in a temporary array, and
	 * restore them after the path rewrite.
	 */

	var saved = [];

	/**
	 * Save replacer
	 *
	 * The save regex can match two possible cases:
	 * 1. An opening object literal
	 * 2. A string
	 * If matched as a plain string, we need to escape its
	 * newlines, since the string needs to be preserved when
	 * generating the function body.
	 *
	 * @param {String} str
	 * @param {String} isString - str if matched as a string
	 * @return {String} - placeholder with index
	 */

	function save(str, isString) {
	  var i = saved.length;
	  saved[i] = isString ? str.replace(newlineRE, '\\n') : str;
	  return '"' + i + '"';
	}

	/**
	 * Path rewrite replacer
	 *
	 * @param {String} raw
	 * @return {String}
	 */

	function rewrite(raw) {
	  var c = raw.charAt(0);
	  var path = raw.slice(1);
	  if (allowedKeywordsRE.test(path)) {
	    return raw;
	  } else {
	    path = path.indexOf('"') > -1 ? path.replace(restoreRE, restore) : path;
	    return c + 'scope.' + path;
	  }
	}

	/**
	 * Restore replacer
	 *
	 * @param {String} str
	 * @param {String} i - matched save index
	 * @return {String}
	 */

	function restore(str, i) {
	  return saved[i];
	}

	/**
	 * Rewrite an expression, prefixing all path accessors with
	 * `scope.` and generate getter/setter functions.
	 *
	 * @param {String} exp
	 * @return {Function}
	 */

	function compileGetter(exp) {
	  if (improperKeywordsRE.test(exp)) {
	    process.env.NODE_ENV !== 'production' && warn('Avoid using reserved keywords in expression: ' + exp);
	  }
	  // reset state
	  saved.length = 0;
	  // save strings and object literal keys
	  var body = exp.replace(saveRE, save).replace(wsRE, '');
	  // rewrite all paths
	  // pad 1 space here becaue the regex matches 1 extra char
	  body = (' ' + body).replace(identRE, rewrite).replace(restoreRE, restore);
	  return makeGetterFn(body);
	}

	/**
	 * Build a getter function. Requires eval.
	 *
	 * We isolate the try/catch so it doesn't affect the
	 * optimization of the parse function when it is not called.
	 *
	 * @param {String} body
	 * @return {Function|undefined}
	 */

	function makeGetterFn(body) {
	  try {
	    return new Function('scope', 'return ' + body + ';');
	  } catch (e) {
	    process.env.NODE_ENV !== 'production' && warn('Invalid expression. ' + 'Generated function body: ' + body);
	  }
	}

	/**
	 * Compile a setter function for the expression.
	 *
	 * @param {String} exp
	 * @return {Function|undefined}
	 */

	function compileSetter(exp) {
	  var path = parsePath(exp);
	  if (path) {
	    return function (scope, val) {
	      setPath(scope, path, val);
	    };
	  } else {
	    process.env.NODE_ENV !== 'production' && warn('Invalid setter expression: ' + exp);
	  }
	}

	/**
	 * Parse an expression into re-written getter/setters.
	 *
	 * @param {String} exp
	 * @param {Boolean} needSet
	 * @return {Function}
	 */

	function parseExpression(exp, needSet) {
	  exp = exp.trim();
	  // try cache
	  var hit = expressionCache.get(exp);
	  if (hit) {
	    if (needSet && !hit.set) {
	      hit.set = compileSetter(hit.exp);
	    }
	    return hit;
	  }
	  var res = { exp: exp };
	  res.get = isSimplePath(exp) && exp.indexOf('[') < 0
	  // optimized super simple getter
	  ? makeGetterFn('scope.' + exp)
	  // dynamic getter
	  : compileGetter(exp);
	  if (needSet) {
	    res.set = compileSetter(exp);
	  }
	  expressionCache.put(exp, res);
	  return res;
	}

	/**
	 * Check if an expression is a simple path.
	 *
	 * @param {String} exp
	 * @return {Boolean}
	 */

	function isSimplePath(exp) {
	  return pathTestRE.test(exp) &&
	  // don't treat true/false as paths
	  !booleanLiteralRE.test(exp) &&
	  // Math constants e.g. Math.PI, Math.E etc.
	  exp.slice(0, 5) !== 'Math.';
	}

	var expression = Object.freeze({
	  parseExpression: parseExpression,
	  isSimplePath: isSimplePath
	});

	// we have two separate queues: one for directive updates
	// and one for user watcher registered via $watch().
	// we want to guarantee directive updates to be called
	// before user watchers so that when user watchers are
	// triggered, the DOM would have already been in updated
	// state.
	var queue = [];
	var userQueue = [];
	var has = {};
	var circular = {};
	var waiting = false;
	var internalQueueDepleted = false;

	/**
	 * Reset the batcher's state.
	 */

	function resetBatcherState() {
	  queue = [];
	  userQueue = [];
	  has = {};
	  circular = {};
	  waiting = internalQueueDepleted = false;
	}

	/**
	 * Flush both queues and run the watchers.
	 */

	function flushBatcherQueue() {
	  runBatcherQueue(queue);
	  internalQueueDepleted = true;
	  runBatcherQueue(userQueue);
	  // dev tool hook
	  /* istanbul ignore if */
	  if (devtools) {
	    devtools.emit('flush');
	  }
	  resetBatcherState();
	}

	/**
	 * Run the watchers in a single queue.
	 *
	 * @param {Array} queue
	 */

	function runBatcherQueue(queue) {
	  // do not cache length because more watchers might be pushed
	  // as we run existing watchers
	  for (var i = 0; i < queue.length; i++) {
	    var watcher = queue[i];
	    var id = watcher.id;
	    has[id] = null;
	    watcher.run();
	    // in dev build, check and stop circular updates.
	    if (process.env.NODE_ENV !== 'production' && has[id] != null) {
	      circular[id] = (circular[id] || 0) + 1;
	      if (circular[id] > config._maxUpdateCount) {
	        queue.splice(has[id], 1);
	        warn('You may have an infinite update loop for watcher ' + 'with expression: ' + watcher.expression);
	      }
	    }
	  }
	}

	/**
	 * Push a watcher into the watcher queue.
	 * Jobs with duplicate IDs will be skipped unless it's
	 * pushed when the queue is being flushed.
	 *
	 * @param {Watcher} watcher
	 *   properties:
	 *   - {Number} id
	 *   - {Function} run
	 */

	function pushWatcher(watcher) {
	  var id = watcher.id;
	  if (has[id] == null) {
	    // if an internal watcher is pushed, but the internal
	    // queue is already depleted, we run it immediately.
	    if (internalQueueDepleted && !watcher.user) {
	      watcher.run();
	      return;
	    }
	    // push watcher into appropriate queue
	    var q = watcher.user ? userQueue : queue;
	    has[id] = q.length;
	    q.push(watcher);
	    // queue the flush
	    if (!waiting) {
	      waiting = true;
	      nextTick(flushBatcherQueue);
	    }
	  }
	}

	var uid$2 = 0;

	/**
	 * A watcher parses an expression, collects dependencies,
	 * and fires callback when the expression value changes.
	 * This is used for both the $watch() api and directives.
	 *
	 * @param {Vue} vm
	 * @param {String} expression
	 * @param {Function} cb
	 * @param {Object} options
	 *                 - {Array} filters
	 *                 - {Boolean} twoWay
	 *                 - {Boolean} deep
	 *                 - {Boolean} user
	 *                 - {Boolean} sync
	 *                 - {Boolean} lazy
	 *                 - {Function} [preProcess]
	 *                 - {Function} [postProcess]
	 * @constructor
	 */
	function Watcher(vm, expOrFn, cb, options) {
	  // mix in options
	  if (options) {
	    extend(this, options);
	  }
	  var isFn = typeof expOrFn === 'function';
	  this.vm = vm;
	  vm._watchers.push(this);
	  this.expression = isFn ? expOrFn.toString() : expOrFn;
	  this.cb = cb;
	  this.id = ++uid$2; // uid for batching
	  this.active = true;
	  this.dirty = this.lazy; // for lazy watchers
	  this.deps = Object.create(null);
	  this.newDeps = null;
	  this.prevError = null; // for async error stacks
	  // parse expression for getter/setter
	  if (isFn) {
	    this.getter = expOrFn;
	    this.setter = undefined;
	  } else {
	    var res = parseExpression(expOrFn, this.twoWay);
	    this.getter = res.get;
	    this.setter = res.set;
	  }
	  this.value = this.lazy ? undefined : this.get();
	  // state for avoiding false triggers for deep and Array
	  // watchers during vm._digest()
	  this.queued = this.shallow = false;
	}

	/**
	 * Add a dependency to this directive.
	 *
	 * @param {Dep} dep
	 */

	Watcher.prototype.addDep = function (dep) {
	  var id = dep.id;
	  if (!this.newDeps[id]) {
	    this.newDeps[id] = dep;
	    if (!this.deps[id]) {
	      this.deps[id] = dep;
	      dep.addSub(this);
	    }
	  }
	};

	/**
	 * Evaluate the getter, and re-collect dependencies.
	 */

	Watcher.prototype.get = function () {
	  this.beforeGet();
	  var scope = this.scope || this.vm;
	  var value;
	  try {
	    value = this.getter.call(scope, scope);
	  } catch (e) {
	    if (process.env.NODE_ENV !== 'production' && config.warnExpressionErrors) {
	      warn('Error when evaluating expression "' + this.expression + '". ' + (config.debug ? '' : 'Turn on debug mode to see stack trace.'), e);
	    }
	  }
	  // "touch" every property so they are all tracked as
	  // dependencies for deep watching
	  if (this.deep) {
	    traverse(value);
	  }
	  if (this.preProcess) {
	    value = this.preProcess(value);
	  }
	  if (this.filters) {
	    value = scope._applyFilters(value, null, this.filters, false);
	  }
	  if (this.postProcess) {
	    value = this.postProcess(value);
	  }
	  this.afterGet();
	  return value;
	};

	/**
	 * Set the corresponding value with the setter.
	 *
	 * @param {*} value
	 */

	Watcher.prototype.set = function (value) {
	  var scope = this.scope || this.vm;
	  if (this.filters) {
	    value = scope._applyFilters(value, this.value, this.filters, true);
	  }
	  try {
	    this.setter.call(scope, scope, value);
	  } catch (e) {
	    if (process.env.NODE_ENV !== 'production' && config.warnExpressionErrors) {
	      warn('Error when evaluating setter "' + this.expression + '"', e);
	    }
	  }
	  // two-way sync for v-for alias
	  var forContext = scope.$forContext;
	  if (forContext && forContext.alias === this.expression) {
	    if (forContext.filters) {
	      process.env.NODE_ENV !== 'production' && warn('It seems you are using two-way binding on ' + 'a v-for alias (' + this.expression + '), and the ' + 'v-for has filters. This will not work properly. ' + 'Either remove the filters or use an array of ' + 'objects and bind to object properties instead.');
	      return;
	    }
	    forContext._withLock(function () {
	      if (scope.$key) {
	        // original is an object
	        forContext.rawValue[scope.$key] = value;
	      } else {
	        forContext.rawValue.$set(scope.$index, value);
	      }
	    });
	  }
	};

	/**
	 * Prepare for dependency collection.
	 */

	Watcher.prototype.beforeGet = function () {
	  Dep.target = this;
	  this.newDeps = Object.create(null);
	};

	/**
	 * Clean up for dependency collection.
	 */

	Watcher.prototype.afterGet = function () {
	  Dep.target = null;
	  var ids = Object.keys(this.deps);
	  var i = ids.length;
	  while (i--) {
	    var id = ids[i];
	    if (!this.newDeps[id]) {
	      this.deps[id].removeSub(this);
	    }
	  }
	  this.deps = this.newDeps;
	};

	/**
	 * Subscriber interface.
	 * Will be called when a dependency changes.
	 *
	 * @param {Boolean} shallow
	 */

	Watcher.prototype.update = function (shallow) {
	  if (this.lazy) {
	    this.dirty = true;
	  } else if (this.sync || !config.async) {
	    this.run();
	  } else {
	    // if queued, only overwrite shallow with non-shallow,
	    // but not the other way around.
	    this.shallow = this.queued ? shallow ? this.shallow : false : !!shallow;
	    this.queued = true;
	    // record before-push error stack in debug mode
	    /* istanbul ignore if */
	    if (process.env.NODE_ENV !== 'production' && config.debug) {
	      this.prevError = new Error('[vue] async stack trace');
	    }
	    pushWatcher(this);
	  }
	};

	/**
	 * Batcher job interface.
	 * Will be called by the batcher.
	 */

	Watcher.prototype.run = function () {
	  if (this.active) {
	    var value = this.get();
	    if (value !== this.value ||
	    // Deep watchers and watchers on Object/Arrays should fire even
	    // when the value is the same, because the value may
	    // have mutated; but only do so if this is a
	    // non-shallow update (caused by a vm digest).
	    (isObject(value) || this.deep) && !this.shallow) {
	      // set new value
	      var oldValue = this.value;
	      this.value = value;
	      // in debug + async mode, when a watcher callbacks
	      // throws, we also throw the saved before-push error
	      // so the full cross-tick stack trace is available.
	      var prevError = this.prevError;
	      /* istanbul ignore if */
	      if (process.env.NODE_ENV !== 'production' && config.debug && prevError) {
	        this.prevError = null;
	        try {
	          this.cb.call(this.vm, value, oldValue);
	        } catch (e) {
	          nextTick(function () {
	            throw prevError;
	          }, 0);
	          throw e;
	        }
	      } else {
	        this.cb.call(this.vm, value, oldValue);
	      }
	    }
	    this.queued = this.shallow = false;
	  }
	};

	/**
	 * Evaluate the value of the watcher.
	 * This only gets called for lazy watchers.
	 */

	Watcher.prototype.evaluate = function () {
	  // avoid overwriting another watcher that is being
	  // collected.
	  var current = Dep.target;
	  this.value = this.get();
	  this.dirty = false;
	  Dep.target = current;
	};

	/**
	 * Depend on all deps collected by this watcher.
	 */

	Watcher.prototype.depend = function () {
	  var depIds = Object.keys(this.deps);
	  var i = depIds.length;
	  while (i--) {
	    this.deps[depIds[i]].depend();
	  }
	};

	/**
	 * Remove self from all dependencies' subcriber list.
	 */

	Watcher.prototype.teardown = function () {
	  if (this.active) {
	    // remove self from vm's watcher list
	    // this is a somewhat expensive operation so we skip it
	    // if the vm is being destroyed or is performing a v-for
	    // re-render (the watcher list is then filtered by v-for).
	    if (!this.vm._isBeingDestroyed && !this.vm._vForRemoving) {
	      this.vm._watchers.$remove(this);
	    }
	    var depIds = Object.keys(this.deps);
	    var i = depIds.length;
	    while (i--) {
	      this.deps[depIds[i]].removeSub(this);
	    }
	    this.active = false;
	    this.vm = this.cb = this.value = null;
	  }
	};

	/**
	 * Recrusively traverse an object to evoke all converted
	 * getters, so that every nested property inside the object
	 * is collected as a "deep" dependency.
	 *
	 * @param {*} val
	 */

	function traverse(val) {
	  var i, keys;
	  if (isArray(val)) {
	    i = val.length;
	    while (i--) traverse(val[i]);
	  } else if (isObject(val)) {
	    keys = Object.keys(val);
	    i = keys.length;
	    while (i--) traverse(val[keys[i]]);
	  }
	}

	var cloak = {
	  bind: function bind() {
	    var el = this.el;
	    this.vm.$once('pre-hook:compiled', function () {
	      el.removeAttribute('v-cloak');
	    });
	  }
	};

	var ref = {
	  bind: function bind() {
	    process.env.NODE_ENV !== 'production' && warn('v-ref:' + this.arg + ' must be used on a child ' + 'component. Found on <' + this.el.tagName.toLowerCase() + '>.');
	  }
	};

	var ON = 700;
	var MODEL = 800;
	var BIND = 850;
	var TRANSITION = 1100;
	var EL = 1500;
	var COMPONENT = 1500;
	var PARTIAL = 1750;
	var FOR = 2000;
	var IF = 2000;
	var SLOT = 2100;

	var el = {

	  priority: EL,

	  bind: function bind() {
	    /* istanbul ignore if */
	    if (!this.arg) {
	      return;
	    }
	    var id = this.id = camelize(this.arg);
	    var refs = (this._scope || this.vm).$els;
	    if (hasOwn(refs, id)) {
	      refs[id] = this.el;
	    } else {
	      defineReactive(refs, id, this.el);
	    }
	  },

	  unbind: function unbind() {
	    var refs = (this._scope || this.vm).$els;
	    if (refs[this.id] === this.el) {
	      refs[this.id] = null;
	    }
	  }
	};

	var prefixes = ['-webkit-', '-moz-', '-ms-'];
	var camelPrefixes = ['Webkit', 'Moz', 'ms'];
	var importantRE = /!important;?$/;
	var propCache = Object.create(null);

	var testEl = null;

	var style = {

	  deep: true,

	  update: function update(value) {
	    if (typeof value === 'string') {
	      this.el.style.cssText = value;
	    } else if (isArray(value)) {
	      this.handleObject(value.reduce(extend, {}));
	    } else {
	      this.handleObject(value || {});
	    }
	  },

	  handleObject: function handleObject(value) {
	    // cache object styles so that only changed props
	    // are actually updated.
	    var cache = this.cache || (this.cache = {});
	    var name, val;
	    for (name in cache) {
	      if (!(name in value)) {
	        this.handleSingle(name, null);
	        delete cache[name];
	      }
	    }
	    for (name in value) {
	      val = value[name];
	      if (val !== cache[name]) {
	        cache[name] = val;
	        this.handleSingle(name, val);
	      }
	    }
	  },

	  handleSingle: function handleSingle(prop, value) {
	    prop = normalize(prop);
	    if (!prop) return; // unsupported prop
	    // cast possible numbers/booleans into strings
	    if (value != null) value += '';
	    if (value) {
	      var isImportant = importantRE.test(value) ? 'important' : '';
	      if (isImportant) {
	        value = value.replace(importantRE, '').trim();
	      }
	      this.el.style.setProperty(prop, value, isImportant);
	    } else {
	      this.el.style.removeProperty(prop);
	    }
	  }

	};

	/**
	 * Normalize a CSS property name.
	 * - cache result
	 * - auto prefix
	 * - camelCase -> dash-case
	 *
	 * @param {String} prop
	 * @return {String}
	 */

	function normalize(prop) {
	  if (propCache[prop]) {
	    return propCache[prop];
	  }
	  var res = prefix(prop);
	  propCache[prop] = propCache[res] = res;
	  return res;
	}

	/**
	 * Auto detect the appropriate prefix for a CSS property.
	 * https://gist.github.com/paulirish/523692
	 *
	 * @param {String} prop
	 * @return {String}
	 */

	function prefix(prop) {
	  prop = hyphenate(prop);
	  var camel = camelize(prop);
	  var upper = camel.charAt(0).toUpperCase() + camel.slice(1);
	  if (!testEl) {
	    testEl = document.createElement('div');
	  }
	  var i = prefixes.length;
	  var prefixed;
	  while (i--) {
	    prefixed = camelPrefixes[i] + upper;
	    if (prefixed in testEl.style) {
	      return prefixes[i] + prop;
	    }
	  }
	  if (camel in testEl.style) {
	    return prop;
	  }
	}

	// xlink
	var xlinkNS = 'http://www.w3.org/1999/xlink';
	var xlinkRE = /^xlink:/;

	// check for attributes that prohibit interpolations
	var disallowedInterpAttrRE = /^v-|^:|^@|^(?:is|transition|transition-mode|debounce|track-by|stagger|enter-stagger|leave-stagger)$/;
	// these attributes should also set their corresponding properties
	// because they only affect the initial state of the element
	var attrWithPropsRE = /^(?:value|checked|selected|muted)$/;

	// these attributes should set a hidden property for
	// binding v-model to object values
	var modelProps = {
	  value: '_value',
	  'true-value': '_trueValue',
	  'false-value': '_falseValue'
	};

	var bind = {

	  priority: BIND,

	  bind: function bind() {
	    var attr = this.arg;
	    var tag = this.el.tagName;
	    // should be deep watch on object mode
	    if (!attr) {
	      this.deep = true;
	    }
	    // handle interpolation bindings
	    var descriptor = this.descriptor;
	    var tokens = descriptor.interp;
	    if (tokens) {
	      // handle interpolations with one-time tokens
	      if (descriptor.hasOneTime) {
	        this.expression = tokensToExp(tokens, this._scope || this.vm);
	      }

	      // only allow binding on native attributes
	      if (disallowedInterpAttrRE.test(attr) || attr === 'name' && (tag === 'PARTIAL' || tag === 'SLOT')) {
	        process.env.NODE_ENV !== 'production' && warn(attr + '="' + descriptor.raw + '": ' + 'attribute interpolation is not allowed in Vue.js ' + 'directives and special attributes.');
	        this.el.removeAttribute(attr);
	        this.invalid = true;
	      }

	      /* istanbul ignore if */
	      if (process.env.NODE_ENV !== 'production') {
	        var raw = attr + '="' + descriptor.raw + '": ';
	        // warn src
	        if (attr === 'src') {
	          warn(raw + 'interpolation in "src" attribute will cause ' + 'a 404 request. Use v-bind:src instead.');
	        }

	        // warn style
	        if (attr === 'style') {
	          warn(raw + 'interpolation in "style" attribute will cause ' + 'the attribute to be discarded in Internet Explorer. ' + 'Use v-bind:style instead.');
	        }
	      }
	    }
	  },

	  update: function update(value) {
	    if (this.invalid) {
	      return;
	    }
	    var attr = this.arg;
	    if (this.arg) {
	      this.handleSingle(attr, value);
	    } else {
	      this.handleObject(value || {});
	    }
	  },

	  // share object handler with v-bind:class
	  handleObject: style.handleObject,

	  handleSingle: function handleSingle(attr, value) {
	    var el = this.el;
	    var interp = this.descriptor.interp;
	    if (this.modifiers.camel) {
	      attr = camelize(attr);
	    }
	    if (!interp && attrWithPropsRE.test(attr) && attr in el) {
	      el[attr] = attr === 'value' ? value == null // IE9 will set input.value to "null" for null...
	      ? '' : value : value;
	    }
	    // set model props
	    var modelProp = modelProps[attr];
	    if (!interp && modelProp) {
	      el[modelProp] = value;
	      // update v-model if present
	      var model = el.__v_model;
	      if (model) {
	        model.listener();
	      }
	    }
	    // do not set value attribute for textarea
	    if (attr === 'value' && el.tagName === 'TEXTAREA') {
	      el.removeAttribute(attr);
	      return;
	    }
	    // update attribute
	    if (value != null && value !== false) {
	      if (attr === 'class') {
	        // handle edge case #1960:
	        // class interpolation should not overwrite Vue transition class
	        if (el.__v_trans) {
	          value += ' ' + el.__v_trans.id + '-transition';
	        }
	        setClass(el, value);
	      } else if (xlinkRE.test(attr)) {
	        el.setAttributeNS(xlinkNS, attr, value === true ? '' : value);
	      } else {
	        el.setAttribute(attr, value === true ? '' : value);
	      }
	    } else {
	      el.removeAttribute(attr);
	    }
	  }
	};

	// keyCode aliases
	var keyCodes = {
	  esc: 27,
	  tab: 9,
	  enter: 13,
	  space: 32,
	  'delete': [8, 46],
	  up: 38,
	  left: 37,
	  right: 39,
	  down: 40
	};

	function keyFilter(handler, keys) {
	  var codes = keys.map(function (key) {
	    var charCode = key.charCodeAt(0);
	    if (charCode > 47 && charCode < 58) {
	      return parseInt(key, 10);
	    }
	    if (key.length === 1) {
	      charCode = key.toUpperCase().charCodeAt(0);
	      if (charCode > 64 && charCode < 91) {
	        return charCode;
	      }
	    }
	    return keyCodes[key];
	  });
	  codes = [].concat.apply([], codes);
	  return function keyHandler(e) {
	    if (codes.indexOf(e.keyCode) > -1) {
	      return handler.call(this, e);
	    }
	  };
	}

	function stopFilter(handler) {
	  return function stopHandler(e) {
	    e.stopPropagation();
	    return handler.call(this, e);
	  };
	}

	function preventFilter(handler) {
	  return function preventHandler(e) {
	    e.preventDefault();
	    return handler.call(this, e);
	  };
	}

	function selfFilter(handler) {
	  return function selfHandler(e) {
	    if (e.target === e.currentTarget) {
	      return handler.call(this, e);
	    }
	  };
	}

	var on = {

	  acceptStatement: true,
	  priority: ON,

	  bind: function bind() {
	    // deal with iframes
	    if (this.el.tagName === 'IFRAME' && this.arg !== 'load') {
	      var self = this;
	      this.iframeBind = function () {
	        on$1(self.el.contentWindow, self.arg, self.handler, self.modifiers.capture);
	      };
	      this.on('load', this.iframeBind);
	    }
	  },

	  update: function update(handler) {
	    // stub a noop for v-on with no value,
	    // e.g. @mousedown.prevent
	    if (!this.descriptor.raw) {
	      handler = function () {};
	    }

	    if (typeof handler !== 'function') {
	      process.env.NODE_ENV !== 'production' && warn('v-on:' + this.arg + '="' + this.expression + '" expects a function value, ' + 'got ' + handler);
	      return;
	    }

	    // apply modifiers
	    if (this.modifiers.stop) {
	      handler = stopFilter(handler);
	    }
	    if (this.modifiers.prevent) {
	      handler = preventFilter(handler);
	    }
	    if (this.modifiers.self) {
	      handler = selfFilter(handler);
	    }
	    // key filter
	    var keys = Object.keys(this.modifiers).filter(function (key) {
	      return key !== 'stop' && key !== 'prevent';
	    });
	    if (keys.length) {
	      handler = keyFilter(handler, keys);
	    }

	    this.reset();
	    this.handler = handler;

	    if (this.iframeBind) {
	      this.iframeBind();
	    } else {
	      on$1(this.el, this.arg, this.handler, this.modifiers.capture);
	    }
	  },

	  reset: function reset() {
	    var el = this.iframeBind ? this.el.contentWindow : this.el;
	    if (this.handler) {
	      off(el, this.arg, this.handler);
	    }
	  },

	  unbind: function unbind() {
	    this.reset();
	  }
	};

	var checkbox = {

	  bind: function bind() {
	    var self = this;
	    var el = this.el;

	    this.getValue = function () {
	      return el.hasOwnProperty('_value') ? el._value : self.params.number ? toNumber(el.value) : el.value;
	    };

	    function getBooleanValue() {
	      var val = el.checked;
	      if (val && el.hasOwnProperty('_trueValue')) {
	        return el._trueValue;
	      }
	      if (!val && el.hasOwnProperty('_falseValue')) {
	        return el._falseValue;
	      }
	      return val;
	    }

	    this.listener = function () {
	      var model = self._watcher.value;
	      if (isArray(model)) {
	        var val = self.getValue();
	        if (el.checked) {
	          if (indexOf(model, val) < 0) {
	            model.push(val);
	          }
	        } else {
	          model.$remove(val);
	        }
	      } else {
	        self.set(getBooleanValue());
	      }
	    };

	    this.on('change', this.listener);
	    if (el.hasAttribute('checked')) {
	      this.afterBind = this.listener;
	    }
	  },

	  update: function update(value) {
	    var el = this.el;
	    if (isArray(value)) {
	      el.checked = indexOf(value, this.getValue()) > -1;
	    } else {
	      if (el.hasOwnProperty('_trueValue')) {
	        el.checked = looseEqual(value, el._trueValue);
	      } else {
	        el.checked = !!value;
	      }
	    }
	  }
	};

	var select = {

	  bind: function bind() {
	    var self = this;
	    var el = this.el;

	    // method to force update DOM using latest value.
	    this.forceUpdate = function () {
	      if (self._watcher) {
	        self.update(self._watcher.get());
	      }
	    };

	    // check if this is a multiple select
	    var multiple = this.multiple = el.hasAttribute('multiple');

	    // attach listener
	    this.listener = function () {
	      var value = getValue(el, multiple);
	      value = self.params.number ? isArray(value) ? value.map(toNumber) : toNumber(value) : value;
	      self.set(value);
	    };
	    this.on('change', this.listener);

	    // if has initial value, set afterBind
	    var initValue = getValue(el, multiple, true);
	    if (multiple && initValue.length || !multiple && initValue !== null) {
	      this.afterBind = this.listener;
	    }

	    // All major browsers except Firefox resets
	    // selectedIndex with value -1 to 0 when the element
	    // is appended to a new parent, therefore we have to
	    // force a DOM update whenever that happens...
	    this.vm.$on('hook:attached', this.forceUpdate);
	  },

	  update: function update(value) {
	    var el = this.el;
	    el.selectedIndex = -1;
	    var multi = this.multiple && isArray(value);
	    var options = el.options;
	    var i = options.length;
	    var op, val;
	    while (i--) {
	      op = options[i];
	      val = op.hasOwnProperty('_value') ? op._value : op.value;
	      /* eslint-disable eqeqeq */
	      op.selected = multi ? indexOf$1(value, val) > -1 : looseEqual(value, val);
	      /* eslint-enable eqeqeq */
	    }
	  },

	  unbind: function unbind() {
	    /* istanbul ignore next */
	    this.vm.$off('hook:attached', this.forceUpdate);
	  }
	};

	/**
	 * Get select value
	 *
	 * @param {SelectElement} el
	 * @param {Boolean} multi
	 * @param {Boolean} init
	 * @return {Array|*}
	 */

	function getValue(el, multi, init) {
	  var res = multi ? [] : null;
	  var op, val, selected;
	  for (var i = 0, l = el.options.length; i < l; i++) {
	    op = el.options[i];
	    selected = init ? op.hasAttribute('selected') : op.selected;
	    if (selected) {
	      val = op.hasOwnProperty('_value') ? op._value : op.value;
	      if (multi) {
	        res.push(val);
	      } else {
	        return val;
	      }
	    }
	  }
	  return res;
	}

	/**
	 * Native Array.indexOf uses strict equal, but in this
	 * case we need to match string/numbers with custom equal.
	 *
	 * @param {Array} arr
	 * @param {*} val
	 */

	function indexOf$1(arr, val) {
	  var i = arr.length;
	  while (i--) {
	    if (looseEqual(arr[i], val)) {
	      return i;
	    }
	  }
	  return -1;
	}

	var radio = {

	  bind: function bind() {
	    var self = this;
	    var el = this.el;

	    this.getValue = function () {
	      // value overwrite via v-bind:value
	      if (el.hasOwnProperty('_value')) {
	        return el._value;
	      }
	      var val = el.value;
	      if (self.params.number) {
	        val = toNumber(val);
	      }
	      return val;
	    };

	    this.listener = function () {
	      self.set(self.getValue());
	    };
	    this.on('change', this.listener);

	    if (el.hasAttribute('checked')) {
	      this.afterBind = this.listener;
	    }
	  },

	  update: function update(value) {
	    this.el.checked = looseEqual(value, this.getValue());
	  }
	};

	var text$2 = {

	  bind: function bind() {
	    var self = this;
	    var el = this.el;
	    var isRange = el.type === 'range';
	    var lazy = this.params.lazy;
	    var number = this.params.number;
	    var debounce = this.params.debounce;

	    // handle composition events.
	    //   http://blog.evanyou.me/2014/01/03/composition-event/
	    // skip this for Android because it handles composition
	    // events quite differently. Android doesn't trigger
	    // composition events for language input methods e.g.
	    // Chinese, but instead triggers them for spelling
	    // suggestions... (see Discussion/#162)
	    var composing = false;
	    if (!isAndroid && !isRange) {
	      this.on('compositionstart', function () {
	        composing = true;
	      });
	      this.on('compositionend', function () {
	        composing = false;
	        // in IE11 the "compositionend" event fires AFTER
	        // the "input" event, so the input handler is blocked
	        // at the end... have to call it here.
	        //
	        // #1327: in lazy mode this is unecessary.
	        if (!lazy) {
	          self.listener();
	        }
	      });
	    }

	    // prevent messing with the input when user is typing,
	    // and force update on blur.
	    this.focused = false;
	    if (!isRange && !lazy) {
	      this.on('focus', function () {
	        self.focused = true;
	      });
	      this.on('blur', function () {
	        self.focused = false;
	        // do not sync value after fragment removal (#2017)
	        if (!self._frag || self._frag.inserted) {
	          self.rawListener();
	        }
	      });
	    }

	    // Now attach the main listener
	    this.listener = this.rawListener = function () {
	      if (composing || !self._bound) {
	        return;
	      }
	      var val = number || isRange ? toNumber(el.value) : el.value;
	      self.set(val);
	      // force update on next tick to avoid lock & same value
	      // also only update when user is not typing
	      nextTick(function () {
	        if (self._bound && !self.focused) {
	          self.update(self._watcher.value);
	        }
	      });
	    };

	    // apply debounce
	    if (debounce) {
	      this.listener = _debounce(this.listener, debounce);
	    }

	    // Support jQuery events, since jQuery.trigger() doesn't
	    // trigger native events in some cases and some plugins
	    // rely on $.trigger()
	    //
	    // We want to make sure if a listener is attached using
	    // jQuery, it is also removed with jQuery, that's why
	    // we do the check for each directive instance and
	    // store that check result on itself. This also allows
	    // easier test coverage control by unsetting the global
	    // jQuery variable in tests.
	    this.hasjQuery = typeof jQuery === 'function';
	    if (this.hasjQuery) {
	      var method = jQuery.fn.on ? 'on' : 'bind';
	      jQuery(el)[method]('change', this.listener);
	      if (!lazy) {
	        jQuery(el)[method]('input', this.listener);
	      }
	    } else {
	      this.on('change', this.listener);
	      if (!lazy) {
	        this.on('input', this.listener);
	      }
	    }

	    // IE9 doesn't fire input event on backspace/del/cut
	    if (!lazy && isIE9) {
	      this.on('cut', function () {
	        nextTick(self.listener);
	      });
	      this.on('keyup', function (e) {
	        if (e.keyCode === 46 || e.keyCode === 8) {
	          self.listener();
	        }
	      });
	    }

	    // set initial value if present
	    if (el.hasAttribute('value') || el.tagName === 'TEXTAREA' && el.value.trim()) {
	      this.afterBind = this.listener;
	    }
	  },

	  update: function update(value) {
	    this.el.value = _toString(value);
	  },

	  unbind: function unbind() {
	    var el = this.el;
	    if (this.hasjQuery) {
	      var method = jQuery.fn.off ? 'off' : 'unbind';
	      jQuery(el)[method]('change', this.listener);
	      jQuery(el)[method]('input', this.listener);
	    }
	  }
	};

	var handlers = {
	  text: text$2,
	  radio: radio,
	  select: select,
	  checkbox: checkbox
	};

	var model = {

	  priority: MODEL,
	  twoWay: true,
	  handlers: handlers,
	  params: ['lazy', 'number', 'debounce'],

	  /**
	   * Possible elements:
	   *   <select>
	   *   <textarea>
	   *   <input type="*">
	   *     - text
	   *     - checkbox
	   *     - radio
	   *     - number
	   */

	  bind: function bind() {
	    // friendly warning...
	    this.checkFilters();
	    if (this.hasRead && !this.hasWrite) {
	      process.env.NODE_ENV !== 'production' && warn('It seems you are using a read-only filter with ' + 'v-model. You might want to use a two-way filter ' + 'to ensure correct behavior.');
	    }
	    var el = this.el;
	    var tag = el.tagName;
	    var handler;
	    if (tag === 'INPUT') {
	      handler = handlers[el.type] || handlers.text;
	    } else if (tag === 'SELECT') {
	      handler = handlers.select;
	    } else if (tag === 'TEXTAREA') {
	      handler = handlers.text;
	    } else {
	      process.env.NODE_ENV !== 'production' && warn('v-model does not support element type: ' + tag);
	      return;
	    }
	    el.__v_model = this;
	    handler.bind.call(this);
	    this.update = handler.update;
	    this._unbind = handler.unbind;
	  },

	  /**
	   * Check read/write filter stats.
	   */

	  checkFilters: function checkFilters() {
	    var filters = this.filters;
	    if (!filters) return;
	    var i = filters.length;
	    while (i--) {
	      var filter = resolveAsset(this.vm.$options, 'filters', filters[i].name);
	      if (typeof filter === 'function' || filter.read) {
	        this.hasRead = true;
	      }
	      if (filter.write) {
	        this.hasWrite = true;
	      }
	    }
	  },

	  unbind: function unbind() {
	    this.el.__v_model = null;
	    this._unbind && this._unbind();
	  }
	};

	var show = {

	  bind: function bind() {
	    // check else block
	    var next = this.el.nextElementSibling;
	    if (next && getAttr(next, 'v-else') !== null) {
	      this.elseEl = next;
	    }
	  },

	  update: function update(value) {
	    this.apply(this.el, value);
	    if (this.elseEl) {
	      this.apply(this.elseEl, !value);
	    }
	  },

	  apply: function apply(el, value) {
	    if (inDoc(el)) {
	      applyTransition(el, value ? 1 : -1, toggle, this.vm);
	    } else {
	      toggle();
	    }
	    function toggle() {
	      el.style.display = value ? '' : 'none';
	    }
	  }
	};

	var templateCache = new Cache(1000);
	var idSelectorCache = new Cache(1000);

	var map = {
	  efault: [0, '', ''],
	  legend: [1, '<fieldset>', '</fieldset>'],
	  tr: [2, '<table><tbody>', '</tbody></table>'],
	  col: [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>']
	};

	map.td = map.th = [3, '<table><tbody><tr>', '</tr></tbody></table>'];

	map.option = map.optgroup = [1, '<select multiple="multiple">', '</select>'];

	map.thead = map.tbody = map.colgroup = map.caption = map.tfoot = [1, '<table>', '</table>'];

	map.g = map.defs = map.symbol = map.use = map.image = map.text = map.circle = map.ellipse = map.line = map.path = map.polygon = map.polyline = map.rect = [1, '<svg ' + 'xmlns="http://www.w3.org/2000/svg" ' + 'xmlns:xlink="http://www.w3.org/1999/xlink" ' + 'xmlns:ev="http://www.w3.org/2001/xml-events"' + 'version="1.1">', '</svg>'];

	/**
	 * Check if a node is a supported template node with a
	 * DocumentFragment content.
	 *
	 * @param {Node} node
	 * @return {Boolean}
	 */

	function isRealTemplate(node) {
	  return isTemplate(node) && node.content instanceof DocumentFragment;
	}

	var tagRE$1 = /<([\w:]+)/;
	var entityRE = /&#?\w+?;/;

	/**
	 * Convert a string template to a DocumentFragment.
	 * Determines correct wrapping by tag types. Wrapping
	 * strategy found in jQuery & component/domify.
	 *
	 * @param {String} templateString
	 * @param {Boolean} raw
	 * @return {DocumentFragment}
	 */

	function stringToFragment(templateString, raw) {
	  // try a cache hit first
	  var cacheKey = raw ? templateString : templateString.trim();
	  var hit = templateCache.get(cacheKey);
	  if (hit) {
	    return hit;
	  }

	  var frag = document.createDocumentFragment();
	  var tagMatch = templateString.match(tagRE$1);
	  var entityMatch = entityRE.test(templateString);

	  if (!tagMatch && !entityMatch) {
	    // text only, return a single text node.
	    frag.appendChild(document.createTextNode(templateString));
	  } else {

	    var tag = tagMatch && tagMatch[1];
	    var wrap = map[tag] || map.efault;
	    var depth = wrap[0];
	    var prefix = wrap[1];
	    var suffix = wrap[2];
	    var node = document.createElement('div');

	    node.innerHTML = prefix + templateString + suffix;
	    while (depth--) {
	      node = node.lastChild;
	    }

	    var child;
	    /* eslint-disable no-cond-assign */
	    while (child = node.firstChild) {
	      /* eslint-enable no-cond-assign */
	      frag.appendChild(child);
	    }
	  }
	  if (!raw) {
	    trimNode(frag);
	  }
	  templateCache.put(cacheKey, frag);
	  return frag;
	}

	/**
	 * Convert a template node to a DocumentFragment.
	 *
	 * @param {Node} node
	 * @return {DocumentFragment}
	 */

	function nodeToFragment(node) {
	  // if its a template tag and the browser supports it,
	  // its content is already a document fragment.
	  if (isRealTemplate(node)) {
	    trimNode(node.content);
	    return node.content;
	  }
	  // script template
	  if (node.tagName === 'SCRIPT') {
	    return stringToFragment(node.textContent);
	  }
	  // normal node, clone it to avoid mutating the original
	  var clonedNode = cloneNode(node);
	  var frag = document.createDocumentFragment();
	  var child;
	  /* eslint-disable no-cond-assign */
	  while (child = clonedNode.firstChild) {
	    /* eslint-enable no-cond-assign */
	    frag.appendChild(child);
	  }
	  trimNode(frag);
	  return frag;
	}

	// Test for the presence of the Safari template cloning bug
	// https://bugs.webkit.org/showug.cgi?id=137755
	var hasBrokenTemplate = (function () {
	  /* istanbul ignore else */
	  if (inBrowser) {
	    var a = document.createElement('div');
	    a.innerHTML = '<template>1</template>';
	    return !a.cloneNode(true).firstChild.innerHTML;
	  } else {
	    return false;
	  }
	})();

	// Test for IE10/11 textarea placeholder clone bug
	var hasTextareaCloneBug = (function () {
	  /* istanbul ignore else */
	  if (inBrowser) {
	    var t = document.createElement('textarea');
	    t.placeholder = 't';
	    return t.cloneNode(true).value === 't';
	  } else {
	    return false;
	  }
	})();

	/**
	 * 1. Deal with Safari cloning nested <template> bug by
	 *    manually cloning all template instances.
	 * 2. Deal with IE10/11 textarea placeholder bug by setting
	 *    the correct value after cloning.
	 *
	 * @param {Element|DocumentFragment} node
	 * @return {Element|DocumentFragment}
	 */

	function cloneNode(node) {
	  if (!node.querySelectorAll) {
	    return node.cloneNode();
	  }
	  var res = node.cloneNode(true);
	  var i, original, cloned;
	  /* istanbul ignore if */
	  if (hasBrokenTemplate) {
	    var tempClone = res;
	    if (isRealTemplate(node)) {
	      node = node.content;
	      tempClone = res.content;
	    }
	    original = node.querySelectorAll('template');
	    if (original.length) {
	      cloned = tempClone.querySelectorAll('template');
	      i = cloned.length;
	      while (i--) {
	        cloned[i].parentNode.replaceChild(cloneNode(original[i]), cloned[i]);
	      }
	    }
	  }
	  /* istanbul ignore if */
	  if (hasTextareaCloneBug) {
	    if (node.tagName === 'TEXTAREA') {
	      res.value = node.value;
	    } else {
	      original = node.querySelectorAll('textarea');
	      if (original.length) {
	        cloned = res.querySelectorAll('textarea');
	        i = cloned.length;
	        while (i--) {
	          cloned[i].value = original[i].value;
	        }
	      }
	    }
	  }
	  return res;
	}

	/**
	 * Process the template option and normalizes it into a
	 * a DocumentFragment that can be used as a partial or a
	 * instance template.
	 *
	 * @param {*} template
	 *        Possible values include:
	 *        - DocumentFragment object
	 *        - Node object of type Template
	 *        - id selector: '#some-template-id'
	 *        - template string: '<div><span>{{msg}}</span></div>'
	 * @param {Boolean} shouldClone
	 * @param {Boolean} raw
	 *        inline HTML interpolation. Do not check for id
	 *        selector and keep whitespace in the string.
	 * @return {DocumentFragment|undefined}
	 */

	function parseTemplate(template, shouldClone, raw) {
	  var node, frag;

	  // if the template is already a document fragment,
	  // do nothing
	  if (template instanceof DocumentFragment) {
	    trimNode(template);
	    return shouldClone ? cloneNode(template) : template;
	  }

	  if (typeof template === 'string') {
	    // id selector
	    if (!raw && template.charAt(0) === '#') {
	      // id selector can be cached too
	      frag = idSelectorCache.get(template);
	      if (!frag) {
	        node = document.getElementById(template.slice(1));
	        if (node) {
	          frag = nodeToFragment(node);
	          // save selector to cache
	          idSelectorCache.put(template, frag);
	        }
	      }
	    } else {
	      // normal string template
	      frag = stringToFragment(template, raw);
	    }
	  } else if (template.nodeType) {
	    // a direct node
	    frag = nodeToFragment(template);
	  }

	  return frag && shouldClone ? cloneNode(frag) : frag;
	}

	var template = Object.freeze({
	  cloneNode: cloneNode,
	  parseTemplate: parseTemplate
	});

	/**
	 * Abstraction for a partially-compiled fragment.
	 * Can optionally compile content with a child scope.
	 *
	 * @param {Function} linker
	 * @param {Vue} vm
	 * @param {DocumentFragment} frag
	 * @param {Vue} [host]
	 * @param {Object} [scope]
	 */
	function Fragment(linker, vm, frag, host, scope, parentFrag) {
	  this.children = [];
	  this.childFrags = [];
	  this.vm = vm;
	  this.scope = scope;
	  this.inserted = false;
	  this.parentFrag = parentFrag;
	  if (parentFrag) {
	    parentFrag.childFrags.push(this);
	  }
	  this.unlink = linker(vm, frag, host, scope, this);
	  var single = this.single = frag.childNodes.length === 1 &&
	  // do not go single mode if the only node is an anchor
	  !frag.childNodes[0].__vue_anchor;
	  if (single) {
	    this.node = frag.childNodes[0];
	    this.before = singleBefore;
	    this.remove = singleRemove;
	  } else {
	    this.node = createAnchor('fragment-start');
	    this.end = createAnchor('fragment-end');
	    this.frag = frag;
	    prepend(this.node, frag);
	    frag.appendChild(this.end);
	    this.before = multiBefore;
	    this.remove = multiRemove;
	  }
	  this.node.__vfrag__ = this;
	}

	/**
	 * Call attach/detach for all components contained within
	 * this fragment. Also do so recursively for all child
	 * fragments.
	 *
	 * @param {Function} hook
	 */

	Fragment.prototype.callHook = function (hook) {
	  var i, l;
	  for (i = 0, l = this.childFrags.length; i < l; i++) {
	    this.childFrags[i].callHook(hook);
	  }
	  for (i = 0, l = this.children.length; i < l; i++) {
	    hook(this.children[i]);
	  }
	};

	/**
	 * Insert fragment before target, single node version
	 *
	 * @param {Node} target
	 * @param {Boolean} withTransition
	 */

	function singleBefore(target, withTransition) {
	  this.inserted = true;
	  var method = withTransition !== false ? beforeWithTransition : before;
	  method(this.node, target, this.vm);
	  if (inDoc(this.node)) {
	    this.callHook(attach);
	  }
	}

	/**
	 * Remove fragment, single node version
	 */

	function singleRemove() {
	  this.inserted = false;
	  var shouldCallRemove = inDoc(this.node);
	  var self = this;
	  this.beforeRemove();
	  removeWithTransition(this.node, this.vm, function () {
	    if (shouldCallRemove) {
	      self.callHook(detach);
	    }
	    self.destroy();
	  });
	}

	/**
	 * Insert fragment before target, multi-nodes version
	 *
	 * @param {Node} target
	 * @param {Boolean} withTransition
	 */

	function multiBefore(target, withTransition) {
	  this.inserted = true;
	  var vm = this.vm;
	  var method = withTransition !== false ? beforeWithTransition : before;
	  mapNodeRange(this.node, this.end, function (node) {
	    method(node, target, vm);
	  });
	  if (inDoc(this.node)) {
	    this.callHook(attach);
	  }
	}

	/**
	 * Remove fragment, multi-nodes version
	 */

	function multiRemove() {
	  this.inserted = false;
	  var self = this;
	  var shouldCallRemove = inDoc(this.node);
	  this.beforeRemove();
	  removeNodeRange(this.node, this.end, this.vm, this.frag, function () {
	    if (shouldCallRemove) {
	      self.callHook(detach);
	    }
	    self.destroy();
	  });
	}

	/**
	 * Prepare the fragment for removal.
	 */

	Fragment.prototype.beforeRemove = function () {
	  var i, l;
	  for (i = 0, l = this.childFrags.length; i < l; i++) {
	    // call the same method recursively on child
	    // fragments, depth-first
	    this.childFrags[i].beforeRemove(false);
	  }
	  for (i = 0, l = this.children.length; i < l; i++) {
	    // Call destroy for all contained instances,
	    // with remove:false and defer:true.
	    // Defer is necessary because we need to
	    // keep the children to call detach hooks
	    // on them.
	    this.children[i].$destroy(false, true);
	  }
	  var dirs = this.unlink.dirs;
	  for (i = 0, l = dirs.length; i < l; i++) {
	    // disable the watchers on all the directives
	    // so that the rendered content stays the same
	    // during removal.
	    dirs[i]._watcher && dirs[i]._watcher.teardown();
	  }
	};

	/**
	 * Destroy the fragment.
	 */

	Fragment.prototype.destroy = function () {
	  if (this.parentFrag) {
	    this.parentFrag.childFrags.$remove(this);
	  }
	  this.node.__vfrag__ = null;
	  this.unlink();
	};

	/**
	 * Call attach hook for a Vue instance.
	 *
	 * @param {Vue} child
	 */

	function attach(child) {
	  if (!child._isAttached) {
	    child._callHook('attached');
	  }
	}

	/**
	 * Call detach hook for a Vue instance.
	 *
	 * @param {Vue} child
	 */

	function detach(child) {
	  if (child._isAttached) {
	    child._callHook('detached');
	  }
	}

	var linkerCache = new Cache(5000);

	/**
	 * A factory that can be used to create instances of a
	 * fragment. Caches the compiled linker if possible.
	 *
	 * @param {Vue} vm
	 * @param {Element|String} el
	 */
	function FragmentFactory(vm, el) {
	  this.vm = vm;
	  var template;
	  var isString = typeof el === 'string';
	  if (isString || isTemplate(el)) {
	    template = parseTemplate(el, true);
	  } else {
	    template = document.createDocumentFragment();
	    template.appendChild(el);
	  }
	  this.template = template;
	  // linker can be cached, but only for components
	  var linker;
	  var cid = vm.constructor.cid;
	  if (cid > 0) {
	    var cacheId = cid + (isString ? el : el.outerHTML);
	    linker = linkerCache.get(cacheId);
	    if (!linker) {
	      linker = compile(template, vm.$options, true);
	      linkerCache.put(cacheId, linker);
	    }
	  } else {
	    linker = compile(template, vm.$options, true);
	  }
	  this.linker = linker;
	}

	/**
	 * Create a fragment instance with given host and scope.
	 *
	 * @param {Vue} host
	 * @param {Object} scope
	 * @param {Fragment} parentFrag
	 */

	FragmentFactory.prototype.create = function (host, scope, parentFrag) {
	  var frag = cloneNode(this.template);
	  return new Fragment(this.linker, this.vm, frag, host, scope, parentFrag);
	};

	var vIf = {

	  priority: IF,

	  bind: function bind() {
	    var el = this.el;
	    if (!el.__vue__) {
	      // check else block
	      var next = el.nextElementSibling;
	      if (next && getAttr(next, 'v-else') !== null) {
	        remove(next);
	        this.elseFactory = new FragmentFactory(this.vm, next);
	      }
	      // check main block
	      this.anchor = createAnchor('v-if');
	      replace(el, this.anchor);
	      this.factory = new FragmentFactory(this.vm, el);
	    } else {
	      process.env.NODE_ENV !== 'production' && warn('v-if="' + this.expression + '" cannot be ' + 'used on an instance root element.');
	      this.invalid = true;
	    }
	  },

	  update: function update(value) {
	    if (this.invalid) return;
	    if (value) {
	      if (!this.frag) {
	        this.insert();
	      }
	    } else {
	      this.remove();
	    }
	  },

	  insert: function insert() {
	    if (this.elseFrag) {
	      this.elseFrag.remove();
	      this.elseFrag = null;
	    }
	    this.frag = this.factory.create(this._host, this._scope, this._frag);
	    this.frag.before(this.anchor);
	  },

	  remove: function remove() {
	    if (this.frag) {
	      this.frag.remove();
	      this.frag = null;
	    }
	    if (this.elseFactory && !this.elseFrag) {
	      this.elseFrag = this.elseFactory.create(this._host, this._scope, this._frag);
	      this.elseFrag.before(this.anchor);
	    }
	  },

	  unbind: function unbind() {
	    if (this.frag) {
	      this.frag.destroy();
	    }
	    if (this.elseFrag) {
	      this.elseFrag.destroy();
	    }
	  }
	};

	var uid$1 = 0;

	var vFor = {

	  priority: FOR,

	  params: ['track-by', 'stagger', 'enter-stagger', 'leave-stagger'],

	  bind: function bind() {
	    // support "item in items" syntax
	    var inMatch = this.expression.match(/(.*) in (.*)/);
	    if (inMatch) {
	      var itMatch = inMatch[1].match(/\((.*),(.*)\)/);
	      if (itMatch) {
	        this.iterator = itMatch[1].trim();
	        this.alias = itMatch[2].trim();
	      } else {
	        this.alias = inMatch[1].trim();
	      }
	      this.expression = inMatch[2];
	    }

	    if (!this.alias) {
	      process.env.NODE_ENV !== 'production' && warn('Alias is required in v-for.');
	      return;
	    }

	    // uid as a cache identifier
	    this.id = '__v-for__' + ++uid$1;

	    // check if this is an option list,
	    // so that we know if we need to update the <select>'s
	    // v-model when the option list has changed.
	    // because v-model has a lower priority than v-for,
	    // the v-model is not bound here yet, so we have to
	    // retrive it in the actual updateModel() function.
	    var tag = this.el.tagName;
	    this.isOption = (tag === 'OPTION' || tag === 'OPTGROUP') && this.el.parentNode.tagName === 'SELECT';

	    // setup anchor nodes
	    this.start = createAnchor('v-for-start');
	    this.end = createAnchor('v-for-end');
	    replace(this.el, this.end);
	    before(this.start, this.end);

	    // cache
	    this.cache = Object.create(null);

	    // fragment factory
	    this.factory = new FragmentFactory(this.vm, this.el);
	  },

	  update: function update(data) {
	    this.diff(data);
	    this.updateRef();
	    this.updateModel();
	  },

	  /**
	   * Diff, based on new data and old data, determine the
	   * minimum amount of DOM manipulations needed to make the
	   * DOM reflect the new data Array.
	   *
	   * The algorithm diffs the new data Array by storing a
	   * hidden reference to an owner vm instance on previously
	   * seen data. This allows us to achieve O(n) which is
	   * better than a levenshtein distance based algorithm,
	   * which is O(m * n).
	   *
	   * @param {Array} data
	   */

	  diff: function diff(data) {
	    // check if the Array was converted from an Object
	    var item = data[0];
	    var convertedFromObject = this.fromObject = isObject(item) && hasOwn(item, '$key') && hasOwn(item, '$value');

	    var trackByKey = this.params.trackBy;
	    var oldFrags = this.frags;
	    var frags = this.frags = new Array(data.length);
	    var alias = this.alias;
	    var iterator = this.iterator;
	    var start = this.start;
	    var end = this.end;
	    var inDocument = inDoc(start);
	    var init = !oldFrags;
	    var i, l, frag, key, value, primitive;

	    // First pass, go through the new Array and fill up
	    // the new frags array. If a piece of data has a cached
	    // instance for it, we reuse it. Otherwise build a new
	    // instance.
	    for (i = 0, l = data.length; i < l; i++) {
	      item = data[i];
	      key = convertedFromObject ? item.$key : null;
	      value = convertedFromObject ? item.$value : item;
	      primitive = !isObject(value);
	      frag = !init && this.getCachedFrag(value, i, key);
	      if (frag) {
	        // reusable fragment
	        frag.reused = true;
	        // update $index
	        frag.scope.$index = i;
	        // update $key
	        if (key) {
	          frag.scope.$key = key;
	        }
	        // update iterator
	        if (iterator) {
	          frag.scope[iterator] = key !== null ? key : i;
	        }
	        // update data for track-by, object repeat &
	        // primitive values.
	        if (trackByKey || convertedFromObject || primitive) {
	          frag.scope[alias] = value;
	        }
	      } else {
	        // new isntance
	        frag = this.create(value, alias, i, key);
	        frag.fresh = !init;
	      }
	      frags[i] = frag;
	      if (init) {
	        frag.before(end);
	      }
	    }

	    // we're done for the initial render.
	    if (init) {
	      return;
	    }

	    // Second pass, go through the old fragments and
	    // destroy those who are not reused (and remove them
	    // from cache)
	    var removalIndex = 0;
	    var totalRemoved = oldFrags.length - frags.length;
	    // when removing a large number of fragments, watcher removal
	    // turns out to be a perf bottleneck, so we batch the watcher
	    // removals into a single filter call!
	    this.vm._vForRemoving = true;
	    for (i = 0, l = oldFrags.length; i < l; i++) {
	      frag = oldFrags[i];
	      if (!frag.reused) {
	        this.deleteCachedFrag(frag);
	        this.remove(frag, removalIndex++, totalRemoved, inDocument);
	      }
	    }
	    this.vm._vForRemoving = false;
	    this.vm._watchers = this.vm._watchers.filter(function (w) {
	      return w.active;
	    });

	    // Final pass, move/insert new fragments into the
	    // right place.
	    var targetPrev, prevEl, currentPrev;
	    var insertionIndex = 0;
	    for (i = 0, l = frags.length; i < l; i++) {
	      frag = frags[i];
	      // this is the frag that we should be after
	      targetPrev = frags[i - 1];
	      prevEl = targetPrev ? targetPrev.staggerCb ? targetPrev.staggerAnchor : targetPrev.end || targetPrev.node : start;
	      if (frag.reused && !frag.staggerCb) {
	        currentPrev = findPrevFrag(frag, start, this.id);
	        if (currentPrev !== targetPrev && (!currentPrev ||
	        // optimization for moving a single item.
	        // thanks to suggestions by @livoras in #1807
	        findPrevFrag(currentPrev, start, this.id) !== targetPrev)) {
	          this.move(frag, prevEl);
	        }
	      } else {
	        // new instance, or still in stagger.
	        // insert with updated stagger index.
	        this.insert(frag, insertionIndex++, prevEl, inDocument);
	      }
	      frag.reused = frag.fresh = false;
	    }
	  },

	  /**
	   * Create a new fragment instance.
	   *
	   * @param {*} value
	   * @param {String} alias
	   * @param {Number} index
	   * @param {String} [key]
	   * @return {Fragment}
	   */

	  create: function create(value, alias, index, key) {
	    var host = this._host;
	    // create iteration scope
	    var parentScope = this._scope || this.vm;
	    var scope = Object.create(parentScope);
	    // ref holder for the scope
	    scope.$refs = Object.create(parentScope.$refs);
	    scope.$els = Object.create(parentScope.$els);
	    // make sure point $parent to parent scope
	    scope.$parent = parentScope;
	    // for two-way binding on alias
	    scope.$forContext = this;
	    // define scope properties
	    defineReactive(scope, alias, value);
	    defineReactive(scope, '$index', index);
	    if (key) {
	      defineReactive(scope, '$key', key);
	    } else if (scope.$key) {
	      // avoid accidental fallback
	      def(scope, '$key', null);
	    }
	    if (this.iterator) {
	      defineReactive(scope, this.iterator, key !== null ? key : index);
	    }
	    var frag = this.factory.create(host, scope, this._frag);
	    frag.forId = this.id;
	    this.cacheFrag(value, frag, index, key);
	    return frag;
	  },

	  /**
	   * Update the v-ref on owner vm.
	   */

	  updateRef: function updateRef() {
	    var ref = this.descriptor.ref;
	    if (!ref) return;
	    var hash = (this._scope || this.vm).$refs;
	    var refs;
	    if (!this.fromObject) {
	      refs = this.frags.map(findVmFromFrag);
	    } else {
	      refs = {};
	      this.frags.forEach(function (frag) {
	        refs[frag.scope.$key] = findVmFromFrag(frag);
	      });
	    }
	    hash[ref] = refs;
	  },

	  /**
	   * For option lists, update the containing v-model on
	   * parent <select>.
	   */

	  updateModel: function updateModel() {
	    if (this.isOption) {
	      var parent = this.start.parentNode;
	      var model = parent && parent.__v_model;
	      if (model) {
	        model.forceUpdate();
	      }
	    }
	  },

	  /**
	   * Insert a fragment. Handles staggering.
	   *
	   * @param {Fragment} frag
	   * @param {Number} index
	   * @param {Node} prevEl
	   * @param {Boolean} inDocument
	   */

	  insert: function insert(frag, index, prevEl, inDocument) {
	    if (frag.staggerCb) {
	      frag.staggerCb.cancel();
	      frag.staggerCb = null;
	    }
	    var staggerAmount = this.getStagger(frag, index, null, 'enter');
	    if (inDocument && staggerAmount) {
	      // create an anchor and insert it synchronously,
	      // so that we can resolve the correct order without
	      // worrying about some elements not inserted yet
	      var anchor = frag.staggerAnchor;
	      if (!anchor) {
	        anchor = frag.staggerAnchor = createAnchor('stagger-anchor');
	        anchor.__vfrag__ = frag;
	      }
	      after(anchor, prevEl);
	      var op = frag.staggerCb = cancellable(function () {
	        frag.staggerCb = null;
	        frag.before(anchor);
	        remove(anchor);
	      });
	      setTimeout(op, staggerAmount);
	    } else {
	      frag.before(prevEl.nextSibling);
	    }
	  },

	  /**
	   * Remove a fragment. Handles staggering.
	   *
	   * @param {Fragment} frag
	   * @param {Number} index
	   * @param {Number} total
	   * @param {Boolean} inDocument
	   */

	  remove: function remove(frag, index, total, inDocument) {
	    if (frag.staggerCb) {
	      frag.staggerCb.cancel();
	      frag.staggerCb = null;
	      // it's not possible for the same frag to be removed
	      // twice, so if we have a pending stagger callback,
	      // it means this frag is queued for enter but removed
	      // before its transition started. Since it is already
	      // destroyed, we can just leave it in detached state.
	      return;
	    }
	    var staggerAmount = this.getStagger(frag, index, total, 'leave');
	    if (inDocument && staggerAmount) {
	      var op = frag.staggerCb = cancellable(function () {
	        frag.staggerCb = null;
	        frag.remove();
	      });
	      setTimeout(op, staggerAmount);
	    } else {
	      frag.remove();
	    }
	  },

	  /**
	   * Move a fragment to a new position.
	   * Force no transition.
	   *
	   * @param {Fragment} frag
	   * @param {Node} prevEl
	   */

	  move: function move(frag, prevEl) {
	    // fix a common issue with Sortable:
	    // if prevEl doesn't have nextSibling, this means it's
	    // been dragged after the end anchor. Just re-position
	    // the end anchor to the end of the container.
	    /* istanbul ignore if */
	    if (!prevEl.nextSibling) {
	      this.end.parentNode.appendChild(this.end);
	    }
	    frag.before(prevEl.nextSibling, false);
	  },

	  /**
	   * Cache a fragment using track-by or the object key.
	   *
	   * @param {*} value
	   * @param {Fragment} frag
	   * @param {Number} index
	   * @param {String} [key]
	   */

	  cacheFrag: function cacheFrag(value, frag, index, key) {
	    var trackByKey = this.params.trackBy;
	    var cache = this.cache;
	    var primitive = !isObject(value);
	    var id;
	    if (key || trackByKey || primitive) {
	      id = trackByKey ? trackByKey === '$index' ? index : value[trackByKey] : key || value;
	      if (!cache[id]) {
	        cache[id] = frag;
	      } else if (trackByKey !== '$index') {
	        process.env.NODE_ENV !== 'production' && this.warnDuplicate(value);
	      }
	    } else {
	      id = this.id;
	      if (hasOwn(value, id)) {
	        if (value[id] === null) {
	          value[id] = frag;
	        } else {
	          process.env.NODE_ENV !== 'production' && this.warnDuplicate(value);
	        }
	      } else {
	        def(value, id, frag);
	      }
	    }
	    frag.raw = value;
	  },

	  /**
	   * Get a cached fragment from the value/index/key
	   *
	   * @param {*} value
	   * @param {Number} index
	   * @param {String} key
	   * @return {Fragment}
	   */

	  getCachedFrag: function getCachedFrag(value, index, key) {
	    var trackByKey = this.params.trackBy;
	    var primitive = !isObject(value);
	    var frag;
	    if (key || trackByKey || primitive) {
	      var id = trackByKey ? trackByKey === '$index' ? index : value[trackByKey] : key || value;
	      frag = this.cache[id];
	    } else {
	      frag = value[this.id];
	    }
	    if (frag && (frag.reused || frag.fresh)) {
	      process.env.NODE_ENV !== 'production' && this.warnDuplicate(value);
	    }
	    return frag;
	  },

	  /**
	   * Delete a fragment from cache.
	   *
	   * @param {Fragment} frag
	   */

	  deleteCachedFrag: function deleteCachedFrag(frag) {
	    var value = frag.raw;
	    var trackByKey = this.params.trackBy;
	    var scope = frag.scope;
	    var index = scope.$index;
	    // fix #948: avoid accidentally fall through to
	    // a parent repeater which happens to have $key.
	    var key = hasOwn(scope, '$key') && scope.$key;
	    var primitive = !isObject(value);
	    if (trackByKey || key || primitive) {
	      var id = trackByKey ? trackByKey === '$index' ? index : value[trackByKey] : key || value;
	      this.cache[id] = null;
	    } else {
	      value[this.id] = null;
	      frag.raw = null;
	    }
	  },

	  /**
	   * Get the stagger amount for an insertion/removal.
	   *
	   * @param {Fragment} frag
	   * @param {Number} index
	   * @param {Number} total
	   * @param {String} type
	   */

	  getStagger: function getStagger(frag, index, total, type) {
	    type = type + 'Stagger';
	    var trans = frag.node.__v_trans;
	    var hooks = trans && trans.hooks;
	    var hook = hooks && (hooks[type] || hooks.stagger);
	    return hook ? hook.call(frag, index, total) : index * parseInt(this.params[type] || this.params.stagger, 10);
	  },

	  /**
	   * Pre-process the value before piping it through the
	   * filters. This is passed to and called by the watcher.
	   */

	  _preProcess: function _preProcess(value) {
	    // regardless of type, store the un-filtered raw value.
	    this.rawValue = value;
	    return value;
	  },

	  /**
	   * Post-process the value after it has been piped through
	   * the filters. This is passed to and called by the watcher.
	   *
	   * It is necessary for this to be called during the
	   * wathcer's dependency collection phase because we want
	   * the v-for to update when the source Object is mutated.
	   */

	  _postProcess: function _postProcess(value) {
	    if (isArray(value)) {
	      return value;
	    } else if (isPlainObject(value)) {
	      // convert plain object to array.
	      var keys = Object.keys(value);
	      var i = keys.length;
	      var res = new Array(i);
	      var key;
	      while (i--) {
	        key = keys[i];
	        res[i] = {
	          $key: key,
	          $value: value[key]
	        };
	      }
	      return res;
	    } else {
	      if (typeof value === 'number' && !isNaN(value)) {
	        value = range(value);
	      }
	      return value || [];
	    }
	  },

	  unbind: function unbind() {
	    if (this.descriptor.ref) {
	      (this._scope || this.vm).$refs[this.descriptor.ref] = null;
	    }
	    if (this.frags) {
	      var i = this.frags.length;
	      var frag;
	      while (i--) {
	        frag = this.frags[i];
	        this.deleteCachedFrag(frag);
	        frag.destroy();
	      }
	    }
	  }
	};

	/**
	 * Helper to find the previous element that is a fragment
	 * anchor. This is necessary because a destroyed frag's
	 * element could still be lingering in the DOM before its
	 * leaving transition finishes, but its inserted flag
	 * should have been set to false so we can skip them.
	 *
	 * If this is a block repeat, we want to make sure we only
	 * return frag that is bound to this v-for. (see #929)
	 *
	 * @param {Fragment} frag
	 * @param {Comment|Text} anchor
	 * @param {String} id
	 * @return {Fragment}
	 */

	function findPrevFrag(frag, anchor, id) {
	  var el = frag.node.previousSibling;
	  /* istanbul ignore if */
	  if (!el) return;
	  frag = el.__vfrag__;
	  while ((!frag || frag.forId !== id || !frag.inserted) && el !== anchor) {
	    el = el.previousSibling;
	    /* istanbul ignore if */
	    if (!el) return;
	    frag = el.__vfrag__;
	  }
	  return frag;
	}

	/**
	 * Find a vm from a fragment.
	 *
	 * @param {Fragment} frag
	 * @return {Vue|undefined}
	 */

	function findVmFromFrag(frag) {
	  var node = frag.node;
	  // handle multi-node frag
	  if (frag.end) {
	    while (!node.__vue__ && node !== frag.end && node.nextSibling) {
	      node = node.nextSibling;
	    }
	  }
	  return node.__vue__;
	}

	/**
	 * Create a range array from given number.
	 *
	 * @param {Number} n
	 * @return {Array}
	 */

	function range(n) {
	  var i = -1;
	  var ret = new Array(Math.floor(n));
	  while (++i < n) {
	    ret[i] = i;
	  }
	  return ret;
	}

	if (process.env.NODE_ENV !== 'production') {
	  vFor.warnDuplicate = function (value) {
	    warn('Duplicate value found in v-for="' + this.descriptor.raw + '": ' + JSON.stringify(value) + '. Use track-by="$index" if ' + 'you are expecting duplicate values.');
	  };
	}

	var html = {

	  bind: function bind() {
	    // a comment node means this is a binding for
	    // {{{ inline unescaped html }}}
	    if (this.el.nodeType === 8) {
	      // hold nodes
	      this.nodes = [];
	      // replace the placeholder with proper anchor
	      this.anchor = createAnchor('v-html');
	      replace(this.el, this.anchor);
	    }
	  },

	  update: function update(value) {
	    value = _toString(value);
	    if (this.nodes) {
	      this.swap(value);
	    } else {
	      this.el.innerHTML = value;
	    }
	  },

	  swap: function swap(value) {
	    // remove old nodes
	    var i = this.nodes.length;
	    while (i--) {
	      remove(this.nodes[i]);
	    }
	    // convert new value to a fragment
	    // do not attempt to retrieve from id selector
	    var frag = parseTemplate(value, true, true);
	    // save a reference to these nodes so we can remove later
	    this.nodes = toArray(frag.childNodes);
	    before(frag, this.anchor);
	  }
	};

	var text = {

	  bind: function bind() {
	    this.attr = this.el.nodeType === 3 ? 'data' : 'textContent';
	  },

	  update: function update(value) {
	    this.el[this.attr] = _toString(value);
	  }
	};

	// must export plain object
	var publicDirectives = {
	  text: text,
	  html: html,
	  'for': vFor,
	  'if': vIf,
	  show: show,
	  model: model,
	  on: on,
	  bind: bind,
	  el: el,
	  ref: ref,
	  cloak: cloak
	};

	var queue$1 = [];
	var queued = false;

	/**
	 * Push a job into the queue.
	 *
	 * @param {Function} job
	 */

	function pushJob(job) {
	  queue$1.push(job);
	  if (!queued) {
	    queued = true;
	    nextTick(flush);
	  }
	}

	/**
	 * Flush the queue, and do one forced reflow before
	 * triggering transitions.
	 */

	function flush() {
	  // Force layout
	  var f = document.documentElement.offsetHeight;
	  for (var i = 0; i < queue$1.length; i++) {
	    queue$1[i]();
	  }
	  queue$1 = [];
	  queued = false;
	  // dummy return, so js linters don't complain about
	  // unused variable f
	  return f;
	}

	var TYPE_TRANSITION = 'transition';
	var TYPE_ANIMATION = 'animation';
	var transDurationProp = transitionProp + 'Duration';
	var animDurationProp = animationProp + 'Duration';

	/**
	 * A Transition object that encapsulates the state and logic
	 * of the transition.
	 *
	 * @param {Element} el
	 * @param {String} id
	 * @param {Object} hooks
	 * @param {Vue} vm
	 */
	function Transition(el, id, hooks, vm) {
	  this.id = id;
	  this.el = el;
	  this.enterClass = hooks && hooks.enterClass || id + '-enter';
	  this.leaveClass = hooks && hooks.leaveClass || id + '-leave';
	  this.hooks = hooks;
	  this.vm = vm;
	  // async state
	  this.pendingCssEvent = this.pendingCssCb = this.cancel = this.pendingJsCb = this.op = this.cb = null;
	  this.justEntered = false;
	  this.entered = this.left = false;
	  this.typeCache = {};
	  // check css transition type
	  this.type = hooks && hooks.type;
	  /* istanbul ignore if */
	  if (process.env.NODE_ENV !== 'production') {
	    if (this.type && this.type !== TYPE_TRANSITION && this.type !== TYPE_ANIMATION) {
	      warn('invalid CSS transition type for transition="' + this.id + '": ' + this.type);
	    }
	  }
	  // bind
	  var self = this;['enterNextTick', 'enterDone', 'leaveNextTick', 'leaveDone'].forEach(function (m) {
	    self[m] = bind$1(self[m], self);
	  });
	}

	var p$1 = Transition.prototype;

	/**
	 * Start an entering transition.
	 *
	 * 1. enter transition triggered
	 * 2. call beforeEnter hook
	 * 3. add enter class
	 * 4. insert/show element
	 * 5. call enter hook (with possible explicit js callback)
	 * 6. reflow
	 * 7. based on transition type:
	 *    - transition:
	 *        remove class now, wait for transitionend,
	 *        then done if there's no explicit js callback.
	 *    - animation:
	 *        wait for animationend, remove class,
	 *        then done if there's no explicit js callback.
	 *    - no css transition:
	 *        done now if there's no explicit js callback.
	 * 8. wait for either done or js callback, then call
	 *    afterEnter hook.
	 *
	 * @param {Function} op - insert/show the element
	 * @param {Function} [cb]
	 */

	p$1.enter = function (op, cb) {
	  this.cancelPending();
	  this.callHook('beforeEnter');
	  this.cb = cb;
	  addClass(this.el, this.enterClass);
	  op();
	  this.entered = false;
	  this.callHookWithCb('enter');
	  if (this.entered) {
	    return; // user called done synchronously.
	  }
	  this.cancel = this.hooks && this.hooks.enterCancelled;
	  pushJob(this.enterNextTick);
	};

	/**
	 * The "nextTick" phase of an entering transition, which is
	 * to be pushed into a queue and executed after a reflow so
	 * that removing the class can trigger a CSS transition.
	 */

	p$1.enterNextTick = function () {

	  // Important hack:
	  // in Chrome, if a just-entered element is applied the
	  // leave class while its interpolated property still has
	  // a very small value (within one frame), Chrome will
	  // skip the leave transition entirely and not firing the
	  // transtionend event. Therefore we need to protected
	  // against such cases using a one-frame timeout.
	  this.justEntered = true;
	  var self = this;
	  setTimeout(function () {
	    self.justEntered = false;
	  }, 17);

	  var enterDone = this.enterDone;
	  var type = this.getCssTransitionType(this.enterClass);
	  if (!this.pendingJsCb) {
	    if (type === TYPE_TRANSITION) {
	      // trigger transition by removing enter class now
	      removeClass(this.el, this.enterClass);
	      this.setupCssCb(transitionEndEvent, enterDone);
	    } else if (type === TYPE_ANIMATION) {
	      this.setupCssCb(animationEndEvent, enterDone);
	    } else {
	      enterDone();
	    }
	  } else if (type === TYPE_TRANSITION) {
	    removeClass(this.el, this.enterClass);
	  }
	};

	/**
	 * The "cleanup" phase of an entering transition.
	 */

	p$1.enterDone = function () {
	  this.entered = true;
	  this.cancel = this.pendingJsCb = null;
	  removeClass(this.el, this.enterClass);
	  this.callHook('afterEnter');
	  if (this.cb) this.cb();
	};

	/**
	 * Start a leaving transition.
	 *
	 * 1. leave transition triggered.
	 * 2. call beforeLeave hook
	 * 3. add leave class (trigger css transition)
	 * 4. call leave hook (with possible explicit js callback)
	 * 5. reflow if no explicit js callback is provided
	 * 6. based on transition type:
	 *    - transition or animation:
	 *        wait for end event, remove class, then done if
	 *        there's no explicit js callback.
	 *    - no css transition:
	 *        done if there's no explicit js callback.
	 * 7. wait for either done or js callback, then call
	 *    afterLeave hook.
	 *
	 * @param {Function} op - remove/hide the element
	 * @param {Function} [cb]
	 */

	p$1.leave = function (op, cb) {
	  this.cancelPending();
	  this.callHook('beforeLeave');
	  this.op = op;
	  this.cb = cb;
	  addClass(this.el, this.leaveClass);
	  this.left = false;
	  this.callHookWithCb('leave');
	  if (this.left) {
	    return; // user called done synchronously.
	  }
	  this.cancel = this.hooks && this.hooks.leaveCancelled;
	  // only need to handle leaveDone if
	  // 1. the transition is already done (synchronously called
	  //    by the user, which causes this.op set to null)
	  // 2. there's no explicit js callback
	  if (this.op && !this.pendingJsCb) {
	    // if a CSS transition leaves immediately after enter,
	    // the transitionend event never fires. therefore we
	    // detect such cases and end the leave immediately.
	    if (this.justEntered) {
	      this.leaveDone();
	    } else {
	      pushJob(this.leaveNextTick);
	    }
	  }
	};

	/**
	 * The "nextTick" phase of a leaving transition.
	 */

	p$1.leaveNextTick = function () {
	  var type = this.getCssTransitionType(this.leaveClass);
	  if (type) {
	    var event = type === TYPE_TRANSITION ? transitionEndEvent : animationEndEvent;
	    this.setupCssCb(event, this.leaveDone);
	  } else {
	    this.leaveDone();
	  }
	};

	/**
	 * The "cleanup" phase of a leaving transition.
	 */

	p$1.leaveDone = function () {
	  this.left = true;
	  this.cancel = this.pendingJsCb = null;
	  this.op();
	  removeClass(this.el, this.leaveClass);
	  this.callHook('afterLeave');
	  if (this.cb) this.cb();
	  this.op = null;
	};

	/**
	 * Cancel any pending callbacks from a previously running
	 * but not finished transition.
	 */

	p$1.cancelPending = function () {
	  this.op = this.cb = null;
	  var hasPending = false;
	  if (this.pendingCssCb) {
	    hasPending = true;
	    off(this.el, this.pendingCssEvent, this.pendingCssCb);
	    this.pendingCssEvent = this.pendingCssCb = null;
	  }
	  if (this.pendingJsCb) {
	    hasPending = true;
	    this.pendingJsCb.cancel();
	    this.pendingJsCb = null;
	  }
	  if (hasPending) {
	    removeClass(this.el, this.enterClass);
	    removeClass(this.el, this.leaveClass);
	  }
	  if (this.cancel) {
	    this.cancel.call(this.vm, this.el);
	    this.cancel = null;
	  }
	};

	/**
	 * Call a user-provided synchronous hook function.
	 *
	 * @param {String} type
	 */

	p$1.callHook = function (type) {
	  if (this.hooks && this.hooks[type]) {
	    this.hooks[type].call(this.vm, this.el);
	  }
	};

	/**
	 * Call a user-provided, potentially-async hook function.
	 * We check for the length of arguments to see if the hook
	 * expects a `done` callback. If true, the transition's end
	 * will be determined by when the user calls that callback;
	 * otherwise, the end is determined by the CSS transition or
	 * animation.
	 *
	 * @param {String} type
	 */

	p$1.callHookWithCb = function (type) {
	  var hook = this.hooks && this.hooks[type];
	  if (hook) {
	    if (hook.length > 1) {
	      this.pendingJsCb = cancellable(this[type + 'Done']);
	    }
	    hook.call(this.vm, this.el, this.pendingJsCb);
	  }
	};

	/**
	 * Get an element's transition type based on the
	 * calculated styles.
	 *
	 * @param {String} className
	 * @return {Number}
	 */

	p$1.getCssTransitionType = function (className) {
	  /* istanbul ignore if */
	  if (!transitionEndEvent ||
	  // skip CSS transitions if page is not visible -
	  // this solves the issue of transitionend events not
	  // firing until the page is visible again.
	  // pageVisibility API is supported in IE10+, same as
	  // CSS transitions.
	  document.hidden ||
	  // explicit js-only transition
	  this.hooks && this.hooks.css === false ||
	  // element is hidden
	  isHidden(this.el)) {
	    return;
	  }
	  var type = this.type || this.typeCache[className];
	  if (type) return type;
	  var inlineStyles = this.el.style;
	  var computedStyles = window.getComputedStyle(this.el);
	  var transDuration = inlineStyles[transDurationProp] || computedStyles[transDurationProp];
	  if (transDuration && transDuration !== '0s') {
	    type = TYPE_TRANSITION;
	  } else {
	    var animDuration = inlineStyles[animDurationProp] || computedStyles[animDurationProp];
	    if (animDuration && animDuration !== '0s') {
	      type = TYPE_ANIMATION;
	    }
	  }
	  if (type) {
	    this.typeCache[className] = type;
	  }
	  return type;
	};

	/**
	 * Setup a CSS transitionend/animationend callback.
	 *
	 * @param {String} event
	 * @param {Function} cb
	 */

	p$1.setupCssCb = function (event, cb) {
	  this.pendingCssEvent = event;
	  var self = this;
	  var el = this.el;
	  var onEnd = this.pendingCssCb = function (e) {
	    if (e.target === el) {
	      off(el, event, onEnd);
	      self.pendingCssEvent = self.pendingCssCb = null;
	      if (!self.pendingJsCb && cb) {
	        cb();
	      }
	    }
	  };
	  on$1(el, event, onEnd);
	};

	/**
	 * Check if an element is hidden - in that case we can just
	 * skip the transition alltogether.
	 *
	 * @param {Element} el
	 * @return {Boolean}
	 */

	function isHidden(el) {
	  return !(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
	}

	var transition = {

	  priority: TRANSITION,

	  update: function update(id, oldId) {
	    var el = this.el;
	    // resolve on owner vm
	    var hooks = resolveAsset(this.vm.$options, 'transitions', id);
	    id = id || 'v';
	    // apply on closest vm
	    el.__v_trans = new Transition(el, id, hooks, this.el.__vue__ || this.vm);
	    if (oldId) {
	      removeClass(el, oldId + '-transition');
	    }
	    addClass(el, id + '-transition');
	  }
	};

	var bindingModes = config._propBindingModes;

	var propDef = {

	  bind: function bind() {

	    var child = this.vm;
	    var parent = child._context;
	    // passed in from compiler directly
	    var prop = this.descriptor.prop;
	    var childKey = prop.path;
	    var parentKey = prop.parentPath;
	    var twoWay = prop.mode === bindingModes.TWO_WAY;

	    var parentWatcher = this.parentWatcher = new Watcher(parent, parentKey, function (val) {
	      val = coerceProp(prop, val);
	      if (assertProp(prop, val)) {
	        child[childKey] = val;
	      }
	    }, {
	      twoWay: twoWay,
	      filters: prop.filters,
	      // important: props need to be observed on the
	      // v-for scope if present
	      scope: this._scope
	    });

	    // set the child initial value.
	    initProp(child, prop, parentWatcher.value);

	    // setup two-way binding
	    if (twoWay) {
	      // important: defer the child watcher creation until
	      // the created hook (after data observation)
	      var self = this;
	      child.$once('pre-hook:created', function () {
	        self.childWatcher = new Watcher(child, childKey, function (val) {
	          parentWatcher.set(val);
	        }, {
	          // ensure sync upward before parent sync down.
	          // this is necessary in cases e.g. the child
	          // mutates a prop array, then replaces it. (#1683)
	          sync: true
	        });
	      });
	    }
	  },

	  unbind: function unbind() {
	    this.parentWatcher.teardown();
	    if (this.childWatcher) {
	      this.childWatcher.teardown();
	    }
	  }
	};

	var component = {

	  priority: COMPONENT,

	  params: ['keep-alive', 'transition-mode', 'inline-template'],

	  /**
	   * Setup. Two possible usages:
	   *
	   * - static:
	   *   <comp> or <div v-component="comp">
	   *
	   * - dynamic:
	   *   <component :is="view">
	   */

	  bind: function bind() {
	    if (!this.el.__vue__) {
	      // keep-alive cache
	      this.keepAlive = this.params.keepAlive;
	      if (this.keepAlive) {
	        this.cache = {};
	      }
	      // check inline-template
	      if (this.params.inlineTemplate) {
	        // extract inline template as a DocumentFragment
	        this.inlineTemplate = extractContent(this.el, true);
	      }
	      // component resolution related state
	      this.pendingComponentCb = this.Component = null;
	      // transition related state
	      this.pendingRemovals = 0;
	      this.pendingRemovalCb = null;
	      // create a ref anchor
	      this.anchor = createAnchor('v-component');
	      replace(this.el, this.anchor);
	      // remove is attribute.
	      // this is removed during compilation, but because compilation is
	      // cached, when the component is used elsewhere this attribute
	      // will remain at link time.
	      this.el.removeAttribute('is');
	      // remove ref, same as above
	      if (this.descriptor.ref) {
	        this.el.removeAttribute('v-ref:' + hyphenate(this.descriptor.ref));
	      }
	      // if static, build right now.
	      if (this.literal) {
	        this.setComponent(this.expression);
	      }
	    } else {
	      process.env.NODE_ENV !== 'production' && warn('cannot mount component "' + this.expression + '" ' + 'on already mounted element: ' + this.el);
	    }
	  },

	  /**
	   * Public update, called by the watcher in the dynamic
	   * literal scenario, e.g. <component :is="view">
	   */

	  update: function update(value) {
	    if (!this.literal) {
	      this.setComponent(value);
	    }
	  },

	  /**
	   * Switch dynamic components. May resolve the component
	   * asynchronously, and perform transition based on
	   * specified transition mode. Accepts a few additional
	   * arguments specifically for vue-router.
	   *
	   * The callback is called when the full transition is
	   * finished.
	   *
	   * @param {String} value
	   * @param {Function} [cb]
	   */

	  setComponent: function setComponent(value, cb) {
	    this.invalidatePending();
	    if (!value) {
	      // just remove current
	      this.unbuild(true);
	      this.remove(this.childVM, cb);
	      this.childVM = null;
	    } else {
	      var self = this;
	      this.resolveComponent(value, function () {
	        self.mountComponent(cb);
	      });
	    }
	  },

	  /**
	   * Resolve the component constructor to use when creating
	   * the child vm.
	   */

	  resolveComponent: function resolveComponent(id, cb) {
	    var self = this;
	    this.pendingComponentCb = cancellable(function (Component) {
	      self.ComponentName = Component.options.name || id;
	      self.Component = Component;
	      cb();
	    });
	    this.vm._resolveComponent(id, this.pendingComponentCb);
	  },

	  /**
	   * Create a new instance using the current constructor and
	   * replace the existing instance. This method doesn't care
	   * whether the new component and the old one are actually
	   * the same.
	   *
	   * @param {Function} [cb]
	   */

	  mountComponent: function mountComponent(cb) {
	    // actual mount
	    this.unbuild(true);
	    var self = this;
	    var activateHook = this.Component.options.activate;
	    var cached = this.getCached();
	    var newComponent = this.build();
	    if (activateHook && !cached) {
	      this.waitingFor = newComponent;
	      activateHook.call(newComponent, function () {
	        if (self.waitingFor !== newComponent) {
	          return;
	        }
	        self.waitingFor = null;
	        self.transition(newComponent, cb);
	      });
	    } else {
	      // update ref for kept-alive component
	      if (cached) {
	        newComponent._updateRef();
	      }
	      this.transition(newComponent, cb);
	    }
	  },

	  /**
	   * When the component changes or unbinds before an async
	   * constructor is resolved, we need to invalidate its
	   * pending callback.
	   */

	  invalidatePending: function invalidatePending() {
	    if (this.pendingComponentCb) {
	      this.pendingComponentCb.cancel();
	      this.pendingComponentCb = null;
	    }
	  },

	  /**
	   * Instantiate/insert a new child vm.
	   * If keep alive and has cached instance, insert that
	   * instance; otherwise build a new one and cache it.
	   *
	   * @param {Object} [extraOptions]
	   * @return {Vue} - the created instance
	   */

	  build: function build(extraOptions) {
	    var cached = this.getCached();
	    if (cached) {
	      return cached;
	    }
	    if (this.Component) {
	      // default options
	      var options = {
	        name: this.ComponentName,
	        el: cloneNode(this.el),
	        template: this.inlineTemplate,
	        // make sure to add the child with correct parent
	        // if this is a transcluded component, its parent
	        // should be the transclusion host.
	        parent: this._host || this.vm,
	        // if no inline-template, then the compiled
	        // linker can be cached for better performance.
	        _linkerCachable: !this.inlineTemplate,
	        _ref: this.descriptor.ref,
	        _asComponent: true,
	        _isRouterView: this._isRouterView,
	        // if this is a transcluded component, context
	        // will be the common parent vm of this instance
	        // and its host.
	        _context: this.vm,
	        // if this is inside an inline v-for, the scope
	        // will be the intermediate scope created for this
	        // repeat fragment. this is used for linking props
	        // and container directives.
	        _scope: this._scope,
	        // pass in the owner fragment of this component.
	        // this is necessary so that the fragment can keep
	        // track of its contained components in order to
	        // call attach/detach hooks for them.
	        _frag: this._frag
	      };
	      // extra options
	      // in 1.0.0 this is used by vue-router only
	      /* istanbul ignore if */
	      if (extraOptions) {
	        extend(options, extraOptions);
	      }
	      var child = new this.Component(options);
	      if (this.keepAlive) {
	        this.cache[this.Component.cid] = child;
	      }
	      /* istanbul ignore if */
	      if (process.env.NODE_ENV !== 'production' && this.el.hasAttribute('transition') && child._isFragment) {
	        warn('Transitions will not work on a fragment instance. ' + 'Template: ' + child.$options.template);
	      }
	      return child;
	    }
	  },

	  /**
	   * Try to get a cached instance of the current component.
	   *
	   * @return {Vue|undefined}
	   */

	  getCached: function getCached() {
	    return this.keepAlive && this.cache[this.Component.cid];
	  },

	  /**
	   * Teardown the current child, but defers cleanup so
	   * that we can separate the destroy and removal steps.
	   *
	   * @param {Boolean} defer
	   */

	  unbuild: function unbuild(defer) {
	    if (this.waitingFor) {
	      this.waitingFor.$destroy();
	      this.waitingFor = null;
	    }
	    var child = this.childVM;
	    if (!child || this.keepAlive) {
	      if (child) {
	        // remove ref
	        child._updateRef(true);
	      }
	      return;
	    }
	    // the sole purpose of `deferCleanup` is so that we can
	    // "deactivate" the vm right now and perform DOM removal
	    // later.
	    child.$destroy(false, defer);
	  },

	  /**
	   * Remove current destroyed child and manually do
	   * the cleanup after removal.
	   *
	   * @param {Function} cb
	   */

	  remove: function remove(child, cb) {
	    var keepAlive = this.keepAlive;
	    if (child) {
	      // we may have a component switch when a previous
	      // component is still being transitioned out.
	      // we want to trigger only one lastest insertion cb
	      // when the existing transition finishes. (#1119)
	      this.pendingRemovals++;
	      this.pendingRemovalCb = cb;
	      var self = this;
	      child.$remove(function () {
	        self.pendingRemovals--;
	        if (!keepAlive) child._cleanup();
	        if (!self.pendingRemovals && self.pendingRemovalCb) {
	          self.pendingRemovalCb();
	          self.pendingRemovalCb = null;
	        }
	      });
	    } else if (cb) {
	      cb();
	    }
	  },

	  /**
	   * Actually swap the components, depending on the
	   * transition mode. Defaults to simultaneous.
	   *
	   * @param {Vue} target
	   * @param {Function} [cb]
	   */

	  transition: function transition(target, cb) {
	    var self = this;
	    var current = this.childVM;
	    // for devtool inspection
	    if (process.env.NODE_ENV !== 'production') {
	      if (current) current._inactive = true;
	      target._inactive = false;
	    }
	    this.childVM = target;
	    switch (self.params.transitionMode) {
	      case 'in-out':
	        target.$before(self.anchor, function () {
	          self.remove(current, cb);
	        });
	        break;
	      case 'out-in':
	        self.remove(current, function () {
	          target.$before(self.anchor, cb);
	        });
	        break;
	      default:
	        self.remove(current);
	        target.$before(self.anchor, cb);
	    }
	  },

	  /**
	   * Unbind.
	   */

	  unbind: function unbind() {
	    this.invalidatePending();
	    // Do not defer cleanup when unbinding
	    this.unbuild();
	    // destroy all keep-alive cached instances
	    if (this.cache) {
	      for (var key in this.cache) {
	        this.cache[key].$destroy();
	      }
	      this.cache = null;
	    }
	  }
	};

	var vClass = {

	  deep: true,

	  update: function update(value) {
	    if (value && typeof value === 'string') {
	      this.handleObject(stringToObject(value));
	    } else if (isPlainObject(value)) {
	      this.handleObject(value);
	    } else if (isArray(value)) {
	      this.handleArray(value);
	    } else {
	      this.cleanup();
	    }
	  },

	  handleObject: function handleObject(value) {
	    this.cleanup(value);
	    var keys = this.prevKeys = Object.keys(value);
	    for (var i = 0, l = keys.length; i < l; i++) {
	      var key = keys[i];
	      if (value[key]) {
	        addClass(this.el, key);
	      } else {
	        removeClass(this.el, key);
	      }
	    }
	  },

	  handleArray: function handleArray(value) {
	    this.cleanup(value);
	    for (var i = 0, l = value.length; i < l; i++) {
	      if (value[i]) {
	        addClass(this.el, value[i]);
	      }
	    }
	    this.prevKeys = value.slice();
	  },

	  cleanup: function cleanup(value) {
	    if (this.prevKeys) {
	      var i = this.prevKeys.length;
	      while (i--) {
	        var key = this.prevKeys[i];
	        if (key && (!value || !contains$1(value, key))) {
	          removeClass(this.el, key);
	        }
	      }
	    }
	  }
	};

	function stringToObject(value) {
	  var res = {};
	  var keys = value.trim().split(/\s+/);
	  var i = keys.length;
	  while (i--) {
	    res[keys[i]] = true;
	  }
	  return res;
	}

	function contains$1(value, key) {
	  return isArray(value) ? value.indexOf(key) > -1 : hasOwn(value, key);
	}

	var internalDirectives = {
	  style: style,
	  'class': vClass,
	  component: component,
	  prop: propDef,
	  transition: transition
	};

	var propBindingModes = config._propBindingModes;
	var empty = {};

	// regexes
	var identRE$1 = /^[$_a-zA-Z]+[\w$]*$/;
	var settablePathRE = /^[A-Za-z_$][\w$]*(\.[A-Za-z_$][\w$]*|\[[^\[\]]+\])*$/;

	/**
	 * Compile props on a root element and return
	 * a props link function.
	 *
	 * @param {Element|DocumentFragment} el
	 * @param {Array} propOptions
	 * @return {Function} propsLinkFn
	 */

	function compileProps(el, propOptions) {
	  var props = [];
	  var names = Object.keys(propOptions);
	  var i = names.length;
	  var options, name, attr, value, path, parsed, prop;
	  while (i--) {
	    name = names[i];
	    options = propOptions[name] || empty;

	    if (process.env.NODE_ENV !== 'production' && name === '$data') {
	      warn('Do not use $data as prop.');
	      continue;
	    }

	    // props could contain dashes, which will be
	    // interpreted as minus calculations by the parser
	    // so we need to camelize the path here
	    path = camelize(name);
	    if (!identRE$1.test(path)) {
	      process.env.NODE_ENV !== 'production' && warn('Invalid prop key: "' + name + '". Prop keys ' + 'must be valid identifiers.');
	      continue;
	    }

	    prop = {
	      name: name,
	      path: path,
	      options: options,
	      mode: propBindingModes.ONE_WAY,
	      raw: null
	    };

	    attr = hyphenate(name);
	    // first check dynamic version
	    if ((value = getBindAttr(el, attr)) === null) {
	      if ((value = getBindAttr(el, attr + '.sync')) !== null) {
	        prop.mode = propBindingModes.TWO_WAY;
	      } else if ((value = getBindAttr(el, attr + '.once')) !== null) {
	        prop.mode = propBindingModes.ONE_TIME;
	      }
	    }
	    if (value !== null) {
	      // has dynamic binding!
	      prop.raw = value;
	      parsed = parseDirective(value);
	      value = parsed.expression;
	      prop.filters = parsed.filters;
	      // check binding type
	      if (isLiteral(value) && !parsed.filters) {
	        // for expressions containing literal numbers and
	        // booleans, there's no need to setup a prop binding,
	        // so we can optimize them as a one-time set.
	        prop.optimizedLiteral = true;
	      } else {
	        prop.dynamic = true;
	        // check non-settable path for two-way bindings
	        if (process.env.NODE_ENV !== 'production' && prop.mode === propBindingModes.TWO_WAY && !settablePathRE.test(value)) {
	          prop.mode = propBindingModes.ONE_WAY;
	          warn('Cannot bind two-way prop with non-settable ' + 'parent path: ' + value);
	        }
	      }
	      prop.parentPath = value;

	      // warn required two-way
	      if (process.env.NODE_ENV !== 'production' && options.twoWay && prop.mode !== propBindingModes.TWO_WAY) {
	        warn('Prop "' + name + '" expects a two-way binding type.');
	      }
	    } else if ((value = getAttr(el, attr)) !== null) {
	      // has literal binding!
	      prop.raw = value;
	    } else if (options.required) {
	      // warn missing required
	      process.env.NODE_ENV !== 'production' && warn('Missing required prop: ' + name);
	    }
	    // push prop
	    props.push(prop);
	  }
	  return makePropsLinkFn(props);
	}

	/**
	 * Build a function that applies props to a vm.
	 *
	 * @param {Array} props
	 * @return {Function} propsLinkFn
	 */

	function makePropsLinkFn(props) {
	  return function propsLinkFn(vm, scope) {
	    // store resolved props info
	    vm._props = {};
	    var i = props.length;
	    var prop, path, options, value, raw;
	    while (i--) {
	      prop = props[i];
	      raw = prop.raw;
	      path = prop.path;
	      options = prop.options;
	      vm._props[path] = prop;
	      if (raw === null) {
	        // initialize absent prop
	        initProp(vm, prop, getDefault(vm, options));
	      } else if (prop.dynamic) {
	        // dynamic prop
	        if (vm._context) {
	          if (prop.mode === propBindingModes.ONE_TIME) {
	            // one time binding
	            value = (scope || vm._context).$get(prop.parentPath);
	            initProp(vm, prop, value);
	          } else {
	            // dynamic binding
	            vm._bindDir({
	              name: 'prop',
	              def: propDef,
	              prop: prop
	            }, null, null, scope); // el, host, scope
	          }
	        } else {
	            process.env.NODE_ENV !== 'production' && warn('Cannot bind dynamic prop on a root instance' + ' with no parent: ' + prop.name + '="' + raw + '"');
	          }
	      } else if (prop.optimizedLiteral) {
	        // optimized literal, cast it and just set once
	        var stripped = stripQuotes(raw);
	        value = stripped === raw ? toBoolean(toNumber(raw)) : stripped;
	        initProp(vm, prop, value);
	      } else {
	        // string literal, but we need to cater for
	        // Boolean props with no value
	        value = options.type === Boolean && raw === '' ? true : raw;
	        initProp(vm, prop, value);
	      }
	    }
	  };
	}

	/**
	 * Get the default value of a prop.
	 *
	 * @param {Vue} vm
	 * @param {Object} options
	 * @return {*}
	 */

	function getDefault(vm, options) {
	  // no default, return undefined
	  if (!hasOwn(options, 'default')) {
	    // absent boolean value defaults to false
	    return options.type === Boolean ? false : undefined;
	  }
	  var def = options['default'];
	  // warn against non-factory defaults for Object & Array
	  if (isObject(def)) {
	    process.env.NODE_ENV !== 'production' && warn('Object/Array as default prop values will be shared ' + 'across multiple instances. Use a factory function ' + 'to return the default value instead.');
	  }
	  // call factory function for non-Function types
	  return typeof def === 'function' && options.type !== Function ? def.call(vm) : def;
	}

	// special binding prefixes
	var bindRE = /^v-bind:|^:/;
	var onRE = /^v-on:|^@/;
	var dirAttrRE = /^v-([^:]+)(?:$|:(.*)$)/;
	var modifierRE = /\.[^\.]+/g;
	var transitionRE = /^(v-bind:|:)?transition$/;

	// terminal directives
	var terminalDirectives = ['for', 'if'];

	// default directive priority
	var DEFAULT_PRIORITY = 1000;

	/**
	 * Compile a template and return a reusable composite link
	 * function, which recursively contains more link functions
	 * inside. This top level compile function would normally
	 * be called on instance root nodes, but can also be used
	 * for partial compilation if the partial argument is true.
	 *
	 * The returned composite link function, when called, will
	 * return an unlink function that tearsdown all directives
	 * created during the linking phase.
	 *
	 * @param {Element|DocumentFragment} el
	 * @param {Object} options
	 * @param {Boolean} partial
	 * @return {Function}
	 */

	function compile(el, options, partial) {
	  // link function for the node itself.
	  var nodeLinkFn = partial || !options._asComponent ? compileNode(el, options) : null;
	  // link function for the childNodes
	  var childLinkFn = !(nodeLinkFn && nodeLinkFn.terminal) && el.tagName !== 'SCRIPT' && el.hasChildNodes() ? compileNodeList(el.childNodes, options) : null;

	  /**
	   * A composite linker function to be called on a already
	   * compiled piece of DOM, which instantiates all directive
	   * instances.
	   *
	   * @param {Vue} vm
	   * @param {Element|DocumentFragment} el
	   * @param {Vue} [host] - host vm of transcluded content
	   * @param {Object} [scope] - v-for scope
	   * @param {Fragment} [frag] - link context fragment
	   * @return {Function|undefined}
	   */

	  return function compositeLinkFn(vm, el, host, scope, frag) {
	    // cache childNodes before linking parent, fix #657
	    var childNodes = toArray(el.childNodes);
	    // link
	    var dirs = linkAndCapture(function compositeLinkCapturer() {
	      if (nodeLinkFn) nodeLinkFn(vm, el, host, scope, frag);
	      if (childLinkFn) childLinkFn(vm, childNodes, host, scope, frag);
	    }, vm);
	    return makeUnlinkFn(vm, dirs);
	  };
	}

	/**
	 * Apply a linker to a vm/element pair and capture the
	 * directives created during the process.
	 *
	 * @param {Function} linker
	 * @param {Vue} vm
	 */

	function linkAndCapture(linker, vm) {
	  /* istanbul ignore if */
	  if (process.env.NODE_ENV === 'production') {
	    // reset directives before every capture in production
	    // mode, so that when unlinking we don't need to splice
	    // them out (which turns out to be a perf hit).
	    // they are kept in development mode because they are
	    // useful for Vue's own tests.
	    vm._directives = [];
	  }
	  var originalDirCount = vm._directives.length;
	  linker();
	  var dirs = vm._directives.slice(originalDirCount);
	  dirs.sort(directiveComparator);
	  for (var i = 0, l = dirs.length; i < l; i++) {
	    dirs[i]._bind();
	  }
	  return dirs;
	}

	/**
	 * Directive priority sort comparator
	 *
	 * @param {Object} a
	 * @param {Object} b
	 */

	function directiveComparator(a, b) {
	  a = a.descriptor.def.priority || DEFAULT_PRIORITY;
	  b = b.descriptor.def.priority || DEFAULT_PRIORITY;
	  return a > b ? -1 : a === b ? 0 : 1;
	}

	/**
	 * Linker functions return an unlink function that
	 * tearsdown all directives instances generated during
	 * the process.
	 *
	 * We create unlink functions with only the necessary
	 * information to avoid retaining additional closures.
	 *
	 * @param {Vue} vm
	 * @param {Array} dirs
	 * @param {Vue} [context]
	 * @param {Array} [contextDirs]
	 * @return {Function}
	 */

	function makeUnlinkFn(vm, dirs, context, contextDirs) {
	  function unlink(destroying) {
	    teardownDirs(vm, dirs, destroying);
	    if (context && contextDirs) {
	      teardownDirs(context, contextDirs);
	    }
	  }
	  // expose linked directives
	  unlink.dirs = dirs;
	  return unlink;
	}

	/**
	 * Teardown partial linked directives.
	 *
	 * @param {Vue} vm
	 * @param {Array} dirs
	 * @param {Boolean} destroying
	 */

	function teardownDirs(vm, dirs, destroying) {
	  var i = dirs.length;
	  while (i--) {
	    dirs[i]._teardown();
	    if (process.env.NODE_ENV !== 'production' && !destroying) {
	      vm._directives.$remove(dirs[i]);
	    }
	  }
	}

	/**
	 * Compile link props on an instance.
	 *
	 * @param {Vue} vm
	 * @param {Element} el
	 * @param {Object} props
	 * @param {Object} [scope]
	 * @return {Function}
	 */

	function compileAndLinkProps(vm, el, props, scope) {
	  var propsLinkFn = compileProps(el, props);
	  var propDirs = linkAndCapture(function () {
	    propsLinkFn(vm, scope);
	  }, vm);
	  return makeUnlinkFn(vm, propDirs);
	}

	/**
	 * Compile the root element of an instance.
	 *
	 * 1. attrs on context container (context scope)
	 * 2. attrs on the component template root node, if
	 *    replace:true (child scope)
	 *
	 * If this is a fragment instance, we only need to compile 1.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @param {Object} contextOptions
	 * @return {Function}
	 */

	function compileRoot(el, options, contextOptions) {
	  var containerAttrs = options._containerAttrs;
	  var replacerAttrs = options._replacerAttrs;
	  var contextLinkFn, replacerLinkFn;

	  // only need to compile other attributes for
	  // non-fragment instances
	  if (el.nodeType !== 11) {
	    // for components, container and replacer need to be
	    // compiled separately and linked in different scopes.
	    if (options._asComponent) {
	      // 2. container attributes
	      if (containerAttrs && contextOptions) {
	        contextLinkFn = compileDirectives(containerAttrs, contextOptions);
	      }
	      if (replacerAttrs) {
	        // 3. replacer attributes
	        replacerLinkFn = compileDirectives(replacerAttrs, options);
	      }
	    } else {
	      // non-component, just compile as a normal element.
	      replacerLinkFn = compileDirectives(el.attributes, options);
	    }
	  } else if (process.env.NODE_ENV !== 'production' && containerAttrs) {
	    // warn container directives for fragment instances
	    var names = containerAttrs.filter(function (attr) {
	      // allow vue-loader/vueify scoped css attributes
	      return attr.name.indexOf('_v-') < 0 &&
	      // allow event listeners
	      !onRE.test(attr.name) &&
	      // allow slots
	      attr.name !== 'slot';
	    }).map(function (attr) {
	      return '"' + attr.name + '"';
	    });
	    if (names.length) {
	      var plural = names.length > 1;
	      warn('Attribute' + (plural ? 's ' : ' ') + names.join(', ') + (plural ? ' are' : ' is') + ' ignored on component ' + '<' + options.el.tagName.toLowerCase() + '> because ' + 'the component is a fragment instance: ' + 'http://vuejs.org/guide/components.html#Fragment_Instance');
	    }
	  }

	  options._containerAttrs = options._replacerAttrs = null;
	  return function rootLinkFn(vm, el, scope) {
	    // link context scope dirs
	    var context = vm._context;
	    var contextDirs;
	    if (context && contextLinkFn) {
	      contextDirs = linkAndCapture(function () {
	        contextLinkFn(context, el, null, scope);
	      }, context);
	    }

	    // link self
	    var selfDirs = linkAndCapture(function () {
	      if (replacerLinkFn) replacerLinkFn(vm, el);
	    }, vm);

	    // return the unlink function that tearsdown context
	    // container directives.
	    return makeUnlinkFn(vm, selfDirs, context, contextDirs);
	  };
	}

	/**
	 * Compile a node and return a nodeLinkFn based on the
	 * node type.
	 *
	 * @param {Node} node
	 * @param {Object} options
	 * @return {Function|null}
	 */

	function compileNode(node, options) {
	  var type = node.nodeType;
	  if (type === 1 && node.tagName !== 'SCRIPT') {
	    return compileElement(node, options);
	  } else if (type === 3 && node.data.trim()) {
	    return compileTextNode(node, options);
	  } else {
	    return null;
	  }
	}

	/**
	 * Compile an element and return a nodeLinkFn.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Function|null}
	 */

	function compileElement(el, options) {
	  // preprocess textareas.
	  // textarea treats its text content as the initial value.
	  // just bind it as an attr directive for value.
	  if (el.tagName === 'TEXTAREA') {
	    var tokens = parseText(el.value);
	    if (tokens) {
	      el.setAttribute(':value', tokensToExp(tokens));
	      el.value = '';
	    }
	  }
	  var linkFn;
	  var hasAttrs = el.hasAttributes();
	  // check terminal directives (for & if)
	  if (hasAttrs) {
	    linkFn = checkTerminalDirectives(el, options);
	  }
	  // check element directives
	  if (!linkFn) {
	    linkFn = checkElementDirectives(el, options);
	  }
	  // check component
	  if (!linkFn) {
	    linkFn = checkComponent(el, options);
	  }
	  // normal directives
	  if (!linkFn && hasAttrs) {
	    linkFn = compileDirectives(el.attributes, options);
	  }
	  return linkFn;
	}

	/**
	 * Compile a textNode and return a nodeLinkFn.
	 *
	 * @param {TextNode} node
	 * @param {Object} options
	 * @return {Function|null} textNodeLinkFn
	 */

	function compileTextNode(node, options) {
	  // skip marked text nodes
	  if (node._skip) {
	    return removeText;
	  }

	  var tokens = parseText(node.wholeText);
	  if (!tokens) {
	    return null;
	  }

	  // mark adjacent text nodes as skipped,
	  // because we are using node.wholeText to compile
	  // all adjacent text nodes together. This fixes
	  // issues in IE where sometimes it splits up a single
	  // text node into multiple ones.
	  var next = node.nextSibling;
	  while (next && next.nodeType === 3) {
	    next._skip = true;
	    next = next.nextSibling;
	  }

	  var frag = document.createDocumentFragment();
	  var el, token;
	  for (var i = 0, l = tokens.length; i < l; i++) {
	    token = tokens[i];
	    el = token.tag ? processTextToken(token, options) : document.createTextNode(token.value);
	    frag.appendChild(el);
	  }
	  return makeTextNodeLinkFn(tokens, frag, options);
	}

	/**
	 * Linker for an skipped text node.
	 *
	 * @param {Vue} vm
	 * @param {Text} node
	 */

	function removeText(vm, node) {
	  remove(node);
	}

	/**
	 * Process a single text token.
	 *
	 * @param {Object} token
	 * @param {Object} options
	 * @return {Node}
	 */

	function processTextToken(token, options) {
	  var el;
	  if (token.oneTime) {
	    el = document.createTextNode(token.value);
	  } else {
	    if (token.html) {
	      el = document.createComment('v-html');
	      setTokenType('html');
	    } else {
	      // IE will clean up empty textNodes during
	      // frag.cloneNode(true), so we have to give it
	      // something here...
	      el = document.createTextNode(' ');
	      setTokenType('text');
	    }
	  }
	  function setTokenType(type) {
	    if (token.descriptor) return;
	    var parsed = parseDirective(token.value);
	    token.descriptor = {
	      name: type,
	      def: publicDirectives[type],
	      expression: parsed.expression,
	      filters: parsed.filters
	    };
	  }
	  return el;
	}

	/**
	 * Build a function that processes a textNode.
	 *
	 * @param {Array<Object>} tokens
	 * @param {DocumentFragment} frag
	 */

	function makeTextNodeLinkFn(tokens, frag) {
	  return function textNodeLinkFn(vm, el, host, scope) {
	    var fragClone = frag.cloneNode(true);
	    var childNodes = toArray(fragClone.childNodes);
	    var token, value, node;
	    for (var i = 0, l = tokens.length; i < l; i++) {
	      token = tokens[i];
	      value = token.value;
	      if (token.tag) {
	        node = childNodes[i];
	        if (token.oneTime) {
	          value = (scope || vm).$eval(value);
	          if (token.html) {
	            replace(node, parseTemplate(value, true));
	          } else {
	            node.data = value;
	          }
	        } else {
	          vm._bindDir(token.descriptor, node, host, scope);
	        }
	      }
	    }
	    replace(el, fragClone);
	  };
	}

	/**
	 * Compile a node list and return a childLinkFn.
	 *
	 * @param {NodeList} nodeList
	 * @param {Object} options
	 * @return {Function|undefined}
	 */

	function compileNodeList(nodeList, options) {
	  var linkFns = [];
	  var nodeLinkFn, childLinkFn, node;
	  for (var i = 0, l = nodeList.length; i < l; i++) {
	    node = nodeList[i];
	    nodeLinkFn = compileNode(node, options);
	    childLinkFn = !(nodeLinkFn && nodeLinkFn.terminal) && node.tagName !== 'SCRIPT' && node.hasChildNodes() ? compileNodeList(node.childNodes, options) : null;
	    linkFns.push(nodeLinkFn, childLinkFn);
	  }
	  return linkFns.length ? makeChildLinkFn(linkFns) : null;
	}

	/**
	 * Make a child link function for a node's childNodes.
	 *
	 * @param {Array<Function>} linkFns
	 * @return {Function} childLinkFn
	 */

	function makeChildLinkFn(linkFns) {
	  return function childLinkFn(vm, nodes, host, scope, frag) {
	    var node, nodeLinkFn, childrenLinkFn;
	    for (var i = 0, n = 0, l = linkFns.length; i < l; n++) {
	      node = nodes[n];
	      nodeLinkFn = linkFns[i++];
	      childrenLinkFn = linkFns[i++];
	      // cache childNodes before linking parent, fix #657
	      var childNodes = toArray(node.childNodes);
	      if (nodeLinkFn) {
	        nodeLinkFn(vm, node, host, scope, frag);
	      }
	      if (childrenLinkFn) {
	        childrenLinkFn(vm, childNodes, host, scope, frag);
	      }
	    }
	  };
	}

	/**
	 * Check for element directives (custom elements that should
	 * be resovled as terminal directives).
	 *
	 * @param {Element} el
	 * @param {Object} options
	 */

	function checkElementDirectives(el, options) {
	  var tag = el.tagName.toLowerCase();
	  if (commonTagRE.test(tag)) return;
	  // special case: give named slot a higher priority
	  // than unnamed slots
	  if (tag === 'slot' && hasBindAttr(el, 'name')) {
	    tag = '_namedSlot';
	  }
	  var def = resolveAsset(options, 'elementDirectives', tag);
	  if (def) {
	    return makeTerminalNodeLinkFn(el, tag, '', options, def);
	  }
	}

	/**
	 * Check if an element is a component. If yes, return
	 * a component link function.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Function|undefined}
	 */

	function checkComponent(el, options) {
	  var component = checkComponentAttr(el, options);
	  if (component) {
	    var ref = findRef(el);
	    var descriptor = {
	      name: 'component',
	      ref: ref,
	      expression: component.id,
	      def: internalDirectives.component,
	      modifiers: {
	        literal: !component.dynamic
	      }
	    };
	    var componentLinkFn = function componentLinkFn(vm, el, host, scope, frag) {
	      if (ref) {
	        defineReactive((scope || vm).$refs, ref, null);
	      }
	      vm._bindDir(descriptor, el, host, scope, frag);
	    };
	    componentLinkFn.terminal = true;
	    return componentLinkFn;
	  }
	}

	/**
	 * Check an element for terminal directives in fixed order.
	 * If it finds one, return a terminal link function.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Function} terminalLinkFn
	 */

	function checkTerminalDirectives(el, options) {
	  // skip v-pre
	  if (getAttr(el, 'v-pre') !== null) {
	    return skip;
	  }
	  // skip v-else block, but only if following v-if
	  if (el.hasAttribute('v-else')) {
	    var prev = el.previousElementSibling;
	    if (prev && prev.hasAttribute('v-if')) {
	      return skip;
	    }
	  }
	  var value, dirName;
	  for (var i = 0, l = terminalDirectives.length; i < l; i++) {
	    dirName = terminalDirectives[i];
	    value = el.getAttribute('v-' + dirName);
	    if (value != null) {
	      return makeTerminalNodeLinkFn(el, dirName, value, options);
	    }
	  }
	}

	function skip() {}
	skip.terminal = true;

	/**
	 * Build a node link function for a terminal directive.
	 * A terminal link function terminates the current
	 * compilation recursion and handles compilation of the
	 * subtree in the directive.
	 *
	 * @param {Element} el
	 * @param {String} dirName
	 * @param {String} value
	 * @param {Object} options
	 * @param {Object} [def]
	 * @return {Function} terminalLinkFn
	 */

	function makeTerminalNodeLinkFn(el, dirName, value, options, def) {
	  var parsed = parseDirective(value);
	  var descriptor = {
	    name: dirName,
	    expression: parsed.expression,
	    filters: parsed.filters,
	    raw: value,
	    // either an element directive, or if/for
	    def: def || publicDirectives[dirName]
	  };
	  // check ref for v-for and router-view
	  if (dirName === 'for' || dirName === 'router-view') {
	    descriptor.ref = findRef(el);
	  }
	  var fn = function terminalNodeLinkFn(vm, el, host, scope, frag) {
	    if (descriptor.ref) {
	      defineReactive((scope || vm).$refs, descriptor.ref, null);
	    }
	    vm._bindDir(descriptor, el, host, scope, frag);
	  };
	  fn.terminal = true;
	  return fn;
	}

	/**
	 * Compile the directives on an element and return a linker.
	 *
	 * @param {Array|NamedNodeMap} attrs
	 * @param {Object} options
	 * @return {Function}
	 */

	function compileDirectives(attrs, options) {
	  var i = attrs.length;
	  var dirs = [];
	  var attr, name, value, rawName, rawValue, dirName, arg, modifiers, dirDef, tokens, matched;
	  while (i--) {
	    attr = attrs[i];
	    name = rawName = attr.name;
	    value = rawValue = attr.value;
	    tokens = parseText(value);
	    // reset arg
	    arg = null;
	    // check modifiers
	    modifiers = parseModifiers(name);
	    name = name.replace(modifierRE, '');

	    // attribute interpolations
	    if (tokens) {
	      value = tokensToExp(tokens);
	      arg = name;
	      pushDir('bind', publicDirectives.bind, tokens);
	      // warn against mixing mustaches with v-bind
	      if (process.env.NODE_ENV !== 'production') {
	        if (name === 'class' && Array.prototype.some.call(attrs, function (attr) {
	          return attr.name === ':class' || attr.name === 'v-bind:class';
	        })) {
	          warn('class="' + rawValue + '": Do not mix mustache interpolation ' + 'and v-bind for "class" on the same element. Use one or the other.');
	        }
	      }
	    } else

	      // special attribute: transition
	      if (transitionRE.test(name)) {
	        modifiers.literal = !bindRE.test(name);
	        pushDir('transition', internalDirectives.transition);
	      } else

	        // event handlers
	        if (onRE.test(name)) {
	          arg = name.replace(onRE, '');
	          pushDir('on', publicDirectives.on);
	        } else

	          // attribute bindings
	          if (bindRE.test(name)) {
	            dirName = name.replace(bindRE, '');
	            if (dirName === 'style' || dirName === 'class') {
	              pushDir(dirName, internalDirectives[dirName]);
	            } else {
	              arg = dirName;
	              pushDir('bind', publicDirectives.bind);
	            }
	          } else

	            // normal directives
	            if (matched = name.match(dirAttrRE)) {
	              dirName = matched[1];
	              arg = matched[2];

	              // skip v-else (when used with v-show)
	              if (dirName === 'else') {
	                continue;
	              }

	              dirDef = resolveAsset(options, 'directives', dirName);

	              if (process.env.NODE_ENV !== 'production') {
	                assertAsset(dirDef, 'directive', dirName);
	              }

	              if (dirDef) {
	                pushDir(dirName, dirDef);
	              }
	            }
	  }

	  /**
	   * Push a directive.
	   *
	   * @param {String} dirName
	   * @param {Object|Function} def
	   * @param {Array} [interpTokens]
	   */

	  function pushDir(dirName, def, interpTokens) {
	    var hasOneTimeToken = interpTokens && hasOneTime(interpTokens);
	    var parsed = !hasOneTimeToken && parseDirective(value);
	    dirs.push({
	      name: dirName,
	      attr: rawName,
	      raw: rawValue,
	      def: def,
	      arg: arg,
	      modifiers: modifiers,
	      // conversion from interpolation strings with one-time token
	      // to expression is differed until directive bind time so that we
	      // have access to the actual vm context for one-time bindings.
	      expression: parsed && parsed.expression,
	      filters: parsed && parsed.filters,
	      interp: interpTokens,
	      hasOneTime: hasOneTimeToken
	    });
	  }

	  if (dirs.length) {
	    return makeNodeLinkFn(dirs);
	  }
	}

	/**
	 * Parse modifiers from directive attribute name.
	 *
	 * @param {String} name
	 * @return {Object}
	 */

	function parseModifiers(name) {
	  var res = Object.create(null);
	  var match = name.match(modifierRE);
	  if (match) {
	    var i = match.length;
	    while (i--) {
	      res[match[i].slice(1)] = true;
	    }
	  }
	  return res;
	}

	/**
	 * Build a link function for all directives on a single node.
	 *
	 * @param {Array} directives
	 * @return {Function} directivesLinkFn
	 */

	function makeNodeLinkFn(directives) {
	  return function nodeLinkFn(vm, el, host, scope, frag) {
	    // reverse apply because it's sorted low to high
	    var i = directives.length;
	    while (i--) {
	      vm._bindDir(directives[i], el, host, scope, frag);
	    }
	  };
	}

	/**
	 * Check if an interpolation string contains one-time tokens.
	 *
	 * @param {Array} tokens
	 * @return {Boolean}
	 */

	function hasOneTime(tokens) {
	  var i = tokens.length;
	  while (i--) {
	    if (tokens[i].oneTime) return true;
	  }
	}

	var specialCharRE = /[^\w\-:\.]/;

	/**
	 * Process an element or a DocumentFragment based on a
	 * instance option object. This allows us to transclude
	 * a template node/fragment before the instance is created,
	 * so the processed fragment can then be cloned and reused
	 * in v-for.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Element|DocumentFragment}
	 */

	function transclude(el, options) {
	  // extract container attributes to pass them down
	  // to compiler, because they need to be compiled in
	  // parent scope. we are mutating the options object here
	  // assuming the same object will be used for compile
	  // right after this.
	  if (options) {
	    options._containerAttrs = extractAttrs(el);
	  }
	  // for template tags, what we want is its content as
	  // a documentFragment (for fragment instances)
	  if (isTemplate(el)) {
	    el = parseTemplate(el);
	  }
	  if (options) {
	    if (options._asComponent && !options.template) {
	      options.template = '<slot></slot>';
	    }
	    if (options.template) {
	      options._content = extractContent(el);
	      el = transcludeTemplate(el, options);
	    }
	  }
	  if (el instanceof DocumentFragment) {
	    // anchors for fragment instance
	    // passing in `persist: true` to avoid them being
	    // discarded by IE during template cloning
	    prepend(createAnchor('v-start', true), el);
	    el.appendChild(createAnchor('v-end', true));
	  }
	  return el;
	}

	/**
	 * Process the template option.
	 * If the replace option is true this will swap the $el.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Element|DocumentFragment}
	 */

	function transcludeTemplate(el, options) {
	  var template = options.template;
	  var frag = parseTemplate(template, true);
	  if (frag) {
	    var replacer = frag.firstChild;
	    var tag = replacer.tagName && replacer.tagName.toLowerCase();
	    if (options.replace) {
	      /* istanbul ignore if */
	      if (el === document.body) {
	        process.env.NODE_ENV !== 'production' && warn('You are mounting an instance with a template to ' + '<body>. This will replace <body> entirely. You ' + 'should probably use `replace: false` here.');
	      }
	      // there are many cases where the instance must
	      // become a fragment instance: basically anything that
	      // can create more than 1 root nodes.
	      if (
	      // multi-children template
	      frag.childNodes.length > 1 ||
	      // non-element template
	      replacer.nodeType !== 1 ||
	      // single nested component
	      tag === 'component' || resolveAsset(options, 'components', tag) || hasBindAttr(replacer, 'is') ||
	      // element directive
	      resolveAsset(options, 'elementDirectives', tag) ||
	      // for block
	      replacer.hasAttribute('v-for') ||
	      // if block
	      replacer.hasAttribute('v-if')) {
	        return frag;
	      } else {
	        options._replacerAttrs = extractAttrs(replacer);
	        mergeAttrs(el, replacer);
	        return replacer;
	      }
	    } else {
	      el.appendChild(frag);
	      return el;
	    }
	  } else {
	    process.env.NODE_ENV !== 'production' && warn('Invalid template option: ' + template);
	  }
	}

	/**
	 * Helper to extract a component container's attributes
	 * into a plain object array.
	 *
	 * @param {Element} el
	 * @return {Array}
	 */

	function extractAttrs(el) {
	  if (el.nodeType === 1 && el.hasAttributes()) {
	    return toArray(el.attributes);
	  }
	}

	/**
	 * Merge the attributes of two elements, and make sure
	 * the class names are merged properly.
	 *
	 * @param {Element} from
	 * @param {Element} to
	 */

	function mergeAttrs(from, to) {
	  var attrs = from.attributes;
	  var i = attrs.length;
	  var name, value;
	  while (i--) {
	    name = attrs[i].name;
	    value = attrs[i].value;
	    if (!to.hasAttribute(name) && !specialCharRE.test(name)) {
	      to.setAttribute(name, value);
	    } else if (name === 'class' && !parseText(value)) {
	      value.split(/\s+/).forEach(function (cls) {
	        addClass(to, cls);
	      });
	    }
	  }
	}

	var compiler = Object.freeze({
		compile: compile,
		compileAndLinkProps: compileAndLinkProps,
		compileRoot: compileRoot,
		terminalDirectives: terminalDirectives,
		transclude: transclude
	});

	function stateMixin (Vue) {

	  /**
	   * Accessor for `$data` property, since setting $data
	   * requires observing the new object and updating
	   * proxied properties.
	   */

	  Object.defineProperty(Vue.prototype, '$data', {
	    get: function get() {
	      return this._data;
	    },
	    set: function set(newData) {
	      if (newData !== this._data) {
	        this._setData(newData);
	      }
	    }
	  });

	  /**
	   * Setup the scope of an instance, which contains:
	   * - observed data
	   * - computed properties
	   * - user methods
	   * - meta properties
	   */

	  Vue.prototype._initState = function () {
	    this._initProps();
	    this._initMeta();
	    this._initMethods();
	    this._initData();
	    this._initComputed();
	  };

	  /**
	   * Initialize props.
	   */

	  Vue.prototype._initProps = function () {
	    var options = this.$options;
	    var el = options.el;
	    var props = options.props;
	    if (props && !el) {
	      process.env.NODE_ENV !== 'production' && warn('Props will not be compiled if no `el` option is ' + 'provided at instantiation.');
	    }
	    // make sure to convert string selectors into element now
	    el = options.el = query(el);
	    this._propsUnlinkFn = el && el.nodeType === 1 && props
	    // props must be linked in proper scope if inside v-for
	    ? compileAndLinkProps(this, el, props, this._scope) : null;
	  };

	  /**
	   * Initialize the data.
	   */

	  Vue.prototype._initData = function () {
	    var propsData = this._data;
	    var optionsDataFn = this.$options.data;
	    var optionsData = optionsDataFn && optionsDataFn();
	    var runtimeData;
	    if (process.env.NODE_ENV !== 'production') {
	      runtimeData = (typeof this._runtimeData === 'function' ? this._runtimeData() : this._runtimeData) || {};
	      this._runtimeData = null;
	    }
	    if (optionsData) {
	      this._data = optionsData;
	      for (var prop in propsData) {
	        if (process.env.NODE_ENV !== 'production' && hasOwn(optionsData, prop) && !hasOwn(runtimeData, prop)) {
	          warn('Data field "' + prop + '" is already defined ' + 'as a prop. Use prop default value instead.');
	        }
	        if (this._props[prop].raw !== null || !hasOwn(optionsData, prop)) {
	          set(optionsData, prop, propsData[prop]);
	        }
	      }
	    }
	    var data = this._data;
	    // proxy data on instance
	    var keys = Object.keys(data);
	    var i, key;
	    i = keys.length;
	    while (i--) {
	      key = keys[i];
	      this._proxy(key);
	    }
	    // observe data
	    observe(data, this);
	  };

	  /**
	   * Swap the instance's $data. Called in $data's setter.
	   *
	   * @param {Object} newData
	   */

	  Vue.prototype._setData = function (newData) {
	    newData = newData || {};
	    var oldData = this._data;
	    this._data = newData;
	    var keys, key, i;
	    // unproxy keys not present in new data
	    keys = Object.keys(oldData);
	    i = keys.length;
	    while (i--) {
	      key = keys[i];
	      if (!(key in newData)) {
	        this._unproxy(key);
	      }
	    }
	    // proxy keys not already proxied,
	    // and trigger change for changed values
	    keys = Object.keys(newData);
	    i = keys.length;
	    while (i--) {
	      key = keys[i];
	      if (!hasOwn(this, key)) {
	        // new property
	        this._proxy(key);
	      }
	    }
	    oldData.__ob__.removeVm(this);
	    observe(newData, this);
	    this._digest();
	  };

	  /**
	   * Proxy a property, so that
	   * vm.prop === vm._data.prop
	   *
	   * @param {String} key
	   */

	  Vue.prototype._proxy = function (key) {
	    if (!isReserved(key)) {
	      // need to store ref to self here
	      // because these getter/setters might
	      // be called by child scopes via
	      // prototype inheritance.
	      var self = this;
	      Object.defineProperty(self, key, {
	        configurable: true,
	        enumerable: true,
	        get: function proxyGetter() {
	          return self._data[key];
	        },
	        set: function proxySetter(val) {
	          self._data[key] = val;
	        }
	      });
	    }
	  };

	  /**
	   * Unproxy a property.
	   *
	   * @param {String} key
	   */

	  Vue.prototype._unproxy = function (key) {
	    if (!isReserved(key)) {
	      delete this[key];
	    }
	  };

	  /**
	   * Force update on every watcher in scope.
	   */

	  Vue.prototype._digest = function () {
	    for (var i = 0, l = this._watchers.length; i < l; i++) {
	      this._watchers[i].update(true); // shallow updates
	    }
	  };

	  /**
	   * Setup computed properties. They are essentially
	   * special getter/setters
	   */

	  function noop() {}
	  Vue.prototype._initComputed = function () {
	    var computed = this.$options.computed;
	    if (computed) {
	      for (var key in computed) {
	        var userDef = computed[key];
	        var def = {
	          enumerable: true,
	          configurable: true
	        };
	        if (typeof userDef === 'function') {
	          def.get = makeComputedGetter(userDef, this);
	          def.set = noop;
	        } else {
	          def.get = userDef.get ? userDef.cache !== false ? makeComputedGetter(userDef.get, this) : bind$1(userDef.get, this) : noop;
	          def.set = userDef.set ? bind$1(userDef.set, this) : noop;
	        }
	        Object.defineProperty(this, key, def);
	      }
	    }
	  };

	  function makeComputedGetter(getter, owner) {
	    var watcher = new Watcher(owner, getter, null, {
	      lazy: true
	    });
	    return function computedGetter() {
	      if (watcher.dirty) {
	        watcher.evaluate();
	      }
	      if (Dep.target) {
	        watcher.depend();
	      }
	      return watcher.value;
	    };
	  }

	  /**
	   * Setup instance methods. Methods must be bound to the
	   * instance since they might be passed down as a prop to
	   * child components.
	   */

	  Vue.prototype._initMethods = function () {
	    var methods = this.$options.methods;
	    if (methods) {
	      for (var key in methods) {
	        this[key] = bind$1(methods[key], this);
	      }
	    }
	  };

	  /**
	   * Initialize meta information like $index, $key & $value.
	   */

	  Vue.prototype._initMeta = function () {
	    var metas = this.$options._meta;
	    if (metas) {
	      for (var key in metas) {
	        defineReactive(this, key, metas[key]);
	      }
	    }
	  };
	}

	var eventRE = /^v-on:|^@/;

	function eventsMixin (Vue) {

	  /**
	   * Setup the instance's option events & watchers.
	   * If the value is a string, we pull it from the
	   * instance's methods by name.
	   */

	  Vue.prototype._initEvents = function () {
	    var options = this.$options;
	    if (options._asComponent) {
	      registerComponentEvents(this, options.el);
	    }
	    registerCallbacks(this, '$on', options.events);
	    registerCallbacks(this, '$watch', options.watch);
	  };

	  /**
	   * Register v-on events on a child component
	   *
	   * @param {Vue} vm
	   * @param {Element} el
	   */

	  function registerComponentEvents(vm, el) {
	    var attrs = el.attributes;
	    var name, handler;
	    for (var i = 0, l = attrs.length; i < l; i++) {
	      name = attrs[i].name;
	      if (eventRE.test(name)) {
	        name = name.replace(eventRE, '');
	        handler = (vm._scope || vm._context).$eval(attrs[i].value, true);
	        handler._fromParent = true;
	        vm.$on(name.replace(eventRE), handler);
	      }
	    }
	  }

	  /**
	   * Register callbacks for option events and watchers.
	   *
	   * @param {Vue} vm
	   * @param {String} action
	   * @param {Object} hash
	   */

	  function registerCallbacks(vm, action, hash) {
	    if (!hash) return;
	    var handlers, key, i, j;
	    for (key in hash) {
	      handlers = hash[key];
	      if (isArray(handlers)) {
	        for (i = 0, j = handlers.length; i < j; i++) {
	          register(vm, action, key, handlers[i]);
	        }
	      } else {
	        register(vm, action, key, handlers);
	      }
	    }
	  }

	  /**
	   * Helper to register an event/watch callback.
	   *
	   * @param {Vue} vm
	   * @param {String} action
	   * @param {String} key
	   * @param {Function|String|Object} handler
	   * @param {Object} [options]
	   */

	  function register(vm, action, key, handler, options) {
	    var type = typeof handler;
	    if (type === 'function') {
	      vm[action](key, handler, options);
	    } else if (type === 'string') {
	      var methods = vm.$options.methods;
	      var method = methods && methods[handler];
	      if (method) {
	        vm[action](key, method, options);
	      } else {
	        process.env.NODE_ENV !== 'production' && warn('Unknown method: "' + handler + '" when ' + 'registering callback for ' + action + ': "' + key + '".');
	      }
	    } else if (handler && type === 'object') {
	      register(vm, action, key, handler.handler, handler);
	    }
	  }

	  /**
	   * Setup recursive attached/detached calls
	   */

	  Vue.prototype._initDOMHooks = function () {
	    this.$on('hook:attached', onAttached);
	    this.$on('hook:detached', onDetached);
	  };

	  /**
	   * Callback to recursively call attached hook on children
	   */

	  function onAttached() {
	    if (!this._isAttached) {
	      this._isAttached = true;
	      this.$children.forEach(callAttach);
	    }
	  }

	  /**
	   * Iterator to call attached hook
	   *
	   * @param {Vue} child
	   */

	  function callAttach(child) {
	    if (!child._isAttached && inDoc(child.$el)) {
	      child._callHook('attached');
	    }
	  }

	  /**
	   * Callback to recursively call detached hook on children
	   */

	  function onDetached() {
	    if (this._isAttached) {
	      this._isAttached = false;
	      this.$children.forEach(callDetach);
	    }
	  }

	  /**
	   * Iterator to call detached hook
	   *
	   * @param {Vue} child
	   */

	  function callDetach(child) {
	    if (child._isAttached && !inDoc(child.$el)) {
	      child._callHook('detached');
	    }
	  }

	  /**
	   * Trigger all handlers for a hook
	   *
	   * @param {String} hook
	   */

	  Vue.prototype._callHook = function (hook) {
	    this.$emit('pre-hook:' + hook);
	    var handlers = this.$options[hook];
	    if (handlers) {
	      for (var i = 0, j = handlers.length; i < j; i++) {
	        handlers[i].call(this);
	      }
	    }
	    this.$emit('hook:' + hook);
	  };
	}

	function noop() {}

	/**
	 * A directive links a DOM element with a piece of data,
	 * which is the result of evaluating an expression.
	 * It registers a watcher with the expression and calls
	 * the DOM update function when a change is triggered.
	 *
	 * @param {String} name
	 * @param {Node} el
	 * @param {Vue} vm
	 * @param {Object} descriptor
	 *                 - {String} name
	 *                 - {Object} def
	 *                 - {String} expression
	 *                 - {Array<Object>} [filters]
	 *                 - {Boolean} literal
	 *                 - {String} attr
	 *                 - {String} raw
	 * @param {Object} def - directive definition object
	 * @param {Vue} [host] - transclusion host component
	 * @param {Object} [scope] - v-for scope
	 * @param {Fragment} [frag] - owner fragment
	 * @constructor
	 */
	function Directive(descriptor, vm, el, host, scope, frag) {
	  this.vm = vm;
	  this.el = el;
	  // copy descriptor properties
	  this.descriptor = descriptor;
	  this.name = descriptor.name;
	  this.expression = descriptor.expression;
	  this.arg = descriptor.arg;
	  this.modifiers = descriptor.modifiers;
	  this.filters = descriptor.filters;
	  this.literal = this.modifiers && this.modifiers.literal;
	  // private
	  this._locked = false;
	  this._bound = false;
	  this._listeners = null;
	  // link context
	  this._host = host;
	  this._scope = scope;
	  this._frag = frag;
	  // store directives on node in dev mode
	  if (process.env.NODE_ENV !== 'production' && this.el) {
	    this.el._vue_directives = this.el._vue_directives || [];
	    this.el._vue_directives.push(this);
	  }
	}

	/**
	 * Initialize the directive, mixin definition properties,
	 * setup the watcher, call definition bind() and update()
	 * if present.
	 *
	 * @param {Object} def
	 */

	Directive.prototype._bind = function () {
	  var name = this.name;
	  var descriptor = this.descriptor;

	  // remove attribute
	  if ((name !== 'cloak' || this.vm._isCompiled) && this.el && this.el.removeAttribute) {
	    var attr = descriptor.attr || 'v-' + name;
	    this.el.removeAttribute(attr);
	  }

	  // copy def properties
	  var def = descriptor.def;
	  if (typeof def === 'function') {
	    this.update = def;
	  } else {
	    extend(this, def);
	  }

	  // setup directive params
	  this._setupParams();

	  // initial bind
	  if (this.bind) {
	    this.bind();
	  }
	  this._bound = true;

	  if (this.literal) {
	    this.update && this.update(descriptor.raw);
	  } else if ((this.expression || this.modifiers) && (this.update || this.twoWay) && !this._checkStatement()) {
	    // wrapped updater for context
	    var dir = this;
	    if (this.update) {
	      this._update = function (val, oldVal) {
	        if (!dir._locked) {
	          dir.update(val, oldVal);
	        }
	      };
	    } else {
	      this._update = noop;
	    }
	    var preProcess = this._preProcess ? bind$1(this._preProcess, this) : null;
	    var postProcess = this._postProcess ? bind$1(this._postProcess, this) : null;
	    var watcher = this._watcher = new Watcher(this.vm, this.expression, this._update, // callback
	    {
	      filters: this.filters,
	      twoWay: this.twoWay,
	      deep: this.deep,
	      preProcess: preProcess,
	      postProcess: postProcess,
	      scope: this._scope
	    });
	    // v-model with inital inline value need to sync back to
	    // model instead of update to DOM on init. They would
	    // set the afterBind hook to indicate that.
	    if (this.afterBind) {
	      this.afterBind();
	    } else if (this.update) {
	      this.update(watcher.value);
	    }
	  }
	};

	/**
	 * Setup all param attributes, e.g. track-by,
	 * transition-mode, etc...
	 */

	Directive.prototype._setupParams = function () {
	  if (!this.params) {
	    return;
	  }
	  var params = this.params;
	  // swap the params array with a fresh object.
	  this.params = Object.create(null);
	  var i = params.length;
	  var key, val, mappedKey;
	  while (i--) {
	    key = params[i];
	    mappedKey = camelize(key);
	    val = getBindAttr(this.el, key);
	    if (val != null) {
	      // dynamic
	      this._setupParamWatcher(mappedKey, val);
	    } else {
	      // static
	      val = getAttr(this.el, key);
	      if (val != null) {
	        this.params[mappedKey] = val === '' ? true : val;
	      }
	    }
	  }
	};

	/**
	 * Setup a watcher for a dynamic param.
	 *
	 * @param {String} key
	 * @param {String} expression
	 */

	Directive.prototype._setupParamWatcher = function (key, expression) {
	  var self = this;
	  var called = false;
	  var unwatch = (this._scope || this.vm).$watch(expression, function (val, oldVal) {
	    self.params[key] = val;
	    // since we are in immediate mode,
	    // only call the param change callbacks if this is not the first update.
	    if (called) {
	      var cb = self.paramWatchers && self.paramWatchers[key];
	      if (cb) {
	        cb.call(self, val, oldVal);
	      }
	    } else {
	      called = true;
	    }
	  }, {
	    immediate: true,
	    user: false
	  });(this._paramUnwatchFns || (this._paramUnwatchFns = [])).push(unwatch);
	};

	/**
	 * Check if the directive is a function caller
	 * and if the expression is a callable one. If both true,
	 * we wrap up the expression and use it as the event
	 * handler.
	 *
	 * e.g. on-click="a++"
	 *
	 * @return {Boolean}
	 */

	Directive.prototype._checkStatement = function () {
	  var expression = this.expression;
	  if (expression && this.acceptStatement && !isSimplePath(expression)) {
	    var fn = parseExpression(expression).get;
	    var scope = this._scope || this.vm;
	    var handler = function handler(e) {
	      scope.$event = e;
	      fn.call(scope, scope);
	      scope.$event = null;
	    };
	    if (this.filters) {
	      handler = scope._applyFilters(handler, null, this.filters);
	    }
	    this.update(handler);
	    return true;
	  }
	};

	/**
	 * Set the corresponding value with the setter.
	 * This should only be used in two-way directives
	 * e.g. v-model.
	 *
	 * @param {*} value
	 * @public
	 */

	Directive.prototype.set = function (value) {
	  /* istanbul ignore else */
	  if (this.twoWay) {
	    this._withLock(function () {
	      this._watcher.set(value);
	    });
	  } else if (process.env.NODE_ENV !== 'production') {
	    warn('Directive.set() can only be used inside twoWay' + 'directives.');
	  }
	};

	/**
	 * Execute a function while preventing that function from
	 * triggering updates on this directive instance.
	 *
	 * @param {Function} fn
	 */

	Directive.prototype._withLock = function (fn) {
	  var self = this;
	  self._locked = true;
	  fn.call(self);
	  nextTick(function () {
	    self._locked = false;
	  });
	};

	/**
	 * Convenience method that attaches a DOM event listener
	 * to the directive element and autometically tears it down
	 * during unbind.
	 *
	 * @param {String} event
	 * @param {Function} handler
	 * @param {Boolean} [useCapture]
	 */

	Directive.prototype.on = function (event, handler, useCapture) {
	  on$1(this.el, event, handler, useCapture);(this._listeners || (this._listeners = [])).push([event, handler]);
	};

	/**
	 * Teardown the watcher and call unbind.
	 */

	Directive.prototype._teardown = function () {
	  if (this._bound) {
	    this._bound = false;
	    if (this.unbind) {
	      this.unbind();
	    }
	    if (this._watcher) {
	      this._watcher.teardown();
	    }
	    var listeners = this._listeners;
	    var i;
	    if (listeners) {
	      i = listeners.length;
	      while (i--) {
	        off(this.el, listeners[i][0], listeners[i][1]);
	      }
	    }
	    var unwatchFns = this._paramUnwatchFns;
	    if (unwatchFns) {
	      i = unwatchFns.length;
	      while (i--) {
	        unwatchFns[i]();
	      }
	    }
	    if (process.env.NODE_ENV !== 'production' && this.el) {
	      this.el._vue_directives.$remove(this);
	    }
	    this.vm = this.el = this._watcher = this._listeners = null;
	  }
	};

	function lifecycleMixin (Vue) {

	  /**
	   * Update v-ref for component.
	   *
	   * @param {Boolean} remove
	   */

	  Vue.prototype._updateRef = function (remove) {
	    var ref = this.$options._ref;
	    if (ref) {
	      var refs = (this._scope || this._context).$refs;
	      if (remove) {
	        if (refs[ref] === this) {
	          refs[ref] = null;
	        }
	      } else {
	        refs[ref] = this;
	      }
	    }
	  };

	  /**
	   * Transclude, compile and link element.
	   *
	   * If a pre-compiled linker is available, that means the
	   * passed in element will be pre-transcluded and compiled
	   * as well - all we need to do is to call the linker.
	   *
	   * Otherwise we need to call transclude/compile/link here.
	   *
	   * @param {Element} el
	   */

	  Vue.prototype._compile = function (el) {
	    var options = this.$options;

	    // transclude and init element
	    // transclude can potentially replace original
	    // so we need to keep reference; this step also injects
	    // the template and caches the original attributes
	    // on the container node and replacer node.
	    var original = el;
	    el = transclude(el, options);
	    this._initElement(el);

	    // handle v-pre on root node (#2026)
	    if (el.nodeType === 1 && getAttr(el, 'v-pre') !== null) {
	      return;
	    }

	    // root is always compiled per-instance, because
	    // container attrs and props can be different every time.
	    var contextOptions = this._context && this._context.$options;
	    var rootLinker = compileRoot(el, options, contextOptions);

	    // compile and link the rest
	    var contentLinkFn;
	    var ctor = this.constructor;
	    // component compilation can be cached
	    // as long as it's not using inline-template
	    if (options._linkerCachable) {
	      contentLinkFn = ctor.linker;
	      if (!contentLinkFn) {
	        contentLinkFn = ctor.linker = compile(el, options);
	      }
	    }

	    // link phase
	    // make sure to link root with prop scope!
	    var rootUnlinkFn = rootLinker(this, el, this._scope);
	    var contentUnlinkFn = contentLinkFn ? contentLinkFn(this, el) : compile(el, options)(this, el);

	    // register composite unlink function
	    // to be called during instance destruction
	    this._unlinkFn = function () {
	      rootUnlinkFn();
	      // passing destroying: true to avoid searching and
	      // splicing the directives
	      contentUnlinkFn(true);
	    };

	    // finally replace original
	    if (options.replace) {
	      replace(original, el);
	    }

	    this._isCompiled = true;
	    this._callHook('compiled');
	  };

	  /**
	   * Initialize instance element. Called in the public
	   * $mount() method.
	   *
	   * @param {Element} el
	   */

	  Vue.prototype._initElement = function (el) {
	    if (el instanceof DocumentFragment) {
	      this._isFragment = true;
	      this.$el = this._fragmentStart = el.firstChild;
	      this._fragmentEnd = el.lastChild;
	      // set persisted text anchors to empty
	      if (this._fragmentStart.nodeType === 3) {
	        this._fragmentStart.data = this._fragmentEnd.data = '';
	      }
	      this._fragment = el;
	    } else {
	      this.$el = el;
	    }
	    this.$el.__vue__ = this;
	    this._callHook('beforeCompile');
	  };

	  /**
	   * Create and bind a directive to an element.
	   *
	   * @param {String} name - directive name
	   * @param {Node} node   - target node
	   * @param {Object} desc - parsed directive descriptor
	   * @param {Object} def  - directive definition object
	   * @param {Vue} [host] - transclusion host component
	   * @param {Object} [scope] - v-for scope
	   * @param {Fragment} [frag] - owner fragment
	   */

	  Vue.prototype._bindDir = function (descriptor, node, host, scope, frag) {
	    this._directives.push(new Directive(descriptor, this, node, host, scope, frag));
	  };

	  /**
	   * Teardown an instance, unobserves the data, unbind all the
	   * directives, turn off all the event listeners, etc.
	   *
	   * @param {Boolean} remove - whether to remove the DOM node.
	   * @param {Boolean} deferCleanup - if true, defer cleanup to
	   *                                 be called later
	   */

	  Vue.prototype._destroy = function (remove, deferCleanup) {
	    if (this._isBeingDestroyed) {
	      if (!deferCleanup) {
	        this._cleanup();
	      }
	      return;
	    }

	    var destroyReady;
	    var pendingRemoval;

	    var self = this;
	    // Cleanup should be called either synchronously or asynchronoysly as
	    // callback of this.$remove(), or if remove and deferCleanup are false.
	    // In any case it should be called after all other removing, unbinding and
	    // turning of is done
	    var cleanupIfPossible = function cleanupIfPossible() {
	      if (destroyReady && !pendingRemoval && !deferCleanup) {
	        self._cleanup();
	      }
	    };

	    // remove DOM element
	    if (remove && this.$el) {
	      pendingRemoval = true;
	      this.$remove(function () {
	        pendingRemoval = false;
	        cleanupIfPossible();
	      });
	    }

	    this._callHook('beforeDestroy');
	    this._isBeingDestroyed = true;
	    var i;
	    // remove self from parent. only necessary
	    // if parent is not being destroyed as well.
	    var parent = this.$parent;
	    if (parent && !parent._isBeingDestroyed) {
	      parent.$children.$remove(this);
	      // unregister ref (remove: true)
	      this._updateRef(true);
	    }
	    // destroy all children.
	    i = this.$children.length;
	    while (i--) {
	      this.$children[i].$destroy();
	    }
	    // teardown props
	    if (this._propsUnlinkFn) {
	      this._propsUnlinkFn();
	    }
	    // teardown all directives. this also tearsdown all
	    // directive-owned watchers.
	    if (this._unlinkFn) {
	      this._unlinkFn();
	    }
	    i = this._watchers.length;
	    while (i--) {
	      this._watchers[i].teardown();
	    }
	    // remove reference to self on $el
	    if (this.$el) {
	      this.$el.__vue__ = null;
	    }

	    destroyReady = true;
	    cleanupIfPossible();
	  };

	  /**
	   * Clean up to ensure garbage collection.
	   * This is called after the leave transition if there
	   * is any.
	   */

	  Vue.prototype._cleanup = function () {
	    if (this._isDestroyed) {
	      return;
	    }
	    // remove self from owner fragment
	    // do it in cleanup so that we can call $destroy with
	    // defer right when a fragment is about to be removed.
	    if (this._frag) {
	      this._frag.children.$remove(this);
	    }
	    // remove reference from data ob
	    // frozen object may not have observer.
	    if (this._data.__ob__) {
	      this._data.__ob__.removeVm(this);
	    }
	    // Clean up references to private properties and other
	    // instances. preserve reference to _data so that proxy
	    // accessors still work. The only potential side effect
	    // here is that mutating the instance after it's destroyed
	    // may affect the state of other components that are still
	    // observing the same object, but that seems to be a
	    // reasonable responsibility for the user rather than
	    // always throwing an error on them.
	    this.$el = this.$parent = this.$root = this.$children = this._watchers = this._context = this._scope = this._directives = null;
	    // call the last hook...
	    this._isDestroyed = true;
	    this._callHook('destroyed');
	    // turn off all instance listeners.
	    this.$off();
	  };
	}

	function miscMixin (Vue) {

	  /**
	   * Apply a list of filter (descriptors) to a value.
	   * Using plain for loops here because this will be called in
	   * the getter of any watcher with filters so it is very
	   * performance sensitive.
	   *
	   * @param {*} value
	   * @param {*} [oldValue]
	   * @param {Array} filters
	   * @param {Boolean} write
	   * @return {*}
	   */

	  Vue.prototype._applyFilters = function (value, oldValue, filters, write) {
	    var filter, fn, args, arg, offset, i, l, j, k;
	    for (i = 0, l = filters.length; i < l; i++) {
	      filter = filters[i];
	      fn = resolveAsset(this.$options, 'filters', filter.name);
	      if (process.env.NODE_ENV !== 'production') {
	        assertAsset(fn, 'filter', filter.name);
	      }
	      if (!fn) continue;
	      fn = write ? fn.write : fn.read || fn;
	      if (typeof fn !== 'function') continue;
	      args = write ? [value, oldValue] : [value];
	      offset = write ? 2 : 1;
	      if (filter.args) {
	        for (j = 0, k = filter.args.length; j < k; j++) {
	          arg = filter.args[j];
	          args[j + offset] = arg.dynamic ? this.$get(arg.value) : arg.value;
	        }
	      }
	      value = fn.apply(this, args);
	    }
	    return value;
	  };

	  /**
	   * Resolve a component, depending on whether the component
	   * is defined normally or using an async factory function.
	   * Resolves synchronously if already resolved, otherwise
	   * resolves asynchronously and caches the resolved
	   * constructor on the factory.
	   *
	   * @param {String} id
	   * @param {Function} cb
	   */

	  Vue.prototype._resolveComponent = function (id, cb) {
	    var factory = resolveAsset(this.$options, 'components', id);
	    if (process.env.NODE_ENV !== 'production') {
	      assertAsset(factory, 'component', id);
	    }
	    if (!factory) {
	      return;
	    }
	    // async component factory
	    if (!factory.options) {
	      if (factory.resolved) {
	        // cached
	        cb(factory.resolved);
	      } else if (factory.requested) {
	        // pool callbacks
	        factory.pendingCallbacks.push(cb);
	      } else {
	        factory.requested = true;
	        var cbs = factory.pendingCallbacks = [cb];
	        factory(function resolve(res) {
	          if (isPlainObject(res)) {
	            res = Vue.extend(res);
	          }
	          // cache resolved
	          factory.resolved = res;
	          // invoke callbacks
	          for (var i = 0, l = cbs.length; i < l; i++) {
	            cbs[i](res);
	          }
	        }, function reject(reason) {
	          process.env.NODE_ENV !== 'production' && warn('Failed to resolve async component: ' + id + '. ' + (reason ? '\nReason: ' + reason : ''));
	        });
	      }
	    } else {
	      // normal component
	      cb(factory);
	    }
	  };
	}

	function globalAPI (Vue) {

	  /**
	   * Expose useful internals
	   */

	  Vue.util = util;
	  Vue.config = config;
	  Vue.set = set;
	  Vue['delete'] = del;
	  Vue.nextTick = nextTick;

	  /**
	   * The following are exposed for advanced usage / plugins
	   */

	  Vue.compiler = compiler;
	  Vue.FragmentFactory = FragmentFactory;
	  Vue.internalDirectives = internalDirectives;
	  Vue.parsers = {
	    path: path,
	    text: text$1,
	    template: template,
	    directive: directive,
	    expression: expression
	  };

	  /**
	   * Each instance constructor, including Vue, has a unique
	   * cid. This enables us to create wrapped "child
	   * constructors" for prototypal inheritance and cache them.
	   */

	  Vue.cid = 0;
	  var cid = 1;

	  /**
	   * Class inheritance
	   *
	   * @param {Object} extendOptions
	   */

	  Vue.extend = function (extendOptions) {
	    extendOptions = extendOptions || {};
	    var Super = this;
	    var isFirstExtend = Super.cid === 0;
	    if (isFirstExtend && extendOptions._Ctor) {
	      return extendOptions._Ctor;
	    }
	    var name = extendOptions.name || Super.options.name;
	    if (process.env.NODE_ENV !== 'production') {
	      if (!/^[a-zA-Z][\w-]*$/.test(name)) {
	        warn('Invalid component name: "' + name + '". Component names ' + 'can only contain alphanumeric characaters and the hyphen.');
	        name = null;
	      }
	    }
	    var Sub = createClass(name || 'VueComponent');
	    Sub.prototype = Object.create(Super.prototype);
	    Sub.prototype.constructor = Sub;
	    Sub.cid = cid++;
	    Sub.options = mergeOptions(Super.options, extendOptions);
	    Sub['super'] = Super;
	    // allow further extension
	    Sub.extend = Super.extend;
	    // create asset registers, so extended classes
	    // can have their private assets too.
	    config._assetTypes.forEach(function (type) {
	      Sub[type] = Super[type];
	    });
	    // enable recursive self-lookup
	    if (name) {
	      Sub.options.components[name] = Sub;
	    }
	    // cache constructor
	    if (isFirstExtend) {
	      extendOptions._Ctor = Sub;
	    }
	    return Sub;
	  };

	  /**
	   * A function that returns a sub-class constructor with the
	   * given name. This gives us much nicer output when
	   * logging instances in the console.
	   *
	   * @param {String} name
	   * @return {Function}
	   */

	  function createClass(name) {
	    return new Function('return function ' + classify(name) + ' (options) { this._init(options) }')();
	  }

	  /**
	   * Plugin system
	   *
	   * @param {Object} plugin
	   */

	  Vue.use = function (plugin) {
	    /* istanbul ignore if */
	    if (plugin.installed) {
	      return;
	    }
	    // additional parameters
	    var args = toArray(arguments, 1);
	    args.unshift(this);
	    if (typeof plugin.install === 'function') {
	      plugin.install.apply(plugin, args);
	    } else {
	      plugin.apply(null, args);
	    }
	    plugin.installed = true;
	    return this;
	  };

	  /**
	   * Apply a global mixin by merging it into the default
	   * options.
	   */

	  Vue.mixin = function (mixin) {
	    Vue.options = mergeOptions(Vue.options, mixin);
	  };

	  /**
	   * Create asset registration methods with the following
	   * signature:
	   *
	   * @param {String} id
	   * @param {*} definition
	   */

	  config._assetTypes.forEach(function (type) {
	    Vue[type] = function (id, definition) {
	      if (!definition) {
	        return this.options[type + 's'][id];
	      } else {
	        /* istanbul ignore if */
	        if (process.env.NODE_ENV !== 'production') {
	          if (type === 'component' && (commonTagRE.test(id) || reservedTagRE.test(id))) {
	            warn('Do not use built-in or reserved HTML elements as component ' + 'id: ' + id);
	          }
	        }
	        if (type === 'component' && isPlainObject(definition)) {
	          definition.name = id;
	          definition = Vue.extend(definition);
	        }
	        this.options[type + 's'][id] = definition;
	        return definition;
	      }
	    };
	  });
	}

	var filterRE = /[^|]\|[^|]/;

	function dataAPI (Vue) {

	  /**
	   * Get the value from an expression on this vm.
	   *
	   * @param {String} exp
	   * @param {Boolean} [asStatement]
	   * @return {*}
	   */

	  Vue.prototype.$get = function (exp, asStatement) {
	    var res = parseExpression(exp);
	    if (res) {
	      if (asStatement && !isSimplePath(exp)) {
	        var self = this;
	        return function statementHandler() {
	          self.$arguments = toArray(arguments);
	          var result = res.get.call(self, self);
	          self.$arguments = null;
	          return result;
	        };
	      } else {
	        try {
	          return res.get.call(this, this);
	        } catch (e) {}
	      }
	    }
	  };

	  /**
	   * Set the value from an expression on this vm.
	   * The expression must be a valid left-hand
	   * expression in an assignment.
	   *
	   * @param {String} exp
	   * @param {*} val
	   */

	  Vue.prototype.$set = function (exp, val) {
	    var res = parseExpression(exp, true);
	    if (res && res.set) {
	      res.set.call(this, this, val);
	    }
	  };

	  /**
	   * Delete a property on the VM
	   *
	   * @param {String} key
	   */

	  Vue.prototype.$delete = function (key) {
	    del(this._data, key);
	  };

	  /**
	   * Watch an expression, trigger callback when its
	   * value changes.
	   *
	   * @param {String|Function} expOrFn
	   * @param {Function} cb
	   * @param {Object} [options]
	   *                 - {Boolean} deep
	   *                 - {Boolean} immediate
	   * @return {Function} - unwatchFn
	   */

	  Vue.prototype.$watch = function (expOrFn, cb, options) {
	    var vm = this;
	    var parsed;
	    if (typeof expOrFn === 'string') {
	      parsed = parseDirective(expOrFn);
	      expOrFn = parsed.expression;
	    }
	    var watcher = new Watcher(vm, expOrFn, cb, {
	      deep: options && options.deep,
	      sync: options && options.sync,
	      filters: parsed && parsed.filters,
	      user: !options || options.user !== false
	    });
	    if (options && options.immediate) {
	      cb.call(vm, watcher.value);
	    }
	    return function unwatchFn() {
	      watcher.teardown();
	    };
	  };

	  /**
	   * Evaluate a text directive, including filters.
	   *
	   * @param {String} text
	   * @param {Boolean} [asStatement]
	   * @return {String}
	   */

	  Vue.prototype.$eval = function (text, asStatement) {
	    // check for filters.
	    if (filterRE.test(text)) {
	      var dir = parseDirective(text);
	      // the filter regex check might give false positive
	      // for pipes inside strings, so it's possible that
	      // we don't get any filters here
	      var val = this.$get(dir.expression, asStatement);
	      return dir.filters ? this._applyFilters(val, null, dir.filters) : val;
	    } else {
	      // no filter
	      return this.$get(text, asStatement);
	    }
	  };

	  /**
	   * Interpolate a piece of template text.
	   *
	   * @param {String} text
	   * @return {String}
	   */

	  Vue.prototype.$interpolate = function (text) {
	    var tokens = parseText(text);
	    var vm = this;
	    if (tokens) {
	      if (tokens.length === 1) {
	        return vm.$eval(tokens[0].value) + '';
	      } else {
	        return tokens.map(function (token) {
	          return token.tag ? vm.$eval(token.value) : token.value;
	        }).join('');
	      }
	    } else {
	      return text;
	    }
	  };

	  /**
	   * Log instance data as a plain JS object
	   * so that it is easier to inspect in console.
	   * This method assumes console is available.
	   *
	   * @param {String} [path]
	   */

	  Vue.prototype.$log = function (path) {
	    var data = path ? getPath(this._data, path) : this._data;
	    if (data) {
	      data = clean(data);
	    }
	    // include computed fields
	    if (!path) {
	      for (var key in this.$options.computed) {
	        data[key] = clean(this[key]);
	      }
	    }
	    console.log(data);
	  };

	  /**
	   * "clean" a getter/setter converted object into a plain
	   * object copy.
	   *
	   * @param {Object} - obj
	   * @return {Object}
	   */

	  function clean(obj) {
	    return JSON.parse(JSON.stringify(obj));
	  }
	}

	function domAPI (Vue) {

	  /**
	   * Convenience on-instance nextTick. The callback is
	   * auto-bound to the instance, and this avoids component
	   * modules having to rely on the global Vue.
	   *
	   * @param {Function} fn
	   */

	  Vue.prototype.$nextTick = function (fn) {
	    nextTick(fn, this);
	  };

	  /**
	   * Append instance to target
	   *
	   * @param {Node} target
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition] - defaults to true
	   */

	  Vue.prototype.$appendTo = function (target, cb, withTransition) {
	    return insert(this, target, cb, withTransition, append, appendWithTransition);
	  };

	  /**
	   * Prepend instance to target
	   *
	   * @param {Node} target
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition] - defaults to true
	   */

	  Vue.prototype.$prependTo = function (target, cb, withTransition) {
	    target = query(target);
	    if (target.hasChildNodes()) {
	      this.$before(target.firstChild, cb, withTransition);
	    } else {
	      this.$appendTo(target, cb, withTransition);
	    }
	    return this;
	  };

	  /**
	   * Insert instance before target
	   *
	   * @param {Node} target
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition] - defaults to true
	   */

	  Vue.prototype.$before = function (target, cb, withTransition) {
	    return insert(this, target, cb, withTransition, beforeWithCb, beforeWithTransition);
	  };

	  /**
	   * Insert instance after target
	   *
	   * @param {Node} target
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition] - defaults to true
	   */

	  Vue.prototype.$after = function (target, cb, withTransition) {
	    target = query(target);
	    if (target.nextSibling) {
	      this.$before(target.nextSibling, cb, withTransition);
	    } else {
	      this.$appendTo(target.parentNode, cb, withTransition);
	    }
	    return this;
	  };

	  /**
	   * Remove instance from DOM
	   *
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition] - defaults to true
	   */

	  Vue.prototype.$remove = function (cb, withTransition) {
	    if (!this.$el.parentNode) {
	      return cb && cb();
	    }
	    var inDocument = this._isAttached && inDoc(this.$el);
	    // if we are not in document, no need to check
	    // for transitions
	    if (!inDocument) withTransition = false;
	    var self = this;
	    var realCb = function realCb() {
	      if (inDocument) self._callHook('detached');
	      if (cb) cb();
	    };
	    if (this._isFragment) {
	      removeNodeRange(this._fragmentStart, this._fragmentEnd, this, this._fragment, realCb);
	    } else {
	      var op = withTransition === false ? removeWithCb : removeWithTransition;
	      op(this.$el, this, realCb);
	    }
	    return this;
	  };

	  /**
	   * Shared DOM insertion function.
	   *
	   * @param {Vue} vm
	   * @param {Element} target
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition]
	   * @param {Function} op1 - op for non-transition insert
	   * @param {Function} op2 - op for transition insert
	   * @return vm
	   */

	  function insert(vm, target, cb, withTransition, op1, op2) {
	    target = query(target);
	    var targetIsDetached = !inDoc(target);
	    var op = withTransition === false || targetIsDetached ? op1 : op2;
	    var shouldCallHook = !targetIsDetached && !vm._isAttached && !inDoc(vm.$el);
	    if (vm._isFragment) {
	      mapNodeRange(vm._fragmentStart, vm._fragmentEnd, function (node) {
	        op(node, target, vm);
	      });
	      cb && cb();
	    } else {
	      op(vm.$el, target, vm, cb);
	    }
	    if (shouldCallHook) {
	      vm._callHook('attached');
	    }
	    return vm;
	  }

	  /**
	   * Check for selectors
	   *
	   * @param {String|Element} el
	   */

	  function query(el) {
	    return typeof el === 'string' ? document.querySelector(el) : el;
	  }

	  /**
	   * Append operation that takes a callback.
	   *
	   * @param {Node} el
	   * @param {Node} target
	   * @param {Vue} vm - unused
	   * @param {Function} [cb]
	   */

	  function append(el, target, vm, cb) {
	    target.appendChild(el);
	    if (cb) cb();
	  }

	  /**
	   * InsertBefore operation that takes a callback.
	   *
	   * @param {Node} el
	   * @param {Node} target
	   * @param {Vue} vm - unused
	   * @param {Function} [cb]
	   */

	  function beforeWithCb(el, target, vm, cb) {
	    before(el, target);
	    if (cb) cb();
	  }

	  /**
	   * Remove operation that takes a callback.
	   *
	   * @param {Node} el
	   * @param {Vue} vm - unused
	   * @param {Function} [cb]
	   */

	  function removeWithCb(el, vm, cb) {
	    remove(el);
	    if (cb) cb();
	  }
	}

	function eventsAPI (Vue) {

	  /**
	   * Listen on the given `event` with `fn`.
	   *
	   * @param {String} event
	   * @param {Function} fn
	   */

	  Vue.prototype.$on = function (event, fn) {
	    (this._events[event] || (this._events[event] = [])).push(fn);
	    modifyListenerCount(this, event, 1);
	    return this;
	  };

	  /**
	   * Adds an `event` listener that will be invoked a single
	   * time then automatically removed.
	   *
	   * @param {String} event
	   * @param {Function} fn
	   */

	  Vue.prototype.$once = function (event, fn) {
	    var self = this;
	    function on() {
	      self.$off(event, on);
	      fn.apply(this, arguments);
	    }
	    on.fn = fn;
	    this.$on(event, on);
	    return this;
	  };

	  /**
	   * Remove the given callback for `event` or all
	   * registered callbacks.
	   *
	   * @param {String} event
	   * @param {Function} fn
	   */

	  Vue.prototype.$off = function (event, fn) {
	    var cbs;
	    // all
	    if (!arguments.length) {
	      if (this.$parent) {
	        for (event in this._events) {
	          cbs = this._events[event];
	          if (cbs) {
	            modifyListenerCount(this, event, -cbs.length);
	          }
	        }
	      }
	      this._events = {};
	      return this;
	    }
	    // specific event
	    cbs = this._events[event];
	    if (!cbs) {
	      return this;
	    }
	    if (arguments.length === 1) {
	      modifyListenerCount(this, event, -cbs.length);
	      this._events[event] = null;
	      return this;
	    }
	    // specific handler
	    var cb;
	    var i = cbs.length;
	    while (i--) {
	      cb = cbs[i];
	      if (cb === fn || cb.fn === fn) {
	        modifyListenerCount(this, event, -1);
	        cbs.splice(i, 1);
	        break;
	      }
	    }
	    return this;
	  };

	  /**
	   * Trigger an event on self.
	   *
	   * @param {String|Object} event
	   * @return {Boolean} shouldPropagate
	   */

	  Vue.prototype.$emit = function (event) {
	    var isSource = typeof event === 'string';
	    event = isSource ? event : event.name;
	    var cbs = this._events[event];
	    var shouldPropagate = isSource || !cbs;
	    if (cbs) {
	      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
	      // this is a somewhat hacky solution to the question raised
	      // in #2102: for an inline component listener like <comp @test="doThis">,
	      // the propagation handling is somewhat broken. Therefore we
	      // need to treat these inline callbacks differently.
	      var hasParentCbs = isSource && cbs.some(function (cb) {
	        return cb._fromParent;
	      });
	      if (hasParentCbs) {
	        shouldPropagate = false;
	      }
	      var args = toArray(arguments, 1);
	      for (var i = 0, l = cbs.length; i < l; i++) {
	        var cb = cbs[i];
	        var res = cb.apply(this, args);
	        if (res === true && (!hasParentCbs || cb._fromParent)) {
	          shouldPropagate = true;
	        }
	      }
	    }
	    return shouldPropagate;
	  };

	  /**
	   * Recursively broadcast an event to all children instances.
	   *
	   * @param {String|Object} event
	   * @param {...*} additional arguments
	   */

	  Vue.prototype.$broadcast = function (event) {
	    var isSource = typeof event === 'string';
	    event = isSource ? event : event.name;
	    // if no child has registered for this event,
	    // then there's no need to broadcast.
	    if (!this._eventsCount[event]) return;
	    var children = this.$children;
	    var args = toArray(arguments);
	    if (isSource) {
	      // use object event to indicate non-source emit
	      // on children
	      args[0] = { name: event, source: this };
	    }
	    for (var i = 0, l = children.length; i < l; i++) {
	      var child = children[i];
	      var shouldPropagate = child.$emit.apply(child, args);
	      if (shouldPropagate) {
	        child.$broadcast.apply(child, args);
	      }
	    }
	    return this;
	  };

	  /**
	   * Recursively propagate an event up the parent chain.
	   *
	   * @param {String} event
	   * @param {...*} additional arguments
	   */

	  Vue.prototype.$dispatch = function (event) {
	    var shouldPropagate = this.$emit.apply(this, arguments);
	    if (!shouldPropagate) return;
	    var parent = this.$parent;
	    var args = toArray(arguments);
	    // use object event to indicate non-source emit
	    // on parents
	    args[0] = { name: event, source: this };
	    while (parent) {
	      shouldPropagate = parent.$emit.apply(parent, args);
	      parent = shouldPropagate ? parent.$parent : null;
	    }
	    return this;
	  };

	  /**
	   * Modify the listener counts on all parents.
	   * This bookkeeping allows $broadcast to return early when
	   * no child has listened to a certain event.
	   *
	   * @param {Vue} vm
	   * @param {String} event
	   * @param {Number} count
	   */

	  var hookRE = /^hook:/;
	  function modifyListenerCount(vm, event, count) {
	    var parent = vm.$parent;
	    // hooks do not get broadcasted so no need
	    // to do bookkeeping for them
	    if (!parent || !count || hookRE.test(event)) return;
	    while (parent) {
	      parent._eventsCount[event] = (parent._eventsCount[event] || 0) + count;
	      parent = parent.$parent;
	    }
	  }
	}

	function lifecycleAPI (Vue) {

	  /**
	   * Set instance target element and kick off the compilation
	   * process. The passed in `el` can be a selector string, an
	   * existing Element, or a DocumentFragment (for block
	   * instances).
	   *
	   * @param {Element|DocumentFragment|string} el
	   * @public
	   */

	  Vue.prototype.$mount = function (el) {
	    if (this._isCompiled) {
	      process.env.NODE_ENV !== 'production' && warn('$mount() should be called only once.');
	      return;
	    }
	    el = query(el);
	    if (!el) {
	      el = document.createElement('div');
	    }
	    this._compile(el);
	    this._initDOMHooks();
	    if (inDoc(this.$el)) {
	      this._callHook('attached');
	      ready.call(this);
	    } else {
	      this.$once('hook:attached', ready);
	    }
	    return this;
	  };

	  /**
	   * Mark an instance as ready.
	   */

	  function ready() {
	    this._isAttached = true;
	    this._isReady = true;
	    this._callHook('ready');
	  }

	  /**
	   * Teardown the instance, simply delegate to the internal
	   * _destroy.
	   */

	  Vue.prototype.$destroy = function (remove, deferCleanup) {
	    this._destroy(remove, deferCleanup);
	  };

	  /**
	   * Partially compile a piece of DOM and return a
	   * decompile function.
	   *
	   * @param {Element|DocumentFragment} el
	   * @param {Vue} [host]
	   * @return {Function}
	   */

	  Vue.prototype.$compile = function (el, host, scope, frag) {
	    return compile(el, this.$options, true)(this, el, host, scope, frag);
	  };
	}

	/**
	 * The exposed Vue constructor.
	 *
	 * API conventions:
	 * - public API methods/properties are prefixed with `$`
	 * - internal methods/properties are prefixed with `_`
	 * - non-prefixed properties are assumed to be proxied user
	 *   data.
	 *
	 * @constructor
	 * @param {Object} [options]
	 * @public
	 */

	function Vue(options) {
	  this._init(options);
	}

	// install internals
	initMixin(Vue);
	stateMixin(Vue);
	eventsMixin(Vue);
	lifecycleMixin(Vue);
	miscMixin(Vue);

	// install APIs
	globalAPI(Vue);
	dataAPI(Vue);
	domAPI(Vue);
	eventsAPI(Vue);
	lifecycleAPI(Vue);

	var convertArray = vFor._postProcess;

	/**
	 * Limit filter for arrays
	 *
	 * @param {Number} n
	 * @param {Number} offset (Decimal expected)
	 */

	function limitBy(arr, n, offset) {
	  offset = offset ? parseInt(offset, 10) : 0;
	  n = toNumber(n);
	  return typeof n === 'number' ? arr.slice(offset, offset + n) : arr;
	}

	/**
	 * Filter filter for arrays
	 *
	 * @param {String} search
	 * @param {String} [delimiter]
	 * @param {String} ...dataKeys
	 */

	function filterBy(arr, search, delimiter) {
	  arr = convertArray(arr);
	  if (search == null) {
	    return arr;
	  }
	  if (typeof search === 'function') {
	    return arr.filter(search);
	  }
	  // cast to lowercase string
	  search = ('' + search).toLowerCase();
	  // allow optional `in` delimiter
	  // because why not
	  var n = delimiter === 'in' ? 3 : 2;
	  // extract and flatten keys
	  var keys = toArray(arguments, n).reduce(function (prev, cur) {
	    return prev.concat(cur);
	  }, []);
	  var res = [];
	  var item, key, val, j;
	  for (var i = 0, l = arr.length; i < l; i++) {
	    item = arr[i];
	    val = item && item.$value || item;
	    j = keys.length;
	    if (j) {
	      while (j--) {
	        key = keys[j];
	        if (key === '$key' && contains(item.$key, search) || contains(getPath(val, key), search)) {
	          res.push(item);
	          break;
	        }
	      }
	    } else if (contains(item, search)) {
	      res.push(item);
	    }
	  }
	  return res;
	}

	/**
	 * Filter filter for arrays
	 *
	 * @param {String} sortKey
	 * @param {String} reverse
	 */

	function orderBy(arr, sortKey, reverse) {
	  arr = convertArray(arr);
	  if (!sortKey) {
	    return arr;
	  }
	  var order = reverse && reverse < 0 ? -1 : 1;
	  // sort on a copy to avoid mutating original array
	  return arr.slice().sort(function (a, b) {
	    if (sortKey !== '$key') {
	      if (isObject(a) && '$value' in a) a = a.$value;
	      if (isObject(b) && '$value' in b) b = b.$value;
	    }
	    a = isObject(a) ? getPath(a, sortKey) : a;
	    b = isObject(b) ? getPath(b, sortKey) : b;
	    return a === b ? 0 : a > b ? order : -order;
	  });
	}

	/**
	 * String contain helper
	 *
	 * @param {*} val
	 * @param {String} search
	 */

	function contains(val, search) {
	  var i;
	  if (isPlainObject(val)) {
	    var keys = Object.keys(val);
	    i = keys.length;
	    while (i--) {
	      if (contains(val[keys[i]], search)) {
	        return true;
	      }
	    }
	  } else if (isArray(val)) {
	    i = val.length;
	    while (i--) {
	      if (contains(val[i], search)) {
	        return true;
	      }
	    }
	  } else if (val != null) {
	    return val.toString().toLowerCase().indexOf(search) > -1;
	  }
	}

	var digitsRE = /(\d{3})(?=\d)/g;

	// asset collections must be a plain object.
	var filters = {

	  orderBy: orderBy,
	  filterBy: filterBy,
	  limitBy: limitBy,

	  /**
	   * Stringify value.
	   *
	   * @param {Number} indent
	   */

	  json: {
	    read: function read(value, indent) {
	      return typeof value === 'string' ? value : JSON.stringify(value, null, Number(indent) || 2);
	    },
	    write: function write(value) {
	      try {
	        return JSON.parse(value);
	      } catch (e) {
	        return value;
	      }
	    }
	  },

	  /**
	   * 'abc' => 'Abc'
	   */

	  capitalize: function capitalize(value) {
	    if (!value && value !== 0) return '';
	    value = value.toString();
	    return value.charAt(0).toUpperCase() + value.slice(1);
	  },

	  /**
	   * 'abc' => 'ABC'
	   */

	  uppercase: function uppercase(value) {
	    return value || value === 0 ? value.toString().toUpperCase() : '';
	  },

	  /**
	   * 'AbC' => 'abc'
	   */

	  lowercase: function lowercase(value) {
	    return value || value === 0 ? value.toString().toLowerCase() : '';
	  },

	  /**
	   * 12345 => $12,345.00
	   *
	   * @param {String} sign
	   */

	  currency: function currency(value, _currency) {
	    value = parseFloat(value);
	    if (!isFinite(value) || !value && value !== 0) return '';
	    _currency = _currency != null ? _currency : '$';
	    var stringified = Math.abs(value).toFixed(2);
	    var _int = stringified.slice(0, -3);
	    var i = _int.length % 3;
	    var head = i > 0 ? _int.slice(0, i) + (_int.length > 3 ? ',' : '') : '';
	    var _float = stringified.slice(-3);
	    var sign = value < 0 ? '-' : '';
	    return _currency + sign + head + _int.slice(i).replace(digitsRE, '$1,') + _float;
	  },

	  /**
	   * 'item' => 'items'
	   *
	   * @params
	   *  an array of strings corresponding to
	   *  the single, double, triple ... forms of the word to
	   *  be pluralized. When the number to be pluralized
	   *  exceeds the length of the args, it will use the last
	   *  entry in the array.
	   *
	   *  e.g. ['single', 'double', 'triple', 'multiple']
	   */

	  pluralize: function pluralize(value) {
	    var args = toArray(arguments, 1);
	    return args.length > 1 ? args[value % 10 - 1] || args[args.length - 1] : args[0] + (value === 1 ? '' : 's');
	  },

	  /**
	   * Debounce a handler function.
	   *
	   * @param {Function} handler
	   * @param {Number} delay = 300
	   * @return {Function}
	   */

	  debounce: function debounce(handler, delay) {
	    if (!handler) return;
	    if (!delay) {
	      delay = 300;
	    }
	    return _debounce(handler, delay);
	  }
	};

	var partial = {

	  priority: PARTIAL,

	  params: ['name'],

	  // watch changes to name for dynamic partials
	  paramWatchers: {
	    name: function name(value) {
	      vIf.remove.call(this);
	      if (value) {
	        this.insert(value);
	      }
	    }
	  },

	  bind: function bind() {
	    this.anchor = createAnchor('v-partial');
	    replace(this.el, this.anchor);
	    this.insert(this.params.name);
	  },

	  insert: function insert(id) {
	    var partial = resolveAsset(this.vm.$options, 'partials', id);
	    if (process.env.NODE_ENV !== 'production') {
	      assertAsset(partial, 'partial', id);
	    }
	    if (partial) {
	      this.factory = new FragmentFactory(this.vm, partial);
	      vIf.insert.call(this);
	    }
	  },

	  unbind: function unbind() {
	    if (this.frag) {
	      this.frag.destroy();
	    }
	  }
	};

	// This is the elementDirective that handles <content>
	// transclusions. It relies on the raw content of an
	// instance being stored as `$options._content` during
	// the transclude phase.

	// We are exporting two versions, one for named and one
	// for unnamed, because the unnamed slots must be compiled
	// AFTER all named slots have selected their content. So
	// we need to give them different priorities in the compilation
	// process. (See #1965)

	var slot = {

	  priority: SLOT,

	  bind: function bind() {
	    var host = this.vm;
	    var raw = host.$options._content;
	    if (!raw) {
	      this.fallback();
	      return;
	    }
	    var context = host._context;
	    var slotName = this.params && this.params.name;
	    if (!slotName) {
	      // Default slot
	      this.tryCompile(extractFragment(raw.childNodes, raw, true), context, host);
	    } else {
	      // Named slot
	      var selector = '[slot="' + slotName + '"]';
	      var nodes = raw.querySelectorAll(selector);
	      if (nodes.length) {
	        this.tryCompile(extractFragment(nodes, raw), context, host);
	      } else {
	        this.fallback();
	      }
	    }
	  },

	  tryCompile: function tryCompile(content, context, host) {
	    if (content.hasChildNodes()) {
	      this.compile(content, context, host);
	    } else {
	      this.fallback();
	    }
	  },

	  compile: function compile(content, context, host) {
	    if (content && context) {
	      if (this.el.hasChildNodes() && content.childNodes.length === 1 && content.childNodes[0].nodeType === 1 && content.childNodes[0].hasAttribute('v-if')) {
	        // if the inserted slot has v-if
	        // inject fallback content as the v-else
	        var elseBlock = document.createElement('template');
	        elseBlock.setAttribute('v-else', '');
	        elseBlock.innerHTML = this.el.innerHTML;
	        content.appendChild(elseBlock);
	      }
	      var scope = host ? host._scope : this._scope;
	      this.unlink = context.$compile(content, host, scope, this._frag);
	    }
	    if (content) {
	      replace(this.el, content);
	    } else {
	      remove(this.el);
	    }
	  },

	  fallback: function fallback() {
	    this.compile(extractContent(this.el, true), this.vm);
	  },

	  unbind: function unbind() {
	    if (this.unlink) {
	      this.unlink();
	    }
	  }
	};

	var namedSlot = extend(extend({}, slot), {
	  priority: slot.priority + 1,
	  params: ['name']
	});

	/**
	 * Extract qualified content nodes from a node list.
	 *
	 * @param {NodeList} nodes
	 * @param {Element} parent
	 * @param {Boolean} main
	 * @return {DocumentFragment}
	 */

	function extractFragment(nodes, parent, main) {
	  var frag = document.createDocumentFragment();
	  for (var i = 0, l = nodes.length; i < l; i++) {
	    var node = nodes[i];
	    // if this is the main outlet, we want to skip all
	    // previously selected nodes;
	    // otherwise, we want to mark the node as selected.
	    // clone the node so the original raw content remains
	    // intact. this ensures proper re-compilation in cases
	    // where the outlet is inside a conditional block
	    if (main && !node.__v_selected) {
	      append(node);
	    } else if (!main && node.parentNode === parent) {
	      node.__v_selected = true;
	      append(node);
	    }
	  }
	  return frag;

	  function append(node) {
	    if (isTemplate(node) && !node.hasAttribute('v-if') && !node.hasAttribute('v-for')) {
	      node = parseTemplate(node);
	    }
	    node = cloneNode(node);
	    frag.appendChild(node);
	  }
	}

	var elementDirectives = {
	  slot: slot,
	  _namedSlot: namedSlot, // same as slot but with higher priority
	  partial: partial
	};

	Vue.version = '1.0.16';

	/**
	 * Vue and every constructor that extends Vue has an
	 * associated options object, which can be accessed during
	 * compilation steps as `this.constructor.options`.
	 *
	 * These can be seen as the default options of every
	 * Vue instance.
	 */

	Vue.options = {
	  directives: publicDirectives,
	  elementDirectives: elementDirectives,
	  filters: filters,
	  transitions: {},
	  components: {},
	  partials: {},
	  replace: true
	};

	// devtools global hook
	/* istanbul ignore next */
	if (devtools) {
	  devtools.emit('init', Vue);
	} else if (process.env.NODE_ENV !== 'production' && inBrowser && /Chrome\/\d+/.test(navigator.userAgent)) {
	  console.log('Download the Vue Devtools for a better development experience:\n' + 'https://github.com/vuejs/vue-devtools');
	}

	module.exports = Vue;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(3)))

/***/ },
/* 3 */
/***/ function(module, exports) {

	// shim for using process in browser

	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(5)
	module.exports = __webpack_require__(9)

	if (module.exports.__esModule) module.exports = module.exports.default
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(11)
	if (false) {
	(function () {
	var hotAPI = require("vue-hot-reload-api")
	hotAPI.install(require("vue"))
	if (!hotAPI.compatible) return
	var id = "-!babel!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./app.vue"
	hotAPI.createRecord(id, module.exports)
	module.hot.accept(["-!babel!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./app.vue","-!vue-html!template-html?raw&engine=jade!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./app.vue"], function () {
	var newOptions = require("-!babel!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./app.vue")
	if (newOptions && newOptions.__esModule) newOptions = newOptions.default
	var newTemplate = require("-!vue-html!template-html?raw&engine=jade!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./app.vue")
	hotAPI.update(id, newOptions, newTemplate)
	})
	})()
	}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(6);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(8)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-rewriter.js?id=_v-2b292ea7&file=app.vue!./node_modules/stylus-loader/index.js!./node_modules/vue-loader/lib/selector.js?type=style&index=0!./app.vue", function() {
				var newContent = require("!!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-rewriter.js?id=_v-2b292ea7&file=app.vue!./node_modules/stylus-loader/index.js!./node_modules/vue-loader/lib/selector.js?type=style&index=0!./app.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(7)();
	// imports


	// module
	exports.push([module.id, "#button-example .btn {\n  margin: 0 1px;\n}\n", ""]);

	// exports


/***/ },
/* 7 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _vuebootstrap = __webpack_require__(10);

	var _vuebootstrap2 = _interopRequireDefault(_vuebootstrap);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Label = _vuebootstrap2.default.Label; // <style lang='stylus'>
	// #button-example
	//   .btn
	//     margin:0 1px
	// </style>
	// <template lang='jade'>
	// h3#vbs-label 标签－Label
	// panel
	//   div(slot='panel-header')
	//      说明,需要添加is属性：is＝'label'
	//   div(slot='panel-body')
	//     div
	//       p
	//         strong.pl-k 'bs-style'
	//         ：颜色(primary,success,danger...)
	//       p
	//         label(is='label',v-for='sle in styleList',v-bind:bs-style='sle')
	//           标签
	//       p
	//         button(@click='toggleSource') 示例源码
	//       p
	//         textarea(name='example-code-label').
	//           <template>
	//             <label is='label' bs-style='default'>
	//               标签
	//             </label>
	//             <label is='label' bs-style='primary'>
	//               标签
	//             </label>
	//             <label is='label' bs-style='info'>
	//               标签
	//             </label>
	//             <!-- more -->
	//           </template>

	// h3#vbs-button 按钮－Button
	// panel#button-example
	//   div(slot='panel-header')
	//      说明
	//   div(slot='panel-body')
	//     div
	//       p
	//         strong.pl-k 'bs-style'
	//         ：颜色(primary,success,danger...)
	//       p
	//         button(v-for='sle in styleList',v-bind:bs-style='sle')
	//           按钮
	//       p
	//         strong.pl-k 'bs-size'
	//         ：尺寸
	//       p
	//         button(bs-size='sm') 按钮
	//         button(bs-size='lg',bs-style='primary') 按钮
	//       p
	//         关于click事件可以直接绑定
	//         strong.pl-k 'on-click'
	//         或者
	//         strong.pl-k @click
	//         p
	//           button(@click='toggleSource') 示例源码
	//         p
	//           textarea(name='example-code-button').
	//             <template>
	//               <button bs-style='default',bs-size='xs'>
	//                 按钮
	//               </button>
	//               <button  bs-style='primary',bs-size='lg'>
	//                 按钮
	//               </button>
	//               <button bs-style='info',@click='clickHandle'>
	//                 按钮
	//               </button>
	//               <!-- more -->
	//             </template>
	// h3 按钮组－ButtonGroup
	// panel
	//   div(slot='panel-header')
	//      说明,slot位置可放置button和a控件
	//   div(slot='panel-body')
	//     div
	//       p
	//         button-group
	//           button left
	//           button center
	//           button right
	//       p
	//         string.pl-k 'bs-size'
	//         ：尺寸
	//       p
	//         button-group(bs-size='lg')
	//           button left
	//           button center
	//           button right
	//       p
	//         strong.pl-k 'align'
	//         ：位置
	//       p
	//         button(@click='toggleSource') 示例源码
	//       p
	//         textarea(name='example-code-buttongroup').
	//           <template>
	//             <button-group bs-size='lg'>
	//               <button>
	//                 left
	//               </button>
	//               <button>
	//                 center
	//               </button>
	//               <button>
	//                 right
	//               </button>
	//             </button-group>
	//           </template>
	// h3 下拉按钮－DropdownButton
	// panel
	//   div(slot='panel-header')
	//      说明
	//   div(slot='panel-body')
	//     div
	//       p.pl-id.small
	//         span 2016-2-22 : 已修改
	//       p
	//         dropdown-button(v-bind:dropdown='true')
	//           span(slot="dropdown-title") 下拉框
	//           menu-item(v-for='lk in linkList',v-bind:href='lk.url',slot="dropdown-menu")
	//             {{lk.name}}
	//       p
	//         strong.pl-k 'title'
	//         ：下拉框标题
	//       p
	//         strong.pl-k 'dropdown'，
	//         strong.pl-k 'dropup'
	//         ：布尔值，朝上或者向下
	//       p
	//         dropdown-button(v-bind:dropup='true',bs-size='sm',bs-style='primary')
	//           span(slot="dropdown-title") 下拉框
	//           menu-item(v-for='lk in linkList',v-bind:href='lk.url',slot="dropdown-menu")
	//             {{lk.name}}
	//       p
	//         strong.pl-k 'bs-size'
	//         ：尺寸
	//       p
	//         strong.pl-k 'bs-style'
	//         ：颜色
	//       p
	//         button(@click='toggleSource') 示例源码
	//       p
	//         textarea(name='example-code-dropdown').
	//           <template>
	//             <dropdown-button v-bind:dropup='true' bs-size='lg'>
	//               <span slot="dropdown-title">下拉框</span>
	//               <menu-item v-bind:href='#' slot="dropdown-menu">
	//                 link1
	//               </menu-item>
	//               <menu-item v-bind:href='#' slot="dropdown-menu">
	//                 link2
	//               </menu-item>
	//               <menu-item v-bind:href='#' slot="dropdown-menu">
	//                 link3
	//               </menu-item>
	//             </dropdown-button>
	//           </template>
	// h3 分裂按钮－SplitButton
	// panel
	//   div(slot='panel-header')
	//      说明
	//   div(slot='panel-body')
	//     div
	//       p
	//         split-button(title='下拉框',v-bind:dropup='true',bs-style='danger')
	//           menu-item(v-for='lk in linkList',v-bind:href='lk.url')
	//             {{lk.name}}
	//       p
	//         strong.pl-k 'title'
	//         ：下拉框标题
	//       p
	//         strong.pl-k 'dropdown'，
	//         strong.pl-k 'dropup'
	//         ：布尔值，朝上或者向下
	//       p
	//         split-button(title='下拉框',v-bind:dropup='true',bs-size='sm',bs-style='warning')
	//           menu-item(v-for='lk in linkList',v-bind:href='lk.url')
	//             {{lk.name}}
	//       p
	//         strong.pl-k 'bs-size'
	//         ：尺寸
	//       p
	//         strong.pl-k 'bs-style'
	//         ：颜色
	//       p
	//         button(@click='toggleSource') 示例源码
	//       p
	//         textarea(name='example-code-splitbutton').
	//           <template>
	//             <split-button title='分裂框' v-bind:dropdown='true' bs-style='primary'>
	//               <menu-item v-bind:href='#'>
	//                 link1
	//               </menu-item>
	//               <menu-item v-bind:href='#'>
	//                 link2
	//               </menu-item>
	//               <menu-item v-bind:href='#'>
	//                 link3
	//               </menu-item>
	//             </split-button>
	//           </template>
	// h3#vbs-alert 警告框-Alert
	// panel
	//   div(slot='panel-header')
	//      说明
	//   div(slot='panel-body')
	//     div
	//       p
	//         alert(bs-style='warning')
	//           这是警告框
	//         alert(bs-style='success')
	//           这是成功提示框
	//       p
	//         strong.pl-k 'bs-style'
	//         ：颜色
	//       p
	//         button(@click='toggleSource') 示例源码
	//       p
	//         textarea(name='example-code-alert').
	//           <template>
	//             <alert bs-style='warning'>
	//                 这是警告框
	//             </alert>
	//             <alert bs-style='success'>
	//                 这是成功提示框
	//             </alert>
	//           </template>

	// h3#vbs-modal 模态框－Modal
	// panel
	//   div(slot='panel-header')
	//      说明
	//   div(slot='panel-body')
	//     div
	//     p.pl-id.small
	//       span 2016-2-22 : 已修改
	//       p
	//         button(@click='toggleModal',bs-style='primary') 运行模态框
	//       modal(v-bind:is-show.sync='showModal',v-bind:on-before-show='beforeShow')
	//         div(slot='modal-header')
	//           span.close(type='button',aria-label='close',@click='closeModal')
	//             span(aria-hidden="true")
	//               &times;
	//           h4.modal-title  title
	//         div(slot='modal-body')
	//           内容。。
	//         div(slot='modal-footer')
	//           button(@click='closeModal') close
	//       p
	//         strong.pl-k 'is-show'
	//         ：bool值
	//       p
	//         strong.pl-k 'bs-size'
	//         ：尺寸
	//       p
	//         strong.pl-k 'on-before-show'
	//         ：弹出框弹出之前
	//       p
	//         strong.pl-k 'on-after-show'
	//         ：弹出框弹出之后
	//       p
	//         strong.pl-k 'on-before-hide'
	//         ：弹出框关闭之前
	//       p
	//         strong.pl-k 'on-after-hide'
	//         ：弹出框关闭之后
	//       p
	//         button(@click='toggleSource') 示例源码
	//       p
	//         textarea(name='example-code-modal').
	//           <template>
	//             <modal v-bind:is-show.sync='showModal' v-bind:on-before-show='beforeShow'>
	//               <div slot='modal-header'>
	//                   <span class='close' type='button' aria-label='close' @click='closeModal'>
	//                     <span aria-hidden="true">&times;</span>
	//                   </span>
	//                   <h4>
	//                     title
	//                   </h4>
	//               </div>
	//               <div slot='modal-body'>
	//                   content
	//               </div>
	//               <div slot='modal-footer'>
	//                   <button @click='closeModal'>close</button>
	//               </div>
	//             </modal>

	//           </template>
	//           <script>
	//             export default{
	//               data(){
	//                 return {
	//                   showModal:false
	//                 }
	//               },
	//               methods:{
	//                 closeModal(){
	//                   this.showModal = !this.showModal;
	//                 },
	//                 beforeShow(){
	//                   alert("弹出框显示！");
	//                 }
	//               }
	//             }
	//           </script>
	// h3#vbs-tooltip Tooltip
	// panel
	//   div(slot='panel-header')
	//      说明
	//   div(slot='panel-body')
	//     div
	//       p
	//         div(v-bind:style="tooltipStyle")
	//           tooltip(placement='bottom',v-bind:show='true') tobottom
	//       p
	//         strong.pl-k 'placement'
	//         ：位置(top,left,bottom,right)
	//       p
	//         strong.pl-k 'show'
	//         ：bool值，是否显示
	//       p
	//         button(@click='toggleSource') 示例源码
	//       p
	//         textarea(name='example-code-tooltip').
	//           <template>
	//             <tooltip placement='bottom' v-bind:show='true'>
	//               提示按钮
	//             </tooltip>
	//           </template>
	// h3 TooltipTrigger
	// panel
	//   div(slot='panel-header')
	//      说明
	//   div(slot='panel-body')
	//     div
	//       p
	//         tooltip-trigger(trigger='click',placement='bottom',content="这是弹出提示框")
	//           button(bs-style='danger') 提示框
	//       p
	//         strong.pl-k 'placement'
	//         ：位置(top,left,bottom,right)
	//       p
	//         strong.pl-k 'trigger'
	//         ：触发类型(hover,click)
	//       p
	//         strong.pl-k 'content'
	//         ：提示内容
	//       p
	//         button(@click='toggleSource') 示例源码
	//       p
	//         textarea(name='example-code-tooltiptrigger').
	//           <template>
	//             <tooltip-trigger
	//               trigger='click'
	//               placement='bottom'
	//               content="这是弹出提示框"
	//               >
	//               <button bs-style='success'>提示框按钮</button>
	//             </tooltip-trigger>
	//           </template>
	// h3 弹出提示框－Popover
	// panel
	//   div(slot='panel-header')
	//      说明
	//   div(slot='panel-body')
	//     div
	//       p
	//         div(v-bind:style='popoverStyle')
	//           popover(title='标题',placement='top',v-bind:show='true')
	//             弹出框内容呢弹出框内容呢弹出框内容呢
	//       p
	//         button(@click='toggleSource') 示例源码
	//       p
	//         textarea(name='example-code-popover').
	//           <template>
	//             <popover
	//               title='标题'
	//               placement='bottom'
	//               v-bind:show='true'>
	//               提示按钮
	//             </popover>
	//           </template>
	// h3 弹出提示框－PopoverTrigger
	// panel
	//   div(slot='panel-header')
	//      说明
	//   div(slot='panel-body')
	//     div
	//       p
	//         popover-trigger(trigger='click',placement='left',title='标题',content='这是弹出提示框')
	//           button(bs-style='default') popover弹出来
	//       p
	//         strong.pl-k 'placement'
	//         ：位置(top,left,bottom,right)
	//       p
	//         strong.pl-k 'trigger'
	//         ：触发类型(hover,click)
	//       p
	//         strong.pl-k 'content'
	//         ：提示内容
	//       p
	//         strong.pl-k 'title'
	//         ：标题
	//       p
	//         button(@click='toggleSource') 示例源码
	//       p
	//         textarea(name='example-code-popovertrigger').
	//           <template>
	//             <popover-trigger
	//               trigger='click'
	//               placement='left'
	//               title='标题'
	//               content="这是弹出提示框"
	//               >
	//               <button bs-style='info'>提示框按钮</button>
	//             </popover-trigger>
	//           </template>
	// h3#vbs-tab 选项卡－Tab
	// panel
	//   div(slot='panel-header')
	//      说明，tab，tab-item
	//   div(slot='panel-body')
	//     div
	//       p
	//         tab(v-bind:on-select='clickTab')
	//           tab-item(title='tab1') tab1-content
	//           tab-item(title='tab2') tab2-content
	//           tab-item(title='tab3',v-bind:disabled='true') tab3-content
	//       p
	//         strong.pl-k 'on-select'
	//         ：选择事件回调
	//       p
	//         strong.pl-k 'title'
	//         ：选项卡标题
	//       p
	//         strong.pl-k 'disabled'
	//         ：bool值，是否可以选中
	//       p
	//         button(@click='toggleSource') 示例源码
	//       p
	//         textarea(name='example-code-tab').
	//           <template>
	//             <tab v-bind:on-select='clickTab'>
	//               <tab-item title='tab1'>
	//                 tab1 content
	//               </tab-item>
	//               <tab-item title='tab2'>
	//                 tab2 content
	//               </tab-item>
	//               <tab-item title='tab3' v-bind:disabled='true'>
	//                 tab3 content
	//               </tab-item>
	//             </tab>
	//           </template>
	//           <script>
	//             export default{
	//               methods:{
	//                 clickTab(tabItem){
	//                     alert(tabItem.title);
	//                 }
	//               }
	//             }
	//           </script>
	// h3#vbs-pagination 分页组件－Pagination
	// panel
	//   div(slot='panel-header')
	//      说明,pager
	//   div(slot='panel-body')
	//     div
	//       p
	//         pagination(v-bind:active-page='activePage',v-bind:items=10,v-bind:on-select='selectPage')
	//       p
	//         strong.pl-k 'active-page'
	//         ：当前页
	//       p
	//         strong.pl-k 'items'
	//         ：页数
	//       p
	//         strong.pl-k 'on-select'
	//         ：页选中事件回调,返回pager类(包含val，name，active，disabled)
	//       p
	//         button(@click='toggleSource') 示例源码
	//       p
	//         textarea(name='example-code-pagination').
	//           <template>
	//             <pagination
	//               v-bind:active-page='activePage'
	//               v-bind:items='10'
	//               v-bind:on-select='selectPage'>

	//             </pagination>
	//           </template>
	//           <script>
	//             export default{
	//               methods:{
	//                 selectPage(pager){
	//                     //pager.disabled,pager.active
	//                     if(pager.num === 'next'){
	//                       this.activePage = this.activePage+1 > 10 ? this.activePage : this.activePage+1;
	//                     }else if(pager.num === 'prev'){
	//                       this.activePage = this.activePage < 1 ? this.activePage : this.activePage - 1;
	//                     }else{
	//                       this.activePage = pager.num;
	//                     }
	//                 }
	//               }
	//             }
	//           </script>
	// h3#vbs-row 栅格－Row,Column
	// panel
	//   div(slot='panel-header')
	//      说明
	//   div(slot='panel-body')
	//     div
	//       p
	//         row
	//           column(xs='12',sm='4',md='4') 栅格系统1
	//           column(xs='12',sm='4',md='4') 栅格系统2
	//           column(xs='12',sm='4',md='4') 栅格系统3
	//       p
	//         strong.pl-k 'xs'
	//         ：数字类型
	//       p
	//         strong.pl-k 'sm'
	//         ：数字类型
	//       p
	//         strong.pl-k 'md'
	//         ：数字类型
	//       p
	//         strong.pl-k 'lg'
	//         ：数字类型
	//       p
	//         button(@click='toggleSource') 示例源码
	//       p
	//         textarea(name='example-code-rowcol').
	//           <template>
	//             <row>
	//               <column xs='12' sm='4' md='4' lg='4'>
	//                 栅格系统1
	//               </column>
	//               <column xs='12' sm='4' md='4' lg='4'>
	//                 栅格系统2
	//               </column>
	//               <column xs='12' sm='4' md='4' lg='4'>
	//                 栅格系统3
	//               </column>
	//             </row>
	//           </template>
	// h3#vbs-panel 面板－panel
	// panel
	//   div(slot='panel-header')
	//      标题
	//   div(slot='panel-body')
	//     p
	//       内容
	//     p
	//       strong.pl-k 'slot=panel-header'
	//       ：标题部分
	//     p
	//       strong.pl-k 'slot=panel-body'
	//       ：内容部分
	//     p
	//       button(@click='toggleSource') 示例源码
	//     p
	//       textarea(name='example-code-panel').
	//         <template>
	//           <panel  bs-style='info'>
	//             <div slot='panel-header'>
	//                 标题
	//             </div>
	//             <div slot='panel-body'>
	//                 内容
	//             </div>
	//           </panel>
	//         </template>
	// h3#vbs-carousel 跑马灯－Carousel
	// panel
	//   div(slot='panel-header')
	//      说明，carousel，carousel-item
	//   div(slot='panel-body')
	//     p
	//       carousel(style='width:650px;')
	//         carousel-item
	//           img(src='./images/carousel1.png')
	//         carousel-item
	//           img(src='./images/carousel1.png')
	//         carousel-item
	//           img(src='./images/carousel1.png')
	//     p
	//       strong.pl-k 'interval'
	//       ：数字：3000（默认3秒），间隔时间
	//     p
	//       strong.pl-k 'controls'
	//       ：bool值，控制上下滚动点击事件
	//     p
	//       strong.pl-k 'indicators'
	//       ：bool值，显示锚点
	//     p
	//       strong.pl-k 'pause-on-hover'
	//       ：bool值，鼠标悬停暂停滚动
	//     p
	//       strong.pl-k 'slide'
	//       ：bool值，自动滚动
	//     p
	//       button(@click='toggleSource') 示例源码
	//     p
	//       textarea(name='example-code-carousel').
	//         <template>
	//           <carousel
	//           interval='5000'
	//           v-bind:controls='true',
	//           v-bind:slide='true'
	//           >
	//             <carousel-item>
	//               <img src='./images/carousel1.png' alt='' />
	//             </carousel-item>
	//             <carousel-item>
	//               <img src='./images/carousel1.png' alt='' />
	//             </carousel-item>
	//             <carousel-item>
	//               <img src='./images/carousel1.png' alt='' />
	//             </carousel-item>
	//           </carousel>
	//         </template>

	// h3#vbs-form 表单－Form
	// panel
	//   div(slot='panel-header')
	//      说明，form,form-input
	//   div(slot='panel-body')
	//     p
	//       form(is='form',bs-style='horizontal',v-bind:layout='{sm:"3,9",md:"2,8"}')
	//         form-input(type=text,label='输入框1',placeholder='输入框12',v-bind:model.sync='value')

	//     p
	//       {{value}}
	//     p
	//       strong.pl-ent form
	//     p
	//       strong.pl-k 'bs-style'
	//       ：布局类型,horizontal,inline
	//     p
	//       strong.pl-k 'layout'
	//       ：布局类型为horizontal时，分配sm，md大小，例如：md='2-10',sm='3-9'
	//     p
	//       strong.pl-ent form-input
	//     p
	//       strong.pl-k 'label'
	//       ：Label内容
	//     p
	//       strong.pl-k 'placeholder'
	//       ：placeholder提示语
	//     p
	//       strong.pl-k 'model'
	//       ：双向绑定关键字
	//     p
	//       button(@click='toggleSource') 示例源码
	//     p
	//       textarea(name='example-code-form').
	//         <template id="">
	//           <form
	//             is='form'
	//             bs-style='horizontal'
	//             v-bind:layout='{sm:"3,9",md:"2,8"}'
	//             >
	//               <form-input
	//                 type='text'
	//                 label='输入框1'
	//                 placeholder='输入框12'
	//                 v-bind:model.sync='value'
	//                 >

	//               </form-input>
	//           </form>
	//         </template>
	//         <script>
	//           export default{
	//             data(){
	//               return{
	//                 value:"text"
	//               }
	//             }
	//           }
	//         </script>
	// h3#vbs-breadcrumb 面包屑－Breadcrumb
	// panel
	//   div(slot='panel-header')
	//      说明，breadcrumb,breadcrumb-item
	//   div(slot='panel-body')
	//     p
	//       breadcrumb
	//         breadcrumb-item(href='#').
	//           home
	//         breadcrumb-item(href='#').
	//           library
	//         breadcrumb-item(v-bind:active='true').
	//           point
	//     p
	//       strong.pl-ent breadcrumb-item
	//     p
	//       strong.pl-k 'href'
	//       ：链接地址
	//     p
	//       strong.pl-k 'active'
	//       ：bool值，当前所在页
	//     p
	//       textarea(name='example-code-breadcrumb').
	//         <template>
	//           <breadcrumb>
	//             <breadcrumb-item href='#'>
	//               home
	//             </breadcrumb-item>
	//             <breadcrumb-item href='#'>
	//               library
	//             </breadcrumb-item>
	//             <breadcrumb-item v-bind:active='true'>
	//               point
	//             </breadcrumb-item>
	//           </breadcrumb>
	//         </template>
	// h3#vbs-thumbnail 缩略图－Thumbnail
	// panel
	//   div(slot='panel-header')
	//      说明，thumbnail内部可包含h3标题，p标签描述信息和按钮组
	//   div(slot='panel-body')
	//     row
	//       column(md='4',sm='12')
	//         thumbnail(
	//                 href='#'
	//                 src='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjQyIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDI0MiAyMDAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPjwhLS0KU291cmNlIFVSTDogaG9sZGVyLmpzLzEwMCV4MjAwCkNyZWF0ZWQgd2l0aCBIb2xkZXIuanMgMi42LjAuCkxlYXJuIG1vcmUgYXQgaHR0cDovL2hvbGRlcmpzLmNvbQooYykgMjAxMi0yMDE1IEl2YW4gTWFsb3BpbnNreSAtIGh0dHA6Ly9pbXNreS5jbwotLT48ZGVmcz48c3R5bGUgdHlwZT0idGV4dC9jc3MiPjwhW0NEQVRBWyNob2xkZXJfMTUxODA4Yjk1MDQgdGV4dCB7IGZpbGw6I0FBQUFBQTtmb250LXdlaWdodDpib2xkO2ZvbnQtZmFtaWx5OkFyaWFsLCBIZWx2ZXRpY2EsIE9wZW4gU2Fucywgc2Fucy1zZXJpZiwgbW9ub3NwYWNlO2ZvbnQtc2l6ZToxMnB0IH0gXV0+PC9zdHlsZT48L2RlZnM+PGcgaWQ9ImhvbGRlcl8xNTE4MDhiOTUwNCI+PHJlY3Qgd2lkdGg9IjI0MiIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNFRUVFRUUiLz48Zz48dGV4dCB4PSI4OS44NTkzNzUiIHk9IjEwNS40Ij4yNDJ4MjAwPC90ZXh0PjwvZz48L2c+PC9zdmc+',
	//                 alt='示例图')
	//                 h3 标题
	//                 p 描述信息在这里
	//                 p
	//                   button(bs-style='primary') 按钮
	//                   button 按钮
	//       column(md='4',sm='12')
	//         thumbnail(
	//                 src='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjQyIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDI0MiAyMDAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPjwhLS0KU291cmNlIFVSTDogaG9sZGVyLmpzLzEwMCV4MjAwCkNyZWF0ZWQgd2l0aCBIb2xkZXIuanMgMi42LjAuCkxlYXJuIG1vcmUgYXQgaHR0cDovL2hvbGRlcmpzLmNvbQooYykgMjAxMi0yMDE1IEl2YW4gTWFsb3BpbnNreSAtIGh0dHA6Ly9pbXNreS5jbwotLT48ZGVmcz48c3R5bGUgdHlwZT0idGV4dC9jc3MiPjwhW0NEQVRBWyNob2xkZXJfMTUxODA4Yjk1MDQgdGV4dCB7IGZpbGw6I0FBQUFBQTtmb250LXdlaWdodDpib2xkO2ZvbnQtZmFtaWx5OkFyaWFsLCBIZWx2ZXRpY2EsIE9wZW4gU2Fucywgc2Fucy1zZXJpZiwgbW9ub3NwYWNlO2ZvbnQtc2l6ZToxMnB0IH0gXV0+PC9zdHlsZT48L2RlZnM+PGcgaWQ9ImhvbGRlcl8xNTE4MDhiOTUwNCI+PHJlY3Qgd2lkdGg9IjI0MiIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNFRUVFRUUiLz48Zz48dGV4dCB4PSI4OS44NTkzNzUiIHk9IjEwNS40Ij4yNDJ4MjAwPC90ZXh0PjwvZz48L2c+PC9zdmc+',
	//                 alt='示例图')
	//                 h3 标题
	//                 p 描述信息在这里
	//                 p
	//                   button(bs-style='primary') 按钮
	//                   button 按钮
	//       column(md='4',sm='12')
	//         thumbnail(
	//                 src='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjQyIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDI0MiAyMDAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPjwhLS0KU291cmNlIFVSTDogaG9sZGVyLmpzLzEwMCV4MjAwCkNyZWF0ZWQgd2l0aCBIb2xkZXIuanMgMi42LjAuCkxlYXJuIG1vcmUgYXQgaHR0cDovL2hvbGRlcmpzLmNvbQooYykgMjAxMi0yMDE1IEl2YW4gTWFsb3BpbnNreSAtIGh0dHA6Ly9pbXNreS5jbwotLT48ZGVmcz48c3R5bGUgdHlwZT0idGV4dC9jc3MiPjwhW0NEQVRBWyNob2xkZXJfMTUxODA4Yjk1MDQgdGV4dCB7IGZpbGw6I0FBQUFBQTtmb250LXdlaWdodDpib2xkO2ZvbnQtZmFtaWx5OkFyaWFsLCBIZWx2ZXRpY2EsIE9wZW4gU2Fucywgc2Fucy1zZXJpZiwgbW9ub3NwYWNlO2ZvbnQtc2l6ZToxMnB0IH0gXV0+PC9zdHlsZT48L2RlZnM+PGcgaWQ9ImhvbGRlcl8xNTE4MDhiOTUwNCI+PHJlY3Qgd2lkdGg9IjI0MiIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNFRUVFRUUiLz48Zz48dGV4dCB4PSI4OS44NTkzNzUiIHk9IjEwNS40Ij4yNDJ4MjAwPC90ZXh0PjwvZz48L2c+PC9zdmc+',
	//                 alt='示例图')
	//                 h3 标题
	//                 p 描述信息在这里
	//                 p
	//                   button(bs-style='primary') 按钮
	//                   button 按钮
	//     p
	//       strong.pl-k 'href'
	//       ：链接地址
	//     p
	//       strong.pl-k 'target'
	//       ：目标项
	//     p
	//       strong.pl-k 'src'
	//       ：图片地址
	//     p
	//       strong.pl-k 'alt'
	//       ：图片标注信息
	//     p
	//       textarea(name='example-code-thumbnail').
	//         <template>
	//           <row>
	//             <column md='4' sm='12'>
	//               <thumbnail
	//               src='http://',
	//               alt='image',
	//               href='url',
	//               target='_blank'
	//               >
	//               <h3>title</h3>
	//               <p>content</p>
	//               <p>
	//                 <button bs-style='pimary'>按钮</button>
	//                 <button>按钮</button>
	//               </p>
	//               </thumbnail>
	//             </column>
	//             <column md='4' sm='12'>
	//               <thumbnail
	//               src='http://',
	//               alt='image',
	//               href='url',
	//               target='_blank'
	//               >
	//               <h3>title</h3>
	//               <p>content</p>
	//               <p>
	//                 <button bs-style='pimary'>按钮</button>
	//                 <button>按钮</button>
	//               </p>
	//               </thumbnail>
	//             </column>
	//             <column md='4' sm='12'>
	//               <thumbnail
	//               src='http://',
	//               alt='image',
	//               href='url',
	//               target='_blank'
	//               >
	//               <h3>title</h3>
	//               <p>content</p>
	//               <p>
	//                 <button bs-style='pimary'>按钮</button>
	//                 <button>按钮</button>
	//               </p>
	//               </thumbnail>
	//             </column>
	//           </row>
	//         </template>
	// h3#vbs-progressbar 进度条－Progressbar
	// panel
	//   div(slot='panel-header')
	//      说明
	//   div(slot='panel-body')
	//     div
	//       progressbar(
	//       v-bind:progress='progress',
	//       bs-style='danger',
	//       v-bind:striped='true',
	//       v-bind:animation='true')
	//         {{progress}}
	//       button(@click='addProgress') 进度变化点击我
	//     p
	//       strong.pl-k 'progress'
	//       ：Number类型，当前进度数
	//     p
	//       strong.pl-k 'min'
	//       ：Number类型，最小值，默认：0
	//     p
	//       strong.pl-k 'max'
	//       ：Number类型，最大值，默认：100
	//     p
	//       strong.pl-k 'bs-style'
	//       ：样式类型
	//     p
	//       strong.pl-k 'striped'
	//       ：bool类型，条纹状
	//     p
	//       strong.pl-k 'animation'
	//       ：bool类型，条纹动画效果
	//     p
	//       textarea(name='example-code-progressbar').
	//         <template>
	//           <progressbar
	//           v-bind:progress='progress'
	//           bs-style='danger'
	//           v-bind:striped='true'
	//           v-bind:animation='true'>
	//             {&nbsp;{progress}&nbsp;}
	//           </progressbar>
	//         </template>
	// </template>
	// <script>

	var MenuItem = _vuebootstrap2.default.MenuItem;
	var Button = _vuebootstrap2.default.Button;
	var ButtonGroup = _vuebootstrap2.default.ButtonGroup;
	var DropdownButton = _vuebootstrap2.default.DropdownButton;
	var SplitButton = _vuebootstrap2.default.SplitButton;
	var Modal = _vuebootstrap2.default.Modal;
	var Tooltip = _vuebootstrap2.default.Tooltip;
	var TooltipTrigger = _vuebootstrap2.default.TooltipTrigger;
	var Tab = _vuebootstrap2.default.Tab;
	var TabItem = _vuebootstrap2.default.TabItem;
	var Pagination = _vuebootstrap2.default.Pagination;
	var Row = _vuebootstrap2.default.Row;
	var Column = _vuebootstrap2.default.Column;
	var Panel = _vuebootstrap2.default.Panel;
	var Alert = _vuebootstrap2.default.Alert;
	var Carousel = _vuebootstrap2.default.Carousel;
	var CarouselItem = _vuebootstrap2.default.CarouselItem;
	var Form = _vuebootstrap2.default.Form;
	var FormInput = _vuebootstrap2.default.FormInput;
	var Popover = _vuebootstrap2.default.Popover;
	var PopoverTrigger = _vuebootstrap2.default.PopoverTrigger;
	var Breadcrumb = _vuebootstrap2.default.Breadcrumb;
	var BreadcrumbItem = _vuebootstrap2.default.BreadcrumbItem;
	var Thumbnail = _vuebootstrap2.default.Thumbnail;
	var Progressbar = _vuebootstrap2.default.Progressbar;
	exports.default = {
	  data: function data() {
	    return {
	      value: "text",
	      lizis: 3,
	      progress: 10,
	      activePage: 1,
	      tooltipStyle: { position: 'relative', height: '30px' },
	      showModal: false,
	      popoverStyle: { position: 'relative', height: '100px' },
	      styleList: ['default', 'primary', 'info', 'success', 'warning', 'danger'],
	      linkList: [{ name: 'link1', url: '#' }, { name: 'link2', url: '#' }]
	    };
	  },

	  methods: {
	    toggleModal: function toggleModal() {
	      this.showModal = !this.showModal;
	    },
	    closeModal: function closeModal() {
	      this.toggleModal();
	    },
	    beforeShow: function beforeShow() {
	      alert("弹出框显示！");
	    },
	    selectPage: function selectPage(pager) {
	      if (pager.num === 'next') {
	        this.activePage = this.activePage + 1 > 10 ? this.activePage : this.activePage + 1;
	      } else if (pager.num === 'prev') {
	        this.activePage = this.activePage < 1 ? this.activePage : this.activePage - 1;
	      } else {
	        this.activePage = pager.num;
	      }
	      //alert(pager.name);
	    },
	    clickTab: function clickTab(tab) {
	      alert(tab.title);
	    },
	    toggleSource: function toggleSource(e) {
	      var sourceCodeEl = $(e.target).parent().next().children(".CodeMirror");

	      sourceCodeEl.is(":hidden") ? sourceCodeEl.show() : sourceCodeEl.hide();
	    },
	    addProgress: function addProgress() {
	      this.progress += 2;
	      if (this.progress > 100) {
	        this.progress = 100;
	      }
	    }
	  },
	  ready: function ready() {
	    //示例代码高亮
	    var mixedMode = {
	      name: "htmlmixed",
	      scriptTypes: [{ matches: /\/x-handlebars-template|\/x-mustache/i,
	        mode: null }, { matches: /(text|application)\/(x-)?vb(a|script)/i,
	        mode: "vbscript" }]
	    };
	    $("textarea[name^='example-code']").each(function (index, textarea) {
	      CodeMirror.fromTextArea(textarea, {
	        mode: mixedMode,
	        selectionPointer: false,
	        theme: "base16-light",
	        readOnly: "nocursor",
	        lineNumbers: true
	      });
	    });
	    //导航
	    if ($.isFunction($.fn.affix) && $.isFunction($.fn.scrollspy)) {
	      $('#navbar').affix({
	        offset: {
	          top: 550,
	          bottom: function bottom() {
	            return this.bottom = $('.footer').outerHeight(true);
	          }
	        }
	      });
	    }
	  },

	  components: {
	    Label: Label,
	    MenuItem: MenuItem,
	    Button: Button,
	    ButtonGroup: ButtonGroup,
	    DropdownButton: DropdownButton,
	    SplitButton: SplitButton,
	    Modal: Modal,
	    Tooltip: Tooltip,
	    TooltipTrigger: TooltipTrigger,
	    Tab: Tab,
	    TabItem: TabItem,
	    Pagination: Pagination,
	    Row: Row,
	    Column: Column,
	    Panel: Panel,
	    Alert: Alert,
	    Carousel: Carousel,
	    CarouselItem: CarouselItem,
	    Form: Form,
	    FormInput: FormInput,
	    Popover: Popover,
	    PopoverTrigger: PopoverTrigger,
	    Breadcrumb: Breadcrumb,
	    BreadcrumbItem: BreadcrumbItem,
	    Thumbnail: Thumbnail,
	    Progressbar: Progressbar
	  }
	};
	// </script>

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	!function(t,e){ true?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.vuebootstrap=e():t.vuebootstrap=e()}(this,function(){return function(t){function e(n){if(i[n])return i[n].exports;var s=i[n]={exports:{},id:n,loaded:!1};return t[n].call(s.exports,s,s.exports,e),s.loaded=!0,s.exports}var i={};return e.m=t,e.c=i,e.p="production/",e(0)}([function(t,e,i){"use strict";function n(t){return t&&t.__esModule?t:{"default":t}}var s=i(119),r=n(s),o=i(3),a=n(o),l=i(15),u=n(l),c=i(16),h=n(c),f=i(122),p=n(f),d=i(123),v=n(d),m=i(124),g=n(m),b=i(125),_=n(b),y=i(126),x=n(y),w=i(127),C=n(w),$=i(128),k=n($),A=i(129),P=n(A),O=i(130),S=n(O),T=i(17),M=n(T),j=i(7),N=n(j),E=i(132),F=n(E),L=i(133),I=n(L),B=i(18),D=n(B),R=i(134),z=n(R),H=i(136),W=n(H),U=i(137),V=n(U),q=i(138),J=n(q),Q=i(19),G=n(Q),K=i(20),Y=n(K),Z=i(140),X=n(Z),tt=i(120),et=n(tt),it=i(121),nt=n(it),st=i(139),rt=n(st),ot=i(135),at=n(ot);t.exports={Alert:r["default"],Anchor:a["default"],Button:u["default"],ButtonGroup:h["default"],Carousel:p["default"],CarouselItem:v["default"],Column:g["default"],DropdownButton:_["default"],Form:x["default"],FormInput:C["default"],Label:k["default"],MenuItem:P["default"],Modal:S["default"],Nav:M["default"],NavItem:N["default"],Pagination:F["default"],Panel:I["default"],Popover:D["default"],PopoverTrigger:z["default"],Row:W["default"],SplitButton:V["default"],Tab:J["default"],TabItem:G["default"],Tooltip:Y["default"],TooltipTrigger:X["default"],Breadcrumb:et["default"],BreadcrumbItem:nt["default"],Thumbnail:rt["default"],Progressbar:at["default"]}},function(t,e){"use strict";t.exports={props:{bsStyle:{type:String,"default":"default"},bsSize:{type:String,"default":null}},created:function(){var t="-",e=this;if(e.tag){if(e.classes[e.tag]=!0,e.bsStyle){var i=e.bsStyle.split(",");0===i.length?e.classes[e.tag+t+i[0]]=!0:i.forEach(function(i){e.classes[e.tag+t+i]=!0})}e.bsSize&&(e.classes[e.tag+t+e.bsSize]=!0)}}}},function(t,e){"use strict";t.exports={props:{href:{type:String,"default":null},target:{type:String,"default":"_self"}}}},function(t,e,i){t.exports=i(48),t.exports.__esModule&&(t.exports=t.exports["default"]),("function"==typeof t.exports?t.exports.options:t.exports).template=i(90)},function(t,e){t.exports=function(){var t=[];return t.toString=function(){for(var t=[],e=0;e<this.length;e++){var i=this[e];i[2]?t.push("@media "+i[2]+"{"+i[1]+"}"):t.push(i[1])}return t.join("")},t.i=function(e,i){"string"==typeof e&&(e=[[null,e,""]]);for(var n={},s=0;s<this.length;s++){var r=this[s][0];"number"==typeof r&&(n[r]=!0)}for(s=0;s<e.length;s++){var o=e[s];"number"==typeof o[0]&&n[o[0]]||(i&&!o[2]?o[2]=i:i&&(o[2]="("+o[2]+") and ("+i+")"),t.push(o))}},t}},function(t,e,i){function n(t,e){for(var i=0;i<t.length;i++){var n=t[i],s=p[n.id];if(s){s.refs++;for(var r=0;r<s.parts.length;r++)s.parts[r](n.parts[r]);for(;r<n.parts.length;r++)s.parts.push(u(n.parts[r],e))}else{for(var o=[],r=0;r<n.parts.length;r++)o.push(u(n.parts[r],e));p[n.id]={id:n.id,refs:1,parts:o}}}}function s(t){for(var e=[],i={},n=0;n<t.length;n++){var s=t[n],r=s[0],o=s[1],a=s[2],l=s[3],u={css:o,media:a,sourceMap:l};i[r]?i[r].parts.push(u):e.push(i[r]={id:r,parts:[u]})}return e}function r(t,e){var i=m(),n=_[_.length-1];if("top"===t.insertAt)n?n.nextSibling?i.insertBefore(e,n.nextSibling):i.appendChild(e):i.insertBefore(e,i.firstChild),_.push(e);else{if("bottom"!==t.insertAt)throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");i.appendChild(e)}}function o(t){t.parentNode.removeChild(t);var e=_.indexOf(t);e>=0&&_.splice(e,1)}function a(t){var e=document.createElement("style");return e.type="text/css",r(t,e),e}function l(t){var e=document.createElement("link");return e.rel="stylesheet",r(t,e),e}function u(t,e){var i,n,s;if(e.singleton){var r=b++;i=g||(g=a(e)),n=c.bind(null,i,r,!1),s=c.bind(null,i,r,!0)}else t.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(i=l(e),n=f.bind(null,i),s=function(){o(i),i.href&&URL.revokeObjectURL(i.href)}):(i=a(e),n=h.bind(null,i),s=function(){o(i)});return n(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;n(t=e)}else s()}}function c(t,e,i,n){var s=i?"":n.css;if(t.styleSheet)t.styleSheet.cssText=y(e,s);else{var r=document.createTextNode(s),o=t.childNodes;o[e]&&t.removeChild(o[e]),o.length?t.insertBefore(r,o[e]):t.appendChild(r)}}function h(t,e){var i=e.css,n=e.media;e.sourceMap;if(n&&t.setAttribute("media",n),t.styleSheet)t.styleSheet.cssText=i;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(i))}}function f(t,e){var i=e.css,n=(e.media,e.sourceMap);n&&(i+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(n))))+" */");var s=new Blob([i],{type:"text/css"}),r=t.href;t.href=URL.createObjectURL(s),r&&URL.revokeObjectURL(r)}var p={},d=function(t){var e;return function(){return"undefined"==typeof e&&(e=t.apply(this,arguments)),e}},v=d(function(){return/msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase())}),m=d(function(){return document.head||document.getElementsByTagName("head")[0]}),g=null,b=0,_=[];t.exports=function(t,e){e=e||{},"undefined"==typeof e.singleton&&(e.singleton=v()),"undefined"==typeof e.insertAt&&(e.insertAt="bottom");var i=s(t);return n(i,e),function(t){for(var r=[],o=0;o<i.length;o++){var a=i[o],l=p[a.id];l.refs--,r.push(l)}if(t){var u=s(t);n(u,e)}for(var o=0;o<r.length;o++){var l=r[o];if(0===l.refs){for(var c=0;c<l.parts.length;c++)l.parts[c]();delete p[l.id]}}}};var y=function(){var t=[];return function(e,i){return t[e]=i,t.filter(Boolean).join("\n")}}()},function(t,e,i){(function(e){/*!
		 * Vue.js v1.0.16
		 * (c) 2016 Evan You
		 * Released under the MIT License.
		 */
	"use strict";function i(t,e,n){if(s(t,e))return void(t[e]=n);if(t._isVue)return void i(t._data,e,n);var r=t.__ob__;if(!r)return void(t[e]=n);if(r.convert(e,n),r.dep.notify(),r.vms)for(var o=r.vms.length;o--;){var a=r.vms[o];a._proxy(e),a._digest()}return n}function n(t,e){if(s(t,e)){delete t[e];var i=t.__ob__;if(i&&(i.dep.notify(),i.vms))for(var n=i.vms.length;n--;){var r=i.vms[n];r._unproxy(e),r._digest()}}}function s(t,e){return bi.call(t,e)}function r(t){return _i.test(t)}function o(t){var e=(t+"").charCodeAt(0);return 36===e||95===e}function a(t){return null==t?"":t.toString()}function l(t){if("string"!=typeof t)return t;var e=Number(t);return isNaN(e)?t:e}function u(t){return"true"===t?!0:"false"===t?!1:t}function c(t){var e=t.charCodeAt(0),i=t.charCodeAt(t.length-1);return e!==i||34!==e&&39!==e?t:t.slice(1,-1)}function h(t){return t.replace(yi,f)}function f(t,e){return e?e.toUpperCase():""}function p(t){return t.replace(xi,"$1-$2").toLowerCase()}function d(t){return t.replace(wi,f)}function v(t,e){return function(i){var n=arguments.length;return n?n>1?t.apply(e,arguments):t.call(e,i):t.call(e)}}function m(t,e){e=e||0;for(var i=t.length-e,n=new Array(i);i--;)n[i]=t[i+e];return n}function g(t,e){for(var i=Object.keys(e),n=i.length;n--;)t[i[n]]=e[i[n]];return t}function b(t){return null!==t&&"object"==typeof t}function _(t){return Ci.call(t)===$i}function y(t,e,i,n){Object.defineProperty(t,e,{value:i,enumerable:!!n,writable:!0,configurable:!0})}function x(t,e){var i,n,s,r,o,a=function l(){var a=Date.now()-r;e>a&&a>=0?i=setTimeout(l,e-a):(i=null,o=t.apply(s,n),i||(s=n=null))};return function(){return s=this,n=arguments,r=Date.now(),i||(i=setTimeout(a,e)),o}}function w(t,e){for(var i=t.length;i--;)if(t[i]===e)return i;return-1}function C(t){var e=function i(){return i.cancelled?void 0:t.apply(this,arguments)};return e.cancel=function(){e.cancelled=!0},e}function $(t,e){return t==e||(b(t)&&b(e)?JSON.stringify(t)===JSON.stringify(e):!1)}function k(t){this.size=0,this.limit=t,this.head=this.tail=void 0,this._keymap=Object.create(null)}function A(){var t,e=Di.slice(Vi,Wi).trim();if(e){t={};var i=e.match(Zi);t.name=i[0],i.length>1&&(t.args=i.slice(1).map(P))}t&&(Ri.filters=Ri.filters||[]).push(t),Vi=Wi+1}function P(t){if(Xi.test(t))return{value:l(t),dynamic:!1};var e=c(t),i=e===t;return{value:i?t:e,dynamic:i}}function O(t){var e=Yi.get(t);if(e)return e;for(Di=t,qi=Ji=!1,Qi=Gi=Ki=0,Vi=0,Ri={},Wi=0,Ui=Di.length;Ui>Wi;Wi++)if(Hi=zi,zi=Di.charCodeAt(Wi),qi)39===zi&&92!==Hi&&(qi=!qi);else if(Ji)34===zi&&92!==Hi&&(Ji=!Ji);else if(124===zi&&124!==Di.charCodeAt(Wi+1)&&124!==Di.charCodeAt(Wi-1))null==Ri.expression?(Vi=Wi+1,Ri.expression=Di.slice(0,Wi).trim()):A();else switch(zi){case 34:Ji=!0;break;case 39:qi=!0;break;case 40:Ki++;break;case 41:Ki--;break;case 91:Gi++;break;case 93:Gi--;break;case 123:Qi++;break;case 125:Qi--}return null==Ri.expression?Ri.expression=Di.slice(0,Wi).trim():0!==Vi&&A(),Yi.put(t,Ri),Ri}function S(t){return t.replace(en,"\\$&")}function T(){var t=S(cn.delimiters[0]),e=S(cn.delimiters[1]),i=S(cn.unsafeDelimiters[0]),n=S(cn.unsafeDelimiters[1]);sn=new RegExp(i+"(.+?)"+n+"|"+t+"(.+?)"+e,"g"),rn=new RegExp("^"+i+".*"+n+"$"),nn=new k(1e3)}function M(t){nn||T();var e=nn.get(t);if(e)return e;if(t=t.replace(/\n/g,""),!sn.test(t))return null;for(var i,n,s,r,o,a,l=[],u=sn.lastIndex=0;i=sn.exec(t);)n=i.index,n>u&&l.push({value:t.slice(u,n)}),s=rn.test(i[0]),r=s?i[1]:i[2],o=r.charCodeAt(0),a=42===o,r=a?r.slice(1):r,l.push({tag:!0,value:r.trim(),html:s,oneTime:a}),u=n+i[0].length;return u<t.length&&l.push({value:t.slice(u)}),nn.put(t,l),l}function j(t,e){return t.length>1?t.map(function(t){return N(t,e)}).join("+"):N(t[0],e,!0)}function N(t,e,i){return t.tag?t.oneTime&&e?'"'+e.$eval(t.value)+'"':E(t.value,i):'"'+t.value+'"'}function E(t,e){if(on.test(t)){var i=O(t);return i.filters?"this._applyFilters("+i.expression+",null,"+JSON.stringify(i.filters)+",false)":"("+t+")"}return e?t:"("+t+")"}function F(t,e,i,n){B(t,1,function(){e.appendChild(t)},i,n)}function L(t,e,i,n){B(t,1,function(){U(t,e)},i,n)}function I(t,e,i){B(t,-1,function(){q(t)},e,i)}function B(t,e,i,n,s){var r=t.__v_trans;if(!r||!r.hooks&&!ji||!n._isCompiled||n.$parent&&!n.$parent._isCompiled)return i(),void(s&&s());var o=e>0?"enter":"leave";r[o](i,s)}function D(t){if("string"==typeof t){t=document.querySelector(t)}return t}function R(t){var e=document.documentElement,i=t&&t.parentNode;return e===t||e===i||!(!i||1!==i.nodeType||!e.contains(i))}function z(t,e){var i=t.getAttribute(e);return null!==i&&t.removeAttribute(e),i}function H(t,e){var i=z(t,":"+e);return null===i&&(i=z(t,"v-bind:"+e)),i}function W(t,e){return t.hasAttribute(e)||t.hasAttribute(":"+e)||t.hasAttribute("v-bind:"+e)}function U(t,e){e.parentNode.insertBefore(t,e)}function V(t,e){e.nextSibling?U(t,e.nextSibling):e.parentNode.appendChild(t)}function q(t){t.parentNode.removeChild(t)}function J(t,e){e.firstChild?U(t,e.firstChild):e.appendChild(t)}function Q(t,e){var i=t.parentNode;i&&i.replaceChild(e,t)}function G(t,e,i,n){t.addEventListener(e,i,n)}function K(t,e,i){t.removeEventListener(e,i)}function Y(t,e){!Si||t instanceof SVGElement?t.setAttribute("class",e):t.className=e}function Z(t,e){if(t.classList)t.classList.add(e);else{var i=" "+(t.getAttribute("class")||"")+" ";i.indexOf(" "+e+" ")<0&&Y(t,(i+e).trim())}}function X(t,e){if(t.classList)t.classList.remove(e);else{for(var i=" "+(t.getAttribute("class")||"")+" ",n=" "+e+" ";i.indexOf(n)>=0;)i=i.replace(n," ");Y(t,i.trim())}t.className||t.removeAttribute("class")}function tt(t,e){var i,n;if(nt(t)&&t.content instanceof DocumentFragment&&(t=t.content),t.hasChildNodes())for(et(t),n=e?document.createDocumentFragment():document.createElement("div");i=t.firstChild;)n.appendChild(i);return n}function et(t){for(var e;e=t.firstChild,it(e);)t.removeChild(e);for(;e=t.lastChild,it(e);)t.removeChild(e)}function it(t){return t&&(3===t.nodeType&&!t.data.trim()||8===t.nodeType)}function nt(t){return t.tagName&&"template"===t.tagName.toLowerCase()}function st(t,e){var i=cn.debug?document.createComment(t):document.createTextNode(e?" ":"");return i.__vue_anchor=!0,i}function rt(t){if(t.hasAttributes())for(var e=t.attributes,i=0,n=e.length;n>i;i++){var s=e[i].name;if(fn.test(s))return h(s.replace(fn,""))}}function ot(t,e,i){for(var n;t!==e;)n=t.nextSibling,i(t),t=n;i(e)}function at(t,e,i,n,s){function r(){if(a++,o&&a>=l.length){for(var t=0;t<l.length;t++)n.appendChild(l[t]);s&&s()}}var o=!1,a=0,l=[];ot(t,e,function(t){t===e&&(o=!0),l.push(t),I(t,i,r)})}function lt(t,e){var i=t.tagName.toLowerCase(),n=t.hasAttributes();if(pn.test(i)||dn.test(i)){if(n)return ut(t)}else{if(_t(e,"components",i))return{id:i};var s=n&&ut(t);if(s)return s}}function ut(t){var e=z(t,"is");return null!=e?{id:e}:(e=H(t,"is"),null!=e?{id:e,dynamic:!0}:void 0)}function ct(t,e,i){var n=e.path;i=ft(e,i),t[n]=t._data[n]=ht(e,i)?i:void 0}function ht(t,e){if(null===t.raw&&!t.required)return!0;var i,n=t.options,s=n.type,r=!0;if(s&&(s===String?(i="string",r=typeof e===i):s===Number?(i="number",r="number"==typeof e):s===Boolean?(i="boolean",r="boolean"==typeof e):s===Function?(i="function",r="function"==typeof e):s===Object?(i="object",r=_(e)):s===Array?(i="array",r=ki(e)):r=e instanceof s),!r)return!1;var o=n.validator;return o&&!o.call(null,e)?!1:!0}function ft(t,e){var i=t.options.coerce;return i?i(e):e}function pt(t,e){var n,r,o;for(n in e)r=t[n],o=e[n],s(t,n)?b(r)&&b(o)&&pt(r,o):i(t,n,o);return t}function dt(t,e){var i=Object.create(t);return e?g(i,gt(e)):i}function vt(t){if(t.components)for(var e,i=t.components=gt(t.components),n=Object.keys(i),s=0,r=n.length;r>s;s++){var o=n[s];pn.test(o)||dn.test(o)||(e=i[o],_(e)&&(i[o]=fi.extend(e)))}}function mt(t){var e,i,n=t.props;if(ki(n))for(t.props={},e=n.length;e--;)i=n[e],"string"==typeof i?t.props[i]=null:i.name&&(t.props[i.name]=i);else if(_(n)){var s=Object.keys(n);for(e=s.length;e--;)i=n[s[e]],"function"==typeof i&&(n[s[e]]={type:i})}}function gt(t){if(ki(t)){for(var e,i={},n=t.length;n--;){e=t[n];var s="function"==typeof e?e.options&&e.options.name||e.id:e.name||e.id;s&&(i[s]=e)}return i}return t}function bt(t,e,i){function n(n){var s=vn[n]||mn;o[n]=s(t[n],e[n],i,n)}vt(e),mt(e);var r,o={};if(e.mixins)for(var a=0,l=e.mixins.length;l>a;a++)t=bt(t,e.mixins[a],i);for(r in t)n(r);for(r in e)s(t,r)||n(r);return o}function _t(t,e,i){if("string"==typeof i){var n,s=t[e];return s[i]||s[n=h(i)]||s[n.charAt(0).toUpperCase()+n.slice(1)]}}function yt(t,e,i){}function xt(){this.id=_n++,this.subs=[]}function wt(t){if(this.value=t,this.dep=new xt,y(t,"__ob__",this),ki(t)){var e=Ai?Ct:$t;e(t,bn,yn),this.observeArray(t)}else this.walk(t)}function Ct(t,e){t.__proto__=e}function $t(t,e,i){for(var n=0,s=i.length;s>n;n++){var r=i[n];y(t,r,e[r])}}function kt(t,e){if(t&&"object"==typeof t){var i;return s(t,"__ob__")&&t.__ob__ instanceof wt?i=t.__ob__:(ki(t)||_(t))&&Object.isExtensible(t)&&!t._isVue&&(i=new wt(t)),i&&e&&i.addVm(e),i}}function At(t,e,i){var n,s,r=new xt;if(cn.convertAllProperties){var o=Object.getOwnPropertyDescriptor(t,e);if(o&&o.configurable===!1)return;n=o&&o.get,s=o&&o.set}var a=kt(i);Object.defineProperty(t,e,{enumerable:!0,configurable:!0,get:function(){var e=n?n.call(t):i;if(xt.target&&(r.depend(),a&&a.dep.depend(),ki(e)))for(var s,o=0,l=e.length;l>o;o++)s=e[o],s&&s.__ob__&&s.__ob__.dep.depend();return e},set:function(e){var o=n?n.call(t):i;e!==o&&(s?s.call(t,e):i=e,a=kt(e),r.notify())}})}function Pt(t){t.prototype._init=function(t){t=t||{},this.$el=null,this.$parent=t.parent,this.$root=this.$parent?this.$parent.$root:this,this.$children=[],this.$refs={},this.$els={},this._watchers=[],this._directives=[],this._uid=wn++,this._isVue=!0,this._events={},this._eventsCount={},this._isFragment=!1,this._fragment=this._fragmentStart=this._fragmentEnd=null,this._isCompiled=this._isDestroyed=this._isReady=this._isAttached=this._isBeingDestroyed=this._vForRemoving=!1,this._unlinkFn=null,this._context=t._context||this.$parent,this._scope=t._scope,this._frag=t._frag,this._frag&&this._frag.children.push(this),this.$parent&&this.$parent.$children.push(this),t=this.$options=bt(this.constructor.options,t,this),this._updateRef(),this._data={},this._callHook("init"),this._initState(),this._initEvents(),this._callHook("created"),t.el&&this.$mount(t.el)}}function Ot(t){if(void 0===t)return"eof";var e=t.charCodeAt(0);switch(e){case 91:case 93:case 46:case 34:case 39:case 48:return t;case 95:case 36:return"ident";case 32:case 9:case 10:case 13:case 160:case 65279:case 8232:case 8233:return"ws"}return e>=97&&122>=e||e>=65&&90>=e?"ident":e>=49&&57>=e?"number":"else"}function St(t){var e=t.trim();return"0"===t.charAt(0)&&isNaN(t)?!1:r(e)?c(e):"*"+e}function Tt(t){function e(){var e=t[c+1];return h===Nn&&"'"===e||h===En&&'"'===e?(c++,n="\\"+e,p[$n](),!0):void 0}var i,n,s,r,o,a,l,u=[],c=-1,h=On,f=0,p=[];for(p[kn]=function(){void 0!==s&&(u.push(s),s=void 0)},p[$n]=function(){void 0===s?s=n:s+=n},p[An]=function(){p[$n](),f++},p[Pn]=function(){if(f>0)f--,h=jn,p[$n]();else{if(f=0,s=St(s),s===!1)return!1;p[kn]()}};null!=h;)if(c++,i=t[c],"\\"!==i||!e()){if(r=Ot(i),l=In[h],o=l[r]||l["else"]||Ln,o===Ln)return;if(h=o[0],a=p[o[1]],a&&(n=o[2],n=void 0===n?i:n,a()===!1))return;if(h===Fn)return u.raw=t,u}}function Mt(t){var e=Cn.get(t);return e||(e=Tt(t),e&&Cn.put(t,e)),e}function jt(t,e){return Rt(e).get(t)}function Nt(t,e,n){var s=t;if("string"==typeof e&&(e=Tt(e)),!e||!b(t))return!1;for(var r,o,a=0,l=e.length;l>a;a++)r=t,o=e[a],"*"===o.charAt(0)&&(o=Rt(o.slice(1)).get.call(s,s)),l-1>a?(t=t[o],b(t)||(t={},i(r,o,t))):ki(t)?t.$set(o,n):o in t?t[o]=n:i(t,o,n);return!0}function Et(t,e){var i=Yn.length;return Yn[i]=e?t.replace(Vn,"\\n"):t,'"'+i+'"'}function Ft(t){var e=t.charAt(0),i=t.slice(1);return zn.test(i)?t:(i=i.indexOf('"')>-1?i.replace(Jn,Lt):i,e+"scope."+i)}function Lt(t,e){return Yn[e]}function It(t){Wn.test(t),Yn.length=0;var e=t.replace(qn,Et).replace(Un,"");return e=(" "+e).replace(Gn,Ft).replace(Jn,Lt),Bt(e)}function Bt(t){try{return new Function("scope","return "+t+";")}catch(e){}}function Dt(t){var e=Mt(t);return e?function(t,i){Nt(t,e,i)}:void 0}function Rt(t,e){t=t.trim();var i=Dn.get(t);if(i)return e&&!i.set&&(i.set=Dt(i.exp)),i;var n={exp:t};return n.get=zt(t)&&t.indexOf("[")<0?Bt("scope."+t):It(t),e&&(n.set=Dt(t)),Dn.put(t,n),n}function zt(t){return Qn.test(t)&&!Kn.test(t)&&"Math."!==t.slice(0,5)}function Ht(){Xn=[],ts=[],es={},is={},ns=ss=!1}function Wt(){Ut(Xn),ss=!0,Ut(ts),Oi&&Oi.emit("flush"),Ht()}function Ut(t){for(var e=0;e<t.length;e++){var i=t[e],n=i.id;es[n]=null,i.run()}}function Vt(t){var e=t.id;if(null==es[e]){if(ss&&!t.user)return void t.run();var i=t.user?ts:Xn;es[e]=i.length,i.push(t),ns||(ns=!0,Ii(Wt))}}function qt(t,e,i,n){n&&g(this,n);var s="function"==typeof e;if(this.vm=t,t._watchers.push(this),this.expression=s?e.toString():e,this.cb=i,this.id=++rs,this.active=!0,this.dirty=this.lazy,this.deps=Object.create(null),this.newDeps=null,this.prevError=null,s)this.getter=e,this.setter=void 0;else{var r=Rt(e,this.twoWay);this.getter=r.get,this.setter=r.set}this.value=this.lazy?void 0:this.get(),this.queued=this.shallow=!1}function Jt(t){var e,i;if(ki(t))for(e=t.length;e--;)Jt(t[e]);else if(b(t))for(i=Object.keys(t),e=i.length;e--;)Jt(t[i[e]])}function Qt(t){if(ws[t])return ws[t];var e=Gt(t);return ws[t]=ws[e]=e,e}function Gt(t){t=p(t);var e=h(t),i=e.charAt(0).toUpperCase()+e.slice(1);Cs||(Cs=document.createElement("div"));for(var n,s=_s.length;s--;)if(n=ys[s]+i,n in Cs.style)return _s[s]+t;return e in Cs.style?t:void 0}function Kt(t,e){var i=e.map(function(t){var e=t.charCodeAt(0);return e>47&&58>e?parseInt(t,10):1===t.length&&(e=t.toUpperCase().charCodeAt(0),e>64&&91>e)?e:Ms[t]});return i=[].concat.apply([],i),function(e){return i.indexOf(e.keyCode)>-1?t.call(this,e):void 0}}function Yt(t){return function(e){return e.stopPropagation(),t.call(this,e)}}function Zt(t){return function(e){return e.preventDefault(),t.call(this,e)}}function Xt(t){return function(e){return e.target===e.currentTarget?t.call(this,e):void 0}}function te(t,e,i){for(var n,s,r,o=e?[]:null,a=0,l=t.options.length;l>a;a++)if(n=t.options[a],r=i?n.hasAttribute("selected"):n.selected){if(s=n.hasOwnProperty("_value")?n._value:n.value,!e)return s;o.push(s)}return o}function ee(t,e){for(var i=t.length;i--;)if($(t[i],e))return i;return-1}function ie(t){return nt(t)&&t.content instanceof DocumentFragment}function ne(t,e){var i=e?t:t.trim(),n=Rs.get(i);if(n)return n;var s=document.createDocumentFragment(),r=t.match(Ws),o=Us.test(t);if(r||o){var a=r&&r[1],l=Hs[a]||Hs.efault,u=l[0],c=l[1],h=l[2],f=document.createElement("div");for(f.innerHTML=c+t+h;u--;)f=f.lastChild;for(var p;p=f.firstChild;)s.appendChild(p)}else s.appendChild(document.createTextNode(t));return e||et(s),Rs.put(i,s),s}function se(t){if(ie(t))return et(t.content),t.content;if("SCRIPT"===t.tagName)return ne(t.textContent);for(var e,i=re(t),n=document.createDocumentFragment();e=i.firstChild;)n.appendChild(e);return et(n),n}function re(t){if(!t.querySelectorAll)return t.cloneNode();var e,i,n,s=t.cloneNode(!0);if(Vs){var r=s;if(ie(t)&&(t=t.content,r=s.content),i=t.querySelectorAll("template"),i.length)for(n=r.querySelectorAll("template"),e=n.length;e--;)n[e].parentNode.replaceChild(re(i[e]),n[e])}if(qs)if("TEXTAREA"===t.tagName)s.value=t.value;else if(i=t.querySelectorAll("textarea"),i.length)for(n=s.querySelectorAll("textarea"),e=n.length;e--;)n[e].value=i[e].value;return s}function oe(t,e,i){var n,s;return t instanceof DocumentFragment?(et(t),e?re(t):t):("string"==typeof t?i||"#"!==t.charAt(0)?s=ne(t,i):(s=zs.get(t),s||(n=document.getElementById(t.slice(1)),n&&(s=se(n),zs.put(t,s)))):t.nodeType&&(s=se(t)),s&&e?re(s):s)}function ae(t,e,i,n,s,r){this.children=[],this.childFrags=[],this.vm=e,this.scope=s,this.inserted=!1,this.parentFrag=r,r&&r.childFrags.push(this),this.unlink=t(e,i,n,s,this);var o=this.single=1===i.childNodes.length&&!i.childNodes[0].__vue_anchor;o?(this.node=i.childNodes[0],this.before=le,this.remove=ue):(this.node=st("fragment-start"),this.end=st("fragment-end"),this.frag=i,J(this.node,i),i.appendChild(this.end),this.before=ce,this.remove=he),this.node.__vfrag__=this}function le(t,e){this.inserted=!0;var i=e!==!1?L:U;i(this.node,t,this.vm),R(this.node)&&this.callHook(fe)}function ue(){this.inserted=!1;var t=R(this.node),e=this;this.beforeRemove(),I(this.node,this.vm,function(){t&&e.callHook(pe),e.destroy()})}function ce(t,e){this.inserted=!0;var i=this.vm,n=e!==!1?L:U;ot(this.node,this.end,function(e){n(e,t,i)}),R(this.node)&&this.callHook(fe)}function he(){this.inserted=!1;var t=this,e=R(this.node);this.beforeRemove(),at(this.node,this.end,this.vm,this.frag,function(){e&&t.callHook(pe),t.destroy()})}function fe(t){t._isAttached||t._callHook("attached")}function pe(t){t._isAttached&&t._callHook("detached")}function de(t,e){this.vm=t;var i,n="string"==typeof e;n||nt(e)?i=oe(e,!0):(i=document.createDocumentFragment(),i.appendChild(e)),this.template=i;var s,r=t.constructor.cid;if(r>0){var o=r+(n?e:e.outerHTML);s=Qs.get(o),s||(s=Pe(i,t.$options,!0),Qs.put(o,s))}else s=Pe(i,t.$options,!0);this.linker=s}function ve(t,e,i){var n=t.node.previousSibling;if(n){for(t=n.__vfrag__;!(t&&t.forId===i&&t.inserted||n===e);){if(n=n.previousSibling,!n)return;t=n.__vfrag__}return t}}function me(t){var e=t.node;if(t.end)for(;!e.__vue__&&e!==t.end&&e.nextSibling;)e=e.nextSibling;return e.__vue__}function ge(t){for(var e=-1,i=new Array(Math.floor(t));++e<t;)i[e]=e;return i}function be(t){er.push(t),ir||(ir=!0,Ii(_e))}function _e(){for(var t=document.documentElement.offsetHeight,e=0;e<er.length;e++)er[e]();return er=[],ir=!1,t}function ye(t,e,i,n){this.id=e,this.el=t,this.enterClass=i&&i.enterClass||e+"-enter",this.leaveClass=i&&i.leaveClass||e+"-leave",this.hooks=i,this.vm=n,this.pendingCssEvent=this.pendingCssCb=this.cancel=this.pendingJsCb=this.op=this.cb=null,this.justEntered=!1,this.entered=this.left=!1,this.typeCache={},this.type=i&&i.type;var s=this;["enterNextTick","enterDone","leaveNextTick","leaveDone"].forEach(function(t){s[t]=v(s[t],s)})}function xe(t){return!(t.offsetWidth||t.offsetHeight||t.getClientRects().length)}function we(t){for(var e={},i=t.trim().split(/\s+/),n=i.length;n--;)e[i[n]]=!0;return e}function Ce(t,e){return ki(t)?t.indexOf(e)>-1:s(t,e)}function $e(t,e){for(var i,n,s,o,a,l,u,c=[],f=Object.keys(e),d=f.length;d--;)n=f[d],i=e[n]||vr,a=h(n),mr.test(a)&&(u={name:n,path:a,options:i,mode:dr.ONE_WAY,raw:null},s=p(n),null===(o=H(t,s))&&(null!==(o=H(t,s+".sync"))?u.mode=dr.TWO_WAY:null!==(o=H(t,s+".once"))&&(u.mode=dr.ONE_TIME)),null!==o?(u.raw=o,l=O(o),o=l.expression,u.filters=l.filters,r(o)&&!l.filters?u.optimizedLiteral=!0:u.dynamic=!0,u.parentPath=o):null!==(o=z(t,s))?u.raw=o:i.required,c.push(u));return ke(c)}function ke(t){return function(e,i){e._props={};for(var n,s,r,o,a,h=t.length;h--;)if(n=t[h],a=n.raw,s=n.path,r=n.options,e._props[s]=n,null===a)ct(e,n,Ae(e,r));else if(n.dynamic)e._context&&(n.mode===dr.ONE_TIME?(o=(i||e._context).$get(n.parentPath),ct(e,n,o)):e._bindDir({name:"prop",def:cr,prop:n},null,null,i));else if(n.optimizedLiteral){var f=c(a);o=f===a?u(l(a)):f,ct(e,n,o)}else o=r.type===Boolean&&""===a?!0:a,ct(e,n,o)}}function Ae(t,e){if(!s(e,"default"))return e.type===Boolean?!1:void 0;var i=e["default"];return b(i),"function"==typeof i&&e.type!==Function?i.call(t):i}function Pe(t,e,i){var n=i||!e._asComponent?Ee(t,e):null,s=n&&n.terminal||"SCRIPT"===t.tagName||!t.hasChildNodes()?null:Re(t.childNodes,e);return function(t,e,i,r,o){var a=m(e.childNodes),l=Oe(function(){n&&n(t,e,i,r,o),s&&s(t,a,i,r,o)},t);return Te(t,l)}}function Oe(t,e){e._directives=[];var i=e._directives.length;t();var n=e._directives.slice(i);n.sort(Se);for(var s=0,r=n.length;r>s;s++)n[s]._bind();return n}function Se(t,e){return t=t.descriptor.def.priority||Cr,e=e.descriptor.def.priority||Cr,t>e?-1:t===e?0:1}function Te(t,e,i,n){function s(s){Me(t,e,s),i&&n&&Me(i,n)}return s.dirs=e,s}function Me(t,e,i){for(var n=e.length;n--;)e[n]._teardown()}function je(t,e,i,n){var s=$e(e,i),r=Oe(function(){s(t,n)},t);return Te(t,r)}function Ne(t,e,i){var n,s,r=e._containerAttrs,o=e._replacerAttrs;if(11!==t.nodeType)e._asComponent?(r&&i&&(n=Je(r,i)),o&&(s=Je(o,e))):s=Je(t.attributes,e);else;return e._containerAttrs=e._replacerAttrs=null,function(t,e,i){var r,o=t._context;o&&n&&(r=Oe(function(){n(o,e,null,i)},o));var a=Oe(function(){s&&s(t,e)},t);return Te(t,a,o,r)}}function Ee(t,e){var i=t.nodeType;return 1===i&&"SCRIPT"!==t.tagName?Fe(t,e):3===i&&t.data.trim()?Le(t,e):null}function Fe(t,e){if("TEXTAREA"===t.tagName){var i=M(t.value);i&&(t.setAttribute(":value",j(i)),t.value="")}var n,s=t.hasAttributes();return s&&(n=Ue(t,e)),n||(n=He(t,e)),n||(n=We(t,e)),!n&&s&&(n=Je(t.attributes,e)),n}function Le(t,e){if(t._skip)return Ie;var i=M(t.wholeText);if(!i)return null;for(var n=t.nextSibling;n&&3===n.nodeType;)n._skip=!0,n=n.nextSibling;for(var s,r,o=document.createDocumentFragment(),a=0,l=i.length;l>a;a++)r=i[a],s=r.tag?Be(r,e):document.createTextNode(r.value),o.appendChild(s);return De(i,o,e)}function Ie(t,e){q(e)}function Be(t,e){function i(e){if(!t.descriptor){var i=O(t.value);t.descriptor={name:e,def:tr[e],expression:i.expression,filters:i.filters}}}var n;return t.oneTime?n=document.createTextNode(t.value):t.html?(n=document.createComment("v-html"),i("html")):(n=document.createTextNode(" "),i("text")),n}function De(t,e){return function(i,n,s,r){for(var o,a,l,u=e.cloneNode(!0),c=m(u.childNodes),h=0,f=t.length;f>h;h++)o=t[h],a=o.value,o.tag&&(l=c[h],o.oneTime?(a=(r||i).$eval(a),o.html?Q(l,oe(a,!0)):l.data=a):i._bindDir(o.descriptor,l,s,r));Q(n,u)}}function Re(t,e){for(var i,n,s,r=[],o=0,a=t.length;a>o;o++)s=t[o],i=Ee(s,e),n=i&&i.terminal||"SCRIPT"===s.tagName||!s.hasChildNodes()?null:Re(s.childNodes,e),r.push(i,n);return r.length?ze(r):null}function ze(t){return function(e,i,n,s,r){for(var o,a,l,u=0,c=0,h=t.length;h>u;c++){o=i[c],a=t[u++],l=t[u++];var f=m(o.childNodes);a&&a(e,o,n,s,r),l&&l(e,f,n,s,r)}}}function He(t,e){var i=t.tagName.toLowerCase();if(!pn.test(i)){"slot"===i&&W(t,"name")&&(i="_namedSlot");var n=_t(e,"elementDirectives",i);return n?qe(t,i,"",e,n):void 0}}function We(t,e){var i=lt(t,e);if(i){var n=rt(t),s={name:"component",ref:n,expression:i.id,def:pr.component,modifiers:{literal:!i.dynamic}},r=function(t,e,i,r,o){n&&At((r||t).$refs,n,null),t._bindDir(s,e,i,r,o)};return r.terminal=!0,r}}function Ue(t,e){if(null!==z(t,"v-pre"))return Ve;if(t.hasAttribute("v-else")){var i=t.previousElementSibling;if(i&&i.hasAttribute("v-if"))return Ve}for(var n,s,r=0,o=wr.length;o>r;r++)if(s=wr[r],n=t.getAttribute("v-"+s),null!=n)return qe(t,s,n,e)}function Ve(){}function qe(t,e,i,n,s){var r=O(i),o={name:e,expression:r.expression,filters:r.filters,raw:i,def:s||tr[e]};("for"===e||"router-view"===e)&&(o.ref=rt(t));var a=function(t,e,i,n,s){o.ref&&At((n||t).$refs,o.ref,null),t._bindDir(o,e,i,n,s)};return a.terminal=!0,a}function Je(t,e){function i(t,e,i){var n=i&&Ke(i),s=!n&&O(r);v.push({name:t,attr:o,raw:a,def:e,arg:u,modifiers:c,expression:s&&s.expression,filters:s&&s.filters,interp:i,hasOneTime:n})}for(var n,s,r,o,a,l,u,c,h,f,p,d=t.length,v=[];d--;)if(n=t[d],s=o=n.name,r=a=n.value,f=M(r),u=null,c=Qe(s),s=s.replace(yr,""),f)r=j(f),u=s,i("bind",tr.bind,f);else if(xr.test(s))c.literal=!gr.test(s),i("transition",pr.transition);else if(br.test(s))u=s.replace(br,""),i("on",tr.on);else if(gr.test(s))l=s.replace(gr,""),"style"===l||"class"===l?i(l,pr[l]):(u=l,i("bind",tr.bind));else if(p=s.match(_r)){if(l=p[1],u=p[2],"else"===l)continue;h=_t(e,"directives",l),h&&i(l,h)}return v.length?Ge(v):void 0}function Qe(t){var e=Object.create(null),i=t.match(yr);if(i)for(var n=i.length;n--;)e[i[n].slice(1)]=!0;return e}function Ge(t){return function(e,i,n,s,r){for(var o=t.length;o--;)e._bindDir(t[o],i,n,s,r)}}function Ke(t){for(var e=t.length;e--;)if(t[e].oneTime)return!0}function Ye(t,e){return e&&(e._containerAttrs=Xe(t)),nt(t)&&(t=oe(t)),e&&(e._asComponent&&!e.template&&(e.template="<slot></slot>"),e.template&&(e._content=tt(t),t=Ze(t,e))),t instanceof DocumentFragment&&(J(st("v-start",!0),t),t.appendChild(st("v-end",!0))),t}function Ze(t,e){var i=e.template,n=oe(i,!0);if(n){var s=n.firstChild,r=s.tagName&&s.tagName.toLowerCase();return e.replace?(t===document.body,n.childNodes.length>1||1!==s.nodeType||"component"===r||_t(e,"components",r)||W(s,"is")||_t(e,"elementDirectives",r)||s.hasAttribute("v-for")||s.hasAttribute("v-if")?n:(e._replacerAttrs=Xe(s),ti(t,s),s)):(t.appendChild(n),t)}}function Xe(t){return 1===t.nodeType&&t.hasAttributes()?m(t.attributes):void 0}function ti(t,e){for(var i,n,s=t.attributes,r=s.length;r--;)i=s[r].name,n=s[r].value,e.hasAttribute(i)||$r.test(i)?"class"!==i||M(n)||n.split(/\s+/).forEach(function(t){Z(e,t)}):e.setAttribute(i,n)}function ei(t){function e(){}function n(t,e){var i=new qt(e,t,null,{lazy:!0});return function(){return i.dirty&&i.evaluate(),xt.target&&i.depend(),i.value}}Object.defineProperty(t.prototype,"$data",{get:function(){return this._data},set:function(t){t!==this._data&&this._setData(t)}}),t.prototype._initState=function(){this._initProps(),this._initMeta(),this._initMethods(),this._initData(),this._initComputed()},t.prototype._initProps=function(){var t=this.$options,e=t.el,i=t.props;e=t.el=D(e),this._propsUnlinkFn=e&&1===e.nodeType&&i?je(this,e,i,this._scope):null},t.prototype._initData=function(){var t=this._data,e=this.$options.data,n=e&&e();if(n){this._data=n;for(var r in t)null===this._props[r].raw&&s(n,r)||i(n,r,t[r])}var o,a,l=this._data,u=Object.keys(l);for(o=u.length;o--;)a=u[o],this._proxy(a);kt(l,this)},t.prototype._setData=function(t){t=t||{};var e=this._data;this._data=t;var i,n,r;for(i=Object.keys(e),r=i.length;r--;)n=i[r],n in t||this._unproxy(n);for(i=Object.keys(t),r=i.length;r--;)n=i[r],s(this,n)||this._proxy(n);e.__ob__.removeVm(this),kt(t,this),this._digest()},t.prototype._proxy=function(t){if(!o(t)){var e=this;Object.defineProperty(e,t,{configurable:!0,enumerable:!0,get:function(){return e._data[t]},set:function(i){e._data[t]=i}})}},t.prototype._unproxy=function(t){o(t)||delete this[t]},t.prototype._digest=function(){for(var t=0,e=this._watchers.length;e>t;t++)this._watchers[t].update(!0)},t.prototype._initComputed=function(){var t=this.$options.computed;if(t)for(var i in t){var s=t[i],r={enumerable:!0,configurable:!0};"function"==typeof s?(r.get=n(s,this),r.set=e):(r.get=s.get?s.cache!==!1?n(s.get,this):v(s.get,this):e,r.set=s.set?v(s.set,this):e),Object.defineProperty(this,i,r)}},t.prototype._initMethods=function(){var t=this.$options.methods;if(t)for(var e in t)this[e]=v(t[e],this)},t.prototype._initMeta=function(){var t=this.$options._meta;if(t)for(var e in t)At(this,e,t[e])}}function ii(t){function e(t,e){for(var i,n,s=e.attributes,r=0,o=s.length;o>r;r++)i=s[r].name,Ar.test(i)&&(i=i.replace(Ar,""),n=(t._scope||t._context).$eval(s[r].value,!0),n._fromParent=!0,t.$on(i.replace(Ar),n))}function i(t,e,i){if(i){var s,r,o,a;for(r in i)if(s=i[r],ki(s))for(o=0,a=s.length;a>o;o++)n(t,e,r,s[o]);else n(t,e,r,s)}}function n(t,e,i,s,r){var o=typeof s;if("function"===o)t[e](i,s,r);else if("string"===o){var a=t.$options.methods,l=a&&a[s];l&&t[e](i,l,r)}else s&&"object"===o&&n(t,e,i,s.handler,s)}function s(){this._isAttached||(this._isAttached=!0,this.$children.forEach(r))}function r(t){!t._isAttached&&R(t.$el)&&t._callHook("attached")}function o(){this._isAttached&&(this._isAttached=!1,this.$children.forEach(a))}function a(t){t._isAttached&&!R(t.$el)&&t._callHook("detached")}t.prototype._initEvents=function(){var t=this.$options;t._asComponent&&e(this,t.el),i(this,"$on",t.events),i(this,"$watch",t.watch)},t.prototype._initDOMHooks=function(){this.$on("hook:attached",s),this.$on("hook:detached",o)},t.prototype._callHook=function(t){this.$emit("pre-hook:"+t);var e=this.$options[t];if(e)for(var i=0,n=e.length;n>i;i++)e[i].call(this);this.$emit("hook:"+t)}}function ni(){}function si(t,e,i,n,s,r){this.vm=e,this.el=i,this.descriptor=t,this.name=t.name,this.expression=t.expression,this.arg=t.arg,this.modifiers=t.modifiers,this.filters=t.filters,this.literal=this.modifiers&&this.modifiers.literal,this._locked=!1,this._bound=!1,this._listeners=null,this._host=n,this._scope=s,this._frag=r}function ri(t){t.prototype._updateRef=function(t){var e=this.$options._ref;if(e){var i=(this._scope||this._context).$refs;t?i[e]===this&&(i[e]=null):i[e]=this}},t.prototype._compile=function(t){var e=this.$options,i=t;if(t=Ye(t,e),this._initElement(t),1!==t.nodeType||null===z(t,"v-pre")){var n,s=this._context&&this._context.$options,r=Ne(t,e,s),o=this.constructor;e._linkerCachable&&(n=o.linker,n||(n=o.linker=Pe(t,e)));var a=r(this,t,this._scope),l=n?n(this,t):Pe(t,e)(this,t);this._unlinkFn=function(){a(),l(!0)},e.replace&&Q(i,t),this._isCompiled=!0,this._callHook("compiled")}},t.prototype._initElement=function(t){t instanceof DocumentFragment?(this._isFragment=!0,this.$el=this._fragmentStart=t.firstChild,this._fragmentEnd=t.lastChild,3===this._fragmentStart.nodeType&&(this._fragmentStart.data=this._fragmentEnd.data=""),this._fragment=t):this.$el=t,this.$el.__vue__=this,this._callHook("beforeCompile")},t.prototype._bindDir=function(t,e,i,n,s){this._directives.push(new si(t,this,e,i,n,s))},t.prototype._destroy=function(t,e){if(this._isBeingDestroyed)return void(e||this._cleanup());var i,n,s=this,r=function(){!i||n||e||s._cleanup()};t&&this.$el&&(n=!0,this.$remove(function(){n=!1,r()})),this._callHook("beforeDestroy"),this._isBeingDestroyed=!0;var o,a=this.$parent;for(a&&!a._isBeingDestroyed&&(a.$children.$remove(this),this._updateRef(!0)),o=this.$children.length;o--;)this.$children[o].$destroy();for(this._propsUnlinkFn&&this._propsUnlinkFn(),this._unlinkFn&&this._unlinkFn(),o=this._watchers.length;o--;)this._watchers[o].teardown();this.$el&&(this.$el.__vue__=null),i=!0,r()},t.prototype._cleanup=function(){this._isDestroyed||(this._frag&&this._frag.children.$remove(this),this._data.__ob__&&this._data.__ob__.removeVm(this),this.$el=this.$parent=this.$root=this.$children=this._watchers=this._context=this._scope=this._directives=null,this._isDestroyed=!0,this._callHook("destroyed"),this.$off())}}function oi(t){t.prototype._applyFilters=function(t,e,i,n){var s,r,o,a,l,u,c,h,f;for(u=0,c=i.length;c>u;u++)if(s=i[u],r=_t(this.$options,"filters",s.name),r&&(r=n?r.write:r.read||r,"function"==typeof r)){if(o=n?[t,e]:[t],l=n?2:1,s.args)for(h=0,f=s.args.length;f>h;h++)a=s.args[h],o[h+l]=a.dynamic?this.$get(a.value):a.value;t=r.apply(this,o)}return t},t.prototype._resolveComponent=function(e,i){var n=_t(this.$options,"components",e);if(n)if(n.options)i(n);else if(n.resolved)i(n.resolved);else if(n.requested)n.pendingCallbacks.push(i);else{n.requested=!0;var s=n.pendingCallbacks=[i];n(function(e){_(e)&&(e=t.extend(e)),n.resolved=e;for(var i=0,r=s.length;r>i;i++)s[i](e)},function(t){})}}}function ai(t){function e(t){return new Function("return function "+d(t)+" (options) { this._init(options) }")()}t.util=xn,t.config=cn,t.set=i,t["delete"]=n,t.nextTick=Ii,t.compiler=kr,t.FragmentFactory=de,t.internalDirectives=pr,t.parsers={path:Bn,text:an,template:Js,directive:tn,expression:Zn},t.cid=0;var s=1;t.extend=function(t){t=t||{};var i=this,n=0===i.cid;if(n&&t._Ctor)return t._Ctor;var r=t.name||i.options.name,o=e(r||"VueComponent");return o.prototype=Object.create(i.prototype),o.prototype.constructor=o,o.cid=s++,o.options=bt(i.options,t),o["super"]=i,o.extend=i.extend,cn._assetTypes.forEach(function(t){o[t]=i[t]}),r&&(o.options.components[r]=o),n&&(t._Ctor=o),o},t.use=function(t){if(!t.installed){var e=m(arguments,1);return e.unshift(this),"function"==typeof t.install?t.install.apply(t,e):t.apply(null,e),t.installed=!0,this}},t.mixin=function(e){t.options=bt(t.options,e)},cn._assetTypes.forEach(function(e){t[e]=function(i,n){return n?("component"===e&&_(n)&&(n.name=i,n=t.extend(n)),this.options[e+"s"][i]=n,n):this.options[e+"s"][i]}})}function li(t){function e(t){return JSON.parse(JSON.stringify(t))}t.prototype.$get=function(t,e){
	var i=Rt(t);if(i){if(e&&!zt(t)){var n=this;return function(){n.$arguments=m(arguments);var t=i.get.call(n,n);return n.$arguments=null,t}}try{return i.get.call(this,this)}catch(s){}}},t.prototype.$set=function(t,e){var i=Rt(t,!0);i&&i.set&&i.set.call(this,this,e)},t.prototype.$delete=function(t){n(this._data,t)},t.prototype.$watch=function(t,e,i){var n,s=this;"string"==typeof t&&(n=O(t),t=n.expression);var r=new qt(s,t,e,{deep:i&&i.deep,sync:i&&i.sync,filters:n&&n.filters,user:!i||i.user!==!1});return i&&i.immediate&&e.call(s,r.value),function(){r.teardown()}},t.prototype.$eval=function(t,e){if(Pr.test(t)){var i=O(t),n=this.$get(i.expression,e);return i.filters?this._applyFilters(n,null,i.filters):n}return this.$get(t,e)},t.prototype.$interpolate=function(t){var e=M(t),i=this;return e?1===e.length?i.$eval(e[0].value)+"":e.map(function(t){return t.tag?i.$eval(t.value):t.value}).join(""):t},t.prototype.$log=function(t){var i=t?jt(this._data,t):this._data;if(i&&(i=e(i)),!t)for(var n in this.$options.computed)i[n]=e(this[n]);console.log(i)}}function ui(t){function e(t,e,n,s,r,o){e=i(e);var a=!R(e),l=s===!1||a?r:o,u=!a&&!t._isAttached&&!R(t.$el);return t._isFragment?(ot(t._fragmentStart,t._fragmentEnd,function(i){l(i,e,t)}),n&&n()):l(t.$el,e,t,n),u&&t._callHook("attached"),t}function i(t){return"string"==typeof t?document.querySelector(t):t}function n(t,e,i,n){e.appendChild(t),n&&n()}function s(t,e,i,n){U(t,e),n&&n()}function r(t,e,i){q(t),i&&i()}t.prototype.$nextTick=function(t){Ii(t,this)},t.prototype.$appendTo=function(t,i,s){return e(this,t,i,s,n,F)},t.prototype.$prependTo=function(t,e,n){return t=i(t),t.hasChildNodes()?this.$before(t.firstChild,e,n):this.$appendTo(t,e,n),this},t.prototype.$before=function(t,i,n){return e(this,t,i,n,s,L)},t.prototype.$after=function(t,e,n){return t=i(t),t.nextSibling?this.$before(t.nextSibling,e,n):this.$appendTo(t.parentNode,e,n),this},t.prototype.$remove=function(t,e){if(!this.$el.parentNode)return t&&t();var i=this._isAttached&&R(this.$el);i||(e=!1);var n=this,s=function(){i&&n._callHook("detached"),t&&t()};if(this._isFragment)at(this._fragmentStart,this._fragmentEnd,this,this._fragment,s);else{var o=e===!1?r:I;o(this.$el,this,s)}return this}}function ci(t){function e(t,e,n){var s=t.$parent;if(s&&n&&!i.test(e))for(;s;)s._eventsCount[e]=(s._eventsCount[e]||0)+n,s=s.$parent}t.prototype.$on=function(t,i){return(this._events[t]||(this._events[t]=[])).push(i),e(this,t,1),this},t.prototype.$once=function(t,e){function i(){n.$off(t,i),e.apply(this,arguments)}var n=this;return i.fn=e,this.$on(t,i),this},t.prototype.$off=function(t,i){var n;if(!arguments.length){if(this.$parent)for(t in this._events)n=this._events[t],n&&e(this,t,-n.length);return this._events={},this}if(n=this._events[t],!n)return this;if(1===arguments.length)return e(this,t,-n.length),this._events[t]=null,this;for(var s,r=n.length;r--;)if(s=n[r],s===i||s.fn===i){e(this,t,-1),n.splice(r,1);break}return this},t.prototype.$emit=function(t){var e="string"==typeof t;t=e?t:t.name;var i=this._events[t],n=e||!i;if(i){i=i.length>1?m(i):i;var s=e&&i.some(function(t){return t._fromParent});s&&(n=!1);for(var r=m(arguments,1),o=0,a=i.length;a>o;o++){var l=i[o],u=l.apply(this,r);u!==!0||s&&!l._fromParent||(n=!0)}}return n},t.prototype.$broadcast=function(t){var e="string"==typeof t;if(t=e?t:t.name,this._eventsCount[t]){var i=this.$children,n=m(arguments);e&&(n[0]={name:t,source:this});for(var s=0,r=i.length;r>s;s++){var o=i[s],a=o.$emit.apply(o,n);a&&o.$broadcast.apply(o,n)}return this}},t.prototype.$dispatch=function(t){var e=this.$emit.apply(this,arguments);if(e){var i=this.$parent,n=m(arguments);for(n[0]={name:t,source:this};i;)e=i.$emit.apply(i,n),i=e?i.$parent:null;return this}};var i=/^hook:/}function hi(t){function e(){this._isAttached=!0,this._isReady=!0,this._callHook("ready")}t.prototype.$mount=function(t){return this._isCompiled?void 0:(t=D(t),t||(t=document.createElement("div")),this._compile(t),this._initDOMHooks(),R(this.$el)?(this._callHook("attached"),e.call(this)):this.$once("hook:attached",e),this)},t.prototype.$destroy=function(t,e){this._destroy(t,e)},t.prototype.$compile=function(t,e,i,n){return Pe(t,this.$options,!0)(this,t,e,i,n)}}function fi(t){this._init(t)}function pi(t,e,i){return i=i?parseInt(i,10):0,e=l(e),"number"==typeof e?t.slice(i,i+e):t}function di(t,e,i){if(t=Or(t),null==e)return t;if("function"==typeof e)return t.filter(e);e=(""+e).toLowerCase();for(var n,s,r,o,a="in"===i?3:2,l=m(arguments,a).reduce(function(t,e){return t.concat(e)},[]),u=[],c=0,h=t.length;h>c;c++)if(n=t[c],r=n&&n.$value||n,o=l.length){for(;o--;)if(s=l[o],"$key"===s&&mi(n.$key,e)||mi(jt(r,s),e)){u.push(n);break}}else mi(n,e)&&u.push(n);return u}function vi(t,e,i){if(t=Or(t),!e)return t;var n=i&&0>i?-1:1;return t.slice().sort(function(t,i){return"$key"!==e&&(b(t)&&"$value"in t&&(t=t.$value),b(i)&&"$value"in i&&(i=i.$value)),t=b(t)?jt(t,e):t,i=b(i)?jt(i,e):i,t===i?0:t>i?n:-n})}function mi(t,e){var i;if(_(t)){var n=Object.keys(t);for(i=n.length;i--;)if(mi(t[n[i]],e))return!0}else if(ki(t)){for(i=t.length;i--;)if(mi(t[i],e))return!0}else if(null!=t)return t.toString().toLowerCase().indexOf(e)>-1}function gi(t,e,i){function n(t){!nt(t)||t.hasAttribute("v-if")||t.hasAttribute("v-for")||(t=oe(t)),t=re(t),s.appendChild(t)}for(var s=document.createDocumentFragment(),r=0,o=t.length;o>r;r++){var a=t[r];i&&!a.__v_selected?n(a):i||a.parentNode!==e||(a.__v_selected=!0,n(a))}return s}var bi=Object.prototype.hasOwnProperty,_i=/^\s?(true|false|-?[\d\.]+|'[^']*'|"[^"]*")\s?$/,yi=/-(\w)/g,xi=/([a-z\d])([A-Z])/g,wi=/(?:^|[-_\/])(\w)/g,Ci=Object.prototype.toString,$i="[object Object]",ki=Array.isArray,Ai="__proto__"in{},Pi="undefined"!=typeof window&&"[object Object]"!==Object.prototype.toString.call(window),Oi=Pi&&window.__VUE_DEVTOOLS_GLOBAL_HOOK__,Si=Pi&&navigator.userAgent.toLowerCase().indexOf("msie 9.0")>0,Ti=Pi&&navigator.userAgent.toLowerCase().indexOf("android")>0,Mi=void 0,ji=void 0,Ni=void 0,Ei=void 0;if(Pi&&!Si){var Fi=void 0===window.ontransitionend&&void 0!==window.onwebkittransitionend,Li=void 0===window.onanimationend&&void 0!==window.onwebkitanimationend;Mi=Fi?"WebkitTransition":"transition",ji=Fi?"webkitTransitionEnd":"transitionend",Ni=Li?"WebkitAnimation":"animation",Ei=Li?"webkitAnimationEnd":"animationend"}var Ii=function(){function t(){s=!1;var t=n.slice(0);n=[];for(var e=0;e<t.length;e++)t[e]()}var i,n=[],s=!1;if("undefined"!=typeof MutationObserver){var r=1,o=new MutationObserver(t),a=document.createTextNode(r);o.observe(a,{characterData:!0}),i=function(){r=(r+1)%2,a.data=r}}else{var l=Pi?window:"undefined"!=typeof e?e:{};i=l.setImmediate||setTimeout}return function(e,r){var o=r?function(){e.call(r)}:e;n.push(o),s||(s=!0,i(t,0))}}(),Bi=k.prototype;Bi.put=function(t,e){var i;this.size===this.limit&&(i=this.shift());var n=this.get(t,!0);return n||(n={key:t},this._keymap[t]=n,this.tail?(this.tail.newer=n,n.older=this.tail):this.head=n,this.tail=n,this.size++),n.value=e,i},Bi.shift=function(){var t=this.head;return t&&(this.head=this.head.newer,this.head.older=void 0,t.newer=t.older=void 0,this._keymap[t.key]=void 0,this.size--),t},Bi.get=function(t,e){var i=this._keymap[t];if(void 0!==i)return i===this.tail?e?i:i.value:(i.newer&&(i===this.head&&(this.head=i.newer),i.newer.older=i.older),i.older&&(i.older.newer=i.newer),i.newer=void 0,i.older=this.tail,this.tail&&(this.tail.newer=i),this.tail=i,e?i:i.value)};var Di,Ri,zi,Hi,Wi,Ui,Vi,qi,Ji,Qi,Gi,Ki,Yi=new k(1e3),Zi=/[^\s'"]+|'[^']*'|"[^"]*"/g,Xi=/^in$|^-?\d+/,tn=Object.freeze({parseDirective:O}),en=/[-.*+?^${}()|[\]\/\\]/g,nn=void 0,sn=void 0,rn=void 0,on=/[^|]\|[^|]/,an=Object.freeze({compileRegex:T,parseText:M,tokensToExp:j}),ln=["{{","}}"],un=["{{{","}}}"],cn=Object.defineProperties({debug:!1,silent:!1,async:!0,warnExpressionErrors:!0,convertAllProperties:!1,_delimitersChanged:!0,_assetTypes:["component","directive","elementDirective","filter","transition","partial"],_propBindingModes:{ONE_WAY:0,TWO_WAY:1,ONE_TIME:2},_maxUpdateCount:100},{delimiters:{get:function(){return ln},set:function(t){ln=t,T()},configurable:!0,enumerable:!0},unsafeDelimiters:{get:function(){return un},set:function(t){un=t,T()},configurable:!0,enumerable:!0}}),hn=void 0,fn=/^v-ref:/,pn=/^(div|p|span|img|a|b|i|br|ul|ol|li|h1|h2|h3|h4|h5|h6|code|pre|table|th|td|tr|form|label|input|select|option|nav|article|section|header|footer)$/,dn=/^(slot|partial|component)$/,vn=cn.optionMergeStrategies=Object.create(null);vn.data=function(t,e,i){return i?t||e?function(){var n="function"==typeof e?e.call(i):e,s="function"==typeof t?t.call(i):void 0;return n?pt(n,s):s}:void 0:e?"function"!=typeof e?t:t?function(){return pt(e.call(this),t.call(this))}:e:t},vn.el=function(t,e,i){if(i||!e||"function"==typeof e){var n=e||t;return i&&"function"==typeof n?n.call(i):n}},vn.init=vn.created=vn.ready=vn.attached=vn.detached=vn.beforeCompile=vn.compiled=vn.beforeDestroy=vn.destroyed=function(t,e){return e?t?t.concat(e):ki(e)?e:[e]:t},vn.paramAttributes=function(){},cn._assetTypes.forEach(function(t){vn[t+"s"]=dt}),vn.watch=vn.events=function(t,e){if(!e)return t;if(!t)return e;var i={};g(i,t);for(var n in e){var s=i[n],r=e[n];s&&!ki(s)&&(s=[s]),i[n]=s?s.concat(r):[r]}return i},vn.props=vn.methods=vn.computed=function(t,e){if(!e)return t;if(!t)return e;var i=Object.create(null);return g(i,t),g(i,e),i};var mn=function(t,e){return void 0===e?t:e},gn=Array.prototype,bn=Object.create(gn);["push","pop","shift","unshift","splice","sort","reverse"].forEach(function(t){var e=gn[t];y(bn,t,function(){for(var i=arguments.length,n=new Array(i);i--;)n[i]=arguments[i];var s,r=e.apply(this,n),o=this.__ob__;switch(t){case"push":s=n;break;case"unshift":s=n;break;case"splice":s=n.slice(2)}return s&&o.observeArray(s),o.dep.notify(),r})}),y(gn,"$set",function(t,e){return t>=this.length&&(this.length=Number(t)+1),this.splice(t,1,e)[0]}),y(gn,"$remove",function(t){if(this.length){var e=w(this,t);return e>-1?this.splice(e,1):void 0}});var _n=0;xt.target=null,xt.prototype.addSub=function(t){this.subs.push(t)},xt.prototype.removeSub=function(t){this.subs.$remove(t)},xt.prototype.depend=function(){xt.target.addDep(this)},xt.prototype.notify=function(){for(var t=m(this.subs),e=0,i=t.length;i>e;e++)t[e].update()};var yn=Object.getOwnPropertyNames(bn);wt.prototype.walk=function(t){for(var e=Object.keys(t),i=0,n=e.length;n>i;i++)this.convert(e[i],t[e[i]])},wt.prototype.observeArray=function(t){for(var e=0,i=t.length;i>e;e++)kt(t[e])},wt.prototype.convert=function(t,e){At(this.value,t,e)},wt.prototype.addVm=function(t){(this.vms||(this.vms=[])).push(t)},wt.prototype.removeVm=function(t){this.vms.$remove(t)};var xn=Object.freeze({defineReactive:At,set:i,del:n,hasOwn:s,isLiteral:r,isReserved:o,_toString:a,toNumber:l,toBoolean:u,stripQuotes:c,camelize:h,hyphenate:p,classify:d,bind:v,toArray:m,extend:g,isObject:b,isPlainObject:_,def:y,debounce:x,indexOf:w,cancellable:C,looseEqual:$,isArray:ki,hasProto:Ai,inBrowser:Pi,devtools:Oi,isIE9:Si,isAndroid:Ti,get transitionProp(){return Mi},get transitionEndEvent(){return ji},get animationProp(){return Ni},get animationEndEvent(){return Ei},nextTick:Ii,query:D,inDoc:R,getAttr:z,getBindAttr:H,hasBindAttr:W,before:U,after:V,remove:q,prepend:J,replace:Q,on:G,off:K,setClass:Y,addClass:Z,removeClass:X,extractContent:tt,trimNode:et,isTemplate:nt,createAnchor:st,findRef:rt,mapNodeRange:ot,removeNodeRange:at,mergeOptions:bt,resolveAsset:_t,assertAsset:yt,checkComponentAttr:lt,initProp:ct,assertProp:ht,coerceProp:ft,commonTagRE:pn,reservedTagRE:dn,get warn(){return hn}}),wn=0,Cn=new k(1e3),$n=0,kn=1,An=2,Pn=3,On=0,Sn=1,Tn=2,Mn=3,jn=4,Nn=5,En=6,Fn=7,Ln=8,In=[];In[On]={ws:[On],ident:[Mn,$n],"[":[jn],eof:[Fn]},In[Sn]={ws:[Sn],".":[Tn],"[":[jn],eof:[Fn]},In[Tn]={ws:[Tn],ident:[Mn,$n]},In[Mn]={ident:[Mn,$n],0:[Mn,$n],number:[Mn,$n],ws:[Sn,kn],".":[Tn,kn],"[":[jn,kn],eof:[Fn,kn]},In[jn]={"'":[Nn,$n],'"':[En,$n],"[":[jn,An],"]":[Sn,Pn],eof:Ln,"else":[jn,$n]},In[Nn]={"'":[jn,$n],eof:Ln,"else":[Nn,$n]},In[En]={'"':[jn,$n],eof:Ln,"else":[En,$n]};var Bn=Object.freeze({parsePath:Mt,getPath:jt,setPath:Nt}),Dn=new k(1e3),Rn="Math,Date,this,true,false,null,undefined,Infinity,NaN,isNaN,isFinite,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,parseInt,parseFloat",zn=new RegExp("^("+Rn.replace(/,/g,"\\b|")+"\\b)"),Hn="break,case,class,catch,const,continue,debugger,default,delete,do,else,export,extends,finally,for,function,if,import,in,instanceof,let,return,super,switch,throw,try,var,while,with,yield,enum,await,implements,package,proctected,static,interface,private,public",Wn=new RegExp("^("+Hn.replace(/,/g,"\\b|")+"\\b)"),Un=/\s/g,Vn=/\n/g,qn=/[\{,]\s*[\w\$_]+\s*:|('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*")|new |typeof |void /g,Jn=/"(\d+)"/g,Qn=/^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['.*?'\]|\[".*?"\]|\[\d+\]|\[[A-Za-z_$][\w$]*\])*$/,Gn=/[^\w$\.](?:[A-Za-z_$][\w$]*)/g,Kn=/^(?:true|false)$/,Yn=[],Zn=Object.freeze({parseExpression:Rt,isSimplePath:zt}),Xn=[],ts=[],es={},is={},ns=!1,ss=!1,rs=0;qt.prototype.addDep=function(t){var e=t.id;this.newDeps[e]||(this.newDeps[e]=t,this.deps[e]||(this.deps[e]=t,t.addSub(this)))},qt.prototype.get=function(){this.beforeGet();var t,e=this.scope||this.vm;try{t=this.getter.call(e,e)}catch(i){}return this.deep&&Jt(t),this.preProcess&&(t=this.preProcess(t)),this.filters&&(t=e._applyFilters(t,null,this.filters,!1)),this.postProcess&&(t=this.postProcess(t)),this.afterGet(),t},qt.prototype.set=function(t){var e=this.scope||this.vm;this.filters&&(t=e._applyFilters(t,this.value,this.filters,!0));try{this.setter.call(e,e,t)}catch(i){}var n=e.$forContext;if(n&&n.alias===this.expression){if(n.filters)return;n._withLock(function(){e.$key?n.rawValue[e.$key]=t:n.rawValue.$set(e.$index,t)})}},qt.prototype.beforeGet=function(){xt.target=this,this.newDeps=Object.create(null)},qt.prototype.afterGet=function(){xt.target=null;for(var t=Object.keys(this.deps),e=t.length;e--;){var i=t[e];this.newDeps[i]||this.deps[i].removeSub(this)}this.deps=this.newDeps},qt.prototype.update=function(t){this.lazy?this.dirty=!0:this.sync||!cn.async?this.run():(this.shallow=this.queued?t?this.shallow:!1:!!t,this.queued=!0,Vt(this))},qt.prototype.run=function(){if(this.active){var t=this.get();if(t!==this.value||(b(t)||this.deep)&&!this.shallow){var e=this.value;this.value=t;this.prevError;this.cb.call(this.vm,t,e)}this.queued=this.shallow=!1}},qt.prototype.evaluate=function(){var t=xt.target;this.value=this.get(),this.dirty=!1,xt.target=t},qt.prototype.depend=function(){for(var t=Object.keys(this.deps),e=t.length;e--;)this.deps[t[e]].depend()},qt.prototype.teardown=function(){if(this.active){this.vm._isBeingDestroyed||this.vm._vForRemoving||this.vm._watchers.$remove(this);for(var t=Object.keys(this.deps),e=t.length;e--;)this.deps[t[e]].removeSub(this);this.active=!1,this.vm=this.cb=this.value=null}};var os={bind:function(){var t=this.el;this.vm.$once("pre-hook:compiled",function(){t.removeAttribute("v-cloak")})}},as={bind:function(){}},ls=700,us=800,cs=850,hs=1100,fs=1500,ps=1500,ds=1750,vs=2e3,ms=2e3,gs=2100,bs={priority:fs,bind:function(){if(this.arg){var t=this.id=h(this.arg),e=(this._scope||this.vm).$els;s(e,t)?e[t]=this.el:At(e,t,this.el)}},unbind:function(){var t=(this._scope||this.vm).$els;t[this.id]===this.el&&(t[this.id]=null)}},_s=["-webkit-","-moz-","-ms-"],ys=["Webkit","Moz","ms"],xs=/!important;?$/,ws=Object.create(null),Cs=null,$s={deep:!0,update:function(t){"string"==typeof t?this.el.style.cssText=t:ki(t)?this.handleObject(t.reduce(g,{})):this.handleObject(t||{})},handleObject:function(t){var e,i,n=this.cache||(this.cache={});for(e in n)e in t||(this.handleSingle(e,null),delete n[e]);for(e in t)i=t[e],i!==n[e]&&(n[e]=i,this.handleSingle(e,i))},handleSingle:function(t,e){if(t=Qt(t))if(null!=e&&(e+=""),e){var i=xs.test(e)?"important":"";i&&(e=e.replace(xs,"").trim()),this.el.style.setProperty(t,e,i)}else this.el.style.removeProperty(t)}},ks="http://www.w3.org/1999/xlink",As=/^xlink:/,Ps=/^v-|^:|^@|^(?:is|transition|transition-mode|debounce|track-by|stagger|enter-stagger|leave-stagger)$/,Os=/^(?:value|checked|selected|muted)$/,Ss={value:"_value","true-value":"_trueValue","false-value":"_falseValue"},Ts={priority:cs,bind:function(){var t=this.arg,e=this.el.tagName;t||(this.deep=!0);var i=this.descriptor,n=i.interp;if(n){i.hasOneTime&&(this.expression=j(n,this._scope||this.vm)),(Ps.test(t)||"name"===t&&("PARTIAL"===e||"SLOT"===e))&&(this.el.removeAttribute(t),this.invalid=!0)}},update:function(t){if(!this.invalid){var e=this.arg;this.arg?this.handleSingle(e,t):this.handleObject(t||{})}},handleObject:$s.handleObject,handleSingle:function(t,e){var i=this.el,n=this.descriptor.interp;this.modifiers.camel&&(t=h(t)),!n&&Os.test(t)&&t in i&&(i[t]="value"===t&&null==e?"":e);var s=Ss[t];if(!n&&s){i[s]=e;var r=i.__v_model;r&&r.listener()}return"value"===t&&"TEXTAREA"===i.tagName?void i.removeAttribute(t):void(null!=e&&e!==!1?"class"===t?(i.__v_trans&&(e+=" "+i.__v_trans.id+"-transition"),Y(i,e)):As.test(t)?i.setAttributeNS(ks,t,e===!0?"":e):i.setAttribute(t,e===!0?"":e):i.removeAttribute(t))}},Ms={esc:27,tab:9,enter:13,space:32,"delete":[8,46],up:38,left:37,right:39,down:40},js={acceptStatement:!0,priority:ls,bind:function(){if("IFRAME"===this.el.tagName&&"load"!==this.arg){var t=this;this.iframeBind=function(){G(t.el.contentWindow,t.arg,t.handler,t.modifiers.capture)},this.on("load",this.iframeBind)}},update:function(t){if(this.descriptor.raw||(t=function(){}),"function"==typeof t){this.modifiers.stop&&(t=Yt(t)),this.modifiers.prevent&&(t=Zt(t)),this.modifiers.self&&(t=Xt(t));var e=Object.keys(this.modifiers).filter(function(t){return"stop"!==t&&"prevent"!==t});e.length&&(t=Kt(t,e)),this.reset(),this.handler=t,this.iframeBind?this.iframeBind():G(this.el,this.arg,this.handler,this.modifiers.capture)}},reset:function(){var t=this.iframeBind?this.el.contentWindow:this.el;this.handler&&K(t,this.arg,this.handler)},unbind:function(){this.reset()}},Ns={bind:function(){function t(){var t=i.checked;return t&&i.hasOwnProperty("_trueValue")?i._trueValue:!t&&i.hasOwnProperty("_falseValue")?i._falseValue:t}var e=this,i=this.el;this.getValue=function(){return i.hasOwnProperty("_value")?i._value:e.params.number?l(i.value):i.value},this.listener=function(){var n=e._watcher.value;if(ki(n)){var s=e.getValue();i.checked?w(n,s)<0&&n.push(s):n.$remove(s)}else e.set(t())},this.on("change",this.listener),i.hasAttribute("checked")&&(this.afterBind=this.listener)},update:function(t){var e=this.el;ki(t)?e.checked=w(t,this.getValue())>-1:e.hasOwnProperty("_trueValue")?e.checked=$(t,e._trueValue):e.checked=!!t}},Es={bind:function(){var t=this,e=this.el;this.forceUpdate=function(){t._watcher&&t.update(t._watcher.get())};var i=this.multiple=e.hasAttribute("multiple");this.listener=function(){var n=te(e,i);n=t.params.number?ki(n)?n.map(l):l(n):n,t.set(n)},this.on("change",this.listener);var n=te(e,i,!0);(i&&n.length||!i&&null!==n)&&(this.afterBind=this.listener),this.vm.$on("hook:attached",this.forceUpdate)},update:function(t){var e=this.el;e.selectedIndex=-1;for(var i,n,s=this.multiple&&ki(t),r=e.options,o=r.length;o--;)i=r[o],n=i.hasOwnProperty("_value")?i._value:i.value,i.selected=s?ee(t,n)>-1:$(t,n)},unbind:function(){this.vm.$off("hook:attached",this.forceUpdate)}},Fs={bind:function(){var t=this,e=this.el;this.getValue=function(){if(e.hasOwnProperty("_value"))return e._value;var i=e.value;return t.params.number&&(i=l(i)),i},this.listener=function(){t.set(t.getValue())},this.on("change",this.listener),e.hasAttribute("checked")&&(this.afterBind=this.listener)},update:function(t){this.el.checked=$(t,this.getValue())}},Ls={bind:function(){var t=this,e=this.el,i="range"===e.type,n=this.params.lazy,s=this.params.number,r=this.params.debounce,o=!1;if(Ti||i||(this.on("compositionstart",function(){o=!0}),this.on("compositionend",function(){o=!1,n||t.listener()})),this.focused=!1,i||n||(this.on("focus",function(){t.focused=!0}),this.on("blur",function(){t.focused=!1,(!t._frag||t._frag.inserted)&&t.rawListener()})),this.listener=this.rawListener=function(){if(!o&&t._bound){var n=s||i?l(e.value):e.value;t.set(n),Ii(function(){t._bound&&!t.focused&&t.update(t._watcher.value)})}},r&&(this.listener=x(this.listener,r)),this.hasjQuery="function"==typeof jQuery,this.hasjQuery){var a=jQuery.fn.on?"on":"bind";jQuery(e)[a]("change",this.listener),n||jQuery(e)[a]("input",this.listener)}else this.on("change",this.listener),n||this.on("input",this.listener);!n&&Si&&(this.on("cut",function(){Ii(t.listener)}),this.on("keyup",function(e){(46===e.keyCode||8===e.keyCode)&&t.listener()})),(e.hasAttribute("value")||"TEXTAREA"===e.tagName&&e.value.trim())&&(this.afterBind=this.listener)},update:function(t){this.el.value=a(t)},unbind:function(){var t=this.el;if(this.hasjQuery){var e=jQuery.fn.off?"off":"unbind";jQuery(t)[e]("change",this.listener),jQuery(t)[e]("input",this.listener)}}},Is={text:Ls,radio:Fs,select:Es,checkbox:Ns},Bs={priority:us,twoWay:!0,handlers:Is,params:["lazy","number","debounce"],bind:function(){this.checkFilters(),this.hasRead&&!this.hasWrite;var t,e=this.el,i=e.tagName;if("INPUT"===i)t=Is[e.type]||Is.text;else if("SELECT"===i)t=Is.select;else{if("TEXTAREA"!==i)return;t=Is.text}e.__v_model=this,t.bind.call(this),this.update=t.update,this._unbind=t.unbind},checkFilters:function(){var t=this.filters;if(t)for(var e=t.length;e--;){var i=_t(this.vm.$options,"filters",t[e].name);("function"==typeof i||i.read)&&(this.hasRead=!0),i.write&&(this.hasWrite=!0)}},unbind:function(){this.el.__v_model=null,this._unbind&&this._unbind()}},Ds={bind:function(){var t=this.el.nextElementSibling;t&&null!==z(t,"v-else")&&(this.elseEl=t)},update:function(t){this.apply(this.el,t),this.elseEl&&this.apply(this.elseEl,!t)},apply:function(t,e){function i(){t.style.display=e?"":"none"}R(t)?B(t,e?1:-1,i,this.vm):i()}},Rs=new k(1e3),zs=new k(1e3),Hs={efault:[0,"",""],legend:[1,"<fieldset>","</fieldset>"],tr:[2,"<table><tbody>","</tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"]};Hs.td=Hs.th=[3,"<table><tbody><tr>","</tr></tbody></table>"],Hs.option=Hs.optgroup=[1,'<select multiple="multiple">',"</select>"],Hs.thead=Hs.tbody=Hs.colgroup=Hs.caption=Hs.tfoot=[1,"<table>","</table>"],Hs.g=Hs.defs=Hs.symbol=Hs.use=Hs.image=Hs.text=Hs.circle=Hs.ellipse=Hs.line=Hs.path=Hs.polygon=Hs.polyline=Hs.rect=[1,'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:ev="http://www.w3.org/2001/xml-events"version="1.1">',"</svg>"];var Ws=/<([\w:]+)/,Us=/&#?\w+?;/,Vs=function(){if(Pi){var t=document.createElement("div");return t.innerHTML="<template>1</template>",!t.cloneNode(!0).firstChild.innerHTML}return!1}(),qs=function(){if(Pi){var t=document.createElement("textarea");return t.placeholder="t","t"===t.cloneNode(!0).value}return!1}(),Js=Object.freeze({cloneNode:re,parseTemplate:oe});ae.prototype.callHook=function(t){var e,i;for(e=0,i=this.childFrags.length;i>e;e++)this.childFrags[e].callHook(t);for(e=0,i=this.children.length;i>e;e++)t(this.children[e])},ae.prototype.beforeRemove=function(){var t,e;for(t=0,e=this.childFrags.length;e>t;t++)this.childFrags[t].beforeRemove(!1);for(t=0,e=this.children.length;e>t;t++)this.children[t].$destroy(!1,!0);var i=this.unlink.dirs;for(t=0,e=i.length;e>t;t++)i[t]._watcher&&i[t]._watcher.teardown()},ae.prototype.destroy=function(){this.parentFrag&&this.parentFrag.childFrags.$remove(this),this.node.__vfrag__=null,this.unlink()};var Qs=new k(5e3);de.prototype.create=function(t,e,i){var n=re(this.template);return new ae(this.linker,this.vm,n,t,e,i)};var Gs={priority:ms,bind:function(){var t=this.el;if(t.__vue__)this.invalid=!0;else{var e=t.nextElementSibling;e&&null!==z(e,"v-else")&&(q(e),this.elseFactory=new de(this.vm,e)),this.anchor=st("v-if"),Q(t,this.anchor),this.factory=new de(this.vm,t)}},update:function(t){this.invalid||(t?this.frag||this.insert():this.remove())},insert:function(){this.elseFrag&&(this.elseFrag.remove(),this.elseFrag=null),this.frag=this.factory.create(this._host,this._scope,this._frag),this.frag.before(this.anchor)},remove:function(){this.frag&&(this.frag.remove(),this.frag=null),this.elseFactory&&!this.elseFrag&&(this.elseFrag=this.elseFactory.create(this._host,this._scope,this._frag),this.elseFrag.before(this.anchor))},unbind:function(){this.frag&&this.frag.destroy(),this.elseFrag&&this.elseFrag.destroy()}},Ks=0,Ys={priority:vs,params:["track-by","stagger","enter-stagger","leave-stagger"],bind:function(){var t=this.expression.match(/(.*) in (.*)/);if(t){var e=t[1].match(/\((.*),(.*)\)/);e?(this.iterator=e[1].trim(),this.alias=e[2].trim()):this.alias=t[1].trim(),this.expression=t[2]}if(this.alias){this.id="__v-for__"+ ++Ks;var i=this.el.tagName;this.isOption=("OPTION"===i||"OPTGROUP"===i)&&"SELECT"===this.el.parentNode.tagName,this.start=st("v-for-start"),this.end=st("v-for-end"),Q(this.el,this.end),U(this.start,this.end),this.cache=Object.create(null),this.factory=new de(this.vm,this.el)}},update:function(t){this.diff(t),this.updateRef(),this.updateModel()},diff:function(t){var e,i,n,r,o,a,l=t[0],u=this.fromObject=b(l)&&s(l,"$key")&&s(l,"$value"),c=this.params.trackBy,h=this.frags,f=this.frags=new Array(t.length),p=this.alias,d=this.iterator,v=this.start,m=this.end,g=R(v),_=!h;for(e=0,i=t.length;i>e;e++)l=t[e],r=u?l.$key:null,o=u?l.$value:l,a=!b(o),n=!_&&this.getCachedFrag(o,e,r),n?(n.reused=!0,n.scope.$index=e,r&&(n.scope.$key=r),d&&(n.scope[d]=null!==r?r:e),(c||u||a)&&(n.scope[p]=o)):(n=this.create(o,p,e,r),n.fresh=!_),f[e]=n,_&&n.before(m);if(!_){var y=0,x=h.length-f.length;for(this.vm._vForRemoving=!0,e=0,i=h.length;i>e;e++)n=h[e],n.reused||(this.deleteCachedFrag(n),this.remove(n,y++,x,g));this.vm._vForRemoving=!1,this.vm._watchers=this.vm._watchers.filter(function(t){return t.active});var w,C,$,k=0;for(e=0,i=f.length;i>e;e++)n=f[e],w=f[e-1],C=w?w.staggerCb?w.staggerAnchor:w.end||w.node:v,n.reused&&!n.staggerCb?($=ve(n,v,this.id),$===w||$&&ve($,v,this.id)===w||this.move(n,C)):this.insert(n,k++,C,g),n.reused=n.fresh=!1}},create:function(t,e,i,n){var s=this._host,r=this._scope||this.vm,o=Object.create(r);o.$refs=Object.create(r.$refs),o.$els=Object.create(r.$els),o.$parent=r,o.$forContext=this,At(o,e,t),At(o,"$index",i),n?At(o,"$key",n):o.$key&&y(o,"$key",null),this.iterator&&At(o,this.iterator,null!==n?n:i);var a=this.factory.create(s,o,this._frag);return a.forId=this.id,this.cacheFrag(t,a,i,n),a},updateRef:function(){var t=this.descriptor.ref;if(t){var e,i=(this._scope||this.vm).$refs;this.fromObject?(e={},this.frags.forEach(function(t){e[t.scope.$key]=me(t)})):e=this.frags.map(me),i[t]=e}},updateModel:function(){if(this.isOption){var t=this.start.parentNode,e=t&&t.__v_model;e&&e.forceUpdate()}},insert:function(t,e,i,n){t.staggerCb&&(t.staggerCb.cancel(),t.staggerCb=null);var s=this.getStagger(t,e,null,"enter");if(n&&s){var r=t.staggerAnchor;r||(r=t.staggerAnchor=st("stagger-anchor"),r.__vfrag__=t),V(r,i);var o=t.staggerCb=C(function(){t.staggerCb=null,t.before(r),q(r)});setTimeout(o,s)}else t.before(i.nextSibling)},remove:function(t,e,i,n){if(t.staggerCb)return t.staggerCb.cancel(),void(t.staggerCb=null);var s=this.getStagger(t,e,i,"leave");if(n&&s){var r=t.staggerCb=C(function(){t.staggerCb=null,t.remove()});setTimeout(r,s)}else t.remove()},move:function(t,e){e.nextSibling||this.end.parentNode.appendChild(this.end),t.before(e.nextSibling,!1)},cacheFrag:function(t,e,i,n){var r,o=this.params.trackBy,a=this.cache,l=!b(t);n||o||l?(r=o?"$index"===o?i:t[o]:n||t,a[r]||(a[r]=e)):(r=this.id,s(t,r)?null===t[r]&&(t[r]=e):y(t,r,e)),e.raw=t},getCachedFrag:function(t,e,i){var n,s=this.params.trackBy,r=!b(t);if(i||s||r){var o=s?"$index"===s?e:t[s]:i||t;n=this.cache[o]}else n=t[this.id];return n&&(n.reused||n.fresh),n},deleteCachedFrag:function(t){var e=t.raw,i=this.params.trackBy,n=t.scope,r=n.$index,o=s(n,"$key")&&n.$key,a=!b(e);if(i||o||a){var l=i?"$index"===i?r:e[i]:o||e;this.cache[l]=null}else e[this.id]=null,t.raw=null},getStagger:function(t,e,i,n){n+="Stagger";var s=t.node.__v_trans,r=s&&s.hooks,o=r&&(r[n]||r.stagger);return o?o.call(t,e,i):e*parseInt(this.params[n]||this.params.stagger,10)},_preProcess:function(t){return this.rawValue=t,t},_postProcess:function(t){if(ki(t))return t;if(_(t)){for(var e,i=Object.keys(t),n=i.length,s=new Array(n);n--;)e=i[n],s[n]={$key:e,$value:t[e]};return s}return"number"!=typeof t||isNaN(t)||(t=ge(t)),t||[]},unbind:function(){if(this.descriptor.ref&&((this._scope||this.vm).$refs[this.descriptor.ref]=null),this.frags)for(var t,e=this.frags.length;e--;)t=this.frags[e],this.deleteCachedFrag(t),t.destroy()}},Zs={bind:function(){8===this.el.nodeType&&(this.nodes=[],this.anchor=st("v-html"),Q(this.el,this.anchor))},update:function(t){t=a(t),this.nodes?this.swap(t):this.el.innerHTML=t},swap:function(t){for(var e=this.nodes.length;e--;)q(this.nodes[e]);var i=oe(t,!0,!0);this.nodes=m(i.childNodes),U(i,this.anchor)}},Xs={bind:function(){this.attr=3===this.el.nodeType?"data":"textContent"},update:function(t){this.el[this.attr]=a(t)}},tr={text:Xs,html:Zs,"for":Ys,"if":Gs,show:Ds,model:Bs,on:js,bind:Ts,el:bs,ref:as,cloak:os},er=[],ir=!1,nr="transition",sr="animation",rr=Mi+"Duration",or=Ni+"Duration",ar=ye.prototype;ar.enter=function(t,e){this.cancelPending(),this.callHook("beforeEnter"),this.cb=e,Z(this.el,this.enterClass),t(),this.entered=!1,this.callHookWithCb("enter"),this.entered||(this.cancel=this.hooks&&this.hooks.enterCancelled,be(this.enterNextTick))},ar.enterNextTick=function(){this.justEntered=!0;var t=this;setTimeout(function(){t.justEntered=!1},17);var e=this.enterDone,i=this.getCssTransitionType(this.enterClass);this.pendingJsCb?i===nr&&X(this.el,this.enterClass):i===nr?(X(this.el,this.enterClass),this.setupCssCb(ji,e)):i===sr?this.setupCssCb(Ei,e):e()},ar.enterDone=function(){this.entered=!0,this.cancel=this.pendingJsCb=null,X(this.el,this.enterClass),this.callHook("afterEnter"),this.cb&&this.cb()},ar.leave=function(t,e){this.cancelPending(),this.callHook("beforeLeave"),this.op=t,this.cb=e,Z(this.el,this.leaveClass),this.left=!1,this.callHookWithCb("leave"),this.left||(this.cancel=this.hooks&&this.hooks.leaveCancelled,this.op&&!this.pendingJsCb&&(this.justEntered?this.leaveDone():be(this.leaveNextTick)))},ar.leaveNextTick=function(){var t=this.getCssTransitionType(this.leaveClass);if(t){var e=t===nr?ji:Ei;this.setupCssCb(e,this.leaveDone)}else this.leaveDone()},ar.leaveDone=function(){this.left=!0,this.cancel=this.pendingJsCb=null,this.op(),X(this.el,this.leaveClass),this.callHook("afterLeave"),this.cb&&this.cb(),this.op=null},ar.cancelPending=function(){this.op=this.cb=null;var t=!1;this.pendingCssCb&&(t=!0,K(this.el,this.pendingCssEvent,this.pendingCssCb),this.pendingCssEvent=this.pendingCssCb=null),this.pendingJsCb&&(t=!0,this.pendingJsCb.cancel(),this.pendingJsCb=null),t&&(X(this.el,this.enterClass),X(this.el,this.leaveClass)),this.cancel&&(this.cancel.call(this.vm,this.el),this.cancel=null)},ar.callHook=function(t){this.hooks&&this.hooks[t]&&this.hooks[t].call(this.vm,this.el)},ar.callHookWithCb=function(t){var e=this.hooks&&this.hooks[t];e&&(e.length>1&&(this.pendingJsCb=C(this[t+"Done"])),e.call(this.vm,this.el,this.pendingJsCb))},ar.getCssTransitionType=function(t){if(!(!ji||document.hidden||this.hooks&&this.hooks.css===!1||xe(this.el))){var e=this.type||this.typeCache[t];if(e)return e;var i=this.el.style,n=window.getComputedStyle(this.el),s=i[rr]||n[rr];if(s&&"0s"!==s)e=nr;else{var r=i[or]||n[or];r&&"0s"!==r&&(e=sr)}return e&&(this.typeCache[t]=e),e}},ar.setupCssCb=function(t,e){this.pendingCssEvent=t;var i=this,n=this.el,s=this.pendingCssCb=function(r){r.target===n&&(K(n,t,s),i.pendingCssEvent=i.pendingCssCb=null,!i.pendingJsCb&&e&&e())};G(n,t,s)};var lr={priority:hs,update:function(t,e){var i=this.el,n=_t(this.vm.$options,"transitions",t);t=t||"v",i.__v_trans=new ye(i,t,n,this.el.__vue__||this.vm),e&&X(i,e+"-transition"),Z(i,t+"-transition")}},ur=cn._propBindingModes,cr={bind:function(){var t=this.vm,e=t._context,i=this.descriptor.prop,n=i.path,s=i.parentPath,r=i.mode===ur.TWO_WAY,o=this.parentWatcher=new qt(e,s,function(e){
	e=ft(i,e),ht(i,e)&&(t[n]=e)},{twoWay:r,filters:i.filters,scope:this._scope});if(ct(t,i,o.value),r){var a=this;t.$once("pre-hook:created",function(){a.childWatcher=new qt(t,n,function(t){o.set(t)},{sync:!0})})}},unbind:function(){this.parentWatcher.teardown(),this.childWatcher&&this.childWatcher.teardown()}},hr={priority:ps,params:["keep-alive","transition-mode","inline-template"],bind:function(){this.el.__vue__||(this.keepAlive=this.params.keepAlive,this.keepAlive&&(this.cache={}),this.params.inlineTemplate&&(this.inlineTemplate=tt(this.el,!0)),this.pendingComponentCb=this.Component=null,this.pendingRemovals=0,this.pendingRemovalCb=null,this.anchor=st("v-component"),Q(this.el,this.anchor),this.el.removeAttribute("is"),this.descriptor.ref&&this.el.removeAttribute("v-ref:"+p(this.descriptor.ref)),this.literal&&this.setComponent(this.expression))},update:function(t){this.literal||this.setComponent(t)},setComponent:function(t,e){if(this.invalidatePending(),t){var i=this;this.resolveComponent(t,function(){i.mountComponent(e)})}else this.unbuild(!0),this.remove(this.childVM,e),this.childVM=null},resolveComponent:function(t,e){var i=this;this.pendingComponentCb=C(function(n){i.ComponentName=n.options.name||t,i.Component=n,e()}),this.vm._resolveComponent(t,this.pendingComponentCb)},mountComponent:function(t){this.unbuild(!0);var e=this,i=this.Component.options.activate,n=this.getCached(),s=this.build();i&&!n?(this.waitingFor=s,i.call(s,function(){e.waitingFor===s&&(e.waitingFor=null,e.transition(s,t))})):(n&&s._updateRef(),this.transition(s,t))},invalidatePending:function(){this.pendingComponentCb&&(this.pendingComponentCb.cancel(),this.pendingComponentCb=null)},build:function(t){var e=this.getCached();if(e)return e;if(this.Component){var i={name:this.ComponentName,el:re(this.el),template:this.inlineTemplate,parent:this._host||this.vm,_linkerCachable:!this.inlineTemplate,_ref:this.descriptor.ref,_asComponent:!0,_isRouterView:this._isRouterView,_context:this.vm,_scope:this._scope,_frag:this._frag};t&&g(i,t);var n=new this.Component(i);return this.keepAlive&&(this.cache[this.Component.cid]=n),n}},getCached:function(){return this.keepAlive&&this.cache[this.Component.cid]},unbuild:function(t){this.waitingFor&&(this.waitingFor.$destroy(),this.waitingFor=null);var e=this.childVM;return!e||this.keepAlive?void(e&&e._updateRef(!0)):void e.$destroy(!1,t)},remove:function(t,e){var i=this.keepAlive;if(t){this.pendingRemovals++,this.pendingRemovalCb=e;var n=this;t.$remove(function(){n.pendingRemovals--,i||t._cleanup(),!n.pendingRemovals&&n.pendingRemovalCb&&(n.pendingRemovalCb(),n.pendingRemovalCb=null)})}else e&&e()},transition:function(t,e){var i=this,n=this.childVM;switch(this.childVM=t,i.params.transitionMode){case"in-out":t.$before(i.anchor,function(){i.remove(n,e)});break;case"out-in":i.remove(n,function(){t.$before(i.anchor,e)});break;default:i.remove(n),t.$before(i.anchor,e)}},unbind:function(){if(this.invalidatePending(),this.unbuild(),this.cache){for(var t in this.cache)this.cache[t].$destroy();this.cache=null}}},fr={deep:!0,update:function(t){t&&"string"==typeof t?this.handleObject(we(t)):_(t)?this.handleObject(t):ki(t)?this.handleArray(t):this.cleanup()},handleObject:function(t){this.cleanup(t);for(var e=this.prevKeys=Object.keys(t),i=0,n=e.length;n>i;i++){var s=e[i];t[s]?Z(this.el,s):X(this.el,s)}},handleArray:function(t){this.cleanup(t);for(var e=0,i=t.length;i>e;e++)t[e]&&Z(this.el,t[e]);this.prevKeys=t.slice()},cleanup:function(t){if(this.prevKeys)for(var e=this.prevKeys.length;e--;){var i=this.prevKeys[e];!i||t&&Ce(t,i)||X(this.el,i)}}},pr={style:$s,"class":fr,component:hr,prop:cr,transition:lr},dr=cn._propBindingModes,vr={},mr=/^[$_a-zA-Z]+[\w$]*$/,gr=/^v-bind:|^:/,br=/^v-on:|^@/,_r=/^v-([^:]+)(?:$|:(.*)$)/,yr=/\.[^\.]+/g,xr=/^(v-bind:|:)?transition$/,wr=["for","if"],Cr=1e3;Ve.terminal=!0;var $r=/[^\w\-:\.]/,kr=Object.freeze({compile:Pe,compileAndLinkProps:je,compileRoot:Ne,terminalDirectives:wr,transclude:Ye}),Ar=/^v-on:|^@/;si.prototype._bind=function(){var t=this.name,e=this.descriptor;if(("cloak"!==t||this.vm._isCompiled)&&this.el&&this.el.removeAttribute){var i=e.attr||"v-"+t;this.el.removeAttribute(i)}var n=e.def;if("function"==typeof n?this.update=n:g(this,n),this._setupParams(),this.bind&&this.bind(),this._bound=!0,this.literal)this.update&&this.update(e.raw);else if((this.expression||this.modifiers)&&(this.update||this.twoWay)&&!this._checkStatement()){var s=this;this.update?this._update=function(t,e){s._locked||s.update(t,e)}:this._update=ni;var r=this._preProcess?v(this._preProcess,this):null,o=this._postProcess?v(this._postProcess,this):null,a=this._watcher=new qt(this.vm,this.expression,this._update,{filters:this.filters,twoWay:this.twoWay,deep:this.deep,preProcess:r,postProcess:o,scope:this._scope});this.afterBind?this.afterBind():this.update&&this.update(a.value)}},si.prototype._setupParams=function(){if(this.params){var t=this.params;this.params=Object.create(null);for(var e,i,n,s=t.length;s--;)e=t[s],n=h(e),i=H(this.el,e),null!=i?this._setupParamWatcher(n,i):(i=z(this.el,e),null!=i&&(this.params[n]=""===i?!0:i))}},si.prototype._setupParamWatcher=function(t,e){var i=this,n=!1,s=(this._scope||this.vm).$watch(e,function(e,s){if(i.params[t]=e,n){var r=i.paramWatchers&&i.paramWatchers[t];r&&r.call(i,e,s)}else n=!0},{immediate:!0,user:!1});(this._paramUnwatchFns||(this._paramUnwatchFns=[])).push(s)},si.prototype._checkStatement=function(){var t=this.expression;if(t&&this.acceptStatement&&!zt(t)){var e=Rt(t).get,i=this._scope||this.vm,n=function(t){i.$event=t,e.call(i,i),i.$event=null};return this.filters&&(n=i._applyFilters(n,null,this.filters)),this.update(n),!0}},si.prototype.set=function(t){this.twoWay&&this._withLock(function(){this._watcher.set(t)})},si.prototype._withLock=function(t){var e=this;e._locked=!0,t.call(e),Ii(function(){e._locked=!1})},si.prototype.on=function(t,e,i){G(this.el,t,e,i),(this._listeners||(this._listeners=[])).push([t,e])},si.prototype._teardown=function(){if(this._bound){this._bound=!1,this.unbind&&this.unbind(),this._watcher&&this._watcher.teardown();var t,e=this._listeners;if(e)for(t=e.length;t--;)K(this.el,e[t][0],e[t][1]);var i=this._paramUnwatchFns;if(i)for(t=i.length;t--;)i[t]();this.vm=this.el=this._watcher=this._listeners=null}};var Pr=/[^|]\|[^|]/;Pt(fi),ei(fi),ii(fi),ri(fi),oi(fi),ai(fi),li(fi),ui(fi),ci(fi),hi(fi);var Or=Ys._postProcess,Sr=/(\d{3})(?=\d)/g,Tr={orderBy:vi,filterBy:di,limitBy:pi,json:{read:function(t,e){return"string"==typeof t?t:JSON.stringify(t,null,Number(e)||2)},write:function(t){try{return JSON.parse(t)}catch(e){return t}}},capitalize:function(t){return t||0===t?(t=t.toString(),t.charAt(0).toUpperCase()+t.slice(1)):""},uppercase:function(t){return t||0===t?t.toString().toUpperCase():""},lowercase:function(t){return t||0===t?t.toString().toLowerCase():""},currency:function(t,e){if(t=parseFloat(t),!isFinite(t)||!t&&0!==t)return"";e=null!=e?e:"$";var i=Math.abs(t).toFixed(2),n=i.slice(0,-3),s=n.length%3,r=s>0?n.slice(0,s)+(n.length>3?",":""):"",o=i.slice(-3),a=0>t?"-":"";return e+a+r+n.slice(s).replace(Sr,"$1,")+o},pluralize:function(t){var e=m(arguments,1);return e.length>1?e[t%10-1]||e[e.length-1]:e[0]+(1===t?"":"s")},debounce:function(t,e){return t?(e||(e=300),x(t,e)):void 0}},Mr={priority:ds,params:["name"],paramWatchers:{name:function(t){Gs.remove.call(this),t&&this.insert(t)}},bind:function(){this.anchor=st("v-partial"),Q(this.el,this.anchor),this.insert(this.params.name)},insert:function(t){var e=_t(this.vm.$options,"partials",t);e&&(this.factory=new de(this.vm,e),Gs.insert.call(this))},unbind:function(){this.frag&&this.frag.destroy()}},jr={priority:gs,bind:function(){var t=this.vm,e=t.$options._content;if(!e)return void this.fallback();var i=t._context,n=this.params&&this.params.name;if(n){var s='[slot="'+n+'"]',r=e.querySelectorAll(s);r.length?this.tryCompile(gi(r,e),i,t):this.fallback()}else this.tryCompile(gi(e.childNodes,e,!0),i,t)},tryCompile:function(t,e,i){t.hasChildNodes()?this.compile(t,e,i):this.fallback()},compile:function(t,e,i){if(t&&e){if(this.el.hasChildNodes()&&1===t.childNodes.length&&1===t.childNodes[0].nodeType&&t.childNodes[0].hasAttribute("v-if")){var n=document.createElement("template");n.setAttribute("v-else",""),n.innerHTML=this.el.innerHTML,t.appendChild(n)}var s=i?i._scope:this._scope;this.unlink=e.$compile(t,i,s,this._frag)}t?Q(this.el,t):q(this.el)},fallback:function(){this.compile(tt(this.el,!0),this.vm)},unbind:function(){this.unlink&&this.unlink()}},Nr=g(g({},jr),{priority:jr.priority+1,params:["name"]}),Er={slot:jr,_namedSlot:Nr,partial:Mr};fi.version="1.0.16",fi.options={directives:tr,elementDirectives:Er,filters:Tr,transitions:{},components:{},partials:{},replace:!0},Oi&&Oi.emit("init",fi),t.exports=fi}).call(e,function(){return this}())},function(t,e,i){t.exports=i(63),t.exports.__esModule&&(t.exports=t.exports["default"]),("function"==typeof t.exports?t.exports.options:t.exports).template=i(105)},,,,,function(t,e,i){"use strict";var n=i(16),s=i(15),r=i(77),o=i(6).util;t.exports={mixins:[r],props:{dropup:{type:Boolean,"default":!1},dropdown:{type:Boolean,"default":!0},isShow:{type:Function}},created:function(){this.dropup&&(this.classes.dropup=!0),this.dropdown&&(this.classes.dropdown=!1)},ready:function(){var t=this;o.on(window,"click",function(e){t.open&&!t.$el.nextSibling.contains(e.target)&&t.toggleOpen()})},beforeDestroy:function(){o.off(window,"click")},data:function(){return{open:!1,classes:{dropup:!1,dropdown:!0,open:!1}}},methods:{toggleOpen:function(t){t&&t.preventDefault(),this.open=!this.open,this.classes.open=this.open,this.isShow&&this.isShow(this.open)}},components:{Button:s,ButtonGroup:n}}},function(t,e){"use strict";t.exports={props:{placement:{type:String,"default":"top"},show:{type:Boolean,"default":!1}},data:function(){return{classes:[]}},created:function(){this.tag&&this.classes.push(this.tag),this.show&&Array.prototype.push.apply(this.classes,[this.placement,"fade","in","show"])},computed:{bPlacement:{get:function(){return this.placement},set:function(t){this.placement=t}}},methods:{fadeIn:function(){this.classes.push("fade")},animateIn:function(){this.classes.push(this.placement),this.classes.push("in")}},watch:{show:function(t,e){t||this.classes.splice(1),t&&this.classes.push("show")}}}},function(t,e,i){"use strict";var n=i(6),s=i(78);t.exports={props:{trigger:{type:String,"default":"hover"},placement:{type:String,"default":"top"},content:{type:String,"default":"",required:!0}},data:function(){return{show:!1,tipPosition:{}}},ready:function(){var t=this.$children[1].$el;switch(this.trigger){case"hover":t.addEventListener("mouseover",this.toggle),t.addEventListener("mouseout",this.toggle);break;case"click":t.addEventListener("click",this.toggle);break;default:t.addEventListener("focus",this.toggle),t.addEventListener("blur",this.toggle)}},methods:{toggle:function(t){var e=this;e.show=!e.show,n.nextTick(function(){if(e.show){var t=e.$children[1],i=e.$refs[e.tag]||e.$children[1],n=new s(t.$el),r=n.getPosition();i.fadeIn();var o=new s(i.$el),a=o.getPosition();e.placement="top"===e.placement&&a.height>r.top?"bottom":"bottom"===e.placement&&a.height>r.bottom?"top":"left"===e.placement&&a.width>r.left?"right":"right"===e.placement&&a.width>r.right?"left":e.placement,i.bPlacement!==e.placement&&(i.bPlacement=e.placement),e.tipPosition="top"===e.placement?{left:Math.round(r.left-Math.abs(a.width-r.width)/2)+"px",top:r.top-r.height+"px"}:"bottom"===e.placement?{left:Math.round(r.left-Math.abs(a.width-r.width)/2)+"px",top:r.top+r.height+"px"}:"left"===e.placement?{left:Math.abs(r.left-a.width)+"px",top:Math.round(r.top+(r.height-a.height)/2)+"px"}:{left:r.left+a.width+"px",top:Math.round(r.top+(r.height-a.height)/2)+"px"},i.animateIn()}})}}}},function(t,e,i){t.exports=i(51),t.exports.__esModule&&(t.exports=t.exports["default"]),("function"==typeof t.exports?t.exports.options:t.exports).template=i(93)},function(t,e,i){t.exports=i(52),t.exports.__esModule&&(t.exports=t.exports["default"]),("function"==typeof t.exports?t.exports.options:t.exports).template=i(94)},function(t,e,i){t.exports=i(62),t.exports.__esModule&&(t.exports=t.exports["default"]),("function"==typeof t.exports?t.exports.options:t.exports).template=i(104)},function(t,e,i){t.exports=i(67),t.exports.__esModule&&(t.exports=t.exports["default"]),("function"==typeof t.exports?t.exports.options:t.exports).template=i(109)},function(t,e,i){t.exports=i(73),t.exports.__esModule&&(t.exports=t.exports["default"]),("function"==typeof t.exports?t.exports.options:t.exports).template=i(115)},function(t,e,i){i(86),t.exports=i(75),t.exports.__esModule&&(t.exports=t.exports["default"]),("function"==typeof t.exports?t.exports.options:t.exports).template=i(117)},,,,,,,,,,,,,,,,,,,,,,,,,,,function(t,e,i){"use strict";function n(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var s=i(1),r=n(s);e["default"]={mixins:[r["default"]],data:function(){return{tag:"alert",classes:{}}}}},function(t,e,i){"use strict";function n(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var s=i(2),r=n(s);e["default"]={mixins:[r["default"]],props:{onClick:{type:Function,"default":null}},methods:{clickHandle:function(t){this.href||t.preventDefault(),this.onClick&&this.onClick(t)}}}},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e["default"]={}},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e["default"]={props:{active:{type:Boolean,"default":!1},href:{type:String,"default":null}},data:function(){return{classes:{}}},created:function(){this.active&&(this.classes.active=this.active)}}},function(t,e,i){"use strict";function n(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var s=i(1),r=n(s);e["default"]={mixins:[r["default"]],props:{type:{type:String,"default":"button"},onClick:{type:Function,"default":null}},data:function(){return{tag:"btn",classes:{}}}}},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e["default"]={props:{bsSize:{type:String},align:{type:String}},computed:{bSize:function(){return this.bsSize||null},bAlign:function(){return this.align||null}},created:function(){this.bAlign&&(this.classes+=" btn-group-"+this.bAlign),this.bSize&&(this.classes+=" btn-group-"+this.bSize)},data:function(){return{classes:"btn-group"}}}},function(t,e,i){"use strict";function n(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var s=i(6),r=n(s),o=i(79),a=n(o);e["default"]={props:{interval:{type:Number,"default":3e3},controls:{type:Boolean,"default":!0},indicators:{type:Boolean,"default":!0},pauseOnHover:{type:Boolean,"default":!0},slide:{type:Boolean,"default":!0}},data:function(){return{activeIndex:0,timeout:null,isPause:!1,count:0}},ready:function(){var t=this;if(!(this.$children.length<1)){var e=this.$children;e.forEach(function(e,i){i===t.activeIndex&&e.setActive(),t.count++}),this.waitForNext()}},computed:{items:function(){return this.$children}},methods:{waitForNext:function(){!this.isPause&&this.slide&&this.count>0&&(this.timeout=setTimeout(this.next,this.interval))},prev:function(t){t&&t.preventDefault();var e=this.activeIndex-1;0>e&&(e=this.count-1),this.handleSelect(e,"prev")},next:function(t){t&&t.preventDefault();var e=this.activeIndex+1;e>=this.count&&(e=0),this.handleSelect(e,"next")},pause:function(){this.isPause||(this.isPause=!0,this.timeout&&clearTimeout(this.timeout))},play:function(){this.isPause=!1,this.waitForNext()},getDirection:function(t){return"prev"===t?"right":"left"},handleSelect:function(t,e){clearTimeout(this.timeout);var i=this,n=i.activeIndex,s=i.getDirection(e),o=i.items[n],l=i.items[t];l.AnimatingIn(e),r["default"].nextTick(function(){l.$el.offsetWidth,o.animating(s),l.animating(s)}),a["default"].addEndEventListener(o.$el,function(){o&&(o.animateOuted(),o=null)}),a["default"].addEndEventListener(l.$el,function(){l&&(l.animatedIn(e,s),i.waitForNext(),l=null)}),i.activeIndex=t}},destroyed:function(){clearTimeout(this.timeout)}}},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e["default"]={data:function(){return{type:"next",classes:[]}},methods:{setActive:function(){this.classes.push("active")},AnimatingIn:function(t){this.classes.push(t)},animating:function(t){this.classes.push(t)},animateOuted:function(){this.classes=[]},animatedIn:function(t,e){this.classes.splice(0,2,"active")}}}},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e["default"]={props:{xs:{type:String},sm:{type:String},md:{type:String},lg:{type:String}},data:function(){return{classes:{}}},created:function(){this.xs&&(this.classes["col-xs-"+this.xs]=!0),this.sm&&(this.classes["col-sm-"+this.sm]=!0),this.md&&(this.classes["col-md-"+this.md]=!0),this.lg&&(this.classes["col-lg-"+this.lg]=!0)}}},function(t,e,i){"use strict";function n(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var s=i(12),r=n(s);e["default"]={mixins:[r["default"]]}},function(t,e,i){"use strict";function n(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var s=i(1),r=n(s);e["default"]={mixins:[r["default"]],props:{layout:{type:Object}},data:function(){return{tag:"form",classes:{}}},computed:{formInputs:function(){return this.$children}},ready:function(){var t=this;"horizontal"===this.bsStyle&&!function(){var e=t.formInputs,i=t.layout,n=[],s=[];i&&(i.md&&(n.push("col-md-"+i.md.split(",")[0]),s.push("col-md-"+i.md.split(",")[1])),i.sm&&(n.push("col-sm-"+i.sm.split(",")[0]),s.push("col-sm-"+i.sm.split(",")[1])),i.xs&&(n.push("col-xs-"+i.xs.split(",")[0]),s.push("col-xs-"+i.xs.split(",")[1]))),n.push("control-label"),e.forEach(function(t){t.setHorizontalLayout&&t.setHorizontalLayout({lblClass:n,iptClass:s})})}()}}},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e["default"]={props:{type:{type:String,"default":"text"},label:{type:String,required:!0},placeholder:{type:String,"default":""},model:{type:String,"default":"",twoWay:!0}},data:function(){return{lblClass:[],iptClass:[],horizontal:!1}},methods:{setHorizontalLayout:function(t){this.horizontal=!0,this.lblClass=t.lblClass,this.iptClass=t.iptClass}}}},function(t,e,i){"use strict";function n(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var s=i(3),r=n(s),o=i(2),a=n(o),l=i(1),u=n(l);e["default"]={mixins:[a["default"],u["default"]],data:function(){return{tag:"label",classes:{}}},components:{Anchor:r["default"]}}},function(t,e,i){"use strict";function n(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var s=i(3),r=n(s),o=i(2),a=n(o);e["default"]={mixins:[a["default"]],components:{Anchor:r["default"]}}},function(t,e,i){"use strict";function n(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var s=i(131),r=n(s),o={props:{title:{type:String,required:!0},bsSize:{type:String},isShow:{type:Boolean,"default":!1},onBeforeShow:{type:Function},onAfterShow:{type:Function},onBeforeHide:{type:Function},onAfterHide:{type:Function}},data:function(){return{dialogClasses:{"modal-dialog":!0},modalClasses:[]}},computed:{bSize:function(){return this.size||null}},watch:{isShow:function(t){t?(this.onBeforeShow&&this.onBeforeShow(),this.showin(),this.onAfterShow&&this.onAfterShow()):(this.onBeforeHide&&this.onBeforeHide(),this.showout(),this.onAfterHide&&this.onAfterHide())}},created:function(){this.bSize&&(this.dialogClasses["modal-"+this.bSize]=this.bSize)},methods:{showin:function(){var t=this;t.modalClasses.push("show"),setTimeout(function(){t.modalClasses.push("in")})},showout:function(){this.$set("modalClasses",[])}},components:{Overlay:r["default"]}};e["default"]=o},function(t,e,i){"use strict";function n(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var s=i(1),r=n(s);e["default"]={mixins:[r["default"]],data:function(){return{tag:"nav",classes:{}}}}},function(t,e,i){"use strict";function n(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var s=i(3),r=n(s),o=i(2),a=n(o);e["default"]={mixins:[a["default"]],props:{disabled:{type:Boolean,"default":!1}},components:{Anchor:r["default"]}}},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e["default"]={props:{show:{type:Boolean,"default":!1}},data:function(){return{isShow:{"in":!1}}},watch:{show:function(t){this.isShow["in"]=t}}}},function(t,e,i){"use strict";function n(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var s=i(80),r=n(s),o=i(7),a=n(o),l=i(1),u=n(l),c=function h(t,e,i,n){(0,r["default"])(this,h),this.name=t,this.num=e||t,this.active=i,this.disabled=n};e["default"]={mixins:[u["default"]],props:{activePage:{type:Number,"default":1,validator:function(t){return t>0}},items:{type:Number,required:!0,validator:function(t){return t>0}},maxButtons:{type:Number,"default":5},ellipsis:{type:Boolean,"default":!0},onSelect:{type:Function}},data:function(){return{tag:"pagination",classes:{},pages:[]}},computed:{bPage:{get:function(){return this.pages},set:function(t){this.pages.push(t)}}},created:function(){this.items&&this.renderPageNums()},methods:{createPagerInstance:function(t,e){var i=arguments.length<=2||void 0===arguments[2]?!1:arguments[2],n=arguments.length<=3||void 0===arguments[3]?!1:arguments[3];return new c(t,e,i,n)},renderPageNums:function(){this.bPage.length>0&&(this.pages=[]),1===this.activePage?(this.bPage=this.createPagerInstance("首页",1,!1,!0),this.bPage=this.createPagerInstance("上一页","prev",!1,!0)):(this.bPage=this.createPagerInstance("首页",1),this.bPage=this.createPagerInstance("上一页","prev"));var t=1;if(this.items<=this.maxButtons||this.activePage<=Math.ceil(this.maxButtons/2)){for(;this.items>=t&&t<=this.maxButtons;)this.bPage=this.createPagerInstance(t),t++;this.ellipsis&&this.items>this.maxButtons&&(this.bPage=this.createPagerInstance("...","ellipsis",!1,!0))}else{var e=Math.floor(this.maxButtons/2),i=this.maxButtons-e-1,n=Math.abs(this.activePage-e),s=this.activePage+1;if(this.ellipsis&&(this.bPage=this.createPagerInstance("...","ellipsis",!1,!0)),this.items-this.activePage<=i)for(t=this.items-this.maxButtons+1;t<=this.items;)this.bPage=this.createPagerInstance(t++);else{for(;e>=t;)this.bPage=this.createPagerInstance(n++),t++;for(t=1,this.bPage=this.createPagerInstance(this.activePage);i>=t;)this.bPage=this.createPagerInstance(s++),t++;this.ellipsis&&(this.bPage=this.createPagerInstance("...","ellipsis",!1,!0))}}this.activePage===this.items?(this.bPage=this.createPagerInstance("下一页","next",!1,!0),this.bPage=this.createPagerInstance("末页",this.items,!1,!0)):(this.bPage=this.createPagerInstance("下一页","next"),this.bPage=this.createPagerInstance("末页",this.items))}},watch:{activePage:function(t,e){this.renderPageNums()},items:function(t){t&&this.renderPageNums()}},components:{NavItem:a["default"]}}},function(t,e,i){"use strict";function n(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var s=i(1),r=n(s);e["default"]={mixins:[r["default"]],data:function(){return{tag:"panel",classes:{}}}}},function(t,e,i){"use strict";function n(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var s=i(13),r=n(s);e["default"]={mixins:[r["default"]],props:{title:{type:String,"default":""}},data:function(){return{tag:"popover",arrowStyle:{}}}}},function(t,e,i){"use strict";function n(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var s=i(18),r=n(s),o=i(14),a=n(o);e["default"]={mixins:[a["default"]],props:{title:{type:String,"default":""}},data:function(){return{tag:"popover"}},components:{Popover:r["default"]}}},function(t,e,i){"use strict";function n(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var s=i(1),r=n(s);e["default"]={mixins:[r["default"]],props:{bsStyle:{type:String,"default":"primary"},progress:{type:Number,"default":0,required:!0},min:{type:Number,"default":0},max:{type:Number,"default":100},striped:{type:Boolean,"default":!1},animation:{type:Boolean,"default":!1}},created:function(){this.striped&&(this.classes[this.tag+"-striped"]=!0),this.animation&&(this.classes.active=!0)},ready:function(){this.progressing()},computed:{beProgress:{get:function(){return this.progress},set:function(t){this.$els.progressbar.style.width=t+"%"}}},data:function(){return{tag:"progress-bar",classes:{},progressStyle:{}}},methods:{progressing:function(){this.beProgress=this.progress>this.max?this.max:this.progress<this.min?this.min:this.progress}},watch:{progress:function(t){this.progressing()}}}},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e["default"]={}},function(t,e,i){"use strict";function n(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var s=i(12),r=n(s);e["default"]={mixins:[r["default"]],props:{title:{type:String,required:!0}},methods:{_handleClick:function(t){this.$dispatch("click",t)}}}},function(t,e,i){"use strict";function n(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var s=i(6),r=n(s),o=i(17),a=n(o),l=i(7),u=n(l),c=i(19),h=n(c);e["default"]={props:{onSelect:{type:Function,twoWay:!0}},data:function(){return{tabList:[],count:0,activeIndex:0,disabledList:[]}},ready:function(){this.tabList[this.activeIndex]&&(this.tabList[this.activeIndex].setActive(),this.tabList[this.activeIndex].animateIn())},methods:{switchTab:function(t){var e=this;if(t!==e.activeIndex&&!(e.disabledList.indexOf(t)>-1)){this.onSelect&&this.onSelect(e.tabList[t]);var i=e.activeIndex;e.tabList[t].setActive(),e.tabList[i].animateOut(),r["default"].nextTick(function(){e.tabList[t].$el.offsetWidth,e.tabList[t].animateIn()}),this.activeIndex=t}},addItem:function(t){t.disabled&&this.disabledList.push(this.count),this.tabList.push(t),this.count++}},components:{Nav:a["default"],NavItem:u["default"],TabItem:h["default"]}}},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e["default"]={props:{disabled:{type:Boolean,"default":!1},title:{type:String,validator:function(t){return""!=t.trim()}}},data:function(){return{classes:[]}},created:function(){this.$parent.addItem(this)},methods:{setActive:function(){this.classes.push("active")},animateIn:function(){this.classes.push("in")},animateOut:function(){this.classes.splice(0,2),this.classes=[]}}}},function(t,e,i){"use strict";function n(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var s=i(2),r=n(s),o=i(3),a=n(o);e["default"]={mixins:[r["default"]],props:{src:{type:String,required:!0},alt:{type:String,"default":""}},components:{Anchor:a["default"]}}},function(t,e,i){"use strict";function n(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var s=i(13),r=n(s);e["default"]={mixins:[r["default"]],data:function(){return{tag:"tooltip"}}}},function(t,e,i){"use strict";function n(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var s=i(20),r=n(s),o=i(14),a=n(o);e["default"]={mixins:[a["default"]],data:function(){return{tag:"tooltip"}},components:{Tooltip:r["default"]}}},function(t,e){"use strict";t.exports={props:{bsStyle:{type:String,"default":"default"},size:{type:String}}}},function(t,e){"use strict";var i=function(t){this.el=t,this.left=0,this.top=0,this.right=0,this.bottom=0};i.prototype={setEl:function(t){this.el=t},getPosition:function(){if(this.el){if("getBoundingClientRect"in this.el){var t=this.el.getBoundingClientRect();return{top:t.top+window.scrollY,left:t.left,right:t.right,bottom:t.bottom,width:t.width,height:t.height}}return{height:this.el.offsetHeight,width:this.el.offsetWidth,top:s(this.el),left:n(this.el),right:r(this.el),bottom:o(this.el)}}}};var n=function(t){for(var e=t.offsetLeft;null!=t.offsetParent;)t=t.offsetParent,e+=t.offsetLeft;return e},s=function(t){for(var e=t.offsetTop;null!=t.offsetParent;)t=t.offsetParent,e+=t.offsetTop;return e},r=function(t){for(var e=t.offsetRight;null!=t.offsetParent;)t=t.offsetParent,e+=t.offsetRight;return e},o=function(t){for(var e=t.offsetBottom;null!=t.offsetParent;)t=t.offsetParent,e+=t.offsetBottom;return e};t.exports=i},function(t,e){"use strict";function i(){var t=document.createElement("div"),e=t.style;"AnimationEvent"in window||delete o.animationend.animation,"TransitionEvent"in window||delete o.transitionend.transition;for(var i in o){var n=o[i];for(var s in n)if(s in e){a.push(n[s]);break}}}function n(t,e,i){t.addEventListener(e,i,!1)}function s(t,e,i){t.removeEventListener(e,i,!1)}var r=!("undefined"==typeof window||!window.document||!window.document.createElement),o={transitionend:{transition:"transitionend",WebkitTransition:"webkitTransitionEnd",MozTransition:"mozTransitionEnd",OTransition:"oTransitionEnd",msTransition:"MSTransitionEnd"},animationend:{animation:"animationend",WebkitAnimation:"webkitAnimationEnd",MozAnimation:"mozAnimationEnd",OAnimation:"oAnimationEnd",msAnimation:"MSAnimationEnd"}},a=[];r&&i();var l={addEndEventListener:function(t,e){return 0===a.length?void window.setTimeout(e,0):void a.forEach(function(i){n(t,i,e)})},removeEndEventListener:function(t,e){0!==a.length&&a.forEach(function(i){s(t,i,e)})}};t.exports=l},function(t,e){"use strict";e["default"]=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")},e.__esModule=!0},function(t,e,i){e=t.exports=i(4)(),e.push([t.id,".popover-wrap{display:inline-block;position:relative}",""])},function(t,e,i){e=t.exports=i(4)(),e.push([t.id,".tooltip{display:none}",""])},function(t,e,i){e=t.exports=i(4)(),e.push([t.id,".tooltip-wrap{display:inline-block;position:relative}",""])},function(t,e,i){e=t.exports=i(4)(),e.push([t.id,".modal-dialog{z-index:1100}",""])},function(t,e,i){var n=i(81);"string"==typeof n&&(n=[[t.id,n,""]]);i(5)(n,{});n.locals&&(t.exports=n.locals)},function(t,e,i){var n=i(82);"string"==typeof n&&(n=[[t.id,n,""]]);i(5)(n,{});n.locals&&(t.exports=n.locals)},function(t,e,i){var n=i(83);"string"==typeof n&&(n=[[t.id,n,""]]);i(5)(n,{});n.locals&&(t.exports=n.locals)},function(t,e,i){var n=i(84);"string"==typeof n&&(n=[[t.id,n,""]]);i(5)(n,{});n.locals&&(t.exports=n.locals)},function(t,e){t.exports="<div v-bind:class=classes><slot></slot></div>"},function(t,e){t.exports="<a href={{href}} target={{target}} @click=clickHandle><slot></slot></a>"},function(t,e){t.exports="<ol class=breadcrumb><slot></slot></ol>"},function(t,e){t.exports='<li v-bind:class=classes><a v-if="href != null" v-bind:href=href><slot></slot></a><slot v-if="href === null"></slot></li>'},function(t,e){t.exports="<button v-bind:class=classes v-bind:type=type><slot></slot></button>"},function(t,e){t.exports="<div role=group v-bind:class=classes><slot></slot></div>"},function(t,e){t.exports='<div id=carousel class="carousel slide"><ol v-if=indicators class=carousel-indicators><li v-for="i in count" v-bind:class="{&quot;active&quot;:$index===activeIndex}"></li></ol><div @mouseover=pause @mouseout=play class=carousel-inner><slot></slot></div><a v-if=controls @click=prev class="left carousel-control"><span class="glyphicon glyphicon-chevron-left"></span><span class=sr-only>Previous</span></a><a v-if=controls @click=next class="right carousel-control"><span class="glyphicon glyphicon-chevron-right"></span><span class=sr-only>Next</span></a></div>'},function(t,e){t.exports="<div v-bind:class=classes class=item><slot></slot></div>"},function(t,e){t.exports="<div v-bind:class=classes><slot></slot></div>"},function(t,e){t.exports="<button-group @click=toggleOpen v-bind:class=classes><button v-bind:bs-style=bsStyle v-bind:bs-size=size data-toggle=dropdown aria-haspopup=true aria-expanded=false class=dropdown-toggle><slot name=dropdown-title></slot></button><ul class=dropdown-menu><slot name=dropdown-menu></slot></ul></button-group>";
	},function(t,e){t.exports="<form v-bind:class=classes><slot></slot></form>"},function(t,e){t.exports='<div class=form-group><label v-bind:class=lblClass>{{label}}</label><div v-if=horizontal v-bind:class=iptClass><input v-el:input=v-el:input v-bind:type=type v-bind:placeholder=placeholder v-model=model class="form-control"></div><input v-if=!horizontal v-el:input=v-el:input v-bind:type=type v-bind:placeholder=placeholder v-model=model class="form-control"></div>'},function(t,e){t.exports='<span v-bind:class=classes class=label><span v-if="href === null"><slot></slot></span><anchor v-if="href != null" v-bind:href=href v-bind:target=target><slot></slot></anchor></span>'},function(t,e){t.exports="<li><anchor v-bind:href=href v-bind:target=target v-bind:click-handle=clickHandle><slot></slot></anchor></li>"},function(t,e){t.exports='<div v-bind:class=modalClasses class="modal fade"><overlay v-bind:show=isShow></overlay><div v-bind:class=dialogClasses><div class=modal-content><div class=modal-header><slot name=modal-header></slot></div><div class=modal-body><slot name=modal-body></slot></div><div class=modal-footer><slot name=modal-footer></slot></div></div></div></div>'},function(t,e){t.exports="<ul v-bind:class=classes class=nav><slot></slot></ul>"},function(t,e){t.exports="<li v-bind:class=disabled><anchor v-bind:href=href v-bind:target=target v-bind:click-handle=clickHandle><slot></slot></anchor></li>"},function(t,e){t.exports='<div v-bind:class=isShow class="modal-backdrop fade"></div>'},function(t,e){t.exports='<ul v-bind:class=classes><nav-item v-for="instance in pages" v-bind:class="{active:instance.num === activePage,disabled:instance.disabled}" @click=onSelect(instance)>{{instance.name}}</nav-item></ul>'},function(t,e){t.exports="<div v-bind:class=classes><div class=panel-heading><slot name=panel-header></slot></div><div class=panel-body><slot name=panel-body></slot></div></div>"},function(t,e){t.exports='<div v-bind:class=classes role=tooltip><div v-bind:style=arrowStyle class=arrow></div><h3 v-if="title!=&quot;&quot;" class=popover-title>{{title}}</h3><div class=popover-content><slot></slot></div></div>'},function(t,e){t.exports="<div class=popover-wrap><slot></slot></div><popover v-ref:popover=v-ref:popover v-bind:title=title v-bind:style=tipPosition v-bind:placement=placement v-bind:show=show>{{content}}</popover>"},function(t,e){t.exports="<div class=progress><div v-bind:class=classes role=progressbar v-el:progressbar=v-el:progressbar><slot></slot></div></div>"},function(t,e){t.exports="<div class=row><slot></slot></div>"},function(t,e){t.exports="<button-group v-bind:class=classes><button v-bind:bs-style=bsStyle v-bind:size=size @click=_handleClick>{{title}}</button><button @click=toggleOpen v-bind:bs-style=bsStyle v-bind:size=size data-toggle=dropdown aria-haspopup=true aria-expanded=false class=dropdown-toggle><span class=caret></span></button><ul class=dropdown-menu><slot></slot></ul></button-group>"},function(t,e){t.exports="<div><nav is=nav bs-style=tabs><nav-item v-for=\"item in tabList\" v-bind:class=\"{'active':activeIndex==$index,'disabled':disabledList.indexOf($index)&gt;-1}\" @click=switchTab($index)>{{item.title}}</nav-item></nav><div v-el:items=v-el:items class=tab-content><slot></slot></div></div>"},function(t,e){t.exports='<div v-bind:class=classes class="tab-pane fade"><slot></slot></div>'},function(t,e){t.exports='<div class=thumbnail><anchor v-bind:href=href v-bind:target=target><img v-bind:src=src v-bind:alt="alt"></anchor><div class=caption><slot></slot></div></div>'},function(t,e){t.exports="<div v-bind:class=classes role=tooltip><div class=tooltip-arrow></div><div class=tooltip-inner><slot></slot></div></div>"},function(t,e){t.exports="<div class=tooltip-wrap><slot></slot></div><tooltip v-ref:tooltip=v-ref:tooltip v-bind:style=tipPosition v-bind:placement=placement v-bind:show=show>{{content}}</tooltip>"},function(t,e,i){t.exports=i(47),t.exports.__esModule&&(t.exports=t.exports["default"]),("function"==typeof t.exports?t.exports.options:t.exports).template=i(89)},function(t,e,i){t.exports=i(49),t.exports.__esModule&&(t.exports=t.exports["default"]),("function"==typeof t.exports?t.exports.options:t.exports).template=i(91)},function(t,e,i){t.exports=i(50),t.exports.__esModule&&(t.exports=t.exports["default"]),("function"==typeof t.exports?t.exports.options:t.exports).template=i(92)},function(t,e,i){t.exports=i(53),t.exports.__esModule&&(t.exports=t.exports["default"]),("function"==typeof t.exports?t.exports.options:t.exports).template=i(95)},function(t,e,i){t.exports=i(54),t.exports.__esModule&&(t.exports=t.exports["default"]),("function"==typeof t.exports?t.exports.options:t.exports).template=i(96)},function(t,e,i){t.exports=i(55),t.exports.__esModule&&(t.exports=t.exports["default"]),("function"==typeof t.exports?t.exports.options:t.exports).template=i(97)},function(t,e,i){t.exports=i(56),t.exports.__esModule&&(t.exports=t.exports["default"]),("function"==typeof t.exports?t.exports.options:t.exports).template=i(98)},function(t,e,i){t.exports=i(57),t.exports.__esModule&&(t.exports=t.exports["default"]),("function"==typeof t.exports?t.exports.options:t.exports).template=i(99)},function(t,e,i){t.exports=i(58),t.exports.__esModule&&(t.exports=t.exports["default"]),("function"==typeof t.exports?t.exports.options:t.exports).template=i(100)},function(t,e,i){t.exports=i(59),t.exports.__esModule&&(t.exports=t.exports["default"]),("function"==typeof t.exports?t.exports.options:t.exports).template=i(101)},function(t,e,i){t.exports=i(60),t.exports.__esModule&&(t.exports=t.exports["default"]),("function"==typeof t.exports?t.exports.options:t.exports).template=i(102)},function(t,e,i){i(88),t.exports=i(61),t.exports.__esModule&&(t.exports=t.exports["default"]),("function"==typeof t.exports?t.exports.options:t.exports).template=i(103)},function(t,e,i){t.exports=i(64),t.exports.__esModule&&(t.exports=t.exports["default"]),("function"==typeof t.exports?t.exports.options:t.exports).template=i(106)},function(t,e,i){t.exports=i(65),t.exports.__esModule&&(t.exports=t.exports["default"]),("function"==typeof t.exports?t.exports.options:t.exports).template=i(107)},function(t,e,i){t.exports=i(66),t.exports.__esModule&&(t.exports=t.exports["default"]),("function"==typeof t.exports?t.exports.options:t.exports).template=i(108)},function(t,e,i){i(85),t.exports=i(68),t.exports.__esModule&&(t.exports=t.exports["default"]),("function"==typeof t.exports?t.exports.options:t.exports).template=i(110)},function(t,e,i){t.exports=i(69),t.exports.__esModule&&(t.exports=t.exports["default"]),("function"==typeof t.exports?t.exports.options:t.exports).template=i(111)},function(t,e,i){t.exports=i(70),t.exports.__esModule&&(t.exports=t.exports["default"]),("function"==typeof t.exports?t.exports.options:t.exports).template=i(112)},function(t,e,i){t.exports=i(71),t.exports.__esModule&&(t.exports=t.exports["default"]),("function"==typeof t.exports?t.exports.options:t.exports).template=i(113)},function(t,e,i){t.exports=i(72),t.exports.__esModule&&(t.exports=t.exports["default"]),("function"==typeof t.exports?t.exports.options:t.exports).template=i(114)},function(t,e,i){t.exports=i(74),t.exports.__esModule&&(t.exports=t.exports["default"]),("function"==typeof t.exports?t.exports.options:t.exports).template=i(116)},function(t,e,i){i(87),t.exports=i(76),t.exports.__esModule&&(t.exports=t.exports["default"]),("function"==typeof t.exports?t.exports.options:t.exports).template=i(118)}])});

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<h3 id=\"vbs-label\">标签－Label</h3><panel><div slot=\"panel-header\">说明,需要添加is属性：is＝'label'</div><div slot=\"panel-body\"><div><p><strong class=\"pl-k\">'bs-style'</strong>：颜色(primary,success,danger...)</p><p><label is=\"label\" v-for=\"sle in styleList\" v-bind:bs-style=\"sle\">标签</label></p><p><button @click=\"toggleSource\">示例源码</button></p><p><textarea name=\"example-code-label\"><template>\n  <label is='label' bs-style='default'>\n    标签\n  </label>\n  <label is='label' bs-style='primary'>\n    标签\n  </label>\n  <label is='label' bs-style='info'>\n    标签\n  </label>\n  <!-- more -->\n</template>\n</textarea></p></div></div></panel><h3 id=\"vbs-button\">按钮－Button</h3><panel id=\"button-example\"><div slot=\"panel-header\">说明</div><div slot=\"panel-body\"><div><p><strong class=\"pl-k\">'bs-style'</strong>：颜色(primary,success,danger...)</p><p><button v-for=\"sle in styleList\" v-bind:bs-style=\"sle\">按钮</button></p><p><strong class=\"pl-k\">'bs-size'</strong>：尺寸</p><p><button bs-size=\"sm\">按钮</button><button bs-size=\"lg\" bs-style=\"primary\">按钮</button></p><p>关于click事件可以直接绑定<strong class=\"pl-k\">'on-click'</strong>或者<strong class=\"pl-k\">@click</strong><p><button @click=\"toggleSource\">示例源码</button></p><p><textarea name=\"example-code-button\"><template>\n  <button bs-style='default',bs-size='xs'>\n    按钮\n  </button>\n  <button  bs-style='primary',bs-size='lg'>\n    按钮\n  </button>\n  <button bs-style='info',@click='clickHandle'>\n    按钮\n  </button>\n  <!-- more -->\n</template></textarea></p></p></div></div></panel><h3>按钮组－ButtonGroup</h3><panel><div slot=\"panel-header\">说明,slot位置可放置button和a控件</div><div slot=\"panel-body\"><div><p><button-group><button>left</button><button>center</button><button>right</button></button-group></p><p><string class=\"pl-k\">'bs-size'</string>：尺寸</p><p><button-group bs-size=\"lg\"><button>left</button><button>center</button><button>right</button></button-group></p><p><strong class=\"pl-k\">'align'</strong>：位置</p><p><button @click=\"toggleSource\">示例源码</button></p><p><textarea name=\"example-code-buttongroup\"><template>\n  <button-group bs-size='lg'>\n    <button>\n      left\n    </button>\n    <button>\n      center\n    </button>\n    <button>\n      right\n    </button>\n  </button-group>\n</template></textarea></p></div></div></panel><h3>下拉按钮－DropdownButton</h3><panel><div slot=\"panel-header\">说明</div><div slot=\"panel-body\"><div><p class=\"pl-id small\"><span>2016-2-22 : 已修改</span></p><p><dropdown-button v-bind:dropdown=\"true\"><span slot=\"dropdown-title\">下拉框</span><menu-item v-for=\"lk in linkList\" v-bind:href=\"lk.url\" slot=\"dropdown-menu\">{{lk.name}}</menu-item></dropdown-button></p><p><strong class=\"pl-k\">'title'</strong>：下拉框标题</p><p><strong class=\"pl-k\">'dropdown'，</strong><strong class=\"pl-k\">'dropup'</strong>：布尔值，朝上或者向下</p><p><dropdown-button v-bind:dropup=\"true\" bs-size=\"sm\" bs-style=\"primary\"><span slot=\"dropdown-title\">下拉框</span><menu-item v-for=\"lk in linkList\" v-bind:href=\"lk.url\" slot=\"dropdown-menu\">{{lk.name}}</menu-item></dropdown-button></p><p><strong class=\"pl-k\">'bs-size'</strong>：尺寸</p><p><strong class=\"pl-k\">'bs-style'</strong>：颜色</p><p><button @click=\"toggleSource\">示例源码</button></p><p><textarea name=\"example-code-dropdown\"><template>\n  <dropdown-button v-bind:dropup='true' bs-size='lg'>\n    <span slot=\"dropdown-title\">下拉框</span>\n    <menu-item v-bind:href='#' slot=\"dropdown-menu\">\n      link1\n    </menu-item>\n    <menu-item v-bind:href='#' slot=\"dropdown-menu\">\n      link2\n    </menu-item>\n    <menu-item v-bind:href='#' slot=\"dropdown-menu\">\n      link3\n    </menu-item>\n  </dropdown-button>\n</template></textarea></p></div></div></panel><h3>分裂按钮－SplitButton</h3><panel><div slot=\"panel-header\">说明</div><div slot=\"panel-body\"><div><p><split-button title=\"下拉框\" v-bind:dropup=\"true\" bs-style=\"danger\"><menu-item v-for=\"lk in linkList\" v-bind:href=\"lk.url\">{{lk.name}}</menu-item></split-button></p><p><strong class=\"pl-k\">'title'</strong>：下拉框标题</p><p><strong class=\"pl-k\">'dropdown'，</strong><strong class=\"pl-k\">'dropup'</strong>：布尔值，朝上或者向下</p><p><split-button title=\"下拉框\" v-bind:dropup=\"true\" bs-size=\"sm\" bs-style=\"warning\"><menu-item v-for=\"lk in linkList\" v-bind:href=\"lk.url\">{{lk.name}}</menu-item></split-button></p><p><strong class=\"pl-k\">'bs-size'</strong>：尺寸</p><p><strong class=\"pl-k\">'bs-style'</strong>：颜色</p><p><button @click=\"toggleSource\">示例源码</button></p><p><textarea name=\"example-code-splitbutton\"><template>\n  <split-button title='分裂框' v-bind:dropdown='true' bs-style='primary'>\n    <menu-item v-bind:href='#'>\n      link1\n    </menu-item>\n    <menu-item v-bind:href='#'>\n      link2\n    </menu-item>\n    <menu-item v-bind:href='#'>\n      link3\n    </menu-item>\n  </split-button>\n</template></textarea></p></div></div></panel><h3 id=\"vbs-alert\">警告框-Alert</h3><panel><div slot=\"panel-header\">说明</div><div slot=\"panel-body\"><div><p><alert bs-style=\"warning\">这是警告框</alert><alert bs-style=\"success\">这是成功提示框</alert></p><p><strong class=\"pl-k\">'bs-style'</strong>：颜色</p><p><button @click=\"toggleSource\">示例源码</button></p><p><textarea name=\"example-code-alert\"><template>\n  <alert bs-style='warning'>\n      这是警告框\n  </alert>\n  <alert bs-style='success'>\n      这是成功提示框\n  </alert>\n</template>\n</textarea></p></div></div></panel><h3 id=\"vbs-modal\">模态框－Modal</h3><panel><div slot=\"panel-header\">说明</div><div slot=\"panel-body\"><div></div><p class=\"pl-id small\"><span>2016-2-22 : 已修改</span><p><button @click=\"toggleModal\" bs-style=\"primary\">运行模态框</button></p><modal v-bind:is-show.sync=\"showModal\" v-bind:on-before-show=\"beforeShow\"><div slot=\"modal-header\"><span type=\"button\" aria-label=\"close\" @click=\"closeModal\" class=\"close\"><span aria-hidden=\"true\">&times;</span></span><h4 class=\"modal-title\"> title</h4></div><div slot=\"modal-body\">内容。。</div><div slot=\"modal-footer\"><button @click=\"closeModal\">close</button></div></modal><p><strong class=\"pl-k\">'is-show'</strong>：bool值</p><p><strong class=\"pl-k\">'bs-size'</strong>：尺寸</p><p><strong class=\"pl-k\">'on-before-show'</strong>：弹出框弹出之前</p><p><strong class=\"pl-k\">'on-after-show'</strong>：弹出框弹出之后</p><p><strong class=\"pl-k\">'on-before-hide'</strong>：弹出框关闭之前</p><p><strong class=\"pl-k\">'on-after-hide'</strong>：弹出框关闭之后</p><p><button @click=\"toggleSource\">示例源码</button></p><p><textarea name=\"example-code-modal\"><template>\n  <modal v-bind:is-show.sync='showModal' v-bind:on-before-show='beforeShow'>\n    <div slot='modal-header'>\n        <span class='close' type='button' aria-label='close' @click='closeModal'>\n          <span aria-hidden=\"true\">&times;</span>\n        </span>\n        <h4>\n          title\n        </h4>\n    </div>\n    <div slot='modal-body'>\n        content\n    </div>\n    <div slot='modal-footer'>\n        <button @click='closeModal'>close</button>\n    </div>\n  </modal>\n\n</template>\n<script>\n  export default{\n    data(){\n      return {\n        showModal:false\n      }\n    },\n    methods:{\n      closeModal(){\n        this.showModal = !this.showModal;\n      },\n      beforeShow(){\n        alert(\"弹出框显示！\");\n      }\n    }\n  }\n</script></textarea></p></p></div></panel><h3 id=\"vbs-tooltip\">Tooltip</h3><panel><div slot=\"panel-header\">说明</div><div slot=\"panel-body\"><div><p><div v-bind:style=\"tooltipStyle\"><tooltip placement=\"bottom\" v-bind:show=\"true\">tobottom</tooltip></div></p><p><strong class=\"pl-k\">'placement'</strong>：位置(top,left,bottom,right)</p><p><strong class=\"pl-k\">'show'</strong>：bool值，是否显示</p><p><button @click=\"toggleSource\">示例源码</button></p><p><textarea name=\"example-code-tooltip\"><template>\n  <tooltip placement='bottom' v-bind:show='true'>\n    提示按钮\n  </tooltip>\n</template></textarea></p></div></div></panel><h3>TooltipTrigger</h3><panel><div slot=\"panel-header\">说明</div><div slot=\"panel-body\"><div><p><tooltip-trigger trigger=\"click\" placement=\"bottom\" content=\"这是弹出提示框\"><button bs-style=\"danger\">提示框</button></tooltip-trigger></p><p><strong class=\"pl-k\">'placement'</strong>：位置(top,left,bottom,right)</p><p><strong class=\"pl-k\">'trigger'</strong>：触发类型(hover,click)</p><p><strong class=\"pl-k\">'content'</strong>：提示内容</p><p><button @click=\"toggleSource\">示例源码</button></p><p><textarea name=\"example-code-tooltiptrigger\"><template>\n  <tooltip-trigger\n    trigger='click'\n    placement='bottom'\n    content=\"这是弹出提示框\"\n    >\n    <button bs-style='success'>提示框按钮</button>\n  </tooltip-trigger>\n</template></textarea></p></div></div></panel><h3>弹出提示框－Popover</h3><panel><div slot=\"panel-header\">说明</div><div slot=\"panel-body\"><div><p><div v-bind:style=\"popoverStyle\"><popover title=\"标题\" placement=\"top\" v-bind:show=\"true\">弹出框内容呢弹出框内容呢弹出框内容呢</popover></div></p><p><button @click=\"toggleSource\">示例源码</button></p><p><textarea name=\"example-code-popover\"><template>\n  <popover\n    title='标题'\n    placement='bottom'\n    v-bind:show='true'>\n    提示按钮\n  </popover>\n</template></textarea></p></div></div></panel><h3>弹出提示框－PopoverTrigger</h3><panel><div slot=\"panel-header\">说明</div><div slot=\"panel-body\"><div><p><popover-trigger trigger=\"click\" placement=\"left\" title=\"标题\" content=\"这是弹出提示框\"><button bs-style=\"default\">popover弹出来</button></popover-trigger></p><p><strong class=\"pl-k\">'placement'</strong>：位置(top,left,bottom,right)</p><p><strong class=\"pl-k\">'trigger'</strong>：触发类型(hover,click)</p><p><strong class=\"pl-k\">'content'</strong>：提示内容</p><p><strong class=\"pl-k\">'title'</strong>：标题</p><p><button @click=\"toggleSource\">示例源码</button></p><p><textarea name=\"example-code-popovertrigger\"><template>\n  <popover-trigger\n    trigger='click'\n    placement='left'\n    title='标题'\n    content=\"这是弹出提示框\"\n    >\n    <button bs-style='info'>提示框按钮</button>\n  </popover-trigger>\n</template></textarea></p></div></div></panel><h3 id=\"vbs-tab\">选项卡－Tab</h3><panel><div slot=\"panel-header\">说明，tab，tab-item</div><div slot=\"panel-body\"><div><p><tab v-bind:on-select=\"clickTab\"><tab-item title=\"tab1\">tab1-content</tab-item><tab-item title=\"tab2\">tab2-content</tab-item><tab-item title=\"tab3\" v-bind:disabled=\"true\">tab3-content</tab-item></tab></p><p><strong class=\"pl-k\">'on-select'</strong>：选择事件回调</p><p><strong class=\"pl-k\">'title'</strong>：选项卡标题</p><p><strong class=\"pl-k\">'disabled'</strong>：bool值，是否可以选中</p><p><button @click=\"toggleSource\">示例源码</button></p><p><textarea name=\"example-code-tab\"><template>\n  <tab v-bind:on-select='clickTab'>\n    <tab-item title='tab1'>\n      tab1 content\n    </tab-item>\n    <tab-item title='tab2'>\n      tab2 content\n    </tab-item>\n    <tab-item title='tab3' v-bind:disabled='true'>\n      tab3 content\n    </tab-item>\n  </tab>\n</template>\n<script>\n  export default{\n    methods:{\n      clickTab(tabItem){\n          alert(tabItem.title);\n      }\n    }\n  }\n</script></textarea></p></div></div></panel><h3 id=\"vbs-pagination\">分页组件－Pagination</h3><panel><div slot=\"panel-header\">说明,pager</div><div slot=\"panel-body\"><div><p><pagination v-bind:active-page=\"activePage\" v-bind:items=\"10\" v-bind:on-select=\"selectPage\"></pagination></p><p><strong class=\"pl-k\">'active-page'</strong>：当前页</p><p><strong class=\"pl-k\">'items'</strong>：页数</p><p><strong class=\"pl-k\">'on-select'</strong>：页选中事件回调,返回pager类(包含val，name，active，disabled)</p><p><button @click=\"toggleSource\">示例源码</button></p><p><textarea name=\"example-code-pagination\"><template>\n  <pagination\n    v-bind:active-page='activePage'\n    v-bind:items='10'\n    v-bind:on-select='selectPage'>\n\n  </pagination>\n</template>\n<script>\n  export default{\n    methods:{\n      selectPage(pager){\n          //pager.disabled,pager.active\n          if(pager.num === 'next'){\n            this.activePage = this.activePage+1 > 10 ? this.activePage : this.activePage+1;\n          }else if(pager.num === 'prev'){\n            this.activePage = this.activePage < 1 ? this.activePage : this.activePage - 1;\n          }else{\n            this.activePage = pager.num;\n          }\n      }\n    }\n  }\n</script></textarea></p></div></div></panel><h3 id=\"vbs-row\">栅格－Row,Column</h3><panel><div slot=\"panel-header\">说明</div><div slot=\"panel-body\"><div><p><row><column xs=\"12\" sm=\"4\" md=\"4\">栅格系统1</column><column xs=\"12\" sm=\"4\" md=\"4\">栅格系统2</column><column xs=\"12\" sm=\"4\" md=\"4\">栅格系统3</column></row></p><p><strong class=\"pl-k\">'xs'</strong>：数字类型</p><p><strong class=\"pl-k\">'sm'</strong>：数字类型</p><p><strong class=\"pl-k\">'md'</strong>：数字类型</p><p><strong class=\"pl-k\">'lg'</strong>：数字类型</p><p><button @click=\"toggleSource\">示例源码</button></p><p><textarea name=\"example-code-rowcol\"><template>\n  <row>\n    <column xs='12' sm='4' md='4' lg='4'>\n      栅格系统1\n    </column>\n    <column xs='12' sm='4' md='4' lg='4'>\n      栅格系统2\n    </column>\n    <column xs='12' sm='4' md='4' lg='4'>\n      栅格系统3\n    </column>\n  </row>\n</template></textarea></p></div></div></panel><h3 id=\"vbs-panel\">面板－panel</h3><panel><div slot=\"panel-header\">标题</div><div slot=\"panel-body\"><p>内容</p><p><strong class=\"pl-k\">'slot=panel-header'</strong>：标题部分</p><p><strong class=\"pl-k\">'slot=panel-body'</strong>：内容部分</p><p><button @click=\"toggleSource\">示例源码</button></p><p><textarea name=\"example-code-panel\"><template>\n  <panel  bs-style='info'>\n    <div slot='panel-header'>\n        标题\n    </div>\n    <div slot='panel-body'>\n        内容\n    </div>\n  </panel>\n</template></textarea></p></div></panel><h3 id=\"vbs-carousel\">跑马灯－Carousel</h3><panel><div slot=\"panel-header\">说明，carousel，carousel-item</div><div slot=\"panel-body\"><p><carousel style=\"width:650px;\"><carousel-item><img src=\"" + __webpack_require__(12) + "\"/></carousel-item><carousel-item><img src=\"" + __webpack_require__(12) + "\"/></carousel-item><carousel-item><img src=\"" + __webpack_require__(12) + "\"/></carousel-item></carousel></p><p><strong class=\"pl-k\">'interval'</strong>：数字：3000（默认3秒），间隔时间</p><p><strong class=\"pl-k\">'controls'</strong>：bool值，控制上下滚动点击事件</p><p><strong class=\"pl-k\">'indicators'</strong>：bool值，显示锚点</p><p><strong class=\"pl-k\">'pause-on-hover'</strong>：bool值，鼠标悬停暂停滚动</p><p><strong class=\"pl-k\">'slide'</strong>：bool值，自动滚动</p><p><button @click=\"toggleSource\">示例源码</button></p><p><textarea name=\"example-code-carousel\"><template>\n  <carousel\n  interval='5000'\n  v-bind:controls='true',\n  v-bind:slide='true'\n  >\n    <carousel-item>\n      <img src='" + __webpack_require__(12) + "' alt='' />\n    </carousel-item>\n    <carousel-item>\n      <img src='" + __webpack_require__(12) + "' alt='' />\n    </carousel-item>\n    <carousel-item>\n      <img src='" + __webpack_require__(12) + "' alt='' />\n    </carousel-item>\n  </carousel>\n</template>\n</textarea></p></div></panel><h3 id=\"vbs-form\">表单－Form</h3><panel><div slot=\"panel-header\">说明，form,form-input</div><div slot=\"panel-body\"><p><form is=\"form\" bs-style=\"horizontal\" v-bind:layout=\"{sm:&quot;3,9&quot;,md:&quot;2,8&quot;}\"><form-input label=\"输入框1\" placeholder=\"输入框12\" v-bind:model.sync=\"value\"></form-input></form></p><p>{{value}}</p><p><strong class=\"pl-ent\">form</strong></p><p><strong class=\"pl-k\">'bs-style'</strong>：布局类型,horizontal,inline</p><p><strong class=\"pl-k\">'layout'</strong>：布局类型为horizontal时，分配sm，md大小，例如：md='2-10',sm='3-9'</p><p><strong class=\"pl-ent\">form-input</strong></p><p><strong class=\"pl-k\">'label'</strong>：Label内容</p><p><strong class=\"pl-k\">'placeholder'</strong>：placeholder提示语</p><p><strong class=\"pl-k\">'model'</strong>：双向绑定关键字</p><p><button @click=\"toggleSource\">示例源码</button></p><p><textarea name=\"example-code-form\"><template id=\"\">\n  <form\n    is='form'\n    bs-style='horizontal'\n    v-bind:layout='{sm:\"3,9\",md:\"2,8\"}'\n    >\n      <form-input\n        type='text'\n        label='输入框1'\n        placeholder='输入框12'\n        v-bind:model.sync='value'\n        >\n\n      </form-input>\n  </form>\n</template>\n<script>\n  export default{\n    data(){\n      return{\n        value:\"text\"\n      }\n    }\n  }\n</script></textarea></p></div></panel><h3 id=\"vbs-breadcrumb\">面包屑－Breadcrumb</h3><panel><div slot=\"panel-header\">说明，breadcrumb,breadcrumb-item</div><div slot=\"panel-body\"><p><breadcrumb><breadcrumb-item href=\"#\">home</breadcrumb-item><breadcrumb-item href=\"#\">library</breadcrumb-item><breadcrumb-item v-bind:active=\"true\">point</breadcrumb-item></breadcrumb></p><p><strong class=\"pl-ent\">breadcrumb-item</strong></p><p><strong class=\"pl-k\">'href'</strong>：链接地址</p><p><strong class=\"pl-k\">'active'</strong>：bool值，当前所在页</p><p><textarea name=\"example-code-breadcrumb\"><template>\n  <breadcrumb>\n    <breadcrumb-item href='#'>\n      home\n    </breadcrumb-item>\n    <breadcrumb-item href='#'>\n      library\n    </breadcrumb-item>\n    <breadcrumb-item v-bind:active='true'>\n      point\n    </breadcrumb-item>\n  </breadcrumb>\n</template></textarea></p></div></panel><h3 id=\"vbs-thumbnail\">缩略图－Thumbnail</h3><panel><div slot=\"panel-header\">说明，thumbnail内部可包含h3标题，p标签描述信息和按钮组</div><div slot=\"panel-body\"><row><column md=\"4\" sm=\"12\"><thumbnail href=\"#\" src=\"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjQyIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDI0MiAyMDAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPjwhLS0KU291cmNlIFVSTDogaG9sZGVyLmpzLzEwMCV4MjAwCkNyZWF0ZWQgd2l0aCBIb2xkZXIuanMgMi42LjAuCkxlYXJuIG1vcmUgYXQgaHR0cDovL2hvbGRlcmpzLmNvbQooYykgMjAxMi0yMDE1IEl2YW4gTWFsb3BpbnNreSAtIGh0dHA6Ly9pbXNreS5jbwotLT48ZGVmcz48c3R5bGUgdHlwZT0idGV4dC9jc3MiPjwhW0NEQVRBWyNob2xkZXJfMTUxODA4Yjk1MDQgdGV4dCB7IGZpbGw6I0FBQUFBQTtmb250LXdlaWdodDpib2xkO2ZvbnQtZmFtaWx5OkFyaWFsLCBIZWx2ZXRpY2EsIE9wZW4gU2Fucywgc2Fucy1zZXJpZiwgbW9ub3NwYWNlO2ZvbnQtc2l6ZToxMnB0IH0gXV0+PC9zdHlsZT48L2RlZnM+PGcgaWQ9ImhvbGRlcl8xNTE4MDhiOTUwNCI+PHJlY3Qgd2lkdGg9IjI0MiIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNFRUVFRUUiLz48Zz48dGV4dCB4PSI4OS44NTkzNzUiIHk9IjEwNS40Ij4yNDJ4MjAwPC90ZXh0PjwvZz48L2c+PC9zdmc+\" alt=\"示例图\"><h3>标题</h3><p>描述信息在这里</p><p><button bs-style=\"primary\">按钮</button><button>按钮</button></p></thumbnail></column><column md=\"4\" sm=\"12\"><thumbnail src=\"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjQyIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDI0MiAyMDAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPjwhLS0KU291cmNlIFVSTDogaG9sZGVyLmpzLzEwMCV4MjAwCkNyZWF0ZWQgd2l0aCBIb2xkZXIuanMgMi42LjAuCkxlYXJuIG1vcmUgYXQgaHR0cDovL2hvbGRlcmpzLmNvbQooYykgMjAxMi0yMDE1IEl2YW4gTWFsb3BpbnNreSAtIGh0dHA6Ly9pbXNreS5jbwotLT48ZGVmcz48c3R5bGUgdHlwZT0idGV4dC9jc3MiPjwhW0NEQVRBWyNob2xkZXJfMTUxODA4Yjk1MDQgdGV4dCB7IGZpbGw6I0FBQUFBQTtmb250LXdlaWdodDpib2xkO2ZvbnQtZmFtaWx5OkFyaWFsLCBIZWx2ZXRpY2EsIE9wZW4gU2Fucywgc2Fucy1zZXJpZiwgbW9ub3NwYWNlO2ZvbnQtc2l6ZToxMnB0IH0gXV0+PC9zdHlsZT48L2RlZnM+PGcgaWQ9ImhvbGRlcl8xNTE4MDhiOTUwNCI+PHJlY3Qgd2lkdGg9IjI0MiIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNFRUVFRUUiLz48Zz48dGV4dCB4PSI4OS44NTkzNzUiIHk9IjEwNS40Ij4yNDJ4MjAwPC90ZXh0PjwvZz48L2c+PC9zdmc+\" alt=\"示例图\"><h3>标题</h3><p>描述信息在这里</p><p><button bs-style=\"primary\">按钮</button><button>按钮</button></p></thumbnail></column><column md=\"4\" sm=\"12\"><thumbnail src=\"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjQyIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDI0MiAyMDAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPjwhLS0KU291cmNlIFVSTDogaG9sZGVyLmpzLzEwMCV4MjAwCkNyZWF0ZWQgd2l0aCBIb2xkZXIuanMgMi42LjAuCkxlYXJuIG1vcmUgYXQgaHR0cDovL2hvbGRlcmpzLmNvbQooYykgMjAxMi0yMDE1IEl2YW4gTWFsb3BpbnNreSAtIGh0dHA6Ly9pbXNreS5jbwotLT48ZGVmcz48c3R5bGUgdHlwZT0idGV4dC9jc3MiPjwhW0NEQVRBWyNob2xkZXJfMTUxODA4Yjk1MDQgdGV4dCB7IGZpbGw6I0FBQUFBQTtmb250LXdlaWdodDpib2xkO2ZvbnQtZmFtaWx5OkFyaWFsLCBIZWx2ZXRpY2EsIE9wZW4gU2Fucywgc2Fucy1zZXJpZiwgbW9ub3NwYWNlO2ZvbnQtc2l6ZToxMnB0IH0gXV0+PC9zdHlsZT48L2RlZnM+PGcgaWQ9ImhvbGRlcl8xNTE4MDhiOTUwNCI+PHJlY3Qgd2lkdGg9IjI0MiIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNFRUVFRUUiLz48Zz48dGV4dCB4PSI4OS44NTkzNzUiIHk9IjEwNS40Ij4yNDJ4MjAwPC90ZXh0PjwvZz48L2c+PC9zdmc+\" alt=\"示例图\"><h3>标题</h3><p>描述信息在这里</p><p><button bs-style=\"primary\">按钮</button><button>按钮</button></p></thumbnail></column></row><p><strong class=\"pl-k\">'href'</strong>：链接地址</p><p><strong class=\"pl-k\">'target'</strong>：目标项</p><p><strong class=\"pl-k\">'src'</strong>：图片地址</p><p><strong class=\"pl-k\">'alt'</strong>：图片标注信息</p><p><textarea name=\"example-code-thumbnail\"><template>\n  <row>\n    <column md='4' sm='12'>\n      <thumbnail\n      src='http://',\n      alt='image',\n      href='url',\n      target='_blank'\n      >\n      <h3>title</h3>\n      <p>content</p>\n      <p>\n        <button bs-style='pimary'>按钮</button>\n        <button>按钮</button>\n      </p>\n      </thumbnail>\n    </column>\n    <column md='4' sm='12'>\n      <thumbnail\n      src='http://',\n      alt='image',\n      href='url',\n      target='_blank'\n      >\n      <h3>title</h3>\n      <p>content</p>\n      <p>\n        <button bs-style='pimary'>按钮</button>\n        <button>按钮</button>\n      </p>\n      </thumbnail>\n    </column>\n    <column md='4' sm='12'>\n      <thumbnail\n      src='http://',\n      alt='image',\n      href='url',\n      target='_blank'\n      >\n      <h3>title</h3>\n      <p>content</p>\n      <p>\n        <button bs-style='pimary'>按钮</button>\n        <button>按钮</button>\n      </p>\n      </thumbnail>\n    </column>\n  </row>\n</template></textarea></p></div></panel><h3 id=\"vbs-progressbar\">进度条－Progressbar</h3><panel><div slot=\"panel-header\">说明</div><div slot=\"panel-body\"><div><progressbar v-bind:progress=\"progress\" bs-style=\"danger\" v-bind:striped=\"true\" v-bind:animation=\"true\">{{progress}}</progressbar><button @click=\"addProgress\">进度变化点击我</button></div><p><strong class=\"pl-k\">'progress'</strong>：Number类型，当前进度数</p><p><strong class=\"pl-k\">'min'</strong>：Number类型，最小值，默认：0</p><p><strong class=\"pl-k\">'max'</strong>：Number类型，最大值，默认：100</p><p><strong class=\"pl-k\">'bs-style'</strong>：样式类型</p><p><strong class=\"pl-k\">'striped'</strong>：bool类型，条纹状</p><p><strong class=\"pl-k\">'animation'</strong>：bool类型，条纹动画效果</p><p><textarea name=\"example-code-progressbar\"><template>\n  <progressbar\n  v-bind:progress='progress'\n  bs-style='danger'\n  v-bind:striped='true'\n  v-bind:animation='true'>\n    {&nbsp;{progress}&nbsp;}\n  </progressbar>\n</template></textarea></p></div></panel>";

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "carousel1.png?a56f1b44a9ee72695530806d02b23d4f";

/***/ }
/******/ ]);
//# sourceMappingURL=build.js.map
