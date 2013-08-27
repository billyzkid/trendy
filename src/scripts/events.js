define(["exports", "collections", "data", "objects", "strings", "vendors"], function (events, collections, data, objects, strings, vendors) {

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
                    "animationend": "webkitAnimationEnd",
                    "animationiteration": "webkitAnimationIteration",
                    "animationstart": "webkitAnimationStart",
                    "fullscreenchange": "webkitfullscreenchange",
                    "fullscreenerror": "webkitfullscreenerror",
                    "transitionend": "webkitTransitionEnd"
                };
            case vendors.engines.gecko:
                return {
                    "animationend": "mozAnimationEnd",
                    "animationiteration": "mozAnimationIteration",
                    "animationstart": "mozAnimationStart",
                    "fullscreenchange": "mozfullscreenchange",
                    "fullscreenerror": "mozfullscreenerror",
                    "transitionend": "mozTransitionEnd"
                };
            case vendors.engines.trident:
                return {
                    "animationend": "MSAnimationEnd",
                    "animationiteration": "MSAnimationIteration",
                    "animationstart": "MSAnimationStart",
                    "fullscreenchange": "MSFullscreenChange",
                    "fullscreenerror": "MSFullscreenError",
                    "transitionend": "MSTransitionEnd"
                };
            case vendors.engines.presto:
                return {
                    "animationend": "oAnimationEnd",
                    "animationiteration": "oAnimationIteration",
                    "animationstart": "oAnimationStart",
                    "transitionend": "oTransitionEnd"
                };
            default:
                return {};
        }
    })();

    function resolveType(target, type) {
        if (type in exceptionalTypes) {
            return exceptionalTypes[type];
        } else {
            return type;
        }
    }
    
    events.add = function (target, id, listener, capture) {
        var storage = data.get(target);
        var parts = id.split(".");
        var type = resolveType(target, parts.shift());
        var name = parts.join(".");
        var event = { name: name, type: type, listener: listener, capture: capture };

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

        // FIXME: remove!
        console.log(storage);
    };

    events.remove = function (target, id, listener, capture) {
        var storage = data.get(target);

        if (storage.events) {
            var parts, name, type;

            // parse event name and type
            if (!objects.isUndefined(id)) {
                parts = id.split(".");
                type = resolveType(target, parts.shift());
                name = parts.join(".");
            }

            // loop thru stored events
            collections.forEach(objects.keys(storage.events), function (key) {
                collections.forEach(collections.copy(storage.events[key]), function (event) {
                    if ((objects.isUndefined(name) || name === "" || strings.startsWith(event.name + ".", name + ".")) &&
                        (objects.isUndefined(type) || type === "" || type === event.type) &&
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

        // FIXME: remove!
        console.log(storage);
    };

    events.fire = function (target, type, options) {
        var event = document.createEvent("CustomEvent");
        var eventType = resolveType(target, type);
        var eventOptions = objects.extend({}, defaultOptions, options);

        event.initCustomEvent(eventType, eventOptions.canBubble, eventOptions.cancelable, eventOptions.detail);

        if (objects.isFunction(target.dispatchEvent)) {
            target.dispatchEvent(event);
        } else {
            var storage = data.get(target);
            var key = event.type;
            var args = event;

            // loop thru stored events
            if (storage.events && storage.events[key]) {
                collections.forEach(collections.copy(storage.events[key]), function (event) {
                    event.listener.call(target, args);
                });
            }
        }

        return event.defaultPrevented;
    };

});
