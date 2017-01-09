/*
 Master Express.js and have fun!
---------------------------------
 STYLISH CSS
 Exercise 5 of 8

Style your HTML from previous example with some Stylus middleware.

Your solution must listen on the port number supplied by process.argv[2].

The path containing the HTML and Stylus files is provided in process.argv[3]
(they are in the same directory). You can create your own folder and use these:

The main.styl file:

    p
      color red

The index.html file:

    <html>
      <head>
        <title>expressworks</title>
        <link rel="stylesheet" type="text/css" href="/main.css"/>
      </head>
      <body>
        <p>I am red!</p>
      </body>
    </html>

-------------------------------------------------------------------------------

## HINTS

To plug-in stylus someone can use this middleware:

    app.use(require('stylus').middleware(__dirname + '/public'));

Remember that you need also to serve static files.

## NOTE

For your own projects, Stylus requires to be installed like any other
dependency:

    npm install stylus


 � To print these instructions again, run: expressworks print
 � To execute your program in a test environment, run: expressworks run program.js
 � To verify your program, run: expressworks verify program.js
 � For help run: expressworks help
*/
var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(path.join(__dirname, 'public5')));
app.use(require('stylus').middleware(path.join(__dirname, 'public5')));

app.listen(3000);