const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const config = {
    entry: './src/index.js',
    output: {
        path: pathResolve('dist'),
        filename: 'bundle.[hash].js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/template/index.html'
        }),
        new MiniCSSExtractPlugin({
            filename: 'bundle.[hash].css',
            chunkFilename: '[id].[hash].css'
        })
    ],
    module: {
        rules: [{
            test: /\.scss$/,
            include: pathResolve('src'),
            use: [
                // 1、不抽离出来（打包进去index.js）
                // 'style-loader',

                // 2、抽离出来（独立一个css文件）
                MiniCSSExtractPlugin.loader, 

                // 3、根据环境判断
                // process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
                
                'css-loader',
                'sass-loader'
            ]
        }]
    }
}

function pathResolve(pathStr) {
    return path.resolve(__dirname, pathStr);
}

module.exports = config;