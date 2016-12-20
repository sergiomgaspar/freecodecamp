var fs = require('fs') 
var path = require("path");
module.exports = function checkFiles(dir,filter, callback) {

	var pathDir=dir;//args[2];
	var suffix=filter; //args[3];
	fs.readdir(pathDir, function (err, files) {
		if (err)  return callback(err);//throw err;
		
        var answer=[];
		files.map(function (file) {
			return path.join(pathDir, file);
		}).filter(function (file) {
			return fs.statSync(file).isFile();
		}).forEach(function (file) {
			if ( path.extname(file) === '.'+suffix)
			    answer.push(file.substr(file.lastIndexOf("/")+1,file.length));
			//console.log(file.substr(file.lastIndexOf("/")+1,file.length));
		}); 
	return callback (null, answer);
	});
	}