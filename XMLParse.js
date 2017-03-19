var parseString = require('xml2js').parseString;
var fs = require('fs');
var assert = require('assert');
var Promise = require('promise');

exports.get = function(url){ 

	return new Promise(function (resolve, reject) {
		//TODO: format url - remove slashes
		fs.readFile(__dirname + url, function(error, xml) {

			if(!error){

				parseString(xml, function (err, result) {

					if(!err){
						//TODO: return just results to make more universal
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



