
var shorthash = require('../index.js');

function randomNumber () {
	var min=0, max;
	switch(arguments.length) {
		case 1:
			max = arguments[0] - 1; // 一个参数的情况，不包括最大值本身，如randomNumber(10)永远取不到10
			break;
		case 2:
			min = arguments[0];
			max = arguments[1];
			break;
		case 0:
		default:
			max = 10;
			break;
	}
	return min + Math.floor(Math.random() * (max - min + 1)); // 注意＋1， 否则去不到最大值
}

function randomNumberByLength (len) {
	var min = 1, max = 1;
	len = len || 6;
	
	for( var i=0; i< len-1; ++i) {
		min += '0';
		max += '0';
	}
	max += '0';
	return randomNumber(parseInt(min, 10), parseInt(max, 10));
}

//people name, term
function randomEnglishWord (length) {
	var consonants = 'bcdfghjklmnpqrstvwxyz',
		vowels = 'aeiou',
		i, word='',
		consonants = consonants.split(''),
		vowels = vowels.split('');
	for (i=0;i<length/2;i++) {
		var randConsonant = consonants[randomNumber(consonants.length-1)],
			randVowel = vowels[randomNumber(vowels.length-1)];
		//word += (i===0) ? randConsonant.toUpperCase() : randConsonant;
		word += (i===0) ? randConsonant : randConsonant;
		word += i*2<length-1 ? randVowel : '';
	}
	return word;
}

function randomEnglishName (minlength, maxlength, prefix, suffix) {
	prefix = prefix || '';
	suffix = suffix || '';
	//these weird character sets are intended to cope with the nature of English (e.g. char 'x' pops up less frequently than char 's')
	//note: 'h' appears as consonants and vocals
	var vocals = 'aeiouyh' + 'aeiou' + 'aeiou';
	var cons = 'bcdfghjklmnpqrstvwxz' + 'bcdfgjklmnprstvw' + 'bcdfgjklmnprst';
	var allchars = vocals + cons;
	//minlength += prefix.length;
	//maxlength -= suffix.length;
	var length = randomNumber(minlength, maxlength) - prefix.length - suffix.length;
	if (length < 1) length = 1;
	//alert(minlength + ' ' + maxlength + ' ' + length);
	var consnum = 0;
	//alert(prefix);
	/*if ((prefix.length > 1) && (cons.indexOf(prefix[0]) != -1) && (cons.indexOf(prefix[1]) != -1)) {
		//alert('a');
		consnum = 2;
	}*/
	if (prefix.length > 0) {
		for (var i = 0; i < prefix.length; i++) {
			if (consnum == 2) consnum = 0;
			if (cons.indexOf(prefix[i]) != -1) {
				consnum++;
			}
		}
	}
	else {
		consnum = 1;
	}
	
	var name = prefix;
	
	for (var i = 0; i < length; i++)
	{
		//if we have used 2 consonants, the next char must be vocal.
		if (consnum == 2)
		{
			touse = vocals;
			consnum = 0;
		}
		else touse = allchars;
		//pick a random character from the set we are goin to use.
		c = touse.charAt(randomNumber(0, touse.length - 1));
		name = name + c;
		if (cons.indexOf(c) != -1) consnum++;
	}
	name = name.charAt(0).toUpperCase() + name.substring(1, name.length) + suffix;
	return name;
}

function randomChineseChar () {
	//var range = parseInt("9FFF", 16) - parseInt("4E00", 16);
	var range = 3500;
	//return '&#x' + (0x4E00 + Ytji.randomNumber(range)).toString(16) + ';';
	return unescape('%u' + (0x4E00 + randomNumber(range)).toString(16));
}

function randomChineseSentence () {
	var min=2, max;
	var endPunctuations =['。', '; ', '! ', '? ', '......'], midPunctuations = ['.','，',', ',': ','、','', '-'], str = '';
	
	switch(arguments.length) {
		case 1:
			max = arguments[0];
			break;
		case 2:
			min = arguments[0], max = arguments[1];
			break;
		case 0:
		default:
			max = 20;
	}
	
	range = randomNumber(min, max);
	
	for(var i =0; i<=range; i++){
		str += randomChineseWord();
		if( i%3 ==0 && i != range)
			str += midPunctuations[randomNumber(midPunctuations.length-1)];
	}
	
	/*
	if(randomNumber(100)<10)
		str = randomNumberByLength(randomNumber(6)).toString() + str;
	*/
	return str + endPunctuations[randomNumber(endPunctuations.length-1)];
	
}



function randomChineseWord () {
	var min = 2, max, str = '';
	var punctuations =[['“','”'],['<','>'], ['‘','’'],['[',']'],['(',')']];
	switch(arguments.length) {
		case 1:
			max = arguments[0];
			break;
		case 2:
			min = arguments[0], max = arguments[1];
			break;
		case 0:
		default:
			max = 4;
	}
	
	for(var i=0;i<randomNumber(min, max);i++)
		str += randomChineseChar();
	if(randomNumber(100)<15){
		var puncs = punctuations[randomNumber(punctuations.length-1)];
		str = puncs[0] + str + puncs[1];
	}
	return str;
}

for (var i = 0; i<10; i++) {
	var cn = randomChineseSentence(10);
	var en = randomEnglishName(6, 30);
	console.log(shorthash.unique(cn) + ' -> ' + cn);
	console.log(shorthash.unique(en) + ' -> ' + en);
	
}