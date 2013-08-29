define(["exports"], function (attributes) {

    "use strict";

    attributes.get = function (element, name) {
        return element.getAttribute(name);
    };

    attributes.set = function (element, name, value) {
        element.setAttribute(name, value);
    };

    attributes.remove = function (element, name) {
        element.removeAttribute(name);
    };

});
