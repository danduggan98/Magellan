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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.tsx");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/App.css":
/*!******************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/App.css ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Imports\nvar ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\nexports = ___CSS_LOADER_API_IMPORT___(false);\n// Module\nexports.push([module.i, \".App {\\n  text-align: center;\\n}\\n\\n#logoBanner {\\n  border-bottom: 1px solid black;\\n  border-width: 3px;\\n  margin-bottom: 50px;\\n  display: flex;\\n  justify-content: space-between;\\n  align-items: center;\\n}\\n\\n.loginButton {\\n  color: black;\\n  font-size: large;\\n  font-weight: bold;\\n  text-decoration: none;\\n  margin-right: 12px;\\n}\\n\\n.loginButton:visited {\\n  color: inherit;\\n}\\n\\n.logo {\\n  font-size: xx-large;\\n  font-family: Georgia, 'Times New Roman', Times, serif;\\n  font-weight: 1000;\\n  color: black;\\n  text-decoration: none;\\n}\\n\\n.logo:visited {\\n  color: inherit;\\n}\\n\", \"\"]);\n// Exports\nmodule.exports = exports;\n\n\n//# sourceURL=webpack:///./src/styles/App.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/index.css":
/*!********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/index.css ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Imports\nvar ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\nexports = ___CSS_LOADER_API_IMPORT___(false);\n// Module\nexports.push([module.i, \"body {\\n  margin: 10px;\\n  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',\\n    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',\\n    sans-serif;\\n  -webkit-font-smoothing: antialiased;\\n  -moz-osx-font-smoothing: grayscale;\\n}\\n\\ncode {\\n  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',\\n    monospace;\\n}\\n\", \"\"]);\n// Exports\nmodule.exports = exports;\n\n\n//# sourceURL=webpack:///./src/styles/index.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/login.css":
/*!********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/login.css ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Imports\nvar ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\nexports = ___CSS_LOADER_API_IMPORT___(false);\n// Module\nexports.push([module.i, \"#loginHeader {\\n    text-align: center;\\n    font-size: xx-large;\\n    font-weight: bolder;\\n}\\n\\n#inputWrapper {\\n    max-width: 600px;\\n    margin: auto;\\n    margin-top: 15px;\\n}\\n\\n#usernameLabel {\\n    display: inline-block;\\n    font-size: large;\\n    margin-bottom: 5px;\\n}\\n\\n#usernameInput {\\n    width: 100%;\\n    height: 40px;\\n    font-size: larger;\\n    border: 1px solid black;\\n    border-radius: 10px;\\n    padding-left: 10px;\\n}\\n\\n#passwordInputWrapper {\\n    margin-top: 15px;\\n}\\n\\n#passwordLabel {\\n    display: inline-block;\\n    font-size: large;\\n    margin-bottom: 5px;\\n}\\n\\n#passwordInput {\\n    width: 100%;\\n    height: 40px;\\n    font-size: larger;\\n    border: 1px solid black;\\n    border-radius: 10px;\\n    padding-left: 10px;\\n}\\n\\n#submitButtonWrapper {\\n    width: 100px;\\n    height: 30px;\\n    text-align: center;\\n    margin: auto;\\n    margin-top: 20px;\\n}\\n\\n#submitButton:hover {\\n    background-color: lightgrey;\\n}\\n\", \"\"]);\n// Exports\nmodule.exports = exports;\n\n\n//# sourceURL=webpack:///./src/styles/login.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/recipe.css":
/*!*********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/recipe.css ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Imports\nvar ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\nexports = ___CSS_LOADER_API_IMPORT___(false);\n// Module\nexports.push([module.i, \"#header {\\n    text-align: center;\\n    margin-bottom: 25px;\\n}\\n\\n#recipeName {\\n    margin: auto;\\n    font-size: 45px;\\n    width: 65%;\\n}\\n\\n#author {\\n    margin-top: 15px;\\n    font-size: 25px;\\n}\\n\\n#source {\\n    margin-top: 10px;\\n    font-size: 16px;\\n}\\n\\n#sourceText {\\n    color: red;\\n    margin-left: 5px;\\n}\\n\\n#image {\\n    text-align: center;\\n}\\n\\n#sourceLink {\\n    text-align: center;\\n}\\n\\n#sourceLink:visited {\\n    color: inherit;\\n}\\n\\n#details {\\n    display: flex;\\n    justify-content: center;\\n    text-align: center;\\n    width: 60%;\\n    margin: auto;\\n    margin-top: 25px;\\n    border: 1px solid black;\\n}\\n\\n#detailsLeft {\\n    align-self: center;\\n    margin-right: 65px;\\n}\\n\\n#difficulty {\\n    font-size: larger;\\n    margin-bottom: 10px;\\n}\\n\\n#difficultyText {\\n    font-weight: bold;\\n    margin-left: 5px;\\n}\\n\\n#yield {\\n    font-size: larger;\\n    margin-bottom: 5px;\\n}\\n\\n#yieldText {\\n    font-weight: bold;\\n    margin-left: 5px;\\n}\\n\\n#totalTime {\\n    font-size: 22px;\\n    margin-bottom: 5px;\\n    margin-top: 25px;\\n    margin-left: 15px;\\n}\\n\\n#totalTimeText {\\n    font-weight: bold;\\n    margin-left: 5px;\\n    border-bottom: 2px solid black;\\n}\\n\\n#times {\\n    text-align: center;\\n}\\n\\n#timesList {\\n    display: inline-block;\\n    text-align: left;\\n}\\n\\n#prepTime {\\n    font-size: larger;\\n    margin-bottom: 10px;\\n}\\n\\n#prepTimeText {\\n    font-weight: bold;\\n    margin-right: 5px;\\n}\\n\\n#cookTime {\\n    font-size: larger;\\n    margin-bottom: 10px;\\n}\\n\\n#cookTimeText {\\n    font-weight: bold;\\n    margin-right: 5px;\\n}\\n\\n#activeTime {\\n    font-size: larger;\\n    margin-bottom: 10px;\\n}\\n\\n#activeTimeText {\\n    font-weight: bold;\\n    margin-right: 5px;\\n}\\n\\n#inactiveTime {\\n    font-size: larger;\\n    margin-bottom: 10px;\\n}\\n\\n#inactiveTimeText {\\n    font-weight: bold;\\n    margin-right: 5px;\\n}\\n\\n.listHeader {\\n    font-size: x-large;\\n    font-weight: bold;\\n    margin-top: 25px;\\n}\\n\\n.sectionHeader {\\n    margin-top: 20px;\\n    font-size: large;\\n    margin-left: 15px;\\n    text-decoration: underline;\\n}\\n\\n.sectionData {\\n    margin-bottom: 6px;\\n    line-height: 25px;\\n    font-family: Arial, Helvetica, sans-serif;\\n    font-size: 18px;\\n}\\n\\n.invisibleElement {\\n    display: none;\\n    height: 0;\\n    width: 0;\\n    border: 0;\\n}\\n\", \"\"]);\n// Exports\nmodule.exports = exports;\n\n\n//# sourceURL=webpack:///./src/styles/recipe.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/searchBar.css":
/*!************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/searchBar.css ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Imports\nvar ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\nexports = ___CSS_LOADER_API_IMPORT___(false);\n// Module\nexports.push([module.i, \"#searchContainer {\\n    margin: auto;\\n    max-width: 800px;\\n}\\n\\n#notice {\\n    font-size: x-large;\\n    font-weight: bolder;\\n    padding-bottom: 20px;\\n    text-align: left;\\n    padding-left: 20px;\\n}\\n\\n#searchBarWrapper {\\n    text-align: center;\\n    position: relative;\\n}\\n\\n#searchInput {\\n    margin: auto;\\n    text-align: left;\\n    height: 45px;\\n    border: 1px solid black;\\n    border-radius: 20px;\\n    font-size: large;\\n    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;\\n    padding-left: 15px;\\n    width: 750px;\\n}\\n\\n#iframe {\\n    display: none;\\n    width: 0;\\n    height: 0;\\n    border: 0;\\n}\\n\\n#searchButton {\\n    color: black;\\n    height: 49px;\\n    width: 60px;\\n    cursor: pointer;\\n    text-align: center;\\n    position: absolute;\\n    right: 15px;\\n    border: 1px solid black;\\n    border-top-right-radius: 20px;\\n    border-bottom-right-radius: 20px;\\n    background-color: lightsteelblue;\\n    font-size: x-large;\\n}\\n\\n#searchButton:hover {\\n    background-color: cornflowerblue;\\n}\\n\\n#searchType {\\n    padding-top: 25px;\\n    padding-left: 20px;\\n    padding-bottom: 10px;\\n    text-align: left;\\n}\\n\\n#searchTypeNameWrapper {\\n    padding-top: 5px;\\n    display: block;\\n    white-space: pre;\\n}\\n\\n#searchTypeIngWrapper {\\n    display: block;\\n    white-space: pre;\\n}\\n\\n#inputReminder {\\n    max-height: 12px;\\n    text-align: center;\\n    font-size: x-large;\\n    font-weight: bold;\\n}\\n\\n#loadingBar {\\n    text-align: center;\\n    font-size: x-large;\\n    font-weight: bold;\\n}\\n\\n#failNotice {\\n    text-align: center;\\n    font-size: x-large;\\n    font-weight: bold;\\n}\\n\", \"\"]);\n// Exports\nmodule.exports = exports;\n\n\n//# sourceURL=webpack:///./src/styles/searchBar.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/searchCard.css":
/*!*************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/searchCard.css ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Imports\nvar ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\nexports = ___CSS_LOADER_API_IMPORT___(false);\n// Module\nexports.push([module.i, \"#card {\\n    border: 2px solid grey;\\n    border-radius: 15px;\\n    width: auto;\\n    height: auto;\\n    min-width: 150px;\\n    min-height: 135px;\\n    max-width: 250px;\\n    max-height: 225px;\\n}\\n\\n#card:hover {\\n    box-shadow: 3px 3px 8px grey;\\n}\\n\\n#cardInfo {\\n    height: 100%;\\n    padding: 10px;\\n}\\n\\n#cardRecipeName {\\n    color: black;\\n    font-size: 20px;\\n    font-weight: 500;\\n    margin-bottom: 10px;\\n    height: 50%;\\n    overflow: hidden;\\n}\\n\\n#cardAuthor {\\n    color: midnightblue;\\n    font-size: 16px;\\n    margin-bottom: 6px;\\n}\\n\\n#cardTotalTime {\\n    color: purple;\\n    font-size: 16px;\\n}\\n\\n.cardRecipeLink {\\n    color: inherit;\\n    text-decoration: none;\\n}\\n\\n.cardRecipeLink:visited {\\n    color: inherit;\\n}\\n\", \"\"]);\n// Exports\nmodule.exports = exports;\n\n\n//# sourceURL=webpack:///./src/styles/searchCard.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/searchResults.css":
/*!****************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/searchResults.css ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Imports\nvar ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\nexports = ___CSS_LOADER_API_IMPORT___(false);\n// Module\nexports.push([module.i, \"#resultsContainer {\\n    margin: auto;\\n    max-width: 800px;\\n    padding-top: 10px;\\n}\\n\\n#resultsList {\\n    display: grid;\\n    grid-template-columns: repeat(3, minmax(150px, 1fr));\\n    grid-auto-rows: 1fr;\\n    gap: 1rem;\\n    padding-bottom: 20px;\\n}\\n\", \"\"]);\n// Exports\nmodule.exports = exports;\n\n\n//# sourceURL=webpack:///./src/styles/searchResults.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\n// css base code, injected by the css-loader\n// eslint-disable-next-line func-names\nmodule.exports = function (useSourceMap) {\n  var list = []; // return the list of modules as css string\n\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = cssWithMappingToString(item, useSourceMap);\n\n      if (item[2]) {\n        return \"@media \".concat(item[2], \" {\").concat(content, \"}\");\n      }\n\n      return content;\n    }).join('');\n  }; // import a list of modules into the list\n  // eslint-disable-next-line func-names\n\n\n  list.i = function (modules, mediaQuery, dedupe) {\n    if (typeof modules === 'string') {\n      // eslint-disable-next-line no-param-reassign\n      modules = [[null, modules, '']];\n    }\n\n    var alreadyImportedModules = {};\n\n    if (dedupe) {\n      for (var i = 0; i < this.length; i++) {\n        // eslint-disable-next-line prefer-destructuring\n        var id = this[i][0];\n\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n\n    for (var _i = 0; _i < modules.length; _i++) {\n      var item = [].concat(modules[_i]);\n\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        // eslint-disable-next-line no-continue\n        continue;\n      }\n\n      if (mediaQuery) {\n        if (!item[2]) {\n          item[2] = mediaQuery;\n        } else {\n          item[2] = \"\".concat(mediaQuery, \" and \").concat(item[2]);\n        }\n      }\n\n      list.push(item);\n    }\n  };\n\n  return list;\n};\n\nfunction cssWithMappingToString(item, useSourceMap) {\n  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring\n\n  var cssMapping = item[3];\n\n  if (!cssMapping) {\n    return content;\n  }\n\n  if (useSourceMap && typeof btoa === 'function') {\n    var sourceMapping = toComment(cssMapping);\n    var sourceURLs = cssMapping.sources.map(function (source) {\n      return \"/*# sourceURL=\".concat(cssMapping.sourceRoot || '').concat(source, \" */\");\n    });\n    return [content].concat(sourceURLs).concat([sourceMapping]).join('\\n');\n  }\n\n  return [content].join('\\n');\n} // Adapted from convert-source-map (MIT)\n\n\nfunction toComment(sourceMap) {\n  // eslint-disable-next-line no-undef\n  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));\n  var data = \"sourceMappingURL=data:application/json;charset=utf-8;base64,\".concat(base64);\n  return \"/*# \".concat(data, \" */\");\n}\n\n//# sourceURL=webpack:///./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar isOldIE = function isOldIE() {\n  var memo;\n  return function memorize() {\n    if (typeof memo === 'undefined') {\n      // Test for IE <= 9 as proposed by Browserhacks\n      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805\n      // Tests for existence of standard globals is to allow style-loader\n      // to operate correctly into non-standard environments\n      // @see https://github.com/webpack-contrib/style-loader/issues/177\n      memo = Boolean(window && document && document.all && !window.atob);\n    }\n\n    return memo;\n  };\n}();\n\nvar getTarget = function getTarget() {\n  var memo = {};\n  return function memorize(target) {\n    if (typeof memo[target] === 'undefined') {\n      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself\n\n      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n        try {\n          // This will throw an exception if access to iframe is blocked\n          // due to cross-origin restrictions\n          styleTarget = styleTarget.contentDocument.head;\n        } catch (e) {\n          // istanbul ignore next\n          styleTarget = null;\n        }\n      }\n\n      memo[target] = styleTarget;\n    }\n\n    return memo[target];\n  };\n}();\n\nvar stylesInDom = [];\n\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n\n  for (var i = 0; i < stylesInDom.length; i++) {\n    if (stylesInDom[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n\n  return result;\n}\n\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var index = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3]\n    };\n\n    if (index !== -1) {\n      stylesInDom[index].references++;\n      stylesInDom[index].updater(obj);\n    } else {\n      stylesInDom.push({\n        identifier: identifier,\n        updater: addStyle(obj, options),\n        references: 1\n      });\n    }\n\n    identifiers.push(identifier);\n  }\n\n  return identifiers;\n}\n\nfunction insertStyleElement(options) {\n  var style = document.createElement('style');\n  var attributes = options.attributes || {};\n\n  if (typeof attributes.nonce === 'undefined') {\n    var nonce =  true ? __webpack_require__.nc : undefined;\n\n    if (nonce) {\n      attributes.nonce = nonce;\n    }\n  }\n\n  Object.keys(attributes).forEach(function (key) {\n    style.setAttribute(key, attributes[key]);\n  });\n\n  if (typeof options.insert === 'function') {\n    options.insert(style);\n  } else {\n    var target = getTarget(options.insert || 'head');\n\n    if (!target) {\n      throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n    }\n\n    target.appendChild(style);\n  }\n\n  return style;\n}\n\nfunction removeStyleElement(style) {\n  // istanbul ignore if\n  if (style.parentNode === null) {\n    return false;\n  }\n\n  style.parentNode.removeChild(style);\n}\n/* istanbul ignore next  */\n\n\nvar replaceText = function replaceText() {\n  var textStore = [];\n  return function replace(index, replacement) {\n    textStore[index] = replacement;\n    return textStore.filter(Boolean).join('\\n');\n  };\n}();\n\nfunction applyToSingletonTag(style, index, remove, obj) {\n  var css = remove ? '' : obj.media ? \"@media \".concat(obj.media, \" {\").concat(obj.css, \"}\") : obj.css; // For old IE\n\n  /* istanbul ignore if  */\n\n  if (style.styleSheet) {\n    style.styleSheet.cssText = replaceText(index, css);\n  } else {\n    var cssNode = document.createTextNode(css);\n    var childNodes = style.childNodes;\n\n    if (childNodes[index]) {\n      style.removeChild(childNodes[index]);\n    }\n\n    if (childNodes.length) {\n      style.insertBefore(cssNode, childNodes[index]);\n    } else {\n      style.appendChild(cssNode);\n    }\n  }\n}\n\nfunction applyToTag(style, options, obj) {\n  var css = obj.css;\n  var media = obj.media;\n  var sourceMap = obj.sourceMap;\n\n  if (media) {\n    style.setAttribute('media', media);\n  } else {\n    style.removeAttribute('media');\n  }\n\n  if (sourceMap && btoa) {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  } // For old IE\n\n  /* istanbul ignore if  */\n\n\n  if (style.styleSheet) {\n    style.styleSheet.cssText = css;\n  } else {\n    while (style.firstChild) {\n      style.removeChild(style.firstChild);\n    }\n\n    style.appendChild(document.createTextNode(css));\n  }\n}\n\nvar singleton = null;\nvar singletonCounter = 0;\n\nfunction addStyle(obj, options) {\n  var style;\n  var update;\n  var remove;\n\n  if (options.singleton) {\n    var styleIndex = singletonCounter++;\n    style = singleton || (singleton = insertStyleElement(options));\n    update = applyToSingletonTag.bind(null, style, styleIndex, false);\n    remove = applyToSingletonTag.bind(null, style, styleIndex, true);\n  } else {\n    style = insertStyleElement(options);\n    update = applyToTag.bind(null, style, options);\n\n    remove = function remove() {\n      removeStyleElement(style);\n    };\n  }\n\n  update(obj);\n  return function updateStyle(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {\n        return;\n      }\n\n      update(obj = newObj);\n    } else {\n      remove();\n    }\n  };\n}\n\nmodule.exports = function (list, options) {\n  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>\n  // tags it will allow on a page\n\n  if (!options.singleton && typeof options.singleton !== 'boolean') {\n    options.singleton = isOldIE();\n  }\n\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n\n    if (Object.prototype.toString.call(newList) !== '[object Array]') {\n      return;\n    }\n\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDom[index].references--;\n    }\n\n    var newLastIdentifiers = modulesToDom(newList, options);\n\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n\n      var _index = getIndexByIdentifier(_identifier);\n\n      if (stylesInDom[_index].references === 0) {\n        stylesInDom[_index].updater();\n\n        stylesInDom.splice(_index, 1);\n      }\n    }\n\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack:///./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ }),

