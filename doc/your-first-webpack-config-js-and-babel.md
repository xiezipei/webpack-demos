# Your first webpack.config.js file and babel

> 注：作者：Jakob Lind，原文来自邮件订阅，写得不错特意搬运过来~

Hey,
Are you ready to do some webpack hacking?

Yesterday you learned how to set up a project with NPM, and how to make it run webpack for you.

Today you are going to configure webpack to transpile some ES6 code to regular javascript code that browsers can read.

Webpack doesn't have this feature built in, but you are going to configure webpack to use a tool called babel.

![](https://i.loli.net/2019/05/12/5cd841b718cee.jpg)

But before that, it's time for the moment you have been waiting for: the dreaded webpack.config.js file!

## Your first webpack.config.js

Don't worry it's not complicated. You will start simple and take it step-by-step.

webpack.config.js is a regular javascript file. This is the simplest webpack config js that you can write:

```js
const webpack = require('webpack');
const path = require('path');
const config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  }
}
module.exports = config;
```

All it does is that it explicitly defines entry file and output file.

Note how we use the same entry file as the defaults (src/index.js) but we have changed the filename of the output file to bundle.js. The path package is used so that we can create a full path to the dist folder. __dirname is a string with the root directory of the project.

You can run webpack the same way as we did before with

npm run build
It automatically detects that there is a webpack.config.js file and use that for configurations. You can check the dist directory to see that we now have a file called bundle.js

## Loaders to transform anything you want

Out of the box webpack only understands Javascript files. To make webpack understand other types of code and files such as ES6 code, PNG files, Less, etc, you must add loaders for each of those file types to your webpack config files.

A loader converts the file to a valid module. That's why the configurations for all loaders is under the module key in your webpack.config.js file.

```js
const webpack = require('webpack');
const path = require('path');
const config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      // all your loaders will be here.
      // loaders enables you to use all kinds of
      // file types
    ]
  }
}
module.exports = config;
```

## Use Babel loader to transform ES6

Now you will add the babel loader. The first thing you are going to do is to install the Babel dependency. Because we are in Js land we actually have to install three dependencies :)

```sh
npm install --save-dev babel-loader @babel/core @babel/preset-env
```

* **babel-loader** is the webpack loader for babel
* **babel-core** is ...the core of babel
* **babel-preset-env** is the part of babel that lets us use the latest version of JS

Before you will add the babel-loader to the webpack config file, you need to configure babel. Babel has a config file called .babelrc

Create the file .babelrc in your root folder with the following contents

```js
{
  "presets": ["@babel/preset-env"]
}
```

This enables babel to transpile the latest version of JS.

Now you are ready to add the babel loader to the webpack config file. You will add it as a rule under the modules section as we saw before:

```js
module: {
    rules: [
       // here
    ]
  },
```

A rule has at least two keys: test and use. test is a regex that describes what files webpack should run this loader on. use is the name of the loader.

You will configure webpack to use babel-loader on all js files. You will also exclude all node_modules because these are often already run through webpack. Your config for the loader looks like this:

```js
module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  },
```

Now you have all the Babel config all set up! Let's run it again

```sh
npm run build
```

Ok, it worked! Let's add some ES6 code to make sure it transpiles it correctly. Edit index.js and add this:

```js
const hello = () => {
    console.log("hello world!");
}
hello();
```

Then run webpack again.

```sh
npm run build
```

Now open the generated bundle in dist/bundle.js with your text editor, and you can see at the very bottom that the code has been translated to old Javascript:

```js
eval("var hello = function hello() {\n  console.log(\"hello world!\");\n};\n\nhello();\n\n//# sourceURL=webpack:///./src/index.js?");
```

Note that there is no arrow function, but it uses the old syntax with the function keyword.

You have written modern JS that gets transpiled to "old" JS!

Sweet! You now have a pretty useful project. It uses babel to transpile the ES6 code to regular javascript code.