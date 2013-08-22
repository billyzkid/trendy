define(["exports", "collections", "objects", "strings", "vendors"], function (styles, collections, objects, strings, vendors) {

    "use strict";

    var defaultPriority = "";
    var cssPropertyRE = /^(?:webkit|ms)-/;
    var cssPropertyCallback = function ($0) { return "-" + $0; };
    var stylePropertyRE = /^Webkit|Ms/;
    var stylePropertyCallback = function ($0) { return $0.toLowerCase(); };
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
            case vendors.engines.gecko:
                return {
                    cssFloat: "float",
                    cssText: null,
                    float: "float",
                    maskType: "mask-type",
                    paintOrder: "paint-order"
                };
            case vendors.engines.trident:
                return {
                    cssFloat: "float",
                    cssText: null,
                    colorInterpolationFilters: "color-interpolation-filters",
                    floodColor: "flood-color",
                    floodOpacity: "flood-opacity",
                    lightingColor: "lighting-color",
                    scrollbar3dlightColor: "scrollbar-3dlight-color",
                    scrollbar3dLightColor: "scrollbar-3dlight-color",
                    scrollbarDarkshadowColor: "scrollbar-darkshadow-color",
                    scrollbarDarkShadowColor: "scrollbar-darkshadow-color",
                    textSizeAdjust: "-ms-text-size-adjust"
                };
            case vendors.engines.presto:
                return {
                    cssFloat: "float",
                    cssText: null,
                    float: "float"
                };
            default:
                return {
                    cssFloat: "float",
                    cssText: null
                };
        }
    })();

    function toCssProperty(name) {
        return strings.replace(strings.fromCamelCase(name), cssPropertyRE, cssPropertyCallback);
    }

    function toStyleProperty(name) {
        return strings.replace(strings.toCamelCase(name), stylePropertyRE, stylePropertyCallback);
    }

    function resolveProperty(element, name) {
        var cssProperty = toCssProperty(name);
        var styleProperty = toStyleProperty(name);

        // resolve supported property
        if (styleProperty in exceptionalProperties) {
            return exceptionalProperties[styleProperty];
        } else if (styleProperty in element.style) {
            return cssProperty;
        }

        if (strings.startsWith(cssProperty, vendorPrefix)) {
            var unprefixedCssProperty = strings.remove(cssProperty, vendorPrefix);
            var unprefixedStyleProperty = toStyleProperty(unprefixedCssProperty);

            // resolve supported property without vendor prefix
            if (unprefixedStyleProperty in exceptionalProperties) {
                return exceptionalProperties[unprefixedStyleProperty];
            } else if (unprefixedStyleProperty in element.style) {
                return unprefixedCssProperty;
            }
        } else {
            var prefixedCssProperty = vendorPrefix + cssProperty;
            var prefixedStyleProperty = toStyleProperty(prefixedCssProperty);

            // resolve supported property with vendor prefix
            if (prefixedStyleProperty in exceptionalProperties) {
                return exceptionalProperties[prefixedStyleProperty];
            } else if (prefixedStyleProperty in element.style) {
                return prefixedCssProperty;
            }
        }
        
        // unresolved
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
    //    var div = document.createElement("div");
        
    //    console.log("*********** Supported Properties ************");

    //    var supportedProperties = [];

    //    for (var property in div.style) {
    //        supportedProperties.push(property);
    //    }

    //    supportedProperties.sort();

    //    collections.forEach(supportedProperties, function (name) {
    //        console.log(name);
    //    });

    //    console.log("*********** Unresolved Properties ************");

    //    var unresolvedProperties = [];

    //    collections.forEach(getComputedStyle(document.documentElement, null), function (name) {
    //        if (!resolveProperty(div, name)) {
    //            unresolvedProperties.push(name);
    //        }
    //    });

    //    collections.forEach(unresolvedProperties, function (name) {
    //        console.log(name);
    //    });

    //    console.log("*********** Common Properties ************");

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

    //    console.log("*********** Exceptional Properties ************");

    //    console.log("cssFloat => " + resolveProperty(div, "cssFloat"));
    //    console.log("cssText => " + resolveProperty(div, "cssText"));

    //    console.log("float => " + resolveProperty(div, "float"));
    //    console.log("mask-type => " + resolveProperty(div, "mask-type"));
    //    console.log("maskType => " + resolveProperty(div, "maskType"));
    //    console.log("paint-order => " + resolveProperty(div, "paint-order"));
    //    console.log("paintOrder => " + resolveProperty(div, "paintOrder"));

    //    console.log("text-size-adjust => " + resolveProperty(div, "text-size-adjust"));
    //    console.log("textSizeAdjust => " + resolveProperty(div, "textSizeAdjust"));
    //    console.log("-ms-text-size-adjust => " + resolveProperty(div, "-ms-text-size-adjust"));
    //    console.log("msTextSizeAdjust => " + resolveProperty(div, "msTextSizeAdjust"));

    //    console.log("scrollbar-3dlight-color => " + resolveProperty(div, "scrollbar-3dlight-color"));
    //    console.log("scrollbar3dLightColor => " + resolveProperty(div, "scrollbar3dLightColor"));
    //    console.log("-ms-scrollbar-3dlight-color => " + resolveProperty(div, "-ms-scrollbar-3dlight-color"));
    //    console.log("msScrollbar3dLightColor => " + resolveProperty(div, "msScrollbar3dLightColor"));

    //    console.log("scrollbar-darkshadow-color => " + resolveProperty(div, "scrollbar-darkshadow-color"));
    //    console.log("scrollbarDarkShadowColor => " + resolveProperty(div, "scrollbarDarkShadowColor"));
    //    console.log("-ms-scrollbar-darkshadow-color => " + resolveProperty(div, "-ms-scrollbar-darkshadow-color"));
    //    console.log("msScrollbarDarkShadowColor => " + resolveProperty(div, "msScrollbarDarkShadowColor"));

    //    console.log("*********** API ************");

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
