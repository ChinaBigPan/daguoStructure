const path = require("path");
const chalk = require("chalk"); // 多颜色提示
const util = require("util");
const Generator = require("yeoman-generator");
const yosay = require("yosay") // yeoman弹出框

module.exports = class extends Generator {
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
                ));
            }
        });
    }

    writing() {
        const _path = this.appname;
        this.fs.copy(
            this.templatePath('config'),
            this.destinationPath(_path + '/config')
        );
        this.fs.copy(
            this.templatePath('src'),
            this.destinationPath(_path + '/src')
        );
        this.fs.copy(
            this.templatePath('test'),
            this.destinationPath(_path + '/test')
        );
        this.fs.copyTpl(
            this.templatePath('gulpfile.js'),
            this.destinationPath(_path + '/gulpfile.js')
        );
        this.fs.copyTpl(
            this.templatePath('.eslintrc.js'),
            this.destinationPath(_path + '/.eslintrc.js')
        );
        this.fs.copyTpl(
            this.templatePath('.babelrc.js'),
            this.destinationPath(_path + '/.babelrc.js')
        );
        this.fs.copyTpl(
            this.templatePath('postcss.config.js'),
            this.destinationPath(_path + '/postcss.config.js')            
        );
        this.fs.copyTpl(
            this.templatePath('Readme.md'),
            this.destinationPath(_path + '/Readme.md')
        );
        this.fs.copyTpl(
            this.templatePath('package.json'),
            this.destinationPath(_path + '/package.json'), {
                packagename: this.appname
            }
        );
        this.fs.copyTpl(
            this.templatePath('webpack.config.js'),
            this.destinationPath(_path + '/webpack.config.js')
        );
    }

    // copyFile(path, name, isDirectory) {
    //     if (isDirectory) {
    //         this.fs.copy(
    //             this.templatePath(name),
    //             this.destinationPath(`${path}/${name}`)
    //         )
    //     } else {
    //         this.fs.copyTpl(
    //             this.templatePath(name),
    //             this.destinationPath(`${path}/${name}`)
    //         )
    //     }
    // }

    end() {
        this.log(yosay(
            '大锅的架构创建完成，(*^__^*) '
        ))
    }
}
