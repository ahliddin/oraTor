'use strict';

/**
 * Creates an instance of TranslatorDataModel.
 *
 * @constructor
 * @this {TranslatorDataModel}
 *
 */

function TranslatorDataModel () {
	self = this;

	/**
	 * Makes ajax call to retrieve available language pairs from webservice.
	 *
	 * @param {TranslatorViewModel~init} init - Called when ajax call is completed to set up TranslatorViewModel variables.
	 *
	 */
	self.apertiumLangPairs = function (init) {
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
		    	init (langsMap);
		});

		promise.fail( function() { 
			alert('Failed to request data from Apertium web service!'); 
		});

	};

	/**
	 * Makes ajax call to translate input text.
	 *
	 * @param {string} inLang Input (from) language
	 * @param {string} outLang Output (to) language
	 * @param {input} input Text to be translated
	 * @param {function} result_callback  Called when ajax call is completed to set up TranslatorViewModel variables.
	 */
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
			if (data.responseStatus == 200) {
				result_callback (data.responseData.translatedText);
			}
		});
		
		promise.fail (function (){ 
			console.log("ERROR: failed to request translate API")
		});

	};
}














