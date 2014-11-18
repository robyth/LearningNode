var fs =  require('fs');

console.time("async");
fs.open(
	'info.txt','r',
	function(err,handle){
		if (err) {
			console.error("ERROR: "+err.code + " ("+err.message+")");
		} else{
			var buf = new  Buffer(100000);
			fs.read(
				handle,buf,0,100000,null,
				function(err,length){
					console.log(buf.toString('utf8',0,length));
					fs.close(handle,function(){/*don`t care*/});
					console.timeEnd("async");
				}
			);
		}
	}
);
// var file;
// var buf = new Buffer(100000);
// fs.open(
// 	'info.txt','r',
// 	function(handle){
// 		file = handle;
// 	}
// );

// fs.read(
// 	file,buf,0,100000,null,
// 	function(){
// 		console.log(buf.toString());
// 	file.close(file,function(){/*don`t care*/});
// 	}
// );