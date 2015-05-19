// Promise version
var async1 = function* (input) {
	console.log('async1');
	yield input;
};

var async2 = function* (input) {
	console.log('async2');

	///////////////////////
	// Ways to report error
	///////////////////////
	
	// throw Error('throw from async2');
	yield input;
};

var async3 = function* (input) {
	console.log('async3');
	yield input;
};

// Not a generator, still Promise
var delay = function(mil) {
	return new Promise(function(resolve, reject) {
		setTimeout(resolve, mil);
	});
};

var errorHandler = function (e) {
	console.log('Catched! ' + e);
}

try {
	var r1 = async1(1).next().value;
	delay(2000).then(function() {
		try {
			var r2 = async2(r1).next().value;
			var r3 = async3(r2).next().value;
			console.log('Result: ' + r3);
		} catch (e) {
			errorHandler(e);
		}
	});
} catch (e) {
	errorHandler(e);
}