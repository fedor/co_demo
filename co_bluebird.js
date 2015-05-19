// CO-Bluebird version
var co = require('co');

var async1 = function(input) {
	return co(function *() {
		console.log('async1, input: '+input);
		return input;
	});
};

var async2 = function(input) {
	return co(function *() {
		console.log('async2, input: '+input);

		///////////////////////
		// Ways to report error
		///////////////////////
		
		// throw Error('throw from async2');
		return input;
	});
};

var async3 = function(input) {
	return co(function *() {
		console.log('async3, input: '+input);
		return input;
	});
};

// promisify for async version
// STEP 1: take async function
var delay = function(mil, cb) {
	setTimeout(cb, mil);
};

// STEP 2: promisify with bluebird
var bb = require('bluebird');
var delayAsync = bb.promisify(delay);

co(function *() {
	try {
		var r1 = yield async1(1);
		yield delayAsync(2000);
		var delay_promise = delayAsync(2000);
		var r2 = yield async2(r1);
		var r3 = yield async3(r2);
		console.log('Result: '+r3);
		yield delay_promise;
		console.log('Completed: delay parallel to async2 and async3');
	} catch(e) {
		console.log('Catched! ' + e);
	}
})
.catch(function(e) {
	console.log('Catched! ' + e);
});