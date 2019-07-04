const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const config = {
    entry: './src/index.js',
    output: {
        path: pathResolve('dist'),
        filename: 'script.[hash].js'
    },
    plugins: [
        // 清理目录
        new CleanWebpackPlugin(),
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
    module: {
        rules: [
            // 解决html图片引用
            {
                test: /\.html$/,
                use: {
                    loader: 'html-loader'
                }
            },
            // 解析scss文件
            {
                test: /\.scss$/,
                include: pathResolve('src'),
                use: [
                    MiniCSSExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            },
            // css图片引用
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
            // 解析es6
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

function pathResolve(pathStr) {
    return path.resolve(__dirname, pathStr);
}

module.exports = config;