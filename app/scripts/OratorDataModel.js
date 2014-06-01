'use strict';

function OratorDataModel () {
	//var self = this;

	this.apertiumLangPairs = function (init) {
		
		$.ajax({
		    url: 'http://api.apertium.org/json/listPairs',
		    type: 'GET',
		   	crossDomain: true,
		    async: false,
		    dataType: 'jsonp',
		    success: function(data) { 
		    	var langsMap = {};
		    	var arr = data.responseData;
				for (var i=0; i<arr.length; i++) {
		    		
		    		var key = arr[i].sourceLanguage;
		    		var val = arr[i].targetLanguage;

		    		if (typeof langsMap[key] == 'undefined') {
		    			//alert("undefined");
		    			langsMap[key] = new Array(val);
		    		}
		    		else {
		    			langsMap[key].push(val);
		    		}
		    	}
		    	console.log(langsMap);
		    	init (langsMap);
		    	return data;

		    },
		    error: function() { alert('Failed!'); }
		    //beforeSend: setHeader
		});

		//console.log(data);

	};
}