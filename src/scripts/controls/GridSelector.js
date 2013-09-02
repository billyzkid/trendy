define([
    "../core/attributes",
    "../core/collections",
    "../core/controls",
    "../core/dom",
    "../core/events",
    "../core/oo"
], function (attributes, collections, controls, dom, events, oo) {

    "use strict";

    var defaultOptions = {
        rows: 3,
        columns: 3,
        maxColumns: 3,
        grid: '.trendy-grid'
    };

    return oo.class(controls.Control,
    {
        constructor: function (element, options) {
            this.constructor.__super__.call(this, "GridSelector", element, defaultOptions, options);
            
            this.gridElement = dom.query(document, this.grid);
            this.triggerElement = dom.query(this.element, ".trendy-grid-selector-trigger");
            this.popupElement = dom.query(this.element, ".trendy-grid-selector-popup");

            this.initialize();
        },
        initialize: function () {
            var self = this;

            // open selector when trigger clicked
            events.add(this.triggerElement, "click", function () {
                attributes.set(self.popupElement, "data-trendy-open", true);

            });

            // close selector when element clicked
            events.add(this.popupElement, "click", function () {
                attributes.set(self.popupElement, "data-trendy-open", false);
            });

            collections.forEach(this.popupElement.children, this.initializeCell, this);
        },
        initializeCell: function (element, index) {
            attributes.set(element, "data-trendy-selected", true);
            events.add(element, "mouseover", this.highlightCells.bind(this, index));
            events.add(element, "click", this.selectCells.bind(this, index));
        },
        highlightCells: function (index) {
            var row = Math.floor(index / this.maxColumns);
			var column = index - row * this.maxColumns;

            // highlight matching cells
            collections.forEach(this.popupElement.children, function (childElement, childIndex) {
                var childRow = Math.floor(childIndex / this.maxColumns);
                var childColumn = childIndex - childRow * this.maxColumns;

                if (childRow <= row && childColumn <= column) {
                    attributes.set(childElement, "data-trendy-highlighted", true);
                } else {
                    attributes.set(childElement, "data-trendy-highlighted", false);
                }
            }, this);
        },
        selectCells: function (index) {
            var grid = controls.get(this.gridElement);
            var row = Math.floor(index / this.maxColumns);
            var column = index - row * this.maxColumns;

            // select matching cells
            collections.forEach(this.popupElement.children, function (childElement, childIndex) {
                var childRow = Math.floor(childIndex / this.maxColumns);
                var childColumn = childIndex - childRow * this.maxColumns;

                if (childRow <= row && childColumn <= column) {
                    attributes.set(childElement, "data-trendy-selected", true);
                } else {
                    attributes.set(childElement, "data-trendy-selected", false);
                }
            }, this);

            // update grid control
            grid.rows = this.rows = row + 1;
            grid.columns = this.columns = column + 1;
            grid.update();
        }
    });

});
