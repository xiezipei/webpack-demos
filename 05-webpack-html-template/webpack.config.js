const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = {
    entry: './src/index.js',
    output: {
        path: resolvePath('dist'),
        filename: '[hash].js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html', // 默认在dist目录下
            template: './src/template/index.html'
        })
    ]
};
function resolvePath(dist) {
    return path.resolve(__dirname, dist)
}
module.exports = config;