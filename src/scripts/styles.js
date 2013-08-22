define(["exports", "collections", "strings", "vendors"], function (styles, collections, strings, vendors) {

    "use strict";

    var defaultPriority = "";
    var msPropertyPrefixRE = /^Ms/;
    var msPropertyPrefix = "ms";

    var prefix = (function () {
        switch (vendors.current.engine) {
            case vendors.engines.webkit: return "-webkit-";
            case vendors.engines.gecko: return "-moz-";
            case vendors.engines.trident: return "-ms-";
            case vendors.engines.presto: return "-o-";
            default: return "";
        }
    })();

    var supportedExceptions = (function () {
        switch (vendors.current.engine) {
            case vendors.engines.gecko: return ["float", "mask-type", "paint-order"];
            case vendors.engines.trident: return ["-ms-text-size-adjust", "color-interpolation-filters", "flood-color", "flood-opacity", "lighting-color", "scrollbar-3dlight-color", "scrollbar-darkshadow-color"];
            default: return [];
        }
    })();

    styles.get = function (element, name) {
        var property = resolve(element, name);
        return element.style.getPropertyValue(property);
    };

    styles.set = function (element, name, value, priority) {
        var property = resolve(element, name);
        element.style.setProperty(property, value, priority || defaultPriority);
    };

    styles.remove = function (element, name) {
        var property = resolve(element, name);
        element.style.removeProperty(property);
    };

    styles.isSupported = function (element, name) {
        // see http://bugs.jquery.com/ticket/12224
        if (collections.contains(supportedExceptions, name)) {
            return true;
        }

        var property = strings.camelCase(name);

        // see http://bugs.jquery.com/ticket/9572
        if (vendors.current.engine === vendors.engines.trident) {
            property = strings.replace(property, msPropertyPrefixRE, msPropertyPrefix);
        }

        return property in element.style;
    };

    function resolve(element, name) {
        var unprefixedName = strings.remove(name, prefix);
        var prefixedName = prefix + unprefixedName;

        if (styles.isSupported(element, unprefixedName)) {
            return unprefixedName;
        } else if (styles.isSupported(element, prefixedName)) {
            return prefixedName;
        } else {
            return name; // return null?
        }
    }

    // FIXME: remove
    //(function () {
    //    var div = document.createElement("div");
    //    var unresolved = [];

    //    collections.forEach(getComputedStyle(document.documentElement, null), function (name) {
    //        var resolvedName = resolve(div, name);

    //        if (resolvedName) {
    //            console.log("resolved: " + name + " => " + resolvedName);
    //        } else {
    //            unresolved.push(name);
    //        }
    //    });

    //    collections.forEach(unresolved, function (name) {
    //        console.log("unresolved: " + name);
    //    });

    //    styles.set(div, "background", "#0f0 left center no-repeat", "");
    //    console.log(styles.get(div, "background-color"));

    //    console.log(resolve(div, "background-color"));
    //    console.log(resolve(div, "transition"));
    //    console.log(resolve(div, "transition-delay"));
    //    console.log(resolve(div, "backface-visibility"));
    //    console.log(resolve(div, "-o-backface-visibility"));
    //    console.log(resolve(div, "-ms-backface-visibility"));
    //    console.log(resolve(div, "-moz-backface-visibility"));
    //    console.log(resolve(div, "-webkit-backface-visibility"));
    //    console.log(resolve(div, "block-progression"));
    //    console.log(resolve(div, "-ms-block-progression"));
    //    console.log(resolve(div, "text-size-adjust"));
    //    console.log(resolve(div, "scrollbar-3dlight-color"));
    //    console.log(resolve(div, "scrollbar-darkshadow-color"));
    //    console.log(resolve(div, "float"));
    //    console.log(resolve(div, "mask-type"));
    //    console.log(resolve(div, "paint-order"));
    //})();

});
