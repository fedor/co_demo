// Promise version
var async1 = function(input) {
	return new Promise(function(resolve, reject) {
		console.log('async1, input: '+input);
		resolve(input);
	});
};

var async2 = function(input) {
	return new Promise(function(resolve, reject) {
		console.log('async2, input: '+input);

		///////////////////////
		// Ways to report error
		///////////////////////
		
		// reject(Error('error callback from sync2'));
		// return reject(Error('error callback from sync2'));
		// throw Error('throw from async2');
		resolve(input);
	});
};

var async3 = function(input) {
	return new Promise(function(resolve, reject) {
		console.log('async3, input: '+input);
		resolve(input);
	});
};

var delay = function(mil) {
	return new Promise(function(resolve, reject) {
		console.log('delay: '+mil);
		setTimeout(resolve, mil);
	});
};

var co = require('co');

co(function *() {
	try {
		var r1 = yield async1(1);
		yield delay(2000);
		var delay_promise = delay(2000);
		var r2 = yield async2(r1);
		var r3 = yield async3(r2);
		console.log('Result: '+r3);
		yield delay_promise;
		console.log('Completed: delay parallel to async2 and async3');
	} catch(e) {
		console.log('Catched! ' + e);
	}
})
// .catch(function(e) {
// 	console.log('Catched! ' + e);
// });