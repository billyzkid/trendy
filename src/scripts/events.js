define(["exports", "collections", "data", "objects", "strings", "vendors"], function (events, collections, data, objects, strings, vendors) {

    "use strict";
    
    var prefixedTypes;
    var isSupportedFallbackRequired = !("onblur" in document.documentElement);
    var isSupportedFallbackElement = document.createElement("div");

    function resolve(type) {
        if (!prefixedTypes) {
            prefixedTypes = {};

            //var prefix = vendors.eventPrefix;
            //var element = document.documentElement;
            //var types = [
            //    "AnimationEnd",
            //    "AnimationIteration",
            //    "AnimationStart",
            //    "FullscreenChange",
            //    "FullscreenError",
            //    "PointerLockChange",
            //    "PointerLockError",
            //    "TransitionEnd"
            //];

            //collections.forEach(types, function (type) {
            //    var prefixedType = (prefix + type).toLowerCase();
            //    var unprefixedType = type.toLowerCase();
                
            //    if (events.isSupported(prefixedType, element) && !events.isSupported(unprefixedType, element)) {
            //        prefixedTypes[unprefixedType] = prefixedType;
            //    }
            //});
        }

        return prefixedTypes[type] || type;
    }

    events.add = function (target, id, listener, capture) {
        var storage = data.get(target);
        var index = id.indexOf(".");
        var type = index >= 0 ? id.substring(0, index) : id;
        var name = index >= 0 ? id.substring(index + 1) : "";
        var event = { type: type, name: name, listener: listener, capture: !!capture };

        if (!storage.events) {
            storage.events = {};
        }

        if (!storage.events[type]) {
            storage.events[type] = [];
        }

        collections.add(storage.events[type], event);

        if (objects.isFunction(target.addEventListener)) {
            target.addEventListener(resolve(event.type), event.listener, event.capture);
        }

        //console.log(storage);
    };

    events.remove = function (target, id, listener, capture) {
        var storage = data.get(target);

        if (storage.events) {
            var index = !objects.isUndefined(id) ? id.indexOf(".") : -1;
            var type = index >= 0 ? id.substring(0, index) : id;
            var name = index >= 0 ? id.substring(index + 1) : "";

            collections.forEach(objects.keys(storage.events), function (key) {

                var events = collections.copy(storage.events[key]);

                collections.forEach(events, function (event) {

                    if (type && type !== event.type) {
                        return;
                    }

                    if (name && !strings.startsWith("." + event.name + ".", "." + name + ".")) {
                        return;
                    }

                    if (!objects.isUndefined(listener) && listener !== event.listener) {
                        return;
                    }

                    if (!objects.isUndefined(capture) && capture !== event.capture) {
                        return;
                    }

                    collections.remove(storage.events[key], event);

                    if (objects.isFunction(target.removeEventListener)) {
                        target.removeEventListener(resolve(event.type), event.listener, event.capture);
                    }
                });

                if (objects.isEmpty(storage.events[key])) {
                    delete storage.events[key];
                }
            });

            if (objects.isEmpty(storage.events)) {
                delete storage.events;
            }
        }

        //console.log(storage);
    };

    events.fire = function (target, event) {

        //var defaultOptions = {
        //    canBubble: false,
        //    cancelable: false,
        //    detail: undefined
        //};

        //if (!window.CustomEvent) {
        //    function CustomEvent(event, params) {
        //        params = params || { bubbles: false, cancelable: false, detail: undefined };
        //        var evt = document.createEvent('CustomEvent');
        //        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        //        return evt;
        //    };
        //
        //    CustomEvent.prototype = window.CustomEvent.prototype;
        //    window.CustomEvent = CustomEvent;
        //}

        //var event = document.createEvent("CustomEvent");
        //var init = objects.extend({}, defaultOptions, options);
        //event.initCustomEvent(prefix(type), init.canBubble, init.cancelable, init.detail);

        if (objects.isFunction(target.dispatchEvent)) {
            target.dispatchEvent(event);
        } else {
            var args = [event];
            var type = event.type;
            var storage = data.get(target);

            if (storage.events && storage.events[type]) {
                var events = collections.copy(storage.events[type]);
                
                collections.forEach(events, function (event) {
                    event.listener.apply(target, args);
                });
            }
        }

        return event.defaultPrevented;
    };

    events.isSupported = function (type, element) {
        var property = "on" + type;

        if (isSupportedFallbackRequired) {
            if (!objects.isFunction(element.setAttribute)) {
                element = isSupportedFallbackElement;
            }

            var originalValue = element[property];
            var newValue;

            element.setAttribute(property, "");
            newValue = element[property];
            element[property] = originalValue;
            element.removeAttribute(property);

            return objects.isFunction(newValue);
        } else {
            return (property in element);
        }
    };

});
