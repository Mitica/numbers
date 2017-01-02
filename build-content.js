'use strict';

const Metalsmith = require('metalsmith');
const debug = require('metalsmith-debug');
const markdown = require('metalsmith-markdown');
const layouts = require('metalsmith-layouts');
const tags = require('metalsmith-tags');
// const categories = require('./lib/plugin-categories');
const metadata = require('metalsmith-metadata');
const collections = require('metalsmith-collections');
const moment = require('metalsmith-moment');
const excerpts = require('metalsmith-excerpts');
const copy = require('metalsmith-static');
// const clean = require('./lib/plugin-clean');

const source = process.env.SOURCE || 'source/content';
const dest = process.env.DEST || 'website';
const links = require('urlset')('sitemap.json');
const utils = require('./lib/utils');

Metalsmith(__dirname)
	.source(source)
	.destination(dest)
	.clean(true)
	.concurrency(100)
	.frontmatter(true)
	.use(debug())
	.use(metadata({
		site: 'site.yaml'
	}))
	// .use(clean())
	.use(moment(['published', 'modified', 'date', 'created']))
	.use(markdown({
		smartypants: true,
		gfm: true,
		tables: true
	}))
	.use(excerpts())
	.use(collections({
		articles: {
			sortBy: 'date',
			reverse: true,
			limit: 30
		},
		randomArticles: {
			pattern: '*/*.html',
			limit: 30
		}
	}))
	// .use(categories())
	.use(tags({
		handle: 'categories',
		path: ':tag/index.html',
		layout: 'category.pug',
	}))
	.use(tags({
		handle: 'tags',
		path: 'tags/:tag.html',
		layout: 'tag.pug',
	}))
	.use(layouts({
		engine: 'pug',
		directory: 'templates',
		default: 'article.pug',
		links: links,
		utils: utils,
		currentTime: utils.moment()
	}))
	.build(function(err) {
		if (err) {
			throw err;
		}
		console.log('Build finished!');
	});
