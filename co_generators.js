// CO + generators version
var async1 = function* (input) {
	console.log('async1');
	// yield input;
	return input;
}

var async2 = function* (input) {
	console.log('async2');

	///////////////////////
	// Ways to report error
	///////////////////////
	
	// throw Error('throw from async2');
	// yield input;
	return input;
};

var async3 = function* (input) {
	console.log('async3');
	// yield input;
	return input;
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
