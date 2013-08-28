define(["../core/classes", "../core/collections", "../core/dom", "../core/objects", "../core/styles"], function (classes, collections, dom, objects, styles) {

    "use strict";

    var defaultOptions = {
        transition: false,
        duration: 300,
        delay: 0,
        rows: 3,
        columns: 3,
        maxColumns: 3
    };

    function Grid(elementOrId, options) {
        this.element = objects.isString(elementOrId) ? dom.queryById(document, elementOrId) : elementOrId;
        objects.extend(this, defaultOptions, options);

        styles.set(this.element, "display", "block");
        styles.set(this.element, "position", "relative");
        styles.set(this.element, "overflow", "hidden");
        styles.set(this.element, "backface-visibility", "hidden");
                   
        if (this.transition) {
            var duration = this.duration;
            var delay = this.delay;

            collections.forEach(this.element.children, function (childElement, index) {
                styles.set(childElement, "transition", "all " + duration + "ms " + (index * delay) + "ms");
            });
        }

        this.update();
    };

    Grid.prototype.update = function () {
        var self = this;

        collections.forEach(this.element.children, function (element, index) {
            var row = Math.floor(index / self.maxColumns);
            var column = index - row * self.maxColumns;
            var width = 100 / self.columns;
            var height = 100 / self.rows;

            if (row < self.rows && column < self.columns) {
                styles.set(element, "position", "absolute");
                styles.set(element, "z-index", "999");
                styles.set(element, "top", height * row + "%");
                styles.set(element, "left", width * column + "%");
                styles.set(element, "width", width + "%");
                styles.set(element, "height", height + "%");
                styles.set(element, "opacity", null);
                styles.set(element, "visibility", null);
                styles.set(element, "transform", null);
            } else {
                styles.set(element, "position", "absolute");
                styles.set(element, "z-index", null);
                styles.set(element, "opacity", "0");
                styles.set(element, "visibility", "hidden");
                styles.set(element, "transform", "scale(0.6) rotate(45deg)");
            }
        });
    };

    return Grid;
});
