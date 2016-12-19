var assert = require('chai').assert;
var jsdom = require('mocha-jsdom');

var template = {
    default: '<a href="#dropdown" data-role="trigger"></a>'+
    '<ul id="dropdown"><li></li><li></li><li></li></ul>',
    activeClass: '<a href="#dropdown" data-role="trigger"></a>'+
    '<ul id="dropdown" data-active-class="foo-bar"><li></li><li></li><li></li></ul>'
}

describe('Boost JS Dropdown', function () {

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

        var inst;

        before(function ( done ) {
            document.body.innerHTML = template.default;
            inst = $('#dropdown').dropdown();
            done();
        });

        it('should save a jquery object with the trigger element in it.', function () {
            assert.isDefined( inst.trigger );
            assert.instanceOf( inst.trigger, $ );
            assert.lengthOf( inst.trigger, 1 );
            assert.match(inst.trigger[0].nodeName, /A/);
        });

    });

    describe('settings', function () {

        it('should be able to update \'activeClass\' setting from instantiation', function () {
            document.body.innerHTML = template.default;
            var inst = $('#dropdown').dropdown({activeClass:'foo-bar'}).open();
            assert.match( inst.trigger[0].className, /foo-bar/ );
            assert.match( inst.source[0].className, /foo-bar/ );
        });

        it('should be able to update \'activeClass\' setting from html', function () {
            document.body.innerHTML = template.activeClass;
            var inst = $('#dropdown').dropdown().open();
            assert.match( inst.trigger[0].className, /foo-bar$/ );
            assert.match( inst.source[0].className, /foo-bar$/ );
        });

        it('should be able to add function to \'onInit\' setting', function () {
            document.body.innerHTML = template.default;
            var inst = $('#dropdown').dropdown({
                onInit: function() {
                    this.test = "foo";
                }
            });
            assert.match( inst.test, /foo/ );
        });

        it('should be able to add function to \'onOpen\' setting', function () {
            document.body.innerHTML = template.default;
            var inst = $('#dropdown').dropdown({
                onOpen: function() {
                    this.test = "bar";
                }
            });
            inst.open();
            assert.match( inst.test, /bar/ );
        });

        it('should be able to add function to \'onClose\' setting', function () {
            document.body.innerHTML = template.default;
            var inst = $('#dropdown').dropdown({
                onClose: function() {
                    this.test = "bar";
                }
            });
            inst.open().close();
            assert.match( inst.test, /bar/ );
        });

    });

    describe('open()', function () {

        it('should update attributes on trigger element', function () {
            document.body.innerHTML = template.default;
            var inst = $('#dropdown').dropdown();
            assert.match( inst.trigger.attr('aria-expanded'), /false/ );
            assert.isFalse( inst.trigger.hasClass('is-open') );
            inst.open();
            assert.match( inst.trigger.attr('aria-expanded'), /true/ );
            assert.isTrue( inst.trigger.hasClass('is-open') );
        });

        it('should update attributes on source element', function () {
            document.body.innerHTML = template.default;
            var inst = $('#dropdown').dropdown();
            assert.match( inst.source.attr('aria-hidden'), /true/ );
            assert.isFalse( inst.source.hasClass('is-open') );
            inst.open();
            assert.match( inst.source.attr('aria-hidden'), /false/ );
            assert.isTrue( inst.source.hasClass('is-open') );
        });

        it('should run callback function from parameter', function () {
            document.body.innerHTML = template.default;
            var inst = $('#dropdown').dropdown();
            inst.open( function(){
                this.test = "foo";
            });
            assert.match( inst.test, /foo/ );
        });

    });

    describe('close()', function () {

        it('should update attributes on trigger element', function () {
            document.body.innerHTML = template.default;
            var inst = $('#dropdown').dropdown().open();
            assert.match( inst.trigger.attr('aria-expanded'), /true/ );
            assert.isTrue( inst.trigger.hasClass('is-open') );
            inst.close();
            assert.match( inst.trigger.attr('aria-expanded'), /false/ );
            assert.isFalse( inst.trigger.hasClass('is-open') );
        });

        it('should update attributes on source element', function () {
            document.body.innerHTML = template.default;
            var inst = $('#dropdown').dropdown().open();
            assert.match( inst.source.attr('aria-hidden'), /false/ );
            assert.isTrue( inst.source.hasClass('is-open') );
            inst.close();
            assert.match( inst.source.attr('aria-hidden'), /true/ );
            assert.isFalse( inst.source.hasClass('is-open') );
        });

        it('should run callback function from parameter', function () {
            document.body.innerHTML = template.default;
            var inst = $('#dropdown').dropdown().open();
            inst.close( function(){
                this.test = "foo";
            });
            assert.match( inst.test, /foo/ );
        });

    });

    describe('toggle()', function () {

        it('should open modal if it is closed', function () {
            document.body.innerHTML = template.default;
            var inst = $('#dropdown').dropdown();
            assert.isFalse( inst.source.hasClass('is-open') );
            inst.toggle();
            assert.isTrue( inst.source.hasClass('is-open') );
        });

        it('should close dropdown if it is open', function () {
            document.body.innerHTML = template.default;
            var inst = $('#dropdown').dropdown().open();
            assert.isTrue( inst.source.hasClass('is-open') );
            inst.toggle();
            assert.isFalse( inst.source.hasClass('is-open') );
        });

        it('should run callback function from parameter', function () {
            document.body.innerHTML = template.default;
            var inst = $('#dropdown').dropdown();
            inst.toggle( function(){
                this.test = "foo";
            });
            assert.match( inst.test, /foo/ );
        });

    });

    describe('isOpen()', function () {

        it('should return true if dropdown is open', function () {
            document.body.innerHTML = template.default;
            var inst = $('#dropdown').dropdown().open();
            assert.isTrue( inst.isOpen() );
        });

        it('should return false if dropdown is closed', function () {
            document.body.innerHTML = template.default;
            var inst = $('#dropdown').dropdown();
            assert.isFalse( inst.isOpen() );
        });

    });

});
