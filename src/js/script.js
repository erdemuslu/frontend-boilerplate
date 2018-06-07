'use strict';

const _ = require("lodash");

window.onload = function() {

	const pageName = document.querySelector('body').getAttribute('id');

	const modulesList = {
		"home": require('./helper/home')
	};

	modulesList[pageName].init();
};