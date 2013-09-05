define([
    "../core/attributes",
    "../core/controls",
    "../core/dom",
    "../core/events",
    "../core/oo"
], function (attributes, controls, dom, events, oo) {

    "use strict";

    var defaultOptions = {
        effect: null
    };

    return oo.class(controls.Control,
    {
        constructor: function (element, options) {
            this.constructor.__super__.call(this, "Dialog", element, defaultOptions, options);

            // set the effect
            attributes.set(this.element, "data-trendy-effect", this.effect);

            // initialize dialog button events
            var confirmElement = dom.query(this.element, ".trendy-dialog-confirm-button");
            var cancelElement = dom.query(this.element, ".trendy-dialog-cancel-button");

            if (confirmElement) {
                events.add(confirmElement, "click.Dialog", this.confirm.bind(this));
            }

            if (cancelElement) {
                events.add(cancelElement, "click.Dialog", this.cancel.bind(this));
            }

            // allow dialog focus
            this.element.tabIndex = -1;
        },
        open: function () {
            attributes.set(this.element, "data-trendy-open", true);
            attributes.set(document.documentElement, "data-trendy-hasdialog", true);
            this.focus();
        },
        close: function () {
            attributes.set(this.element, "data-trendy-open", false);
            attributes.set(document.documentElement, "data-trendy-hasdialog", false);
            this.blur();
        },
        confirm: function () {
            events.fire(this, "confirm");
            this.close();
        },
        cancel: function () {
            events.fire(this, "cancel");
            this.close();
        },
        focus: function () {
            this.lastActiveElement = document.activeElement;
            this.element.focus();
        },
        blur: function () {
            if (this.lastActiveElement !== document.activeElement) {
                this.lastActiveElement.focus();
            } else {
                this.element.blur();
            }
        }
    });

});
