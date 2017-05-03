const util = require('util');
var CardCollection = require('./lib/getCardCollection');
var cardCollection = new CardCollection();
var UsersCard = require('./lib/getUsersCard');
var inv = new UsersCard();
inv.getInvCollection('gamle', '753', '6', function (data) {
	//console.log(data);
	//console.log(util.inspect(data, false, null));
	console.log(data[730])
	for (var k in data) {
		console.log("loop");
		console.log(k);
		console.log(data[k]);
		cardCollection.checkApp(data[k], k, function () {
			console.log("done!");
		});
		break;
	}
});

