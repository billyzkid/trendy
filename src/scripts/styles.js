define(["exports", "vendors"], function (styles, vendors) {

    "use strict";

    var defaultPriority = "";

    function prefix(name) {
        return vendors.current.prefixedStyles[name] || name;
    }

    styles.get = function (element, name) {
        return getComputedStyle(element, null).getPropertyValue(prefix(name));
    };

    styles.set = function (element, name, value, priority) {
        element.style.setProperty(prefix(name), value, priority || defaultPriority);
    };

    styles.remove = function (element, name) {
        element.style.removeProperty(prefix(name));
    };

});
