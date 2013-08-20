define(["exports", "collections", "strings"], function (vendors, collections, strings) {

    "use strict";

    var userAgent = navigator.userAgent;
    var stylePart = /-([a-z])/g;

    function getPrefixedStyles(prefix) {
        var result = {};
        var element = document.documentElement;
        var styles = getComputedStyle(element, null);

        // filter prefixed styles
        var prefixedStyles = collections.filter(styles, function (style) {
            return strings.startsWith(style, prefix);
        });

        // add shorthand styles
        collections.forEach(prefixedStyles, function (style) {
            var parts = style.split("-");

            while (parts.length > 3) {
                parts.pop();

                var shorthandStyle = parts.join("-");

                if (isSupportedStyle(shorthandStyle, element) && !collections.contains(prefixedStyles, shorthandStyle)) {
                    collections.add(prefixedStyles, shorthandStyle);
                }
            }
        });

        // filter out styles that work without a prefix
        collections.forEach(prefixedStyles, function (style) {
            var unprefixedStyle = strings.remove(style, prefix);

            if (!isSupportedStyle(unprefixedStyle, element)) {
                result[unprefixedStyle] = style;
            }
        });

        return result;
    }

    function isSupportedStyle(style, element) {
        return strings.replace(style, stylePart, function ($0, $1) { return $1.toUpperCase(); }) in element.style;
    }
    
    if (strings.contains(userAgent, "Firefox")) {
        vendors.current = {
            prefixedStyles: getPrefixedStyles("-moz-"),
            prefixedEvents: {}
        };
    } else if (strings.contains(userAgent, "MSIE")) {
        vendors.current = {
            prefixedStyles: getPrefixedStyles("-ms-"),
            prefixedEvents: {}
        };
    } else if (strings.contains(userAgent, "Opera")) {
        vendors.current = {
            prefixedStyles: getPrefixedStyles("-o-"),
            prefixedEvents: {}
        };
    } else if (strings.contains(userAgent, "WebKit")) {
        vendors.current = {
            prefixedStyles: getPrefixedStyles("-webkit-"),
            prefixedEvents: {
                "animationend": "webkitAnimationEnd",
                "animationiteration": "webkitAnimationIteration",
                "animationstart": "webkitAnimationStart",
                "fullscreenchange": "webkitfullscreenchange",
                "fullscreenerror": "webkitfullscreenerror",
                "keyadded": "webkitkeyadded",
                "keyerror": "webkitkeyerror",
                "keymessage": "webkitkeymessage",
                "needkey": "webkitneedkey",
                "pointerlockchange": "webkitpointerlockchange",
                "pointerlockerror": "webkitpointerlockerror",
                "speechchange": "webkitSpeechChange",
                "sourceclose": "webkitsourceclose",
                "sourceended": "webkitsourceended",
                "sourceopen": "webkitsourceopen",
                "transitionend": "webkitTransitionEnd"
            }
        };
    } else {
        vendors.current = {
            prefixedStyles: {},
            prefixedEvents: {}
        };
    }

    console.log(vendors);

});
