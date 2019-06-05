const webpack = require('webpack');
const path = require('path');
const config = {
    // 入口
    entry: './src/index.js',
    // 输出
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    // 转换器
    module: {
        rules: [
            {
                test: /\.(.js)$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            }
        ]
    }
}
module.exports = config;