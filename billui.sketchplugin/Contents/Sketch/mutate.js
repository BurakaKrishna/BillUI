var that = this;
function __skpm_run (key, context) {
  that.context = context;

var exports =
/******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/mutate.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@skpm/timers/immediate.js":
/*!************************************************!*\
  !*** ./node_modules/@skpm/timers/immediate.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* globals coscript, sketch */
var timeout = __webpack_require__(/*! ./timeout */ "./node_modules/@skpm/timers/timeout.js")

function setImmediate(func, param1, param2, param3, param4, param5, param6, param7, param8, param9, param10) {
  return timeout.setTimeout(func, 0, param1, param2, param3, param4, param5, param6, param7, param8, param9, param10)
}

function clearImmediate(id) {
  return timeout.clearTimeout(id)
}

module.exports = {
  setImmediate: setImmediate,
  clearImmediate: clearImmediate
}


/***/ }),

/***/ "./node_modules/@skpm/timers/test-if-fiber.js":
/*!****************************************************!*\
  !*** ./node_modules/@skpm/timers/test-if-fiber.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function () {
  return typeof coscript !== 'undefined' && coscript.createFiber
}


/***/ }),

/***/ "./node_modules/@skpm/timers/timeout.js":
/*!**********************************************!*\
  !*** ./node_modules/@skpm/timers/timeout.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* globals coscript, sketch */
var fiberAvailable = __webpack_require__(/*! ./test-if-fiber */ "./node_modules/@skpm/timers/test-if-fiber.js")

var setTimeout
var clearTimeout

var fibers = []

if (fiberAvailable()) {
  var fibers = []

  setTimeout = function (func, delay, param1, param2, param3, param4, param5, param6, param7, param8, param9, param10) {
    // fibers takes care of keeping coscript around
    var id = fibers.length
    fibers.push(coscript.scheduleWithInterval_jsFunction(
      (delay || 0) / 1000,
      function () {
        func(param1, param2, param3, param4, param5, param6, param7, param8, param9, param10)
      }
    ))
    return id
  }

  clearTimeout = function (id) {
    var timeout = fibers[id]
    if (timeout) {
      timeout.cancel() // fibers takes care of keeping coscript around
      fibers[id] = undefined // garbage collect the fiber
    }
  }
} else {
  setTimeout = function (func, delay, param1, param2, param3, param4, param5, param6, param7, param8, param9, param10) {
    coscript.shouldKeepAround = true
    var id = fibers.length
    fibers.push(true)
    coscript.scheduleWithInterval_jsFunction(
      (delay || 0) / 1000,
      function () {
        if (fibers[id]) { // if not cleared
          func(param1, param2, param3, param4, param5, param6, param7, param8, param9, param10)
        }
        clearTimeout(id)
        if (fibers.every(function (_id) { return !_id })) { // if everything is cleared
          coscript.shouldKeepAround = false
        }
      }
    )
    return id
  }

  clearTimeout = function (id) {
    fibers[id] = false
  }
}

module.exports = {
  setTimeout: setTimeout,
  clearTimeout: clearTimeout
}


/***/ }),

/***/ "./node_modules/cocoascript-class/lib/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/cocoascript-class/lib/index.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SuperCall = undefined;
exports.default = ObjCClass;

var _runtime = __webpack_require__(/*! ./runtime.js */ "./node_modules/cocoascript-class/lib/runtime.js");

exports.SuperCall = _runtime.SuperCall;

// super when returnType is id and args are void
// id objc_msgSendSuper(struct objc_super *super, SEL op, void)

const SuperInit = (0, _runtime.SuperCall)(NSStringFromSelector("init"), [], { type: "@" });

// Returns a real ObjC class. No need to use new.
function ObjCClass(defn) {
  const superclass = defn.superclass || NSObject;
  const className = (defn.className || defn.classname || "ObjCClass") + NSUUID.UUID().UUIDString();
  const reserved = new Set(['className', 'classname', 'superclass']);
  var cls = MOClassDescription.allocateDescriptionForClassWithName_superclass_(className, superclass);
  // Add each handler to the class description
  const ivars = [];
  for (var key in defn) {
    const v = defn[key];
    if (typeof v == 'function' && key !== 'init') {
      var selector = NSSelectorFromString(key);
      cls.addInstanceMethodWithSelector_function_(selector, v);
    } else if (!reserved.has(key)) {
      ivars.push(key);
      cls.addInstanceVariableWithName_typeEncoding(key, "@");
    }
  }

  cls.addInstanceMethodWithSelector_function_(NSSelectorFromString('init'), function () {
    const self = SuperInit.call(this);
    ivars.map(name => {
      Object.defineProperty(self, name, {
        get() {
          return getIvar(self, name);
        },
        set(v) {
          (0, _runtime.object_setInstanceVariable)(self, name, v);
        }
      });
      self[name] = defn[name];
    });
    // If there is a passsed-in init funciton, call it now.
    if (typeof defn.init == 'function') defn.init.call(this);
    return self;
  });

  return cls.registerClass();
};

function getIvar(obj, name) {
  const retPtr = MOPointer.new();
  (0, _runtime.object_getInstanceVariable)(obj, name, retPtr);
  return retPtr.value().retain().autorelease();
}

/***/ }),

/***/ "./node_modules/cocoascript-class/lib/runtime.js":
/*!*******************************************************!*\
  !*** ./node_modules/cocoascript-class/lib/runtime.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SuperCall = SuperCall;
exports.CFunc = CFunc;
const objc_super_typeEncoding = '{objc_super="receiver"@"super_class"#}';

// You can store this to call your function. this must be bound to the current instance.
function SuperCall(selector, argTypes, returnType) {
  const func = CFunc("objc_msgSendSuper", [{ type: '^' + objc_super_typeEncoding }, { type: ":" }, ...argTypes], returnType);
  return function (...args) {
    const struct = make_objc_super(this, this.superclass());
    const structPtr = MOPointer.alloc().initWithValue_(struct);
    return func(structPtr, selector, ...args);
  };
}

// Recursively create a MOStruct
function makeStruct(def) {
  if (typeof def !== 'object' || Object.keys(def).length == 0) {
    return def;
  }
  const name = Object.keys(def)[0];
  const values = def[name];

  const structure = MOStruct.structureWithName_memberNames_runtime(name, Object.keys(values), Mocha.sharedRuntime());

  Object.keys(values).map(member => {
    structure[member] = makeStruct(values[member]);
  });

  return structure;
}

function make_objc_super(self, cls) {
  return makeStruct({
    objc_super: {
      receiver: self,
      super_class: cls
    }
  });
}

// Due to particularities of the JS bridge, we can't call into MOBridgeSupport objects directly
// But, we can ask key value coding to do the dirty work for us ;)
function setKeys(o, d) {
  const funcDict = NSMutableDictionary.dictionary();
  funcDict.o = o;
  Object.keys(d).map(k => funcDict.setValue_forKeyPath(d[k], "o." + k));
}

// Use any C function, not just ones with BridgeSupport
function CFunc(name, args, retVal) {
  function makeArgument(a) {
    if (!a) return null;
    const arg = MOBridgeSupportArgument.alloc().init();
    setKeys(arg, {
      type64: a.type
    });
    return arg;
  }
  const func = MOBridgeSupportFunction.alloc().init();
  setKeys(func, {
    name: name,
    arguments: args.map(makeArgument),
    returnValue: makeArgument(retVal)
  });
  return func;
}

/*
@encode(char*) = "*"
@encode(id) = "@"
@encode(Class) = "#"
@encode(void*) = "^v"
@encode(CGRect) = "{CGRect={CGPoint=dd}{CGSize=dd}}"
@encode(SEL) = ":"
*/

function addStructToBridgeSupport(key, structDef) {
  // OK, so this is probably the nastiest hack in this file.
  // We go modify MOBridgeSupportController behind its back and use kvc to add our own definition
  // There isn't another API for this though. So the only other way would be to make a real bridgesupport file.
  const symbols = MOBridgeSupportController.sharedController().valueForKey('symbols');
  if (!symbols) throw Error("Something has changed within bridge support so we can't add our definitions");
  // If someone already added this definition, don't re-register it.
  if (symbols[key] !== null) return;
  const def = MOBridgeSupportStruct.alloc().init();
  setKeys(def, {
    name: key,
    type: structDef.type
  });
  symbols[key] = def;
};

// This assumes the ivar is an object type. Return value is pretty useless.
const object_getInstanceVariable = exports.object_getInstanceVariable = CFunc("object_getInstanceVariable", [{ type: "@" }, { type: '*' }, { type: "^@" }], { type: "^{objc_ivar=}" });
// Again, ivar is of object type
const object_setInstanceVariable = exports.object_setInstanceVariable = CFunc("object_setInstanceVariable", [{ type: "@" }, { type: '*' }, { type: "@" }], { type: "^{objc_ivar=}" });

// We need Mocha to understand what an objc_super is so we can use it as a function argument
addStructToBridgeSupport('objc_super', { type: objc_super_typeEncoding });

/***/ }),

/***/ "./node_modules/promise-polyfill/lib/index.js":
/*!****************************************************!*\
  !*** ./node_modules/promise-polyfill/lib/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(setTimeout, setImmediate) {

/**
 * @this {Promise}
 */
function finallyConstructor(callback) {
  var constructor = this.constructor;
  return this.then(
    function(value) {
      return constructor.resolve(callback()).then(function() {
        return value;
      });
    },
    function(reason) {
      return constructor.resolve(callback()).then(function() {
        return constructor.reject(reason);
      });
    }
  );
}

// Store setTimeout reference so promise-polyfill will be unaffected by
// other code modifying setTimeout (like sinon.useFakeTimers())
var setTimeoutFunc = setTimeout;

function noop() {}

// Polyfill for Function.prototype.bind
function bind(fn, thisArg) {
  return function() {
    fn.apply(thisArg, arguments);
  };
}

/**
 * @constructor
 * @param {Function} fn
 */
function Promise(fn) {
  if (!(this instanceof Promise))
    throw new TypeError('Promises must be constructed via new');
  if (typeof fn !== 'function') throw new TypeError('not a function');
  /** @type {!number} */
  this._state = 0;
  /** @type {!boolean} */
  this._handled = false;
  /** @type {Promise|undefined} */
  this._value = undefined;
  /** @type {!Array<!Function>} */
  this._deferreds = [];

  doResolve(fn, this);
}

function handle(self, deferred) {
  while (self._state === 3) {
    self = self._value;
  }
  if (self._state === 0) {
    self._deferreds.push(deferred);
    return;
  }
  self._handled = true;
  Promise._immediateFn(function() {
    var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected;
    if (cb === null) {
      (self._state === 1 ? resolve : reject)(deferred.promise, self._value);
      return;
    }
    var ret;
    try {
      ret = cb(self._value);
    } catch (e) {
      reject(deferred.promise, e);
      return;
    }
    resolve(deferred.promise, ret);
  });
}

function resolve(self, newValue) {
  try {
    // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
    if (newValue === self)
      throw new TypeError('A promise cannot be resolved with itself.');
    if (
      newValue &&
      (typeof newValue === 'object' || typeof newValue === 'function')
    ) {
      var then = newValue.then;
      if (newValue instanceof Promise) {
        self._state = 3;
        self._value = newValue;
        finale(self);
        return;
      } else if (typeof then === 'function') {
        doResolve(bind(then, newValue), self);
        return;
      }
    }
    self._state = 1;
    self._value = newValue;
    finale(self);
  } catch (e) {
    reject(self, e);
  }
}

function reject(self, newValue) {
  self._state = 2;
  self._value = newValue;
  finale(self);
}