/***/ "./src/App.tsx":
/*!*********************!*\
  !*** ./src/App.tsx ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return App; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _components_recipe__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/recipe */ \"./src/components/recipe.tsx\");\n/* harmony import */ var _components_home__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/home */ \"./src/components/home.tsx\");\n/* harmony import */ var _components_login__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/login */ \"./src/components/login.tsx\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _styles_App_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./styles/App.css */ \"./src/styles/App.css\");\n/* harmony import */ var _styles_App_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_styles_App_css__WEBPACK_IMPORTED_MODULE_5__);\n\n\n\n\n\n\nfunction App() {\n    return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null,\n        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_4__[\"BrowserRouter\"], null,\n            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", { id: 'logoBanner' },\n                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_4__[\"Link\"], { to: '/home', className: 'logo' }, \"MAGELLAN\"),\n                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_4__[\"Link\"], { to: '/login', className: 'loginButton' }, \"Log In\")),\n            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_4__[\"Switch\"], null,\n                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_4__[\"Route\"], { path: '/recipe/:recipeid', component: _components_recipe__WEBPACK_IMPORTED_MODULE_1__[\"default\"] }),\n                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_4__[\"Route\"], { path: '/home', component: _components_home__WEBPACK_IMPORTED_MODULE_2__[\"default\"] }),\n                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_4__[\"Route\"], { path: '/login', component: _components_login__WEBPACK_IMPORTED_MODULE_3__[\"default\"] }),\n                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_4__[\"Route\"], { path: '/' },\n                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_4__[\"Redirect\"], { to: '/home' }))))));\n}\n\n\n//# sourceURL=webpack:///./src/App.tsx?");

