"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _dec, _dec2, _dec3, _class, _desc, _value, _class2;

var _awilixKoa = require("awilix-koa");

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
        desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
        desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
        return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
        desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
        desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
        Object['define' + 'Property'](target, property, desc);
        desc = null;
    }

    return desc;
}

exports.default = (
// 首页路由
_dec = (0, _awilixKoa.route)("/test"), _dec2 = (0, _awilixKoa.route)("/test.html"), _dec3 = (0, _awilixKoa.GET)(), _dec(_class = _dec2(_class = (_class2 = class TestController {
    constructor({ testService }) {
        this.testService = testService;
    }

    // 子路由
    // @route("/test/:id")

    async testAction(ctx) {
        // ctx.query => ajax
        // ctx.params.id => /test/:id
        const result = await this.testService.getData();
        ctx.body = await ctx.render("index/pages/test", { data: result });
    }
}, (_applyDecoratedDescriptor(_class2.prototype, "testAction", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "testAction"), _class2.prototype)), _class2)) || _class) || _class);