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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dom_node_collection_js__ = __webpack_require__(1);


const $m = selector => {
  if(typeof selector === 'string'){
    const nodeList = document.querySelectorAll(selector);
    return new __WEBPACK_IMPORTED_MODULE_0__dom_node_collection_js__["a" /* default */](Array.from(nodeList));
  } else if (selector instanceof HTMLElement){
    return new __WEBPACK_IMPORTED_MODULE_0__dom_node_collection_js__["a" /* default */]([selector]);
  } else if (typeof selector === 'function'){
    document.addEventListener('DOMContentLoaded', selector);
    return new __WEBPACK_IMPORTED_MODULE_0__dom_node_collection_js__["a" /* default */](document);
  }
};

window.$m = $m;

$m.ajaxCore = function(){
  return {
    type: 'GET',
    url: window.location.href,
    data: {},
    success(data){
      return data;
    },
    fail(data){
      return data;
    }
  };
};

$m.extend = function(...JSObjects){
  const extendObj = {};
  JSObjects.forEach( object => {
    for(let key in object){
      extendObj[key] = object[key];
    }
  });
  return extendObj;
};

$m.ajax = function(options){
  return new Promise((resolve, reject) => {
    const ajaxParams = $m.extend($m.ajaxCore(), options);
    const xhr = new XMLHttpRequest();

    xhr.open(ajaxParams.type, ajaxParams.url);
    xhr.onload = function(){
      if(xhr.status === 200){
        return resolve(JSON.parse(xhr.response));
      } else {
        return reject(JSON.parse(xhr.response));
      }
    };
    xhr.send(ajaxParams.data);
  });
};


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class DOMNodeCollection {
  constructor(nodeListArray){
    this.nodeListArray = nodeListArray;
  }

  _eachElement(callback){
    this.nodeListArray.forEach( (el) => {
      callback(el);
    });
  }

  html(parameter){
    if(typeof parameter === 'string' || typeof parameter === 'number' ){
      this._eachElement(el => { el.innerHTML = parameter ;});
      return this;
    } else {
      return this.nodeListArray[0].innerHTML;
    }
  }

  val(parameter){
    if(typeof parameter === 'string'){
      this.nodeListArray[0].value = parameter;
    }
    return this.nodeListArray[0].value;
  }

  empty(){
    return this.html('');
  }

  append(elementToAppend){
    if(elementToAppend instanceof DOMNodeCollection){
      let outerHTMLList = '';
      elementToAppend.forEach(htmlEl => {
        outerHTMLList += htmlEl.outerHTML;
      });
      this._eachElement(el => {el.innerHTML += outerHTMLList;});
      elementToAppend.remove();
    } else if (typeof elementToAppend === 'string'){
      this._eachElement(el => {el.innerHTML += elementToAppend;});
    } else {
      this._eachElement(el => {el.innerHTML += elementToAppend.outerHTML;});
    }
    return this;
  }

  attr(attrName, attrValue){
    if(attrValue === undefined){
      return this.nodeListArray[0].getAttribute(attrName);
    } else {
      return this.nodeListArray[0].setAttribute(attrName, attrValue);
    }
  }

  addClass(className){
    this._eachElement( el => {
      el.classList.add(className);
    });
    return this;
  }

  removeClass(className){
    this._eachElement( el => {
      el.classList.remove(className);
    });
    return this;
  }

  children(){
    let childArray = [];
    this._eachElement( parentNode => {
      Array.from(parentNode.children).forEach(child => {
        if(!childArray.includes(child)){
          childArray.push(child);
        }
      });
    });
    return new DOMNodeCollection(childArray);
  }

  parent(){
    let parentArray = [];
    this._eachElement(childNode => {
      if(!parentArray.includes(childNode.parentNode)){
        parentArray.push(childNode.parentNode);
      }
    });
    return new DOMNodeCollection(parentArray);
  }

  find(selector){
    let findArray = [];
    this._eachElement( el => {
      Array.from(el.querySelectorAll(selector)).forEach(
        queryEl => {
        if(!findArray.includes(queryEl)){
          findArray.push(queryEl);
        }});
    });
    return new DOMNodeCollection(findArray);
  }

  remove(){
    this._eachElement(el => {el.remove();});
    return this;
  }

  on(eventType, callback){
    this._eachElement(el => {
      el.addEventListener(eventType, callback);
      el[eventType] = callback;
    });
    return this;
  }

  off(eventType){
    this._eachElement(el => {
      el.removeEventListener(eventType, el[eventType]);
    });
    return this;
  }

}


/* harmony default export */ __webpack_exports__["a"] = (DOMNodeCollection);


/***/ })
/******/ ]);