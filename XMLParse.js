var parseString = require('xml2js').parseString;
var fs = require('fs');
var assert = require('assert');
var Promise = require('promise');

exports.XMLUrl = function(url){ 

	return new Promise(function (resolve, reject) {

		fs.readFile(__dirname + url, function(error, xml) {

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
}	



