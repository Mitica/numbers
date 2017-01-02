'use strict';

const server = require('node-static');

const file = new server.Server('./website');

require('http')
	.createServer(function(request, response) {
		request.addListener('end', function() {
			file.serve(request, response);
		}).resume();
	}).listen(8080);
