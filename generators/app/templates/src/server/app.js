// 服务端入口
import Koa from "koa";
// import router from "koa-simple-router";
import config from "./config";
import koaSwig from "koa-swig";
import co from "co";
import koaStatic from "koa-static";
import errorHandler from './middlewares/errorHandler';
import log4js from 'log4js';
// 依赖注入库 awilix
import { asClass, asValue, createContainer, Lifetime }  from 'awilix';
import { scopePerRequest, loadControllers } from 'awilix-koa';


// 日志配置
log4js.configure({
  appenders: { cheese: { type: "file", filename: __dirname + "/logs/cheese.log" } },
  categories: { default: { appenders: ["cheese"], level: "error" } }
});
const logger = log4js.getLogger("cheese");

const app = new Koa();

// 创建控制反转（IOC）容器
// 每次请求都是new一次类
const container = createContainer();
// 所有的service要自动注入controller
// controller把所有的service以面向切面的形式
// 插入到构造函数里，不影响真正的逻辑
// 每一次要保证外部的service重新创建一个new的实例
// 必须要保证一个IOC容器
app.use(scopePerRequest(container));
// 装载service
container.loadModules([__dirname + "/service/*.js"], {
  formatName: "camelCase",
  resolverOptions: {
    lifetime: Lifetime.SCOPED
  }
});

// koaSwig模版渲染设置
app.context.render = co.wrap(koaSwig({
  root: config.viewDir,
  autoescape: true,
  cache: "memory", // disable, set to false
  ext: "html",
  varControls: ["<%", "%>"],
  writeBody: false
}));

// 处理静态资源
app.use(koaStatic(config.staticDir));

// 在路由初始化之前先容错
errorHandler.error(app, logger);
// 自动注册所有路由
app.use(loadControllers("controllers/*.js", { cwd: __dirname }));



app.listen(config.port, () => {
  console.log(`服务器开启成功，接口：${config.port}`);
});
