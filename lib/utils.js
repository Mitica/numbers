'use strict';

const HtmlEntities = require('html-entities').AllHtmlEntities;
const htmlEntities = new HtmlEntities();

exports._ = require('lodash');
exports.moment = require('moment');

exports.listAsColums = function(list, columns, limit) {
	columns = columns || 2;
	const lists = {};
	let d;
	limit = 1000;
	for (let i = 0; i < list.length; i++) {
		if (i === limit) {
			continue;
		}
		d = i % columns;
		if (lists[d]) {
			lists[d].push(list[i]);
		} else {
			lists[d] = [list[i]];
		}
	}

	return lists;
};

exports.imageSrc = function(image, size) {
	size = size || 'original';
	return ['/media', size, image].join('/').replace(/\/\//g, '/');
};

exports.formatArticleTitle = function(title) {
	title = exports.htmlEncode(title);
	const result = /(\d+[.,]?\d+?)/.exec(title);
	if (result) {
		const value = result[1];
		title = title.substr(0, result.index) + '<span>' + value + '</span>' + title.substr(result.index + value.length);
	}

	return title;
};

exports.htmlEncode = function(text) {
	return htmlEntities.encode(text);
};
