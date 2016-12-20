/*
     function bar (callback) {  
       foo(function (err, data) {  
         if (err)  
           return callback(err) // early return  
       
         // ... no error, continue doing cool things with `data`  
       
         // all went well, call callback with `null` for the error argument  
       
         callback(null, data)  
       })  
     }
*/
var fs = require('fs') 
var path = require("path");
module.exports = function checkFiles(err,dir,filter, callback) {

	var pathDir=dir;//args[2];
	var suffix=filter; //args[3];
console.log("DIR:"+dir);
console.log("FILTER:"+filter);
	fs.readdir(pathDir, function (err, files) {
		if (err) {
			 return callback(err);//throw err;
		}

		files.map(function (file) {
			return path.join(pathDir, file);
		}).filter(function (file) {
			return fs.statSync(file).isFile();
		}).forEach(function (file) {
			if ( path.extname(file) === '.'+suffix) console.log(file.substr(file.lastIndexOf("/")+1,file.length));
		}); 
	return callback (null, files);
	});
	}