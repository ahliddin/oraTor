'use strict';

function OratorViewModel () {

 	//*****  the Translator part   *****//
	var self = this;
	var dataModel = new OratorDataModel();

	self.langsMap = ko.observableArray();

	//from and to languages for <select>
	self.inputLangs = ko.observableArray();
	self.outputLangs = ko.observableArray();
	self.selectedInLangs = ko.observableArray();
	self.selectedOutLangs = ko.observableArray();

	//text translated and to be translated
	self.textInput = ko.observable();
	self.textOutput = ko.observable();


	//previous translations from localStorage
	self.prevQueries = ko.observableArray();
	self.queryToShow = ko.observable();


	self.init = function (langsMap) {
		
		var langCodes = Object.keys(langsMap);
		self.langsAll = getLangNames(langCodes).sort();

		self.langsMap (langsMap);
		self.inputLangs (self.langsAll);

		self.selectedInLangs(["English"]); // setting up the default lang
		self.updateOutputLangs();
		self.selectedOutLangs(["Spanish"]); // setting up the default lang

	};

	self.updateOutputLangs = function () {
		var selCode = getLangCode (self.selectedInLangs()[0]);
		var langs = getLangNames (self.langsMap()[selCode]);
		
		self.outputLangs (langs);
	};

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

	self.removeQuery = function () {
		delete window.localStorage[this];
		self.prevQueries.remove(this);
		self.queryToShow('');
	};

	self.clearHistory = function () {
		self.prevQueries([]);
		localStorage.clear();
		self.queryToShow('');
	};

	self.resQueryToShow = function () {
		self.queryToShow('');
	};

	self.translate = function () {
		
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

	function getLangNames (langCodes){
		var langs = [];
		for (var i=0; i<langCodes.length; i++) {
			if (iso639[langCodes[i]]) {
				langs.push(iso639[langCodes[i]]);
			}
		}
		return langs;
	}

	function getLangCode (langName) {
		for (var lang in iso639) {
			if (iso639[lang] == langName)
				return lang;
		}
	}

	dataModel.apertiumLangPairs(self.init);

}

