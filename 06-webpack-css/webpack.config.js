const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
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
        })
    ],
    module: {
        rules: [
            {
                test: /\.css/,
                include: [
                    pathResolve('src'), // CSS源文件路径
                ],
                use: [
                    'style-loader',
                    'css-loader',
                ]
            }
        ]
    }
}

function pathResolve(distPath) {
    return path.resolve(__dirname, distPath)
}

module.exports = config;