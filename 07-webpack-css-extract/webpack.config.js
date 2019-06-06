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
        new HtmlWebpackPlugin({     // 自定义html文件
            filename: 'index.html',
            template: './src/assets/index.html'
        }),
        new MiniCSSExtractPlugin({  // 分离css文件
            filename: 'bundle.[hash].css',  // 生成后的文件名
            chunkFilename: '[id].[hash].css'
        })
    ],
    module: {
        rules: [
            {
                test: /\.css/,
                include: [
                    pathResolve('src')
                ],
                use: [
                    {
                        loader: MiniCSSExtractPlugin.loader,
                        options: {
                            publicPath: pathResolve('dist')
                        }
                    },
                    'css-loader'
                ]
            }
        ]
    }
};

function pathResolve(pathStr) {
    return path.resolve(__dirname, pathStr);
}

module.exports = config;