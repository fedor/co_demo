var moment = require('moment');

module.exports = function() {
	var args = [moment().format('HH:mm:ss:')];
	Array.prototype.push.apply(args, arguments);
	console.log.apply(null, args);
};
