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
	self.prevSearch = ko.observableArray();
	self.selectedPrevSearch = ko.observableArray();

	// self.APIKEY = null;

	self.init = function (langsMap) {
		
		var langCodes = Object.keys(langsMap);
		self.langsAll = getLangNames(langCodes).sort();

		self.langsMap (langsMap);
		self.inputLangs (self.langsAll);
		self.prevSearch (["Previous queries"]);

		self.selectedInLangs(["English"]); // setting up the default lang
		self.updateOutputLangs();

	};

	self.updateOutputLangs = function () {
		console.log ("updateOutpuotLangs!!");
		var selCode = getLangCode (self.selectedInLangs()[0]);
		console.log(self.langsMap()[selCode]);
		var langs = getLangNames (self.langsMap()[selCode]);
		console.log (langs);
		self.outputLangs (langs);
	};

	self.updatePrevSearch = function () {
		if (self.prevSearch().length > 1) {
			
			var sel = self.selectedPrevSearch()[0];
			console.log(localStorage[sel]);
			var prev = JSON.parse(localStorage[sel]);
			console.log(prev[0]);

			self.selectedInLangs ([prev[0]]);
			self.selectedOutLangs ([prev[1]]);
			self.textInput (prev[2]);
			self.textOutput ('');
		}

	};

	self.translate = function () {
		console.log ("hello from translate " + self.inputLangs());
		
		console.log(self.outputLangs());
		
		var from = getLangCode (self.selectedInLangs()[0]);
		var to = getLangCode (self.selectedOutLangs()[0]); 
		
		dataModel.translate (from, to, self.textInput(), function (res) {
			self.textOutput (res);
		});
		
		var date = new Date();
		var val = date.toUTCString()

		self.prevSearch.push(val);
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

	// var apiSetter = function (apikey) {
	// 	self.APIKEY = apikey;
	// };

	//dataModel.getApiKey (apiSetter);
	dataModel.apertiumLangPairs(self.init);

}

