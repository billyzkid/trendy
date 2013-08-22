define(["exports", "collections", "objects", "strings", "vendors"], function (styles, collections, objects, strings, vendors) {

    "use strict";

    var defaultPriority = "";
    var cssPropertyWebkitRE = /^webkit-/;
    var cssPropertyMsRE = /^ms-/;
    var stylePropertyWebkitRE = /^Webkit/;
    var stylePropertyMsRE = /^Ms/;

    var prefix = (function () {
        switch (vendors.current.engine) {
            case vendors.engines.webkit: return "-webkit-";
            case vendors.engines.gecko: return "-moz-";
            case vendors.engines.trident: return "-ms-";
            case vendors.engines.presto: return "-o-";
            default: return "";
        }
    })();

    var supportedProperties = (function () {
        switch (vendors.current.engine) {
            case vendors.engines.gecko:
                return {
                    float: "float",
                    maskType: "mask-type",
                    paintOrder: "paint-order"
                };
            case vendors.engines.trident:
                return {
                    colorInterpolationFilters: "color-interpolation-filters",
                    floodColor: "flood-color",
                    floodOpacity: "flood-opacity",
                    lightingColor: "lighting-color",
                    msTextSizeAdjust: "-ms-text-size-adjust",
                    scrollbar3dlightColor: "scrollbar-3dlight-color",
                    scrollbarDarkshadowColor: "scrollbar-darkshadow-color",
                };
            case vendors.engines.presto:
                return {
                    float: "float"
                };
            default:
                return {};
        }
    })();

    function toCssProperty(name) {
        switch (vendors.current.engine) {
            case vendors.engines.webkit:
                return strings.replace(strings.fromCamelCase(name), cssPropertyWebkitRE, "-webkit-");
            case vendors.engines.trident:
                return strings.replace(strings.fromCamelCase(name), cssPropertyMsRE, "-ms-");
            default:
                return strings.fromCamelCase(name);
        }
    }

    function toStyleProperty(name) {
        switch (vendors.current.engine) {
            case vendors.engines.webkit:
                return strings.replace(strings.toCamelCase(name), stylePropertyWebkitRE, "webkit");
            case vendors.engines.trident:
                return strings.replace(strings.toCamelCase(name), stylePropertyMsRE, "ms");
            default:
                return strings.toCamelCase(name);
        }
    }

    function resolve(element, name) {
        var cssProperty = toCssProperty(name);
        var unprefixedCssProperty = strings.remove(cssProperty, prefix);
        var unprefixedStyleProperty = toStyleProperty(unprefixedCssProperty);

        // check unprefixed style
        if (unprefixedStyleProperty in element.style || unprefixedStyleProperty in supportedProperties) {
            return unprefixedCssProperty;
        }

        var prefixedCssProperty = prefix + unprefixedCssProperty;
        var prefixedStyleProperty = toStyleProperty(prefixedCssProperty);

        // check prefixed style
        if (prefixedStyleProperty in element.style || prefixedStyleProperty in supportedProperties) {
            return prefixedCssProperty;
        }
        
        return null;
    }

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
        var property = resolve(element, name);
        return !objects.isNull(property);
    };

    // FIXME: remove
    //(function () {
    //    var div = document.createElement("div");
    //    var supportedNames = getComputedStyle(document.documentElement, null);

    //    collections.forEach(supportedNames, function (name) {
    //        if (!styles.isSupported(div, name)) {
    //            console.log("unsupported: " + name);
    //        }
    //    });

    //    styles.set(div, "background", "#f00 left center no-repeat", "");
    //    console.log(div.outerHTML);

    //    styles.set(div, "backgroundColor", "#0f0", "");
    //    console.log(div.outerHTML);

    //    styles.remove(div, "background");
    //    console.log(div.outerHTML);

    //    console.log("transition => " + resolve(div, "transition"));
    //    console.log("transition-delay => " + resolve(div, "transition-delay"));
    //    console.log("transition-duration => " + resolve(div, "transition-duration"));
    //    console.log("backface-visibility => " + resolve(div, "backface-visibility"));
    //    console.log("-o-backface-visibility => " + resolve(div, "-o-backface-visibility"));
    //    console.log("-ms-backface-visibility => " + resolve(div, "-ms-backface-visibility"));
    //    console.log("-moz-backface-visibility => " + resolve(div, "-moz-backface-visibility"));
    //    console.log("-webkit-backface-visibility => " + resolve(div, "-webkit-backface-visibility"));
    //    console.log("backfaceVisibility => " + resolve(div, "backfaceVisibility"));
    //    console.log("OBackfaceVisibility => " + resolve(div, "OBackfaceVisibility"));
    //    console.log("msBackfaceVisibility => " + resolve(div, "msBackfaceVisibility"));
    //    console.log("MozBackfaceVisibility => " + resolve(div, "MozBackfaceVisibility"));
    //    console.log("WebkitBackfaceVisibility => " + resolve(div, "WebkitBackfaceVisibility"));
    //    console.log("webkitBackfaceVisibility => " + resolve(div, "webkitBackfaceVisibility"));
    //    console.log("block-progression => " + resolve(div, "block-progression"));
    //    console.log("-ms-block-progression => " + resolve(div, "-ms-block-progression"));
    //    console.log("blockProgression => " + resolve(div, "blockProgression"));
    //    console.log("msBlockProgression => " + resolve(div, "msBlockProgression"));
    //    console.log("text-size-adjust => " + resolve(div, "text-size-adjust"));
    //    console.log("scrollbar-3dlight-color => " + resolve(div, "scrollbar-3dlight-color"));
    //    console.log("scrollbar-darkshadow-color => " + resolve(div, "scrollbar-darkshadow-color"));
    //    console.log("float => " + resolve(div, "float"));
    //    console.log("mask-type => " + resolve(div, "mask-type"));
    //    console.log("paint-order => " + resolve(div, "paint-order"));
    //    console.log("object-position => " + resolve(div, "object-position"));
    //})();

});
