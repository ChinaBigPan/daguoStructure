const path = require("path");
const chalk = require("chalk"); // 多颜色提示
const util = require("util");
const Generator = require("yeoman-generator");
const yosay = require("yosay") // yeoman弹出框

class daguoStructure extends Generator {
    constructor(args, opts) {
        super(args, opts);
        this.appname = "daguoStructure"
    }
    info() {
        this.log(chalk.cyan(
            '开始构建大锅的架构，哼(ˉ(∞)ˉ)唧'
        ))
    }
    paths() {
        this.sourceRoot();
    }
    install() {
        // 自动安装依赖
        // this.installDependencies({
        //     skipInstall: this.options['skip-install']
        // })
    }
    prompting() {
        return this.prompt([
            {
                type: "input",
                name: "name",
                message: "请输入您的架构名称",
                default: this.appname
            },
            {
                type: "list",
                name: "proprocessor",
                message: "请选择CSS预处理器",
                choices: ["♠ PostCss", "♣ less", "♥ Sass", "♦ stylus"]
            }
        ]).then((answers) => {
            this.log('架构名称', answers.name);
            this.appname = answers.name;
            if (answers.preprocessor) {
                this.log(chalk.yellow(
                    '预处理已经被我强烈建议成less或PostCSS😳'
                ))
            }
        })
    }

    writing() {
        const _path = this.appname;
        // 需要拷贝的文件夹数组
        // 这里以后要用fs模块进行优化
        const fileArr = [
            {
                name: 'bin',
                isDirectory: true
            },{
                name: 'config',
                isDirectory: true
            },{
                name: 'docs',
                isDirectory: true
            },{
                name: 'docs',
                isDirectory: true
            },{
                name: 'src',
                isDirectory: true
            },{
                name: 'test',
                isDirectory: true
            },{
                name: '.eslintignore',
                isDirectory: false
            },{
                name: '.eslintignore',
                isDirectory: false
            },{
                name: '.gitignore',
                isDirectory: false
            },{
                name: 'gulpfile.js',
                isDirectory: false
            },{
                name: 'jsdocConf.js',
                isDirectory: false
            },{
                name: 'package.json',
                isDirectory: false
            },{
                name: 'postcss.config.js',
                isDirectory: false
            },{
                name: 'Readme.md',
                isDirectory: false
            },{
                name: 'structureDep.js',
                isDirectory: false
            },{
                name: 'webpack.config.js',
                isDirectory: false
            }
        ]
        fileArr.forEach((item) => {
            this.copyFile(_path, item.name, item.isDirectory);
        })
    }

    copyFile(path, name, isDirectory) {
        if (isDirectory) {
            this.fs.copy(
                this.templatePath(name),
                this.destinationPath(`${path}/${name}`)
            )
        } else {
            this.fs.copyTpl(
                this.templatePath(name),
                this.destinationPath(`${path}/${name}`)
            )
        }
    }

    end() {
        this.log(yosay(
            '大锅的架构创建完成，(*^__^*) '
        ))
    }
}


module.exports = daguoStructure
