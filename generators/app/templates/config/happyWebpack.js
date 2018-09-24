// happypack实现多线程打包
// 官网地址：https://www.npmjs.com/package/happypack
const happyPack = require('happypack');
const os = require("os");// <- 通过os获取CPU核数
const happyThreadPool  = happyPack.ThreadPool({
    size: os.cpus().length
});
// console.log("cpu核数:", happyThreadPool.size);

module.exports = [
    new happyPack({
        id: "happyJS",
        threadPool: happyThreadPool,
        verbose: true,// 是否显示详细信息
        loaders: [ 'babel-loader' ]
    }),
    new happyPack({
        id: 'happyStyles',
        threadPool: happyThreadPool,
        loaders: [ 'style-loader', 'css-loader', 'less-loader' ]
    }),
    new happyPack({
        id: 'happyCSS',
        threadPool: happyThreadPool,
        loaders: [
            { loader: 'css-loader', options: { importLoaders: 1 } },
            'postcss-loader'
        ]
    })
]