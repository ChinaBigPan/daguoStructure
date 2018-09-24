// 开发环境配置
// 拷贝html模版文件
const CopyWebpackPlugin = require('copy-webpack-plugin');
const LiveReloadPlugin = require("webpack-livereload-plugin");
const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  plugins: [
    // 自动重启  // 多页
    new LiveReloadPlugin({}),
    // 单页
    // new webpack.HotModuleReplacementPlugin({
    //     // Options...
    // })
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
          to: "../components"
        }
      ],
      {
        copyUnmodified: true,
        ignore: ["*.js", "*.css", "*.ts", ".DS_Store"]
      }
    ),
    new ExtractTextPlugin({
      filename: (getPath) => {
        return getPath("styles/[name].css")
      },
      allChunks: true
    })
  ]
};




