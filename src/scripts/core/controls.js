define(["exports", "./attributes", "./data", "./dom", "./objects"], function (controls, attributes, data, dom, objects) {

    "use strict";

    var key = "control";

    controls.get = function (elementOrId) {
        var element = objects.isString(elementOrId) ? dom.queryById(document, elementOrId) : elementOrId;
        var control = data.get(element, key);
        return control;
    };

    controls.Control = function (name, elementOrId, defaultOptions, options) {
        var element = objects.isString(elementOrId) ? dom.queryById(document, elementOrId) : elementOrId;
        attributes.set(element, "data-trendy-control", name);
        data.set(element, key, this);

        this.element = element;
        objects.extend(this, defaultOptions, options);
    };

});
