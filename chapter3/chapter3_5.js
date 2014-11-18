// function compute_intersection(arr1, arr2, callback) {
// 	console.time("comp1");
// 	var results = [];
// 	for (var i = 0; i < arr1.length; i++) {
// 		for (var j = 0; j < arr2.length; j++) {
// 			if (arr2[j] == arr1[i]) {
// 				results[results.length] = arr1[j];
// 			}
// 		}
// 	}
// 	console.timeEnd("comp1");
// 	callback(null, results);	// no error, pass in results!
// }

function compute_intersection(arr1, arr2, callback) {
	console.time("comp2");
	// let`s break up the bigger of the two arrays
	var bigger = arr1.length > arr2.length ? arr1 : arr2;
	var smaller = bigger == arr1 ? arr2 : arr1;
	var biglen = bigger.length;
	var smlen = smaller.length;

	var sidx = 0;		// starting index of any chunk
	var size = 10;		// chunk size, can adjust!
	var results = [];	// ntermediate results

	// for each chunk of "size" elements in bigger, search through smaller
	function sub_compute_intersection() {
		for (var i = sidx; i < (sidx + size) && i < biglen; i++) {
			for (var j = 0; j < smlen; j++) {
				if (bigger[i] == smaller[j]) {
					results.push(smaller[j]);
					break;
				}
			}
		}

		if (i >= biglen) {
			console.timeEnd("comp2");
			callback(null,results);		// no error, send back results
		} else {
			sidx += size;
			process.nextTick(sub_compute_intersection);
		}
	}

	sub_compute_intersection();
}

// 测试代码
var a1 = [3476,2457,7547,34523,3,6,7,2,77,28,2345,
			7623457,2347,23572457,237457,234869,237,
			24572457524];
var a2 = [3476,7563545,84484,3456,2345,34,245,5484848,3456,
			545,151,156874,232145,21251514584,354545545,8484835,545848,
			54545,6454,6,56456465,235848,354546584,3544,54584,51451,311113,
			547,3,5454,3545,585,545894,984848,5448,345649,3254,214545454545,
			1515];

compute_intersection(a1,a2, function (err, results) {
	if (err) {
		console.log(err);
	} else {
		console.log(results);
	}
});