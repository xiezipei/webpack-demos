# webpack-vue-template

> 示例：12-webpack-vue-template

## npm

```sh
npm init -y
```

## babel

安装依赖：

```sh
npm install --save-dev @babel/core @babel/preset-env babel-loader
```

新建文件：

```sh
touch .babelrc
```

编辑文件：

```json
{
    "presets": ["@babel/preset-env"]
}
```

## vue

安装依赖：

```sh
npm install --save-dev vue-loader vue-template-compiler vue-style-loader
```

## others

安装依赖：

```sh
npm install --save-dev css-loader file-loader html-loader node-sass postcss-cssnext postcss-plugin-px2rem postcss-pxtorem sass-loader style-loader url-loader clean-webpack-plugin html-webpack-plugin mini-css-extract-plugin
```

## webpack

安装依赖：

```sh
npm install --save-dev webpack webpack-cli webpack-dev-server
```

新建目录：

```sh 
mkdir src
```

新建文件：

```sh
touch webpack.config.js
```

编辑配置文件：

[webpack.config.js](./webpack.config.js)

> 配置失败。