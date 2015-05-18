// Async version
var async1 = function(input, cb) {
	console.log('async1');
	cb(null, input);
};

var async2 = function(input, cb) {
	console.log('async2');

	///////////////////////
	// Ways to report error
	///////////////////////

	// cb(Error('error callback from sync2'));
	// return cb(Error('error callback from sync2'));
	// throw Error('throw from async2');
	cb(null, input);
};

var async3 = function(input, cb) {
	console.log('async3');
	cb(null, input);
};

var delay = function(mil, cb) {
	setTimeout(cb, mil);
};

var errorHandler = function (e) {
	console.log('Catched! ' + e);
}

try {
	async1(1, function(err, r1) {
		if (err) return errorHandler(err);
		delay(2000, function() {
			async2(r1, function(err, r2) {
				if (err) return errorHandler(err);
				async3(r2, function(err, r3) {
					if (err) return errorHandler(err);
					console.log('Result: ' + r3);
				});
			});
		});
	});
} catch(e) {
	errorHandler(e);
}