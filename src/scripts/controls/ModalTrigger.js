define([
    "../core/controls",
    "../core/dom",
    "../core/events",
    "../core/oo"
], function (controls, dom, events, oo) {

    "use strict";

    var defaultOptions = {
        modal: ".trendy-modal"
    };

    return oo.class(controls.Control,
    {
        constructor: function (element, options) {
            this.constructor.__super__.call(this, element, defaultOptions, options);

            var modalElement = dom.query(document, this.modal);

            if (modalElement) {
                var modalControl = controls.get(modalElement);
                events.add(this.element, "click", modalControl.open.bind(modalControl));
            }
        }
    });

});
