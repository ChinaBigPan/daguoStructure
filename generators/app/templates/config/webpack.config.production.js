// 生产环境配置
// 拷贝html模版文件
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const minify = require('html-minifier').minify;

module.exports = {
    // 上线的output
    output: {
        filename: "scripts/[name].[hash:5].bundle.js"
    },
    plugins: [
        // 处理views的模版
        new CopyWebpackPlugin([
            {
                from: path.join(__dirname, "../src/client/views/common/layout.html"),
                to: "../views/common/layout.html"
            }
        ]),
        // 处理components的模版
        new CopyWebpackPlugin(
            [
                {
                    from: path.join(__dirname, "../src/client/components/"),
                    to: "../components",
                    transform(content) {
                        return minify(content.toString("utf-8"), {
                            collapseWhitespace: true
                        });
                    }
                }
            ],
            {
                ignore: ["*.js", "*.css", "*.ts", ".DS_Store"]
            }
        ),
        new ExtractTextPlugin({
            filename: 'styles/[name][hash:5].css',
            allChunks: true
        })
    ]
};




