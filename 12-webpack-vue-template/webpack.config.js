const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const config = {
    // 入口
    entry: './src/main.js',

    // 输出
    output: {
        path: pathResolve('dist'),
        filename: 'script.[hash].js'
    },

    // 插件
    plugins: [
        // 清理目录
        new CleanWebpackPlugin(),
        new VueLoaderPlugin(),
        // 使用html模板
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/assets/index.html'
        }),
        // 分离css文件
        new MiniCSSExtractPlugin({
            filename: 'style.[hash].css',
            chunkFilename: '[id].[hash].css'
        }),
    ],

    // 模块
    module: {
        rules: [
            // vue
            {
                test: /\.vue$/,
                loader: 'vue-loader'  
            },
            // html
            {
                test: /\.html$/,
                use: {
                    loader: 'html-loader'
                }
            },
            // css
            {
                test: /\.scss$/,
                include: pathResolve('src'),
                use: [
                    MiniCSSExtractPlugin.loader,
                    'vue-style-loader',
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            },
            // images
            // file-loader 解决css等文件中引入图片路径的问题
            // url-loader 当图片较小时会把图片base64编码
            // 大于limit参数时会私用file-loader进行拷贝
            {
                test: /\.(png|jpg|jpeg|gif|svg)/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            outputPath: 'images/',  // 图片输出路径
                            limit: 10 * 1024
                        }
                    }
                ]
            },
            // js
            {
                test: /\.jsx?/,
                include: [
                    pathResolve('src')
                ],
                loader: 'babel-loader'
            }
        ]
    }
}

// 解析路径
function pathResolve(pathStr) {
    return path.resolve(__dirname, pathStr);
}

module.exports = config;