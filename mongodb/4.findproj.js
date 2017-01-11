/*
 Learn MongoDB
---------------
 FIND PROJECT
 Exercise 4 of 9

Here we will learn how to search for documents but only fetch the fields
we need. Also known as projection in MongoDB

Use the parrots collection from the database named learnyoumongo to
find all documents where age is greater than the first argument
passed to your script.

The difference from the last lesson will be that we only want the
name and age properties

Using console.log, print the documents to stdout.

-------------------------------------------------------------------------------

## HINTS

To find a document or documents, one needs to call find() on the collection.

Find is a little bit different than what we are used to seeing.

Here is an example:

    collection.find({
      name: 'foo'
    }, {
      name: 1
    , age: 1
    , _id: 0
    }).toArray(function(err, documents) {

    })

If your program does not finish executing, you may have forgotten to
close the db. That can be done by calling db.close() after you
have finished.

## Resource:

  * http://docs.mongodb.org/manual/reference/method/db.collection.find/#explicitly-exclude-the-id-field
  * http://mongodb.github.io/node-mongodb-native/2.2/api/Collection.html#find


� To print these instructions again, run: learnyoumongo print
� To run your program, run: learnyoumongo run [solution.js]
� To verify your program, run: learnyoumongo verify [solution.js]
� For help run: learnyoumongo help
*/

var mongo = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017/learnyoumongo';
mongo.connect(url, function(err, db) {
  //console.log("CONECTED");
    // db gives access to the database
    var parrots = db.collection('parrots');
    //console.log('Parrots: '+ parrots);
    parrots.find({
      age: { $gt: parseInt(process.argv[2], 10) }
    },{ name: 1
      , age: 1
      , _id: 0
    }).toArray(function(err, documents) {
        if (err) throw err
        console.log(documents);
        /*documents.map(function(obj){ 
          return console.log(obj);;
        });*/
    })
    db.close();
    //console.log("Finished.");
});
 
  /*
  
────────────────────────────────────────────────────────────────────────────────
    var mongo = require('mongodb').MongoClient
    var age = process.argv[2]

    var url = 'mongodb://localhost:27017/learnyoumongo'

    mongo.connect(url, function(err, db) {
      if (err) throw err
      var parrots = db.collection('parrots')
      parrots.find({
        age: {
          $gt: +age
        }
      }, {
        name: 1
      , age: 1
      , _id: 0
      }).toArray(function(err, docs) {
        if (err) throw err
        console.log(docs)
        db.close()
      })
    })

────────────────────────────────────────────────────────────────────────────────
*/