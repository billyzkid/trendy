require({ baseUrl: "../../src/scripts" }, ["./core/dom", "./controls/Grid", "./controls/GridSelector"], function (dom, Grid, GridSelector) {

    "use strict";

    dom.ready(function () {
        var gridSelector = new GridSelector("#GridSelector", { rows: 5, columns: 5, maxColumns: 5, grid: "#Grid" });
        var grid = new Grid("#Grid", { rows: 5, columns: 5, maxColumns: 5 });
    });

});