function finale(self) {
  if (self._state === 2 && self._deferreds.length === 0) {
    Promise._immediateFn(function() {
      if (!self._handled) {
        Promise._unhandledRejectionFn(self._value);
      }
    });
  }

  for (var i = 0, len = self._deferreds.length; i < len; i++) {
    handle(self, self._deferreds[i]);
  }
  self._deferreds = null;
}

/**
 * @constructor
 */
function Handler(onFulfilled, onRejected, promise) {
  this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
  this.onRejected = typeof onRejected === 'function' ? onRejected : null;
  this.promise = promise;
}

/**
 * Take a potentially misbehaving resolver function and make sure
 * onFulfilled and onRejected are only called once.
 *
 * Makes no guarantees about asynchrony.
 */
function doResolve(fn, self) {
  var done = false;
  try {
    fn(
      function(value) {
        if (done) return;
        done = true;
        resolve(self, value);
      },
      function(reason) {
        if (done) return;
        done = true;
        reject(self, reason);
      }
    );
  } catch (ex) {
    if (done) return;
    done = true;
    reject(self, ex);
  }
}

Promise.prototype['catch'] = function(onRejected) {
  return this.then(null, onRejected);
};

Promise.prototype.then = function(onFulfilled, onRejected) {
  // @ts-ignore
  var prom = new this.constructor(noop);

  handle(this, new Handler(onFulfilled, onRejected, prom));
  return prom;
};

Promise.prototype['finally'] = finallyConstructor;

Promise.all = function(arr) {
  return new Promise(function(resolve, reject) {
    if (!arr || typeof arr.length === 'undefined')
      throw new TypeError('Promise.all accepts an array');
    var args = Array.prototype.slice.call(arr);
    if (args.length === 0) return resolve([]);
    var remaining = args.length;

    function res(i, val) {
      try {
        if (val && (typeof val === 'object' || typeof val === 'function')) {
          var then = val.then;
          if (typeof then === 'function') {
            then.call(
              val,
              function(val) {
                res(i, val);
              },
              reject
            );
            return;
          }
        }
        args[i] = val;
        if (--remaining === 0) {
          resolve(args);
        }
      } catch (ex) {
        reject(ex);
      }
    }

    for (var i = 0; i < args.length; i++) {
      res(i, args[i]);
    }
  });
};

Promise.resolve = function(value) {
  if (value && typeof value === 'object' && value.constructor === Promise) {
    return value;
  }

  return new Promise(function(resolve) {
    resolve(value);
  });
};

Promise.reject = function(value) {
  return new Promise(function(resolve, reject) {
    reject(value);
  });
};

Promise.race = function(values) {
  return new Promise(function(resolve, reject) {
    for (var i = 0, len = values.length; i < len; i++) {
      values[i].then(resolve, reject);
    }
  });
};

// Use polyfill for setImmediate for performance gains
Promise._immediateFn =
  (typeof setImmediate === 'function' &&
    function(fn) {
      setImmediate(fn);
    }) ||
  function(fn) {
    setTimeoutFunc(fn, 0);
  };

Promise._unhandledRejectionFn = function _unhandledRejectionFn(err) {
  if (typeof console !== 'undefined' && console) {
    console.warn('Possible Unhandled Promise Rejection:', err); // eslint-disable-line no-console
  }
};

module.exports = Promise;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@skpm/timers/timeout.js */ "./node_modules/@skpm/timers/timeout.js")["setTimeout"], __webpack_require__(/*! ./node_modules/@skpm/timers/immediate.js */ "./node_modules/@skpm/timers/immediate.js")["setImmediate"]))

/***/ }),

