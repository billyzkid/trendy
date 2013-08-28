require({ baseUrl: "../../src/scripts" }, ["core/dom", "core/events"], function (dom, events) {

    dom.ready(function () {
        var buttons = dom.queryAll(document, ".buttons > button");
        var target = dom.query(document, ".box");
        //var target = {};

        buttons[0].addEventListener("click", function () {
            var date = new Date();
            events.add(target, "dummy", function (event) {
                console.log("dummy", this, arguments, date);
            });
        });

        buttons[1].addEventListener("click", function () {
            var date = new Date();
            events.add(target, "click", function (event) {
                console.log("click", this, arguments, date);
            });
        });

        buttons[2].addEventListener("click", function () {
            var date = new Date();
            events.add(target, "click.foo", function (event) {
                console.log("click.foo", this, arguments, date);
            });
        });

        buttons[3].addEventListener("click", function () {
            var date = new Date();
            events.add(target, "click.foo.bar", function (event) {
                console.log("click.foo.bar", this, arguments, date);
                event.preventDefault();
            });
        });

        buttons[4].addEventListener("click", function () {
            var date = new Date();
            events.add(target, "mouseover.foo", function (event) {
                console.log("mouseover.foo", this, arguments, date);
            });
        });

        buttons[5].addEventListener("click", function () {
            events.remove(target, "dummy");
        });

        buttons[6].addEventListener("click", function () {
            events.remove(target, "click");
        });

        buttons[7].addEventListener("click", function () {
            events.remove(target, "click.foo");
        });

        buttons[8].addEventListener("click", function () {
            events.remove(target, "mouseover.foo");
        });

        buttons[9].addEventListener("click", function () {
            events.remove(target, ".foo");
        });

        buttons[10].addEventListener("click", function () {
            events.remove(target);
        });

        buttons[11].addEventListener("click", function () {
            events.fire(target, "dummy", { detail: new Date() });
        });

        buttons[12].addEventListener("click", function () {
            events.fire(target, "click", { cancelable: true });
        });

        buttons[13].addEventListener("click", function () {
            events.fire(target, "mouseover");
        });
    });
});
