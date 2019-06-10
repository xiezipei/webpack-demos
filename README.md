# ogg-webpack

```
webpack -v => 4.30.0
webpack-cli -v => 3.3.0
```
## 目录

1. [开胃小菜](#开胃小菜)
2. [无配置文件](#无配置文件)
3. [简单的配置文件](#简单的配置文件)
4. [webpack with babel](#webpack-with-babel)
5. [入口](#入口)
6. [Loader](#loader)
7. [Plugin](#plugin)
8. [输出](#输出)
9. [搭建基本的前端开发环境](#搭建基本的前端开发环境)
10. [关联 HTML](#关联-HTML)
11. [构建 CSS](#构建-CSS)
12. [抽离 CSS](#抽离-CSS)
13. [CSS 预处理器](#CSS-预处理器)
14. [图片处理](#图片处理)
15. [使用 Babel](#使用-Babel)
16. [清理目录与启用静态服务器](#清理目录与启用静态服务器)
17. [参考](#参考)

## 开胃小菜

1. [What does webpack do?](./doc/what-does-webpack-do.md)
2. [Your first webpack project](./doc/your-first-webpack-project.md)
3. [Your first webpack.config.js file and babel](./doc/your-first-webpack-config-js-and-babel.md)
4. [Create a React app with webpack](./doc/how-to-create-a-react-app-with-webpack.md)
5. [Make webpack transpile styles](./doc/how-to-make-webpack-transpile-styles.md)

> 来源：[https://blog.jakoblind.no/babel-webpack-es6/](https://blog.jakoblind.no/babel-webpack-es6/)

## 无配置文件

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

```js
// index.js
console.log("hello world!");
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

> Result：生成 `dist` 目录，里面存放 webpack构建好的 `main.js` 文件。

> 示例：[01-no-config](./01-no-config/)

## 简单的配置文件

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

> 示例：[02-simple-config](./02-simple-config/)

## Webpack with Babel

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

> 示例：[03-webpack-babel](./03-webpack-babel/)

## 入口

多个代码模块汇总会有一个起始的 `.js` 文件，这个就是 Webpack 构建入口。Webpack 会读取这个文件，并从它开始解析依赖，然后进行打包。默认入口文件为 `./src/index.js`。如果是单页面应用，那么可能入口只有一个；如果是多个页面的项目，那么经常是一个页面对应一个构建入口。

```js
module.exports = {
    entry: './src/index.js'
}

// 上述配置等同于
module.exports = {
    entry: {
        main: './src/index.js'
    }
}

// 配置多个入口
module.exports = {
    entry: {
        foo: './src/page-foo.js',
        bar: './src/page-bar.js',
        // ...
    }
}

// 使用数组对多个文件进行打包
module.exports = {
    entry: {
        main: [
            './src/foo.js',
            './src/bar.js'
        ]
    }
}
```

## loader

Webpack 中提供一种处理多文件格式的机制——`loader`。可以把 `loader` 理解为一个转换器，负责把某种文件格式的内容转化成 Webpack 可以支持打包的模块。`loader` 是 Webpack 中比较复杂的的一块内容，它支撑 Webpack 来处理文件的多样性。

```js
module: {
    // ...
    rules: [
        {
            test: /\.jsx?/, // 匹配文件路径的正则表达式，通常匹配文件类型后缀
            include: [
                path.resolve(__dirname, 'src')  // 指定路径下的文件
            ],
            use: 'babel-loader',    // 指定使用的 loader
        }
    ]
}
```

## plugin

Webpack 构建流程中：模块代码转换的工作由 `loader` 来处理，除此之外的其他任何工作都可以交由 `plugin` 来完成。`plugin` 理论上可以干涉 Webpack 整个构建流程，可以在流程的每一个步骤中定制自己的构建需求。

```js
// 如果使用 `--mode production`，Webpack 默认会压缩 JS 代码而不必使用下面插件
const UglifyPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    plugins: [
        new UglifyPlugin()  // 压缩JS代码
    ]
}
```

## 输出

Webpack 的输出指最终构建出来的静态文件，使用 `output` 字段配置（可以配置文件名、路径等）。

```js
module.exports = {
    // ...
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
}

// 多个入口生成不同的文件
module.exports = {
    entry: {
        foo: './src/foo.js',
        bar: './src/bar.js',
    },
    output: {
        filename: '[name].js',
        path: __dirname + '/dist',
    },
}

// 路径中使用 hash，每次构建时会有一个不同 hash 值，避免发布新版本时会使用浏览器缓存
module.exports = {
    // ...
    output: {
        filename: '[name].js',
        path: __dirname + '/dist/[hash]',
    },
}
```

## 搭建基本的前端开发环境

基本的前端开发环境需求：

* 构建需要的 HTML、CSS、JS 文件
* 使用 CSS 预处理器来编写样式
* 处理和压缩图片
* 使用 Babel 来支持 ES 新特性
* 本地提供静态服务以方便开发调试

## 关联 HTML

Webpack 的默认入口是从一个 `.js` 开始，而一个前端项目使从一个 `.html` 开始。为了让 Webpack 关联 HTML，一般是创建一个 `.html` 文件，然后用 `script` 标签直接引用：

```html
<script src="./dist/bundle.js"></script>
```

那么问题来了，如果构建生成的 `.js` 文件名发生变化呢（例如使用了 `[hash]` 来进行命令）？所以，最好方法是将 HTML 引用路径和我们构建结果关联起来——具体实现就是通过使用 `html-webpack-plugin`：

```shell
npm install --save-dev html-webpack-plugin
```

将该 plugin 加入 plugins 列表：

```js
// webpack.config.js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const config = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        // filename: 'bundle.js'
        filename: [hash].js
    },
    plugins: [
        new HtmlWebpackPlugin(),    // there!
    ]
}
module.exports = config
```

> 示例：[04-webpack-html](./04-webpack-html/)

但是，用 `html-webpack-plugin` 默认创建的 HTML 文件对我们实际项目并没有什么作用，所以我们一般会通过 `html-webpack-plugin` 的配置，传递一个写好的 HTML 模板：

```js
module.exports = {
    // ...
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'assets/index.html'
        })
    ]
}
```

> 示例：[05-webpack-html-template](./05-webpack-html-template/)

> 参考：[html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin)

## 构建 CSS

CSS 文件也要作为依赖引入到 `index.js` 里面（因为 **Webpack 的一切资源入口是 `index.js`**），所以这里需要配置引入 loader 来解析和处理 CSS 文件。

安装依赖：

```shell
npm install --save-dev webpack webpack-cli html-webpack-plugin css-loader style-loader
```

修改配置文件 `webpack.config.js`：

```js
module.exports = {
    // ...
    module: {
        rules: [
            {
                test: /\.css/,
                include: [
                    path.resolve(__dirname, 'src'),
                ],
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    }
}
```

在 `index.js` 引用：

```js
import './assets/index.css'
```

特别说明：

* `css-loader`：解析 CSS 代码，处理 CSS 文件中的依赖（如 `@import`、`url()` 等引用外部文件的声明；
* `style-loader`：会将 `css-loader` 解析的结果转变为 JS 代码，运行时动态插入 `style` 标签来让 CSS 代码生效；
* 在 `dist/` 看不到 CSS 文件是因为经过两个 loader 处理后，CSS 代码转变为 JS，和 `index.js` 一起打包了；
* 一般项目中，我们最好把 CSS 分离出来，详见下一节。

> 示例：[06-webpack-css](./06-webpack-css/)


## 抽离 CSS

> `extract-text-webpack-plugin` 已经不用于 Webpack V4，[官方文档](https://webpack.js.org/plugins/mini-css-extract-plugin/#root) 推荐使用 [mini-css-extract-plugin](https://github.com/webpack-contrib/mini-css-extract-plugin)。

我们可以通过 `mini-css-extract-plugin` 来抽离 CSS 文件。

```shell
npm install --save-dev mini-css-extract-plugin
```

修改配置文件：

```js
module.exports = {
    // ...
    plugins: [
        // ...
        new MiniCSSExtractPlugin({  // 分离css文件
            filename: 'bundle.[hash].css',  // 生成后的文件名
            chunkFilename: '[id].[hash].css'
        })
    ],
    module: {
        // ...
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
}
```

> 示例：[07-webpack-css-extract](./06-webpack-css-extract/)


## CSS 预处理器

除了安装基本依赖：

```shell
npm install --save-dev webpack webpack-cli
npm install --save-dev html-webpack-plugin mini-css-extract-plugin
npm install --save style-loader css-loader
```

需要额外安装两个东西：

```shell
npm install --save-dev sass-loader node-sass
```

然后基于 07 的 `webpack.config.js` 修改配置文件：

```js
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
```

执行命令 `npm start` 就完事了。

> 示例：[08-webpack-css-preprocessor](./08-webpack-css-preprocessor/)

## 图片处理

由于图片对应的 jpg/png/git 等文件格式，Webpack 处理不了，所以我们需要添加一个处理图片的 loader 配置—— `file-loader`。file-loader 可以用于处理很多类型的文件，它的主要作用是直接输出文件，把构建后的文件路径返回。

```js
module: {
    rules: [
        // ...
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
```

> 示例：[09-webpack-image](./09-webpack-image/)

## 使用 Babel

Babel 是一个让我们能够使用 ES 新特性的 JS 编译工具。在 Webpack 中配置 Babel，就可以使用 ES6、ES7 标准来编写 JS 代码。

```js
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.jsx?/, // 支持 js 和 jsx
        include: [
          path.resolve(__dirname, 'src'), 
        ],
        loader: 'babel-loader',
      },
    ],
  },
}
```

> 示例：[10-webpack-babel-new](./10-webpack-babel-new/)

## 清理目录与启用静态服务器

由于用了 `hash` 命名资源文件，所以每次构建打包都不会替换原来的文件，这里我们就需要用到 `clean-webpack-plugin` 来清理目录：

```shell
npm install --save-dev clean-webpack-plugin
```

```js
// ...
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// ...
plugins: [
    new CleanWebpackPlugin(),   // 放在前面
    // ...
]
```

为了方便调试，我们还会使用 `webpack-dev-server` 在本地开启一个简单的静态服务器来进行开发：

```shell
npm install --save-dev webpack-dev-server
```

```json
"script": {
    "build": "webpack --mode production",
    "start": "webpack-dev-server --mode development"
}
```
> 注意：webpack-dev-server 默认调用 8080 端口，即访问地址：http://localhost:8080/

> 示例：[10-webpack-babel-new](./10-webpack-babel-new/)




## 参考

* [使用 Webpack 定制前端开发环境](https://juejin.im/book/5a6abad5518825733c144469/)