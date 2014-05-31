'use strict';

function OratorViewModel () {
	this.inputLangs = ko.observableArray(['Tajikistan', 'Moldova', 'Czech Republic']);


}

ko.applyBindings (new OratorViewModel());