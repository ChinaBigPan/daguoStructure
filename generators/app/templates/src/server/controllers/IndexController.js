import { route, GET } from "awilix-koa";

export default
@route("/")
@route("/index.html")
// 首页路由
class IndexController {
    constructor({indexService}) {
        this.indexService = indexService;
    }

    // 子路由
    // @route("/test/:id")
    @GET()
    async indexAction (ctx) {
        // ctx.query => ajax
        // ctx.params.id => /test/:id
        const result = await this.indexService.getData();
        ctx.body = await ctx.render("index/pages/index", { data: result });
    }
}
