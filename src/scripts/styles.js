define(["exports", "collections", "objects", "strings", "vendors"], function (styles, collections, objects, strings, vendors) {

    "use strict";

    var defaultPriority = "";

    var vendorPrefix = (function () {
        switch (vendors.current.engine) {
            case vendors.engines.webkit: return "-webkit-";
            case vendors.engines.gecko: return "-moz-";
            case vendors.engines.trident: return "-ms-";
            case vendors.engines.presto: return "-o-";
            default: return "";
        }
    })();

    var exceptionalProperties = (function () {
        switch (vendors.current.engine) {
            case vendors.engines.webkit:
                return {
                    cssFloat: "float"
                };
            case vendors.engines.gecko:
                return {
                    cssFloat: "float",
                    float: "float",
                    maskType: "mask-type",
                    paintOrder: "paint-order"
                };
            case vendors.engines.trident:
                return {
                    cssFloat: "float",
                    styleFloat: "float",
                    colorInterpolationFilters: "color-interpolation-filters",
                    floodColor: "flood-color",
                    floodOpacity: "flood-opacity",
                    lightingColor: "lighting-color",
                    scrollbar3dlightColor: "scrollbar-3dlight-color",
                    scrollbarDarkshadowColor: "scrollbar-darkshadow-color",
                    textSizeAdjust: "-ms-text-size-adjust"
                };
            case vendors.engines.presto:
                return {
                    cssFloat: "float",
                    float: "float"
                };
            default:
                return {};
        }
    })();

    var cssPropertyRE1 = /-?([\dA-Z])/g;
    var cssPropertyRE2 = /^(?:webkit|ms)-/;
    var cssPropertyCallback1 = function ($0, $1) { return "-" + $1.toLowerCase(); };
    var cssPropertyCallback2 = function ($0) { return "-" + $0; };

    var stylePropertyRE1 = /-([\da-z])/gi;
    var stylePropertyRE2 = /^(?:Webkit|Ms)/;
    var stylePropertyCallback1 = function ($0, $1) { return $1.toUpperCase(); };
    var stylePropertyCallback2 = function ($0) { return $0.toLowerCase(); };

    function toCssProperty(name) {
        return strings.replace(strings.replace(name, cssPropertyRE1, cssPropertyCallback1), cssPropertyRE2, cssPropertyCallback2);
    }

    function toStyleProperty(name) {
        return strings.replace(strings.replace(name, stylePropertyRE1, stylePropertyCallback1), stylePropertyRE2, stylePropertyCallback2);
    }

    function resolveProperty(element, name) {
        var cssProperty = toCssProperty(name);
        var styleProperty = toStyleProperty(cssProperty);
        var style = element.style;

        // try to resolve property
        if (styleProperty in exceptionalProperties) {
            return exceptionalProperties[styleProperty];
        } else if (styleProperty in style) {
            return cssProperty;
        }

        // try resolve property with/without vendor prefix
        if (strings.startsWith(cssProperty, vendorPrefix)) {
            var unprefixedCssProperty = strings.remove(cssProperty, vendorPrefix);
            var unprefixedStyleProperty = toStyleProperty(unprefixedCssProperty);

            if (unprefixedStyleProperty in exceptionalProperties) {
                return exceptionalProperties[unprefixedStyleProperty];
            } else if (unprefixedStyleProperty in style) {
                return unprefixedCssProperty;
            }
        } else {
            var prefixedCssProperty = vendorPrefix + cssProperty;
            var prefixedStyleProperty = toStyleProperty(prefixedCssProperty);

            if (prefixedStyleProperty in exceptionalProperties) {
                return exceptionalProperties[prefixedStyleProperty];
            } else if (prefixedStyleProperty in style) {
                return prefixedCssProperty;
            }
        }
        
        return null;
    }

    styles.get = function (element, name) {
        var property = resolveProperty(element, name);
        return element.style.getPropertyValue(property);
    };

    styles.set = function (element, name, value, priority) {
        var property = resolveProperty(element, name);
        element.style.setProperty(property, value, priority || defaultPriority);
    };

    styles.remove = function (element, name) {
        var property = resolveProperty(element, name);
        element.style.removeProperty(property);
    };

    // FIXME: remove
    //(function () {
    //    var documentElement = document.documentElement;

    //    console.log("*********** Unresolved CSS Properties ************");

    //    collections.forEach(getComputedStyle(documentElement, null), function (name) {
    //        if (!resolveProperty(documentElement, name)) {
    //            console.log(name);
    //        }
    //    });

    //    console.log("*********** Unresolved Style Properties ************");

    //    for (var name in documentElement.style) {
    //        if (!resolveProperty(documentElement, name)) {
    //            console.log(name);
    //        }
    //    }

    //    console.log("*********** Resolve Properties ************");

    //    var div = document.createElement("div");

    //    console.log("background => " + resolveProperty(div, "background"));
    //    console.log("background-color => " + resolveProperty(div, "background-color"));
    //    console.log("backgroundColor => " + resolveProperty(div, "backgroundColor"));

    //    console.log("transition => " + resolveProperty(div, "transition"));
    //    console.log("-o-transition => " + resolveProperty(div, "-o-transition"));
    //    console.log("OTransition => " + resolveProperty(div, "OTransition"));
    //    console.log("-ms-transition => " + resolveProperty(div, "-ms-transition"));
    //    console.log("msTransition => " + resolveProperty(div, "msTransition"));
    //    console.log("-moz-transition => " + resolveProperty(div, "-moz-transition"));
    //    console.log("MozTransition => " + resolveProperty(div, "MozTransition"));
    //    console.log("-webkit-transition => " + resolveProperty(div, "-webkit-transition"));
    //    console.log("WebkitTransition => " + resolveProperty(div, "WebkitTransition"));
    //    console.log("webkitTransition => " + resolveProperty(div, "webkitTransition"));

    //    console.log("backface-visibility => " + resolveProperty(div, "backface-visibility"));
    //    console.log("backfaceVisibility => " + resolveProperty(div, "backfaceVisibility"));
    //    console.log("-o-backface-visibility => " + resolveProperty(div, "-o-backface-visibility"));
    //    console.log("OBackfaceVisibility => " + resolveProperty(div, "OBackfaceVisibility"));
    //    console.log("-ms-backface-visibility => " + resolveProperty(div, "-ms-backface-visibility"));
    //    console.log("msBackfaceVisibility => " + resolveProperty(div, "msBackfaceVisibility"));
    //    console.log("-moz-backface-visibility => " + resolveProperty(div, "-moz-backface-visibility"));
    //    console.log("MozBackfaceVisibility => " + resolveProperty(div, "MozBackfaceVisibility"));
    //    console.log("-webkit-backface-visibility => " + resolveProperty(div, "-webkit-backface-visibility"));
    //    console.log("WebkitBackfaceVisibility => " + resolveProperty(div, "WebkitBackfaceVisibility"));
    //    console.log("webkitBackfaceVisibility => " + resolveProperty(div, "webkitBackfaceVisibility"));

    //    console.log("cssFloat => " + resolveProperty(div, "cssFloat"));
    //    console.log("float => " + resolveProperty(div, "float"));

    //    console.log("mask-type => " + resolveProperty(div, "mask-type"));
    //    console.log("maskType => " + resolveProperty(div, "maskType"));

    //    console.log("paint-order => " + resolveProperty(div, "paint-order"));
    //    console.log("paintOrder => " + resolveProperty(div, "paintOrder"));

    //    console.log("text-size-adjust => " + resolveProperty(div, "text-size-adjust"));
    //    console.log("textSizeAdjust => " + resolveProperty(div, "textSizeAdjust"));

    //    console.log("scrollbar-3dlight-color => " + resolveProperty(div, "scrollbar-3dlight-color"));
    //    console.log("scrollbar3dlightColor => " + resolveProperty(div, "scrollbar3dlightColor"));

    //    console.log("scrollbar-darkshadow-color => " + resolveProperty(div, "scrollbar-darkshadow-color"));
    //    console.log("scrollbarDarkshadowColor => " + resolveProperty(div, "scrollbarDarkshadowColor"));

    //    console.log("dummy-property => " + resolveProperty(div, "dummy-property"));

    //    console.log("*********** API ************");

    //    styles.set(div, "dummy-property", "dummy-value", "");
    //    console.log(div.outerHTML);

    //    styles.set(div, "background", "#f00 left center no-repeat", "");
    //    console.log(div.outerHTML);

    //    var value1 = styles.get(div, "background-color");
    //    console.log(value1);

    //    styles.set(div, "backgroundColor", "#0f0", "");
    //    console.log(div.outerHTML);

    //    var value2 = styles.get(div, "backgroundColor");
    //    console.log(value2);

    //    styles.remove(div, "background");
    //    console.log(div.outerHTML);

    //})();

});
