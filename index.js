/*
example usage. 

Below shows how one might parse XML, save it to a noSQL DB
and render the results.
*/
var express = require('express');
var app = express();
var XMLParse = require('./XMLParse.js');
//var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');
var assert = require('assert');
var url = 'mongodb://127.0.0.1/Books';
//var xml = "<root>Item one</root>";
mongoose.connect(url);

app.use('/', express.static(__dirname + '/public')); // ← adjust

var Schema = mongoose.Schema;

var bookSchema = new Schema({
    author: String
    /*title: String,
    genre: String,
    price: String,
    publish_date: String,
    description: String*/
});

var Book = mongoose.model('Book', bookSchema);

// set the view engine to ejs
app.set('view engine', 'ejs');

// index page 
app.get('/', function(req, res, next) {
	//here's the xml parser. This takes in an xml document and returns JSON
	XMLParse.get('/items.xml' /*URL to xml*/).then(function(result){

		if(result){//check for results

    		res.render('pages/index', {data: result});

    		var book = new Book({author: result[0].author[0]});
    		book.save(function(err, author){});

    				/*Book.collection.insertMany(result.catalog.book, function(err,r) {
      					assert.equal(null, err);
      					assert.equal(12, r.insertedCount);

      					db.close();
					})*/
		}else{//handle error
			res.render('pages/index', {data: [{author: ['error on page']}]});
		}
	});
	
});

// about page 
/*app.get('/about', function(req, res) {
    res.render('pages/about');
});*/

app.listen(3000, function() { console.log('listening'); });

