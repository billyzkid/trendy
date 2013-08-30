define([
    "../core/attributes",
    "../core/collections",
    "../core/controls",
    "../core/oo",
    "../core/styles"
], function (attributes, collections, controls, oo, styles) {

    "use strict";

    var defaultOptions = {
        rows: 3,
        columns: 3,
        maxColumns: 3
    };

    return oo.class(controls.Control,
    {
        constructor: function (elementOrId, options) {
            this.constructor.__super__.call(this, "GridSelector", elementOrId, defaultOptions, options);
            this.initialize();
        },
        initialize: function () {
            var self = this;

            this.triggerElement = dom.query(document, this.trigger);
            events.add(this.triggerElement, "click", function () {
                attributes.set(self.element, "data-trendy-open", true);
            });

            collections.forEach(this.element.children, function (childElement, index) {
                attributes.add(childElement, "data-trendy-selected");

                events.add(childElement, "mouseover", function () {
                    self.highlightCells(index);
                });

                events.add(childElement, "click", function () {
                    self.selectCells(index);
                    attributes.set(self.element, "data-trendy-open", false);
                });
            });
        },
        highlightCells: function (index) {
        },
        selectCells: function (index) {
        }
    });

});