/***/ }),

/***/ "./src/components/home.tsx":
/*!*********************************!*\
  !*** ./src/components/home.tsx ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Home; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _searchBar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./searchBar */ \"./src/components/searchBar.tsx\");\n\n\nclass Home extends react__WEBPACK_IMPORTED_MODULE_0__[\"Component\"] {\n    render() {\n        return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null,\n            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_searchBar__WEBPACK_IMPORTED_MODULE_1__[\"default\"], null)));\n    }\n}\n\n\n//# sourceURL=webpack:///./src/components/home.tsx?");

/***/ }),

/***/ "./src/components/login.tsx":
/*!**********************************!*\
  !*** ./src/components/login.tsx ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Login; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _styles_login_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../styles/login.css */ \"./src/styles/login.css\");\n/* harmony import */ var _styles_login_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_login_css__WEBPACK_IMPORTED_MODULE_1__);\n\n\n;\nclass Login extends react__WEBPACK_IMPORTED_MODULE_0__[\"Component\"] {\n    constructor() {\n        super(...arguments);\n        this.state = {\n            usernameInput: '',\n            passwordInput: ''\n        };\n        //Store the most recent inputs in state\n        this.updateInput = (event) => {\n            let { id, value } = event.currentTarget;\n            this.setState({ [id]: value });\n        };\n        this.submitPage = () => {\n            if (!this.state.usernameInput) {\n                console.log('PLEASE ENTER USERNAME');\n            }\n            if (!this.state.passwordInput) {\n                console.log('PLEASE ENTER PASSWORD');\n            }\n        };\n    }\n    render() {\n        return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", { id: 'loginWrapper' },\n            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", { id: 'loginHeader' }, \"Log In\"),\n            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"form\", { name: 'loginForm', target: 'hiddenFrame', onSubmit: this.submitPage },\n                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", { id: 'inputWrapper' },\n                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", { id: 'usernameInputWrapper' },\n                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"label\", { id: 'usernameLabel', htmlFor: 'usernameInput' }, \"Username:\"),\n                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"input\", { name: 'UN', id: 'usernameInput', type: 'text', autoComplete: 'off', placeholder: 'Username', value: this.state.usernameInput, onChange: this.updateInput })),\n                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", { id: 'passwordInputWrapper' },\n                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"label\", { id: 'passwordLabel', htmlFor: 'passwordInput' }, \"Password:\"),\n                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"input\", { name: 'PW', id: 'passwordInput', type: 'password', autoComplete: 'off', placeholder: 'Password', value: this.state.passwordInput, onChange: this.updateInput }))),\n                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", { id: 'submitButtonWrapper' },\n                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"button\", { type: 'submit', id: 'submitButton' }, \"Submit\"))),\n            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"iframe\", { name: 'hiddenFrame', id: 'iframe', title: 'hidden' })));\n    }\n}\n\n\n//# sourceURL=webpack:///./src/components/login.tsx?");

