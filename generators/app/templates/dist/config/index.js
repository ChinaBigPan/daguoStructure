'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let normalConfig = {
  viewDir: _path2.default.join(__dirname, "../views"),
  staticDir: _path2.default.join(__dirname, "../assets")
};

/**
 * 根据场景采用设置
 */
const init = () => {
  if (process.env.NODE_ENV == "development") {
    const localConfig = {
      port: 8081
    };
    normalConfig = _lodash2.default.extend(normalConfig, localConfig);
  }

  if (process.env.NODE_ENV == "production") {
    const proConfig = {
      port: 90
    };
    normalConfig = _lodash2.default.extend(normalConfig, proConfig);
  }
  return normalConfig;
};

const result = init();
exports.default = result;