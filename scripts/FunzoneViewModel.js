'use strict';

/**
 * Creates an instance of FunzoneViewModel.
 *
 * @constructor
 * @this {FunzoneViewModel}
 *
 */

function FunzoneViewModel (puzzle) {
	self = this;
//*****  the Puzzle part   *****//
	self.guessedWords = ko.observableArray([]);
	self.showInput = ko.observable(true);
	self.puzzleAnswer = ko.observable("");
	self.funPicture = ko.observable("puzzle.png");
	var bar = 2;

	/**
	 * Checks the correctnes of answer to puzzle
	 *
	 * @this {FunzoneViewModel}
	 * @param {void} void No param
	 * @return {void} void No return value, the UI is updated by KO
	 */
	self.checkPuzzleAnswer = function () {
		self.puzzleAnswer (self.puzzleAnswer().toUpperCase());
		var ind = puzzle.indexOf(self.puzzleAnswer());
		if ( ind != -1) {
			self.guessedWords.push(self.puzzleAnswer());
			puzzle.splice(ind, 1);
			self.puzzleAnswer("");
		}
		if (self.guessedWords().length > bar) {
			self.showInput (false);
			self.funPicture ("clapping_sheldon.gif");
		}
	};

	/**
	 * Changes back the picture of Sheldon to puzzle
	 *
	 * @this {FunzoneViewModel}
	 */
	self.backToPuzzle = function () {
		self.funPicture ("puzzle.png");
		self.showInput (true);
		bar = bar + puzzle.length;
	};

	/**
	 * Removes the guessed words of puzzle, returns to original state.
	 *
	 * @this {FunzoneViewModel}
	 */
	self.finishPuzzle = function () {
		self.funPicture ("puzzle.png");
		self.showInput (true);
		bar = 2;
		puzzle = self.guessedWords();
		self.guessedWords([]);	
	};
}