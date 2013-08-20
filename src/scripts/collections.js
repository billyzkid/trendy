define(["exports", "objects"], function (collections, objects) {

    "use strict";

    var methodNames = [
        "pop",
        "push",
        "reverse",
        "sort",
        "shift",
        "unshift",
        "splice",
        "concat",
        "join",
        "slice",
        "indexOf",
        "lastIndexOf",
        "forEach",
        "every",
        "some",
        "filter",
        "map",
        "reduce",
        "reduceRight"
    ];

    methodNames.forEach(function (methodName) {
        collections[methodName] = function (collection) {
            return Array.prototype[methodName].apply(collection, Array.prototype.slice.call(arguments, 1));
        };
    });

    collections.contains = function (collection, item) {
        return collections.indexOf(collection, item) !== -1;
    };

    collections.add = function (collection, item) {
        collection[collection.length] = item;
    };

    collections.remove = function (collection, item) {
        var index = collections.indexOf(collection, item);

        if (index !== -1) {
            collections.removeAt(collection, index);
        }
    };

    collections.removeAt = function (collection, index) {
        collections.splice(collection, index, 1);
    };

    collections.clear = function (collection) {
        collections.splice(collection, 0);
    };

    collections.copy = function (collection) {
        return collections.slice(collection);
    };

    collections.asArray = function (collection) {
        return objects.isArray(collection) ? value : collections.slice(collection);
    };

});
