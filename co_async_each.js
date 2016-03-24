// async.each() with Promise()

var handle = function(input, cb) {
	console.log('Handling '+input);
	setTimeout(function() {
		cb(null);
	}, 3000);
};

// var async = require('async');
// async.each([1,2,3,4,5], function(elem, cb) {
// 	handle(elem, cb);
// }, function(err) {
// 	console.log('done!');
// })

var co = require('co');
var bb = require('bluebird');
var handleAsync = bb.promisify(handle);
co(function *() {
	var elems = [1,2,3,4,5];
	var promises = []
	for (var i = 0; i < elems.length; i++) {
		promises.push( handleAsync(elems[i]) ); // NO yield
	}
	// All jobs are working now!
	yield promises;
	console.log('done!');
})