define(["exports"], function (strings) {

    "use strict";

    var empty = "";
    var whitespace = /\s+/;
    var leadingWhitespace = /^\s+/;
    var trailingWhitespace = /\s+$/;

    strings.trim = function (value) {
        return strings.trimLeft(strings.trimRight(value));
    };

    strings.trimLeft = function (value) {
        return value.replace(leadingWhitespace, empty);
    };

    strings.trimRight = function (value) {
        return value.replace(trailingWhitespace, empty);
    };

    strings.tokenize = function (value) {
        return strings.trim(value).split(whitespace);
    };

    strings.contains = function (value, search) {
        return value.indexOf(search) !== -1;
    };

    strings.startsWith = function (value, search) {
        return value.indexOf(search) === 0;
    };

    strings.endsWith = function (value, search) {
        return value.indexOf(search) === (value.length - search.length);
    };

    strings.replace = function (value, search, replacement) {
        return value.replace(search, replacement);
    };

    strings.replaceAll = function (value, search, replacement) {
        while (strings.contains(value, search)) {
            value = strings.replace(value, search, replacement);
        }

        return value;
    };

    strings.remove = function (value, search) {
        return strings.replace(value, search, empty);
    };

    strings.removeAll = function (value, search) {
        return strings.replaceAll(value, search, empty);
    };

});
