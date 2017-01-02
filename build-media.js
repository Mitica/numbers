'use strict';

const Metalsmith = require('metalsmith');
const changed = require('metalsmith-changed');
const sharp = require('metalsmith-sharp/dist/node4');
const path = require('path');

const source = process.env.SOURCE || 'source/media';
const dest = process.env.DEST || 'website/media';

Metalsmith(__dirname)
	.source(source)
	.destination(dest)
	.clean(false)
	.concurrency(100)
	.frontmatter(false)
	.use(changed())
	.use(sharp({
		src: '2017/*.jpg',
		namingPattern: 'original/{dir}{base}',
		methods: [],
		moveFile: false
	}))
	.use(sharp({
		src: '2017/*.jpg',
		namingPattern: 'large/{dir}{base}',
		methods: [{
			name: 'resize',
			args: [640]
		}],
		moveFile: false
	}))
	.use(sharp({
		src: '2017/*.jpg',
		namingPattern: 'medium/{dir}{base}',
		methods: [{
			name: 'resize',
			args: [420]
		}],
		moveFile: false
	}))
	.use(sharp({
		src: '2017/*.jpg',
		namingPattern: 'small/{dir}{base}',
		methods: [{
			name: 'resize',
			args: [240]
		}],
		moveFile: true
	}))
	.build(function(err) {
		if (err) {
			throw err;
		}
		console.log('Build css assets finished!');
	});
