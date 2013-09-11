require({ baseUrl: "../../src/scripts" }, ["./trendy"], function (trendy) {

    "use strict";

    trendy.dom.ready(function () {
        var buttons = trendy.dom.queryAll(document, "button");
        var target = trendy.dom.query(document, ".target");

        trendy.events.add(buttons[0], "click", function () {
            trendy.events.add(target, "click", function () {
                console.log("click", this, arguments);
            });
        });

        trendy.events.add(buttons[1], "click", function () {
            trendy.events.add(target, "click.foo", function () {
                console.log("click.foo", this, arguments);
            });
        });

        trendy.events.add(buttons[2], "click", function () {
            trendy.events.add(target, "click.bar", function () {
                console.log("click.bar", this, arguments);
            });
        });

        trendy.events.add(buttons[3], "click", function () {
            trendy.events.add(target, "custom", function () {
                console.log("custom", this, arguments);
            });
        });

        trendy.events.add(buttons[4], "click", function () {
            trendy.events.add(target, "custom.foo", function () {
                console.log("custom.foo", this, arguments);
            });
        });

        trendy.events.add(buttons[5], "click", function () {
            trendy.events.add(target, "custom.bar", function () {
                console.log("custom.bar", this, arguments);
            });
        });

        trendy.events.add(buttons[6], "click", function () {
            trendy.events.remove(target, "click");
        });

        trendy.events.add(buttons[7], "click", function () {
            trendy.events.remove(target, "click.foo");
        });

        trendy.events.add(buttons[8], "click", function () {
            trendy.events.remove(target, "click.bar");
        });

        trendy.events.add(buttons[9], "click", function () {
            trendy.events.remove(target, "custom");
        });

        trendy.events.add(buttons[10], "click", function () {
            trendy.events.remove(target, "custom.foo");
        });

        trendy.events.add(buttons[11], "click", function () {
            trendy.events.remove(target, "custom.bar");
        });

        trendy.events.add(buttons[12], "click", function () {
            trendy.events.remove(target, ".foo");
        });

        trendy.events.add(buttons[13], "click", function () {
            trendy.events.remove(target, ".bar");
        });

        trendy.events.add(buttons[14], "click", function () {
            trendy.events.remove(target);
        });

        trendy.events.add(buttons[15], "click", function () {
            trendy.events.fire(target, "click", { detail: new Date() });
        });

        trendy.events.add(buttons[16], "click", function () {
            trendy.events.fire(target, "custom", { detail: new Date() });
        });
    });

});
