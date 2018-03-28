var $ = require('jquery'),
    _ = require('lodash');

$(document).ready(() => {

    _([1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6, 1, 2, 3, 3, 1])
        .uniq()
        .each(function (i) {
            console.log(i);
        });
 
});