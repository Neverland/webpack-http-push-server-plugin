(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('fs')) :
  typeof define === 'function' && define.amd ? define(['fs'], factory) :
  (factory(null));
}(this, (function (fs) { 'use strict';

  fs = fs && fs.hasOwnProperty('default') ? fs['default'] : fs;

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  /**
   * @file index
   * @author ienix(enix@foxmail.com)
   * 
   * @since 2018-7-9
   */

  var HttpPushServerPlugin = function () {
      function HttpPushServerPlugin() {
          var option = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
          classCallCheck(this, HttpPushServerPlugin);

          var defaultOption = {
              to: '',
              dir: '',
              token: ''
          };

          option = Object.assign({}, defaultOption, option);

          this.init();
      }

      createClass(HttpPushServerPlugin, [{
          key: 'init',
          value: function init() {}
      }]);
      return HttpPushServerPlugin;
  }();

})));
