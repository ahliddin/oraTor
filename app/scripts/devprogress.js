function processProgressInput (val) {
	var img = $('#progressimg');
	var pVal = $('#pValue');

	if (val < 25) {
		img.attr('src','images/prog1.jpg');
	}
	else if (val < 40) {
		img.attr('src','images/prog2.jpg');
	}
	else if (val < 60) {
		img.attr('src','images/prog3.jpg');
	}
	pVal.text (val + ' %');

}