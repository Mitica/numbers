'use strict';

const Metalsmith = require('metalsmith');
const less = require('metalsmith-less');
const cleancss = require('metalsmith-clean-css');
const ignore = require('metalsmith-ignore');
const branch = require('metalsmith-branch');
const path = require('path');

const source = process.env.SOURCE || 'assets';
const dest = process.env.DEST || 'website/assets';

Metalsmith(__dirname)
	.source(source)
	.destination(dest)
	.clean(true)
	.concurrency(100)
	.frontmatter(false)
	// build css
	.use(less({
		pattern: ['css/main.less'],
		useDynamicSourceMap: false,
		render: {
			paths: [
				path.join(__dirname, 'assets/css')
			]
		}
	}))
	.use(ignore(['**/*.less']))
	.use(cleancss())
	.build(function(err) {
		if (err) {
			throw err;
		}
		console.log('Build css assets finished!');
	});
