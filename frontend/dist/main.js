/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _router_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./router.js */ \"./src/router.js\");\n\r\n\r\nclass App{\r\n    constructor(){\r\n        this.router = new _router_js__WEBPACK_IMPORTED_MODULE_0__.Router()\r\n    //     window.addEventListener('DOMContentLoaded',()=>{\r\n    //         this.router.openRoute()\r\n    //     })\r\n    //     window.addEventListener('popstate',()=>{\r\n    //         this.router.openRoute()\r\n    //     })\r\n\r\n    window.addEventListener('DOMContentLoaded',this.handleRouteChanging.bind(this))\r\n    window.addEventListener('popstate',this.handleRouteChanging.bind(this))\r\n    }\r\n\r\n    handleRouteChanging(){\r\n        this.router.openRoute()\r\n    }\r\n}\r\n(new App())\n\n//# sourceURL=webpack://frontend/./src/app.js?");

/***/ }),

/***/ "./src/router.js":
/*!***********************!*\
  !*** ./src/router.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Router: () => (/* binding */ Router)\n/* harmony export */ });\n// import {Form} from './components/form.js'\r\n// import {Choice} from './components/choice.js'\r\n// import {Test} from './components/test.js'\r\n// import {Result} from './components/result.js'\r\n// import {GetResult} from './components/get-result.js'\r\n// import {Auth} from \"./services/auth.js\"\r\nclass Router{\r\n    constructor(){\r\n        this.boxElement=document.getElementById('box')\r\n        this.stylesElement=document.getElementById('styles')\r\n        this.titleElement=document.getElementById('page-title')\r\n        // this.profileElement=document.getElementById('profile')\r\n        // this.profileFullNameElement=document.getElementById('profile-full-name')\r\n\r\n        this.routes=[\r\n             {\r\n                route: '#/',\r\n                title:'Вход',\r\n                template:'template/login.html',\r\n                styles:'styles/form.css',\r\n                load:()=>{\r\n                    // new Form('form-use')\r\n                }\r\n             },\r\n             {\r\n                route: '#/category-use',\r\n                title:'category-use',\r\n                template:'template/category-use.html',\r\n                styles:'',\r\n                load:()=>{\r\n                    \r\n                }\r\n             },\r\n             {\r\n                route: '#/creation',\r\n                title:'creation',\r\n                template:'template/creation.html',\r\n                styles:'',\r\n                load:()=>{\r\n                   \r\n                }\r\n             },\r\n             {\r\n                route: '#/ernings-comsumption',\r\n                title:'ernings-comsumption',\r\n                template:'template/ernings-comsumption.html',\r\n                styles:'styles/ernings-comsumption.css',\r\n                load:()=>{\r\n                   \r\n                }\r\n             },\r\n             {\r\n                route: '#/main-ernings-comsumption',\r\n                title:'main-ernings-comsumption',\r\n                template:'template/main-ernings-comsumption.html',\r\n                styles:'styles/main-ernings-comsumption.css',\r\n                load:()=>{\r\n               \r\n                }\r\n             }\r\n        ]\r\n    }\r\n    async openRoute(){\r\n        const urlRoute = window.location.hash.split('?')[0]\r\n\r\n        // if(urlRoute==='#/logout'){\r\n        //     await Auth.logout()\r\n        //     window.location.href='#/'\r\n        //     return\r\n        // }\r\n\r\n        const newRoute = this.routes.find(item=>{\r\n            return item.route === urlRoute\r\n        })\r\n        \r\n        if(!newRoute){\r\n            window.location.href='#/'\r\n            return\r\n        }\r\n        this.boxElement.innerHTML = await fetch(newRoute.template).then(response=>response.text())\r\n        this.stylesElement.setAttribute('href',newRoute.styles)\r\n        this.titleElement.innerText = newRoute.title\r\n\r\n        // const userInfo = Auth.getUserInfo()\r\n        // const accessToken = localStorage.getItem(Auth.accessTokenKey)\r\n\r\n        // if(userInfo&&accessToken){\r\n        //     this.profileElement.style.display='flex'\r\n        //     this.profileFullNameElement.innerText=userInfo.fullName\r\n        // }else{\r\n        //     this.profileElement.style.display='none'\r\n        // }\r\n\r\n        newRoute.load()\r\n    }\r\n}\n\n//# sourceURL=webpack://frontend/./src/router.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/app.js");
/******/ 	
/******/ })()
;