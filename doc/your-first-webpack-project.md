# Your first webpack project

You have tried out webpack before. You cloned some boilerplate project from GitHub, trying to figure out how things fit together.

You get errors when you run the project and it's difficult to debug because you are not familiar with the code base.

And you don't know what is what. Bebpack, Babel, React and Redux just merges into a big mess.

Let's stop the rush to get things running and do this properly.

The best way to approach this is to do one thing at the time.

Today you will create the most simple webpack project possibly

But before we start, let's take a recap of yesterdays lesson. What does webpack do?

![](https://i.loli.net/2019/05/13/5cd8433f4867b.jpg)

Webpack takes one or many JS files as input and spits out a completely new Javascript file called a bundle. The output bundle has the same features as the input file, but it is enhanced in ways that you define in your webpack config. The bundle is often used on your index.html page.

Now you are going to create your first webpack bundle!

The first thing you are going to do is to create a new NPM project. NPM is the Node Package Manager. You will use it to build your app on your local machine. If you haven't installed node/NPM you have to do that first. After you have node/NPM installed run the following command in your terminal to create a new project:

```sh
mkdir my-first-webpack
cd my-first-webpack
npm init -y
```

This file generates a package.json file that looks something like this:

```json
{
  "name": "my-first-webpack",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

In this file, you can find information about the project such as name, version etc. It also defines the dependencies for your project which we will come back to later. The next thing you are going to do is to create a super simple javascript file that you are going to run through webpack. We will put it in the directory src.

```sh
mkdir src
```

create index.js inside the src folder with the following contents:

```js
console.log("hello world!");
```

It can't be more simple than that, can it?

Next, you are going to install the webpack dependencies. Run these two commands:

```sh
npm install --save-dev webpack
npm install --save-dev webpack-cli
```

This will install the latest version of webpack. Check in your package.json and you will see the dependencies listed there.

Next step is to run webpack to create your first bundle! It is common to run webpack through npm. To do that you add an entry in the script section of your package.json:

```json
"scripts": {
    "build": "webpack --mode development"
  }
```

Let's take a recap of what you have done so far. You have created a new NPM project, installed webpack dependencies, created a super simple JS file and added a script in package.json to start webpack.

You now actually have everything you need to run webpack to transpile your JS file.

Run webpack with the following command

```sh
npm run build
```

This will launch webpack as we added in the scripts section of package.json. Note that this builds a development build because we pass in the parameter --mode development to webpack in the package.json file. You can do a production build with --mode production. A production build is more optimized for performance than a development build.

Congratulations on building your first webpack app!

You can find the bundle in the dist directory with the filename main.js.

Now you can run that bundle

```sh
node dist/main.js
```

See that it outputs "hello world!"

It's also possible to include the bundle in an HTML file and run it in your browser. You will do that in a later lesson when you will create a React project.

You can take a look at the contents of the bundle by opening it in your text editor. You will see it's full of jibberish. It's the minified and uglified code. It's not meant for humans to read, but it's for the browsers eyes only.

And by the way, did you notice we haven't used a webpack.config.js file yet? For super simple projects like this one, we don't need it. It automatically uses defaults which worked fine for us in this example.




