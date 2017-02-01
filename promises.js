var log = require('./log');

// Promise version
var async1 = function(input) {
	return new Promise(function(resolve, reject) {
		log('async1, input:', input);
		resolve(++input);
	});
};

var async2 = function(input) {
	return new Promise(function(resolve, reject) {
		log('async2, input:', input);

		///////////////////////
		// Ways to report error
		///////////////////////
		
		// reject(Error('error callback from sync2'));
		// return reject(Error('error callback from sync2'));
		// throw new Error('throw from async2');

		///////////////////////
		resolve(++input);
	});
};

var async3 = function(input) {
	return new Promise(function(resolve, reject) {
		log('async3, input:', input);
		resolve(++input);
	});
};

var delay = function(ms) {
	return new Promise(function(resolve, reject) {
		log('delay, ms:', ms);
		setTimeout(
			function() {
				log('delay: done');
				resolve();
			},
			ms
		);
	});
};

async1(0)
	.then(function(r1) {
		return delay(2000)
			.then(function() {
				return async2(r1);
			});
	})
	.then(function(r3) {
		return async3(r3);
	})
	.then(function(r4) {
		log('Result:', r4);
	})
	.catch(function(e) {
		log('Catched!', e);
	});