/***/ }),

/***/ "./src/components/recipe.tsx":
/*!***********************************!*\
  !*** ./src/components/recipe.tsx ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Recipe; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_helmet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-helmet */ \"react-helmet\");\n/* harmony import */ var react_helmet__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_helmet__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _styles_recipe_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../styles/recipe.css */ \"./src/styles/recipe.css\");\n/* harmony import */ var _styles_recipe_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_styles_recipe_css__WEBPACK_IMPORTED_MODULE_2__);\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\n\n\n\n//Parse an array of ingredients or directions into a JSX list\nconst ArrayToList = (props) => {\n    let items = [];\n    //Iterate through each section\n    for (let i = 0; i < props.list.length; i++) {\n        let section = [];\n        let itemList = props.list[i];\n        //Store each item in the inner array as an HTML list item\n        for (let j = 1; j < itemList.length; j++) { //Start at j = 1 to skip the header\n            let next = itemList[j];\n            section.push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"li\", { key: next }, next));\n        }\n        //Print the section header if noteworthy\n        const header = itemList[0];\n        if (header !== 'main') {\n            items.push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", { className: 'sectionHeader', key: header }, header));\n        }\n        //Print the list of items\n        items.push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", { className: 'sectionData' }, props.ordered\n            ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"ol\", { key: section.toString() }, section)\n            : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"ul\", { key: section.toString() }, section)));\n    }\n    return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null, items));\n};\n//Display full recipe data\nclass Recipe extends react__WEBPACK_IMPORTED_MODULE_0__[\"Component\"] {\n    constructor(props) {\n        super(props);\n        this.state = {\n            recipeFound: true,\n            recipeID: props.match.params.id,\n            URL: '',\n            imageURL: '',\n            author: '',\n            recipeName: '',\n            difficulty: '',\n            totalTime: '',\n            prepTime: '',\n            inactiveTime: '',\n            activeTime: '',\n            cookTime: '',\n            yield: '',\n            ingredients: [],\n            directions: [],\n            source: ''\n        };\n    }\n    //Gather data from server JSON response\n    componentDidMount() {\n        return __awaiter(this, void 0, void 0, function* () {\n            const res = yield fetch('/recipe/' + this.state.recipeID);\n            const data = yield res.json();\n            //Recipe not found\n            if (data.error) {\n                this.setState({ recipeFound: false });\n            }\n            //Recipe found\n            else {\n                this.setState({\n                    URL: data.URL,\n                    imageURL: data.imageURL,\n                    author: data.author,\n                    recipeName: data.recipeName,\n                    difficulty: data.difficulty,\n                    totalTime: data.totalTime,\n                    prepTime: data.prepTime,\n                    inactiveTime: data.inactiveTime,\n                    activeTime: data.activeTime,\n                    cookTime: data.cookTime,\n                    yield: data.yield,\n                    ingredients: data.ingredients,\n                    directions: data.directions,\n                    source: data.source\n                });\n            }\n        });\n    }\n    render() {\n        //Recipe not found\n        if (!this.state.recipeFound) {\n            return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", { id: 'notFoundNotice' }, \"Recipe not found! Please try again\"));\n        }\n        //Recipe found\n        else {\n            return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null,\n                this.state.recipeName\n                    ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_helmet__WEBPACK_IMPORTED_MODULE_1__[\"Helmet\"], null,\n                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"title\", null, \"Magellan - \" + this.state.recipeName))\n                    : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_helmet__WEBPACK_IMPORTED_MODULE_1__[\"Helmet\"], null,\n                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"title\", null, \"Magellan\")),\n                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", { id: 'header' },\n                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", { id: 'recipeName' }, this.state.recipeName),\n                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", { id: 'author' },\n                        \"by \",\n                        this.state.author),\n                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", { id: 'source' },\n                        \"Courtesy of\",\n                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", { id: 'sourceText' }, this.state.source))),\n                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", { id: 'image' },\n                    this.state.imageURL\n                        ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", { src: this.state.imageURL, alt: '', width: '600' })\n                        : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"p\", { className: 'invisibleElement' }),\n                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", { id: 'sourceLink' },\n                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"a\", { target: '_blank', rel: 'noopener noreferrer', href: this.state.URL }, \"Original Recipe\"))),\n                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", { id: 'details' },\n                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", { id: 'detailsLeft' },\n                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", { id: 'difficulty' },\n                            \"Difficulty:\",\n                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", { id: 'difficultyText' }, this.state.difficulty)),\n                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", { id: 'yield' },\n                            \"Yield:\",\n                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", { id: 'yieldText' }, this.state.yield))),\n                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", { id: 'times' },\n                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", { id: 'totalTime' },\n                            \"Total Time:\",\n                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", { id: 'totalTimeText' }, this.state.totalTime)),\n                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", { id: 'timesList' },\n                            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"ul\", null,\n                                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", { id: 'prepTime' }, this.state.prepTime\n                                    ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"li\", null,\n                                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", { id: 'prepTimeText' }, this.state.prepTime),\n                                        \"prep time\")\n                                    : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"p\", { className: 'invisibleElement' })),\n                                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", { id: 'cookTime' }, this.state.cookTime\n                                    ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"li\", null,\n                                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", { id: 'cookTimeText' }, this.state.cookTime),\n                                        \"cook time\")\n                                    : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"p\", { className: 'invisibleElement' })),\n                                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", { id: 'activeTime' }, this.state.activeTime\n                                    ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"li\", null,\n                                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", { id: 'activeTimeText' }, this.state.activeTime),\n                                        \"active time\")\n                                    : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"p\", { className: 'invisibleElement' })),\n                                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", { id: 'inactiveTime' }, this.state.inactiveTime\n                                    ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"li\", null,\n                                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", { id: 'inactiveTimeText' }, this.state.inactiveTime),\n                                        \"inactive time\")\n                                    : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"p\", { className: 'invisibleElement' })))))),\n                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", { id: 'ingredients' },\n                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", { className: 'listHeader' }, \"Ingredients\"),\n                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(ArrayToList, { list: this.state.ingredients, ordered: false })),\n                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", { id: 'directions' },\n                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", { className: 'listHeader' }, \"Directions\"),\n                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(ArrayToList, { list: this.state.directions, ordered: true }))));\n        }\n    }\n}\n\n\n//# sourceURL=webpack:///./src/components/recipe.tsx?");

