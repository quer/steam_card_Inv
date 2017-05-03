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
			console.log(cards);
			for (var card in cards.cards) {
				if(that.checkIfHaveCard(card, appUserObj.cards)){
					console.log("har set");
				}else{
					console.log("har ikke set");
				}
			}
			if (cards.amount == appUserObj.cards.length) {
				
				if(this.arraysEqual()){

				}
			}
		});
	}

	this.checkIfHaveCard = function (cardName, userCards) {
		for(var i = 0; i < userCards.length; i++){
			if(userCards.indexOf(cardName) === -1)
			   return false;
		}
		return true;
	}
	
	this.getCardSet = function (app, callback) {
		fs.readFile( 'cardSet.json', function (err, data) {
			if (err) {
				throw err; 
			}
			var file = JSON.parse(data);
			if (!file[app]) {
				request('http://steamcommunity.com/id/zyymotic/gamecards/'+app+'/', function (error, response, body) {
					console.log('error:', error); // Print the error if one occurred 
					console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
					const $ = cheerio.load(body);
					var listColletion = $(".badge_card_set_card");
					console.log("listColletion:"+listColletion.length);
					if(listColletion.length > 0){
						var cardsList = [];
						listColletion.each(function(i, elem) {
							var obj = $(this).find(".badge_card_set_text").first();
							var image = $(this).find(".gamecard").attr("src"); 
							//obj.empty();
							var cardName = obj.text().trim().replace(/\s/g, "");;
							//console.log({cardName: cardName, image: image});
							cardsList.push(cardName);
						});
						var endObj = {
							amount: listColletion.length,
							cards: cardsList
						};
						file[app] = endObj;
						console.log(util.inspect(file, false, null))
				
						var stringObj = JSON.stringify(file);
				
						console.log(util.inspect(stringObj, false, null))
						fs.writeFile('cardSet.json', stringObj, function(err2) {
						    if(err) {
						        throw err2;
						    }
						    console.log("The file was saved!");
						    callback(endObj);
						}); 
					}
				});
			}else{
				callback(file[app]);
			}
		});
	}
	this.arraysEqual = function (gameArr, userArr) {
	    if(gameArr.length !== userArr.length)
	        return false;
	    for(var i = gameArr.length; i--;) {
	        if(gameArr[i] !== userArr[i])
	            return false;
	    }

	    return true;
	}
}