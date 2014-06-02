'use strict';

function OratorViewModel () {

 	//*****  the Translator part   *****//
	var self = this;
	var dataModel = new OratorDataModel();

	self.langsMap = ko.observableArray();

	self.inputLangs = ko.observableArray([]);
	self.outputLangs = ko.observableArray();

	self.textInput = ko.observable();
	self.textOutput = ko.observable();

	self.selectedInLangs = ko.observableArray();
	self.selectedOutLangs = ko.observableArray();

	// self.APIKEY = null;

	self.init = function (langsMap) {
		var langs = Object.keys(langsMap);

		self.langsMap (langsMap);
		console.log (self.langsMap());
		self.inputLangs (langs);
		self.outputLangs(langs);

	};

	self.updateOutputLangs = function () {
		console.log ("updateOutpuotLangs!!");
		self.outputLangs (self.langsMap()[self.selectedInLangs()[0]]);
	}
	
	self.translate = function () {
		console.log ("hello from translate " + self.inputLangs());
		
		console.log(self.outputLangs());
		

		dataModel.translate (self.selectedInLangs()[0], self.selectedOutLangs()[0], self.textInput(), function (res) {
			
			self.textOutput (res);

		});

	};

	// var apiSetter = function (apikey) {
	// 	self.APIKEY = apikey;
	// };

	//dataModel.getApiKey (apiSetter);
	dataModel.apertiumLangPairs(self.init);

}

