var http = require('http'),
	qs = require('querystring');

function handle_incoming_request(req, res) {
	var body = '';
	req.on(
		'readable',
		function () {
			var d = req.read;
			if (d) {
				if (typeof d == 'string') {
					body += d;
				} else if (typeof d == 'object' && d instanceof Buffer) {
					body += d.toString('utf8');
				}
			}
		}	
	);
	req.on(
		'end',
		function () {
			if (req.method.toLowerCase() == 'post') {
				var POST_data = qs.parse(body);
				console.log(POST_data);
			}
			res.writeHead(200, { "Content-Type" : "application/json" });
			res.end(JSON.stringify( { error: null } ) + "\n");
		}
	);
}

var s = http.createServer(handle_incoming_request);
s.listen(8080);