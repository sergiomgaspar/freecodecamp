
/*
 JADE
 Exercise 3 of 8

Create an Express.js app with a home page rendered by Jade template engine.

The homepage should respond to /home.

The view should show the current date using toDateString.

-------------------------------------------------------------------------------

## HINTS

The Jade template file index.jade is already provided:

    h1 Hello World
    p Today is #{date}.

This is how to specify path in a typical Express.js app when the folder is
'templates':

    app.set('views', path.join(__dirname, 'templates'))

However, to use our index.jade, the path to index.jade will be provided as
process.argv[3].  You are welcome to use your own jade file!

To tell Express.js app what template engine to use, apply this line to the
Express.js configuration:

    app.set('view engine', 'jade')

Instead of Hello World's res.end(), the res.render() function accepts
a template name and presenter data:

    res.render('index', {date: new Date().toDateString()})

We use toDateString() to simply return the date in a human-readable format
without the time.

-------------------------------------------------------------------------------

## NOTE

When creating your projects from scratch, install the jade dependency with npm.

Again, the port to use is passed by expressworks to the application as process.argv[2].


 » To print these instructions again, run: expressworks print
 » To execute your program in a test environment, run: expressworks run program.js
 » To verify your program, run: expressworks verify program.js
 » For help run: expressworks help

*/
var express = require('express');
var app = express();
var path = require('path');
app.get('/home', function(req, res) {
    //res.end('Hello World!')
    
    //app.set('views', express.static(process.argv[3]));
    app.set('views', path.join(__dirname, 'templates'));
   // app.set('views', express.static(process.argv[3]));
    app.set('view engine', 'jade');
    res.render('index', {date: new Date().toDateString()});
});
//app.listen(process.argv[2]);
app.listen(3000);
