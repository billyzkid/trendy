define(["exports", "classes", "collections", "dom", "objects", "styles"], function (ui, classes, collections, dom, objects, styles) {

    "use strict";

    var defaultOptions = {
        transition: false,
        duration: 300,
        delay: 0,
        rows: 3,
        columns: 3,
        maxColumns: 3
    };

    ui.Grid = function (elementOrId, options) {
        var self = this;

        this.element = objects.isString(elementOrId) ? dom.queryById(document, elementOrId) : elementOrId;
        objects.extend(this, defaultOptions, options);

        this.update();

        if (this.transition) {
            setTimeout(function () {
                collections.forEach(self.element.children, function (childElement, index) {
                    styles.set(childElement, "transition", "all " + self.duration + "ms " + (index * self.delay) + "ms");
                });
            });
        }
    };

    ui.Grid.prototype.update = function () {
        var self = this;

        collections.forEach(this.element.children, function (element, index) {
            var row = Math.floor(index / self.maxColumns);
            var column = index - row * self.maxColumns;
            var width = 100 / self.columns;
            var height = 100 / self.rows;

            if (row < self.rows && column < self.columns) {
                styles.set(element, "top", height * row + "%");
                styles.set(element, "left", width * column + "%");
                styles.set(element, "width", width + "%");
                styles.set(element, "height", height + "%");

                classes.remove(element, "hidden");
                classes.add(element, "visible");
            } else {
                classes.remove(element, "visible");
                classes.add(element, "hidden");
            }
        });
    };

});
