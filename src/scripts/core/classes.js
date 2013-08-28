define(["exports", "./collections", "./strings"], function (classes, collections, strings) {

    "use strict";

    if ("classList" in document.documentElement) {

        classes.item = function (element, index) {
            return element.classList.item(index);
        };

        classes.contains = function (element, name) {
            return element.classList.contains(name);
        };

        classes.add = function (element, name) {
            element.classList.add(name);
        };

        classes.remove = function (element, name) {
            element.classList.remove(name);
        };

        classes.toggle = function (element, name) {
            return element.classList.toggle(name);
        };

    } else {

        classes.item = function (element, index) {
            var classes = strings.tokenize(element.className);
            return classes[index];
        };

        classes.contains = function (element, name) {
            var classes = strings.tokenize(element.className);
            return collections.indexOf(classes, name) !== -1;
        };

        classes.add = function (element, name) {
            var classes = strings.tokenize(element.className);

            if (collections.indexOf(classes, name) === -1) {
                collections.add(classes, name);
                element.className = collections.join(classes, " ");
            }
        };

        classes.remove = function (element, name) {
            var classes = strings.tokenize(element.className);
            var index = collections.indexOf(classes, name);

            if (index !== -1) {
                collections.removeAt(classes, index);
                element.className = collections.join(classes, " ");
            }
        };

        classes.toggle = function (element, name) {
            if (!classes.contains(element, name)) {
                classes.add(element, name);
                return true;
            } else {
                classes.remove(element, name);
                return false;
            }
        };

    }

});
