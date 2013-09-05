define([
    "../core/attributes",
    "../core/controls",
    "../core/oo"
], function (attributes, controls, oo) {

    "use strict";

    var defaultOptions = {
        effect: "None"
    };

    return oo.class(controls.Control,
    {
        constructor: function (element, options) {
            this.constructor.__super__.call(this, element, defaultOptions, options);
        },
        open: function () {
            attributes.set(this.element, "data-trendy-open", true);
            attributes.set(document.documentElement, "data-trendy-hasmodal", true);
        },
        close: function () {
            attributes.set(this.element, "data-trendy-open", false);
            attributes.set(document.documentElement, "data-trendy-hasmodal", false);
        }
    });

});
