define(["exports", "./strings"], function (vendors, strings) {

    "use strict";

    var userAgent = navigator.userAgent;

    vendors.engines = {
        unknown: 0,
        webkit: 1,
        gecko: 2,
        trident: 4,
        presto: 8
    };

    if (strings.contains(userAgent, "Opera")) {
        vendors.current = {
            engine: vendors.engines.presto
        };
    } else if (strings.contains(userAgent, "WebKit")) {
        vendors.current = {
            engine: vendors.engines.webkit
        };
    } else if (strings.contains(userAgent, "Gecko")) {
        vendors.current = {
            engine: vendors.engines.gecko
        };
    } else if (strings.contains(userAgent, "MSIE")) {
        vendors.current = {
            engine: vendors.engines.trident
        };
    } else {
        vendors.current = {
            engine: vendors.engines.unknown
        };
    }

});
