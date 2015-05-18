// Sync version
var sync1 = function(input) {
	console.log('sync1');
	return input;
};

var sync2 = function(input) {
	console.log('sync2');

	///////////////////////
	// Ways to report error
	///////////////////////
	
	// throw Error('from sync2');
	return input;
};

var sync3 = function(input) {
	console.log('sync3');
	return input;
};

function delay(time) {
	var d1 = new Date();
	var d2 = new Date();
	while (d2.valueOf() < d1.valueOf() + time) {
		d2 = new Date();
	}
}

try {
	var r1 = sync1(1);
	delay(2000);
	var r2 = sync2(r1);
	var r3 = sync3(r2);
	console.log('Result: ' + r3);
} catch(e) {
	console.log('Catched! ' + e);
}