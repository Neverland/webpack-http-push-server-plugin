(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('fs'), require('path'), require('util'), require('chokidar'), require('request')) :
  typeof define === 'function' && define.amd ? define(['fs', 'path', 'util', 'chokidar', 'request'], factory) :
  (global['webpack-http-push-server-plugin'] = factory(null,null,null,global.chokidar,null));
}(this, (function (FS,PATH,UTIL,chokidar,request) { 'use strict';

  FS = FS && FS.hasOwnProperty('default') ? FS['default'] : FS;
  PATH = PATH && PATH.hasOwnProperty('default') ? PATH['default'] : PATH;
  UTIL = UTIL && UTIL.hasOwnProperty('default') ? UTIL['default'] : UTIL;
  chokidar = chokidar && chokidar.hasOwnProperty('default') ? chokidar['default'] : chokidar;
  request = request && request.hasOwnProperty('default') ? request['default'] : request;

  function __async(g){return new Promise(function(s,j){function c(a,x){try{var r=g[x?"throw":"next"](a);}catch(e){j(e);return}r.done?s(r.value):Promise.resolve(r.value).then(c,d);}function d(e){c(e,1);}c();})}

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

  var HttpPushServerPlugin = function () {
      function HttpPushServerPlugin() {
          var option = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
          classCallCheck(this, HttpPushServerPlugin);

          var defaultOption = {
              to: '',
              dir: ''
          };

          this.option = Object.assign({}, defaultOption, option);

          this.rootDir = PATH.join(process.cwd(), option.dir);

          if (!FS.existsSync(this.rootDir)) {
              throw new Error('[fatal] The target `dir` is not exists!');
          }

          this.watcher = null;

          this.createWatcher();
      }

      createClass(HttpPushServerPlugin, [{
          key: 'createWatcher',
          value: function createWatcher() {
              this.watcher = chokidar.watch(this.option.dir, {
                  persistent: true,
                  ignored: /(^|[\/\\])\../,
                  ignoreInitial: false,
                  followSymlinks: true,
                  cwd: '.',
                  disableGlobbing: false,

                  usePolling: true,
                  interval: 100,
                  binaryInterval: 300,
                  alwaysStat: false,
                  depth: 99,
                  awaitWriteFinish: {
                      stabilityThreshold: 2000,
                      pollInterval: 100
                  },

                  ignorePermissionErrors: false,
                  atomic: true // or a custom 'atomicity delay', in milliseconds (default 100)
              });
          }
      }, {
          key: 'apply',
          value: function apply(compiler) {
              var _this = this;

              this.watcher.on('change', function (path) {
                  return _this.handler(path);
              });
          }
      }, {
          key: 'handler',
          value: function handler(path) {return __async(function*(){
              var filePath = PATH.join(this.rootDir, path);
              var readFile = UTIL.promisify(FS.readFile);
              var payload = {};

              try {
                  var content = yield readFile(filePath, { encoding: 'utf8' });

                  payload = {
                      content: content,
                      path: path,
                      resovlePath: PATH.join(this.option.to, path)
                  };
              } catch (e) {
                  this.notifyError(e);
              }

              this.pushServer(payload);
          }.call(this))}
      }, {
          key: 'pushServer',
          value: function pushServer(payload) {
              var _this2 = this;

              request.post({
                  body: payload,
                  url: this.option.receiver,
                  json: true,
                  timeout: 1500,
                  headers: {
                      'Content-Type': 'application/json'
                  }
              }, function (error, response, body) {
                  if (error) {
                      return _this2.notifyError(error);
                  }

                  console.log('[' + body + '] - [%s] Push file %s', new Date().toLocaleString(), payload.path);
              });
          }
      }, {
          key: 'notifyError',
          value: function notifyError(e) {
              throw new Error(e);
          }
      }]);
      return HttpPushServerPlugin;
  }();

  return HttpPushServerPlugin;

})));
