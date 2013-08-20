define(["exports", "collections", "data", "strings", "objects"], function (events, collections, data, strings, objects) {

    "use strict";

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
            target.addEventListener(event.type, event.listener, event.capture);
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
                        target.removeEventListener(event.type, event.listener, event.capture);
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

});