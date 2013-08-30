define([
    "../core/attributes",
    "../core/collections",
    "../core/controls",
    "../core/oo",
    "../core/styles"
], function (attributes, collections, controls, oo, styles) {

    "use strict";

    var defaultOptions = {
        transition: true,
        timing: "ease",
        duration: 450,
        delay: 20,
        rows: 3,
        columns: 3,
        maxColumns: 3
    };

    return oo.class(controls.Control,
    {
        constructor: function (elementOrId, options) {
            this.constructor.__super__.call(this, "Grid", elementOrId, defaultOptions, options);
            this.initialize();
        },
        initialize: function () {
            collections.forEach(this.element.children, this.initializeCell, this);
        },
        update: function () {
            collections.forEach(this.element.children, this.updateCell, this);
        },
        initializeCell: function (element, index) {
            if (this.transition) {
                styles.set(element, "transition", "all " + this.duration + "ms " + this.timing + " " + (index * this.delay) + "ms");
            }

            this.updateCell(element, index);
        },
        updateCell: function (element, index) {
            var row = Math.floor(index / this.maxColumns);
            var column = index - row * this.maxColumns;
            var width = 100 / this.columns;
            var height = 100 / this.rows;

            if (row < this.rows && column < this.columns) {
                attributes.set(element, "aria-hidden", false);
                styles.set(element, "top", height * row + "%");
                styles.set(element, "left", width * column + "%");
                styles.set(element, "width", width + "%");
                styles.set(element, "height", height + "%");
            } else {
                attributes.set(element, "aria-hidden", true);
            }
        }
    });

});
