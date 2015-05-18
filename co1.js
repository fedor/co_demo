// Promise version
var async1 = function(input) {
	return new Promise(function(resolve, reject) {
		console.log('async1');
		resolve(input);
	});
};

var async2 = function(input) {
	return new Promise(function(resolve, reject) {
		console.log('async2');

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
		console.log('async3');
		resolve(input);
	});
};

var sync4 = function(input) {
	console.log('sync4');
	return input;
};

var delay = function(mil) {
	return new Promise(function(resolve, reject) {
		console.log('delay');
		setTimeout(resolve, mil);
	});
};

var co = require('co');

co(function *() {
	try {
		var r1 = yield async1(1);
		yield delay(2000);
		var r2 = yield async2(r1);
		var r3 = yield async3(r2);
		var r4 = yield sync4(r3);
		console.log('Result: '+r3);
	} catch(e) {
		console.log('Catched! ' + e);
	}
})
// .catch(function(e) {
// 	console.log('Catched! ' + e);
// });