/***/ }),

/***/ "./src/components/searchBar.tsx":
/*!**************************************!*\
  !*** ./src/components/searchBar.tsx ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return SearchBar; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _emotion_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @emotion/core */ \"@emotion/core\");\n/* harmony import */ var _emotion_core__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_emotion_core__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_spinners_BarLoader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-spinners/BarLoader */ \"react-spinners/BarLoader\");\n/* harmony import */ var react_spinners_BarLoader__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_spinners_BarLoader__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _searchResults__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./searchResults */ \"./src/components/searchResults.tsx\");\n/* harmony import */ var _styles_searchBar_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../styles/searchBar.css */ \"./src/styles/searchBar.css\");\n/* harmony import */ var _styles_searchBar_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_styles_searchBar_css__WEBPACK_IMPORTED_MODULE_4__);\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\n\n\n\n\n\nclass SearchBar extends react__WEBPACK_IMPORTED_MODULE_0__[\"Component\"] {\n    constructor() {\n        super(...arguments);\n        this.state = {\n            searchType: 'name',\n            input: '',\n            emptyInput: false,\n            resultsFound: true,\n            loading: false,\n            results: [],\n            maxResults: 36 //Arbitrary\n        };\n        //Launch a search in the server and store the results\n        this.getResults = () => __awaiter(this, void 0, void 0, function* () {\n            //Ensure they have entered something\n            if (this.state.input) {\n                //If so, query the db\n                const fetchURL = `/search/${this.state.searchType}/${this.state.input}/${this.state.maxResults}`;\n                this.setState({\n                    results: [],\n                    resultsFound: true,\n                    loading: true,\n                    emptyInput: false\n                });\n                const res = yield fetch(fetchURL); //Execute the search\n                const data = yield res.json();\n                //No search results\n                if (data.error) {\n                    this.setState({\n                        resultsFound: false,\n                        loading: false\n                    });\n                }\n                //Store the results in state\n                else {\n                    this.setState({\n                        resultsFound: true,\n                        loading: false,\n                        results: data.searchResults\n                    });\n                }\n            }\n            else {\n                this.setState({\n                    emptyInput: true,\n                    resultsFound: true,\n                    results: []\n                });\n            }\n        });\n        //Save the user's current input in state\n        this.updateInput = (event) => {\n            this.setState({ input: event.currentTarget.value });\n        };\n        //Change the search type when the radio buttons are clicked\n        this.updateSearchType = (event) => {\n            this.setState({ searchType: event.currentTarget.value });\n        };\n    }\n    // Search bar - form accepts the search and queries the db\n    render() {\n        //CSS for loading bar\n        const override = _emotion_core__WEBPACK_IMPORTED_MODULE_1__[\"css\"] `\n            width: 285px;\n            margin-top: 10px;\n            margin-left: auto;\n            margin-right: auto;\n            background-color: lightgrey;\n        `;\n        return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", { id: 'searchContainer' },\n            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", { id: 'notice' }, \"Find your next meal!\"),\n            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"form\", { name: 'searchBar', target: 'hiddenFrame', onSubmit: this.getResults },\n                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", { id: 'searchBarWrapper' },\n                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"input\", { name: 'search', id: 'searchInput', type: 'text', autoComplete: 'off', placeholder: 'Search for recipes', onChange: this.updateInput }),\n                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"button\", { type: 'submit', id: 'searchButton', className: 'fa fa-search' })),\n                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", { id: 'searchType' },\n                    \"Search by:\",\n                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", { id: 'searchTypeNameWrapper' },\n                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"input\", { type: 'radio', id: 'searchTypeNameButton', name: 'searchType', value: 'name', onChange: this.updateSearchType, checked: this.state.searchType === 'name' }),\n                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"label\", { htmlFor: 'searchTypeNameButton' }, \"Recipe Name\")),\n                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", { id: 'searchTypeIngWrapper' },\n                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"input\", { type: 'radio', id: 'searchTypeIngButton', name: 'searchType', value: 'ing', onChange: this.updateSearchType, checked: this.state.searchType === 'ing' }),\n                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"label\", { htmlFor: 'searchTypeIngButton' }, \"Ingredient\"))),\n                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", { id: 'inputReminder' }, this.state.emptyInput\n                    ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h4\", null, \"Please enter something to search\")\n                    : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"p\", null)),\n                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", { id: 'loadingBar' }, this.state.loading\n                    ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null,\n                        \"Searching...\",\n                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_spinners_BarLoader__WEBPACK_IMPORTED_MODULE_2___default.a, { height: 6, css: override }))\n                    : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"p\", null))),\n            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", { id: 'results' },\n                !this.state.resultsFound\n                    ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", { id: 'failNotice' }, \"No results found. Try again\")\n                    : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"p\", null),\n                this.state.results.length\n                    ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_searchResults__WEBPACK_IMPORTED_MODULE_3__[\"default\"], { data: this.state.results })\n                    : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"p\", null)),\n            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"iframe\", { name: 'hiddenFrame', id: 'iframe', title: 'hidden' })));\n    }\n}\n\n\n//# sourceURL=webpack:///./src/components/searchBar.tsx?");

