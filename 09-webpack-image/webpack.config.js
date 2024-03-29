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
            template: './src/assets/index.html'
        }),
        new MiniCSSExtractPlugin({
            filename: 'bundle.[hash].css',
            chunkFilename: '[id].[hash].css'
        })
    ],
    module: {
        rules: [
            {
                test: /\.scss$/,
                include: pathResolve('src'),
                use: [
                    MiniCSSExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {}
                    }
                ]
            }
        ]
    }
}

function pathResolve(pathStr) {
    return path.resolve(__dirname, pathStr);
}

module.exports = config;