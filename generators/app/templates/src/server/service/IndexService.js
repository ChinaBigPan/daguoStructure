/**
 * @fileoverview 实现Index数据模型
 * @author 大锅:gxp5189468@163.com
 */

/**
 * IndexService类 生成一段异步数据
 * @class
 */
export default class IndexService {
  /**
   * @constructor
   * @param {String} app Koa2上下文
   */
  constructor(app) {

  }

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
            resolve("首页异步数据")
        }, 1000);
    })    
  }
}

