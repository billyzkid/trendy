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

            var overlayElement = dom.create("div", "trendy-dialog-overlay");
            var confirmElement = dom.query(this.element, ".trendy-dialog-confirm-button");
            var cancelElement = dom.query(this.element, ".trendy-dialog-cancel-button");

            // insert overlay element
            dom.insertAfter(overlayElement, this.element);

            // initialize dialog button events
            if (confirmElement) {
                events.add(confirmElement, "click.Dialog", this.confirm.bind(this));
            }

            if (cancelElement) {
                events.add(cancelElement, "click.Dialog", this.cancel.bind(this));
            }

            // set the effect
            if (this.effect) {
                attributes.set(this.element, "data-trendy-effect", this.effect);
            }

            // allow dialog focus
            this.element.tabIndex = -1;
        },
        open: function () {
            attributes.set(this.element, "data-trendy-open", true);
            attributes.set(document.documentElement, "data-trendy-hasdialog", true);
            attributes.set(document.documentElement, "data-trendy-hasdialog-effect", this.effect);
            this.focus();
        },
        close: function () {
            attributes.set(this.element, "data-trendy-open", false);
            attributes.remove(document.documentElement, "data-trendy-hasdialog");
            attributes.remove(document.documentElement, "data-trendy-hasdialog-effect");
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
