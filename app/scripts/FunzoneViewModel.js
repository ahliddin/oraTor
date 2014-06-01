'use strict';
function FunzoneViewModel (puzzle) {

//*****  the Puzzle part   *****//
	self.guessedWords = ko.observableArray([]);
	self.showInput = ko.observable(true);
	self.puzzleAnswer = ko.observable("");
	self.funPicture = ko.observable("puzzle.png");
	var bar = 2;

	self.checkPuzzleAnswer = function () {
		self.puzzleAnswer (self.puzzleAnswer().toUpperCase());
		var ind = puzzle.indexOf(self.puzzleAnswer())
		if ( ind != -1) {
			self.guessedWords.push(self.puzzleAnswer());
			puzzle.splice(ind, 1);
			self.puzzleAnswer("");
		}
		if (self.guessedWords().length > bar) {
			self.showInput (false);
			self.funPicture ("clapping_sheldon.gif")
		}
	};

	self.backToPuzzle = function () {
		self.funPicture ("puzzle.png");
		self.showInput (true);
		bar = bar + puzzle.length;
	}

	self.finishPuzzle = function () {
		self.funPicture ("puzzle.png");
		self.showInput (true);
		bar = 2;
		puzzle = self.guessedWords();
		self.guessedWords([]);	
	}
}