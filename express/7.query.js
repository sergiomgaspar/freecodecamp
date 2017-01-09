/*
 Master Express.js and have fun!
---------------------------------
 WHAT'S IN QUERY
 Exercise 7 of 8

Write a route that extracts data from query string in the GET '/search' URL
route, e.g. ?results=recent&include_tabs=true and then outputs it back to
the user in JSON format.

-------------------------------------------------------------------------------

## HINTS

In Express.js to extract query string parameters, we can use:

    req.query.NAME

To output JSON we can use:

    res.send(object)


 � To print these instructions again, run: expressworks print
 � To execute your program in a test environment, run: expressworks run program.js
 � To verify your program, run: expressworks verify program.js
 � For help run: expressworks help
*/
 
var path = require('path');
var express = require('express');
var app = express();

app.get('/search', function (req, res) {
  res.send(req.query);
});

app.listen(3000);
