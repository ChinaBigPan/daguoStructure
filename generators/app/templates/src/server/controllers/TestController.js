import { route, GET } from "awilix-koa";

export default
@route("/test")
@route("/test.html")
// 首页路由
class TestController {
    constructor({ testService }) {
        this.testService = testService;
    }

    // 子路由
    // @route("/test/:id")
    @GET()
    async testAction(ctx) {
        // ctx.query => ajax
        // ctx.params.id => /test/:id
        const result = await this.testService.getData();
        ctx.body = await ctx.render("index/pages/test", { data: result });
    }
}
