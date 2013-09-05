define([
    "../core/controls",
    "../core/dom",
    "../core/events",
    "../core/oo"
], function (controls, dom, events, oo) {

    "use strict";

    var defaultOptions = {
        dialog: ".trendy-dialog"
    };

    return oo.class(controls.Control,
    {
        constructor: function (element, options) {
            this.constructor.__super__.call(this, "DialogTrigger", element, defaultOptions, options);

            var dialogElement = dom.query(document, this.dialog);
            var dialogControl = dialogElement ? controls.get(dialogElement) : null;

            if (dialogControl) {
                events.add(this.element, "click.DialogTrigger", dialogControl.open.bind(dialogControl));
            }
        }
    });

});
