var log = require('./log');

// Sync version
var sync1 = function(input) {
	log('I\'m sync function #1');
	return ++input;
};

var sync2 = function(input) {
	log('I\'m sync function #2');

	/////////////////////////////
	// Ways to report error
	/////////////////////////////
	
	// throw Error('from sync2');

	/////////////////////////////
	return ++input;
};

var sync3 = function(input) {
	log('I\'m sync function #3');
	return ++input;
};

function delay(time) {
	log('I\'m', time, 'ms sync delay...');
	var end_time = (new Date()).valueOf() + time;
	var now = new Date();
	while (now.valueOf() < end_time) {
		now = new Date();
	}
}

try {
	var r1 = sync1(0);
	delay(2000);
	var r2 = sync2(r1);
	var r3 = sync3(r2);
	log('Result: ' + r3);
} catch(e) {
	log('Catched! ' + e);
}