var log = require('./log');

var runner = function(generator, nextValue, isError) {
	var result = isError ? generator.throw(nextValue) : generator.next(nextValue);
	if (result.done) {
		return;
	}

	result.value
		.then(function(result) { runner(generator, result, false) })
		.catch(function(error) { runner(generator, error, true) });
};

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
		// Ways to report an error
		///////////////////////
		
		// reject(new Error('error callback from sync2'));
		// return reject(new Error('error callback from sync2'));
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

var generatorFunction = function* () {
	try {
		var r1 = yield async1(0);
		yield delay(2000);
		var r2 = yield async2(r1);
		var r3 = yield async3(r2);
		log('RESULT', r3);
		return r3;
	} catch (e) {
		log('ERROR', e);
	}
};

var generator = generatorFunction()
runner(generator)
