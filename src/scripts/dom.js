define(["exports", "collections", "events"], function (dom, collections, events) {

    "use strict";

    var isReady = false;
    var readyCallbacks = null;

    function executeReadyCallbacks() {
        if (!isReady) {
            isReady = true;

            var callbacks = collections.copy(readyCallbacks);
            readyCallbacks = null;

            collections.forEach(callbacks, function (callback) {
                callback();
            });
        }
    }

    dom.ready = function (callback) {
        if (isReady) {
            callback();
        } else if (readyCallbacks) {
            readyCallbacks.push(callback);
        } else {
            readyCallbacks = [callback];

            if (document.readyState === "complete") {
                setTimeout(executeReadyCallbacks);
            } else {
                var listener = function () {
                    events.remove(document, "DOMContentLoaded", listener);
                    events.remove(window, "load", listener);
                    executeReadyCallbacks();
                };

                events.add(document, "DOMContentLoaded", listener);
                events.add(window, "load", listener);
            }
        }
    };

    dom.query = function (selector, value) {
        return selector.querySelector(value);
    };

    dom.queryAll = function (selector, value) {
        return selector.querySelectorAll(value);
    };

    dom.queryById = function (selector, value) {
        return dom.query(selector, "#" + value);
    };

});
