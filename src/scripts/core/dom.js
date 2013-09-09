define(["exports", "./collections", "./events", "./objects"], function (dom, collections, events, objects) {

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

    dom.create = function (tagName, className, parentNode) {
        if (!objects.isString(className)) {
            parentNode = className;
            className = undefined;
        }

        var element = document.createElement(tagName);

        if (className) {
            element.className = className;
        }

        if (parentNode) {
            dom.append(element, parentNode);
        }
        
        return element;
    };

    dom.append = function (node, parentNode) {
        parentNode.appendChild(node);
    };

    dom.prepend = function (node, parentNode) {
        parentNode.insertBefore(node, parentNode.firstChild);
    };
    
    dom.insertBefore = function insertBefore(node, refNode) {
        if (refNode.parentNode) {
            refNode.parentNode.insertBefore(node, refNode);
        }
    };
    
    dom.insertAfter = function (node, refNode) {
        if (refNode.parentNode) {
            refNode.parentNode.insertBefore(node, refNode.nextSibling);
        }
    };

    dom.remove = function (node) {
        if (node.parentNode) {
            node.parentNode.removeChild(node);
        }
    };

});
