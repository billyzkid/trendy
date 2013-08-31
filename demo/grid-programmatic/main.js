require({ baseUrl: "../../src/scripts" }, ["./core/dom", "./controls/Grid", "./controls/GridSelector"], function (dom, Grid, GridSelector) {

    "use strict";

    dom.ready(function () {
        var grid = new Grid(".trendy-grid", { rows: 5, columns: 5, maxColumns: 5 });
        var gridSelector = new GridSelector(".trendy-grid-selector", { rows: 5, columns: 5, maxColumns: 5 });
    });

});
