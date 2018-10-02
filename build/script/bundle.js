(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Home =
/*#__PURE__*/
function () {
  function Home(pagename) {
    _classCallCheck(this, Home);

    this.pagename = pagename;
  }

  _createClass(Home, [{
    key: "printName",
    value: function printName() {
      console.log("This is ".concat(this.pagename));
      console.log('erdem');
    }
  }, {
    key: "init",
    value: function init() {
      this.printName();
    }
  }]);

  return Home;
}();

var home = new Home('homepage');
module.exports = home;

},{}],2:[function(require,module,exports){
"use strict";

window.addEventListener('load', function () {
  var pageName = document.querySelector('body').getAttribute('id');
  var modulesList = {
    home: require('./helper/home')
  };
  modulesList[pageName].init();
});

},{"./helper/home":1}]},{},[2]);

//# sourceMappingURL=bundle.js.map