/***/ "./node_modules/sketch-module-web-view/lib/browser-api.js":
/*!****************************************************************!*\
  !*** ./node_modules/sketch-module-web-view/lib/browser-api.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var COLOR_CLASSES = [
  'NSColor',
  'NSCachedWhiteColor',
  'NSColorSpaceColor',
  'NSDynamicSystemColor',
  'NSCachedColorSpaceColor',
]
function parseHexColor(color) {
  // Check the string for incorrect formatting.
  if (!color || color[0] !== '#') {
    if (
      color &&
      color.class &&
      COLOR_CLASSES.indexOf(String(color.class())) !== -1
    ) {
      return color
    }
    throw new Error(
      'Incorrect color formating. It should be an hex color: #RRGGBBAA'
    )
  }

  // append FF if alpha channel is not specified.
  var source = color.substr(1)
  if (source.length === 3) {
    source += 'F'
  } else if (source.length === 6) {
    source += 'FF'
  }
  // Convert the string from #FFF format to #FFFFFF format.
  var hex
  if (source.length === 4) {
    for (var i = 0; i < 4; i += 1) {
      hex += source[i]
      hex += source[i]
    }
  } else if (source.length === 8) {
    hex = source
  } else {
    return NSColor.whiteColor()
  }

  var r = parseInt(hex.slice(0, 2), 16)
  var g = parseInt(hex.slice(2, 4), 16)
  var b = parseInt(hex.slice(4, 6), 16)
  var a = parseInt(hex.slice(6, 8), 16)

  return NSColor.colorWithSRGBRed_green_blue_alpha(r, g, b, a)
}

module.exports = function(browserWindow, panel, webview) {
  // keep reference to the subviews
  browserWindow._panel = panel
  browserWindow._webview = webview
  browserWindow._destroyed = false

  browserWindow.destroy = function() {
    return panel.close()
  }

  browserWindow.close = function() {
    if (panel.delegate().utils.parentWindow) {
      var shouldClose = true
      browserWindow.emit('close', {
        get defaultPrevented() {
          return !shouldClose
        },
        preventDefault: function() {
          shouldClose = false
        },
      })
      if (shouldClose) {
        panel.delegate().utils.parentWindow.endSheet(panel)
      }
      return
    }

    if (!browserWindow.isClosable()) {
      return
    }

    panel.performClose(null)
  }

  function focus(focused) {
    if (browserWindow.isVisible()) {
      return
    }
    if (focused) {
      NSApplication.sharedApplication().activateIgnoringOtherApps(true)
      panel.makeKeyAndOrderFront(null)
    } else {
      panel.orderBack(null)
    }
  }

  browserWindow.focus = focus.bind(this, true)
  browserWindow.blur = focus.bind(this, false)

  browserWindow.isFocused = function() {
    return panel.isKeyWindow()
  }

  browserWindow.isDestroyed = function() {
    return browserWindow._destroyed
  }

  browserWindow.show = function() {
    // This method is supposed to put focus on window, however if the app does not
    // have focus then "makeKeyAndOrderFront" will only show the window.
    NSApp.activateIgnoringOtherApps(true)

    if (panel.delegate().utils.parentWindow) {
      return panel.delegate().utils.parentWindow.beginSheet_completionHandler(
        panel,
        __mocha__.createBlock_function('v16@?0q8', function() {
          browserWindow.emit('closed')
        })
      )
    }

    return panel.makeKeyAndOrderFront(null)
  }

  browserWindow.showInactive = function() {
    return panel.orderFrontRegardless()
  }

  browserWindow.hide = function() {
    return panel.orderOut(null)
  }

  browserWindow.isVisible = function() {
    return panel.isVisible()
  }

  browserWindow.isModal = function() {
    return false
  }

  browserWindow.maximize = function() {
    if (!browserWindow.isMaximized()) {
      panel.zoom(null)
    }
  }
  browserWindow.unmaximize = function() {
    if (browserWindow.isMaximized()) {
      panel.zoom(null)
    }
  }

  browserWindow.isMaximized = function() {
    if ((panel.styleMask() & NSResizableWindowMask) !== 0) {
      return panel.isZoomed()
    }
    var rectScreen = NSScreen.mainScreen().visibleFrame()
    var rectWindow = panel.frame()
    return (
      rectScreen.origin.x == rectWindow.origin.x &&
      rectScreen.origin.y == rectWindow.origin.y &&
      rectScreen.size.width == rectWindow.size.width &&
      rectScreen.size.height == rectWindow.size.height
    )
  }

  browserWindow.minimize = function() {
    return panel.miniaturize(null)
  }

  browserWindow.restore = function() {
    return panel.deminiaturize(null)
  }

  browserWindow.isMinimized = function() {
    return panel.isMiniaturized()
  }

  browserWindow.setFullScreen = function(fullscreen) {
    if (fullscreen !== browserWindow.isFullscreen()) {
      panel.toggleFullScreen(null)
    }
  }

  browserWindow.isFullscreen = function() {
    return panel.styleMask() & NSFullScreenWindowMask
  }

  browserWindow.setAspectRatio = function(aspectRatio /* , extraSize */) {
    // Reset the behaviour to default if aspect_ratio is set to 0 or less.
    if (aspectRatio > 0.0) {
      panel.setAspectRatio(NSMakeSize(aspectRatio, 1.0))
    } else {
      panel.setResizeIncrements(NSMakeSize(1.0, 1.0))
    }
  }

  browserWindow.setBounds = function(bounds, animate) {
    // Do nothing if in fullscreen mode.
    if (browserWindow.isFullscreen()) {
      return
    }

    // TODO: Check size constraints since setFrame does not check it.
    var size = bounds.size
    // size.SetToMax(GetMinimumSize());
    // gfx::Size max_size = GetMaximumSize();
    // if (!max_size.IsEmpty())
    //   size.SetToMin(max_size);

    var cocoaBounds = NSMakeRect(bounds.origin.x, 0, size.width, size.height)
    // Flip coordinates based on the primary screen.
    var screen = NSScreen.screens().firstObject()
    cocoaBounds.origin.y =
      NSHeight(screen.frame()) - size.height - bounds.origin.y

    panel.setFrame_display_animate(cocoaBounds, true, animate)
  }

  browserWindow.getBounds = function() {
    return panel.frame()
  }

  browserWindow.setContentBounds = function(/* bounds, animate */) {
    // TODO:
  }

  browserWindow.getContentBounds = function() {
    // TODO:
  }

  browserWindow.setSize = function(width, height, animate) {
    var bounds = browserWindow.getBounds()
    bounds.size.height = height
    bounds.size.width = width

    // TODO: handle resizing around center

    return browserWindow.setBounds(bounds, animate)
  }

  browserWindow.getSize = function() {
    var bounds = browserWindow.getBounds()
    return [bounds.size.width, bounds.size.height]
  }

  browserWindow.setContentSize = function(width, height, animate) {
    var bounds = browserWindow.getContentBounds()
    bounds.size.height = height
    bounds.size.width = width

    // TODO: handle resizing around center

    return browserWindow.setContentBounds(bounds, animate)
  }

  browserWindow.getContentSize = function() {
    var bounds = browserWindow.getContentBounds()
    return [bounds.size.width, bounds.size.height]
  }

  browserWindow.setMinimumSize = function(width, height) {
    const minSize = { width: width, height: height }
    panel.setContentMinSize(minSize)
  }

  browserWindow.getMinimumSize = function() {
    const size = panel.contentMinSize()
    return [size.width, size.height]
  }

  browserWindow.setMaximumSize = function(width, height) {
    const minSize = { width: width, height: height }
    panel.setContentMaxSize(minSize)
  }

  browserWindow.getMaximumSize = function() {
    const size = panel.contentMaxSize()
    return [size.width, size.height]
  }

  browserWindow.setResizable = function(resizable) {
    return browserWindow._setStyleMask(resizable, NSResizableWindowMask)
  }

  browserWindow.isResizable = function() {
    return panel.styleMask() & NSResizableWindowMask
  }

  browserWindow.setMovable = function(movable) {
    return panel.setMovable(movable)
  }
  browserWindow.isMovable = function() {
    return panel.isMovable()
  }

  browserWindow.setMinimizable = function(minimizable) {
    return browserWindow._setStyleMask(minimizable, NSMiniaturizableWindowMask)
  }

  browserWindow.isMinimizable = function() {
    return panel.styleMask() & NSMiniaturizableWindowMask
  }

  browserWindow.setMaximizable = function(maximizable) {
    if (panel.standardWindowButton(NSWindowZoomButton)) {
      panel.standardWindowButton(NSWindowZoomButton).setEnabled(maximizable)
    }
  }

  browserWindow.isMaximizable = function() {
    return (
      panel.standardWindowButton(NSWindowZoomButton) &&
      panel.standardWindowButton(NSWindowZoomButton).isEnabled()
    )
  }

  browserWindow.setFullScreenable = function(fullscreenable) {
    browserWindow._setCollectionBehavior(
      fullscreenable,
      NSWindowCollectionBehaviorFullScreenPrimary
    )
    // On EL Capitan this flag is required to hide fullscreen button.
    browserWindow._setCollectionBehavior(
      !fullscreenable,
      NSWindowCollectionBehaviorFullScreenAuxiliary
    )
  }

  browserWindow.isFullScreenable = function() {
    var collectionBehavior = panel.collectionBehavior()
    return collectionBehavior & NSWindowCollectionBehaviorFullScreenPrimary
  }

  browserWindow.setClosable = function(closable) {
    browserWindow._setStyleMask(closable, NSClosableWindowMask)
  }

  browserWindow.isClosable = function() {
    return panel.styleMask() & NSClosableWindowMask
  }

  browserWindow.setAlwaysOnTop = function(top, level, relativeLevel) {
    var windowLevel = NSNormalWindowLevel
    var maxWindowLevel = CGWindowLevelForKey(kCGMaximumWindowLevelKey)
    var minWindowLevel = CGWindowLevelForKey(kCGMinimumWindowLevelKey)

    if (top) {
      if (level === 'normal') {
        windowLevel = NSNormalWindowLevel
      } else if (level === 'torn-off-menu') {
        windowLevel = NSTornOffMenuWindowLevel
      } else if (level === 'modal-panel') {
        windowLevel = NSModalPanelWindowLevel
      } else if (level === 'main-menu') {
        windowLevel = NSMainMenuWindowLevel
      } else if (level === 'status') {
        windowLevel = NSStatusWindowLevel
      } else if (level === 'pop-up-menu') {
        windowLevel = NSPopUpMenuWindowLevel
      } else if (level === 'screen-saver') {
        windowLevel = NSScreenSaverWindowLevel
      } else if (level === 'dock') {
        // Deprecated by macOS, but kept for backwards compatibility
        windowLevel = NSDockWindowLevel
      } else {
        windowLevel = NSFloatingWindowLevel
      }
    }

    var newLevel = windowLevel + (relativeLevel || 0)
    if (newLevel >= minWindowLevel && newLevel <= maxWindowLevel) {
      panel.setLevel(newLevel)
    } else {
      throw new Error(
        'relativeLevel must be between ' +
          minWindowLevel +
          ' and ' +
          maxWindowLevel
      )
    }
  }

  browserWindow.isAlwaysOnTop = function() {
    return panel.level() !== NSNormalWindowLevel
  }

  browserWindow.moveTop = function() {
    return panel.orderFrontRegardless()
  }

  browserWindow.center = function() {
    panel.center()
  }

  browserWindow.setPosition = function(x, y, animate) {
    var bounds = browserWindow.getBounds()
    var mainScreenRect = NSScreen.screens()
      .firstObject()
      .frame()
    bounds.origin.x = x
    bounds.origin.y = Math.round(NSHeight(mainScreenRect) - y)

    return browserWindow.setBounds(bounds, animate)
  }

  browserWindow.getPosition = function() {
    var bounds = browserWindow.getBounds()
    var mainScreenRect = NSScreen.screens()
      .firstObject()
      .frame()
    return [
      bounds.origin.x,
      Math.round(NSHeight(mainScreenRect) - bounds.origin.y),
    ]
  }

  browserWindow.setTitle = function(title) {
    panel.setTitle(title)
  }

  browserWindow.getTitle = function() {
    return String(panel.title())
  }

  var attentionRequestId = 0
  browserWindow.flashFrame = function(flash) {
    if (flash) {
      attentionRequestId = NSApp.requestUserAttention(NSInformationalRequest)
    } else {
      NSApp.cancelUserAttentionRequest(attentionRequestId)
      attentionRequestId = 0
    }
  }

  browserWindow.getNativeWindowHandle = function() {
    return panel
  }

  browserWindow.getNativeWebViewHandle = function() {
    return webview
  }

  browserWindow.loadURL = function(url) {
    // When frameLocation is a file, prefix it with the Sketch Resources path
    if (/^(?!http|localhost|www|file).*\.html?$/.test(url)) {
      if (typeof __command !== 'undefined' && __command.pluginBundle()) {
        url =
          'file://' +
          __command
            .pluginBundle()
            .urlForResourceNamed(url)
            .path()
      }
    }

    if (/^file:\/\/.*\.html?$/.test(url)) {
      webview.loadFileURL_allowingReadAccessToURL(
        NSURL.fileURLWithPath(url),
        NSURL.fileURLWithPath('file:///')
      )
      return
    }

    webview.loadRequest(NSURLRequest.requestWithURL(NSURL.URLWithString(url)))
  }

  browserWindow.reload = function() {
    webview.reload()
  }

  browserWindow.setHasShadow = function(hasShadow) {
    return panel.setHasShadow(hasShadow)
  }

  browserWindow.hasShadow = function() {
    return panel.hasShadow()
  }

  browserWindow.setOpacity = function(opacity) {
    return panel.setAlphaValue(opacity)
  }

  browserWindow.getOpacity = function() {
    return panel.alphaValue()
  }

  browserWindow.setVisibleOnAllWorkspaces = function(visible) {
    return browserWindow._setCollectionBehavior(
      visible,
      NSWindowCollectionBehaviorCanJoinAllSpaces
    )
  }

  browserWindow.isVisibleOnAllWorkspaces = function() {
    var collectionBehavior = panel.collectionBehavior()
    return collectionBehavior & NSWindowCollectionBehaviorCanJoinAllSpaces
  }

  browserWindow.setIgnoreMouseEvents = function(ignore) {
    return panel.setIgnoresMouseEvents(ignore)
  }

  browserWindow.setContentProtection = function(enable) {
    panel.setSharingType(enable ? NSWindowSharingNone : NSWindowSharingReadOnly)
  }

  browserWindow.setAutoHideCursor = function(autoHide) {
    panel.setDisableAutoHideCursor(autoHide)
  }

  browserWindow.setVibrancy = function(type) {
    var effectView = browserWindow._vibrantView

    if (!type) {
      if (effectView == null) {
        return
      }

      effectView.removeFromSuperview()
      panel.setVibrantView(null)
      return
    }

    if (effectView == null) {
      var contentView = panel.contentView()
      effectView = NSVisualEffectView.alloc().initWithFrame(
        contentView.bounds()
      )
      browserWindow._vibrantView = effectView

      effectView.setAutoresizingMask(NSViewWidthSizable | NSViewHeightSizable)
      effectView.setBlendingMode(NSVisualEffectBlendingModeBehindWindow)
      effectView.setState(NSVisualEffectStateActive)
      effectView.setFrame(contentView.bounds())
      contentView.addSubview_positioned_relativeTo(
        effectView,
        NSWindowBelow,
        null
      )
    }

    var vibrancyType = NSVisualEffectMaterialLight

    if (type === 'appearance-based') {
      vibrancyType = NSVisualEffectMaterialAppearanceBased
    } else if (type === 'light') {
      vibrancyType = NSVisualEffectMaterialLight
    } else if (type === 'dark') {
      vibrancyType = NSVisualEffectMaterialDark
    } else if (type === 'titlebar') {
      vibrancyType = NSVisualEffectMaterialTitlebar
    } else if (type === 'selection') {
      vibrancyType = NSVisualEffectMaterialSelection
    } else if (type === 'menu') {
      vibrancyType = NSVisualEffectMaterialMenu
    } else if (type === 'popover') {
      vibrancyType = NSVisualEffectMaterialPopover
    } else if (type === 'sidebar') {
      vibrancyType = NSVisualEffectMaterialSidebar
    } else if (type === 'medium-light') {
      vibrancyType = NSVisualEffectMaterialMediumLight
    } else if (type === 'ultra-dark') {
      vibrancyType = NSVisualEffectMaterialUltraDark
    }

    effectView.setMaterial(vibrancyType)
  }

  browserWindow._setBackgroundColor = function(colorName) {
    var color = parseHexColor(colorName)
    webview.isOpaque = false
    webview.setBackgroundColor(NSColor.clearColor())
    panel.backgroundColor = color
  }

  browserWindow._invalidate = function() {
    panel.flushWindow()
    panel.contentView().setNeedsDisplay(true)
  }

  browserWindow._setStyleMask = function(on, flag) {
    var wasMaximizable = browserWindow.isMaximizable()
    if (on) {
      panel.setStyleMask(panel.styleMask() | flag)
    } else {
      panel.setStyleMask(panel.styleMask() & ~flag)
    }
    // Change style mask will make the zoom button revert to default, probably
    // a bug of Cocoa or macOS.
    browserWindow.setMaximizable(wasMaximizable)
  }

  browserWindow._setCollectionBehavior = function(on, flag) {
    var wasMaximizable = browserWindow.isMaximizable()
    if (on) {
      panel.setCollectionBehavior(panel.collectionBehavior() | flag)
    } else {
      panel.setCollectionBehavior(panel.collectionBehavior() & ~flag)
    }
    // Change collectionBehavior will make the zoom button revert to default,
    // probably a bug of Cocoa or macOS.
    browserWindow.setMaximizable(wasMaximizable)
  }

  browserWindow._showWindowButton = function(button) {
    var view = panel.standardWindowButton(button)
    view.superview().addSubview_positioned_relative(view, NSWindowAbove, null)
  }
}


/***/ }),

/***/ "./node_modules/sketch-module-web-view/lib/constants.js":
/*!**************************************************************!*\
  !*** ./node_modules/sketch-module-web-view/lib/constants.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  JS_BRIDGE: '__skpm_sketchBridge',
}


/***/ }),

/***/ "./node_modules/sketch-module-web-view/lib/dispatch-first-click.js":
/*!*************************************************************************!*\
  !*** ./node_modules/sketch-module-web-view/lib/dispatch-first-click.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var tagsToFocus =
  '["text", "textarea", "date", "datetime-local", "email", "number", "month", "password", "search", "tel", "time", "url", "week" ]'

module.exports = function(webView, event) {
  var point = webView.convertPoint_fromView(event.locationInWindow(), null)
  var x = point.x
  var y = webView.frame().size.height - point.y // the coord start from the bottom instead of the top
  return (
    'var el = document.elementFromPoint(' + // get the DOM element that match the event
    x +
    ', ' +
    y +
    '); ' +
    'if (el && ' + // some tags need to be focused instead of clicked
    tagsToFocus +
    '.indexOf(el.type) >= 0 && ' +
    'el.focus' +
    ') {' +
    'el.focus();' + // so focus them
    '} else if (el) {' +
    'el.dispatchEvent(new Event("click", {bubbles: true}))' + // click the others
    '}'
  )
}


/***/ }),

