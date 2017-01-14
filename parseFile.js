var parseString = require('xml2js').parseString;
var fs = require('fs');
var assert = require('assert');
var Promise = require('promise');

var promise = new Promise(function (resolve, reject) {

	fs.readFile(__dirname + '/items.xml', function(error, xml) {

		if(!error){

			parseString(xml, function (err, result) {

				if(!err){
					
					resolve(result.catalog.book);
					
				}else{
					reject(false);
				}
			});
			
		}else{
			reject(false);
		}
  	});
});
	
exports.fn = function(){return promise};


