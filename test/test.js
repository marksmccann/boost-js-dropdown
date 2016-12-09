var assert = require('chai').assert;
var jsdom = require('mocha-jsdom');

describe('Boost JS dropdown', function () {

    jsdom()

    before(function ( done ) {
        $ = require('jquery')
        boost = require('boost-js')
        dropdown = require('../dist/dropdown.min.js')
        $.fn.dropdown = boost( dropdown.plugin, dropdown.defaults );
        done();
    });

    describe('creation', function () {

        it('should have added plugin to jQuery\'s prototype', function () {
            assert.isDefined( $.fn.dropdown );
        });

    });

    describe('instantiation', function () {

    });

    describe('settings', function () {

    });

    describe('open()', function () {

    });

    describe('close()', function () {

    });

    describe('toggle()', function () {

    });

    describe('isOpen()', function () {

    });

});