/***/ }),

/***/ "./src/components/searchCard.tsx":
/*!***************************************!*\
  !*** ./src/components/searchCard.tsx ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return SearchCard; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _styles_searchCard_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../styles/searchCard.css */ \"./src/styles/searchCard.css\");\n/* harmony import */ var _styles_searchCard_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_searchCard_css__WEBPACK_IMPORTED_MODULE_1__);\n\n\nclass SearchCard extends react__WEBPACK_IMPORTED_MODULE_0__[\"Component\"] {\n    constructor(props) {\n        super(props);\n        this.state = {\n            recipe: props.info\n        };\n    }\n    render() {\n        const data = this.state.recipe;\n        const link = `/recipe/${data._id}`;\n        return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", { id: 'card' },\n            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"a\", { className: 'cardRecipeLink', target: '_blank', rel: 'noopener noreferrer', href: link },\n                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", { id: 'cardInfo' },\n                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", { id: 'cardRecipeName' }, data.recipeName),\n                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", { id: 'cardAuthor' },\n                        \"by \",\n                        data.author),\n                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", { id: 'cardTotalTime' }, data.totalTime)))));\n    }\n}\n\n\n//# sourceURL=webpack:///./src/components/searchCard.tsx?");

/***/ }),

/***/ "./src/components/searchResults.tsx":
/*!******************************************!*\
  !*** ./src/components/searchResults.tsx ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return SearchResults; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _searchCard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./searchCard */ \"./src/components/searchCard.tsx\");\n/* harmony import */ var _styles_searchResults_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../styles/searchResults.css */ \"./src/styles/searchResults.css\");\n/* harmony import */ var _styles_searchResults_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_styles_searchResults_css__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nclass SearchResults extends react__WEBPACK_IMPORTED_MODULE_0__[\"Component\"] {\n    constructor(props) {\n        super(props);\n        this.state = {\n            results: props.data,\n            maxResultsPerPage: 9 //Arbitrary\n        };\n    }\n    render() {\n        //See if there will be extra recipes for a new page\n        const overflow = (this.state.results.length > this.state.maxResultsPerPage);\n        //Grab the recipes we will show, up to the given limit\n        const res = Array.from(this.state.results);\n        const visible = res.slice(0, this.state.maxResultsPerPage);\n        //Turn them into search cards\n        const list = visible.map(recipe => (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_searchCard__WEBPACK_IMPORTED_MODULE_1__[\"default\"], { info: recipe })));\n        return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", { id: 'resultsContainer' },\n            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h2\", null, \"Top Results:\"),\n            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", { id: 'resultsList' }, list),\n            overflow\n                ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null, \"See more results\")\n                : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"p\", null)));\n    }\n}\n\n\n//# sourceURL=webpack:///./src/components/searchResults.tsx?");

