/**
 * Created by Lele on 2014/11/6.
 */

function ABC () {
	this.varA = 10;
	this.varB = 20;
	this.functionA = function (var1, var2) {
		console.log(var1 + " " + var2);
	}
}

module.exports = ABC;