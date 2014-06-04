'use strict';

function OratorDataModel () {
	self = this;

	self.apertiumLangPairs = function (init) {
		//self = this;
		var langsMap = {};

		var promise = $.ajax({
		    url: 'http://apy.projectjj.com/listPairs',
		    type: 'GET',
		   	crossDomain: true,
		    async: false,
			contentType: "application/jsonp; charset=utf-8",
		    dataType: 'jsonp'		    
		});

		promise.done( function(data) { 
		    	var arr = data.responseData;
				for (var i=0; i<arr.length; i++) {
		    		
		    		var key = arr[i].sourceLanguage;
		    		var val = arr[i].targetLanguage;

		    		if (typeof langsMap[key] == 'undefined') {
		    			langsMap[key] = new Array(val);
		    		}
		    		else {
		    			langsMap[key].push(val);
		    		}
		    	}
		    	// console.log(langsMap);
		    	init (langsMap);
		    	//return data;

		});

		promise.fail( function() { 
			alert('Failed to request data from Apertium web service!'); 
		});

	}

	self.translate = function (inLang, outLang, input, result_callback) {
		var url = 'http://apy.projectjj.com/translate?langpair=';
		var query = inLang + '%7C' + outLang + '&q=' + input;

		var promise = $.ajax({
		    url: url + query,
		    type: 'GET',
		   	crossDomain: true,
		    async: false,
			contentType: "application/json; charset=utf-8",
		    dataType: 'jsonp'		    
		});

		promise.done (function (data) {
			// console.log(data.responseData.translatedText);
			if (data.responseStatus == 200) {
				// console.log(unescape(JSON.parse('"' + data.responseData.translatedText + '"' )));
				result_callback (data.responseData.translatedText);
			}
		});
		
		promise.fail (function (){ 
			console.log("ERROR: failed to request translate API")
		});

	};
}














