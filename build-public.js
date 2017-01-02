'use strict';

const Metalsmith = require('metalsmith');
const debug = require('metalsmith-debug');
const copy = require('metalsmith-static');

const source = process.env.SOURCE || 'source/public';
const dest = process.env.DEST || 'website';

Metalsmith(__dirname)
	.source(source)
	.destination(dest)
	.clean(false)
	.concurrency(100)
	.frontmatter(false)
	.use(debug())
	.use(copy())
	.build(function(err) {
		if (err) {
			throw err;
		}
		console.log('Build public finished!');
	});
