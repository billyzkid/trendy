//require({ baseUrl: "../../src/scripts" }, ["core/collections", "core/dom", "core/events", "components/Grid"], function (collections, dom, events, Grid) {
require({ baseUrl: "../../src/scripts" }, ["./trendy"], function (trendy) {

    "use strict";

    var gridOptions = {
        rows: 5,
        columns: 5,
        maxColumns: 5
    };

    trendy.dom.ready(function () {
        var buttonElements = trendy.dom.queryAll(document, "button");
        var gridElement = trendy.dom.query(document, ".grid");
        var grid = new trendy.controls.Grid(gridElement, gridOptions);

        trendy.collections.forEach(buttonElements, function (element, index) {
            trendy.events.add(element, "click", function () {
                grid.rows = Math.floor(index / grid.maxColumns) + 1;
                grid.columns = index - (grid.rows - 1) * grid.maxColumns + 1;
                grid.update();
            });
        });
    });
});
