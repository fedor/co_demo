var log = require('./log');

// Sync version
var sync1 = function(input) {
	log('async1, input:', input);
	return ++input;
};

var sync2 = function(input) {
	log('async2, input:', input);

	/////////////////////////////
	// Ways to report error
	/////////////////////////////
	
	// throw new Error('from sync2');

	/////////////////////////////
	return ++input;
};

var sync3 = function(input) {
	log('async3, input:', input);
	return ++input;
};

function delay(ms) {
	log('delay, ms:', ms);
	var end_time = (new Date()).valueOf() + ms;
	var now = new Date();
	while (now.valueOf() < end_time) {
		now = new Date();
	}
	log('delay: done');
}

try {
	var r1 = sync1(0);
	delay(2000);
	var r2 = sync2(r1);
	var r3 = sync3(r2);
	log('Result:', r3);
} catch(e) {
	log('Catched!', e);
}