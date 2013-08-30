require({ baseUrl: "../../src/scripts" }, ["./trendy"], function (trendy) {

    "use strict";

    trendy.dom.ready(function () {
        var buttonElements = trendy.dom.queryAll(document, "button");
        var gridElement = trendy.dom.query(document, ".grid");
        var grid = trendy.controls.get(gridElement);

        trendy.collections.forEach(buttonElements, function (buttonElement, index) {
            trendy.events.add(buttonElement, "click", function () {
                grid.rows = Math.floor(index / grid.maxColumns) + 1;
                grid.columns = index - (grid.rows - 1) * grid.maxColumns + 1;
                grid.update();
            });
        });
    });
});
