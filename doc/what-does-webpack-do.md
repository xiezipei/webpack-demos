# What does webpack do?

Hey,
This is your first lesson to "Learn webpack properly". A free email course I've put together for you.

You will get 5 emails in the next 5 days where you will learn the basics of webpack.

Learning webpack takes time. And it's not enough to just read. You must get your hands dirty and code as well. That's why I want to advise you to set off 30 minutes every day to work with this course. Maybe you can go to work 30 minutes before everyone else, or you can skip Netflix this week and code webpack instead? Receiving these emails is not enough - it's what you do with them that matters. To help you accelerate your learning I have designed worksheets and quizes. Find the first one at the end of this email.

We will start the course softly with an overview of what webpack is.

Enjoy!

---

I remember the good old days. Creating a new web app was simple. All you needed to do was to create an HTML file, add jQuery and your source code with a `<script src>` tag and you were good to go.
Today it's different.

The apps you build today are more and more complex. Your project uses tens or hundreds of JS files and also lots of dependencies.

Inserting script tags is no longer a good enough solution - it just doesn't scale. It would give many HTTP roundtrips and make your apps slow. It's would also be difficult to maintain your app.

This is where webpack comes into play.

When you are using webpack, each JavaScript file you write becomes a module. Webpack puts all your modules plus the dependencies (like React) in one big file. This big file is called the "bundle". This makes your code much easier to maintain and it also gives you a quicker load speed with just one round trip.

![](https://i.loli.net/2019/05/09/5cd43e4c684a2.png)

It's the bundle.js that you include in your HTML file. Only one `<script>` tag is required!

Webpack also gives you the possibility to use new features such as ES6 and Reacts XML-like language JSX. Webpack transpiles the code to simple JavaScript code that all browsers understand. To transpile code webpack uses a plugin. We are going to use the Babel plugin to transpile our ES6 and React code in this course. Babel is the most common transpiler for doing this.

![](https://i.loli.net/2019/05/09/5cd43e38d5a23.jpg)

Today users have high expectations from the web. We hate slow apps.

So you must make an effort to making your apps quicker. One way to do that is to minify and uglify your code before shipping it. Minifying means removing white spaces, comments and other unnecessary code. Uglify means to make long variable names shorter. These are all small things but it adds up! Uglifying and minifying come out of the box with webpack.

![](https://i.loli.net/2019/05/09/5cd43dd45a9d8.jpg)

With webpack, you can also use more advanced optimizations such as code splitting and dynamic loading of bundles. Webpack also has a plugin system with a wide selection of plugins.