/***/ "./node_modules/sketch-module-web-view/lib/fitSubview.js":
/*!***************************************************************!*\
  !*** ./node_modules/sketch-module-web-view/lib/fitSubview.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function addEdgeConstraint(edge, subview, view, constant) {
  view.addConstraint(
    NSLayoutConstraint.constraintWithItem_attribute_relatedBy_toItem_attribute_multiplier_constant(
      subview,
      edge,
      NSLayoutRelationEqual,
      view,
      edge,
      1,
      constant
    )
  )
}
module.exports = function fitSubviewToView(subview, view, constants) {
  constants = constants || []
  subview.setTranslatesAutoresizingMaskIntoConstraints(false)

  addEdgeConstraint(NSLayoutAttributeLeft, subview, view, constants[0] || 0)
  addEdgeConstraint(NSLayoutAttributeTop, subview, view, constants[1] || 0)
  addEdgeConstraint(NSLayoutAttributeRight, subview, view, constants[2] || 0)
  addEdgeConstraint(NSLayoutAttributeBottom, subview, view, constants[3] || 0)
}


/***/ }),

/***/ "./node_modules/sketch-module-web-view/lib/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/sketch-module-web-view/lib/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* let's try to match the API from Electron's Browser window
(https://github.com/electron/electron/blob/master/docs/api/browser-window.md) */
var EventEmitter = __webpack_require__(/*! events */ "events")
var buildBrowserAPI = __webpack_require__(/*! ./browser-api */ "./node_modules/sketch-module-web-view/lib/browser-api.js")
var buildWebAPI = __webpack_require__(/*! ./webview-api */ "./node_modules/sketch-module-web-view/lib/webview-api.js")
var fitSubviewToView = __webpack_require__(/*! ./fitSubview */ "./node_modules/sketch-module-web-view/lib/fitSubview.js")
var dispatchFirstClick = __webpack_require__(/*! ./dispatch-first-click */ "./node_modules/sketch-module-web-view/lib/dispatch-first-click.js")
var injectClientMessaging = __webpack_require__(/*! ./inject-client-messaging */ "./node_modules/sketch-module-web-view/lib/inject-client-messaging.js")
var setDelegates = __webpack_require__(/*! ./set-delegates */ "./node_modules/sketch-module-web-view/lib/set-delegates.js")

function BrowserWindow(options) {
  options = options || {}

  var identifier = options.identifier || NSUUID.UUID().UUIDString()
  var threadDictionary = NSThread.mainThread().threadDictionary()

  var existingBrowserWindow = BrowserWindow.fromId(identifier)

  // if we already have a window opened, reuse it
  if (existingBrowserWindow) {
    return existingBrowserWindow
  }

  var browserWindow = new EventEmitter()
  browserWindow.id = identifier

  if (options.modal && !options.parent) {
    throw new Error('A modal needs to have a parent.')
  }

  // Long-running script
  var fiber = coscript.createFiber()

  // Window size
  var width = options.width || 800
  var height = options.height || 600
  var mainScreenRect = NSScreen.screens()
    .firstObject()
    .frame()
  var cocoaBounds = NSMakeRect(
    typeof options.x !== 'undefined'
      ? options.x
      : Math.round((NSWidth(mainScreenRect) - width) / 2),
    typeof options.y !== 'undefined'
      ? options.y
      : Math.round((NSHeight(mainScreenRect) - height) / 2),
    width,
    height
  )

  if (options.titleBarStyle && options.titleBarStyle !== 'default') {
    options.frame = false
  }

  var useStandardWindow = options.windowType !== 'textured'
  var styleMask = NSTitledWindowMask

  // this is commented out because the toolbar doesn't appear otherwise :thinking-face:
  // if (!useStandardWindow || options.frame === false) {
  //   styleMask = NSFullSizeContentViewWindowMask
  // }
  if (options.minimizable !== false) {
    styleMask |= NSMiniaturizableWindowMask
  }
  if (options.closable !== false) {
    styleMask |= NSClosableWindowMask
  }
  if (options.resizable !== false) {
    styleMask |= NSResizableWindowMask
  }
  if (!useStandardWindow || options.transparent || options.frame === false) {
    styleMask |= NSTexturedBackgroundWindowMask
  }

  var panel = NSPanel.alloc().initWithContentRect_styleMask_backing_defer(
    cocoaBounds,
    styleMask,
    NSBackingStoreBuffered,
    true
  )

  var wkwebviewConfig = WKWebViewConfiguration.alloc().init()
  var webView = WKWebView.alloc().initWithFrame_configuration(
    CGRectMake(0, 0, options.width || 800, options.height || 600),
    wkwebviewConfig
  )
  injectClientMessaging(webView)
  webView.setAutoresizingMask(NSViewWidthSizable | NSViewHeightSizable)

  buildBrowserAPI(browserWindow, panel, webView)
  buildWebAPI(browserWindow, panel, webView)
  setDelegates(browserWindow, panel, webView, options)

  if (options.windowType === 'desktop') {
    panel.setLevel(kCGDesktopWindowLevel - 1)
    // panel.setCanBecomeKeyWindow(false)
    panel.setCollectionBehavior(
      NSWindowCollectionBehaviorCanJoinAllSpaces |
        NSWindowCollectionBehaviorStationary |
        NSWindowCollectionBehaviorIgnoresCycle
    )
  }

  if (
    typeof options.minWidth !== 'undefined' ||
    typeof options.minHeight !== 'undefined'
  ) {
    browserWindow.setMinimumSize(options.minWidth || 0, options.minHeight || 0)
  }

  if (
    typeof options.maxWidth !== 'undefined' ||
    typeof options.maxHeight !== 'undefined'
  ) {
    browserWindow.setMaximumSize(
      options.maxWidth || 10000,
      options.maxHeight || 10000
    )
  }

  // if (options.focusable === false) {
  //   panel.setCanBecomeKeyWindow(false)
  // }

  if (options.transparent || options.frame === false) {
    panel.titlebarAppearsTransparent = true
    panel.titleVisibility = NSWindowTitleHidden
    panel.setOpaque(0)
    panel.isMovableByWindowBackground = true
    var toolbar2 = NSToolbar.alloc().initWithIdentifier(
      'titlebarStylingToolbar'
    )
    toolbar2.setShowsBaselineSeparator(false)
    panel.setToolbar(toolbar2)
  }

  if (options.titleBarStyle === 'hiddenInset') {
    var toolbar = NSToolbar.alloc().initWithIdentifier('titlebarStylingToolbar')
    toolbar.setShowsBaselineSeparator(false)
    panel.setToolbar(toolbar)
  }

  if (options.frame === false || !options.useContentSize) {
    browserWindow.setSize(width, height)
  }

  if (options.center) {
    browserWindow.center()
  }

  if (options.alwaysOnTop) {
    browserWindow.setAlwaysOnTop(true)
  }

  if (options.fullscreen) {
    browserWindow.setFullScreen(true)
  }
  browserWindow.setFullScreenable(!!options.fullscreenable)

  const title =
    options.title ||
    (typeof __command !== 'undefined' && __command.pluginBundle()
      ? __command.pluginBundle().name()
      : undefined)
  if (title) {
    browserWindow.setTitle(title)
  }

  var backgroundColor = options.backgroundColor
  if (options.transparent) {
    backgroundColor = NSColor.clearColor()
  }
  if (!backgroundColor && options.frame === false && options.vibrancy) {
    backgroundColor = NSColor.clearColor()
  }

  browserWindow._setBackgroundColor(
    backgroundColor || NSColor.windowBackgroundColor()
  )

  if (options.hasShadow === false) {
    browserWindow.setHasShadow(false)
  }

  if (typeof options.opacity !== 'undefined') {
    browserWindow.setOpacity(options.opacity)
  }

  options.webPreferences = options.webPreferences || {}

  webView
    .configuration()
    .preferences()
    .setValue_forKey(
      options.webPreferences.devTools !== false,
      'developerExtrasEnabled'
    )
  webView
    .configuration()
    .preferences()
    .setValue_forKey(
      options.webPreferences.devTools !== false,
      'javaScriptEnabled'
    )
  webView
    .configuration()
    .preferences()
    .setValue_forKey(!!options.webPreferences.plugins, 'plugInsEnabled')
  webView
    .configuration()
    .preferences()
    .setValue_forKey(
      options.webPreferences.minimumFontSize || 0,
      'minimumFontSize'
    )

  if (options.webPreferences.zoomFactor) {
    webView.setMagnification(options.webPreferences.zoomFactor)
  }

  var contentView = panel.contentView()

  if (options.frame !== false) {
    webView.setFrame(contentView.bounds())
    contentView.addSubview(webView)
  } else {
    // In OSX 10.10, adding subviews to the root view for the NSView hierarchy
    // produces warnings. To eliminate the warnings, we resize the contentView
    // to fill the window, and add subviews to that.
    // http://crbug.com/380412
    contentView.setAutoresizingMask(NSViewWidthSizable | NSViewHeightSizable)
    fitSubviewToView(contentView, contentView.superview())

    webView.setFrame(contentView.bounds())
    contentView.addSubview(webView)

    // The fullscreen button should always be hidden for frameless window.
    if (panel.standardWindowButton(NSWindowFullScreenButton)) {
      panel.standardWindowButton(NSWindowFullScreenButton).setHidden(true)
    }

    if (!options.titleBarStyle || options.titleBarStyle === 'default') {
      // Hide the window buttons.
      panel.standardWindowButton(NSWindowZoomButton).setHidden(true)
      panel.standardWindowButton(NSWindowMiniaturizeButton).setHidden(true)
      panel.standardWindowButton(NSWindowCloseButton).setHidden(true)

      // Some third-party macOS utilities check the zoom button's enabled state to
      // determine whether to show custom UI on hover, so we disable it here to
      // prevent them from doing so in a frameless app window.
      panel.standardWindowButton(NSWindowZoomButton).setEnabled(false)
    }
  }

  if (options.vibrancy) {
    browserWindow.setVibrancy(options.vibrancy)
  }

  // Set maximizable state last to ensure zoom button does not get reset
  // by calls to other APIs.
  browserWindow.setMaximizable(options.maximizable !== false)

  if (options.acceptsFirstMouse) {
    browserWindow.on('focus', function(event) {
      if (event.type() === NSEventTypeLeftMouseDown) {
        browserWindow.webContents
          .executeJavaScript(dispatchFirstClick(webView, event))
          .catch(() => {})
      }
    })
  }

  if (options.show !== false) {
    browserWindow.show()
  }

  browserWindow.on('closed', function() {
    browserWindow._destroyed = true
    threadDictionary.removeObjectForKey(identifier)
    fiber.cleanup()
  })

  threadDictionary[identifier] = panel

  fiber.onCleanup(function() {
    if (!browserWindow._destroyed) {
      browserWindow.destroy()
    }
  })

  return browserWindow
}

BrowserWindow.fromId = function(identifier) {
  var threadDictionary = NSThread.mainThread().threadDictionary()

  if (threadDictionary[identifier]) {
    return BrowserWindow.fromPanel(threadDictionary[identifier], identifier)
  }

  return undefined
}

BrowserWindow.fromPanel = function(panel, identifier) {
  var browserWindow = new EventEmitter()
  browserWindow.id = identifier

  if (!panel || !panel.contentView) {
    throw new Error('needs to pass an NSPanel')
  }

  var webView = panel.contentView().subviews()[0]

  if (!webView) {
    throw new Error('The NSPanel needs to have a webview')
  }

  buildBrowserAPI(browserWindow, panel, webView)
  buildWebAPI(browserWindow, panel, webView)

  return browserWindow
}

module.exports = BrowserWindow


/***/ }),

