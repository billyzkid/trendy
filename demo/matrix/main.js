require({ baseUrl: "../../src/scripts" }, ["./trendy"], function (trendy) {

    "use strict";

    trendy.dom.ready(function () {
        var fullScreenButtonElement = trendy.dom.query(document, "button");
        var matrixElement = trendy.dom.query(document, ".matrix");

        trendy.events.add(fullScreenButtonElement, "click", function () {
            trendy.fullscreen.request(matrixElement);
        });
    });

});
