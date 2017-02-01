// Generators example
// Read about generator functions and generators:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*
'use strict';
var log = require('./log');

var generatorFunction = function* (input1) {
	log('Generator block #1');
	var input2 = yield 'string from generator';

	log('Generator block #2');
	var input3 = yield ++input2;

	log('Generator block #3');
	return ++input3;
};

// Not a generator, just function
function delay (time) {
	log('I\'m', time, 'ms sync delay...');
	var end_time = (new Date()).valueOf() + time;
	var now = new Date();
	while (now.valueOf() < end_time) {
		now = new Date();
	}
}

// control code
try {
	var generator = generatorFunction(0); // --> input1
	log('Generator initialized', generator, '\n');

	var r1 = generator.next();
	log('\treturned', r1, '\n');

	delay(2000);

	var r2 = generator.next(1); // --> input2
	// generator.throw('some error');
	log('\treturned', r2, '\n');

	var r3 = generator.next(2); // --> input3
	log('\treturned', r3, '\n');

	var r4 = generator.next();
	log('\treturned', r4, '\n');
} catch (e) {
	log('Catched! ' + e);
}
