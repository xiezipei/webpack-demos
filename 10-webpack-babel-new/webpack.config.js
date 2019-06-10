const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const config = {
    entry: './src/index.js',
    output: {
        path: pathResolve('dist'),
        filename: 'script.[hash].js'
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/assets/index.html'
        }),
        new MiniCSSExtractPlugin({
            filename: 'style.[hash].css',
            chunkFilename: '[id].[hash].css'
        })
    ],
    module: {
        rules: [
            // 解析 SCSS
            {
                test: /\.scss$/,
                include: pathResolve('src'),
                use: [
                    MiniCSSExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            // 解析图片
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {}
                    }
                ]
            },
            // 解析 ES6
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