/***/ "./node_modules/sketch-module-web-view/lib/inject-client-messaging.js":
/*!****************************************************************************!*\
  !*** ./node_modules/sketch-module-web-view/lib/inject-client-messaging.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var CONSTANTS = __webpack_require__(/*! ./constants */ "./node_modules/sketch-module-web-view/lib/constants.js")

module.exports = function(webView) {
  var source =
    'window.originalPostMessage = window.postMessage;' +
    'window.postMessage = function(actionName) {' +
    'if (!actionName) {' +
    "throw new Error('missing action name')" +
    '}' +
    'window.webkit.messageHandlers.' +
    CONSTANTS.JS_BRIDGE +
    '.postMessage(' +
    'JSON.stringify([].slice.call(arguments))' +
    ');' +
    '}'
  var script = WKUserScript.alloc().initWithSource_injectionTime_forMainFrameOnly(
    source,
    0,
    true
  )
  webView
    .configuration()
    .userContentController()
    .addUserScript(script)
}


/***/ }),

/***/ "./node_modules/sketch-module-web-view/lib/parseWebArguments.js":
/*!**********************************************************************!*\
  !*** ./node_modules/sketch-module-web-view/lib/parseWebArguments.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(webArguments) {
  var args = null
  try {
    args = JSON.parse(webArguments[0])
  } catch (e) {
    // malformed arguments
  }

  if (
    !args ||
    !args.constructor ||
    args.constructor !== Array ||
    args.length == 0
  ) {
    return null
  }

  return args
}


/***/ }),

/***/ "./node_modules/sketch-module-web-view/lib/set-delegates.js":
/*!******************************************************************!*\
  !*** ./node_modules/sketch-module-web-view/lib/set-delegates.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var ObjCClass = __webpack_require__(/*! cocoascript-class */ "./node_modules/cocoascript-class/lib/index.js").default
var parseWebArguments = __webpack_require__(/*! ./parseWebArguments */ "./node_modules/sketch-module-web-view/lib/parseWebArguments.js")
var CONSTANTS = __webpack_require__(/*! ./constants */ "./node_modules/sketch-module-web-view/lib/constants.js")

// We create one ObjC class for ourselves here
var WindowDelegateClass
var NavigationDelegateClass
var WebScriptHandlerClass

// TODO: events
// - 'page-favicon-updated'
// - 'new-window'
// - 'did-navigate-in-page'
// - 'will-prevent-unload'
// - 'crashed'
// - 'unresponsive'
// - 'responsive'
// - 'destroyed'
// - 'before-input-event'
// - 'certificate-error'
// - 'found-in-page'
// - 'media-started-playing'
// - 'media-paused'
// - 'did-change-theme-color'
// - 'update-target-url'
// - 'cursor-changed'
// - 'context-menu'
// - 'select-bluetooth-device'
// - 'paint'
// - 'console-message'

module.exports = function(browserWindow, panel, webview, options) {
  if (!WindowDelegateClass) {
    WindowDelegateClass = ObjCClass({
      classname: 'WindowDelegateClass',
      utils: null,
      panel: null,

      'windowDidResize:': function() {
        this.utils.emit('resize')
      },

      'windowDidMiniaturize:': function() {
        this.utils.emit('minimize')
      },

      'windowDidDeminiaturize:': function() {
        this.utils.emit('restore')
      },

      'windowDidEnterFullScreen:': function() {
        this.utils.emit('enter-full-screen')
      },

      'windowDidExitFullScreen:': function() {
        this.utils.emit('leave-full-screen')
      },

      'windowDidMove:': function() {
        this.utils.emit('move')
        this.utils.emit('moved')
      },

      'windowShouldClose:': function() {
        var shouldClose = true
        this.utils.emit('close', {
          get defaultPrevented() {
            return !shouldClose
          },
          preventDefault: function() {
            shouldClose = false
          },
        })
        return shouldClose
      },

      'windowWillClose:': function() {
        this.utils.emit('closed')
      },

      'windowDidBecomeKey:': function() {
        this.utils.emit('focus', this.panel.currentEvent())
      },

      'windowDidResignKey:': function() {
        this.utils.emit('blur')
      },
    })
  }

  if (!NavigationDelegateClass) {
    NavigationDelegateClass = ObjCClass({
      classname: 'NavigationDelegateClass',
      state: NSMutableDictionary.dictionaryWithDictionary({
        wasReady: 0,
      }),
      utils: null,

      // // Called when the web view begins to receive web content.
      'webView:didCommitNavigation:': function(webView) {
        this.utils.emit('will-navigate', {}, String(String(webView.url())))
      },

      // // Called when web content begins to load in a web view.
      'webView:didStartProvisionalNavigation:': function() {
        this.utils.emit('did-start-navigation')
        this.utils.emit('did-start-loading')
      },

      // Called when a web view receives a server redirect.
      'webView:didReceiveServerRedirectForProvisionalNavigation:': function() {
        this.utils.emit('did-get-redirect-request')
      },

      // // Called when the web view needs to respond to an authentication challenge.
      'webView:didReceiveAuthenticationChallenge:completionHandler:': function(
        webView,
        challenge,
        completionHandler
      ) {
        function callback(username, password) {
          completionHandler(
            0,
            NSURLCredential.credentialWithUser_password_persistence(
              username,
              password,
              1
            )
          )
        }
        var protectionSpace = challenge.protectionSpace()
        this.utils.emit(
          'login',
          {},
          {
            method: String(protectionSpace.authenticationMethod()),
            url: 'not implemented', // TODO:
            referrer: 'not implemented', // TODO:
          },
          {
            isProxy: !!protectionSpace.isProxy(),
            scheme: String(protectionSpace.protocol()),
            host: String(protectionSpace.host()),
            port: Number(protectionSpace.port()),
            realm: String(protectionSpace.realm()),
          },
          callback
        )
      },

      // Called when an error occurs during navigation.
      // 'webView:didFailNavigation:withError:': function(
      //   webView,
      //   navigation,
      //   error
      // ) {},

      // Called when an error occurs while the web view is loading content.
      'webView:didFailProvisionalNavigation:withError:': function(
        webView,
        navigation,
        error
      ) {
        this.utils.emit('did-fail-load', error)
      },

      // Called when the navigation is complete.
      'webView:didFinishNavigation:': function() {
        if (this.state.wasReady == 0) {
          // eslint-disable-line
          this.utils.emitBrowserEvent('ready-to-show')
          this.state.setObject_forKey(1, 'wasReady')
        }
        this.utils.emit('did-navigate')
        this.utils.emit('did-frame-navigate')
        this.utils.emit('did-stop-loading')
        this.utils.emit('did-finish-load')
        this.utils.emit('did-frame-finish-load')
      },

      // Called when the web view’s web content process is terminated.
      'webViewWebContentProcessDidTerminate:': function() {
        this.utils.emit('dom-ready')
      },

      // Decides whether to allow or cancel a navigation.
      // webView:decidePolicyForNavigationAction:decisionHandler:

      // Decides whether to allow or cancel a navigation after its response is known.
      // webView:decidePolicyForNavigationResponse:decisionHandler:
    })
  }

  if (!WebScriptHandlerClass) {
    WebScriptHandlerClass = ObjCClass({
      classname: 'WebScriptHandlerClass',
      utils: null,
      'userContentController:didReceiveScriptMessage:': function(_, message) {
        var webArguments = JSON.parse(String(message.body()))
        var args = this.utils.parseWebArguments([JSON.stringify(webArguments)])
        if (!args) {
          return
        }

        this.utils.emit.apply(this, args)
      },
    })
  }

  var navigationDelegate = NavigationDelegateClass.new()
  navigationDelegate.utils = NSDictionary.dictionaryWithDictionary({
    setTitle: browserWindow.setTitle.bind(browserWindow),
    emitBrowserEvent: browserWindow.emit.bind(browserWindow),
    emit: browserWindow.webContents.emit.bind(browserWindow.webContents),
  })
  // reset state as well
  navigationDelegate.state = NSMutableDictionary.dictionaryWithDictionary({
    wasReady: 0,
  })

  webview.setNavigationDelegate(navigationDelegate)

  var webScriptHandler = WebScriptHandlerClass.new()
  webScriptHandler.utils = NSDictionary.dictionaryWithDictionary({
    emit: browserWindow.webContents.emit.bind(browserWindow.webContents),
    parseWebArguments: parseWebArguments,
  })

  webview
    .configuration()
    .userContentController()
    .addScriptMessageHandler_name(webScriptHandler, CONSTANTS.JS_BRIDGE)

  var windowDelegate = WindowDelegateClass.new()
  var utils = {
    emit: browserWindow.emit.bind(browserWindow),
  }
  if (options.modal) {
    // find the window of the document
    var msdocument
    if (options.parent.type === 'Document') {
      msdocument = options.parent.sketchObject
      if (msdocument && String(msdocument.class()) === 'MSDocumentData') {
        // we only have an MSDocumentData instead of a MSDocument
        // let's try to get back to the MSDocument
        msdocument = msdocument.delegate()
      }
    } else {
      msdocument = options.parent
    }
    if (msdocument && String(msdocument.class()) === 'MSDocumentData') {
      // we only have an MSDocumentData instead of a MSDocument
      // let's try to get back to the MSDocument
      msdocument = msdocument.delegate()
    }
    utils.parentWindow = msdocument.windowForSheet()
  }

  windowDelegate.utils = NSDictionary.dictionaryWithDictionary(utils)
  windowDelegate.panel = panel

  panel.setDelegate(windowDelegate)
}


/***/ }),

/***/ "./node_modules/sketch-module-web-view/lib/webview-api.js":
/*!****************************************************************!*\
  !*** ./node_modules/sketch-module-web-view/lib/webview-api.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Promise) {var EventEmitter = __webpack_require__(/*! events */ "events")

