# ogg-webpack

## 0. 开胃小菜

1. [What does webpack do?](./doc/what-does-webpack-do.md)
2. [Your first webpack project](./doc/your-first-webpack-project.md)
3. [Your first webpack.config.js file and babel](./doc/your-first-webpack-config-js-and-babel.md)
4. [Create a React app with webpack](./doc/how-to-create-a-react-app-with-webpack.md)
5. [Make webpack transpile styles](./doc/how-to-make-webpack-transpile-styles.md)

> 来源：[https://blog.jakoblind.no/babel-webpack-es6/](https://blog.jakoblind.no/babel-webpack-es6/)

## 1. 无配置文件 `hello world`

1、安装依赖

```shell
npm init -y
npm install --save-dev webpack webpack-cli
```

2、新建 `index.js`

```shell
mkdir src
touch index.js
```

3、修改 `package.json`

```json
"script": {
    "start": "webpack --mode development"
}
```

4、执行命令

```shell
npm start
```

> 示例：01-no-config

## 2. 简单的配置文件

1、新建配置文件 `webpack.config.js`：

```js
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
            // all your loaders will be here.
            // loaders enables you to use all kinds of file types.
        ]
    }
}
module.exports = config;
```

2、修改 `package.json`

```json
"scripts": {
    "dev": "webpack --mode development",
    "prod": "webpack --mode production"
}
```

3、执行命令

```shell
# 以开发模式执行
npm run dev

# 以生产模式执行
npm run prod
```

> 示例：02-simple-config

## 3. Webpack with Babel

1、安装 Babel 依赖：

```shell
npm install --save-dev babel-loader @babel/core @babel/preset-env
```

2、新建 `.babelrc` 文件：

```json
{
    "preset": ["@babel/preset-env"]
}
```

3、在 `webpack.config.js` 添加 `loaders`：

```js
module: {
    rules: [
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
    ]
}
```

4、修改 `src/index.js`：

```js
const hello = () => {
    console.log("hello world!");
}
hello();
```

> 示例：03-webpack-babel