"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * @fileoverview 实现Test数据模型
 * @author 大锅:gxp5189468@163.com
 */

/**
 * TestrService类 生成一段异步数据
 * @class
 */
let TestService = class TestService {
    /**
     * @constructor
     * @param {String} app Koa2上下文
     */
    constructor(app) {}

    /**
     * 获取具体数据的API接口
     * @returns {Promise} 返回异步数据
     * @example
     * return new Promise
     * getData()
     */
    getData() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve("Test异步数据");
            }, 1000);
        });
    }
};
exports.default = TestService;