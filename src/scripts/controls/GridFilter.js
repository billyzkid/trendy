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
        grid: ".trendy-grid",
        triggerOnHover: true,
        triggerOnClick: true
    };

    return oo.class(controls.Control,
    {
        constructor: function (element, options) {
            this.constructor.__super__.call(this, "GridFilter", element, defaultOptions, options);
            
            var element = this.element;
            var gridElement = dom.query(document, this.grid);
            var triggerElement = dom.create("div", "trendy-grid-filter-trigger", element);
            var popupElement = dom.create("div", "trendy-grid-filter-popup", element);

            attributes.set(triggerElement, "aria-haspopup", true);

            // initialize cells
            for (var i = 0, l = gridElement.children.length; i < l; i++) {
                var popupChildElement = dom.create("div", popupElement);
                attributes.set(popupChildElement, "data-trendy-selected", true);
                events.add(popupChildElement, "mouseover", this.highlightCells.bind(this, i));
                events.add(popupChildElement, "click", this.selectCells.bind(this, i));
            }

            // initialize trigger events
            if (this.triggerOnHover) {
                events.add(element, "mouseenter", this.openPopup.bind(this));
                events.add(element, "mouseleave", this.closePopup.bind(this));
            }

            if (this.triggerOnClick) {
                events.add(triggerElement, "click", this.openPopup.bind(this));
                events.add(popupElement, "click", this.closePopup.bind(this));
            }

            // initialize members
            this.gridElement = gridElement;
            this.triggerElement = triggerElement;
            this.popupElement = popupElement;
        },
        isOpen: function() {
            return attributes.get(this.popupElement, "data-trendy-open") === "true";
        },
        openPopup: function () {
            if (!this.isOpen()) {
                var gridControl = controls.get(this.gridElement);
                var maxColumns = gridControl.maxColumns;
                var row = gridControl.rows - 1;
                var column = gridControl.columns - 1;

                // select matching cells
                collections.forEach(this.popupElement.children, function (childElement, childIndex) {
                    var childRow = Math.floor(childIndex / maxColumns);
                    var childColumn = childIndex - childRow * maxColumns;

                    if (childRow <= row && childColumn <= column) {
                        attributes.set(childElement, "data-trendy-selected", true);
                    } else {
                        attributes.set(childElement, "data-trendy-selected", false);
                    }
                });

                attributes.set(this.popupElement, "data-trendy-open", true);
            }
        },
        closePopup: function () {
            if (this.isOpen()) {
                attributes.set(this.popupElement, "data-trendy-open", false);
            }
        },
        highlightCells: function (index) {
            var gridControl = controls.get(this.gridElement);
            var maxColumns = gridControl.maxColumns;
            var row = Math.floor(index / maxColumns);
            var column = index - row * maxColumns;

            // highlight matching cells
            collections.forEach(this.popupElement.children, function (childElement, childIndex) {
                var childRow = Math.floor(childIndex / maxColumns);
                var childColumn = childIndex - childRow * maxColumns;

                if (childRow <= row && childColumn <= column) {
                    attributes.set(childElement, "data-trendy-highlighted", true);
                } else {
                    attributes.set(childElement, "data-trendy-highlighted", false);
                }
            });
        },
        selectCells: function (index) {
            var gridControl = controls.get(this.gridElement);
            var maxColumns = gridControl.maxColumns;
            var row = Math.floor(index / maxColumns);
            var column = index - row * maxColumns;

            // select matching cells
            collections.forEach(this.popupElement.children, function (childElement, childIndex) {
                var childRow = Math.floor(childIndex / maxColumns);
                var childColumn = childIndex - childRow * maxColumns;

                if (childRow <= row && childColumn <= column) {
                    attributes.set(childElement, "data-trendy-selected", true);
                } else {
                    attributes.set(childElement, "data-trendy-selected", false);
                }
            });

            // update grid control
            gridControl.rows = row + 1;
            gridControl.columns = column + 1;
            gridControl.update();
        }
    });

});
