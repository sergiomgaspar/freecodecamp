var http = require('http');

	return http.get(process.argv[2], function(response) {
		response.on('data', function(d) {
			process.stdout.write(d + '\n');
		});
		response.on('end', function() {
			console.log('');
		});
	}).on('error', function(e) {
	console.log("Got error: " + e.message);
})


/*
Official:
    var http = require('http')
    
    http.get(process.argv[2], function (response) {
      response.setEncoding('utf8')
      response.on('data', console.log)
      response.on('error', console.error)
    }).on('error', console.error)
*/