require({ baseUrl: "../../src/scripts" }, ["./trendy"], function (trendy) {

    "use strict";

    trendy.dom.ready(function () {
        var overlay = trendy.dom.query(document, ".md-overlay");
        //var triggers = trendy.dom.queryAll(document, ".md-trigger");
        var triggers = trendy.dom.queryAll(document, ".container button");

        trendy.collections.forEach(triggers, function (el, i) {
            if (i > 0) {
                return;
            }

            //var modalId = trendy.attributes.get(el, "data-modal");
            var modal = trendy.dom.query(document, "#modal-" + (i + 1));
            var close = trendy.dom.query(modal, ".md-close");

            function removeModal(hasPerspective) {
                trendy.classes.remove(modal, "md-show");

                if (hasPerspective) {
                    trendy.classes.remove(document.documentElement, "md-perspective");
                }
            }

            function removeModalHandler() {
                if (trendy.classes.contains(el, "md-setperspective")) {
                    removeModal(true);
                } else {
                    removeModal(false);
                }
            }

            trendy.events.add(el, "click", function () {
                trendy.classes.add(modal, "md-show");
                trendy.events.remove(overlay, "click", removeModalHandler);
                trendy.events.add(overlay, "click", removeModalHandler);

                if (trendy.classes.contains(el, "md-setperspective")) {
                    setTimeout(function () {
                        trendy.classes.add(document.documentElement, "md-perspective");
                    }, 25);
                }
            });

            trendy.events.add(close, "click", function (event) {
                event.stopPropagation();
                removeModalHandler();
            });

        });

    });

});
