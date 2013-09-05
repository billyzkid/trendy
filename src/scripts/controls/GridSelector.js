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
        grid: ".trendy-grid"
    };

    return oo.class(controls.Control,
    {
        constructor: function (element, options) {
            this.constructor.__super__.call(this, element, defaultOptions, options);
            
            // initialize members
            this.gridElement = dom.query(document, this.grid);
            this.triggerElement = dom.query(this.element, ".trendy-grid-selector-trigger");
            this.popupElement = dom.query(this.element, ".trendy-grid-selector-popup");

            // initialize events
            events.add(this.triggerElement, "click", this.openPopup.bind(this));
            events.add(this.popupElement, "click", this.closePopup.bind(this));

            // initialize cells
            collections.forEach(this.popupElement.children, this.initializeCell, this);
        },
        openPopup: function () {
            attributes.set(this.popupElement, "data-trendy-open", true);
        },
        closePopup: function () {
            attributes.set(this.popupElement, "data-trendy-open", false);
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
