/**
 * Boost JS Dropdown
 * A style-free dropdown plugin for jQuery and Boost JS
 * @author Mark McCann (www.markmccann.me)
 * @license MIT
 * @version 0.0.1
 * @requires jQuery, boost-js
 */

(function(){

    var Dropdown = function() {
        // local instance
        var inst = this;
        // save the trigger to the instance
        inst.trigger = inst.roles['trigger'].first();
        // update attributes and add events to trigger
        inst.trigger
            .attr('role','button')
            .attr('aria-haspopup','true')
            .attr('aria-expanded','false')
            .attr('id',inst.trigger[0].id.length === 0 ? inst.id+'-trigger' : inst.trigger[0].id)
            .on('click', function(e){ 
                e.stopPropagation();
                inst.toggle(); 
            });
        // update attributes and add events to source
        inst.source
            .attr('aria-labelledby',inst.trigger[0].id)
            .attr('aria-hidden', 'true')
            .on('click', function(e){
                e.stopPropagation();
            });
        // close if outside is clicked
        $(document).on('click', function(){
            if( inst.isOpen() ) inst.close();
        });
        // run the onInit callback
        if( $.isFunction(inst.settings.onInit) ) inst.settings.onInit.call(inst);
    }

    Dropdown.prototype = {
        /**
         * opens the dropdown
         * @param  {function} callback
         * @return {object} instance
         */
        open: function( callback ) {
            // local instance
            var inst = this;
            // make sure it is hidden before opening
            if( !inst.isOpen() ) {
                // add open attributes to trigger
                inst.trigger
                    .attr( 'aria-expanded', 'true' )
                    .addClass( inst.settings.activeClass );
                // add open attributes to source
                inst.source
                    .attr('aria-hidden', 'false')
                    .addClass( inst.settings.activeClass )
                // run the callbacks
                if( $.isFunction(callback) ) callback.call(inst);
                if( $.isFunction(inst.settings.onOpen) ) inst.settings.onOpen.call(inst);
            }
            // return instance
            return inst;
        },
        /**
         * closes the dropdown
         * @param  {function} callback
         * @return {object} instance
         */
        close: function( callback ) {
            // local instance
            var inst = this;
            // make sure it is open before closing
            if( inst.isOpen() ) {
                // add closed attributes to trigger
                inst.trigger
                    .attr( 'aria-expanded', 'false' )
                    .removeClass( inst.settings.activeClass );
                // add closed attributes to source
                inst.source
                    .attr('aria-hidden', 'true')
                    .removeClass( inst.settings.activeClass )
                // run the callbacks
                if( $.isFunction(callback) ) callback.call(inst);
                if( $.isFunction(inst.settings.onClose) ) inst.settings.onClose.call(inst);
            }
            // return instance
            return inst;
        },
        /**
         * toggles the dropdown open and closed
         * @param  {function} callback
         * @return {object} instance
         */
        toggle: function( callback ) {
            return this.isOpen() ? this.close( callback ) : this.open( callback );
        },
        /**
         * determines if dropdown is visible or not
         * @return {boolean}
         */
        isOpen: function() {
            return this.source.hasClass( this.settings.activeClass );
        }
    }

    var plugin = {
        plugin: Dropdown,
        defaults: {
            activeClass: 'is-open',
            onOpen: null,
            onClose: null,
            onInit: null
        }
    }

    // if node, return via module.exports
    if (typeof require === "function" && typeof exports === "object" && typeof module === "object") {
        module.exports = plugin;
    // otherwise, save object to jquery globally
    } else if( typeof window !== 'undefined' && typeof window.$ !== 'undefined' && typeof window.$.fn.boost !== 'undefined' ) {
        window.$.fn.boost.dropdown = plugin;
    }

})();