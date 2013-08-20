require({ baseUrl: "../../src/scripts" }, ["collections", "dom", "events", "ui"], function (collections, dom, events, ui) {

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
        var grid = new ui.Grid(gridElement, gridOptions);

        collections.forEach(buttonElements, function (element, index) {
            events.add(element, "click", function () {
                grid.rows = Math.floor(index / grid.maxColumns) + 1;
                grid.columns = index - (grid.rows - 1) * grid.maxColumns + 1;
                grid.update();
            });
        });
    });
});
