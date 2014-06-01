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

ko.applyBindings (new OratorViewModel(), document.getElementById('translator'));
ko.applyBindings (new FunzoneViewModel(puzzle), document.getElementById('funzone'));