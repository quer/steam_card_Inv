const util = require('util');
var fs = require('fs');
var CardCollection = require('./lib/getCardCollection');
var cardCollection = new CardCollection();
var UsersCard = require('./lib/getUsersCard');
var inv = new UsersCard();
var compleat = [];
var notCompleat = [];
/**
 * [description]
 * @param  {sting} steam api name eller steam64
 * @param  {int} 1: steam api name 2: steam64
 */
inv.getInvCollection('quer_the_gamer', 1, function (data) {
	//console.log(data);
	//console.log(util.inspect(data, false, null));
	fs.writeFile('gamle.json', JSON.stringify(data), function(err2) {
	    if(err2) {
	        throw err2;
	    }
	    console.log("The file was saved!");
	}); 
	var keys = Object.keys(data);
	customforEach(data, keys, 0, function () {
		console.log("done");
		console.log(compleat);
		console.log(countEnd());
		console.log(notCompleat);
	})
});

function customforEach(data, keys, indexKey, callback) {

	if (keys.length > indexKey && data[keys[indexKey]]) {
		cardCollection.checkApp(data[keys[indexKey]], keys[indexKey], function (set) {
			
			if(set != null){
				compleat.push(set);
				console.log("null - no");
			}else{
				notCompleat.push(keys[indexKey]);
				console.log("null");
			}
			customforEach(data, keys, ++indexKey, callback)
		});
	} else {
		callback();
	}
}

function countEnd() {
	var end = {
		setsTypes: compleat.length,
		sets: 0
	};
	for (var i = 0; i < compleat.length; i++) {
		end.sets += compleat[i].length;
	}
	return end;
}