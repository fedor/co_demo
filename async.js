var log = require('./log');

// Async version
var async1 = function(input, cb) {
	log('async1, input:', input);
	cb(null, ++input);
};

var async2 = function(input, cb) {
	log('async2, input:', input);

	///////////////////////
	// Ways to report error
	///////////////////////

	// cb(Error('error callback from sync2'));
	// return cb(Error('error callback from sync2'));
	// throw new Error('throw from async2');

	///////////////////////

	cb(null, ++input);
};

var async3 = function(input, cb) {
	log('async3, input:', input);
	cb(null, ++input);
};

var delay = function(ms, cb) {
	log('delay, ms:', ms);
	setTimeout(
		function() {
			log('delay: done');
			cb();
		},
		ms
	);
};

var errorHandler = function (e) {
	log('Catched!', e);
}

try {
	async1(0, function(err, r1) {
		if (err) {
			return errorHandler(err);
		}

		delay(2000, function() {
			async2(r1, function(err, r2) {
				if (err) {
					return errorHandler(err);
				}

				async3(r2, function(err, r3) {
					if (err) {
						return errorHandler(err);
					}

					log('Result:', r3);
				});
			});
		});
	});
} catch(e) {
	errorHandler(e);
}