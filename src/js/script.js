'use strict';

const _ = require("lodash");

window.onload = function() {

	const pageName = document.querySelector('body').getAttribute('id');

	const erdem = () => {
		console.log('test');
	};

	erdem();

	const modulesList = {
		"home": require('./helper/home')
	};

	modulesList[pageName].init();
};