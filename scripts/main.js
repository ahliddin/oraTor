$(document).ready(function() {
	var puzzle=['JAVA',
				'JAVASCRIPT',
				'KNOCKOUTJS',
				'PERL',
				'PYTHON',
				'NODEJS',
				'ANGULARJS',
				'COBOL',
				'PASCAL',
				'ASSEMBLER'];

	ko.applyBindings (new TranslatorViewModel(), document.getElementById('translator'));
	ko.applyBindings (new FunzoneViewModel(puzzle), document.getElementById('funzone'));
});