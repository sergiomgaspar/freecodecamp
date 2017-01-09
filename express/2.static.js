/*
 Master Express.js and have fun!
─────────────────────────────────
 STATIC
 Exercise 2 of 8

Apply static middleware to serve index.html file without any routes.

Your solution must listen on the port number supplied by process.argv[2].

The index.html file is provided and usable via the path supplied by
process.argv[3]. However, you can use your own file with this content:

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

This is how you can call static middleware:

    app.use(express.static(path.join(__dirname, 'public')));

For this exercise expressworks will pass you the path:

    app.use(express.static(process.argv[3]||path.join(__dirname, 'public')));


 » To print these instructions again, run: expressworks print
 » To execute your program in a test environment, run: expressworks run program.js
 » To verify your program, run: expressworks verify program.js
 » For help run: expressworks help
*/
var express = require('express');
var app = express();
//app.get('/', function(req, res) {
    //res.end('Hello World!')
    //app.use(express.static(process.argv[3]||path.join(__dirname, 'public')));
    app.use(express.static(process.argv[3]));
//});
app.listen(process.argv[2]);

