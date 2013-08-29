define(["exports", "./attributes", "./dom", "./objects"], function (controls, attributes, dom, objects) {

    "use strict";

    controls.Control = function (name, elementOrId, defaultOptions, options) {
        var element = objects.isString(elementOrId) ? dom.queryById(document, elementOrId) : elementOrId;
        attributes.set(element, "data-trendy-control", name);

        this.element = element;
        objects.extend(this, defaultOptions, options);
    };

});
