define([
    "../core/controls",
    "../core/oo"
], function (controls, oo) {

    "use strict";

    var defaultOptions = {
    };

    return oo.class(controls.Control,
    {
        constructor: function (element, options) {
            this.constructor.__super__.call(this, element, defaultOptions, options);
        }
    });

});
