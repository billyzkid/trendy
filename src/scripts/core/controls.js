define([
    "exports",
    "./attributes",
    "./collections",
    "./data",
    "./dom",
    "./objects",
    "./oo",
    "./strings"
], function (controls, attributes, collections, data, dom, objects, oo, strings) {

    "use strict";

    var dataKey = "control";

    controls.get = function (element) {
        if (objects.isString(element)) {
            element = dom.query(document, element);
        }

        return data.get(element, dataKey);
    };

    controls.initialize = function () {
        return collections.map(dom.queryAll(document, "[data-trendy-control]"), function (element) {
            var name = attributes.get(element, "data-trendy-control");
            var options = strings.jsonify(attributes.get(element, "data-trendy-options"));
            return new controls[name](element, options);
        });
    };

    controls.Control = oo.class(
    {
        constructor: function (name, element) {
            // initialize members
            this.name = name;
            this.element = objects.isString(element) ? dom.query(document, element) : element;

            // extend control with options
            if (arguments.length > 2) {
                var optionArgs = collections.concat([this], collections.slice(arguments, 2));
                objects.extend.apply(null, optionArgs);
            }

            // set control reference
            data.set(this.element, dataKey, this);
        },
        dispose: function () {
            events.remove(this.element, "." + this.name);
            data.remove(this.element, dataKey);
            delete this.element;
        }
    });

    // initialize declarative controls
    dom.ready(controls.initialize);

});
