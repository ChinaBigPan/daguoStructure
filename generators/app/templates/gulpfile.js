// 服务端用Gulp配置文件
const gulp = require("gulp");
const babel = require("gulp-babel");
const watch = require("gulp-watch");
const rollup = require("gulp-rollup");
const replace = require("rollup-plugin-replace");
const gulpSequence = require("gulp-sequence");
const gulpEslint = require("gulp-eslint");
// 构建服务器
// 开发阶段
gulp.task("builddev", () => {
  return watch("./src/server/**/*.js", { 
	  ignoreInitial: false
	}, () => {
		gulp
      .src("./src/server/**/*.js")
      .pipe(babel({ // presets: ["@babel/env"],
		  plugins: ["transform-es2015-modules-commonjs", "transform-decorators-legacy"], 
		  babelrc: false })) // <- 关闭外侧的babel
      .pipe(gulp.dest("dist"));
	});
});

// 上线编译
gulp.task("buildprod", () => {
	gulp.src("./src/server/**/*.js")
		.pipe(babel({
			// presets: ["@babel/env"],
			plugins: ["transform-es2015-modules-commonjs", "transform-decorators-legacy"],
			ignore: ["./src/server/config/*.js"],
			babelrc: false // <- 关闭外侧的babel
		}))
		.pipe(gulp.dest("dist"));
});

// 流清洗 洗配置
gulp.task('configclean', function () {
	gulp.src("./src/server/**/*.js")
    // 转换文件
		.pipe(rollup({ // rollup的配置
			output: {
				format: "cjs"
			},
			input: "./src/server/config/index.js",
			plugins: [
				replace({
					"process.env.NODE_ENV": JSON.stringify('production')
				})
			]
		}))
    .pipe(gulp.dest("./dist"));
});

// 代码检查
gulp.task("lint", () => {
  gulp.src("./src/server/**/*.js")
    .pipe(gulpEslint())
    .pipe(gulpEslint.format())
    .pipe(gulpEslint.failAfterError());
});


// 任务集合
let _task = ["builddev"];

// 生产环境 gulpSequence 变成队列
if (process.env.NODE_ENV == "production") {
	_task = gulpSequence("lint","buildprod", "configclean");
}

// 代码检查配置
if (process.env.NODE_ENV == "lint") {
  _task = ["lint"];
}

gulp.task("default", _task);
