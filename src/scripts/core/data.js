define(["exports", "./collections", "./objects"], function (data, collections, objects) {

    "use strict";

    var expando = "__trendy__";
    var storage = [];

    function indexOf(obj) {
        var index = obj[expando];

        if (objects.isUndefined(index)) {
            index = obj[expando] = storage.length;
            storage[index] = {};
        }

        return index;
    }

    data.get = function (obj, key) {
        var index = indexOf(obj);
        return objects.isUndefined(key) ? storage[index] : storage[index][key];
    };

    data.set = function (obj, key, value) {
        var index = indexOf(obj);
        storage[index][key] = value;
    };

    data.remove = function (obj, key) {
        var index = indexOf(obj);

        if (objects.isUndefined(key)) {
            collections.removeAt(storage, index);
        } else {
            delete storage[index][key];
        }
    };

});
