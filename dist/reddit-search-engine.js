// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
require = (function (modules, cache, entry) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof require === "function" && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof require === "function" && require;
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

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }
      
      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module;

      modules[name][0].call(module.exports, localRequire, module, module.exports);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module() {
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  // Override the current require with this new one
  return newRequire;
})({8:[function(require,module,exports) {
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
    throw new Error;
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp):\/\/[^)\n]+/g);
    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;

},{}],5:[function(require,module,exports) {
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

},{"./bundle-url":8}],3:[function(require,module,exports) {

        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
},{"./../img/background.jpg":[["9f373d8e36ce257fda73db5cbcb6033f.jpg",6],6],"_css_loader":5}],7:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  search: function (searchTerm, searchLimit, sortBy) {
    return fetch(`http://www.reddit.com/search.json?q=${searchTerm}&sort=${sortBy}&limit=${searchLimit} `).then(res => res.json()).then(data => data.data.children.map(data => data.data)).catch(err => console.log(err));
  }
};
},{}],4:[function(require,module,exports) {
"use strict";

var _apiReddit = require("./apiReddit");

var _apiReddit2 = _interopRequireDefault(_apiReddit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");

// Form event listener
searchForm.addEventListener("submit", e => {
  //  Get search term
  const searchTerm = searchInput.value;
  //Get sort
  const sortBy = document.querySelector('input[name="sortby"]:checked').value;

  // Get limit
  const searchLimit = document.getElementById("limit").value;

  if (searchTerm === "") {
    showMessage("Please add a search term", "alert-danger");
  }

  searchInput.value = "";

  //   search reddit
  _apiReddit2.default.search(searchTerm, searchLimit, sortBy).then(results => {
    let output = '<div class="card-columns">';
    // loop through post
    results.forEach(post => {
      //   console.log(results);
      //   this gets the image if available if not then shows the default image
      let image = post.preview ? post.preview.images[0].source.url : // : "https://media.giphy.com/media/7Cl6Q2A13HhkI/giphy.gif";
      "https://cdn.comparitech.com/wp-content/uploads/2017/08/reddit-1.jpg";
      output += `
    
        <div class="card" >
        <img class="card-img-top" src=${image} alt="Card image cap">
        <div class="card-body">
            <h5 class="card-title">${post.title}</h5>
            <p class="card-text">${truncateText(post.selftext, 100)} </p>
            <a href=${post.url} target="_blank" class="btn btn-primary red">Read More</a>
        <hr>
        <span class="badge badge-dark">Subreddit: ${post.subreddit}</span>
        <span class="badge light">Score: ${post.score}</span>
        </div>
        </div>
        `;
    });
    output += "</div>";
    document.getElementById("results").innerHTML = output;
  });

  //prevent default
  e.preventDefault();
});

// Function shows message
function showMessage(message, className) {
  //create div
  const div = document.createElement("div");
  //   add classes
  div.className = `alert ${className}`;
  //   add text
  div.appendChild(document.createTextNode(message));
  //Get the parent container
  const searchContainer = document.getElementById("search-container");
  // Get search
  const search = document.getElementById("search");
  //Insert message
  searchContainer.insertBefore(div, search);

  // Time out alert
  setTimeout(() => document.querySelector(".alert").remove(), 3000);
}

// Truncate text

function truncateText(text, limit) {
  const shortened = text.indexOf("", limit);
  if (shortened === -1) return text;
  return text.substring(0, shortened);
}
},{"./apiReddit":7}],2:[function(require,module,exports) {
"use strict";

require("./src/scss/main.scss");

require("./src/js/app");
},{"./src/scss/main.scss":3,"./src/js/app":4}],9:[function(require,module,exports) {

var global = (1, eval)('this');
var OldModule = module.bundle.Module;
function Module() {
  OldModule.call(this);
  this.hot = {
    accept: function (fn) {
      this._acceptCallback = fn || function () {};
    },
    dispose: function (fn) {
      this._disposeCallback = fn;
    }
  };
}

module.bundle.Module = Module;

if (!module.bundle.parent && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var ws = new WebSocket('ws://' + hostname + ':' + '55712' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      data.assets.forEach(function (asset) {
        hmrApply(global.require, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.require, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + 'data.error.stack');
    }
  };
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
        parents.push(+k);
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

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  if (cached && cached.hot._disposeCallback) {
    cached.hot._disposeCallback();
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallback) {
    cached.hot._acceptCallback();
    return true;
  }

  return getParents(global.require, id).some(function (id) {
    return hmrAccept(global.require, id);
  });
}
},{}]},{},[9,2])
//# sourceMappingURL=/dist/reddit-search-engine.map