define(["exports", "./collections", "./data", "./dom", "./objects", "./strings", "./vendors"], function (events, collections, data, dom, objects, strings, vendors) {

    "use strict";

    var defaultOptions = {
        canBubble: false,
        cancelable: false,
        detail: null
    };
    
    var exceptionalTypes = (function () {
        switch (vendors.current.engine) {
            case vendors.engines.webkit:
                return {
                    animationend: "webkitAnimationEnd",
                    animationiteration: "webkitAnimationIteration",
                    animationstart: "webkitAnimationStart",
                    fullscreenchange: "webkitfullscreenchange",
                    fullscreenerror: "webkitfullscreenerror",
                    mouseenter: "mouseover",
                    mouseleave: "mouseout",
                    transitionend: "webkitTransitionEnd"
                };
            case vendors.engines.gecko:
                return {
                    animationend: "mozAnimationEnd",
                    animationiteration: "mozAnimationIteration",
                    animationstart: "mozAnimationStart",
                    fullscreenchange: "mozfullscreenchange",
                    fullscreenerror: "mozfullscreenerror",
                    mouseenter: "mouseover",
                    mouseleave: "mouseout",
                    transitionend: "mozTransitionEnd"
                };
            case vendors.engines.trident:
                return {
                    animationend: "MSAnimationEnd",
                    animationiteration: "MSAnimationIteration",
                    animationstart: "MSAnimationStart",
                    fullscreenchange: "MSFullscreenChange",
                    fullscreenerror: "MSFullscreenError",
                    transitionend: "MSTransitionEnd"
                };
            case vendors.engines.presto:
                return {
                    animationend: "oAnimationEnd",
                    animationiteration: "oAnimationIteration",
                    animationstart: "oAnimationStart",
                    mouseenter: "mouseover",
                    mouseleave: "mouseout",
                    transitionend: "oTransitionEnd"
                };
            default:
                return {};
        }
    })();

    function resolveType(type) {
        if (type in exceptionalTypes) {
            return exceptionalTypes[type];
        } else {
            return type;
        }
    }

    function resolveListener(target, type, listener) {
        var resolvedType = resolveType(type);

        // shim mouseenter/mouseleave events
        if ((type === "mouseenter" && resolvedType === "mouseover") || (type === "mouseleave" && resolvedType === "mouseout")) {
            return function (event) {
                if (!dom.contains(event.relatedTarget, target)) {
                    listener.call(target, event);
                }
            };
        } else {
            return listener;
        }
    }
    
    events.add = function (target, id, listener, capture) {
        var storage = data.get(target);
        var parts = id.split(".");
        var type = parts.shift();
        var name = parts.join(".");
        var resolvedType = resolveType(type);
        var resolvedListener = resolveListener(target, type, listener);
        var event = { name: name, type: resolvedType, listener: resolvedListener, capture: capture };

        // ensure storage for events
        if (!storage.events) {
            storage.events = {};
        }

        // ensure storage for event type
        if (!storage.events[type]) {
            storage.events[type] = [];
        }

        // store event by type
        collections.add(storage.events[type], event);

        // add event listener
        if (objects.isFunction(target.addEventListener)) {
            target.addEventListener(event.type, event.listener, event.capture);
        }
    };

    events.remove = function (target, id, listener, capture) {
        var storage = data.get(target);

        if (storage.events) {
            var parts, name, type;

            // parse event name and type
            if (!objects.isUndefined(id)) {
                parts = id.split(".");
                type = parts.shift();
                name = parts.join(".");
            }

            // loop thru stored events
            collections.forEach(objects.keys(storage.events), function (key) {
                collections.forEach(collections.copy(storage.events[key]), function (event) {
                    if ((objects.isUndefined(type) || type === "" || type === key) &&
                        (objects.isUndefined(name) || name === "" || strings.startsWith(event.name + ".", name + ".")) &&
                        (objects.isUndefined(listener) || listener === event.listener) &&
                        (objects.isUndefined(capture) || capture === !!event.capture)) {

                        // remove event listener
                        if (objects.isFunction(target.removeEventListener)) {
                            target.removeEventListener(event.type, event.listener, event.capture);
                        }

                        // remove stored event
                        collections.remove(storage.events[key], event);
                    }
                });

                // if empty, delete event type from storage
                if (objects.isEmpty(storage.events[key])) {
                    delete storage.events[key];
                }
            });

            // if empty, delete events from storage
            if (objects.isEmpty(storage.events)) {
                delete storage.events;
            }
        }
    };

    events.fire = function (target, type, options) {
        var event = document.createEvent("CustomEvent");
        var eventOptions = objects.extend({}, defaultOptions, options);

        event.initCustomEvent(type, eventOptions.canBubble, eventOptions.cancelable, eventOptions.detail);

        if (objects.isFunction(target.dispatchEvent)) {
            target.dispatchEvent(event);
        } else {
            var storage = data.get(target);
            var args = event;

            // loop thru stored events
            if (storage.events && storage.events[type]) {
                collections.forEach(collections.copy(storage.events[type]), function (event) {
                    event.listener.call(target, args);
                });
            }
        }

        return event.defaultPrevented;
    };

});
