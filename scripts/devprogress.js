function pageRefresh () {
	location.reload();
}

function processProgressInput (val) {
	var img = $('#progressimg');
	var pVal = $('#pValue');

	if (val < 20) {
		img.attr('src','images/prog1.jpg');
	}
	else if (val < 40) {
		img.attr('src','images/prog2.jpg');
	}
	else if (val < 60) {
		img.attr('src','images/prog3.jpg');
	}
	else if (val < 80) {
		img.attr('src','images/prog4.jpg');
	}
	else if (val < 100) {
		img.attr('src','images/prog5.jpg');
	}	
	else {
		img.attr('src','images/prog6.jpg');
	}
	pVal.text (val + ' %');

}

