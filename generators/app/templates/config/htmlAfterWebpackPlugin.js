// 自作的webpack插件
const PluginName = 'htmlAfterWebpackPlugin';
// 处理一下静态css 和 js标签格式
const assetsHelp = (data) => {
    let css = [], js = [];
    const dir = {
        js: item => `<script src="${item}"></script>`,
        css: item => `<link rel="stylesheet" href="${item}">`
    }
    for (let jsItem of data.js) {
        js.push(dir.js(jsItem));
    }

    for (let cssItem of data.css) {
        css.push(dir.css(cssItem));
    }

    return { css, js }
}

// 官网写的都不对，良心呢
// class htmlAfterWebpackPlugin {
//   apply(compiler) {
//     compiler.hooks.run.tap(pluginName, compilation => {
//       console.log("webpack 构建过程开始！");
//     });
//   }
// }


// Google查出来的
// https://github.com/storybooks/storybook/issues/3083
// 把css和js标签插入进swig模版，替换掉对应位置的注释
class htmlAfterWebpackPlugin {
    apply(compiler) {
        compiler.hooks.compilation.tap(PluginName, (compilation) => {
            compilation.hooks.htmlWebpackPluginAfterHtmlProcessing.tap(PluginName, (htmlPluginData) => {
                let _html = htmlPluginData.html;
                const assetsData = assetsHelp(htmlPluginData.assets);
                _html = _html.replace("<!--injectcss-->", assetsData.css.join(""));
                _html = _html.replace("<!--injectjs-->", assetsData.js.join(""));
                htmlPluginData.html = _html;
            })
        })
    }
}

module.exports = htmlAfterWebpackPlugin;