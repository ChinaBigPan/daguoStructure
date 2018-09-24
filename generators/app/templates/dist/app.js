"use strict";

var _koa = require("koa");

var _koa2 = _interopRequireDefault(_koa);

var _config = require("./config");

var _config2 = _interopRequireDefault(_config);

var _koaSwig = require("koa-swig");

var _koaSwig2 = _interopRequireDefault(_koaSwig);

var _co = require("co");

var _co2 = _interopRequireDefault(_co);

var _koaStatic = require("koa-static");

var _koaStatic2 = _interopRequireDefault(_koaStatic);

var _errorHandler = require("./middlewares/errorHandler");

var _errorHandler2 = _interopRequireDefault(_errorHandler);

var _log4js = require("log4js");

var _log4js2 = _interopRequireDefault(_log4js);

var _awilix = require("awilix");

var _awilixKoa = require("awilix-koa");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 日志配置

// 依赖注入库 awilix

// import router from "koa-simple-router";
_log4js2.default.configure({
  appenders: { cheese: { type: "file", filename: __dirname + "/logs/cheese.log" } },
  categories: { default: { appenders: ["cheese"], level: "error" } }
}); // 服务端入口

const logger = _log4js2.default.getLogger("cheese");

const app = new _koa2.default();

// 创建控制反转（IOC）容器
// 每次请求都是new一次类
const container = (0, _awilix.createContainer)();
// 所有的service要自动注入controller
// controller把所有的service以面向切面的形式
// 插入到构造函数里，不影响真正的逻辑
// 每一次要保证外部的service重新创建一个new的实例
// 必须要保证一个IOC容器
app.use((0, _awilixKoa.scopePerRequest)(container));
// 装载service
container.loadModules([__dirname + "/service/*.js"], {
  formatName: "camelCase",
  resolverOptions: {
    lifetime: _awilix.Lifetime.SCOPED
  }
});

// koaSwig模版渲染设置
app.context.render = _co2.default.wrap((0, _koaSwig2.default)({
  root: _config2.default.viewDir,
  autoescape: true,
  cache: "memory", // disable, set to false
  ext: "html",
  varControls: ["<%", "%>"],
  writeBody: false
}));

// 处理静态资源
app.use((0, _koaStatic2.default)(_config2.default.staticDir));

// 在路由初始化之前先容错
_errorHandler2.default.error(app, logger);
// 自动注册所有路由
app.use((0, _awilixKoa.loadControllers)("controllers/*.js", { cwd: __dirname }));

app.listen(_config2.default.port, () => {
  console.log(`服务器开启成功，接口：${_config2.default.port}`);
});