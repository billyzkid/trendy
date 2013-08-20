define(["exports", "collections"], function (objects, collections) {

    "use strict";

    objects.isNull = function (value) {
        return value === null;
    };

    objects.isUndefined = function (value) {
        return value === void 0;
    };

    objects.isObject = function (value) {
        return value === Object(value);
    };

    objects.isArray = function (value) {
        return Object.prototype.toString.call(value) === "[object Array]";
    };

    objects.isFunction = function (value) {
        return Object.prototype.toString.call(value) === "[object Function]";
    };

    objects.isString = function (value) {
        return Object.prototype.toString.call(value) === "[object String]";
    };

    objects.isEmpty = function (value) {
        for (var i in value) {
            return false;
        }

        return true;
    };

    objects.keys = function (value) {
        return Object.keys(value);
    };

    objects.extend = function (value) {
        collections.forEach(collections.slice(arguments, 1), function (source) {
            if (source) {
                for (var property in source) {
                    value[property] = source[property];
                }
            }
        });

        return value;
    };

});
