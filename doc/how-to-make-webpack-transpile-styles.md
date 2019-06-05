# How to make beautiful apps with webpack

Hi,

Today is the last lesson of this course. It has been fun, hasn't it? You have learned how to create a complete React app with webpack. You are awesome!

Today we will go through two things: first you will learn about styling and webpack. And then we will look at what's next.

## Styling and webpack

I know what you are thinking. What does styling have to do with a Javascript build tool?

There are some advantages to transform the styling in webpack. If you use Sass, less or something similar you need a tool to transpile them anyway so why not use one build tool for everything? Another reason is that if you use hot reloading then your styles also get hot reloaded when they are changed.

Today you will learn how to transpile CSS, Sass and Less with webpack.

Start with the app you have created yesterday.

In the first lesson, you learned about loaders. You already configured a loader for js and jsx files to use Babel to transpile the files.

What you are going to do today is to create loaders for CSS, Less and Sass.

The recipe is very similar to how you configured the loader for js/jsx:

1. Install the loader dependency (or dependencies)
2. Set up a new entry in modules/rules.

Let's start with CSS. The first thing you are going to do is to install the loader dependency.

```sh
npm install --save-dev style-loader css-loader
```

Note that it requires two loaders. both style-loader and css-loader.

Next, you will do step 2: set up the entry in modules/rules.

```js
{
  test: /\.css$/,
  use: [
    'style-loader',
    'css-loader'
  ]
}
```

For all CSS files, it runs both style-loader and css-loader.

Now I leave configuration of Less files and Sass files as an exercise for you! If you get stuck you can go to createapp.dev and selected less and sass there and see how the files get updated.

Now you can create .css, less and sass files to style your app. Let's create a simple css file. Create the file styles.css in the src folder with the following contents:

```css
body {
  color: green;
}
```

access it like this in the top of your `index.js` file:

```js
require("./styles.css")
```

Now when you run your app you will see that all texts are green!
