var fs = require('fs');
var async = require('async');

function load_file_contents(path, callback) {
	async.waterfall([
		function (callback) {
			fs.open(path, 'r' , callback);
		},

		// the f (file handle) was passed to the callback at the end of
		// the fs.open function call. async passes all params to us.
		function (f, callback) {
			fs.fstat(f, function (err, stats) {
				if (err) {
					// abort and go straight to resulting function
					callback(err);
				} else {
					// f and stats are passed to next in waterfall
					callback(null, f, stats);
				}
			});
		},

		function (f, stats, callback) {
			if (stats,isFile()) {
				var b = new Buffer(10000);
				fs.read(f, b, 0, 10000, null, function (err, br, buf) {
					if (err) {
						callback(err);
					} else {
						// f and string are passed to next in waterfall
						callback(null, f, b.toString('utf8', 0, br));
					}
				});
			} else {
				callback({error: "not_file", message: "Can`t load directory" });
			}
		},

		function (f, contents, callback) {
			fs.close(f, function (err) {
				if (err) {
					callback(err);
				} else {
					callback(null, contents);
				}
			});
		}
	],

	// this is called after all have executed in success
	// case, or an soon as there is an error.
	function (err, file_contents) {
		callback(err, file_contents);
	});
}


// async.series({
// 	numbers: function (callback) {
// 		setTimeout(function () {
// 			callback(null, [1, 2, 3]);	
// 		}, 1500);	
// 	},
// 	strings: function (callback) {
// 		setTimeout(function () {
// 			callback(null, ["a", "b", "c"]);
// 		}, 2000);
// 	}
// },
// function (err, results) {
// 	console.log(results);
// });


// async.parallel({

// 	numbers: function (callback) {
// 		setTimeout(function () {
// 			callback(null, [1, 2, 3]);
// 		}, 1500);
// 	},
// 	strings: function (callback) {
// 		setTimeout(function () {
// 			callback(null, ["a", "b", "c"]);
// 		}, 2000);
// 	}
// },function (err, results) {
// 	console.log(results);
// });


async.auto({
	numbers: function (callback) {
		setTimeout(function () {
			callback(null, [1, 2, 3]);
		}, 1500);
	},
	strings: function (callback) {
		setTimeout(function () {
			callback(null, ["a", "b", "c"]);
		}, 2000);
	}

	// do not execute this function until numbers and strings are done
	// thus_far is an object with numbers and strings as arrays.
	assemble: [ 'numbers', 'strings', function (callback, thus_far) {
		callback(null, {
			numbers: thus_far.numbers.join(", "),
			strings: thus_far.strings.join("', '") + "'"
		});
	}]
},
function (err, results) {
	if (err) {
		console.log(err);
	} else {
		console.log(results);
	}
});