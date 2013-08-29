define(["../core/attributes", "../core/collections", "../core/dom", "../core/objects", "../core/styles"], function (attributes, collections, dom, objects, styles) {

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

    function Grid(elementOrId, options) {
        var element = objects.isString(elementOrId) ? dom.queryById(document, elementOrId) : elementOrId;
        attributes.set(element, "data-trendy-component", "grid");
        
        this.element = element;
        objects.extend(this, defaultOptions, options);

        this.initialize();
    };

    Grid.prototype.initialize = function () {
        collections.forEach(this.element.children, this.initializeCell, this);
    };

    Grid.prototype.update = function () {
        collections.forEach(this.element.children, this.updateCell, this);
    };

    Grid.prototype.initializeCell = function (element, index) {
        if (this.transition) {
            styles.set(element, "transition", "all " + this.duration + "ms " + this.timing + " " + (index * this.delay) + "ms");
        }

        this.updateCell(element, index);
    };

    Grid.prototype.updateCell = function (element, index) {
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
    };

    return Grid;
});
