var log = require('./log');

// Promise version
var async1 = function(input) {
	return new Promise(function(resolve, reject) {
		log('I\'m async function #1');
		resolve(++input);
	});
};

var async2 = function(input) {
	return new Promise(function(resolve, reject) {
		log('I\'m async function #2');

		///////////////////////
		// Ways to report error
		///////////////////////
		
		// reject(Error('error callback from sync2'));
		
		// return reject(Error('error callback from sync2'));
		
		// throw Error('throw from async2');

		///////////////////////
		resolve(++input);
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

var main = function* () {
	var r1 = yield async1(0);
	log('\t', 'async1 returned', r1);
	yield delay(2000);
	var r2;
	try {
		r2 = yield async2(r1);
		log('\t', 'async2 returned', r2);
	} catch (e) {
		// // continue execution
		// r2 = 2;

		// // throw another error
		// throw new Error('another error');
	}
	var r3 = yield async3(r2);
	log('\t', 'async3 returned', r3);
	log('RESULT', r3);
};

var runner = function(generator, next_value) {
	var result = generator.next(next_value);
	var value = result.value;
	
	if (result.done) {
		return;
	}

	value
		.then(function(result) {
			runner(generator, result);
		})
		.catch(function(err) {
			// var result = 
			generator.throw(err);
			// console.log('generator.throw', result);
			// runner(generator, result);
		});
};

var generator = main();
runner(generator);