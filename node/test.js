


/*var buff = fs.readFile(file, 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  var x=data.split('\n');
  console.log(x.length-1);
});*/

var fs = require('fs') 
var path = require("path");
var pathDir=process.argv[2];
var suffix=process.argv[3];
fs.readdir(pathDir, function (err, files) {
    if (err) {
        throw err;
    }

    files.map(function (file) {
        return path.join(pathDir, file);
    }).filter(function (file) {
        return fs.statSync(file).isFile();
    }).forEach(function (file) {
        //console.log("%s (%s)", file, path.extname(file));
		if ( path.extname(file) === '.'+suffix) console.log(file.substr(file.lastIndexOf("/")+1,file.length));
    });
});
