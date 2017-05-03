const request = require('request');
//http://steamcommunity.com/id/gamle/inventory/json/753/6
module.exports = function () {
	var that = this;
	this.list = {};
	this.getInvCollection = function (steamId, appId, mode, callback) {
		request('http://steamcommunity.com/id/'+steamId+'/inventory/json/'+appId+'/'+mode, function (error, response, body) {
			console.log('error:', error); // Print the error if one occurred 
			console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
			var bodyJson = JSON.parse(body);
			//console.log('body:'+ body);  
			//console.log(bodyJson.rgInventory);
			that.rgInventory(bodyJson, callback);
		});
	}

	this.rgInventory = function (data, callback) {
		console.log(data.rgInventory.length);
		for (var k in data.rgInventory) {
		//for (var i = 0; i < data.rgInventory.length; i++) {
			var classid = data.rgInventory[k].classid? data.rgInventory[k].classid : "0";
			var instanceid = data.rgInventory[k].instanceid? data.rgInventory[k].instanceid : "0";
			if(data.rgDescriptions){
				var classInstance = data.rgDescriptions[classid + '_' + instanceid];
				if (classInstance) {
					if(this.getItemClass(classInstance.tags)){
						var appId = this.getAppId(classInstance.tags)
						if(appId != null){
							if (this.list[appId]) {
								if(this.list[appId].cards[classid]){
									this.list[appId].cards[classid].items.push(instanceid);
								}else{
									this.list[appId].cards[classid] = {
										market_name: classInstance.market_name,
										items: [instanceid]
									};
								}
							}else{
								this.list[appId] = {
									cards: {}
								}			
								this.list[appId].cards[classid] = {
									market_name: classInstance.market_name,
									items: [instanceid]
								};				
							}
						}
					}
				}
			}
		}
		callback(this.list)
	}
	this.getItemClass = function (tags) {
		var tag = this.getTagBYInternal_name(tags, "item_class_2");
		if(tag != null){
			return true;
		}
		return false;
	}
	this.getAppId = function (tags) {
		var tag = this.getTagBYCategory(tags, "Game");
		if(tag.internal_name != null){
			return tag.internal_name.replace("app_", "");
		}
		return null;
	}
	this.getTagBYInternal_name = function (tags, tagName) {
		for (var i = 0; i < tags.length; i++) {
			if(tags[i].internal_name == tagName){
				return tags[i];
			}
		}
		return null;
	}
	this.getTagBYCategory = function (tags, tagName) {
		for (var i = 0; i < tags.length; i++) {
			if(tags[i].category == tagName){
				return tags[i];
			}
		}
		return null;
	}
}