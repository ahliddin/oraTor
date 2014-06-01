'use strict';

function OratorViewModel () {
	var self = this;
	var dataModel = new OratorDataModel();
	self.inputLangs = ['ad', 'adf'];
	self.init = function (langsMap) {
		var langs = Object.keys(langsMap);
		//console.log(langs);
		self.inputLangs = ko.observableArray(langs);
		console.log("self.inputLangs " + self.inputLangs());
		
		self.outputLangs = ko.observableArray();
		self.textInput = ko.observable();
		self.textOutput = ko.observable();

	};
	
	self.translate = function () {
		console.log ("hello from translate " + self.inputLangs());
		self.textOutput (self.textInput());

	};

	dataModel.apertiumLangPairs(self.init);
	
}

