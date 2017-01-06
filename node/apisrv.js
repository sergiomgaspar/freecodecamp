/*
## HTTP JSON API SERVER (Exercise 13 of 13)  

Write an HTTP server that serves JSON data when it receives a GET request  
to the path '/api/parsetime'. Expect the request to contain a query string  
with a key 'iso' and an ISO-format time as the value.  

For example:  

/api/parsetime?iso=2013-08-10T12:10:15.474Z  

The JSON response should contain only 'hour', 'minute' and 'second'  
properties. For example:  

 {  
   "hour": 14,  
   "minute": 23,  
   "second": 15  
 }  

Add second endpoint for the path '/api/unixtime' which accepts the same  
query string but returns UNIX epoch time in milliseconds (the number of  
milliseconds since 1 Jan 1970 00:00:00 UTC) under the property 'unixtime'.  
For example:  

 { "unixtime": 1376136615474 }  

Your server should listen on the port provided by the first argument to  
your program.  

─────────────────────────────────────────────────────────────────────────────  

## HINTS  

The request object from an HTTP server has a url property that you will  
need to use to "route" your requests for the two endpoints.  

You can parse the URL and query string using the Node core 'url' module.  
url.parse(request.url, true) will parse content of request.url and provide  
you with an object with helpful properties.  

For example, on the command prompt, type:  

 $ node -pe "require('url').parse('/test?q=1', true)"  

Documentation on the url module can be found by pointing your browser  
here:  
file:///home/ubuntu/.nvm/versions/node/v4.6.1/lib/node_modules/learnyounod  
e/node_apidoc/url.html  

Your response should be in a JSON string format. Look at JSON.stringify()  
for more information.  

You should also be a good web citizen and set the Content-Type properly:  

 res.writeHead(200, { 'Content-Type': 'application/json' })  

The JavaScript Date object can print dates in ISO format, e.g. new  
Date().toISOString(). It can also parse this format if you pass the string  
into the Date constructor. Date#getTime() will also come in handy.  

─────────────────────────────────────────────────────────────────────────────  

» To print these instructions again, run: learnyounode print                  
» To execute your program in a test environment, run: learnyounode run                                                                            
 program.js                                                                  
» To verify your program, run: learnyounode verify program.js                 
» For help run: learnyounode help                                             
*/

var http = require('http')  
var url = require('url');

http.createServer(function (req, res) {  
  if (req.method == 'GET') {
      var parts = url.parse(req.url, true);
      if (parts.pathname === '/api/parsetime'){
        var queryObjectA=JSON.stringify(parts.query);
        // example: 2013-08-10T12:10:15.474Z
       // console.log(parts.query.iso);
        var inputDt=new Date(parts.query.iso);
        /*
         {  
            "hour": 14,  
            "minute": 23,  
            "second": 15  
          }
          */
        var outDt = JSON.stringify({
          "hour": inputDt.getHours(),  
          "minute": inputDt.getMinutes(),  
          "second": inputDt.getSeconds()
        });  
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(outDt);
        //console.log(outDt);
        
      } else if (parts.pathname === '/api/unixtime') {
          //console.log("entrou no unixtime");
          var queryObjectA=JSON.stringify(parts.query);
          var inputDt=new Date(parts.query.iso);
          var outDt = JSON.stringify({
            "unixtime": inputDt.getTime()
          });  
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(outDt);
      } else 
          res.writeHead(404, { 'Content-Type': 'application/json' });
      //res.writeHead(200, {'Content-Type': 'text/html'});
      //res.end('post received');
    }
}).listen(3000)
// listen(process.argv[2])