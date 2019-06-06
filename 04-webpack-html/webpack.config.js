const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const config = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        // filename: 'bundle.js',
        filename: '[hash].js',
    },
    plugins: [
        new HtmlWebpackPlugin(),
    ]
}
module.exports = config