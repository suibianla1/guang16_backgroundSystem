var path = require('path') //因为有些配置必须是绝对路径。导入改模块进行处理
var HtmlWebpackPlugin = require('html-webpack-plugin') // webpack中所有的插件都需要导入后，进行使用

module.exports = {
    // 入口文件配置
    entry: './src/main.js',

    // 输出文件配置
    output: {
        // 输出的路径，webpack2起就规定必须是绝对路径
        path: path.join(__dirname, 'dist'),
        // 静态资源在服务器上运行时的访问路径，可以直接http://localhost:8080/dist/bundle.js访问到服务器中的bundle.js文件
        // publicPath: '/dist',
        // 输出文件名字
        filename: 'bundle.js'
    },
    module: {
        rules: [
            // 配置的是用来解析.css文件的loader(style-loader和css-loader)
            {
                // 1.0 用正则匹配当前访问的文件的后缀名是  .css
                test: /\.css$/,
                use: ['style-loader', 'css-loader'] //webpack底层调用这些包的顺序是从右到左
            },
            {
                //正则匹配当前访问的文件后缀名是 .less 解析less
                test: /\.less$/,
                use: [{
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader'
                }, {
                    loader: 'less-loader'
                }]
            },
            {
                //解析scss文件
                test: /\.scss$/,
                use: [{
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader'
                }, {
                    loader: 'sass-loader'
                }]
            },

            //解析字体图片用的，以后可能需要修改配置，以支持 更多的文件类型
            {
                test: /\.(png|jpg|gif|eot|svg|ttf|woff)/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        // limit参数表示，如果图片大于50000b的时候，就是路径形式，如果小于50000b，就把图片变成base64格式
                        limit: 50000  
                    }
                }]
            },

            //解析Es6新语法
            {
                test: /\.js$/,
                // Webpack2建议尽量避免exclude，更倾向于使用include
                // exclude: /(node_modules)/, // node_modules下面的.js文件会被排除
                include: [path.resolve(__dirname, 'src')],
                use: {
                    loader: 'babel-loader'
                    // options里面的东西可以放到.babelrc文件中去
                    // options: {
                    //     presets: ["env"]
                    // }
                }
            },

            //解析vue.webpack
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'template.html',
            filename: 'index.html',
            title: '测试'
        })
    ],
    // webpack-dev-server工具配置
    // devServer: {
    //     contentBase: 'dist',
    //     port: 7777,
    //     open: true,
    //     inline: true,
    //     progress: true,
    // }
}