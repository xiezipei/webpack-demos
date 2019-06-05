# How to create a React app with webpack

Hi,

Another day, another webpack lesson!

Yesterday you learned how to configure webpack to transpile ES6 to old Javascript code.

Today you are going to create a React project.

If you are already familiar with React you know that it uses JSX and that is not part of the JavaScript standard. We need Babel to transpile the JSX just like we used Babel to transpile ES6 yesterday.

## First of all: create the React code

When you follow today's lesson, continue from the code you created yesterday.First, you are going to install the React dependencies

```sh
npm install --save react react-dom
```

Next, edit the `index.js` file and replace the whole file with the following code. It's a simple React "hello world" app.

```js
import React from "react";
import ReactDOM from "react-dom";
class App extends React.Component {
  render() {
    return Hello {this.props.name};
  }
}
var mountNode = document.getElementById("app");
ReactDOM.render(, mountNode);
```

Next, add the index.html file in the dist folder of the project

```html
<!DOCTYPE html>
<html>
    <head>
        <title>React starter app</title>
    </head>
    <body>
        <div id="app"></div>
        <script src="bundle.js"></script>
    </body>
</html>
```

## Configure Babel so that it can transpile JSX

You are going to continue to use Babel, just like you did yesterday.

Babel uses a plugin system so when you want to use new features you must install a new plugin dependency. The dependency you must install to be able to transpile React to JSX is called `@babel/preset-react`

```sh
npm install --save-dev @babel/preset-react
```

Next step is to configure your .babelrc file to use the plugin:

```json
{
  "presets": [
    "@babel/preset-env",
    "@babel/preset-react"
  ]
}
```

Now babel will be able to transpile JSX!

## Make webpack understand the .jsx extension

In the webpack.config.js file you created last week you defined it should transpile `.js` files:

```js
test: /\.(js)$/,
```

It's common to have the extension `.jsx` on React files. Therefore, you must add .jsx to the regex:

```js
test: /\.(js|jsx)$/,
```

Now webpack also transpile jsx files.

While we are on the subject of extensions I want to teach you resolver extensions.

When you are using webpack you can import a module without writing the extension. Let's say you have a file called `FileBrowser.js` that you want to import from your `index.js` file. Then you can do it like this:

```js
import FileBrowser from 'components/FileBrowser';
```

Note that you didn't have to provide the `.js` extension but webpack knew which file to import anyway. By default webpack automatically resolve js files. But it doesn't resolve jsx files by default. To be able to do that you have to manually configure your webpack config:

```js
resolve: {
    extensions: [
      '.js',
      '.jsx'
    ]
  }
```
Note that you have to configure both js and jsx even though js is enabled by default. Webpack overwrites the old resolver extension config with whatever you provide in the webpack config.

If you want to look at the code from today's lesson you can go to https://createapp.dev/webpack and select React (and deselect React hot loading).


