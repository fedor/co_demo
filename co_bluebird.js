// co-bluebird version
var co = require('co');
var log = require('./log');

var async1 = function(input) {
	return co(function *() {
		log('async1, input:', input);
		return ++input;
	});
};

var async2 = function(input) {
	return co(function *() {
		log('async2, input:', input);

		///////////////////////
		// Ways to report error
		///////////////////////
		
		// throw new Error('throw from async2');

		///////////////////////
		return ++input;
	});
};

var async3 = function(input) {
	return co(function *() {
		log('async3, input:', input);
		return ++input;
	});
};

// promisify for async version
// STEP 1: create async function with default callback interface
var delay = function(ms, cb) {
	log('delay, ms:', ms);
	setTimeout(
		function() {
			log('delay: done');
			cb();
		},
		ms
	);
};

// STEP 2: promisify with bluebird
var bb = require('bluebird');
var delayAsync = bb.promisify(delay);

co(function *() {
	try {
		var r1 = yield async1(0);
		yield delayAsync(2000);
		var delayPromise = delayAsync(2000);
		var r2 = yield async2(r1);
		var r3 = yield async3(r2);
		log('Result:', r3);
		yield delayPromise;
		log('Completed: delay parallel to async2 and async3');
	} catch(e) {
		log('Catched!', e);
	}
})
.catch(function(e) {
	log('Catched! ' + e);
});