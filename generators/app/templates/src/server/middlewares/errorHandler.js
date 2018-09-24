// 容错
const errorHandler = {
    /**
     * 容错处理
     * @param {Function} app - koa2服务器
     * @param {Object} logger - 日志 
     */
    error(app, logger) {
        app.use(async (ctx, next) => {
            try {
                await next();
            } catch (error) {
                logger.error(error);
                // 服务器接口
                // 单独把log4js接入到集群服务器
                // 发送邮件、短信和电话
                ctx.status = error.status || 500;
                // 出错
                ctx.body = "请求出错，~~~~(>_<)~~~~"
            }
             
        })

        app.use(async (ctx, next) => {
            await next();
            if (404 != ctx.status) return;
            ctx.body = `<script 
                type="text/javascript" 
                src="//qzonestyle.gtimg.cn/qzone/hybrid/app/404/search_children.js" 
                charset="utf-8" 
                homePageUrl="/" 
                homePageName="回到我的主页"></script>`;
        })
    }
};

export default errorHandler;