// let's try to match https://github.com/electron/electron/blob/master/docs/api/web-contents.md
module.exports = function buildAPI(browserWindow, panel, webview) {
  var webContents = new EventEmitter()

  webContents.loadURL = browserWindow.loadURL

  webContents.loadFile = function(/* filePath */) {
    // TODO:
    console.warn(
      'Not implemented yet, please open a PR on https://github.com/skpm/sketch-module-web-view :)'
    )
  }

  webContents.downloadURL = function(/* filePath */) {
    // TODO:
    console.warn(
      'Not implemented yet, please open a PR on https://github.com/skpm/sketch-module-web-view :)'
    )
  }

  webContents.getURL = function() {
    return String(webview.url())
  }

  webContents.getTitle = function() {
    return String(webview.title())
  }

  webContents.isDestroyed = function() {
    // TODO:
    console.warn(
      'Not implemented yet, please open a PR on https://github.com/skpm/sketch-module-web-view :)'
    )
  }

  webContents.focus = browserWindow.focus
  webContents.isFocused = browserWindow.isFocused

  webContents.isLoading = function() {
    return !!webview.loading()
  }

  webContents.isLoadingMainFrame = function() {
    // TODO:
    return !!webview.loading()
  }

  webContents.isWaitingForResponse = function() {
    return !webview.loading()
  }

  webContents.stop = function() {
    webview.stopLoading()
  }
  webContents.reload = function() {
    webview.reload()
  }
  webContents.reloadIgnoringCache = function() {
    webview.reloadFromOrigin()
  }
  webContents.canGoBack = function() {
    return !!webview.canGoBack()
  }
  webContents.canGoForward = function() {
    return !!webview.canGoForward()
  }
  webContents.canGoToOffset = function(offset) {
    return !!webview.backForwardList().itemAtIndex(offset)
  }
  webContents.clearHistory = function() {
    // TODO:
    console.warn(
      'Not implemented yet, please open a PR on https://github.com/skpm/sketch-module-web-view :)'
    )
  }
  webContents.goBack = function() {
    webview.goBack()
  }
  webContents.goForward = function() {
    webview.goForward()
  }
  webContents.goToIndex = function(index) {
    var backForwardList = webview.backForwardList()
    var backList = backForwardList.backList()
    var backListLength = backList.count()
    if (backListLength > index) {
      webview.loadRequest(NSURLRequest.requestWithURL(backList[index]))
      return
    }
    var forwardList = backForwardList.forwardList()
    if (forwardList.count() > index - backListLength) {
      webview.loadRequest(
        NSURLRequest.requestWithURL(forwardList[index - backListLength])
      )
      return
    }
    throw new Error('Cannot go to index ' + index)
  }
  webContents.goToOffset = function(offset) {
    if (!webContents.canGoToOffset(offset)) {
      throw new Error('Cannot go to offset ' + offset)
    }
    webview.loadRequest(
      NSURLRequest.requestWithURL(webview.backForwardList().itemAtIndex(offset))
    )
  }
  webContents.isCrashed = function() {
    // TODO:
    console.warn(
      'Not implemented yet, please open a PR on https://github.com/skpm/sketch-module-web-view :)'
    )
  }
  webContents.setUserAgent = function(/* userAgent */) {
    // TODO:
    console.warn(
      'Not implemented yet, please open a PR on https://github.com/skpm/sketch-module-web-view :)'
    )
  }
  webContents.getUserAgent = function() {
    const userAgent = webview.customUserAgent()
    return userAgent ? String(userAgent) : undefined
  }
  webContents.insertCSS = function(css) {
    var source =
      "var style = document.createElement('style'); style.innerHTML = " +
      css.replace(/"/, '\\"') +
      '; document.head.appendChild(style);'
    var script = WKUserScript.alloc().initWithSource_injectionTime_forMainFrameOnly(
      source,
      0,
      true
    )
    webview
      .configuration()
      .userContentController()
      .addUserScript(script)
  }
  webContents.insertJS = function(source) {
    var script = WKUserScript.alloc().initWithSource_injectionTime_forMainFrameOnly(
      source,
      0,
      true
    )
    webview
      .configuration()
      .userContentController()
      .addUserScript(script)
  }
  webContents.executeJavaScript = function(script, userGesture, callback) {
    if (typeof userGesture === 'function') {
      callback = userGesture
      userGesture = false
    }
    var fiber = coscript.createFiber()
    return new Promise(function(resolve, reject) {
      webview.evaluateJavaScript_completionHandler(
        script,
        __mocha__.createBlock_function('v28@?0@8c16@"NSError"20', function(
          result,
          err
        ) {
          var isError =
            err &&
            err.class &&
            (String(err.class()) === 'NSException' ||
              String(err.class()) === 'NSError')
          if (callback) {
            try {
              callback(isError ? err : null, result)
            } catch (error) {
              // /shrug
            }
            resolve()
          } else if (isError) {
            reject(err)
          } else {
            resolve(result)
          }
          fiber.cleanup()
        })
      )
    })
  }
  webContents.setIgnoreMenuShortcuts = function() {
    // TODO:??
    console.warn(
      'Not implemented yet, please open a PR on https://github.com/skpm/sketch-module-web-view :)'
    )
  }
  webContents.setAudioMuted = function(/* muted */) {
    // TODO:??
    console.warn(
      'Not implemented yet, please open a PR on https://github.com/skpm/sketch-module-web-view :)'
    )
  }
  webContents.isAudioMuted = function() {
    // TODO:??
    console.warn(
      'Not implemented yet, please open a PR on https://github.com/skpm/sketch-module-web-view :)'
    )
  }
  webContents.setZoomFactor = function(factor) {
    webview.setMagnification_centeredAtPoint(factor, CGPointMake(0, 0))
  }
  webContents.getZoomFactor = function(callback) {
    callback(Number(webview.magnification()))
  }
  webContents.setZoomLevel = function(level) {
    // eslint-disable-next-line no-restricted-properties
    webContents.setZoomFactor(Math.pow(1.2, level))
  }
  webContents.getZoomLevel = function(callback) {
    // eslint-disable-next-line no-restricted-properties
    callback(Math.log(Number(webview.magnification())) / Math.log(1.2))
  }
  webContents.setVisualZoomLevelLimits = function(/* minimumLevel, maximumLevel */) {
    // TODO:??
    console.warn(
      'Not implemented yet, please open a PR on https://github.com/skpm/sketch-module-web-view :)'
    )
  }
  webContents.setLayoutZoomLevelLimits = function(/* minimumLevel, maximumLevel */) {
    // TODO:??
    console.warn(
      'Not implemented yet, please open a PR on https://github.com/skpm/sketch-module-web-view :)'
    )
  }

  // TODO:
  // webContents.undo = function() {
  //   webview.undoManager().undo()
  // }
  // webContents.redo = function() {
  //   webview.undoManager().redo()
  // }
  // webContents.cut = webview.cut
  // webContents.copy = webview.copy
  // webContents.paste = webview.paste
  // webContents.pasteAndMatchStyle = webview.pasteAsRichText
  // webContents.delete = webview.delete
  // webContents.replace = webview.replaceSelectionWithText

  webContents.send = function() {
    const script =
      'window.postMessage({' +
      'isSketchMessage: true,' +
      "origin: '" +
      String(__command.identifier()) +
      "'," +
      'args: ' +
      JSON.stringify([].slice.call(arguments)) +
      '}, "*")'
    webview.evaluateJavaScript_completionHandler(script, null)
  }

  webContents.getNativeWebview = function() {
    return webview
  }

  browserWindow.webContents = webContents
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/promise-polyfill/lib/index.js */ "./node_modules/promise-polyfill/lib/index.js")))

/***/ }),

/***/ "./src/colorUtil.js":
/*!**************************!*\
  !*** ./src/colorUtil.js ***!
  \**************************/
/*! exports provided: mutateColor, mutateShadowColor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mutateColor", function() { return mutateColor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mutateShadowColor", function() { return mutateShadowColor; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/constants.js");
/* harmony import */ var _mutationUtil__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mutationUtil */ "./src/mutationUtil.js");

 //TODO: add export
//TODO: Added ff for opacity reasons

var rgbToHex = function rgbToHex(r, g, b) {
  return '#' + [r, g, b].map(function (x) {
    var hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('') + 'ff';
}; //TODO: add export


var hexToRgb = function hexToRgb(hex) {
  return hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function (m, r, g, b) {
    return '#' + r + r + g + g + b + b;
  }).substring(1).match(/.{2}/g).map(function (x) {
    return parseInt(x, 16);
  });
};

function mutateColor(obj) {
  if (Object(_mutationUtil__WEBPACK_IMPORTED_MODULE_1__["coinToss"])(_constants__WEBPACK_IMPORTED_MODULE_0__["FILL_COLOR_PROB"])) {
    var temp = hexToRgb(obj.color);
    var newColorRGB = temp.map(function (x) {
      return Object(_mutationUtil__WEBPACK_IMPORTED_MODULE_1__["mutate"])(x, _constants__WEBPACK_IMPORTED_MODULE_0__["FILL_COLOR_RATE"], _constants__WEBPACK_IMPORTED_MODULE_0__["COLOR_LIMIT"], 1);
    });
    var hex = rgbToHex(newColorRGB[0], newColorRGB[1], newColorRGB[2]);
    obj.color = hex;
  }
}
function mutateShadowColor(shadow) {
  if (Object(_mutationUtil__WEBPACK_IMPORTED_MODULE_1__["coinToss"])(_constants__WEBPACK_IMPORTED_MODULE_0__["SHADOW_COLOR_PROB"])) {
    var temp = hexToRgb(shadow.color);
    var newColorRGB = temp.map(function (x) {
      return Object(_mutationUtil__WEBPACK_IMPORTED_MODULE_1__["mutate"])(x, _constants__WEBPACK_IMPORTED_MODULE_0__["SHADOW_COLOR_RATE"], _constants__WEBPACK_IMPORTED_MODULE_0__["COLOR_LIMIT"], 1);
    });
    return rgbToHex(newColorRGB[0], newColorRGB[1], newColorRGB[2]);
  }

  return shadow.color;
}

/***/ }),

/***/ "./src/constants.js":
/*!**************************!*\
  !*** ./src/constants.js ***!
  \**************************/
/*! exports provided: MUTATION, AMOUNT_COPIES, Y_OFFSET, X_OFFSET, FILL_COLOR_PROB, BORDER_COLOR_PROB, SHADOW_COLOR_PROB, FILL_COLOR_RATE, BORDER_COLOR_RATE, SHADOW_COLOR_RATE, COLOR_LIMIT, CORNER_RADIUS_PROB, CORNER_RADIUS_RATE, BORDER_THICKNESS_RATE, BORDER_THICKNESS_PROB, SHADOW_RATE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MUTATION", function() { return MUTATION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AMOUNT_COPIES", function() { return AMOUNT_COPIES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Y_OFFSET", function() { return Y_OFFSET; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "X_OFFSET", function() { return X_OFFSET; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FILL_COLOR_PROB", function() { return FILL_COLOR_PROB; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BORDER_COLOR_PROB", function() { return BORDER_COLOR_PROB; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SHADOW_COLOR_PROB", function() { return SHADOW_COLOR_PROB; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FILL_COLOR_RATE", function() { return FILL_COLOR_RATE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BORDER_COLOR_RATE", function() { return BORDER_COLOR_RATE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SHADOW_COLOR_RATE", function() { return SHADOW_COLOR_RATE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COLOR_LIMIT", function() { return COLOR_LIMIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CORNER_RADIUS_PROB", function() { return CORNER_RADIUS_PROB; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CORNER_RADIUS_RATE", function() { return CORNER_RADIUS_RATE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BORDER_THICKNESS_RATE", function() { return BORDER_THICKNESS_RATE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BORDER_THICKNESS_PROB", function() { return BORDER_THICKNESS_PROB; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SHADOW_RATE", function() { return SHADOW_RATE; });
var MUTATION = 0.10;
var AMOUNT_COPIES = 8;
var Y_OFFSET = 16;
var X_OFFSET = 15;
var FILL_COLOR_PROB = 0.95;
var BORDER_COLOR_PROB = 0.9;
var SHADOW_COLOR_PROB = 0.7; //Not in use

var FILL_COLOR_RATE = 0.1;
var BORDER_COLOR_RATE = 0.3;
var SHADOW_COLOR_RATE = 0.2;
var COLOR_LIMIT = 255;
var CORNER_RADIUS_PROB = 0.9;
var CORNER_RADIUS_RATE = 1;
var BORDER_THICKNESS_RATE = 0.5;
var BORDER_THICKNESS_PROB = 0.7;
var SHADOW_RATE = 0.2;

/***/ }),

/***/ "./src/layerUtil.js":
/*!**************************!*\
  !*** ./src/layerUtil.js ***!
  \**************************/
