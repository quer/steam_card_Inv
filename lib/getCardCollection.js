const request = require('request');
const cheerio = require('cheerio');
const util = require('util');
var fs = require('fs');
//database = new database();

module.exports = function () {
	var that = this;
	this.cardDeckCache = [];

	this.checkApp = function (appUserObj, appId, callback) {
		this.getCardSet(appId, function (cards) {
			if (cards == null) {
				callback(null);
				return;
			}
			var set = that.getSetIfisSet(cards, appUserObj);
			callback(set);
		});
	}

	this.getSetIfisSet = function (cards, appUserObj) {
		var harSet = true;
		var cardsCollection = [];
		for (var card in cards.cards) {
			var cardIfSet = that.checkIfHaveCard(cards.cards[card], appUserObj.cards);
			if(cardIfSet !== null){
				cardsCollection.push(cardIfSet);
				//console.log("har set");
			}else{
				harSet = false;
				//console.log("har ikke set");
			}
		}
		if (harSet) {
			return this.getFullSets(cardsCollection);
		}
		return null;
	}
	this.getFullSets = function (cardsCollection) {
		var cardsInSet = 0;
		for (var i = 0; i < cardsCollection.length; i++) {
			var cardsInSetCount = cardsCollection[i].items.length;
			if (cardsInSet == 0 || cardsInSet > cardsInSetCount) {
				cardsInSet = cardsInSetCount;
			}
		}
		var fullSet = [];
		for (var ii = 0; ii < cardsInSet; ii++) {
			var set = [];
			for (var iii = 0; iii < cardsCollection.length; iii++) {
			
				set.push(cardsCollection[iii].items[ii]);
			}
			fullSet.push(set);
		}
		//console.log("fullSet");
		//console.log(fullSet);
		return fullSet;
	}
	this.checkIfHaveCard = function (cardName, userCards) {
		//console.log(userCards);
		for(var userCard in userCards){
			//console.log(userCards[userCard].market_name + " - " + cardName);
			if(userCards[userCard].name == cardName)
			   return userCards[userCard];
		}
		return null;
	}
	
	this.getCardSet = function (app, callback) {
		fs.readFile( 'cardSet.json', function (err, data) {
			if (err) {
				throw err; 
			}
			var file = JSON.parse(data);
			//console.log(file[app]);
			if (!file[app]) {
				request('http://steamcommunity.com/id/zyymotic/gamecards/'+app+'/', function (error, response, body) {
					console.log('error:', error); // Print the error if one occurred 
					console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
					const $ = cheerio.load(body);
					var listColletion = $(".badge_card_set_card");
					//console.log("listColletion:"+listColletion.length);
					if(listColletion.length > 0){
						var cardsList = [];
						listColletion.each(function(i, elem) {
							var obj = $(this).find(".badge_card_set_text").first();
							var image = $(this).find(".gamecard").attr("src"); 
							//obj.empty();
							var cardName = obj.text().trim().replace(/\s/g, "").replace(/ /g, "");
							//console.log({cardName: cardName, image: image});
							cardsList.push(cardName);
						});
						var endObj = {
							amount: listColletion.length,
							cards: cardsList
						};
						file[app] = endObj;
						//console.log(util.inspect(file, false, null))
				
						var stringObj = JSON.stringify(file);
				
						//console.log(util.inspect(stringObj, false, null))
						fs.writeFile('cardSet.json', stringObj, function(err2) {
						    if(err2) {
						        throw err2;
						    }
						    console.log("The file was saved!");
						    callback(endObj);
						}); 
					}else{
						console.log("ingen kort i: "+app);
						callback(null);
					}
				});
			}else{
				callback(file[app]);
			}
		});
	}
}