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
})({"../node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"scss/main.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"./..\\img\\bg.jpg":[["bg.c04a5f46.jpg","img/bg.jpg"],"img/bg.jpg"],"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"js/main.js":[function(require,module,exports) {
"use strict";

require("./../scss/main.scss");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/** PROJECT DESCRIPTION 
 * 1. Matrix, count Number of items of the particular cluster when user click on it
 * 2. Display the grid or random number 1 and 0, on a web page using a colour to represent 1 s, and empty for  0 s
 * 3. When user click on a filled square, count the number of filled squares connected to this
      square, and all other filled squares connected to those squares.Write this number into the
      clicked square.Squares are connected if they are touching horizontally or vertically, NOT
      diagonal.Numbers in other coloured squares should be cleared when a new square is clicked
* 4. Clicking on a non - filled square should do nothing
* 5. While hovering over a filled square, temporarily change the colour of all connected squares
* 6. Allow the grid to be randomly generated with size NxN elements with 0 s and 1 s in
* 7. Add a colour picker to allow the user to change the background colours of the grid.
 **/

/**  ABBREVIATION IN THIS PROJECT
grid :: a network of lines that cross each other to form a series of squares of rectangles
cluster:: square connection Horizontally and Vertically
square:: grid item
**/
// GRID
var Grid =
/*#__PURE__*/
function () {
  function Grid(gridSize) {
    _classCallCheck(this, Grid);

    this.gridSize = gridSize;
    this.createGrid();
    this.displayGrid();
    this.getCluster();
    this.getClusterItemProperties();
    this.handleMouseEvent();
    this.handleBgColor();
  } // Create NxN matrix of random 1 and 0


  _createClass(Grid, [{
    key: "createGrid",
    value: function createGrid() {
      var arrRow = [];

      for (var row = 0; row < this.gridSize; row++) {
        var arrCol = [];

        for (var col = 0; col < this.gridSize; col++) {
          arrCol.push({
            value: Math.round(Math.random()),
            visited: false
          });
        }

        arrRow.push(arrCol);
      }

      this.grid = arrRow;
    } // Display NxN matrix in the browser (grid format)

  }, {
    key: "displayGrid",
    value: function displayGrid() {
      var _this = this;

      var ul = document.createElement("ul");
      ul.classList.add("grid");
      var gridWrapper = document.querySelector(".grid-wrapper");
      gridWrapper.appendChild(ul);
      this.grid.forEach(function (gridRow) {
        gridRow.forEach(function (gridCol) {
          var li = document.createElement("li");

          if (gridCol.value == 1) {
            li.classList.add("grid__filled");
          }

          var txtNode = document.createTextNode(gridCol.value);
          li.appendChild(txtNode);
          ul.appendChild(li); // APPLY STYLESHEET: ul(className=gird) and li
          // Default grid width: 40rem,
          // Grid width increasy by 8rem each time if uer increase the gridSize by 1

          var content = {
            width: 40 + (_this.gridSize - 5) * 8
          }; // Grid :: ul

          var styleUl = {
            width: "".concat(content.width, "rem")
          };
          var addStyleUl = ul.style;

          for (var style in styleUl) {
            addStyleUl[style] = styleUl[style];
          }

          var styleLi = {
            //Grid :: ul
            //Grid item :: li
            // Grid item width and item height is calcualte based on the grid width (ul.width)
            width: "".concat(Math.floor(content.width / _this.gridSize), "rem"),
            minHeight: "".concat(Math.floor(content.width / _this.gridSize), "rem"),
            background: gridCol.value == 1 ? "#e00201" : "white"
          };
          var addStyleLi = li.style;

          for (var _style in styleLi) {
            addStyleLi[_style] = styleLi[_style];
          }
        });
      });
    } // Change the background color of cluster 

  }, {
    key: "handleBgColor",
    value: function handleBgColor() {
      var btnApplyColor = document.getElementById("change-grid-bg-color");
      btnApplyColor.addEventListener("change", function (e) {
        e.preventDefault();
        var bgColor = e.target.value;
        var getItemListDOM = document.querySelectorAll(".grid__filled");
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = getItemListDOM[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var item = _step.value;
            item.style.background = "".concat(bgColor);
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      });
    } // Create the array of Cluster

  }, {
    key: "getCluster",
    value: function getCluster() {
      var grid = this.grid;
      var totNumOfCluster = 0;
      var totNumOfClusterItem = 0;
      var arrIndxValOne = []; // Array that contains all the array of index of 1 connected  (vertically or horizontally)

      var arrayOfCluster = []; // Contains the array of cluster

      var filterGrid = function filterGrid(row, col) {
        var indxValOne = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
        var gridItem = grid[row][col];

        if (gridItem.value == 1 && gridItem.visited == false) {
          gridItem.visited = true; //Index of 1 in the grid

          indxValOne.push([row, col]);
          arrIndxValOne.push(indxValOne); // Filter the array of index of one
          // Array of cluster of connected one

          for (var i = 0; i < arrIndxValOne.length; i++) {
            if (arrayOfCluster.indexOf(arrIndxValOne[i]) == -1) {
              arrayOfCluster.push(arrIndxValOne[i]);
            }
          } //*** VISIT GRID ITEM HORIZONTALLY AND VERTICALLY CONNECTED *******/


          if (row < grid.length - 1) {
            filterGrid(row + 1, col, indxValOne);
          }

          if (col < grid[row].length - 1) {
            filterGrid(row, col + 1, indxValOne);
          }

          if (row > 0) {
            filterGrid(row - 1, col, indxValOne);
          }

          if (col > 0) {
            filterGrid(row, col - 1, indxValOne);
          }
        }
      }; // Loop through grid
      // Pass the index of grid as the argument for filterGrid()


      for (var row = 0; row < grid.length; row++) {
        for (var col = 0; col < grid[row].length; col++) {
          if (grid[row][col].value == 1) {
            totNumOfClusterItem++;
            filterGrid(row, col);
          }
        }
      } // Total number of cluster


      totNumOfCluster = arrayOfCluster.length; // array that contains only array of cluster

      this.arrayOfCluster = arrayOfCluster;
    }
    /** get cluster item (square box) properties ::
      index, number of items (square box) in the particular cluster, index of each cluster from the array of cluster **/

  }, {
    key: "getClusterItemProperties",
    value: function getClusterItemProperties() {
      var _this2 = this;

      var getClusterItemProperties = []; //this.arrayOfCluster.forEach()

      [].forEach.call(this.arrayOfCluster, function (cluster, indx) {
        //cluste.forEach()
        [].forEach.call(cluster, function (clusterItem) {
          getClusterItemProperties.push({
            itemIndx: clusterItem[0] * _this2.gridSize + clusterItem[1],
            // Index of each element in the cluster based on the grid (dispaly in browser)
            noOfItem: cluster.length,
            // Total number of the item in the cluster
            indxParentCluster: indx // Index of cluster

          });
        });
      });
      this.getClusterItemProperties = getClusterItemProperties;
    } // MOUSE EVENTS: mouseOver and click 

  }, {
    key: "handleMouseEvent",
    value: function handleMouseEvent() {
      var clusterItem = this.getClusterItemProperties;
      var getAllGridDOM = document.querySelectorAll(".grid");
      var getNewGridDOM = getAllGridDOM[getAllGridDOM.length - 1];
      var getNewGridDOMchildElements = getNewGridDOM.children; // hide previous grid (show only latest grid at a time)

      if (getAllGridDOM.length > 1) {
        for (var i = 0; i < getAllGridDOM.length - 1; i++) {
          getAllGridDOM[i].style.display = "none";
        }
      }

      var _loop = function _loop(element) {
        // get Index of each new grid elements
        var gridElement = getNewGridDOMchildElements;
        gridElement[element].index = element;
        gridElement[element].innerHTML = ""; //Note: Indivudual cluster includes one unique class name in their item
        // Add unique class Name to all item of the particualr cluster

        clusterItem.forEach(function (item) {
          if (item.itemIndx == gridElement[element].index) {
            gridElement[element].classList.add("grid--cluster".concat(item.indxParentCluster));
          }
        }); // Display the total number of cluster items when the user click on any item (filled dquare)of the cluster
        // Do nothing when user click on empty square

        gridElement[element].addEventListener("click", function (e) {
          var targetIndex = e.target.index;
          clusterItem.forEach(function (item) {
            if (item.itemIndx == targetIndex) {
              var clickMe = document.getElementsByClassName("clickMe");

              if (clickMe.length > 0) {
                clickMe[0].innerHTML = "";
                clickMe[0].className = clickMe[0].className.replace("clickMe", "");
              }

              gridElement[element].classList.add("clickMe");
              gridElement[element].innerHTML = item.noOfItem;
            }
          });
        });
        document.querySelector(".grid-wrapper").addEventListener("mouseover", function (e) {
          var target = e.target; // Array that contain two className of targe hover element:: [grid__item, grid--cluster(cluster index)]

          var targetClassName = target.className; //Get second element of array targetClassName:: grid--cluster(cluster index)
          //Target cluster contains the same className in the element of that cluster

          var targetClusterItemUniqueClass = targetClassName.split(" ")[1]; // Get all list of unique className of individual cluster item

          var getAllTargetClusterItemUniqueClass = document.querySelectorAll(".".concat(targetClusterItemUniqueClass));
          var getAllHoverMe = document.querySelectorAll(".hover-item");

          if (getAllHoverMe.length > 0) {
            //getAllHoverMe.forEach()
            [].forEach.call(getAllHoverMe, function (hover) {
              hover.className = hover.className.replace("hover-item", "");
            });
          } //getAllTargetClusterItemUniqueClass.forEach()


          [].forEach.call(getAllTargetClusterItemUniqueClass, function (cls) {
            cls.classList.add("hover-item");
          });
        });
      };

      for (var element = 0; element < getNewGridDOMchildElements.length; element++) {
        _loop(element);
      }
    }
  }]);

  return Grid;
}(); //get screen width


var screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth; // Default grid size  

/** Default grid size based on screen width
 *  width <=500px
 * width >=500px 
 **/

window.onload = function () {
  screenWidth > 500 ? new Grid(8) && (document.getElementById("grid-size").defaultValue = 8) : new Grid(6) && (document.getElementById("grid-size").defaultValue = 6);
}; // ALLOw TO CHANGE GRID SIZE


document.getElementById("grid-size").addEventListener("change", function (e) {
  var gridSize = e.target.value;
  var errorElement = document.getElementById("error-message");
  var errorMessage = [];

  if (screenWidth <= 500) {
    //grid size shuld be between 4 and 6
    gridSize == "" ? errorMessage.push("Grid size input field should not be empty") : gridSize > 6 || gridSize < 3 ? errorMessage.push("Grid size should be between 3 and 6") : new Grid(gridSize); // If  grid size is less than 3 and greater than 6 then dispaly error message

    errorMessage.length > 0 ? errorElement.innerText = errorMessage.join(", ") : errorElement.innerText = " ";
  } else {
    //grid size shuld be between 5 and 10
    gridSize == "" ? errorMessage.push("Grid size input field should not be empty") : gridSize > 10 || gridSize < 5 ? errorMessage.push("Grid size should be between 5 and 10") : new Grid(gridSize); // If  grid size is less than 5 and greater than 10 then dispaly error message

    errorMessage.length > 0 ? errorElement.innerText = errorMessage.join(", ") : errorElement.innerText = " ";
  }
});
},{"./../scss/main.scss":"scss/main.scss"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "61919" + '/');

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
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/main.js"], null)
//# sourceMappingURL=/main.fb6bbcaf.js.map