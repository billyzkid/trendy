require({ baseUrl: "../../src/scripts" }, ["./trendy"], function (trendy) {

    "use strict";

    trendy.dom.ready(function () {
        var fullScreenButton = trendy.dom.query(document, "button");
        var grid = trendy.dom.query(document, ".grid");

        trendy.events.add(fullScreenButton, "click", function () {
            trendy.fullscreen.request(grid);
        });
    });

});
