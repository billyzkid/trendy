define(["exports", "./collections"], function (strings, collections) {

    "use strict";

    var empty = "";
    var whitespaceRE = /\s+/;
    var leadingWhitespaceRE = /^\s+/;
    var trailingWhitespaceRE = /\s+$/;
    var jsonifyRE = /^(?:\{[\s\S]*\}|\[[\s\S]*\])$/;
    var tokenizeCallback = function (token) { return token.length > 0; };

    strings.trim = function (value) {
        return strings.trimLeft(strings.trimRight(value));
    };

    strings.trimLeft = function (value) {
        return value.replace(leadingWhitespaceRE, empty);
    };

    strings.trimRight = function (value) {
        return value.replace(trailingWhitespaceRE, empty);
    };

    strings.tokenize = function (value) {
        return collections.filter(value.split(whitespaceRE), tokenizeCallback);
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

    strings.stringify = function (value) {
        return JSON.stringify(value);
    };

    strings.jsonify = function (value, strict) {
        if (strict) {
            return JSON.parse(value);
        } else if (jsonifyRE.test(value)) {
            return eval("(" + value + ")");
        } else {
            return null;
        }
    };

});
