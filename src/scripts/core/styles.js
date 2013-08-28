define(["exports", "./strings", "./vendors"], function (styles, strings, vendors) {

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

        // try to resolve property with/without vendor prefix
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
        
        return cssProperty;
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

});
