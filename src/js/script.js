global.jQuery = require('jquery');
bootstrap = require('bootstrap');
mustache = require('mustache');

jQuery(document).ready(function($) {
    var jqxhr = $.getJSON('data.json', function(e) {

    }).done(function(data) {
        var template = $('#template').html(),
            showTemplate = mustache.render(template, data);
            $('#example').html(showTemplate);
    });
});