/***/ }),

/***/ "./src/index.tsx":
/*!***********************!*\
  !*** ./src/index.tsx ***!
  \***********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ \"react-dom\");\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _App__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./App */ \"./src/App.tsx\");\n/* harmony import */ var _styles_index_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./styles/index.css */ \"./src/styles/index.css\");\n/* harmony import */ var _styles_index_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_styles_index_css__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\nreact_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_App__WEBPACK_IMPORTED_MODULE_2__[\"default\"], null), document.getElementById('root'));\n\n\n//# sourceURL=webpack:///./src/index.tsx?");

/***/ }),

/***/ "./src/styles/App.css":
/*!****************************!*\
  !*** ./src/styles/App.css ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var api = __webpack_require__(/*! ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n            var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!./App.css */ \"./node_modules/css-loader/dist/cjs.js!./src/styles/App.css\");\n\n            content = content.__esModule ? content.default : content;\n\n            if (typeof content === 'string') {\n              content = [[module.i, content, '']];\n            }\n\nvar options = {};\n\noptions.insert = \"head\";\noptions.singleton = false;\n\nvar update = api(content, options);\n\n\n\nmodule.exports = content.locals || {};\n\n//# sourceURL=webpack:///./src/styles/App.css?");

/***/ }),

/***/ "./src/styles/index.css":
/*!******************************!*\
  !*** ./src/styles/index.css ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var api = __webpack_require__(/*! ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n            var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!./index.css */ \"./node_modules/css-loader/dist/cjs.js!./src/styles/index.css\");\n\n            content = content.__esModule ? content.default : content;\n\n            if (typeof content === 'string') {\n              content = [[module.i, content, '']];\n            }\n\nvar options = {};\n\noptions.insert = \"head\";\noptions.singleton = false;\n\nvar update = api(content, options);\n\n\n\nmodule.exports = content.locals || {};\n\n//# sourceURL=webpack:///./src/styles/index.css?");

