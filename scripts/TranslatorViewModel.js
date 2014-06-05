'use strict';

/**
 * Creates an instance of TranslatorViewModel.
 *
 * @constructor
 * @this {TranslatorViewModel}
 *
 */

function TranslatorViewModel () {

	var self = this; 

	var dataModel = new TranslatorDataModel();

	self.langsMap = ko.observableArray();

	//from and to languages for <select>
	self.inputLangs = ko.observableArray();
	self.outputLangs = ko.observableArray();
	self.selectedInLangs = ko.observableArray();
	self.selectedOutLangs = ko.observableArray();

	//text translated and to be translated
	self.textInput = ko.observable('');
	self.textOutput = ko.observable('');


	//previous translations from localStorage
	self.prevQueries = ko.observableArray();
	self.queryToShow = ko.observable();

	/**
	 * Initializes (sets up) object variables
	 *
	 * @this {TranslatorViewModel}
	 * @param {object} langsMap Map of languages (keys) with array of other languages (vals) that are in pair
	 */
	self.init = function (langsMap) {
		
		var langCodes = Object.keys(langsMap);
		self.langsAll = getLangNames(langCodes).sort();

		self.langsMap (langsMap);
		self.inputLangs (self.langsAll);

		self.selectedInLangs(["English"]); // setting up the default lang
		self.updateOutputLangs();
		self.selectedOutLangs(["Spanish"]); // setting up the default lang

	};
	
	/**
	 * Updates the selection list of (To) languages once the (From) language is set
	 *
	 * @this {TranslatorViewModel}
	 */
	self.updateOutputLangs = function () {
		var selCode = getLangCode (self.selectedInLangs()[0]);
		var langs = getLangNames (self.langsMap()[selCode]);
		
		self.outputLangs (langs);
	};

	/**
	 * Selects the history query (translation) and sets up text field and input/output languages
	 *
	 * @this {TranslatorViewModel}
	 */
	self.selectQuery = function () {
		if (self.prevQueries().length > 0) {
			
			var prev = JSON.parse(localStorage[this]);
			console.log("blah");

			self.selectedInLangs ([prev[0]]);
			self.selectedOutLangs ([prev[1]]);
			self.textInput (prev[2]);
			self.textOutput ('');
			self.queryToShow('');
		}

	};

	/**
	 * Shows the history query (translation) before it can be selected
	 *
	 * @this {TranslatorViewModel}
	 */
	self.showQuery = function () {
		var prev =  JSON.parse(localStorage[this]);
		var output = '';
		if (prev[2].length > 40) {
			output = prev[2].substring(0,37) + "...";
		}
		else {
			output = prev[2];
		}
		output += "  (" + prev[0] + "->" + prev[1] + ")";
		console.log(output);
		self.queryToShow(output);
	};

	/**
	 * Removes the query (translation) from history. Removes it from localStorage and prevQueries array.
	 *
	 * @this {TranslatorViewModel}
	 */
	self.removeQuery = function () {
		delete window.localStorage[this];
		self.prevQueries.remove(this);
		self.queryToShow('');
	};

	/**
	 * Clears the history of queries (translations). 
	 * Deletes the history from localStorage and prevQueries array.
	 *
	 * @this {TranslatorViewModel}
	 */
	self.clearHistory = function () {
		self.prevQueries([]);
		localStorage.clear();
		self.queryToShow('');
	};

	/**
	 * Removes the showed query from modal dialog.
	 *
	 * @this {TranslatorViewModel}
	 */
	self.resQueryToShow = function () {
		self.queryToShow('');
	};

	/**
	 * Translates the input text.
	 *
	 * @this {TranslatorViewModel}
	 * 
	 */
	self.translate = function () {
		
		if (self.textInput().length == 0)
			return;

		var from = getLangCode (self.selectedInLangs()[0]);
		var to = getLangCode (self.selectedOutLangs()[0]); 
		
		dataModel.translate (from, to, self.textInput(), function (res) {
			self.textOutput (res);
		});
		
		var date = new Date();
		var val = date.toUTCString()

		self.prevQueries.push(val);
		localStorage[val] = JSON.stringify(new Array (self.selectedInLangs()[0], self.selectedOutLangs()[0], self.textInput())); 

	};

	/**
	 * Decodes the language ISO-639-3 codes to human-recognizable word
	 * Example (mkd -> Macedonian).
	 *
	 * @this {TranslatorViewModel}
	 * @param {string[]} langCodes Array of language codes
	 * @return {string[]} langs Array of decoded languages
	 */
	function getLangNames (langCodes){
		var langs = [];
		for (var i=0; i<langCodes.length; i++) {
			if (iso639[langCodes[i]]) {
				langs.push(iso639[langCodes[i]]);
			}
		}
		return langs;
	}

	/**
	 * Encodes the languages name to its code (ISO-639-3 standard)
	 * Exmaple (English -> eng)
	 *
	 * @this {TranslatorViewModel}
	 * @param {string} langName Language name (ex: English)
	 * @return {string} lang Language code (ex: eng)
	 */
	function getLangCode (langName) {
		for (var lang in iso639) {
			if (iso639[lang] == langName)
				return lang;
		}
	}

	dataModel.apertiumLangPairs(self.init);

}

