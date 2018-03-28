var $ = require('jquery'),
    _ = require('lodash');

$(document).ready(() => {

    // lodash works
    const arr = _.uniq([2, 1, 2]);
    console.log(arr); 

});