'use strict';

require('./build-content');

setTimeout(function() {
	require('./build-assets');
	require('./build-media');
	require('./build-public');
}, 1000 * 2);