/*! exports provided: hasArtboards, getArtboards, hasGroups, getGroups, hasShapePaths, getShapePaths, getText, sortTextDescendingOrder, getTextElementByValue, hasTextElementByValue, getShape */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasArtboards", function() { return hasArtboards; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getArtboards", function() { return getArtboards; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasGroups", function() { return hasGroups; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getGroups", function() { return getGroups; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasShapePaths", function() { return hasShapePaths; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getShapePaths", function() { return getShapePaths; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getText", function() { return getText; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sortTextDescendingOrder", function() { return sortTextDescendingOrder; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTextElementByValue", function() { return getTextElementByValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasTextElementByValue", function() { return hasTextElementByValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getShape", function() { return getShape; });
var hasArtboards = function hasArtboards(layers) {
  return layers.filter(function (layer) {
    return layer.type === 'Artboard';
  }).length > 0 ? true : false;
};
var getArtboards = function getArtboards(layers) {
  return layers.filter(function (layer) {
    return layer.type === 'Artboard';
  });
};
var hasGroups = function hasGroups(layers) {
  return layers.filter(function (layer) {
    return layer.type === 'Group';
  }).length > 0 ? true : false;
};
var getGroups = function getGroups(layers) {
  return layers.filter(function (layer) {
    return layer.type === 'Group';
  });
};
var hasShapePaths = function hasShapePaths(layers) {
  return layers.filter(function (layer) {
    return layer.type === 'ShapePath';
  }).length > 0 ? true : false;
};
var getShapePaths = function getShapePaths(layers) {
  return layers.filter(function (layer) {
    return layer.type === 'ShapePath';
  });
};
var getText = function getText(layers) {
  return layers.filter(function (layer) {
    return layer.type === "Text";
  });
};
var sortTextDescendingOrder = function sortTextDescendingOrder(layers) {
  return layers.sort(function (a, b) {
    return b.name.length - a.name.length;
  });
};
var getTextElementByValue = function getTextElementByValue(layers, text) {
  return layers.filter(function (layer) {
    return layer.name === text;
  });
};
var hasTextElementByValue = function hasTextElementByValue(layers, text) {
  return layers.filter(function (layer) {
    return layer.name === text;
  }).length > 0 ? true : false;
};
function getShape(selectedLayers) {
  var layers = getGroups(selectedLayers.layers);

  if (layers.length > 0) {
    //THIS IS A GROUP
    return {
      "layers": layers,
      "type": layers[0].type
    };
  } else {
    layers = getShapePaths(selectedLayers.layers);

    if (layers.length > 0) {
      return {
        "layers": layers,
        "type": layers[0].type // THIS IS A SHAPEPATH
        //sketch.UI.message("This is a shapepath")

      };
    }
  }

  return null;
}

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! exports provided: duplicateNewLayers, duplicateOriginalLayerInNewArtboard, createArtboardTemplate, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "duplicateNewLayers", function() { return duplicateNewLayers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "duplicateOriginalLayerInNewArtboard", function() { return duplicateOriginalLayerInNewArtboard; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createArtboardTemplate", function() { return createArtboardTemplate; });
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sketch */ "sketch");
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sketch__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _swap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./swap */ "./src/swap.js");
/* harmony import */ var _mutate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mutate */ "./src/mutate.js");
/* harmony import */ var sketch_module_web_view__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! sketch-module-web-view */ "./node_modules/sketch-module-web-view/lib/index.js");
/* harmony import */ var sketch_module_web_view__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(sketch_module_web_view__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _colorUtil__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./colorUtil */ "./src/colorUtil.js");
/* harmony import */ var _styleUtil__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./styleUtil */ "./src/styleUtil.js");
/* harmony import */ var _shapeUtil__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./shapeUtil */ "./src/shapeUtil.js");
/* harmony import */ var _layerUtil__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./layerUtil */ "./src/layerUtil.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./constants */ "./src/constants.js");









var browserWindow; // documentation: https://developer.sketchapp.com/reference/api/
// Action api: https://github.com/bomberstudios/sketch-action-api-tester
// Action example: https://github.com/BohemianCoding/SketchAPI/blob/develop/examples/selection-changed/src/selection-changed.js

function duplicateNewLayers(obj, selectedProperties, numberOfLayers, mutationFrame) {
  for (var i = 0; i < numberOfLayers; i++) {
    var tmpObj = obj.duplicate();

    if (tmpObj.type === "Group") {
      var shapedLayers = tmpObj.layers.filter(function (layer) {
        return layer.type === "ShapePath";
      });
      var textLayers = tmpObj.layers.filter(function (layer) {
        return layer.type === "Text";
      });

      if (shapedLayers.length > 0) {
        tmpObj.frame.y = mutationFrame.y + mutationFrame.height + _constants__WEBPACK_IMPORTED_MODULE_8__["Y_OFFSET"] + i * (tmpObj.frame.height + _constants__WEBPACK_IMPORTED_MODULE_8__["Y_OFFSET"]);
        tmpObj.name = tmpObj.name + "." + i;

        if (textLayers.length > 0) {
          //This only works for centered text on a rectangle
          textLayers[0].frame.y = shapedLayers[0].frame.y + shapedLayers[0].frame.height / 2 - textLayers[0].frame.height / 2;
        }

        tmpObj = shapedLayers[0];
      }
    } else {
      tmpObj.frame.y = mutationFrame.y + mutationFrame.height + _constants__WEBPACK_IMPORTED_MODULE_8__["Y_OFFSET"] + i * (tmpObj.frame.height + _constants__WEBPACK_IMPORTED_MODULE_8__["Y_OFFSET"]);
      tmpObj.name = tmpObj.name + "." + i;
    }

    if (selectedProperties.radious) {
      Object(_shapeUtil__WEBPACK_IMPORTED_MODULE_6__["mutateCornerRadius"])(tmpObj);
    }

    if (selectedProperties.fillsColor) {
      Object(_colorUtil__WEBPACK_IMPORTED_MODULE_4__["mutateColor"])(tmpObj.style.fills[0]);
    }

    if (selectedProperties.bordersColor) {
      Object(_styleUtil__WEBPACK_IMPORTED_MODULE_5__["mutateBorderColor"])(tmpObj.style.borders[0]);
    }

    if (selectedProperties.borderWidth) {
      Object(_styleUtil__WEBPACK_IMPORTED_MODULE_5__["mutateBorderThickness"])(tmpObj);
    }

    if (selectedProperties.shadow) {
      Object(_styleUtil__WEBPACK_IMPORTED_MODULE_5__["mutateShadow"])(tmpObj);
    }
  }
} //https://github.com/delighted/sketch-duplicate-to-new-artboard/blob/master/src/sketch-duplicate-to-new-artboard.js

function createNewArtboard(artboardFrame, shapeFrame, shapeName) {
  //TODO: Update offsets
  var newX = artboardFrame.width + artboardFrame.x + 50;
  var newY = artboardFrame.y;
  var newWidth = shapeFrame.width + 30;
  var newHeight = shapeFrame.height * (_constants__WEBPACK_IMPORTED_MODULE_8__["AMOUNT_COPIES"] + 1) + _constants__WEBPACK_IMPORTED_MODULE_8__["Y_OFFSET"] * (_constants__WEBPACK_IMPORTED_MODULE_8__["AMOUNT_COPIES"] + 2); //TODO: Think of what name it should have

  var newArtboard = new sketch__WEBPACK_IMPORTED_MODULE_0___default.a.Artboard({
    name: "iterationOf." + shapeName,
    parent: sketch__WEBPACK_IMPORTED_MODULE_0___default.a.getSelectedDocument().selectedPage,
    frame: new sketch__WEBPACK_IMPORTED_MODULE_0___default.a.Rectangle(newX, newY, newWidth, newHeight)
  });
  return newArtboard;
}

function initiateGUI() {
  //https://github.com/skpm/sketch-module-web-view/blob/master/docs/browser-window.md
  // Class Browserwindow
  var options = {
    identifier: 'Bill-UI',
    alwaysOnTop: true,
    width: 240,
    height: 400,
    backgroundColor: "#F2F2F2"
  };
  browserWindow = new sketch_module_web_view__WEBPACK_IMPORTED_MODULE_3___default.a(options);
  browserWindow.loadURL(__webpack_require__(/*! ./webview/main-screen.html */ "./src/webview/main-screen.html")); //In order to update GUI, use the method below
  //browserWindow.webContents.executeJavaScript('globalFunction("Yolo")')
}

function duplicateOriginalLayerInNewArtboard(originalShape, parentArtboard, header) {
  var tmpShape = originalShape.duplicate();
  tmpShape.parent = parentArtboard;
  tmpShape.frame.y = _constants__WEBPACK_IMPORTED_MODULE_8__["Y_OFFSET"] * 2 + header.frame.height;
  tmpShape.frame.x = (parentArtboard.frame.width - tmpShape.frame.width) / 2;
  return tmpShape;
}

function addDescrption(parentArtboard, text, cordX, cordY, opacity, fontSize) {
  var myText = new sketch__WEBPACK_IMPORTED_MODULE_0___default.a.Text({
    text: text
  }); //text.font = Roboto

  myText.parent = parentArtboard;
  myText.systemFontSize = fontSize;
  myText.frame.x = cordX;
  myText.frame.y = cordY;
  myText.style.opacity = opacity;
  return myText;
}

function listenToSwapEvents() {
  browserWindow.webContents.on('swapMessage', function () {
    Object(_swap__WEBPACK_IMPORTED_MODULE_1__["default"])();
  });
}

function listenToMutationEvents() {
  browserWindow.webContents.on('mutateMessage', function (s) {
    Object(_mutate__WEBPACK_IMPORTED_MODULE_2__["mutateWithParameters"])(JSON.parse(s));
  });
}

function createArtboardTemplate(obj, id) {
  var artboardFrameProperties = obj.parent.frame;
  var parentArtboard = createNewArtboard(artboardFrameProperties, obj.frame, obj.name);
  var originalText = addDescrption(parentArtboard, 'Original', _constants__WEBPACK_IMPORTED_MODULE_8__["X_OFFSET"], _constants__WEBPACK_IMPORTED_MODULE_8__["Y_OFFSET"], 0.7, 14);

  if (Object(_layerUtil__WEBPACK_IMPORTED_MODULE_7__["getText"])(obj.parent.layers).length > 2 && Object(_layerUtil__WEBPACK_IMPORTED_MODULE_7__["hasTextElementByValue"])(obj.parent.layers, "Mutation")) {
    var textLayers = Object(_layerUtil__WEBPACK_IMPORTED_MODULE_7__["getText"])(obj.parent.layers);
    var sortedTextLayer = Object(_layerUtil__WEBPACK_IMPORTED_MODULE_7__["sortTextDescendingOrder"])(textLayers);
    addDescrption(parentArtboard, sortedTextLayer[0].name, _constants__WEBPACK_IMPORTED_MODULE_8__["X_OFFSET"], _constants__WEBPACK_IMPORTED_MODULE_8__["Y_OFFSET"] + 1 + originalText.frame.height, 0.2, 2);
  } else {
    addDescrption(parentArtboard, id, _constants__WEBPACK_IMPORTED_MODULE_8__["X_OFFSET"], _constants__WEBPACK_IMPORTED_MODULE_8__["Y_OFFSET"] + 1 + originalText.frame.height, 0.2, 2);
  }

  var mutationText = addDescrption(parentArtboard, 'Mutation', _constants__WEBPACK_IMPORTED_MODULE_8__["X_OFFSET"], obj.frame.height + 3 * _constants__WEBPACK_IMPORTED_MODULE_8__["Y_OFFSET"] + originalText.frame.height, 0.7, 14);
  parentArtboard.frame.height = parentArtboard.frame.height + originalText.frame.height + mutationText.frame.height + 3 * _constants__WEBPACK_IMPORTED_MODULE_8__["Y_OFFSET"];
  return {
    "parentArtboard": parentArtboard,
    "originalText": originalText,
    "mutationText": mutationText
  };
}

function todoMoveThisIntoSomethingLater() {
  var originalShapeInNewArtboard = duplicateOriginalLayerInNewArtboard(shape, parentArtboard, originalText);
} //This is our main function that triggers when we start the file


/* harmony default export */ __webpack_exports__["default"] = (function () {
  initiateGUI();
  listenToMutationEvents();
  listenToSwapEvents();
});

/***/ }),

