'use strict';

function OratorDataModel () {
	//var self = this;

	this.apertiumLangPairs = function (init) {
		self = this;

		self.langsMap = {};

		var promise = $.ajax({
		    url: 'http://api.apertium.org/json/listPairs',
		    type: 'GET',
		   	crossDomain: true,
		    async: false,
		    dataType: 'jsonp'		    
		    //beforeSend: setHeader
		});

		promise.done( function(data) { 
		    	var arr = data.responseData;
				for (var i=0; i<arr.length; i++) {
		    		
		    		var key = arr[i].sourceLanguage;
		    		var val = arr[i].targetLanguage;

		    		if (typeof self.langsMap[key] == 'undefined') {
		    			self.langsMap[key] = new Array(val);
		    		}
		    		else {
		    			self.langsMap[key].push(val);
		    		}
		    	}
		    	console.log(self.langsMap);
		    	init (self.langsMap);
		    	//return data;

		});

		promise.fail( function() { 
			alert('Failed!'); 
		});

	}
}