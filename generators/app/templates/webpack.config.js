// 获取所需的webpack的参数
const argv = require("yargs-parser")(process.argv.slice(2));
const merge = require("webpack-merge");
const { join } = require("path");
const mode = argv.mode || "development";
const _modeFlag = (mode == "production" ? true : false);
const  glob = require("glob");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const _mergeConfig = require(`./config/webpack.config.${mode}.js`);
const HappyWebpackPlugin = require("./config/happyWebpack");
// 自己写的webpack插件
const HTMLAfterWebpackPlugin = require("./config/htmlAfterWebpackPlugin");

let _entry = {}; // 空的入口文件
let _plugins = []; // 插件

const files = glob.sync("./src/client/views/**/*.entry.js");

const fileEntryReg = /.+\/([a-zA-Z]+-[a-zA-Z]+)(\.entry\.js$)/g
for (let item of files) {
    if (fileEntryReg.test(item)) {
        // 每个文件一个入口
        const entryKey = RegExp.$1;
        _entry[entryKey] = item;
        const [dist, template] = entryKey.split("-");
        // 向插件组当中插入htmlPlugin页面模版
        _plugins.push(new HTMLWebpackPlugin({
            filename: `../views/${dist}/pages/${template}.html`,
            template: `src/client/views/${dist}/pages/${template}.html`,
            inject: false, // <- 因为有了自己的htmlAfterWebpackPlugin所以不用默认插入
            chunks: ["runtime", "commons", entryKey],
            minify: {
                collapseWhitespace: _modeFlag,
                removeAttributeQuotes: _modeFlag
            }
          }));
    }
}

let webpackConfig = {
  // index-index.entry.js
	entry: _entry,
	output: {
			path: join(__dirname, "./dist/assets"),
			publicPath: "/",
			filename: "scripts/[name].bundle.js"
	},
	watch: !_modeFlag,
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				use: "happypack/loader?id=happyJS"
			},
			{
				test: /\.css/,
				exclude: /(node_modules)/,
				// happyPack提取要采用这种·方式
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: 'happypack/loader?id=happyCSS'
				})
			},
			{
				test: /\.less$/,
				exclude: /(node_modules)/,
				use: "happypack/loader?id=happyStyles"
			}
		]
	},
	plugins: [
		..._plugins,
		...HappyWebpackPlugin,
		// 自己的webpack插件
		new HTMLAfterWebpackPlugin()
	],
	resolve: {
		extensions: [".js", "css"]
	},
	// 优化
	optimization: {
		// 代码块分隔
		splitChunks: {
			chunks: "async",
			minChunks: 1,
			cacheGroups: {
				commons: {
					minChunks: 2,
					// minsize: 0,
					name: "commons"
				}
			}
		},
		// 提取公共的webpack代码块
		runtimeChunk: {
			name: "runtime"
		}
	}
};

// 自动合并Config
module.exports = merge(webpackConfig, _mergeConfig);









