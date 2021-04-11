// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/slides.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// 20210411232934
// https://api.thecatapi.com/v1/images/search?limit=10
var _default = [{
  height: 426,
  id: "40g",
  url: "https://cdn2.thecatapi.com/images/40g.jpg",
  width: 640
}, {
  height: 600,
  id: "5u8",
  url: "https://cdn2.thecatapi.com/images/5u8.jpg",
  width: 408
}, {
  height: 619,
  id: "9h9",
  url: "https://cdn2.thecatapi.com/images/9h9.jpg",
  width: 984
}, {
  height: 640,
  id: "a05",
  url: "https://cdn2.thecatapi.com/images/a05.jpg",
  width: 640
}, {
  height: 491,
  id: "dkb",
  url: "https://cdn2.thecatapi.com/images/dkb.jpg",
  width: 740
}, {
  height: 667,
  id: "MTcwMTczMg",
  url: "https://cdn2.thecatapi.com/images/MTcwMTczMg.jpg",
  width: 500
}, {
  height: 683,
  id: "AoDtRhYcL",
  url: "https://cdn2.thecatapi.com/images/AoDtRhYcL.jpg",
  width: 1024
}, {
  height: 2100,
  id: "MtgMsxPw9",
  url: "https://cdn2.thecatapi.com/images/MtgMsxPw9.jpg",
  width: 1800
}, {
  height: 1080,
  id: "lP3_R8rUt",
  url: "https://cdn2.thecatapi.com/images/lP3_R8rUt.jpg",
  width: 810
}, {
  height: 951,
  id: "pKkJjcBz_",
  url: "https://cdn2.thecatapi.com/images/pKkJjcBz_.jpg",
  width: 1265
}];
exports.default = _default;
},{}],"src/index.js":[function(require,module,exports) {
"use strict";

var _slides = _interopRequireDefault(require("./slides"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CANVAS_ID = "canvas-slider";
var DIRECTION = {
  Left: "left",
  Right: "right"
};
var $canvas = document.getElementById(CANVAS_ID);
var $ctx = $canvas.getContext("2d");
var loadedImages = {};
var stage = {
  height: $ctx.canvas.height,
  width: $ctx.canvas.width
};
var canDrag = true;
var direction = "";
var dragStartX = null;
var dx = 0;
var isDragging = false;
var isMousePressed = false;
bindMouseEvents($canvas);
init();

function bindMouseEvents($el) {
  document.addEventListener("mouseup", function (event) {
    $el.style.cursor = "grab";
    dragStartX = null;
    isDragging = false;
    isMousePressed = false;
    direction = "";
  });
  $el.addEventListener("mousedown", function (event) {
    $el.style.cursor = "grabbing";
    dragStartX = event.x - dx;
    isMousePressed = true;
  });
  document.addEventListener("mousemove", function (event) {
    var _dragStartX;

    if (!isMousePressed) return;
    var newDx = event.x - ((_dragStartX = dragStartX) !== null && _dragStartX !== void 0 ? _dragStartX : 0);
    var newDirextion = dx >= newDx ? DIRECTION.Left : DIRECTION.Right;
    if (newDirextion === direction && !canDrag) return;
    isDragging = true;
    direction = newDirextion;
    dx = newDx;
  });
}

function draw() {
  var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

  if (!t || isDragging) {
    clearCanvas($ctx, stage);

    _slides.default.forEach(function (slide, idx) {
      var drawDimensions = fitAspectRatio({
        width: slide.width,
        height: slide.height
      }, stage);
      var center = getCenter(drawDimensions, stage);
      var limitX = stage.width * (_slides.default.length - 1 - idx) * -1 + center.x;
      var x = stage.width * idx + center.x;
      var finalX = Math.max(Math.min(x, dx + x), limitX);

      if (direction === DIRECTION.Left) {
        canDrag = finalX !== limitX;
      } else if (direction === DIRECTION.Right) {
        canDrag = finalX < x;
      }

      drawImage($ctx, {
        height: drawDimensions.height,
        id: slide.id,
        url: slide.url,
        width: drawDimensions.width,
        x: finalX,
        y: center.y
      });
    });
  }

  requestAnimationFrame(draw);
}

function init() {
  draw();
}

function drawImage(ctx, _ref) {
  var _ref$id = _ref.id,
      id = _ref$id === void 0 ? "" : _ref$id,
      url = _ref.url,
      height = _ref.height,
      width = _ref.width,
      _ref$x = _ref.x,
      x = _ref$x === void 0 ? 0 : _ref$x,
      _ref$y = _ref.y,
      y = _ref$y === void 0 ? 0 : _ref$y;

  if (!loadedImages[id]) {
    var img = new Image();

    img.onload = function () {
      return ctx.drawImage(img, x, y, width, height);
    };

    img.src = url;
    loadedImages[id] = img;
  } else {
    ctx.drawImage(loadedImages[id], x, y, width, height);
  }
}

function clearCanvas(ctx, _ref2) {
  var width = _ref2.width,
      height = _ref2.height;
  ctx.clearRect(0, 0, width, height);
}

function fitAspectRatio(source, target) {
  var ratio = Math.min(target.height / source.height, target.width / source.width);
  return {
    height: source.height * ratio,
    width: source.width * ratio
  };
}

function getCenter(source, stage) {
  return {
    x: (stage.width - source.width) / 2,
    y: (stage.height - source.height) / 2
  };
}
},{"./slides":"src/slides.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "63314" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=/src.a2b27638.js.map