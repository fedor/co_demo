var log = require('./log');

var run = function(generator_function) {
	var generator = generator_function();

	// return new Promise(function(resolve, reject) {
		var runner = function(next_value) {
			// try {
				var result = generator.next(next_value);
			// } catch(e) {
			// 	reject(e);
			// 	return;
			// }

			var value = result.value;
			if (result.done) {
				// resolve(value);
				return;
			}

			value
				.then(function(result) {
					runner(result);
				})
				.catch(function(err) {
					// try {
						var result = generator.throw(err);
						runner(result);
					// } catch(e) {
					// 	reject(e);
					// }
				});
		};

		runner(generator);	
	// });
};

// Promise version
var async1 = function(input) {
	return new Promise(function(resolve, reject) {
		log('I\'m async function #1');
		resolve(++input);
	});
};

var async2 = function(input) {
	return new Promise(function(resolve, reject) {
	// return run(function* () {
		log('I\'m async function #2');

		///////////////////////
		// Ways to report error
		///////////////////////
		
		// throw Error('throw from async2');

		///////////////////////
		resolve(++input);
		// return ++input;
	});
};

var async3 = function(input) {
	return new Promise(function(resolve, reject) {
		log('I\'m async function #3');
		resolve(++input);
	});
};

var delay = function(mil) {
	return new Promise(function(resolve, reject) {
		log('I\'m', mil, 'ms async delay...');
		setTimeout(resolve, mil);
	});
};

run(function* () {
	try {
		var r1 = yield async1(0);
		log('\t', 'async1 returned', r1);
		yield delay(2000);
		var r2 = yield async2(r1);
		log('\t', 'async2 returned', r2);
		var r3 = yield async3(r2);
		log('\t', 'async3 returned', r3);
		log('RESULT', r3);
		return r3;
	} catch (e) {
		log('ERROR', e);
	}
})
// .catch(function(e) {
// 	log('Catched in main.', e);
// });
