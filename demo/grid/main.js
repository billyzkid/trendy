require({ baseUrl: "../../src/scripts" }, ["core/collections", "core/dom", "core/events", "components/Grid"], function (collections, dom, events, Grid) {

    "use strict";

    var gridOptions = {
        transition: true,
        duration: 450,
        delay: 20,
        rows: 5,
        columns: 5,
        maxColumns: 5
    };

    dom.ready(function () {
        var buttonElements = dom.queryAll(document, "button");
        var gridElement = dom.query(document, ".grid");
        var grid = new Grid(gridElement, gridOptions);

        collections.forEach(buttonElements, function (element, index) {
            events.add(element, "click", function () {
                grid.rows = Math.floor(index / grid.maxColumns) + 1;
                grid.columns = index - (grid.rows - 1) * grid.maxColumns + 1;
                grid.update();
            });
        });
    });
});