/***/ }),

/***/ "./src/styles/login.css":
/*!******************************!*\
  !*** ./src/styles/login.css ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var api = __webpack_require__(/*! ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n            var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!./login.css */ \"./node_modules/css-loader/dist/cjs.js!./src/styles/login.css\");\n\n            content = content.__esModule ? content.default : content;\n\n            if (typeof content === 'string') {\n              content = [[module.i, content, '']];\n            }\n\nvar options = {};\n\noptions.insert = \"head\";\noptions.singleton = false;\n\nvar update = api(content, options);\n\n\n\nmodule.exports = content.locals || {};\n\n//# sourceURL=webpack:///./src/styles/login.css?");

/***/ }),

/***/ "./src/styles/recipe.css":
/*!*******************************!*\
  !*** ./src/styles/recipe.css ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var api = __webpack_require__(/*! ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n            var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!./recipe.css */ \"./node_modules/css-loader/dist/cjs.js!./src/styles/recipe.css\");\n\n            content = content.__esModule ? content.default : content;\n\n            if (typeof content === 'string') {\n              content = [[module.i, content, '']];\n            }\n\nvar options = {};\n\noptions.insert = \"head\";\noptions.singleton = false;\n\nvar update = api(content, options);\n\n\n\nmodule.exports = content.locals || {};\n\n//# sourceURL=webpack:///./src/styles/recipe.css?");

/***/ }),

/***/ "./src/styles/searchBar.css":
/*!**********************************!*\
  !*** ./src/styles/searchBar.css ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var api = __webpack_require__(/*! ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n            var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!./searchBar.css */ \"./node_modules/css-loader/dist/cjs.js!./src/styles/searchBar.css\");\n\n            content = content.__esModule ? content.default : content;\n\n            if (typeof content === 'string') {\n              content = [[module.i, content, '']];\n            }\n\nvar options = {};\n\noptions.insert = \"head\";\noptions.singleton = false;\n\nvar update = api(content, options);\n\n\n\nmodule.exports = content.locals || {};\n\n//# sourceURL=webpack:///./src/styles/searchBar.css?");

/***/ }),

/***/ "./src/styles/searchCard.css":
/*!***********************************!*\
  !*** ./src/styles/searchCard.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var api = __webpack_require__(/*! ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n            var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!./searchCard.css */ \"./node_modules/css-loader/dist/cjs.js!./src/styles/searchCard.css\");\n\n            content = content.__esModule ? content.default : content;\n\n            if (typeof content === 'string') {\n              content = [[module.i, content, '']];\n            }\n\nvar options = {};\n\noptions.insert = \"head\";\noptions.singleton = false;\n\nvar update = api(content, options);\n\n\n\nmodule.exports = content.locals || {};\n\n//# sourceURL=webpack:///./src/styles/searchCard.css?");

/***/ }),

/***/ "./src/styles/searchResults.css":
/*!**************************************!*\
  !*** ./src/styles/searchResults.css ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var api = __webpack_require__(/*! ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n            var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!./searchResults.css */ \"./node_modules/css-loader/dist/cjs.js!./src/styles/searchResults.css\");\n\n            content = content.__esModule ? content.default : content;\n\n            if (typeof content === 'string') {\n              content = [[module.i, content, '']];\n            }\n\nvar options = {};\n\noptions.insert = \"head\";\noptions.singleton = false;\n\nvar update = api(content, options);\n\n\n\nmodule.exports = content.locals || {};\n\n//# sourceURL=webpack:///./src/styles/searchResults.css?");

/***/ }),

/***/ "@emotion/core":
/*!********************************!*\
  !*** external "@emotion/core" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@emotion/core\");\n\n//# sourceURL=webpack:///external_%22@emotion/core%22?");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react\");\n\n//# sourceURL=webpack:///external_%22react%22?");

/***/ }),

/***/ "react-dom":
/*!****************************!*\
  !*** external "react-dom" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-dom\");\n\n//# sourceURL=webpack:///external_%22react-dom%22?");

/***/ }),

/***/ "react-helmet":
/*!*******************************!*\
  !*** external "react-helmet" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-helmet\");\n\n//# sourceURL=webpack:///external_%22react-helmet%22?");

/***/ }),

/***/ "react-router-dom":
/*!***********************************!*\
  !*** external "react-router-dom" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-router-dom\");\n\n//# sourceURL=webpack:///external_%22react-router-dom%22?");

/***/ }),

/***/ "react-spinners/BarLoader":
/*!*******************************************!*\
  !*** external "react-spinners/BarLoader" ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-spinners/BarLoader\");\n\n//# sourceURL=webpack:///external_%22react-spinners/BarLoader%22?");

/***/ })

/******/ });