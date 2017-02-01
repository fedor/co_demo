var log = require('./log');

var run = function(generatorFunction) {
	return new Promise(function(resolve, reject) {
		var generator = generatorFunction();
		var runner = function(nextValue, isError) {
			var result;
			try {
				result = isError ? generator.throw(nextValue) : generator.next(nextValue);
			} catch (e) {
				reject(e);
				return;
			}

			if (result.done) {
				resolve(result.value);
				return;
			}

			result.value
				.then(function(result) { runner(result, false) })
				.catch(function(error) { runner(error, true) });
		};

		runner(undefined, false);
	});
};

// Promise version
var async1 = function(input) {
	return run(function* () {
		log('async1, input:', input);
		return ++input;
	});
};

var async2 = function(input) {
	return run(function* () {
		log('async2, input:', input);

		///////////////////////
		// Ways to report error
		///////////////////////
		
		// throw Error('throw from async2');

		///////////////////////
		return ++input;
	});
};

var async3 = function(input) {
	return run(function* () {
		log('async3, input:', input);
		return ++input;
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

run(function* () {
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
});
