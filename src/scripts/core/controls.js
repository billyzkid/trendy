define([
    "exports",
    "./attributes",
    "./collections",
    "./data",
    "./dom",
    "./objects",
    "./strings"
], function (controls, attributes, collections, data, dom, objects, strings) {

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

    controls.Control = function (name, element, defaultOptions, options) {
        if (objects.isString(element)) {
            element = dom.query(document, element);
        }

        this.element = element;
        objects.extend(this, defaultOptions, options);

        data.set(element, dataKey, this);
    };

    // automatically initialize controls
    dom.ready(controls.initialize);

});