/***/ "./src/mutate.js":
/*!***********************!*\
  !*** ./src/mutate.js ***!
  \***********************/
/*! exports provided: default, mutateWithParameters */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mutateWithParameters", function() { return mutateWithParameters; });
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sketch */ "sketch");
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sketch__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _main__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./main */ "./src/main.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants */ "./src/constants.js");
/* harmony import */ var _layerUtil__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./layerUtil */ "./src/layerUtil.js");




/* harmony default export */ __webpack_exports__["default"] = (function () {
  var selectedParameters = {
    "radious": true,
    "fillsColor": true,
    "bordersColor": true,
    "borderWidth": true,
    "shadow": true
  };
  mutateWithParameters(selectedParameters);
});
function mutateWithParameters(selectedParameters) {
  var document = sketch__WEBPACK_IMPORTED_MODULE_0___default.a.getSelectedDocument();
  var selectedLayers = document.selectedLayers;

  if (!selectedLayers.isEmpty) {
    var layers = Object(_layerUtil__WEBPACK_IMPORTED_MODULE_3__["getShape"])(selectedLayers);

    if (layers !== null) {
      createMutations(layers.layers[0], selectedParameters, null);
    } else {
      if (selectedLayers.layers[0].type === "SymbolInstance") {
        var symbolmaster = document.getSymbolMasterWithID(selectedLayers.layers[0].symbolId);

        if (symbolmaster) {
          console.log(symbolmaster);
          createMutations(symbolmaster.layers[0], selectedParameters, selectedLayers.layers[0]); //TODO: Update element on the symbolmaster
        }
      } else {
        sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("No layers found");
      }
    }
  } else {
    sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("BillUI: No selected layer. Select a layer in order to mutate");
  }
}

function createMutations(layer, selectedParameters, symbolLayer) {
  var artboardProperties;

  if (symbolLayer) {
    artboardProperties = Object(_main__WEBPACK_IMPORTED_MODULE_1__["createArtboardTemplate"])(symbolLayer, layer.id);
  } else {
    artboardProperties = Object(_main__WEBPACK_IMPORTED_MODULE_1__["createArtboardTemplate"])(layer, layer.id);
  }

  var originalShapeInNewArtboard = Object(_main__WEBPACK_IMPORTED_MODULE_1__["duplicateOriginalLayerInNewArtboard"])(layer, artboardProperties.parentArtboard, artboardProperties.originalText);
  Object(_main__WEBPACK_IMPORTED_MODULE_1__["duplicateNewLayers"])(originalShapeInNewArtboard, selectedParameters, _constants__WEBPACK_IMPORTED_MODULE_2__["AMOUNT_COPIES"], artboardProperties.mutationText.frame);
}

/***/ }),

/***/ "./src/mutationUtil.js":
/*!*****************************!*\
  !*** ./src/mutationUtil.js ***!
  \*****************************/
/*! exports provided: coinToss, mutate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "coinToss", function() { return coinToss; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mutate", function() { return mutate; });
function getLowestMutation(currentIndex, limit, mutationRate) {
  var fraction = Math.floor(currentIndex - limit * mutationRate);

  if (fraction < 0) {
    fraction = 0;
  }

  return fraction;
}

function getHighestMutation(currentIndex, limit, mutationRate) {
  var fraction = Math.floor(currentIndex + limit * mutationRate);

  if (fraction > limit) {
    fraction = limit;
  }

  return fraction;
}

function mutateValue(low, high) {
  var item = Math.floor(Math.random() * (high - low) + low);
  return item;
}

function coinToss(prob) {
  var flipp = mutateValue(0, 100);

  if (flipp <= 100 * prob) {
    return true;
  } else {
    return false;
  }
}
function mutate(curValue, mutationRate, limit, prob) {
  if (coinToss(prob)) {
    var low = getLowestMutation(curValue, limit, mutationRate);
    var high = getHighestMutation(curValue, limit, mutationRate);
    return mutateValue(low, high);
  }
}

/***/ }),

/***/ "./src/shapeUtil.js":
/*!**************************!*\
  !*** ./src/shapeUtil.js ***!
  \**************************/
/*! exports provided: mutateCornerRadius */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mutateCornerRadius", function() { return mutateCornerRadius; });
/* harmony import */ var _mutationUtil__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mutationUtil */ "./src/mutationUtil.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "./src/constants.js");


function mutateCornerRadius(obj) {
  var sObj = obj.sketchObject;
  sObj.setCornerRadiusFloat(Object(_mutationUtil__WEBPACK_IMPORTED_MODULE_0__["mutate"])(sObj.cornerRadiusFloat(), _constants__WEBPACK_IMPORTED_MODULE_1__["CORNER_RADIUS_RATE"], sObj.maximumAllowedRadius(), _constants__WEBPACK_IMPORTED_MODULE_1__["CORNER_RADIUS_PROB"]));
}

/***/ }),

/***/ "./src/styleUtil.js":
/*!**************************!*\
  !*** ./src/styleUtil.js ***!
  \**************************/
/*! exports provided: mutateBorderColor, mutateBorderThickness, mutateShadow */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mutateBorderColor", function() { return mutateBorderColor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mutateBorderThickness", function() { return mutateBorderThickness; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mutateShadow", function() { return mutateShadow; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/constants.js");
/* harmony import */ var _colorUtil__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./colorUtil */ "./src/colorUtil.js");
/* harmony import */ var _mutationUtil__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mutationUtil */ "./src/mutationUtil.js");



function mutateBorderColor(obj) {
  if (Object(_mutationUtil__WEBPACK_IMPORTED_MODULE_2__["coinToss"])(_constants__WEBPACK_IMPORTED_MODULE_0__["BORDER_COLOR_PROB"])) {
    if (obj !== undefined) {
      Object(_colorUtil__WEBPACK_IMPORTED_MODULE_1__["mutateColor"])(obj);
    }
  }
}
function mutateBorderThickness(obj) {
  //console.log('inside mutateBorderThickness')
  if (obj.style.borders[0] !== undefined) {
    var thickness = obj.style.borders[0].thickness;
    var limit = getSmallestWidth(obj);
    var newBorderWidth = Object(_mutationUtil__WEBPACK_IMPORTED_MODULE_2__["mutate"])(thickness, _constants__WEBPACK_IMPORTED_MODULE_0__["BORDER_THICKNESS_RATE"], limit, _constants__WEBPACK_IMPORTED_MODULE_0__["BORDER_THICKNESS_PROB"]);
    obj.style.borders[0].thickness = newBorderWidth;
  }
}
function mutateShadow(obj) {
  var shape = obj.style.sketchObject;

  if (shape.hasEnabledShadow() === 0) {
    if (Object(_mutationUtil__WEBPACK_IMPORTED_MODULE_2__["coinToss"])(0.5)) {
      if (obj.style.shadows[0] !== undefined) {
        obj.style.shadows[0].enabled = true;
      } else {
        shape.addStylePartOfType(2);
      }
    }
  } else {
    if (Object(_mutationUtil__WEBPACK_IMPORTED_MODULE_2__["coinToss"])(_constants__WEBPACK_IMPORTED_MODULE_0__["SHADOW_RATE"])) {
      shape.disableAllShadows();
    } else {
      var shadow = obj.style.shadows[0];
      setOneUnitRandomness(shadow, 'blur', shadow.blur);
      setOneUnitRandomness(shadow, 'x', shadow.x);
      setOneUnitRandomness(shadow, 'y', shadow.y);
      setOneUnitRandomness(shadow, 'spread', shadow.spread);
      setShadowColor(shadow);
    }
  }
}

function setOneUnitRandomness(obj, type, prop) {
  //console.log(prop)
  if (Object(_mutationUtil__WEBPACK_IMPORTED_MODULE_2__["coinToss"])(_constants__WEBPACK_IMPORTED_MODULE_0__["SHADOW_RATE"])) {
    if (prop === 0) {
      prop = 1;
    } else {
      if (Object(_mutationUtil__WEBPACK_IMPORTED_MODULE_2__["coinToss"])(0.5)) {
        prop = prop - 1;
      } else {
        prop = prop + 1;
      }
    }
  }

  switch (type) {
    case 'blur':
      obj.blur = prop;
      break;

    case 'x':
      obj.x = prop;
      break;

    case 'y':
      obj.y = prop;
      break;

    case 'spread':
      obj.spread = prop;
      break;

    default:
      console.log("Unknown type");
      break;
  }
}

function setShadowColor(s) {
  var temp = Object(_colorUtil__WEBPACK_IMPORTED_MODULE_1__["mutateShadowColor"])(s);
  temp = temp.substring(0, temp.length - 2);
  temp = temp + '80';
  s.color = temp;
}

function getSmallestWidth(obj) {
  if (obj.frame.width <= obj.frame.height) {
    return Math.floor(obj.frame.width / 2);
  } else {
    return Math.floor(obj.frame.height / 2);
  }
}

/***/ }),

/***/ "./src/swap.js":
/*!*********************!*\
  !*** ./src/swap.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sketch */ "sketch");
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sketch__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _layerUtil__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./layerUtil */ "./src/layerUtil.js");


/* harmony default export */ __webpack_exports__["default"] = (function () {
  var document = sketch__WEBPACK_IMPORTED_MODULE_0___default.a.getSelectedDocument();
  var selectedLayers = document.selectedLayers;

  if (!selectedLayers.isEmpty) {
    var obj = selectedLayers.layers[0];
    var shape;

    if (obj.type === "Group") {
      shape = getShapeFromGroup(obj);
    }

    var artboard = obj.parent;
    var textLayers = Object(_layerUtil__WEBPACK_IMPORTED_MODULE_1__["getText"])(artboard.layers);
    var sortedTextLayer = Object(_layerUtil__WEBPACK_IMPORTED_MODULE_1__["sortTextDescendingOrder"])(textLayers);
    var originalObj = document.getLayerWithID(sortedTextLayer[0].name);

    if (originalObj) {
      if (originalObj.type === "Group") {
        var orignalShape = getShapeFromGroup(originalObj);
        updateOriginalObject(orignalShape, shape);
      } else {
        updateOriginalObject(originalObj, obj);
      }
    }
  }
});

function getShapeFromGroup(obj) {
  var layers = Object(_layerUtil__WEBPACK_IMPORTED_MODULE_1__["getShapePaths"])(obj.layers);
  obj = layers[0];
  return obj;
}

function updateOriginalObject(originalObj, obj) {
  var sObj = obj.sketchObject;
  originalObj.style = obj.style;
  var sOriginalObj = originalObj.sketchObject;
  sOriginalObj.setCornerRadiusFloat(sObj.cornerRadiusFloat());
}

/***/ }),

/***/ "./src/webview/main-screen.html":
/*!**************************************!*\
  !*** ./src/webview/main-screen.html ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "file://" + context.plugin.urlForResourceNamed("_webpack_resources/91e0ae4dd6172719a7dcfab4d009e080.html").path();

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("events");

/***/ }),

/***/ "sketch":
/*!*************************!*\
  !*** external "sketch" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sketch");

/***/ })

/******/ });
  if (key === 'default' && typeof exports === 'function') {
    exports(context);
  } else {
    exports[key](context);
  }
}
that['onRun'] = __skpm_run.bind(this, 'default')

//# sourceMappingURL=mutate.js.map